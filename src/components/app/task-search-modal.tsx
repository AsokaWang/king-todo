"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, CornerDownLeft, Search, Sparkles, X } from "lucide-react"

type SearchTaskItem = {
  id: string
  title: string
  description?: string | null
  status: "todo" | "in_progress" | "done" | "cancelled" | "archived"
  priority: "low" | "medium" | "high"
  dueAt?: string | null
  list?: { id: string; name: string; emoji?: string | null } | null
  summary?: { isOverdue: boolean; subtaskCount: number; completedSubtaskCount: number }
}

type SearchResponse = {
  items: SearchTaskItem[]
}

type ParsedQuery = {
  text: string
  status: "all" | SearchTaskItem["status"]
  priority: "all" | SearchTaskItem["priority"]
}

type CommandItem = {
  label: string
  hint: string
  action: () => void
}

type TaskSearchModalProps = {
  open: boolean
  onClose: () => void
}

const statusLabelMap = {
  todo: "待办",
  in_progress: "进行中",
  done: "已完成",
  cancelled: "已取消",
  archived: "已归档",
}

const priorityDotClassMap = {
  low: "bg-muted-foreground/40",
  medium: "bg-accent",
  high: "bg-destructive",
}

function parseQuery(input: string): ParsedQuery {
  const tokens = input.trim().split(/\s+/).filter(Boolean)
  let status: ParsedQuery["status"] = "all"
  let priority: ParsedQuery["priority"] = "all"
  const textTokens: string[] = []

  for (const token of tokens) {
    if (token.startsWith("status:")) {
      const value = token.slice(7) as ParsedQuery["status"]
      if (["todo", "in_progress", "done", "cancelled", "archived"].includes(value)) {
        status = value
        continue
      }
    }
    if (token.startsWith("priority:")) {
      const value = token.slice(9) as ParsedQuery["priority"]
      if (["high", "medium", "low"].includes(value)) {
        priority = value
        continue
      }
    }
    textTokens.push(token)
  }

  return { text: textTokens.join(" "), status, priority }
}

export function TaskSearchModal({ open, onClose }: TaskSearchModalProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<SearchTaskItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [statusFilter, setStatusFilter] = useState<"all" | SearchTaskItem["status"]>("all")
  const [priorityFilter, setPriorityFilter] = useState<"all" | SearchTaskItem["priority"]>("all")

  useEffect(() => {
    if (!open) {
      setQuery("")
      setItems([])
      setActiveIndex(0)
      setStatusFilter("all")
      setPriorityFilter("all")
      return
    }

    inputRef.current?.focus()
  }, [open])

  const quickCommands = useMemo<CommandItem[]>(
    () => [
      { label: "打开今天", hint: "查看今日任务视图", action: () => { router.push("/tasks?view=today"); onClose() } },
      { label: "查看逾期任务", hint: "回到任务页并优先处理逾期", action: () => { router.push("/tasks?view=all"); onClose() } },
      { label: "进入 AI 助手", hint: "让 AI 帮你拆解任务", action: () => { router.push("/ai"); onClose() } },
      { label: "查看洞察", hint: "复盘完成率与投入时长", action: () => { router.push("/insights"); onClose() } },
      { label: "进入日历", hint: "查看排期与时间分布", action: () => { router.push("/calendar"); onClose() } },
    ],
    [onClose, router],
  )

  const parsedQuery = useMemo(() => parseQuery(query), [query])

  const visibleCommands = useMemo<CommandItem[]>(
    () => quickCommands.filter((command) => !query.trim() || command.label.includes(parsedQuery.text) || command.hint.includes(parsedQuery.text)),
    [parsedQuery.text, query, quickCommands],
  )

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
        return
      }

      if (!items.length) {
        return
      }

      if (event.key === "ArrowDown") {
        event.preventDefault()
        setActiveIndex((current) => (current + 1) % items.length)
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        setActiveIndex((current) => (current - 1 + items.length) % items.length)
      }

      if (event.key === "Enter") {
        event.preventDefault()
        const activeItem = items[activeIndex]
        if (activeItem) {
          router.push(`/tasks/${activeItem.id}`)
          onClose()
        }
      }
    }

    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [activeIndex, items, onClose, open, router])

  useEffect(() => {
    if (!open || (!query.trim() && !parsedQuery.text)) {
      setItems([])
      setActiveIndex(0)
      return
    }

    let active = true

    const timeout = window.setTimeout(async () => {
      setIsLoading(true)

      try {
        const params = new URLSearchParams({ q: parsedQuery.text || query.trim(), pageSize: "20" })
        const effectiveStatus = parsedQuery.status !== "all" ? parsedQuery.status : statusFilter
        const effectivePriority = parsedQuery.priority !== "all" ? parsedQuery.priority : priorityFilter
        if (effectiveStatus !== "all") params.set("status", effectiveStatus)
        if (effectivePriority !== "all") params.set("priority", effectivePriority)
        const response = await fetch(`/api/tasks?${params.toString()}`, {
          credentials: "include",
          cache: "no-store",
        })

        const payload = await response.json()

        if (active && response.ok && payload.ok) {
          const data = payload.data as SearchResponse
          setItems(data.items)
          setActiveIndex(0)
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }, 180)

    return () => {
      active = false
      window.clearTimeout(timeout)
    }
  }, [open, parsedQuery, priorityFilter, query, statusFilter])

  const resultCountText = useMemo(() => {
    if (!query.trim()) return "输入关键词开始检索，或直接使用快捷命令"
    if (isLoading) return "正在检索任务"
    return `任务 ${items.length} 条 · 命令 ${visibleCommands.length} 条`
  }, [isLoading, items.length, query, visibleCommands.length])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/12 px-4 pt-[12vh] backdrop-blur-[2px]">
      <button type="button" aria-label="关闭搜索弹窗" className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[760px] overflow-hidden rounded-[20px] border border-border/80 bg-card/95 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
        <div className={`relative flex items-center gap-3 border-b px-4 py-3 transition-colors ${isFocused ? "border-primary/20 bg-primary/5" : "border-border bg-card/95"}`}>
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            autoFocus
            className="h-9 flex-1 bg-transparent text-sm font-medium outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:font-normal placeholder:text-muted-foreground"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="搜索任务标题、描述，或输入 status:done priority:high"
          />
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <span className={`pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left transition-all ${isFocused ? "scale-x-100 bg-primary/45" : "scale-x-0 bg-transparent"}`} />
        </div>

        <div className="border-b border-border px-4 py-2 text-xs text-muted-foreground">{resultCountText}</div>
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-2">
          {[{ key: "all", label: "全部状态" }, { key: "todo", label: "待办" }, { key: "in_progress", label: "进行中" }, { key: "done", label: "已完成" }, { key: "cancelled", label: "已取消" }].map((item) => (
            <button key={item.key} type="button" onClick={() => setStatusFilter(item.key as typeof statusFilter)} className={`rounded-full px-2.5 py-1 text-xs ${statusFilter === item.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{item.label}</button>
          ))}
          {[{ key: "all", label: "全部优先级" }, { key: "high", label: "高" }, { key: "medium", label: "中" }, { key: "low", label: "低" }].map((item) => (
            <button key={item.key} type="button" onClick={() => setPriorityFilter(item.key as typeof priorityFilter)} className={`rounded-full px-2.5 py-1 text-xs ${priorityFilter === item.key ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{item.label}</button>
          ))}
        </div>

        <div className="max-h-[420px] overflow-y-auto py-1">
          {!query.trim() ? (
            <div className="space-y-4 px-4 py-8">
              <div className="space-y-2 text-center">
                <div className="text-sm text-muted-foreground">输入文本开始检索任务，支持回车快速打开。</div>
                <div className="text-xs text-muted-foreground">支持语法：`status:done priority:high 周报`</div>
              </div>
              <div className="space-y-2">
                <div className="px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Commands</div>
                <div className="grid gap-2">
                  {visibleCommands.map((command) => (
                    <button key={command.label} type="button" onClick={command.action} className="rounded-xl border border-border bg-background px-3 py-3 text-left text-sm hover:bg-muted/50">
                      <div className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />{command.label}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{command.hint}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="px-2 py-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 rounded-xl px-3 py-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-muted" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : items.length || visibleCommands.length ? (
            <div className="space-y-3 px-2 py-2">
              {visibleCommands.length ? (
                <div>
                  <div className="px-1 pb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Commands</div>
                  <div className="space-y-2">
                    {visibleCommands.slice(0, 4).map((command) => (
                      <button key={command.label} type="button" onClick={command.action} className="block w-full rounded-xl border border-border bg-background px-3 py-2.5 text-left transition-colors hover:bg-muted/70">
                        <div className="inline-flex items-center gap-2 text-sm font-medium"><Sparkles className="h-4 w-4 text-primary" />{command.label}</div>
                        <p className="mt-1 text-xs text-muted-foreground">{command.hint}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {items.length ? (
                <div>
                  <div className="px-1 pb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Tasks</div>
                  {items.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/tasks/${item.id}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={onClose}
                      className={`block rounded-xl px-3 py-2.5 transition-colors ${index === activeIndex ? "bg-primary/8 ring-1 ring-primary/10" : "hover:bg-muted/70"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${priorityDotClassMap[item.priority]}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-[13px] font-medium text-foreground">{item.title}</p>
                            <span className="shrink-0 text-[11px] font-medium text-muted-foreground">{statusLabelMap[item.status]}</span>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
                            {item.description?.trim() ? <p className="truncate">{item.description.trim()}</p> : <p className="truncate">暂无描述</p>}
                            {item.dueAt ? (
                              <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 ${item.summary?.isOverdue ? "bg-destructive/10 text-destructive" : "bg-background"}`}>
                                <CalendarDays className="h-3 w-3" />
                                {new Date(item.dueAt).toLocaleDateString("zh-CN")}
                              </span>
                            ) : null}
                            {item.list ? <span className="inline-flex shrink-0 rounded-full bg-background px-2 py-0.5">{item.list.emoji ?? "📁"} {item.list.name}</span> : null}
                            {item.summary?.subtaskCount ? <span className="inline-flex shrink-0 rounded-full bg-background px-2 py-0.5">子任务 {item.summary.completedSubtaskCount}/{item.summary.subtaskCount}</span> : null}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">未找到匹配的任务，试试标题关键词、描述片段或命令关键字。</div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span>↑↓ 选择结果</span>
          <span className="inline-flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" />
            Enter 打开
          </span>
          <span>Esc 关闭</span>
        </div>
      </div>
    </div>
  )
}
