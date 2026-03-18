"use client"

import { useState } from "react"

type TimerActionButtonsProps = {
  sessionId?: string | null
  taskId?: string | null
  status?: "running" | "paused" | null
  compact?: boolean
  onChanged?: () => Promise<void> | void
}

export function TimerActionButtons({
  sessionId,
  taskId,
  status,
  compact = false,
  onChanged,
}: TimerActionButtonsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function runAction(action: "start" | "pause" | "resume" | "stop") {
    setIsSubmitting(true)

    try {
      const payload =
        action === "start"
          ? { taskId: taskId ?? undefined }
          : {
              sessionId: sessionId ?? undefined,
            }

      await fetch(`/api/timer/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      await onChanged?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  const baseClass = compact
    ? "inline-flex h-9 items-center justify-center rounded-lg px-3 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    : "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"

  if (status === "running") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => void runAction("pause")}
          className={`${baseClass} border border-border bg-background hover:bg-muted`}
        >
          {isSubmitting ? "处理中..." : "暂停"}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => void runAction("stop")}
          className={`${baseClass} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          {isSubmitting ? "处理中..." : "结束"}
        </button>
      </div>
    )
  }

  if (status === "paused") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => void runAction("resume")}
          className={`${baseClass} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          {isSubmitting ? "处理中..." : "继续"}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => void runAction("stop")}
          className={`${baseClass} border border-border bg-background hover:bg-muted`}
        >
          {isSubmitting ? "处理中..." : "结束"}
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      disabled={isSubmitting}
      onClick={() => void runAction("start")}
      className={`${baseClass} bg-primary text-primary-foreground hover:bg-primary/90`}
    >
      {isSubmitting ? "处理中..." : "开始专注"}
    </button>
  )
}
