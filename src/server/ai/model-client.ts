import { z } from "zod"
import { HttpError } from "@/server/errors/http"

export const aiConfigSchema = z.object({
  provider: z.enum(["openai", "anthropic", "custom"]),
  model: z.string().min(1),
  apiKey: z.string().optional().default(""),
  baseUrl: z.string().optional().default(""),
  temperature: z.number().min(0).max(1).default(0.7),
})

export type AiRuntimeConfig = z.infer<typeof aiConfigSchema>

export function validateAiRuntimeConfig(config: AiRuntimeConfig) {
  if (!config.apiKey && config.provider !== "custom") {
    throw new HttpError(400, "AI_CONFIG_REQUIRED", "请先在设置中配置 AI API Key")
  }

  if (config.provider === "custom" && !config.baseUrl) {
    throw new HttpError(400, "AI_CONFIG_INVALID", "Custom provider 需要配置 Base URL")
  }
}

function looksLikeHtmlDocument(text: string) {
  const normalized = text.trim().toLowerCase()
  return normalized.startsWith("<!doctype html") || normalized.startsWith("<html") || normalized.includes("<head>")
}

function buildProviderUrl(config: AiRuntimeConfig) {
  if (config.provider === "openai") {
    if (!config.baseUrl) {
      return "https://api.openai.com/v1/chat/completions"
    }

    const normalized = config.baseUrl.replace(/\/+$/, "")

    if (normalized.endsWith("/chat/completions")) {
      return normalized
    }

    if (normalized.endsWith("/v1")) {
      return `${normalized}/chat/completions`
    }

    return `${normalized}/v1/chat/completions`
  }

  if (config.provider === "anthropic") {
    if (!config.baseUrl) {
      return "https://api.anthropic.com/v1/messages"
    }

    const normalized = config.baseUrl.replace(/\/+$/, "")

    if (normalized.endsWith("/messages")) {
      return normalized
    }

    if (normalized.endsWith("/v1")) {
      return `${normalized}/messages`
    }

    return `${normalized}/v1/messages`
  }

  return config.baseUrl
}

async function readResponsePayload(response: Response) {
  const text = await response.text()

  try {
    return {
      text,
      json: text ? JSON.parse(text) : null,
    }
  } catch {
    return {
      text,
      json: null,
    }
  }
}

async function callOpenAI(messages: Array<{ role: "system" | "user"; content: string }>, config: AiRuntimeConfig) {
  const response = await fetch(buildProviderUrl(config), {
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

  const payload = await readResponsePayload(response)
  if (looksLikeHtmlDocument(payload.text)) {
    throw new HttpError(400, "AI_BASE_URL_INVALID", "Base URL 看起来是站点页面地址，不是 OpenAI 接口地址。请填写 API 地址，或只填域名让系统自动补全 /v1/chat/completions。")
  }
  if (!response.ok) {
    throw new HttpError(502, "AI_PROVIDER_ERROR", payload.json?.error?.message ?? payload.text ?? "OpenAI 请求失败")
  }

  return payload.json?.choices?.[0]?.message?.content ?? payload.text ?? ""
}

async function callAnthropic(prompt: string, systemPrompt: string | undefined, config: AiRuntimeConfig) {
  const response = await fetch(buildProviderUrl(config), {
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

  const payload = await readResponsePayload(response)
  if (looksLikeHtmlDocument(payload.text)) {
    throw new HttpError(400, "AI_BASE_URL_INVALID", "Base URL 看起来是站点页面地址，不是 Anthropic 接口地址。请填写 API 地址，或只填域名让系统自动补全 /v1/messages。")
  }
  if (!response.ok) {
    throw new HttpError(502, "AI_PROVIDER_ERROR", payload.json?.error?.message ?? payload.text ?? "Anthropic 请求失败")
  }

  return payload.json?.content?.[0]?.text ?? payload.text ?? ""
}

async function callCustom(prompt: string, config: AiRuntimeConfig) {
  const response = await fetch(buildProviderUrl(config), {
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

  const payload = await readResponsePayload(response)
  if (looksLikeHtmlDocument(payload.text)) {
    throw new HttpError(400, "AI_BASE_URL_INVALID", "当前 Base URL 返回的是 HTML 页面，不是模型接口。请检查是否填成了站点首页地址。")
  }
  if (!response.ok) {
    throw new HttpError(502, "AI_PROVIDER_ERROR", payload.json?.error?.message ?? payload.text ?? "Custom provider 请求失败")
  }

  return payload.json?.output ?? payload.json?.text ?? payload.text ?? ""
}

export async function runAiModel(options: {
  config: AiRuntimeConfig
  prompt: string
  systemPrompt?: string
}) {
  const { config, prompt, systemPrompt } = options
  validateAiRuntimeConfig(config)

  if (config.provider === "openai") {
    return callOpenAI(
      [
        ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
        { role: "user" as const, content: prompt },
      ],
      config,
    )
  }

  if (config.provider === "anthropic") {
    return callAnthropic(prompt, systemPrompt, config)
  }

  return callCustom(systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt, config)
}
