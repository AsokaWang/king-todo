"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type TaskStatus = "todo" | "in_progress" | "done" | "archived"
type TaskPriority = "low" | "medium" | "high"

type TaskDetail = {
  id: string
  title: string
  description?: string | null
  status: TaskStatus
  priority: TaskPriority
  dueAt?: string | null
  startAt?: string | null
  estimatedMinutes?: number | null
  actualMinutes: number
  taskTags?: Array<{
    tag: {
      id: string
      name: string
      color?: string | null
    }
  }>
  reminders?: Array<{
    id: string
    triggerAt: string
    channel: "in_app" | "email"
    status: "pending" | "sent" | "failed" | "cancelled"
  }>
  recurrenceRule?: {
    id: string
    rrule: string
    timezone: string
  } | null
  timeEntries?: Array<{
    id: string
    title: string
    startedAt: string
    endedAt: string
    durationSec: number
  }>
}

type TaskDetailDrawerProps = {
  taskId: string | null
  onClose: () => void
  onUpdated: () => Promise<void> | void
}

const statusOptions: Array<{ value: TaskStatus; label: string }> = [
  { value: "todo", label: "待办" },
  { value: "in_progress", label: "进行中" },
  { value: "done", label: "已完成" },
  { value: "archived", label: "已归档" },
]

const priorityOptions: Array<{ value: TaskPriority; label: string }> = [
  { value: "low", label: "低" },
  { value: "medium", label: "中" },
  { value: "high", label: "高" },
]

export function TaskDetailDrawer({ taskId, onClose, onUpdated }: TaskDetailDrawerProps) {
  const [task, setTask] = useState<TaskDetail | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<TaskStatus>("todo")
  const [priority, setPriority] = useState<TaskPriority>("medium")
  const [estimatedMinutes, setEstimatedMinutes] = useState("")
  const [tagNames, setTagNames] = useState("")
  const [reminderAt, setReminderAt] = useState("")
  const [recurrenceRule, setRecurrenceRule] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isStartingTimer, setIsStartingTimer] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!taskId) {
      setTask(null)
      setError(null)
      setSuccessMessage(null)
      return
    }

    let isActive = true

    async function loadTaskDetail() {
      setIsLoading(true)
      setError(null)
      setSuccessMessage(null)

      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          credentials: "include",
          cache: "no-store",
        })

        const payload = await response.json()

        if (!response.ok || !payload.ok) {
          throw new Error(payload?.error?.message ?? "Failed to load task detail.")
        }

        if (!isActive) {
          return
        }

        const data = payload.data as TaskDetail
        setTask(data)
        setTitle(data.title)
        setDescription(data.description ?? "")
        setStatus(data.status)
        setPriority(data.priority)
        setEstimatedMinutes(data.estimatedMinutes?.toString() ?? "")
        setTagNames(data.taskTags?.map((item) => item.tag.name).join(", ") ?? "")
        setReminderAt(data.reminders?.[0]?.triggerAt ? data.reminders[0].triggerAt.slice(0, 16) : "")
        setRecurrenceRule(data.recurrenceRule?.rrule ?? "")
      } catch (loadError) {
        if (!isActive) {
          return
        }

        setError(loadError instanceof Error ? loadError.message : "Failed to load task detail.")
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadTaskDetail()

    return () => {
      isActive = false
    }
  }, [taskId])

  if (!taskId) {
    return null
  }

  async function handleSave() {
    if (!task) {
      return
    }

    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() ? description.trim() : null,
          status,
          priority,
          estimatedMinutes: estimatedMinutes.trim() ? Number(estimatedMinutes) : null,
          tagNames: tagNames
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          reminderAt: reminderAt ? new Date(reminderAt).toISOString() : null,
          recurrenceRule: recurrenceRule.trim() ? recurrenceRule.trim() : null,
        }),
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to update task.")
      }

      const updated = payload.data as TaskDetail
      setTask(updated)
      setSuccessMessage("已保存修改")
      await onUpdated()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to update task.")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleStartTimer() {
    if (!task) {
      return
    }

    setIsStartingTimer(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/timer/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ taskId: task.id }),
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to start timer.")
      }

      setStatus("in_progress")
      setSuccessMessage("已开始计时")
      await onUpdated()
    } catch (startError) {
      setError(startError instanceof Error ? startError.message : "Failed to start timer.")
    } finally {
      setIsStartingTimer(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
      <button type="button" aria-label="关闭详情抽屉" className="flex-1 cursor-default" onClick={onClose} />
      <aside className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-border bg-card text-card-foreground shadow-floating">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Task Detail</p>
            <h2 className="text-xl font-semibold tracking-tight">任务详情</h2>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/tasks/${taskId}`}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-muted md:hidden"
            >
              详情页
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-muted"
            >
              关闭
            </button>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {error ? (
            <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {successMessage ? (
            <div className="rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-foreground">
              {successMessage}
            </div>
          ) : null}

          {isLoading || !task ? (
            <div className="space-y-4">
              <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-24 w-full animate-pulse rounded bg-muted" />
              <div className="h-24 w-full animate-pulse rounded bg-muted" />
            </div>
          ) : (
            <>
              <section className="space-y-4 rounded-2xl border border-border bg-background p-5">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => void handleStartTimer()}
                    disabled={isStartingTimer}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isStartingTimer ? "启动中..." : "开始计时"}
                  </button>
                  <Link
                    href={`/tasks/${task.id}`}
                    className="hidden h-11 items-center justify-center rounded-lg border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted md:inline-flex"
                  >
                    打开独立详情页
                  </Link>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">标题</label>
                  <input
                    className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="任务标题"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">描述</label>
                  <textarea
                    className="min-h-28 w-full rounded-lg border border-input bg-card px-3 py-3 text-sm"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="补充任务说明"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="space-y-2">
                    <span className="text-sm font-medium">状态</span>
                    <select
                      className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
                      value={status}
                      onChange={(event) => setStatus(event.target.value as TaskStatus)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium">优先级</span>
                    <select
                      className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
                      value={priority}
                      onChange={(event) => setPriority(event.target.value as TaskPriority)}
                    >
                      {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium">预计时长（分钟）</span>
                    <input
                      className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
                      inputMode="numeric"
                      value={estimatedMinutes}
                      onChange={(event) => setEstimatedMinutes(event.target.value.replace(/[^\d]/g, ""))}
                      placeholder="0"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-muted px-2.5 py-1">实际 {task.actualMinutes} 分钟</span>
                  {task.dueAt ? <span className="rounded-full bg-muted px-2.5 py-1">截止 {new Date(task.dueAt).toLocaleString("zh-CN")}</span> : null}
                  {task.startAt ? <span className="rounded-full bg-muted px-2.5 py-1">开始 {new Date(task.startAt).toLocaleString("zh-CN")}</span> : null}
                </div>

                {task.taskTags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {task.taskTags.map((taskTag) => (
                      <span key={taskTag.tag.id} className="rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent-foreground">
                        {taskTag.tag.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </section>

              <section className="rounded-2xl border border-border bg-background p-5">
                <div className="mb-4 space-y-1">
                  <p className="text-sm font-medium">最近时间记录</p>
                  <p className="text-sm text-muted-foreground">最近 10 条执行记录，来自 `/api/tasks/:id` 详情接口。</p>
                </div>

                {task.timeEntries?.length ? (
                  <div className="space-y-3">
                    {task.timeEntries.map((entry) => (
                      <div key={entry.id} className="rounded-xl border border-border bg-card px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{entry.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(entry.startedAt).toLocaleString("zh-CN")} - {new Date(entry.endedAt).toLocaleString("zh-CN")}
                            </p>
                          </div>
                          <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            {Math.round(entry.durationSec / 60)} 分钟
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                    还没有时间记录。
                  </div>
                )}
              </section>

              <section className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                  <p className="text-sm font-medium">标签</p>
                  <input
                    className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
                    value={tagNames}
                    onChange={(event) => setTagNames(event.target.value)}
                    placeholder="例如：工作, 深度专注"
                  />
                  <p className="text-xs text-muted-foreground">使用逗号分隔多个标签。</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                  <p className="text-sm font-medium">提醒</p>
                  <input
                    className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
                    type="datetime-local"
                    value={reminderAt}
                    onChange={(event) => setReminderAt(event.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">留空表示不设置提醒。</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                  <p className="text-sm font-medium">重复规则</p>
                  <input
                    className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
                    value={recurrenceRule}
                    onChange={(event) => setRecurrenceRule(event.target.value)}
                    placeholder="例如：FREQ=WEEKLY;BYDAY=MO"
                  />
                  <p className="text-xs text-muted-foreground">当前先直接编辑 RRULE 字符串。</p>
                </div>
              </section>
            </>
          )}
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-border bg-card/95 px-6 py-4 backdrop-blur">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={isLoading || isSaving || !title.trim()}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "保存中..." : "保存修改"}
          </button>
        </div>
      </aside>
    </div>
  )
}
