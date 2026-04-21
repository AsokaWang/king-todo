"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  TaskDescriptionSection,
  TaskDetailFooter,
  TaskDetailHeader,
  TaskMetaSection,
  TaskStructureGuidanceSection,
  TaskSubtasksSection,
  TaskTagsSection,
  TaskTimeEntriesSection,
} from "@/features/tasks/components/task-detail-sections"
import type { FlowView, SubtaskView, TaskDetailView, TaskPriority, TaskStatus } from "@/features/tasks/contracts"

type TaskDetailData = TaskDetailView

type Props = {
  taskId: string | null
  onUpdated: () => Promise<void> | void
  onClose?: () => void
  mobile?: boolean
}

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
  const router = useRouter()
  const [task, setTask] = useState<TaskDetailData | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<TaskStatus>("todo")
  const [priority, setPriority] = useState<TaskPriority>("medium")
  const [estimatedMinutes, setEstimatedMinutes] = useState("")
  const [startAt, setStartAt] = useState("")
  const [dueAt, setDueAt] = useState("")
  const [listId, setListId] = useState("")
  const [parentTaskId, setParentTaskId] = useState("")
  const [availableLists, setAvailableLists] = useState<Array<{ value: string; label: string }>>([])
  const [availableParentTasks, setAvailableParentTasks] = useState<Array<{ value: string; label: string }>>([])
  const [tagNames, setTagNames] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [reminderAt, setReminderAt] = useState("")
  const [recurrenceRule, setRecurrenceRule] = useState("")
  const [subtaskDraft, setSubtaskDraft] = useState("")
  const [draggingSubtaskId, setDraggingSubtaskId] = useState<string | null>(null)
  const [descriptionMode, setDescriptionMode] = useState<"edit" | "preview">("edit")
  const [descriptionDirty, setDescriptionDirty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isStartingTimer, setIsStartingTimer] = useState(false)
  const [isCreatingFlow, setIsCreatingFlow] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTaskDetail = useCallback(async (currentTaskId: string) => {
    const response = await fetch(`/api/tasks/${currentTaskId}`, { credentials: "include", cache: "no-store" })
    const payload = await response.json()
    if (!response.ok || !payload.ok) throw new Error(payload?.error?.message ?? "Failed to load task detail.")
    const data = payload.data as TaskDetailData
    setTask(data)
    setTitle(data.title)
    setDescription(data.description ?? "")
    setDescriptionDirty(false)
    setStatus(data.status)
    setPriority(data.priority)
    setEstimatedMinutes(data.estimatedMinutes?.toString() ?? "")
    setStartAt(data.startAt ? new Date(data.startAt).toISOString().slice(0, 16) : "")
    setDueAt(data.dueAt ? new Date(data.dueAt).toISOString().slice(0, 16) : "")
    setListId(data.list?.id ?? "")
    setParentTaskId(data.parentTask?.id ?? "")
    setTagNames(data.taskTags?.map((item) => item.tag.name) ?? [])
    setReminderAt(data.reminders?.[0]?.triggerAt ? data.reminders[0].triggerAt.slice(0, 16) : "")
    setRecurrenceRule(data.recurrenceRule?.rrule ?? "")
  }, [])

  useEffect(() => {
    let isActive = true

    async function loadMetaOptions() {
      try {
        const [listsResponse, tasksResponse] = await Promise.all([
          fetch("/api/lists", { credentials: "include", cache: "no-store" }),
          fetch("/api/tasks?view=all&pageSize=100", { credentials: "include", cache: "no-store" }),
        ])
        const [listsPayload, tasksPayload] = await Promise.all([listsResponse.json(), tasksResponse.json()])
        if (!isActive) return
        if (listsResponse.ok && listsPayload.ok) {
          const flatten = (items: Array<{ id: string; name: string; children?: unknown[] }>, depth = 0): Array<{ value: string; label: string }> =>
            items.flatMap((item) => [
              { value: item.id, label: `${"— ".repeat(depth)}${item.name}` },
              ...flatten((item.children as Array<{ id: string; name: string; children?: unknown[] }>) ?? [], depth + 1),
            ])
          setAvailableLists(flatten(listsPayload.data.items ?? []))
        }
        if (tasksResponse.ok && tasksPayload.ok) {
          const items = (tasksPayload.data.items ?? []) as Array<{ id: string; title: string }>
          setAvailableParentTasks(items.filter((item) => item.id !== taskId).map((item) => ({ value: item.id, label: item.title })))
        }
      } catch {
      }
    }

    void loadMetaOptions()

    if (!taskId) {
      setTask(null)
      setError(null)
      return
    }
    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        if (isActive && taskId) await loadTaskDetail(taskId)
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
            startAt: startAt ? new Date(startAt).toISOString() : null,
            dueAt: dueAt ? new Date(dueAt).toISOString() : null,
            estimatedMinutes: estimatedMinutes.trim() ? Number(estimatedMinutes) : null,
            listId: listId || null,
            parentTaskId: parentTaskId || null,
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

  async function toggleSubtask(subtask: SubtaskView) {
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

  async function reorderSubtask(targetSubtaskId: string) {
    if (!task || !draggingSubtaskId || draggingSubtaskId === targetSubtaskId) return
    setError(null)
    const subtasks = [...(task.subtasks ?? [])]
    const dragIndex = subtasks.findIndex((item) => item.id === draggingSubtaskId)
    const dropIndex = subtasks.findIndex((item) => item.id === targetSubtaskId)
    if (dragIndex === -1 || dropIndex === -1) return
    const [moved] = subtasks.splice(dragIndex, 1)
    subtasks.splice(dropIndex, 0, moved)
    try {
      const responses = await Promise.all(
        subtasks.map((item, index) =>
          fetch(`/api/tasks/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ sortOrder: index }),
          }),
        ),
      )
      const failedResponse = responses.find((response) => !response.ok)
      if (failedResponse) {
        const payload = await failedResponse.json().catch(() => null)
        throw new Error(payload?.error?.message ?? "Failed to reorder subtasks.")
      }
      setDraggingSubtaskId(null)
      await loadTaskDetail(task.id)
      await onUpdated()
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to reorder subtasks.")
    }
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

  async function handleCreateFlow() {
    if (!task || isCreatingFlow) return
    setIsCreatingFlow(true)
    setError(null)

    try {
      const response = await fetch(`/api/tasks/${task.id}/flow`, { method: "POST", credentials: "include" })
      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to create flow.")
      }

      const flow = payload.data as FlowView
      await loadTaskDetail(task.id)
      await onUpdated()
      router.push(`/flows/${flow.id}`)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to create flow.")
    } finally {
      setIsCreatingFlow(false)
    }
  }

  if (!taskId) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 text-center">
        <p className="text-sm font-medium text-foreground">选择一个任务</p>
        <p className="mt-2 text-sm text-muted-foreground">右侧显示滴答清单风格的任务详情。</p>
      </div>
    )
  }

  if (isLoading || !task) {
    return (
      <div className="h-full min-h-0 space-y-4 p-5">
        <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-24 animate-pulse rounded bg-muted" />
        <div className="h-24 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <TaskDetailHeader
        status={status}
        priority={priority}
        isStartingTimer={isStartingTimer}
        mobile={mobile}
        onStatusChange={(value) => {
          setStatus(value)
          void save({ status: value })
        }}
        onPriorityChange={(value) => {
          setPriority(value)
          void save({ priority: value })
        }}
        onStartTimer={() => void handleStartTimer()}
        onClose={onClose}
      />

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="space-y-5 px-5 py-4 pb-5">
          {error ? <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div> : null}

          <TaskMetaSection
            task={task}
            title={title}
            estimatedMinutes={estimatedMinutes}
            reminderAt={reminderAt}
            startAt={startAt}
            dueAt={dueAt}
            listId={listId}
            parentTaskId={parentTaskId}
            availableLists={availableLists}
            availableParentTasks={availableParentTasks}
            onTitleChange={setTitle}
            onTitleBlur={() => {
              if (task && title.trim() && title.trim() !== task.title) {
                void save({ title: title.trim() })
              }
            }}
            onEstimatedMinutesChange={(value) => {
              setEstimatedMinutes(value)
              void save({ estimatedMinutes: value.trim() ? Number(value) : null })
            }}
            onReminderAtChange={(value) => {
              setReminderAt(value)
              void save({ reminderAt: value ? new Date(value).toISOString() : null })
            }}
            onStartAtChange={(value) => {
              setStartAt(value)
              void save({ startAt: value ? new Date(value).toISOString() : null })
            }}
            onDueAtChange={(value) => {
              setDueAt(value)
              void save({ dueAt: value ? new Date(value).toISOString() : null })
            }}
            onListIdChange={(value) => {
              setListId(value)
              void save({ listId: value || null })
            }}
            onParentTaskIdChange={(value) => {
              setParentTaskId(value)
              void save({ parentTaskId: value || null })
            }}
          />

          <TaskDescriptionSection
            description={description}
            descriptionMode={descriptionMode}
            markdownHtml={markdownHtml}
            onDescriptionChange={(value) => {
              setDescription(value)
              setDescriptionDirty(true)
            }}
            onDescriptionModeChange={setDescriptionMode}
          />
          {descriptionDirty ? <div className="-mt-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-800">描述有未保存变更，点击底部“保存”提交。</div> : null}

          <TaskSubtasksSection
            subtasks={task.subtasks}
            subtaskDraft={subtaskDraft}
            draggingSubtaskId={draggingSubtaskId}
            onToggleSubtask={(subtask) => void toggleSubtask(subtask)}
            onSubtaskDragStart={setDraggingSubtaskId}
            onSubtaskDrop={(targetSubtaskId) => void reorderSubtask(targetSubtaskId)}
            onSubtaskDraftChange={setSubtaskDraft}
            onCreateSubtask={() => void createSubtask()}
          />

          <TaskStructureGuidanceSection task={task} />

          <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Flow</p>
            {task.flow ? (
              <div className="mt-3 space-y-2">
                <p className="font-medium text-foreground">已关联 Flow：{task.flow.title}</p>
                <p className="text-sm text-muted-foreground">状态：{task.flow.status} · 步骤 {task.flow.completedStepCount}/{task.flow.stepCount}</p>
                <Link href={`/flows/${task.flow.id}`} className="text-sm font-medium text-primary hover:underline">查看 Flow 工作区</Link>
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground">当前任务尚未升级为 Flow。</p>
                <button
                  type="button"
                  onClick={() => void handleCreateFlow()}
                  disabled={isCreatingFlow}
                  className="inline-flex rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCreatingFlow ? "正在升级..." : "升级为 Flow"}
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm">
            <p className="font-medium text-foreground">下一步建议</p>
            <ul className="mt-2 space-y-2 text-muted-foreground">
              <li>先补齐时间、清单和优先级，减少执行前决策成本。</li>
              <li>如果任务已经准备好，直接开始计时进入执行。</li>
              <li>如果子任务较多或依赖复杂，后续建议升级为 Flow。</li>
            </ul>
          </div>

          <TaskTagsSection
            tagNames={tagNames}
            tagInput={tagInput}
            onRemoveTag={(tag) => setTagNames((current) => current.filter((item) => item !== tag))}
            onTagInputChange={setTagInput}
            onCommitTag={commitTag}
          />

          <TaskTimeEntriesSection task={task} />
        </div>
      </div>

      <TaskDetailFooter
        task={{ ...task, title }}
        isSaving={isSaving}
        onArchive={() => void save({ status: "cancelled" })}
        onPin={() => void save({ pinToTop: true })}
        onDelete={() => void handleDelete()}
        onSave={() => void save()}
      />
    </div>
  )
}
