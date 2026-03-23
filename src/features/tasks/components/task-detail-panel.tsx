"use client"

import { TaskDetailContent } from "@/features/tasks/components/task-detail-content"

type TaskDetailPanelProps = {
  taskId: string | null
  onUpdated: () => Promise<void> | void
}

export function TaskDetailPanel({ taskId, onUpdated }: TaskDetailPanelProps) {
  return (
    <aside className="hidden h-[calc(100vh-8rem)] self-start overflow-hidden rounded-2xl border border-border bg-card shadow-sm xl:block xl:w-[420px]">
      <TaskDetailContent taskId={taskId} onUpdated={onUpdated} />
    </aside>
  )
}
