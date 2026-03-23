"use client"

import { useMemo, useState } from "react"
import { Save } from "lucide-react"
import { DropdownSelect } from "@/components/ui/dropdown-select"
import { defaultAiConfig, loadAiConfig, saveAiConfig, type AiConfig, type AiProvider } from "@/lib/ai-config"

const providerModels: Record<AiProvider, string[]> = {
  openai: ["gpt-5-mini", "gpt-5", "gpt-4.1-mini"],
  anthropic: ["claude-3-5-sonnet", "claude-3-7-sonnet", "claude-3-haiku"],
  custom: ["custom-model"],
}

export function AiModelSettings() {
  const [config, setConfig] = useState<AiConfig>(() => loadAiConfig())
  const [saved, setSaved] = useState(false)

  const modelOptions = useMemo(() => providerModels[config.provider], [config.provider])

  function updateConfig<K extends keyof AiConfig>(key: K, value: AiConfig[K]) {
    setSaved(false)
    setConfig((current) => ({ ...current, [key]: value }))
  }

  function handleProviderChange(provider: AiProvider) {
    setSaved(false)
    setConfig((current) => ({ ...current, provider, model: providerModels[provider][0] ?? defaultAiConfig.model }))
  }

  function handleSave() {
    saveAiConfig(config)
    setSaved(true)
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">AI Model</p>
          <h2 className="text-2xl font-semibold tracking-tight">AI 模型</h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">服务商</span>
            <DropdownSelect
              items={[
                { value: "openai", label: "OpenAI" },
                { value: "anthropic", label: "Anthropic" },
                { value: "custom", label: "Custom" },
              ]}
              value={config.provider}
              placeholder="选择服务商"
              onChange={(value) => handleProviderChange(value as AiProvider)}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">模型</span>
            <DropdownSelect
              items={modelOptions.map((model) => ({ value: model, label: model }))}
              value={config.model}
              placeholder="选择模型"
              onChange={(value) => updateConfig("model", value)}
              searchable
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">API Key</span>
            <input className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" value={config.apiKey} onChange={(event) => updateConfig("apiKey", event.target.value)} placeholder="粘贴你的 API Key" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">Base URL（可选）</span>
            <input className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" value={config.baseUrl} onChange={(event) => updateConfig("baseUrl", event.target.value)} placeholder="例如 https://api.openai.com/v1" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">Temperature：{config.temperature.toFixed(1)}</span>
            <input className="w-full" type="range" min="0" max="1" step="0.1" value={config.temperature} onChange={(event) => updateConfig("temperature", Number(event.target.value))} />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button type="button" onClick={handleSave} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Save className="h-4 w-4" />
            保存配置
          </button>
          {saved ? <span className="text-sm text-muted-foreground">已保存</span> : null}
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-medium">当前配置</p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>服务商：{config.provider}</p>
            <p>模型：{config.model}</p>
            <p>Temperature：{config.temperature.toFixed(1)}</p>
            <p>Base URL：{config.baseUrl || "默认"}</p>
          </div>
        </section>
      </aside>
    </div>
  )
}
