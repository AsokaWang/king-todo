"use client"

type AppErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AppError({ error, reset }: AppErrorProps) {
  return (
    <div className="rounded-2xl border border-destructive/20 bg-card p-8 shadow-card">
      <div className="space-y-3">
        <p className="text-sm font-medium text-destructive">Something went wrong</p>
        <h2 className="text-2xl font-semibold tracking-tight">页面加载失败</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {error.message || "Unexpected application error."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          重试
        </button>
      </div>
    </div>
  )
}
