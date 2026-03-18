"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { TimerActionButtons } from "@/components/timer/timer-action-buttons"

type TimeEntry = {
  id: string
  title: string
  startedAt: string
  endedAt: string
  durationSec: number
  task?: {
    id: string
    title: string
  } | null
}

type TimeEntriesResponse = {
  items: TimeEntry[]
  totalCount: number
  totalDurationSec: number
  currentTimer: {
    id: string
    status: "running" | "paused"
    accumulatedSec: number
    task?: {
      title: string
    } | null
  } | null
}

function formatDuration(totalSec: number) {
  const hours = Math.floor(totalSec / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60

  if (hours > 0) {
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":")
  }

  return [minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":")
}

export function TimeEntriesPageClient() {
  const [data, setData] = useState<TimeEntriesResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTimeEntries = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/time-entries", {
        credentials: "include",
        cache: "no-store",
      })

      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to load time entries.")
      }

      setData(payload.data as TimeEntriesResponse)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load time entries.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadTimeEntries()
  }, [loadTimeEntries])

  const totalDurationText = useMemo(() => {
    return data ? formatDuration(data.totalDurationSec) : "00:00"
  }, [data])

  async function refreshEntries() {
    await loadTimeEntries()
  }

  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-5">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Time Entries</p>
            <h1 className="text-2xl font-semibold tracking-tight">时间记录</h1>
            <p className="text-sm text-muted-foreground">当前页面直接消费 `TimeEntry` 数据与当前计时状态。</p>
          </div>
        </section>

        {error ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">总记录数</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{data?.totalCount ?? 0}</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">累计时长</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{totalDurationText}</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">当前计时</p>
            <p className="mt-2 text-lg font-semibold tracking-tight">{data?.currentTimer ? data.currentTimer.task?.title ?? "未关联任务" : "无活跃计时"}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {data?.currentTimer ? `状态：${data.currentTimer.status === "running" ? "进行中" : "已暂停"}` : "可从任务详情开始计时"}
            </p>
            {data?.currentTimer ? (
              <div className="mt-3">
                <TimerActionButtons compact sessionId={data.currentTimer.id} status={data.currentTimer.status} onChanged={refreshEntries} />
              </div>
            ) : null}
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">最近时间条目</p>
              <p className="text-sm text-muted-foreground">最近 30 条自动或手动沉淀的时间记录。</p>
            </div>
            <button
              type="button"
              onClick={() => void loadTimeEntries()}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm transition-colors hover:bg-muted"
            >
              刷新
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-xl border border-border bg-background px-4 py-4">
                  <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : data?.items.length ? (
            <div className="space-y-3">
              {data.items.map((entry) => (
                <article key={entry.id} className="rounded-xl border border-border bg-background px-4 py-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{entry.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.startedAt).toLocaleString("zh-CN")} - {new Date(entry.endedAt).toLocaleString("zh-CN")}
                      </p>
                      <p className="text-sm text-muted-foreground">关联任务：{entry.task?.title ?? "未关联任务"}</p>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{formatDuration(entry.durationSec)}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              还没有时间记录，先从任务详情里开始一次计时。
            </div>
          )}
        </section>
      </div>

      <aside className="space-y-5">
        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-medium">当前计时会话</p>
          <div className="mt-3 rounded-xl border border-border bg-background p-4">
            {data?.currentTimer ? (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{data.currentTimer.task?.title ?? "未关联任务"}</p>
                <p>状态：{data.currentTimer.status === "running" ? "进行中" : "已暂停"}</p>
                <p>已累计：{formatDuration(data.currentTimer.accumulatedSec)}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">暂无活跃计时。</p>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-medium">使用建议</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>先从任务详情启动计时</li>
            <li>暂停后记得继续或结束沉淀记录</li>
            <li>每天复盘时间投入是否匹配优先级</li>
          </ul>
        </article>
      </aside>
    </div>
  )
}
