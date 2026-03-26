import Link from "next/link"
import { notFound } from "next/navigation"
import { TaskDetailWorkspace } from "@/features/tasks/components/task-detail-workspace"
import { getSession } from "@/server/auth/get-session"

type TaskDetailPageProps = {
  params: Promise<{
    taskId: string
  }>
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const session = await getSession()

  if (!session?.user) {
    notFound()
  }

  try {
    const { taskId } = await params

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Task Detail Page</p>
            <h1 className="text-3xl font-semibold tracking-tight">任务详情</h1>
            <p className="text-sm text-muted-foreground">独立页与侧边详情已统一为同一套工作区。</p>
          </div>
          <Link
            href="/tasks"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm transition-colors hover:bg-muted"
          >
            返回列表
          </Link>
        </div>

        <section className="h-[calc(100vh-14rem)] min-h-[560px] overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <TaskDetailWorkspace taskId={taskId} onUpdated={() => {}} />
        </section>
      </div>
    )
  } catch {
    notFound()
  }
}
