import Link from "next/link"
import { notFound } from "next/navigation"
import { getSession } from "@/server/auth/get-session"
import { getTaskByIdForUser } from "@/features/tasks/server/task.service"

type TaskDetailPageProps = {
  params: Promise<{
    taskId: string
  }>
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

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const session = await getSession()

  if (!session?.user) {
    notFound()
  }

  try {
    const { taskId } = await params
    const task = await getTaskByIdForUser(session.user, taskId)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Task Detail Page</p>
            <h1 className="text-3xl font-semibold tracking-tight">{task.title}</h1>
            <p className="text-sm text-muted-foreground">移动端可优先使用该独立详情页。</p>
          </div>
          <Link
            href="/tasks"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm transition-colors hover:bg-muted"
          >
            返回列表
          </Link>
        </div>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-2.5 py-1">{statusLabelMap[task.status]}</span>
              <span className="rounded-full bg-muted px-2.5 py-1">优先级 {priorityLabelMap[task.priority]}</span>
              <span className="rounded-full bg-muted px-2.5 py-1">实际 {task.actualMinutes} 分钟</span>
            </div>

            <p className="text-sm leading-7 text-muted-foreground">{task.description?.trim() || "暂无描述"}</p>

            {task.taskTags.length ? (
              <div className="flex flex-wrap gap-2">
                {task.taskTags.map((taskTag) => (
                  <span key={taskTag.tag.id} className="rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent-foreground">
                    {taskTag.tag.name}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-medium">计划信息</p>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <p>开始：{task.startAt ? new Date(task.startAt).toLocaleString("zh-CN") : "未设置"}</p>
                  <p>截止：{task.dueAt ? new Date(task.dueAt).toLocaleString("zh-CN") : "未设置"}</p>
                  <p>预计时长：{task.estimatedMinutes ?? 0} 分钟</p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-medium">最近时间记录</p>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {task.timeEntries.length ? (
                    task.timeEntries.map((entry) => (
                      <div key={entry.id} className="rounded-lg border border-border bg-card px-3 py-2">
                        <p className="font-medium text-foreground">{entry.title}</p>
                        <p>{Math.round(entry.durationSec / 60)} 分钟</p>
                      </div>
                    ))
                  ) : (
                    <p>暂无时间记录</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  } catch {
    notFound()
  }
}
