"use client"

import Link from "next/link"
import { Eye, FilePenLine, Pin, Play, Plus, Trash2, XCircle } from "lucide-react"
import { DropdownSelect } from "@/components/ui/dropdown-select"
import type { SubtaskView, TaskDetailView, TaskPriority, TaskStatus } from "@/features/tasks/contracts"

const statusOptions = [
  { value: "todo", label: "待办" },
  { value: "in_progress", label: "进行中" },
  { value: "done", label: "已完成" },
  { value: "cancelled", label: "已取消" },
  { value: "archived", label: "已归档" },
] as const

const priorityOptions = [
  { value: "high", label: "高优先级" },
  { value: "medium", label: "中优先级" },
  { value: "low", label: "低优先级" },
] as const

export function TaskDetailHeader({
  status,
  priority,
  isStartingTimer,
  mobile,
  onStatusChange,
  onPriorityChange,
  onStartTimer,
  onClose,
}: {
  status: TaskStatus
  priority: TaskPriority
  isStartingTimer: boolean
  mobile: boolean
  onStatusChange: (value: TaskStatus) => void
  onPriorityChange: (value: TaskPriority) => void
  onStartTimer: () => void
  onClose?: () => void
}) {
  return (
    <div className="sticky top-0 z-10 border-b border-primary/10 bg-[linear-gradient(180deg,rgba(99,102,241,0.08),rgba(255,255,255,0.72))] px-5 py-4 backdrop-blur dark:bg-[linear-gradient(180deg,rgba(99,102,241,0.12),rgba(17,24,39,0.82))]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Task Detail
          </div>
          <div className="flex items-center gap-2">
            <DropdownSelect
              items={statusOptions.map((item) => ({ value: item.value, label: item.label }))}
              value={status}
              placeholder="状态"
              onChange={(value) => onStatusChange(value as TaskStatus)}
              className="w-32"
            />
            <DropdownSelect
              items={priorityOptions.map((item) => ({ value: item.value, label: item.label }))}
              value={priority}
              placeholder="优先级"
              onChange={(value) => onPriorityChange(value as TaskPriority)}
              className="w-32"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onStartTimer} disabled={isStartingTimer} className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted disabled:opacity-50">
            <Play className="mr-1 h-4 w-4" />{isStartingTimer ? "启动中" : "计时"}
          </button>
          {mobile && onClose ? <button type="button" onClick={onClose} className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted">关闭</button> : null}
        </div>
      </div>
    </div>
  )
}

export function TaskMetaSection({
  task,
  title,
  estimatedMinutes,
  reminderAt,
  startAt,
  dueAt,
  listId,
  parentTaskId,
  availableLists,
  availableParentTasks,
  onTitleChange,
  onTitleBlur,
  onEstimatedMinutesChange,
  onReminderAtChange,
  onStartAtChange,
  onDueAtChange,
  onListIdChange,
  onParentTaskIdChange,
}: {
  task: TaskDetailView
  title: string
  estimatedMinutes: string
  reminderAt: string
  startAt: string
  dueAt: string
  listId: string
  parentTaskId: string
  availableLists: Array<{ value: string; label: string }>
  availableParentTasks: Array<{ value: string; label: string }>
  onTitleChange: (value: string) => void
  onTitleBlur: () => void
  onEstimatedMinutesChange: (value: string) => void
  onReminderAtChange: (value: string) => void
  onStartAtChange: (value: string) => void
  onDueAtChange: (value: string) => void
  onListIdChange: (value: string) => void
  onParentTaskIdChange: (value: string) => void
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
      <div className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Overview</p>
        <p className="text-xs text-muted-foreground">编辑任务名称、时间与归属信息。</p>
      </div>
      <input value={title} onChange={(event) => onTitleChange(event.target.value)} onBlur={onTitleBlur} className="w-full bg-transparent text-xl font-semibold tracking-tight outline-none placeholder:text-muted-foreground" placeholder="任务标题" />
      <div className="grid gap-2 sm:grid-cols-2">
        <input type="datetime-local" value={startAt} onChange={(event) => onStartAtChange(event.target.value)} className="h-10 rounded-xl border border-input bg-background px-3 text-sm" />
        <input type="datetime-local" value={dueAt} onChange={(event) => onDueAtChange(event.target.value)} className="h-10 rounded-xl border border-input bg-background px-3 text-sm" />
        <input type="datetime-local" value={reminderAt} onChange={(event) => onReminderAtChange(event.target.value)} className="h-10 rounded-xl border border-input bg-background px-3 text-sm" />
        <input type="number" min="0" value={estimatedMinutes} onChange={(event) => onEstimatedMinutesChange(event.target.value)} className="h-10 rounded-xl border border-input bg-background px-3 text-sm" placeholder="预计分钟" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <DropdownSelect items={[{ value: "", label: "未分类" }, ...availableLists]} value={listId} placeholder="所属清单" onChange={onListIdChange} searchable />
        <div className="space-y-1">
          <DropdownSelect items={[{ value: "", label: "无父任务" }, ...availableParentTasks]} value={parentTaskId} placeholder="父任务" onChange={onParentTaskIdChange} searchable />
          <p className="px-1 text-[11px] text-muted-foreground">仅可选择非当前任务及其后代的任务作为父任务</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-muted px-2.5 py-1">实际 {task.actualMinutes} 分钟</span>
        <span className="rounded-full bg-muted px-2.5 py-1">预计 {estimatedMinutes || 0} 分钟</span>
        {task.list ? <span className="rounded-full bg-muted px-2.5 py-1">清单 {task.list.emoji ?? "📁"} {task.list.name}</span> : null}
        {task.parentTask ? <span className="rounded-full bg-muted px-2.5 py-1">父任务 {task.parentTask.title}</span> : null}
      </div>
    </section>
  )
}

export function TaskDescriptionSection({
  description,
  descriptionMode,
  markdownHtml,
  onDescriptionChange,
  onDescriptionModeChange,
}: {
  description: string
  descriptionMode: "edit" | "preview"
  markdownHtml: string
  onDescriptionChange: (value: string) => void
  onDescriptionModeChange: (mode: "edit" | "preview") => void
}) {
  return (
    <section className="space-y-2 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Task details</h3>
          <p className="mt-1 text-xs text-muted-foreground">支持 Markdown，适合记录上下文、清单说明与执行笔记。</p>
        </div>
        <div className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5">
          <button type="button" onClick={() => onDescriptionModeChange("edit")} className={`inline-flex h-8 items-center gap-1 rounded-md px-3 text-xs ${descriptionMode === "edit" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}><FilePenLine className="h-3.5 w-3.5" />编辑</button>
          <button type="button" onClick={() => onDescriptionModeChange("preview")} className={`inline-flex h-8 items-center gap-1 rounded-md px-3 text-xs ${descriptionMode === "preview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}><Eye className="h-3.5 w-3.5" />预览</button>
        </div>
      </div>
      {descriptionMode === "edit" ? (
        <textarea value={description} onChange={(event) => onDescriptionChange(event.target.value)} className="min-h-[180px] w-full resize-none rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm outline-none focus:border-border/80 focus:bg-background" placeholder="支持 Markdown 输入..." />
      ) : (
        <div className="prose prose-sm max-w-none rounded-xl border border-input bg-muted/20 px-4 py-3 dark:prose-invert" dangerouslySetInnerHTML={{ __html: markdownHtml || "<p>Nothing here yet</p>" }} />
      )}
    </section>
  )
}

export function TaskSubtasksSection({
  subtasks,
  subtaskDraft,
  onToggleSubtask,
  onSubtaskDragStart,
  onSubtaskDrop,
  draggingSubtaskId,
  onSubtaskDraftChange,
  onCreateSubtask,
}: {
  subtasks?: SubtaskView[]
  subtaskDraft: string
  onToggleSubtask: (subtask: SubtaskView) => void
  onSubtaskDragStart: (subtaskId: string) => void
  onSubtaskDrop: (targetSubtaskId: string) => void
  draggingSubtaskId: string | null
  onSubtaskDraftChange: (value: string) => void
  onCreateSubtask: () => void
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Subtasks</h3>
          <p className="mt-1 text-xs text-muted-foreground">支持快速新增、勾选完成与拖拽排序。</p>
        </div>
        <span className="text-xs text-muted-foreground">{subtasks?.length ?? 0}</span>
      </div>
      <div className="space-y-2">
        {subtasks?.map((subtask) => (
          <div key={subtask.id} draggable onDragStart={() => onSubtaskDragStart(subtask.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => onSubtaskDrop(subtask.id)} className={`flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-muted/40 ${draggingSubtaskId === subtask.id ? "opacity-60" : ""}`}>
            <button type="button" onClick={() => onToggleSubtask(subtask)} className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border text-xs">
              {subtask.status === "done" ? "✓" : ""}
            </button>
            <span className={`min-w-0 flex-1 truncate text-sm ${subtask.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}`}>{subtask.title}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2 text-sm text-muted-foreground">
          <Plus className="h-4 w-4" />
          <input value={subtaskDraft} onChange={(event) => onSubtaskDraftChange(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); onCreateSubtask() } }} className="h-8 flex-1 bg-transparent outline-none placeholder:text-muted-foreground" placeholder="回车创建子任务" />
        </div>
      </div>
    </section>
  )
}

export function TaskTagsSection({
  tagNames,
  tagInput,
  onRemoveTag,
  onTagInputChange,
  onCommitTag,
}: {
  tagNames: string[]
  tagInput: string
  onRemoveTag: (tag: string) => void
  onTagInputChange: (value: string) => void
  onCommitTag: () => void
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
      <div>
        <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Tags</h3>
        <p className="mt-1 text-xs text-muted-foreground">用标签标记上下文、场景和任务类型。</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-input px-3 py-2 focus-within:border-border/80">
        {tagNames.map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80">
            {tag}
            <button type="button" onClick={() => onRemoveTag(tag)} className="ml-1 text-muted-foreground hover:text-foreground">×</button>
          </span>
        ))}
        <input value={tagInput} onChange={(event) => onTagInputChange(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === ",") { event.preventDefault(); onCommitTag() } }} onBlur={onCommitTag} className="min-w-[90px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="输入标签后回车" />
      </div>
    </section>
  )
}

export function TaskStructureGuidanceSection({ task }: { task: TaskDetailView }) {
  const shouldSuggestFlow = (task.subtasks?.length ?? 0) >= 5 || Boolean(task.description && task.description.length > 240)

  return (
    <section className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
      <div>
        <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Structure</h3>
        <p className="mt-1 text-xs text-muted-foreground">Task 用于最小执行单元，Subtask 用于轻量拆解，Flow 适合有顺序、依赖或模板复用的复杂任务。</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3 text-xs">
        <div className="rounded-xl border border-border/70 bg-background/80 p-3">
          <p className="font-medium text-foreground">Task</p>
          <p className="mt-1 text-muted-foreground">单个可执行结果，适合直接开始或完成。</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-background/80 p-3">
          <p className="font-medium text-foreground">Subtask</p>
          <p className="mt-1 text-muted-foreground">轻量步骤清单，适合 3-5 个以内的小拆分。</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-background/80 p-3">
          <p className="font-medium text-foreground">Flow</p>
          <p className="mt-1 text-muted-foreground">有阶段、依赖或可复用模板时再升级为流程。</p>
        </div>
      </div>
      {shouldSuggestFlow ? (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm">
          <p className="font-medium text-foreground">建议升级为 Flow</p>
          <p className="mt-1 text-muted-foreground">当前任务已经较复杂，后续更适合支持顺序、依赖和模板化的流程结构。</p>
        </div>
      ) : null}
    </section>
  )
}

export function TaskTimeEntriesSection({ task }: { task: TaskDetailView }) {
  return (
    <section className="space-y-2 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
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
  )
}

export function TaskDetailFooter({
  task,
  isSaving,
  onArchive,
  onPin,
  onDelete,
  onSave,
}: {
  task: TaskDetailView
  isSaving: boolean
  onArchive: () => void
  onPin: () => void
  onDelete: () => void
  onSave: () => void
}) {
  return (
    <div className="border-t border-border/70 bg-card/95 px-5 py-3 backdrop-blur supports-[backdrop-filter]:bg-card/90">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Link href={`/tasks/${task.id}`} className="text-sm font-medium text-primary hover:underline">独立详情页</Link>
            <p className="mt-1 text-[11px] text-muted-foreground">深度编辑长内容或在移动端单独查看时使用。</p>
          </div>
          <span className="text-xs text-muted-foreground">右侧任务详情</span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button type="button" onClick={onArchive} className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><XCircle className="mr-1 h-4 w-4" />取消</button>
          <button type="button" onClick={onPin} className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm text-primary hover:bg-primary/10"><Pin className="mr-1 h-4 w-4" />置顶</button>
          <button type="button" onClick={onDelete} className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm text-destructive hover:bg-destructive/10"><Trash2 className="mr-1 h-4 w-4" />删除</button>
          <button type="button" onClick={onSave} disabled={isSaving || !task.title.trim()} className="inline-flex h-9 min-w-24 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50">{isSaving ? "保存中" : "保存"}</button>
        </div>
      </div>
    </div>
  )
}
