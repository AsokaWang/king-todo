import { z } from "zod"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

const aiConfigSchema = z.object({
  provider: z.enum(["openai", "anthropic", "custom"]),
  model: z.string().min(1),
  apiKey: z.string().optional().default(""),
  baseUrl: z.string().optional().default(""),
  temperature: z.number().min(0).max(1).default(0.7),
})

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

async function callOpenAI(messages: Array<{ role: "system" | "user"; content: string }>, config: z.infer<typeof aiConfigSchema>) {
  const response = await fetch(config.baseUrl || "https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      temperature: config.temperature,
      messages,
    }),
  })

  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.error?.message ?? "OpenAI 请求失败")
  return payload?.choices?.[0]?.message?.content ?? ""
}

async function callAnthropic(prompt: string, systemPrompt: string | undefined, config: z.infer<typeof aiConfigSchema>) {
  const response = await fetch(config.baseUrl || "https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 1200,
      temperature: config.temperature,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    }),
  })

  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.error?.message ?? "Anthropic 请求失败")
  return payload?.content?.[0]?.text ?? ""
}

async function callCustom(prompt: string, config: z.infer<typeof aiConfigSchema>) {
  if (!config.baseUrl) {
    throw new Error("Custom provider 需要 Base URL")
  }

  const response = await fetch(config.baseUrl, {
    method: "POST",
    headers: {
      Authorization: config.apiKey ? `Bearer ${config.apiKey}` : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      temperature: config.temperature,
      prompt,
    }),
  })

  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.error?.message ?? "Custom provider 请求失败")
  return payload?.output ?? payload?.text ?? JSON.stringify(payload)
}

async function runModel(prompt: string, mode: "chat" | "draftTasks", config: z.infer<typeof aiConfigSchema>) {
  const systemPrompt =
    mode === "draftTasks"
      ? "把用户输入拆成任务草案，返回 JSON 数组，每项格式为 {\"title\": string, \"description\": string, \"priority\": \"low\"|\"medium\"|\"high\" }。不要输出额外解释。"
      : undefined

  const finalPrompt = mode === "draftTasks" ? `请将下面内容拆成可执行任务：\n${prompt}` : prompt

  if (config.provider === "openai") {
    return callOpenAI(
      [
        ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
        { role: "user" as const, content: finalPrompt },
      ],
      config,
    )
  }

  if (config.provider === "anthropic") {
    return callAnthropic(finalPrompt, systemPrompt, config)
  }

  return callCustom(finalPrompt, config)
}

export async function POST(request: Request) {
  try {
    await requireSession()
    const body = await request.json()
    const input = aiChatBodySchema.parse(body)

    if (!input.config.apiKey && input.config.provider !== "custom") {
      throw new Error("请先在设置中配置 API Key")
    }

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
