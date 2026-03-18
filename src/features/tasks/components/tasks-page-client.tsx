"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TaskDetailDrawer } from "@/features/tasks/components/task-detail-drawer"
import { TaskDetailPanel } from "@/features/tasks/components/task-detail-panel"

type TaskItem = {
  id: string
  title: string
  description?: string | null
  status: "todo" | "in_progress" | "done" | "archived"
  priority: "low" | "medium" | "high"
  dueAt?: string | null
  estimatedMinutes?: number | null
  actualMinutes: number
  taskTags?: Array<{
    tag: {
      id: string
      name: string
      color?: string | null
    }
  }>
}

type TasksResponse = {
  items: TaskItem[]
  page: number
  pageSize: number
  total: number
  hasNextPage: boolean
}

const statusLabelMap: Record<TaskItem["status"], string> = {
  todo: "待办",
  in_progress: "进行中",
  done: "已完成",
  archived: "已归档",
}

const priorityLabelMap: Record<TaskItem["priority"], string> = {
  low: "低",
  medium: "中",
  high: "高",
}

export function TasksPageClient() {
  const [items, setItems] = useState<TaskItem[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTogglingId, setIsTogglingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeView = searchParams.get("view") ?? "all"
  const activeListId = searchParams.get("listId") ?? ""

  const loadTasks = useCallback(async (nextQuery = query) => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()

      if (nextQuery.trim()) {
        params.set("q", nextQuery.trim())
      }

      params.set("view", activeView)

      if (activeListId) {
        params.set("listId", activeListId)
      }

      const response = await fetch(`/api/tasks?${params.toString()}`, {
        credentials: "include",
        cache: "no-store",
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to load tasks.")
      }

      const data = payload.data as TasksResponse
      setItems(data.items)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load tasks.")
    } finally {
      setIsLoading(false)
    }
  }, [activeListId, activeView, query])

  useEffect(() => {
    void loadTasks("")
  }, [loadTasks])

  useEffect(() => {
    setSelectedTaskId(null)
  }, [pathname, activeListId, activeView])

  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
        }),
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to create task.")
      }

      const createdTask = payload.data as TaskItem
      setTitle("")
      await loadTasks()
      setSelectedTaskId(createdTask.id)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to create task.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleToggleStatus(task: TaskItem, event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()

    setIsTogglingId(task.id)
    setError(null)

    try {
      const nextStatus = task.status === "done" ? "todo" : "done"
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: nextStatus }),
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to update task status.")
      }

      await loadTasks()
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : "Failed to update task status.")
    } finally {
      setIsTogglingId(null)
    }
  }

  const emptyText = useMemo(() => {
    return query.trim() ? "没有匹配当前搜索条件的任务。" : "还没有任务，先创建一个。"
  }, [query])

  return (
    <>
      <div className="grid min-h-[calc(100vh-8rem)] gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-5">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Tasks</p>
              <h1 className="text-2xl font-semibold tracking-tight">全部任务</h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                受 TickTick 工作台启发：中栏负责浏览与轻编辑，右栏常驻详情。
              </p>
            </div>

            <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row" onSubmit={handleCreateTask}>
              <input
                className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-sm"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="输入任务标题，回车创建"
              />
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "创建中..." : "新建任务"}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">任务视图</p>
              <p className="text-sm text-muted-foreground">当前筛选：{activeListId ? "按清单" : activeView === "all" ? "所有任务" : activeView === "today" ? "今天" : activeView === "tomorrow" ? "明天" : activeView === "week" ? "本周" : "本月"}</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <input
                className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-sm"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索标题或描述"
              />
              <button
                type="button"
                onClick={() => void loadTasks()}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                搜索
              </button>
            </div>
          </div>

          {error ? (
            <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
          ) : null}

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <div className="space-y-3">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-card">
              <p className="text-base font-medium">暂无任务</p>
              <p className="mt-2 text-sm text-muted-foreground">{emptyText}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((task) => {
                const isSelected = task.id === selectedTaskId

                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`w-full rounded-2xl border bg-card px-4 py-4 text-left shadow-card transition-all hover:bg-muted/40 ${
                      isSelected ? "border-primary bg-primary/5 ring-2 ring-primary/15" : "border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 h-10 w-1 rounded-full ${
                          task.priority === "high" ? "bg-destructive" : task.priority === "medium" ? "bg-accent" : "bg-muted-foreground/40"
                        }`}
                      />
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="line-clamp-1 text-base font-semibold tracking-tight">{task.title}</h2>
                          <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                            {priorityLabelMap[task.priority]}
                          </span>
                        </div>

                        <p className="line-clamp-2 text-sm text-muted-foreground">{task.description?.trim() || "暂无描述"}</p>

                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full bg-muted px-2.5 py-1">{statusLabelMap[task.status]}</span>
                          <span className="rounded-full bg-muted px-2.5 py-1">预计 {task.estimatedMinutes ?? 0} 分钟</span>
                          <span className="rounded-full bg-muted px-2.5 py-1">实际 {task.actualMinutes} 分钟</span>
                        </div>

                        {task.dueAt ? <p className="text-xs text-muted-foreground">截止：{new Date(task.dueAt).toLocaleString("zh-CN")}</p> : null}

                        {task.taskTags?.length ? (
                          <div className="flex flex-wrap gap-2">
                            {task.taskTags.map((taskTag) => (
                              <span key={taskTag.tag.id} className="rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent-foreground">
                                {taskTag.tag.name}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            type="button"
                            onClick={(event) => void handleToggleStatus(task, event)}
                            disabled={isTogglingId === task.id}
                            className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isTogglingId === task.id ? "处理中..." : task.status === "done" ? "恢复任务" : "完成任务"}
                          </button>
                          <Link
                            href={`/tasks/${task.id}`}
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted xl:hidden"
                          >
                            详情页
                          </Link>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <TaskDetailPanel taskId={selectedTaskId} onUpdated={() => loadTasks()} />
      </div>

      <TaskDetailDrawer taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} onUpdated={() => loadTasks()} />
    </>
  )
}
