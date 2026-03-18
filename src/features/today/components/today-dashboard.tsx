"use client"

import Link from "next/link"
import { useState } from "react"
import { TimerActionButtons } from "@/components/timer/timer-action-buttons"

type TodayTask = {
  id: string
  title: string
  status: "todo" | "in_progress" | "done" | "archived"
  priority: "low" | "medium" | "high"
  dueAt?: string | null
}

type TodayDashboardProps = {
  data: {
    taskCount: number
    completedCount: number
    inProgressCount: number
    overdueCount: number
    trackedDurationSec: number
    tasks: TodayTask[]
    activeTimer: {
      status: "running" | "paused"
      id: string
      accumulatedSec: number
      task?: {
        id?: string
        title: string
      } | null
    } | null
  }
}

function formatDuration(totalSec: number) {
  const hours = Math.floor(totalSec / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

const statusLabelMap = {
  todo: "待办",
  in_progress: "进行中",
  done: "已完成",
  archived: "已归档",
}

const priorityLabelMap = {
  low: "低",
  medium: "中",
  high: "高",
}

export function TodayDashboard({ data }: TodayDashboardProps) {
  const [currentData, setCurrentData] = useState(data)

  const metrics = [
    { label: "今日任务", value: currentData.taskCount },
    { label: "已完成", value: currentData.completedCount },
    { label: "进行中", value: currentData.inProgressCount },
    { label: "已逾期", value: currentData.overdueCount },
    { label: "累计专注", value: formatDuration(currentData.trackedDurationSec) },
  ]

  async function refreshToday() {
    const response = await fetch("/api/today", {
      credentials: "include",
      cache: "no-store",
    })

    const payload = await response.json()

    if (response.ok && payload.ok) {
      setCurrentData(payload.data)
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-5">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Today</p>
            <h1 className="text-2xl font-semibold tracking-tight">今天</h1>
            <p className="text-sm text-muted-foreground">当前页面直接消费 `/api/today` 聚合后的真实数据。</p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{metric.value}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">今日任务</p>
              <p className="text-sm text-muted-foreground">优先展示今天开始或截止的任务。</p>
            </div>
            <Link href="/tasks" className="text-sm font-medium text-primary hover:underline">
              查看全部任务
            </Link>
          </div>

          {currentData.tasks.length ? (
            <div className="space-y-3">
              {currentData.tasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background px-4 py-4">
                  <Link href={`/tasks/${task.id}`} className="min-w-0 flex-1 space-y-2 transition-colors hover:text-primary">
                    <p className="font-medium text-foreground">{task.title}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-muted px-2.5 py-1">{statusLabelMap[task.status]}</span>
                      <span className="rounded-full bg-muted px-2.5 py-1">优先级 {priorityLabelMap[task.priority]}</span>
                      {task.dueAt ? (
                        <span className="rounded-full bg-muted px-2.5 py-1">截止 {new Date(task.dueAt).toLocaleString("zh-CN")}</span>
                      ) : null}
                    </div>
                  </Link>
                  {task.status !== "done" && task.status !== "archived" ? (
                    <TimerActionButtons compact taskId={task.id} onChanged={refreshToday} />
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              今天还没有匹配到任务。
            </div>
          )}
        </section>
      </div>

      <aside className="space-y-5">
        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="space-y-2">
            <p className="text-sm font-medium">当前计时</p>
            <p className="text-sm text-muted-foreground">展示当前活跃计时会话与任务关联。</p>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            {currentData.activeTimer ? (
              <div className="space-y-2">
                <p className="font-medium">{currentData.activeTimer.task?.title ?? "未关联任务"}</p>
                <p className="text-sm text-muted-foreground">状态：{currentData.activeTimer.status === "running" ? "进行中" : "已暂停"}</p>
                <p className="text-sm text-muted-foreground">已累计：{formatDuration(currentData.activeTimer.accumulatedSec)}</p>
                <TimerActionButtons
                  compact
                  sessionId={currentData.activeTimer.id}
                  status={currentData.activeTimer.status}
                  onChanged={refreshToday}
                />
                <Link href="/time-entries" className="text-sm font-medium text-primary hover:underline">
                  去时间记录页
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">当前没有活跃计时。</p>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-medium">今日建议</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>优先清理逾期任务</li>
            <li>先启动一项高优任务的专注计时</li>
            <li>完成后回到时间记录页复核投入</li>
          </ul>
        </article>
      </aside>
    </div>
  )
}
