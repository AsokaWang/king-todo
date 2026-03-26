"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TaskSummaryCard } from "@/components/task/task-summary-card"
import { TaskDetailDrawer } from "@/features/tasks/components/task-detail-drawer"
import { TaskDetailPanel } from "@/features/tasks/components/task-detail-panel"

type CalendarEvent = {
  id: string
  title: string
  status: "todo" | "in_progress" | "done" | "archived"
  priority: "low" | "medium" | "high"
  startAt: string | null
  dueAt: string | null
  isAllDayLike: boolean
  list?: {
    id: string
    name: string
    emoji: string | null
    color: string | null
  } | null
}

type CalendarDay = {
  date: string
  isToday: boolean
  isCurrentMonth: boolean
  items: CalendarEvent[]
}

type CalendarResponse = {
  view: "month" | "week" | "day"
  anchor: string
  range: { start: string; end: string }
  events: CalendarEvent[]
  days: CalendarDay[]
}

function formatRangeTitle(data: CalendarResponse | null) {
  if (!data) return ""
  const start = new Date(data.range.start)
  const end = new Date(data.range.end)
  if (data.view === "day") return start.toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "short" })
  if (data.view === "month") return start.toLocaleDateString("zh-CN", { year: "numeric", month: "long" })
  return `${start.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })} - ${end.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })}`
}

function shiftAnchor(anchor: string, view: CalendarResponse["view"], direction: -1 | 1) {
  const next = new Date(anchor)
  if (view === "month") next.setMonth(next.getMonth() + direction)
  else if (view === "week") next.setDate(next.getDate() + direction * 7)
  else next.setDate(next.getDate() + direction)
  return next.toISOString()
}

export function CalendarPageClient() {
  const [view, setView] = useState<CalendarResponse["view"]>("month")
  const [anchor, setAnchor] = useState(() => new Date().toISOString())
  const [data, setData] = useState<CalendarResponse | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCalendar = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({ view, anchor })
      const response = await fetch(`/api/calendar?${params.toString()}`, { credentials: "include", cache: "no-store" })
      const payload = await response.json()
      if (!response.ok || !payload.ok) throw new Error(payload?.error?.message ?? "Failed to load calendar.")
      const nextData = payload.data as CalendarResponse
      setData(nextData)
      setSelectedDate((current) => {
        if (current && nextData.days.some((day) => day.date === current)) {
          return current
        }

        const today = nextData.days.find((day) => day.isToday)
        return today?.date ?? nextData.days[0]?.date ?? null
      })
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to load calendar.")
    } finally {
      setIsLoading(false)
    }
  }, [anchor, view])

  useEffect(() => {
    void loadCalendar()
  }, [loadCalendar])

  const selectedDay = useMemo(() => data?.days.find((day) => day.date === selectedDate) ?? null, [data, selectedDate])

  return (
    <>
      <div className="grid h-[calc(100vh-8rem)] min-h-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(440px,30vw)] 2xl:grid-cols-[minmax(0,1fr)_minmax(480px,32vw)]">
        <div className="flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden">
          <section className="rounded-xl border border-border/80 bg-card px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Calendar</p>
                <h1 className="text-2xl font-semibold tracking-tight">日历</h1>
                <p className="text-sm text-muted-foreground">把带时间的任务映射成排期视图。</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(["month", "week", "day"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setView(item)}
                    className={`inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm ${view === item ? "bg-primary text-primary-foreground" : "border border-border bg-background hover:bg-muted"}`}
                  >
                    {item === "month" ? "月" : item === "week" ? "周" : "日"}
                  </button>
                ))}
                <button type="button" onClick={() => setAnchor(shiftAnchor(anchor, view, -1))} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
                <button type="button" onClick={() => setAnchor(new Date().toISOString())} className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted">今天</button>
                <button type="button" onClick={() => setAnchor(shiftAnchor(anchor, view, 1))} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{formatRangeTitle(data)}</div>
          </section>

          {error ? <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div> : null}

          <section className="min-h-0 flex-1 overflow-hidden rounded-xl border border-border/80 bg-card">
            {isLoading ? (
              <div className="grid h-full grid-cols-7 gap-px bg-border/60">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div key={index} className="bg-card p-3"><div className="h-4 w-12 animate-pulse rounded bg-muted" /></div>
                ))}
              </div>
            ) : data?.days.length ? (
              <div className="grid h-full min-h-0 grid-cols-7 gap-px bg-border/60">
                {data.days.map((day) => (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => setSelectedDate(day.date)}
                    className={`min-h-[120px] p-3 text-left align-top transition-colors hover:bg-muted/30 ${day.isCurrentMonth ? "bg-card" : "bg-muted/20"} ${selectedDate === day.date ? "bg-muted/40" : ""}`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`text-sm font-medium ${day.isToday ? "text-primary" : day.isCurrentMonth ? "text-foreground" : "text-muted-foreground"}`}>{new Date(`${day.date}T00:00:00`).toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })}</span>
                      <span className="text-xs text-muted-foreground">{day.items.length}</span>
                    </div>
                    <div className="space-y-2">
                      {day.items.slice(0, view === "month" ? 3 : view === "week" ? 5 : 8).map((item) => (
                        <TaskSummaryCard key={item.id} title={item.title} dueAt={item.startAt} list={item.list} compact onClick={() => setSelectedTaskId(item.id)} />
                      ))}
                      {view === "month" && day.items.length > 3 ? <div className="text-xs text-muted-foreground">+{day.items.length - 3} 更多</div> : null}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">当前范围内没有排期任务。</div>
            )}
          </section>
        </div>

        <div className="hidden xl:block min-h-0">
          <div className="flex h-full min-h-0 flex-col gap-4">
            <section className="rounded-xl border border-border/80 bg-card px-4 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Selected day</p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">{selectedDay ? new Date(selectedDay.date).toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "long" }) : "选择日期"}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{selectedDay ? `共 ${selectedDay.items.length} 条任务` : "点击日历中的任一天查看摘要"}</p>
            </section>
            <section className="min-h-0 flex-1 overflow-hidden">
              <TaskDetailPanel taskId={selectedTaskId} onUpdated={loadCalendar} />
            </section>
          </div>
        </div>
      </div>

      <TaskDetailDrawer taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} onUpdated={loadCalendar} />
    </>
  )
}
