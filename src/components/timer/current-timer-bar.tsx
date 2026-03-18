"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

type TimerState = {
  id: string
  status: "running" | "paused"
  startedAt?: string | null
  accumulatedSec: number
  task?: {
    id: string
    title: string
  } | null
}

function formatDuration(totalSec: number) {
  const hours = Math.floor(totalSec / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60

  if (hours > 0) {
    return [hours, minutes, seconds].map((v) => String(v).padStart(2, "0")).join(":")
  }

  return [minutes, seconds].map((v) => String(v).padStart(2, "0")).join(":")
}

export function CurrentTimerBar() {
  const [timer, setTimer] = useState<TimerState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMutating, setIsMutating] = useState(false)

  const loadCurrentTimer = useCallback(async () => {
    try {
      const response = await fetch("/api/timer/current", {
        credentials: "include",
        cache: "no-store",
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        return
      }

      setTimer(payload.data.currentTimer)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadCurrentTimer()
    const interval = window.setInterval(() => {
      void loadCurrentTimer()
    }, 15000)

    return () => window.clearInterval(interval)
  }, [loadCurrentTimer])

  useEffect(() => {
    if (!timer || timer.status !== "running") {
      return
    }

    const interval = window.setInterval(() => {
      setTimer((current) => {
        if (!current || current.status !== "running") {
          return current
        }

        return {
          ...current,
          accumulatedSec: current.accumulatedSec + 1,
        }
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [timer])

  const durationText = useMemo(() => {
    return timer ? formatDuration(timer.accumulatedSec) : "00:00"
  }, [timer])

  async function runAction(action: "pause" | "resume" | "stop") {
    if (!timer) {
      return
    }

    setIsMutating(true)

    try {
      const response = await fetch(`/api/timer/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sessionId: timer.id }),
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        return
      }

      if (action === "stop") {
        setTimer(null)
        return
      }

      setTimer(payload.data)
    } finally {
      setIsMutating(false)
    }
  }

  if (isLoading || !timer) {
    return null
  }

  return (
    <div className="h-14 shrink-0 border-b border-border bg-primary/6">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Current Timer</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-foreground">{timer.task?.title ?? "未关联任务"}</span>
            <span className="rounded-full bg-card px-2 py-1 text-xs text-muted-foreground">
              {timer.status === "running" ? "进行中" : "已暂停"}
            </span>
            <span className="font-mono text-sm text-foreground">{durationText}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {timer.status === "running" ? (
            <button
              type="button"
              disabled={isMutating}
              onClick={() => void runAction("pause")}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-card px-3 text-sm transition-colors hover:bg-muted disabled:opacity-50"
            >
              暂停
            </button>
          ) : (
            <button
              type="button"
              disabled={isMutating}
              onClick={() => void runAction("resume")}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-card px-3 text-sm transition-colors hover:bg-muted disabled:opacity-50"
            >
              继续
            </button>
          )}
          <button
            type="button"
            disabled={isMutating}
            onClick={() => void runAction("stop")}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            结束并记录
          </button>
        </div>
      </div>
    </div>
  )
}
