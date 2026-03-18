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
  taskTags?: Array<{ tag: { id: string; name: string } }>
  reminders?: Array<{ id: string; triggerAt: string }>
  recurrenceRule?: { id: string; rrule: string } | null
  timeEntries?: Array<{
    id: string
    title: string
    startedAt: string
    endedAt: string
    durationSec: number
  }>
}

type TaskDetailPanelProps = {
  taskId: string | null
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

export function TaskDetailPanel({ taskId, onUpdated }: TaskDetailPanelProps) {
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!taskId) {
      setTask(null)
      setError(null)
      return
    }

    let isActive = true

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/tasks/${taskId}`, { credentials: "include", cache: "no-store" })
        const payload = await response.json()

        if (!response.ok || !payload.ok) {
          throw new Error(payload?.error?.message ?? "Failed to load task detail.")
        }

        if (!isActive) return

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
      } catch (nextError) {
        if (isActive) setError(nextError instanceof Error ? nextError.message : "Failed to load task detail.")
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void load()
    return () => {
      isActive = false
    }
  }, [taskId])

  async function handleSave() {
    if (!task) return

    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() ? description.trim() : null,
          status,
          priority,
          estimatedMinutes: estimatedMinutes.trim() ? Number(estimatedMinutes) : null,
          tagNames: tagNames.split(",").map((item) => item.trim()).filter(Boolean),
          reminderAt: reminderAt ? new Date(reminderAt).toISOString() : null,
          recurrenceRule: recurrenceRule.trim() ? recurrenceRule.trim() : null,
        }),
      })

      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to update task.")
      }

      setTask(payload.data as TaskDetail)
      await onUpdated()
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to update task.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <aside className="hidden h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-card xl:block">
      {!taskId ? (
        <EmptyState />
      ) : isLoading || !task ? (
        <LoadingState />
      ) : (
        <div className="space-y-5">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Task Detail</p>
            <h2 className="text-xl font-semibold tracking-tight">{task.title}</h2>
          </div>

          {error ? <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div> : null}

          <Link href={`/tasks/${task.id}`} className="inline-flex text-sm font-medium text-primary hover:underline">
            打开独立详情页
          </Link>

          <Field label="标题">
            <input className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" value={title} onChange={(event) => setTitle(event.target.value)} />
          </Field>

          <Field label="描述">
            <textarea className="min-h-24 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm" value={description} onChange={(event) => setDescription(event.target.value)} />
          </Field>

          <div className="grid gap-3">
            <Field label="状态">
              <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value as TaskStatus)}>
                {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </Field>
            <Field label="优先级">
              <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)}>
                {priorityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </Field>
            <Field label="预计时长（分钟）">
              <input className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" inputMode="numeric" value={estimatedMinutes} onChange={(event) => setEstimatedMinutes(event.target.value.replace(/[^\d]/g, ""))} />
            </Field>
          </div>

          <div className="grid gap-3">
            <Field label="标签">
              <input className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" value={tagNames} onChange={(event) => setTagNames(event.target.value)} placeholder="工作, 深度专注" />
            </Field>
            <Field label="提醒">
              <input className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" type="datetime-local" value={reminderAt} onChange={(event) => setReminderAt(event.target.value)} />
            </Field>
            <Field label="重复规则">
              <input className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" value={recurrenceRule} onChange={(event) => setRecurrenceRule(event.target.value)} placeholder="FREQ=WEEKLY;BYDAY=MO" />
            </Field>
          </div>

          <section className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-medium">最近时间记录</p>
            <div className="mt-3 space-y-2">
              {task.timeEntries?.length ? task.timeEntries.map((entry) => (
                <div key={entry.id} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
                  <p className="font-medium">{entry.title}</p>
                  <p className="text-xs text-muted-foreground">{Math.round(entry.durationSec / 60)} 分钟</p>
                </div>
              )) : <p className="text-sm text-muted-foreground">暂无时间记录</p>}
            </div>
          </section>

          <button type="button" onClick={() => void handleSave()} disabled={isSaving || !title.trim()} className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            {isSaving ? "保存中..." : "保存修改"}
          </button>
        </div>
      )}
    </aside>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background px-6 text-center">
      <p className="text-sm font-medium text-foreground">选择一个任务</p>
      <p className="mt-2 text-sm text-muted-foreground">右侧面板会显示标题、提醒、重复规则与时间记录。</p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
      <div className="h-24 animate-pulse rounded bg-muted" />
      <div className="h-24 animate-pulse rounded bg-muted" />
    </div>
  )
}
