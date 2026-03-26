"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { TaskSummaryCard } from "@/components/task/task-summary-card"
import { TaskDetailDrawer } from "@/features/tasks/components/task-detail-drawer"
import { TaskDetailPanel } from "@/features/tasks/components/task-detail-panel"

type InsightsResponse = {
  range: "7d" | "30d" | "month"
  period: { start: string; end: string }
  metrics: {
    totalTasks: number
    completedTasks: number
    completionRate: number
    totalFocusSec: number
    avgActualMinutes: number
    overdueTasks: number
  }
  completionTrend: Array<{ day: string; count: number }>
  focusTrend: Array<{ day: string; durationSec: number }>
  priorityDistribution: { high: number; medium: number; low: number }
  statusDistribution: { todo: number; in_progress: number; done: number; archived: number }
  risks: Array<{ id: string; title: string; dueAt: string | null; actualMinutes: number; status: "todo" | "in_progress" | "done" | "archived" }>
}

function formatDuration(totalSec: number) {
  const hours = Math.floor(totalSec / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

function maxValue(items: number[]) {
  return Math.max(1, ...items)
}

export function InsightsPageClient() {
  const [range, setRange] = useState<InsightsResponse["range"]>("7d")
  const [data, setData] = useState<InsightsResponse | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadInsights = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/insights?range=${range}`, { credentials: "include", cache: "no-store" })
      const payload = await response.json()
      if (!response.ok || !payload.ok) throw new Error(payload?.error?.message ?? "Failed to load insights.")
      setData(payload.data as InsightsResponse)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to load insights.")
    } finally {
      setIsLoading(false)
    }
  }, [range])

  useEffect(() => {
    void loadInsights()
  }, [loadInsights])

  const completionMax = useMemo(() => maxValue((data?.completionTrend ?? []).map((item) => item.count)), [data])
  const focusMax = useMemo(() => maxValue((data?.focusTrend ?? []).map((item) => item.durationSec)), [data])

  return (
    <>
      <div className="grid h-[calc(100vh-8rem)] min-h-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(420px,28vw)]">
        <div className="flex min-h-0 min-w-0 flex-col gap-4 overflow-y-auto pr-1">
          <section className="rounded-xl border border-border/80 bg-card px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Insights</p>
                <h1 className="text-2xl font-semibold tracking-tight">洞察</h1>
                <p className="text-sm text-muted-foreground">任务执行与时间投入的基础趋势。</p>
              </div>
              <div className="flex items-center gap-2">
                {(["7d", "30d", "month"] as const).map((item) => (
                  <button key={item} type="button" onClick={() => setRange(item)} className={`inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm ${range === item ? "bg-primary text-primary-foreground" : "border border-border bg-background hover:bg-muted"}`}>
                    {item === "7d" ? "7 天" : item === "30d" ? "30 天" : "本月"}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {error ? <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div> : null}

          <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {[
              { label: "任务总数", value: data?.metrics.totalTasks ?? 0 },
              { label: "已完成", value: data?.metrics.completedTasks ?? 0 },
              { label: "完成率", value: `${data?.metrics.completionRate ?? 0}%` },
              { label: "专注时长", value: formatDuration(data?.metrics.totalFocusSec ?? 0) },
              { label: "平均耗时", value: `${data?.metrics.avgActualMinutes ?? 0} 分` },
              { label: "逾期任务", value: data?.metrics.overdueTasks ?? 0 },
            ].map((metric) => (
              <article key={metric.label} className="rounded-xl border border-border/80 bg-card px-4 py-4">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{metric.value}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-2">
            <article className="rounded-xl border border-border/80 bg-card px-4 py-4">
              <div className="mb-4">
                <h2 className="text-sm font-medium">每日完成趋势</h2>
                <p className="text-xs text-muted-foreground">按完成时间统计。</p>
              </div>
              {isLoading ? <div className="h-48 animate-pulse rounded bg-muted" /> : data?.completionTrend.length ? (
                <div className="flex h-48 items-end gap-2">
                  {data.completionTrend.map((item) => (
                    <div key={item.day} className="flex flex-1 flex-col items-center justify-end gap-2">
                      <div className="w-full rounded-t bg-primary/70" style={{ height: `${(item.count / completionMax) * 100}%` }} />
                      <span className="text-[10px] text-muted-foreground">{item.day.slice(5)}</span>
                    </div>
                  ))}
                </div>
              ) : <div className="text-sm text-muted-foreground">当前范围内没有完成记录。</div>}
            </article>

            <article className="rounded-xl border border-border/80 bg-card px-4 py-4">
              <div className="mb-4">
                <h2 className="text-sm font-medium">每日专注趋势</h2>
                <p className="text-xs text-muted-foreground">按时间记录聚合。</p>
              </div>
              {isLoading ? <div className="h-48 animate-pulse rounded bg-muted" /> : data?.focusTrend.length ? (
                <div className="flex h-48 items-end gap-2">
                  {data.focusTrend.map((item) => (
                    <div key={item.day} className="flex flex-1 flex-col items-center justify-end gap-2">
                      <div className="w-full rounded-t bg-foreground/70" style={{ height: `${(item.durationSec / focusMax) * 100}%` }} />
                      <span className="text-[10px] text-muted-foreground">{item.day.slice(5)}</span>
                    </div>
                  ))}
                </div>
              ) : <div className="text-sm text-muted-foreground">当前范围内没有时间记录。</div>}
            </article>
          </section>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
            <article className="rounded-xl border border-border/80 bg-card px-4 py-4">
              <h2 className="text-sm font-medium">优先级分布</h2>
              <div className="mt-4 space-y-3 text-sm">
                {data ? Object.entries(data.priorityDistribution).map(([key, value]) => <div key={key} className="flex items-center justify-between"><span className="text-muted-foreground">{key}</span><span>{value}</span></div>) : null}
              </div>
            </article>

            <article className="rounded-xl border border-border/80 bg-card px-4 py-4">
              <h2 className="text-sm font-medium">状态分布</h2>
              <div className="mt-4 space-y-3 text-sm">
                {data ? Object.entries(data.statusDistribution).map(([key, value]) => <div key={key} className="flex items-center justify-between"><span className="text-muted-foreground">{key}</span><span>{value}</span></div>) : null}
              </div>
            </article>

            <article className="rounded-xl border border-border/80 bg-card px-4 py-4">
              <h2 className="text-sm font-medium">关注任务</h2>
              <p className="mt-1 text-xs text-muted-foreground">逾期或累计耗时偏高，建议优先复核。</p>
              <div className="mt-3 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                建议动作：先处理逾期任务，再为高投入任务补充结构或拆成更小任务。
              </div>
              <div className="mt-4 space-y-2">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-12 animate-pulse rounded bg-muted" />)
                ) : data?.risks.length ? data.risks.map((task) => (
                  <TaskSummaryCard key={task.id} title={task.title} dueAt={task.dueAt} actualMinutes={task.actualMinutes} onClick={() => setSelectedTaskId(task.id)} />
                )) : <div className="text-sm text-muted-foreground">当前范围内没有风险任务。</div>}
              </div>
            </article>
          </section>
        </div>

        <div className="hidden xl:block min-h-0">
          <TaskDetailPanel taskId={selectedTaskId} onUpdated={loadInsights} />
        </div>
      </div>

      <TaskDetailDrawer taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} onUpdated={loadInsights} />
    </>
  )
}
