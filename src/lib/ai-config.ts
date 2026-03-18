export const AI_CONFIG_STORAGE_KEY = "king-todo-ai-config"

export type AiProvider = "openai" | "anthropic" | "custom"

export type AiConfig = {
  provider: AiProvider
  model: string
  apiKey: string
  baseUrl: string
  temperature: number
}

export const defaultAiConfig: AiConfig = {
  provider: "openai",
  model: "gpt-5-mini",
  apiKey: "",
  baseUrl: "",
  temperature: 0.7,
}

export function loadAiConfig(): AiConfig {
  if (typeof window === "undefined") return defaultAiConfig

  try {
    const raw = window.localStorage.getItem(AI_CONFIG_STORAGE_KEY)
    if (!raw) return defaultAiConfig
    return { ...defaultAiConfig, ...JSON.parse(raw) }
  } catch {
    return defaultAiConfig
  }
}

export function saveAiConfig(config: AiConfig) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(config))
}
