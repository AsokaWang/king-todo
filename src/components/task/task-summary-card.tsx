"use client"

type TaskSummaryCardProps = {
  title: string
  dueAt?: string | null
  list?: { id?: string; name: string; emoji?: string | null; color?: string | null } | null
  actualMinutes?: number | null
  compact?: boolean
  onClick?: () => void
}

export function TaskSummaryCard({ title, dueAt, list, actualMinutes, compact = false, onClick }: TaskSummaryCardProps) {
  const content = (
    <div className={`rounded-lg border border-border/70 bg-background px-3 ${compact ? "py-1.5" : "py-2"} hover:bg-muted/40`}>
      <p className={`truncate font-medium ${compact ? "text-xs" : "text-sm"}`}>{title}</p>
      <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {dueAt ? <span>截止 {new Date(dueAt).toLocaleString("zh-CN")}</span> : null}
        {list ? <span>{list.emoji ?? "📁"} {list.name}</span> : null}
        {typeof actualMinutes === "number" ? <span>实际 {actualMinutes} 分钟</span> : null}
      </div>
    </div>
  )

  if (onClick) {
    return <button type="button" onClick={onClick} className="w-full text-left">{content}</button>
  }

  return content
}
