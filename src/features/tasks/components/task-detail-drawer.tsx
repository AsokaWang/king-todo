"use client"

import { TaskDetailWorkspace } from "@/features/tasks/components/task-detail-workspace"

type TaskDetailDrawerProps = {
  taskId: string | null
  onClose: () => void
  onUpdated: () => Promise<void> | void
}

export function TaskDetailDrawer({ taskId, onClose, onUpdated }: TaskDetailDrawerProps) {
  if (!taskId) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm xl:hidden">
      <button type="button" aria-label="关闭详情抽屉" className="flex-1 cursor-default" onClick={onClose} />
      <aside className="relative h-full w-full max-w-2xl overflow-hidden border-l border-border bg-card shadow-floating">
        <TaskDetailWorkspace taskId={taskId} onUpdated={onUpdated} onClose={onClose} mobile />
      </aside>
    </div>
  )
}
