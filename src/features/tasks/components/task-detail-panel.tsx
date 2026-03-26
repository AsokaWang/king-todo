"use client"

import { TaskDetailWorkspace } from "@/features/tasks/components/task-detail-workspace"

type TaskDetailPanelProps = {
  taskId: string | null
  onUpdated: () => Promise<void> | void
}

export function TaskDetailPanel({ taskId, onUpdated }: TaskDetailPanelProps) {
  return (
    <aside className="hidden h-full min-h-0 self-stretch overflow-hidden rounded-2xl border border-border bg-card shadow-sm xl:block xl:w-full">
      <TaskDetailWorkspace taskId={taskId} onUpdated={onUpdated} />
    </aside>
  )
}
