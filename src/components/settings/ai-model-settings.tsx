"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { LoaderCircle, Save, TestTubeDiagonal } from "lucide-react"
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
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{
    type: "success" | "error"
    summary: string
    output?: string
    meta?: string
  } | null>(null)
  const testResultRef = useRef<HTMLDivElement | null>(null)

  const modelOptions = useMemo(() => providerModels[config.provider], [config.provider])

  useEffect(() => {
    if (!testResult) return
    testResultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [testResult])

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

  async function handleTest() {
    setIsTesting(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/ai/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ config }),
      })

      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "模型测试失败")
      }

      setTestResult({
        type: "success",
        summary: "模型连接成功",
        output: payload.data?.output ?? "",
        meta: `${payload.data?.provider ?? config.provider} / ${payload.data?.model ?? config.model}`,
      })
    } catch (error) {
      setTestResult({
        type: "error",
        summary: error instanceof Error ? error.message : "模型测试失败",
      })
    } finally {
      setIsTesting(false)
    }
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
            <div className="space-y-2">
              <DropdownSelect
                items={modelOptions.map((model) => ({ value: model, label: model }))}
                value={modelOptions.includes(config.model) ? config.model : ""}
                placeholder="选择推荐模型"
                onChange={(value) => updateConfig("model", value)}
                searchable
              />
              <input
                className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
                value={config.model}
                onChange={(event) => updateConfig("model", event.target.value)}
                placeholder="也可以手动输入模型名，例如 gpt-4o-mini"
              />
            </div>
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
          <button
            type="button"
            onClick={() => void handleTest()}
            disabled={isTesting}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            {isTesting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <TestTubeDiagonal className="h-4 w-4" />}
            {isTesting ? "测试中" : "测试模型"}
          </button>
          {saved ? <span className="text-sm text-muted-foreground">已保存</span> : null}
        </div>

        {testResult ? (
          <div
            ref={testResultRef}
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              testResult.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-destructive/20 bg-destructive/10 text-destructive"
            }`}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-medium">{testResult.type === "success" ? "测试结果" : "测试失败"}</p>
              {testResult.meta ? <span className="text-xs opacity-80">{testResult.meta}</span> : null}
            </div>
            <p className="mb-2 text-sm leading-6 whitespace-pre-wrap break-words">{testResult.summary}</p>
            {testResult.output ? (
              <div className="rounded-lg border border-border/60 bg-background/70 px-3 py-2">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">模型返回</p>
                <div className="max-h-64 overflow-auto text-xs leading-6 whitespace-pre-wrap break-words">
                  {testResult.output}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
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
