import { z } from "zod"
import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"
import { HttpError } from "@/server/errors/http"
import { aiConfigSchema, runAiModel, validateAiRuntimeConfig } from "@/server/ai/model-client"

const parseTaskBodySchema = z.object({
  input: z.string().trim().min(1).max(1200),
  config: aiConfigSchema,
  context: z.object({
    activeListId: z.string().trim().nullable().optional(),
    activeView: z.enum(["all", "today", "tomorrow", "week", "month"]).default("all"),
    timezone: z.string().trim().default("Asia/Shanghai"),
  }),
})

const looseDatetimeSchema = z.string().trim().min(1).nullable().optional()

const parsedTaskItemSchema = z.object({
  title: z.string().trim().min(1).max(200).nullable(),
  description: z.string().trim().max(4000).nullable().optional(),
  startAt: looseDatetimeSchema,
  dueAt: looseDatetimeSchema,
  priority: z.enum(["low", "medium", "high"]).nullable().optional(),
  confidence: z.number().min(0).max(1).default(0.75),
  tagNames: z.array(z.string().trim().min(1).max(50)).max(10).default([]),
  listName: z.string().trim().max(120).nullable().optional(),
  action: z.enum(["create", "pinToTop", "archive", "abandon"]).default("create"),
  subtasks: z.array(z.object({ title: z.string().trim().min(1).max(200) })).max(8).default([]),
  rationale: z.string().trim().max(240).nullable().optional(),
  riskLevel: z.enum(["low", "medium", "high"]).default("low"),
  suggestions: z.array(z.string().trim().max(120)).max(5).default([]),
  warnings: z.array(z.string().trim().max(200)).max(10).default([]),
})

const parsedBatchSchema = z.object({
  mode: z.enum(["single", "multi"]).default("single"),
  confidence: z.number().min(0).max(1).default(0.75),
  tasks: z.array(parsedTaskItemSchema).min(1).max(5),
  warnings: z.array(z.string().trim().max(200)).max(10).default([]),
})

function extractJsonObject(text: string) {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) return null
  try {
    return JSON.parse(match[0])
  } catch {
    return null
  }
}

function normalizeLooseDatetime(value: string | null | undefined) {
  if (!value) return null

  const input = value.trim()
  if (!input) return null

  const direct = new Date(input)
  if (!Number.isNaN(direct.getTime())) {
    return direct.toISOString()
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(input)) {
    const local = new Date(`${input}:00`)
    if (!Number.isNaN(local.getTime())) {
      return local.toISOString()
    }
  }

  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(input)) {
    const normalized = input.replace(" ", "T")
    const local = new Date(normalized.length === 16 ? `${normalized}:00` : normalized)
    if (!Number.isNaN(local.getTime())) {
      return local.toISOString()
    }
  }

  throw new HttpError(400, "AI_PARSE_INVALID_DATETIME", `AI 返回的时间格式无法识别：${input}`)
}

export async function POST(request: Request) {
  try {
    const session = await requireSession()
    const body = parseTaskBodySchema.parse(await request.json())
    validateAiRuntimeConfig(body.config)

    const space = await ensureUserSpace(session.user)
    const [lists, tags] = await Promise.all([
      prisma.list.findMany({ where: { spaceId: space.id }, select: { id: true, name: true, parentId: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
      prisma.tag.findMany({ where: { spaceId: space.id }, select: { id: true, name: true }, orderBy: { name: "asc" } }),
    ])

    const activeList = body.context.activeListId ? lists.find((item) => item.id === body.context.activeListId) : null
    const now = new Date().toISOString()

    const systemPrompt = `你是一个任务解析器。把用户输入解析成一个任务批次。只返回一个 JSON 对象，不要 markdown，不要解释。
输出格式：
{
  "mode": "single" | "multi",
  "confidence": 0-1,
  "warnings": string[],
  "tasks": [
    {
      "title": string | null,
      "description": string | null,
      "startAt": ISO8601 string | null,
      "dueAt": ISO8601 string | null,
      "priority": "low" | "medium" | "high" | null,
      "confidence": 0-1,
      "tagNames": string[],
      "listName": string | null,
      "action": "create" | "pinToTop" | "archive" | "abandon",
      "subtasks": [{"title": string}],
      "rationale": string | null,
      "riskLevel": "low" | "medium" | "high",
      "suggestions": string[],
      "warnings": string[]
    }
  ]
}
规则：
- 只从已知清单名称中选择 listName
- 支持识别 中文时间表达：今天、明天、后天、今晚、今天下午、明早、下周一下午、周末晚上 等
- 日期必须转成 ISO8601
- 如果一句话明显包含多个独立任务，拆成 tasks 数组；如果只是一个任务的步骤，则放入 subtasks
- action 用于识别：置顶=>pinToTop，归档=>archive，放弃=>abandon，其余默认 create
- 没把握就填 null，并在 warnings 里解释
- 每批最多 5 个任务，每个任务最多 8 个子任务`

    const prompt = `当前时间: ${now}
时区: ${body.context.timezone}
当前视图: ${body.context.activeView}
当前激活清单: ${activeList?.name ?? "无"}
可用清单: ${lists.map((item) => item.name).join(", ") || "无"}
可用标签: ${tags.map((item) => item.name).join(", ") || "无"}

用户输入:
<<<
${body.input}
>>>`

    const raw = await runAiModel({ config: body.config, prompt, systemPrompt })
    const parsedRaw = extractJsonObject(raw)
    if (!parsedRaw) {
      throw new HttpError(502, "AI_PARSE_INVALID", "AI 没有返回可解析的结构化结果")
    }

    const parsed = parsedBatchSchema.parse(parsedRaw)

    return ok({
      mode: parsed.mode,
      tasks: parsed.tasks.map((task, index) => {
        const matchedList = task.listName ? lists.find((item) => item.name.toLowerCase() === task.listName?.toLowerCase()) : activeList ?? null
        return {
          clientId: `ai-${Date.now()}-${index}`,
          title: task.title,
          description: task.description ?? null,
          startAt: normalizeLooseDatetime(task.startAt),
          dueAt: normalizeLooseDatetime(task.dueAt),
          priority: task.priority ?? null,
          confidence: task.confidence,
          tagNames: Array.from(new Set(task.tagNames)),
          listId: matchedList?.id ?? body.context.activeListId ?? null,
          listName: matchedList?.name ?? task.listName ?? null,
          action: task.action,
          subtasks: task.subtasks,
          rationale: task.rationale ?? null,
          riskLevel: task.riskLevel,
          suggestions: task.suggestions,
          warnings: task.warnings,
        }
      }),
      confidence: parsed.confidence,
      warnings: parsed.warnings,
      raw,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return fail(new HttpError(400, "AI_PARSE_SCHEMA_INVALID", "AI 返回的数据格式不符合预期。", error.flatten()))
    }

    if (error instanceof Error && !(error instanceof HttpError)) {
      return fail(new HttpError(502, "AI_PROVIDER_ERROR", error.message || "AI 服务请求失败"))
    }

    return fail(error)
  }
}
