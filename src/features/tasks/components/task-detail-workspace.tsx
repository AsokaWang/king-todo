"use client"

import { TaskDetailContent } from "@/features/tasks/components/task-detail-content"

type TaskDetailWorkspaceProps = {
  taskId: string | null
  onUpdated: () => Promise<void> | void
  onClose?: () => void
  mobile?: boolean
}

export function TaskDetailWorkspace({ taskId, onUpdated, onClose, mobile = false }: TaskDetailWorkspaceProps) {
  return <TaskDetailContent taskId={taskId} onUpdated={onUpdated} onClose={onClose} mobile={mobile} />
}
