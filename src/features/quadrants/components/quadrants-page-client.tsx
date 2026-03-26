"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { TaskSummaryCard } from "@/components/task/task-summary-card"
import { TaskDetailDrawer } from "@/features/tasks/components/task-detail-drawer"
import { TaskDetailPanel } from "@/features/tasks/components/task-detail-panel"

type QuadrantTask = {
  id: string
  title: string
  status: "todo" | "in_progress" | "done" | "archived"
  priority: "low" | "medium" | "high"
  dueAt: string | null
  list?: { id: string; name: string; emoji: string | null; color: string | null } | null
  taskTags?: Array<{ tag: { id: string; name: string; color: string | null } }>
}

type QuadrantsResponse = {
  rule: { important: string; urgent: string }
  totals: { all: number; overdue: number }
  quadrants: Record<"important_urgent" | "important_not_urgent" | "not_important_urgent" | "not_important_not_urgent", QuadrantTask[]>
}

const quadrantMeta = {
  important_urgent: { title: "重要且紧急", tone: "text-destructive" },
  important_not_urgent: { title: "重要不紧急", tone: "text-primary" },
  not_important_urgent: { title: "紧急不重要", tone: "text-amber-600" },
  not_important_not_urgent: { title: "不重要不紧急", tone: "text-muted-foreground" },
} as const

export function QuadrantsPageClient() {
  const [data, setData] = useState<QuadrantsResponse | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [selectedQuadrant, setSelectedQuadrant] = useState<keyof typeof quadrantMeta>("important_urgent")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadQuadrants = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/quadrants", { credentials: "include", cache: "no-store" })
      const payload = await response.json()
      if (!response.ok || !payload.ok) throw new Error(payload?.error?.message ?? "Failed to load quadrants.")
      setData(payload.data as QuadrantsResponse)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to load quadrants.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadQuadrants()
  }, [loadQuadrants])

  const selectedTasks = useMemo(() => data?.quadrants[selectedQuadrant] ?? [], [data, selectedQuadrant])

  return (
    <>
      <div className="grid h-[calc(100vh-8rem)] min-h-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(440px,30vw)] 2xl:grid-cols-[minmax(0,1fr)_minmax(480px,32vw)]">
        <div className="flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden">
          <section className="rounded-xl border border-border/80 bg-card px-4 py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Quadrants</p>
            <h1 className="text-2xl font-semibold tracking-tight">四象限</h1>
            <p className="mt-1 text-sm text-muted-foreground">重要 = 高优先级，紧急 = 今天结束前到期或已逾期。</p>
            {data ? <p className="mt-2 text-sm text-muted-foreground">任务 {data.totals.all} · 逾期 {data.totals.overdue}</p> : null}
          </section>

          {error ? <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div> : null}

          <section className="grid min-h-0 flex-1 gap-4 md:grid-cols-2 md:grid-rows-2">
            <div className="md:col-span-2 flex items-center justify-between px-1 text-xs text-muted-foreground">
              <span>紧急 ↑</span>
              <span>重要 →</span>
            </div>
            {(Object.keys(quadrantMeta) as Array<keyof typeof quadrantMeta>).map((key) => {
              const items = data?.quadrants[key] ?? []
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedQuadrant(key)}
                  className={`flex min-h-[220px] min-w-0 flex-col rounded-xl border bg-card px-4 py-4 text-left transition-colors hover:bg-muted/20 ${selectedQuadrant === key ? "border-primary" : "border-border/80"}`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <h2 className={`text-lg font-semibold tracking-tight ${quadrantMeta[key].tone}`}>{quadrantMeta[key].title}</h2>
                      <p className="text-xs text-muted-foreground">{items.length} 条任务</p>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-12 animate-pulse rounded bg-muted" />)}
                    </div>
                  ) : items.length ? (
                    <div className="space-y-2 overflow-y-auto">
                      {items.slice(0, 6).map((task) => (
                        <TaskSummaryCard key={task.id} title={task.title} dueAt={task.dueAt} list={task.list} onClick={() => setSelectedTaskId(task.id)} />
                      ))}
                      {items.length > 6 ? <div className="text-xs text-muted-foreground">还有 {items.length - 6} 条</div> : null}
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">当前象限暂无任务</div>
                  )}
                </button>
              )
            })}
          </section>
        </div>

        <div className="hidden xl:block min-h-0">
          <div className="flex h-full min-h-0 flex-col gap-4">
            <section className="rounded-xl border border-border/80 bg-card px-4 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Selected quadrant</p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">{quadrantMeta[selectedQuadrant].title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">当前象限共 {selectedTasks.length} 条任务</p>
            </section>
            <section className="min-h-0 flex-1 overflow-hidden">
              <TaskDetailPanel taskId={selectedTaskId} onUpdated={loadQuadrants} />
            </section>
          </div>
        </div>
      </div>

      <TaskDetailDrawer taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} onUpdated={loadQuadrants} />
    </>
  )
}
