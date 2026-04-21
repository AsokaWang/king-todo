export type TaskStatus = "todo" | "in_progress" | "done" | "cancelled" | "archived"
export type TaskPriority = "low" | "medium" | "high"
export type TaskSource = "manual" | "quick_add" | "ai" | "import"

export type TaskListRefView = {
  id: string
  name: string
  emoji?: string | null
  color?: string | null
}

export type TaskParentRefView = {
  id: string
  title: string
}

export type TaskTagView = {
  tag: {
    id: string
    name: string
    color?: string | null
  }
}

export type TimeEntryView = {
  id: string
  title: string
  startedAt: string
  endedAt: string
  durationSec: number
}

export type SubtaskView = {
  id: string
  title: string
  status: TaskStatus
  sortOrder?: number
  taskTags?: TaskTagView[]
}

export type TaskSummaryView = {
  subtaskCount: number
  completedSubtaskCount: number
  isOverdue: boolean
  effortSummary: {
    estimatedMinutes: number | null
    actualMinutes: number
  }
}

export type TaskListItemView = {
  id: string
  title: string
  description?: string | null
  status: TaskStatus
  priority: TaskPriority
  source?: TaskSource
  sortOrder: number
  dueAt?: string | null
  startAt?: string | null
  completedAt?: string | null
  estimatedMinutes?: number | null
  actualMinutes: number
  list?: TaskListRefView | null
  parentTask?: TaskParentRefView | null
  taskTags?: TaskTagView[]
  subtasks?: Array<{ id: string; status: TaskStatus; sortOrder?: number }>
  summary: TaskSummaryView
}

export type FlowStatus = "draft" | "active" | "done" | "cancelled"
export type FlowStepStatus = "todo" | "in_progress" | "done" | "cancelled"

export type FlowStepView = {
  id: string
  title: string
  description?: string | null
  status: FlowStepStatus
  sortOrder: number
  estimatedMinutes?: number | null
  actualMinutes: number
}

export type FlowDependencyView = {
  id: string
  fromStepId: string
  toStepId: string
  type: "finish_to_start"
}

export type FlowView = {
  id: string
  sourceTaskId?: string | null
  title: string
  description?: string | null
  status: FlowStatus
  sortOrder: number
  steps: FlowStepView[]
  dependencies: FlowDependencyView[]
  createdAt?: string
  updatedAt?: string
}

export type TaskDetailView = TaskListItemView & {
  createdAt?: string
  updatedAt?: string
  reminders?: Array<{ id: string; triggerAt: string; status?: string }>
  recurrenceRule?: { id: string; rrule: string } | null
  flow?: { id: string; title: string; status: FlowStatus; stepCount: number; completedStepCount: number } | null
  subtasks?: SubtaskView[]
  timeEntries?: TimeEntryView[]
}
