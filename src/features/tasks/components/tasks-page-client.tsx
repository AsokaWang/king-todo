"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
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
  list?: {
    id: string
    name: string
    emoji?: string | null
    color?: string | null
  } | null
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

type ListGroup = {
  id: string
  name: string
  emoji?: string | null
  color?: string | null
  tasks: TaskItem[]
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

const TASK_LIST_COLLAPSED_STORAGE_KEY = "king-todo-task-list-collapsed"

export function TasksPageClient() {
  const [items, setItems] = useState<TaskItem[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTogglingId, setIsTogglingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [collapsedListIds, setCollapsedListIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const raw = window.localStorage.getItem(TASK_LIST_COLLAPSED_STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeView = searchParams.get("view") ?? "all"
  const activeListId = searchParams.get("listId") ?? ""

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(TASK_LIST_COLLAPSED_STORAGE_KEY, JSON.stringify(collapsedListIds))
  }, [collapsedListIds])

  const groupedByList = useMemo(() => {
    const groups = new Map<string, ListGroup>()
    
    for (const task of items) {
      const listId = task.list?.id ?? "no-list"
      
      if (!groups.has(listId)) {
        groups.set(listId, {
          id: listId,
          name: task.list?.name ?? "其他",
          emoji: task.list?.emoji ?? "📁",
          color: task.list?.color ?? "#6b8dff",
          tasks: [],
        })
      }
      
      groups.get(listId)!.tasks.push(task)
    }
    
    return Array.from(groups.values())
  }, [items])

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

  function toggleListCollapsed(listId: string) {
    setCollapsedListIds((current) =>
      current.includes(listId) ? current.filter((id) => id !== listId) : [...current, listId]
    )
  }

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
            <div className="space-y-4">
              {groupedByList.map((group) => {
                const isCollapsed = collapsedListIds.includes(group.id)
                const hasNoList = group.id === "no-list"

                return (
                  <div key={group.id} className="space-y-2">
                    {!hasNoList && (
                      <button
                        type="button"
                        onClick={() => toggleListCollapsed(group.id)}
                        className="group flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors hover:bg-muted/50"
                      >
                        <ChevronRight
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            isCollapsed ? "-rotate-90" : "rotate-90"
                          }`}
                        />
                        <span className="text-lg">{group.emoji}</span>
                        <span className="text-sm font-medium text-foreground">{group.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {group.tasks.filter((t) => t.status === "done").length}/{group.tasks.length}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenMenuId(openMenuId === group.id ? null : group.id)
                          }}
                          className="ml-1 hidden h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted group-hover:inline-flex"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </button>
                    )}

                    {!isCollapsed && (
                      <div className="space-y-2 pl-4">
                        {group.tasks.map((task) => {
                          const isSelected = task.id === selectedTaskId

                          return (
                            <button
                              key={task.id}
                              type="button"
                              onClick={() => setSelectedTaskId(task.id)}
                              className={`w-full rounded-2xl border bg-card px-4 py-3 text-left shadow-card transition-all hover:bg-muted/40 ${
                                isSelected
                                  ? "border-primary bg-primary/5 ring-2 ring-primary/15"
                                  : "border-border"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                  <h2 className="line-clamp-1 text-sm font-medium text-foreground">
                                    {task.title}
                                  </h2>
                                </div>
                                <div
                                  className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                                    task.priority === "high"
                                      ? "bg-destructive"
                                      : task.priority === "medium"
                                        ? "bg-accent"
                                        : "bg-muted-foreground/40"
                                  }`}
                                />
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
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
