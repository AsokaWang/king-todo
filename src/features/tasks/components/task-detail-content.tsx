"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Eye, FilePenLine, Pin, Play, Plus, Trash2, XCircle } from "lucide-react"
import { DropdownSelect } from "@/components/ui/dropdown-select"

type TaskStatus = "todo" | "in_progress" | "done" | "archived"
type TaskPriority = "low" | "medium" | "high"

type TaskTag = { tag: { id: string; name: string; color?: string | null } }
type TimeEntry = { id: string; title: string; startedAt: string; endedAt: string; durationSec: number }
type Subtask = {
  id: string
  title: string
  status: TaskStatus
  taskTags?: TaskTag[]
}

export type TaskDetailData = {
  id: string
  title: string
  description?: string | null
  status: TaskStatus
  priority: TaskPriority
  dueAt?: string | null
  startAt?: string | null
  estimatedMinutes?: number | null
  actualMinutes: number
  taskTags?: TaskTag[]
  reminders?: Array<{ id: string; triggerAt: string }>
  recurrenceRule?: { id: string; rrule: string } | null
  subtasks?: Subtask[]
  timeEntries?: TimeEntry[]
}

type Props = {
  taskId: string | null
  onUpdated: () => Promise<void> | void
  onClose?: () => void
  mobile?: boolean
}

const statusOptions = [
  { value: "todo", label: "待办" },
  { value: "in_progress", label: "进行中" },
  { value: "done", label: "已完成" },
  { value: "archived", label: "已归档" },
] as const

const priorityOptions = [
  { value: "high", label: "高优先级" },
  { value: "medium", label: "中优先级" },
  { value: "low", label: "低优先级" },
] as const

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function renderMarkdown(md: string) {
  const escaped = escapeHtml(md)
  const lines = escaped.split("\n")
  const html = lines
    .map((line) => {
      if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`
      if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`
      if (line.startsWith("# ")) return `<h1>${line.slice(2)}</h1>`
      if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`
      return `<p>${line || "<br />"}</p>`
    })
    .join("")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
  return html.replace(/(<li>.*?<\/li>)+/g, (match) => `<ul>${match}</ul>`)
}

export function TaskDetailContent({ taskId, onUpdated, onClose, mobile = false }: Props) {
  const [task, setTask] = useState<TaskDetailData | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<TaskStatus>("todo")
  const [priority, setPriority] = useState<TaskPriority>("medium")
  const [estimatedMinutes, setEstimatedMinutes] = useState("")
  const [tagNames, setTagNames] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [reminderAt, setReminderAt] = useState("")
  const [recurrenceRule, setRecurrenceRule] = useState("")
  const [subtaskDraft, setSubtaskDraft] = useState("")
  const [descriptionMode, setDescriptionMode] = useState<"edit" | "preview">("edit")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isStartingTimer, setIsStartingTimer] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTaskDetail = useCallback(async (currentTaskId: string) => {
    const response = await fetch(`/api/tasks/${currentTaskId}`, { credentials: "include", cache: "no-store" })
    const payload = await response.json()
    if (!response.ok || !payload.ok) throw new Error(payload?.error?.message ?? "Failed to load task detail.")
    const data = payload.data as TaskDetailData
    setTask(data)
    setTitle(data.title)
    setDescription(data.description ?? "")
    setStatus(data.status)
    setPriority(data.priority)
    setEstimatedMinutes(data.estimatedMinutes?.toString() ?? "")
    setTagNames(data.taskTags?.map((item) => item.tag.name) ?? [])
    setReminderAt(data.reminders?.[0]?.triggerAt ? data.reminders[0].triggerAt.slice(0, 16) : "")
    setRecurrenceRule(data.recurrenceRule?.rrule ?? "")
  }, [])

  useEffect(() => {
    if (!taskId) {
      setTask(null)
      setError(null)
      return
    }
    let active = true
    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        if (active && taskId) await loadTaskDetail(taskId)
      } catch (nextError) {
        if (active) setError(nextError instanceof Error ? nextError.message : "Failed to load task detail.")
      } finally {
        if (active) setIsLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [loadTaskDetail, taskId])

  const markdownHtml = useMemo(() => renderMarkdown(description), [description])

  async function save(patch?: Record<string, unknown>) {
    if (!task) return
    setIsSaving(true)
    setError(null)
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          patch ?? {
            title: title.trim(),
            description: description.trim() ? description.trim() : null,
            status,
            priority,
            estimatedMinutes: estimatedMinutes.trim() ? Number(estimatedMinutes) : null,
            tagNames,
            reminderAt: reminderAt ? new Date(reminderAt).toISOString() : null,
            recurrenceRule: recurrenceRule.trim() ? recurrenceRule.trim() : null,
          },
        ),
      })
      const payload = await response.json()
      if (!response.ok || !payload.ok) throw new Error(payload?.error?.message ?? "Failed to update task.")
      await loadTaskDetail(task.id)
      await onUpdated()
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to update task.")
    } finally {
      setIsSaving(false)
    }
  }

  async function createSubtask() {
    if (!task || !subtaskDraft.trim()) return
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: subtaskDraft.trim(), parentTaskId: task.id, listId: undefined }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      setError(payload?.error?.message ?? "Failed to create subtask.")
      return
    }
    setSubtaskDraft("")
    await loadTaskDetail(task.id)
    await onUpdated()
  }

  async function toggleSubtask(subtask: Subtask) {
    const nextStatus = subtask.status === "done" ? "todo" : "done"
    const response = await fetch(`/api/tasks/${subtask.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: nextStatus }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      setError(payload?.error?.message ?? "Failed to update subtask.")
      return
    }
    if (task) await loadTaskDetail(task.id)
  }

  function commitTag() {
    const next = tagInput.trim()
    if (!next) return
    setTagNames((current) => (current.includes(next) ? current : [...current, next]))
    setTagInput("")
  }

  async function handleStartTimer() {
    if (!task) return
    setIsStartingTimer(true)
    try {
      const response = await fetch("/api/timer/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ taskId: task.id }),
      })
      const payload = await response.json()
      if (!response.ok || !payload.ok) throw new Error(payload?.error?.message ?? "Failed to start timer.")
      setStatus("in_progress")
      await onUpdated()
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to start timer.")
    } finally {
      setIsStartingTimer(false)
    }
  }

  async function handleDelete() {
    if (!task) return
    const confirmed = window.confirm("确认删除该任务吗？")
    if (!confirmed) return
    const response = await fetch(`/api/tasks/${task.id}`, { method: "DELETE", credentials: "include" })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      setError(payload?.error?.message ?? "Failed to delete task.")
      return
    }
    await onUpdated()
    onClose?.()
  }

  if (!taskId) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 text-center">
        <p className="text-sm font-medium text-foreground">选择一个任务</p>
        <p className="mt-2 text-sm text-muted-foreground">右侧显示滴答清单风格的任务详情。</p>
      </div>
    )
  }

  if (isLoading || !task) {
    return (
      <div className="space-y-4 p-5">
        <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-24 animate-pulse rounded bg-muted" />
        <div className="h-24 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="sticky top-0 z-10 border-b border-border/70 bg-card/95 px-5 py-4 backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Task Detail</p>
            <div className="flex items-center gap-2">
              <DropdownSelect
                items={statusOptions.map((item) => ({ value: item.value, label: item.label }))}
                value={status}
                placeholder="状态"
                onChange={(value) => setStatus(value as TaskStatus)}
                className="w-32"
              />
              <DropdownSelect
                items={priorityOptions.map((item) => ({ value: item.value, label: item.label }))}
                value={priority}
                placeholder="优先级"
                onChange={(value) => setPriority(value as TaskPriority)}
                className="w-32"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => void handleStartTimer()} disabled={isStartingTimer} className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted disabled:opacity-50">
              <Play className="mr-1 h-4 w-4" />{isStartingTimer ? "启动中" : "计时"}
            </button>
            {mobile && onClose ? <button type="button" onClick={onClose} className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted">关闭</button> : null}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="space-y-5">
          {error ? <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div> : null}

          <section className="space-y-3">
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full bg-transparent text-xl font-semibold tracking-tight outline-none placeholder:text-muted-foreground" placeholder="任务标题" />
            <div className="grid gap-2 sm:grid-cols-2">
              <input type="datetime-local" value={reminderAt} onChange={(event) => setReminderAt(event.target.value)} className="h-10 rounded-xl border border-input bg-background px-3 text-sm" />
              <input type="datetime-local" value={task.dueAt ? new Date(task.dueAt).toISOString().slice(0,16) : ""} readOnly className="h-10 rounded-xl border border-input bg-muted/40 px-3 text-sm text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-2.5 py-1">实际 {task.actualMinutes} 分钟</span>
              <span className="rounded-full bg-muted px-2.5 py-1">预计 {estimatedMinutes || 0} 分钟</span>
            </div>
          </section>

          <section className="space-y-2 border-t border-border/60 pt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Task details</h3>
              <div className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5">
                <button type="button" onClick={() => setDescriptionMode("edit")} className={`inline-flex h-8 items-center gap-1 rounded-md px-3 text-xs ${descriptionMode === "edit" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}><FilePenLine className="h-3.5 w-3.5" />编辑</button>
                <button type="button" onClick={() => setDescriptionMode("preview")} className={`inline-flex h-8 items-center gap-1 rounded-md px-3 text-xs ${descriptionMode === "preview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}><Eye className="h-3.5 w-3.5" />预览</button>
              </div>
            </div>
            {descriptionMode === "edit" ? (
              <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-[180px] w-full resize-none rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm outline-none focus:border-border/80 focus:bg-background" placeholder="支持 Markdown 输入..." />
            ) : (
              <div className="prose prose-sm max-w-none rounded-xl border border-input bg-muted/20 px-4 py-3 dark:prose-invert" dangerouslySetInnerHTML={{ __html: markdownHtml || "<p>Nothing here yet</p>" }} />
            )}
          </section>

          <section className="space-y-3 border-t border-border/60 pt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Subtasks</h3>
              <span className="text-xs text-muted-foreground">{task.subtasks?.length ?? 0}</span>
            </div>
            <div className="space-y-2">
              {task.subtasks?.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-muted/40">
                  <button type="button" onClick={() => void toggleSubtask(subtask)} className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border text-xs">
                    {subtask.status === "done" ? "✓" : ""}
                  </button>
                  <span className={`min-w-0 flex-1 truncate text-sm ${subtask.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}`}>{subtask.title}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2 text-sm text-muted-foreground">
                <Plus className="h-4 w-4" />
                <input value={subtaskDraft} onChange={(event) => setSubtaskDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void createSubtask() } }} className="h-8 flex-1 bg-transparent outline-none placeholder:text-muted-foreground" placeholder="回车创建子任务" />
              </div>
            </div>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-5">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Tags</h3>
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-input px-3 py-2 focus-within:border-border/80">
              {tagNames.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80">
                  {tag}
                  <button type="button" onClick={() => setTagNames((current) => current.filter((item) => item !== tag))} className="ml-1 text-muted-foreground hover:text-foreground">×</button>
                </span>
              ))}
              <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === ",") { event.preventDefault(); commitTag() } }} onBlur={commitTag} className="min-w-[90px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="输入标签后回车" />
            </div>
          </section>

          <section className="space-y-2 border-t border-border/60 pt-5">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Recent entries</h3>
            {task.timeEntries?.length ? task.timeEntries.map((entry) => (
              <div key={entry.id} className="rounded-xl px-3 py-2 hover:bg-muted/30">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{entry.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(entry.startedAt).toLocaleString("zh-CN")}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{Math.round(entry.durationSec / 60)} 分钟</span>
                </div>
              </div>
            )) : <p className="text-sm text-muted-foreground">暂无时间记录</p>}
          </section>
        </div>
      </div>

      <div className="sticky bottom-0 mt-auto border-t border-border/70 bg-card/95 px-5 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/tasks/${task.id}`} className="text-sm font-medium text-primary hover:underline">独立详情页</Link>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => void save({ status: "archived" })} className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><XCircle className="mr-1 h-4 w-4" />放弃</button>
            <button type="button" onClick={() => void save({ pinToTop: true })} className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm text-amber-700 hover:bg-amber-50"><Pin className="mr-1 h-4 w-4" />置顶</button>
            <button type="button" onClick={() => void handleDelete()} className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm text-destructive hover:bg-destructive/10"><Trash2 className="mr-1 h-4 w-4" />删除</button>
            <button type="button" onClick={() => void save()} disabled={isSaving || !title.trim()} className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground disabled:opacity-50">{isSaving ? "保存中" : "保存"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
