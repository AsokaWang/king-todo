import Link from "next/link"

const routes = [
  { href: "/today", label: "今日" },
  { href: "/tasks", label: "任务" },
  { href: "/calendar", label: "日历" },
  { href: "/time-entries", label: "时间记录" },
  { href: "/insights", label: "洞察" },
  { href: "/ai", label: "AI" },
  { href: "/settings", label: "设置" },
  { href: "/sign-in", label: "登录" },
  { href: "/sign-up", label: "注册" },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">King Todo</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            P2 工程脚手架已初始化。
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            当前骨架用于承接任务、日历、时间记录与 AI 复盘的 MVP 开发。
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-xl border border-border bg-card px-4 py-4 text-card-foreground shadow-card transition-colors hover:bg-muted"
            >
              {route.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
