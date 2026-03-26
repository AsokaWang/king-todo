import { z } from "zod"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"
import { aiConfigSchema, runAiModel } from "@/server/ai/model-client"

const draftTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(""),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
})

const aiChatBodySchema = z.object({
  prompt: z.string().min(1),
  mode: z.enum(["chat", "draftTasks"]).default("chat"),
  config: aiConfigSchema,
})

function extractJsonArray(text: string) {
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) return null
  try {
    return JSON.parse(match[0])
  } catch {
    return null
  }
}

function parseDraftTasks(text: string) {
  const parsed = extractJsonArray(text)
  if (Array.isArray(parsed)) {
    return parsed.map((item) => draftTaskSchema.parse(item))
  }

  return text
    .split("\n")
    .map((line) => line.replace(/^[-*\d.\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((title) => ({ title, description: "", priority: "medium" as const }))
}

async function runModel(prompt: string, mode: "chat" | "draftTasks", config: z.infer<typeof aiConfigSchema>) {
  const systemPrompt =
    mode === "draftTasks"
      ? "把用户输入拆成任务草案，返回 JSON 数组，每项格式为 {\"title\": string, \"description\": string, \"priority\": \"low\"|\"medium\"|\"high\" }。不要输出额外解释。"
      : undefined

  const finalPrompt = mode === "draftTasks" ? `请将下面内容拆成可执行任务：\n${prompt}` : prompt

  return runAiModel({ config, prompt: finalPrompt, systemPrompt })
}

export async function POST(request: Request) {
  try {
    await requireSession()
    const body = await request.json()
    const input = aiChatBodySchema.parse(body)

    const output = await runModel(input.prompt, input.mode, input.config)

    if (input.mode === "draftTasks") {
      return ok({
        provider: input.config.provider,
        model: input.config.model,
        drafts: parseDraftTasks(output),
        raw: output,
      })
    }

    return ok({
      provider: input.config.provider,
      model: input.config.model,
      output,
    })
  } catch (error) {
    return fail(error)
  }
}
