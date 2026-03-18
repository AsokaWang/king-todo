"use client"

import { useMemo, useState } from "react"
import { Bot, ListTodo, Send, Sparkles } from "lucide-react"
import { loadAiConfig } from "@/lib/ai-config"

type DraftTask = {
  title: string
  description: string
  priority: "low" | "medium" | "high"
}

type AiChatResponse = {
  provider: string
  model: string
  output: string
}

type AiDraftResponse = {
  provider: string
  model: string
  drafts: DraftTask[]
  raw: string
}

export function AiAssistantWorkspace() {
  const [config] = useState(() => loadAiConfig())
  const [prompt, setPrompt] = useState("")
  const [chatResult, setChatResult] = useState<AiChatResponse | null>(null)
  const [draftResult, setDraftResult] = useState<AiDraftResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createdCount, setCreatedCount] = useState(0)

  const ready = useMemo(() => Boolean(config.model && config.provider), [config])

  async function runRequest(mode: "chat" | "draftTasks") {
    if (!prompt.trim()) return

    setIsSubmitting(true)
    setError(null)
    if (mode === "chat") {
      setDraftResult(null)
    } else {
      setChatResult(null)
      setCreatedCount(0)
    }

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          prompt: prompt.trim(),
          mode,
          config,
        }),
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "AI 请求失败")
      }

      if (mode === "chat") {
        setChatResult(payload.data)
      } else {
        setDraftResult(payload.data)
      }
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "AI 请求失败")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function createDraftTasks() {
    if (!draftResult?.drafts.length) return

    setIsCreating(true)
    setError(null)

    try {
      let count = 0
      for (const draft of draftResult.drafts) {
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: draft.title,
            description: draft.description,
            priority: draft.priority,
          }),
        })

        const payload = await response.json()
        if (!response.ok || !payload.ok) {
          throw new Error(payload?.error?.message ?? `创建任务失败：${draft.title}`)
        }

        count += 1
      }

      setCreatedCount(count)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "写入任务失败")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-5">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">AI Assistant</p>
            <h1 className="text-2xl font-semibold tracking-tight">AI 助手</h1>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium">输入你的需求</span>
              <textarea
                className="min-h-40 w-full rounded-2xl border border-input bg-background px-4 py-4 text-sm outline-none"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="例如：帮我把今天的会议、写周报、整理账单拆成任务，并按优先级排序。"
              />
            </label>

            {error ? <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div> : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!ready || isSubmitting || !prompt.trim()}
                onClick={() => void runRequest("chat")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "调用中..." : "发送给 AI"}
              </button>

              <button
                type="button"
                disabled={!ready || isSubmitting || !prompt.trim()}
                onClick={() => void runRequest("draftTasks")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ListTodo className="h-4 w-4" />
                生成任务草案
              </button>
            </div>
          </div>
        </section>

        {draftResult ? (
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">任务草案</p>
              </div>

              <button
                type="button"
                onClick={() => void createDraftTasks()}
                disabled={isCreating || !draftResult.drafts.length}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isCreating ? "写入中..." : "一键写入任务列表"}
              </button>
            </div>

            {createdCount > 0 ? (
              <div className="mb-4 rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-foreground">
                已成功写入 {createdCount} 条任务。
              </div>
            ) : null}

            <div className="space-y-3">
              {draftResult.drafts.map((draft, index) => (
                <article key={`${draft.title}-${index}`} className="rounded-xl border border-border bg-background px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{draft.title}</p>
                      <p className="text-sm text-muted-foreground">{draft.description || "暂无描述"}</p>
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">{draft.priority}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {chatResult ? (
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">AI 返回</p>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-7 text-foreground">{chatResult.output}</div>
          </section>
        ) : null}
      </div>

      <aside className="space-y-5">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">当前模型配置</p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>服务商：{config.provider}</p>
            <p>模型：{config.model}</p>
            <p>Temperature：{config.temperature.toFixed(1)}</p>
            <p>Base URL：{config.baseUrl || "默认"}</p>
            <p>API Key：{config.apiKey ? "已配置" : "未配置"}</p>
          </div>
        </section>
      </aside>
    </div>
  )
}
