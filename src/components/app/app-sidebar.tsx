"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, Calendar, CalendarCheck, CalendarDays, CalendarRange, Grid2x2, Lightbulb, List, ListTodo, Palette, Search, Settings, Settings2, Shield, Sparkles, Sun, User } from "lucide-react"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { TaskSearchModal } from "@/components/app/task-search-modal"
import { cn } from "@/lib/utils/cn"

type AppSidebarProps = {
  email: string
  avatarUrl?: string | null
}

type NestedList = {
  id: string
  name: string
  color: string | null
  parentId: string | null
  sortOrder: number
  taskCount: number
  children: NestedList[]
}

type ViewCounts = {
  all: number
  today: number
  tomorrow: number
  week: number
  month: number
}

const railNav = [
  { href: "/tasks?view=all", label: "任务", icon: ListTodo, match: "tasks" },
  { href: "/calendar", label: "日历", icon: CalendarDays },
  { href: "/quadrants", label: "四象限", icon: Grid2x2 },
  { href: "/insights", label: "洞察", icon: Lightbulb },
  { href: "/ai", label: "AI助手", icon: Sparkles },
]

const views = [
  { key: "all", label: "所有", icon: List },
  { key: "today", label: "今天", icon: CalendarCheck },
  { key: "tomorrow", label: "明天", icon: Sun },
  { key: "week", label: "本周", icon: CalendarRange },
  { key: "month", label: "本月", icon: Calendar },
] as const

const settingsNav = [
  { key: "account", label: "账户", icon: User },
  { key: "appearance", label: "主题色", icon: Palette },
  { key: "ai-model", label: "AI 模型", icon: Bot },
  { key: "preferences", label: "偏好", icon: Settings2 },
  { key: "security", label: "安全", icon: Shield },
] as const

export function AppSidebar({ email, avatarUrl }: AppSidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const accountMenuRef = useRef<HTMLDivElement | null>(null)
  const [lists, setLists] = useState<NestedList[]>([])
  const [viewCounts, setViewCounts] = useState<ViewCounts>({ all: 0, today: 0, tomorrow: 0, week: 0, month: 0 })
  const [newListName, setNewListName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [renderAccountMenu, setRenderAccountMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const activeView = useMemo(() => searchParams.get("view") ?? "all", [searchParams])
  const activeSettingsSection = useMemo(() => searchParams.get("section") ?? "appearance", [searchParams])
  const isTasksSection = pathname === "/tasks" || pathname.startsWith("/tasks/")
  const isSettingsSection = pathname === "/settings"

  useEffect(() => {
    if (!isTasksSection) {
      return
    }

    let active = true

    async function loadSidebarData() {
      const [listsResponse, summaryResponse] = await Promise.all([
        fetch("/api/lists", { credentials: "include", cache: "no-store" }),
        fetch("/api/tasks/summary", { credentials: "include", cache: "no-store" }),
      ])

      const [listsPayload, summaryPayload] = await Promise.all([listsResponse.json(), summaryResponse.json()])

      if (active && listsResponse.ok && listsPayload.ok) {
        setLists(listsPayload.data.items)
      }

      if (active && summaryResponse.ok && summaryPayload.ok) {
        setViewCounts(summaryPayload.data)
      }
    }

    void loadSidebarData()
    return () => {
      active = false
    }
  }, [isTasksSection])

  useEffect(() => {
    if (!showAccountMenu) {
      const timeout = window.setTimeout(() => setRenderAccountMenu(false), 160)
      return () => window.clearTimeout(timeout)
    }

    setRenderAccountMenu(true)

    function handlePointerDown(event: MouseEvent) {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setShowAccountMenu(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowAccountMenu(false)
      }
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showAccountMenu])

  async function reloadLists() {
    const response = await fetch("/api/lists", { credentials: "include", cache: "no-store" })
    const payload = await response.json()
    if (response.ok && payload.ok) setLists(payload.data.items)
  }

  async function handleCreateList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newListName.trim()) return

    setIsCreating(true)
    try {
      const response = await fetch("/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: newListName.trim() }),
      })

      const payload = await response.json()
      if (response.ok && payload.ok) {
        setNewListName("")
        await reloadLists()
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <aside className="hidden h-full min-h-0 shrink-0 border-r border-border bg-[hsl(var(--sidebar-panel))] lg:flex">
      <div className="flex h-full min-h-0 w-16 flex-col items-center justify-between border-r border-border bg-[hsl(var(--sidebar-rail))] py-2">
        <div className="flex w-full flex-col items-center gap-2 px-2 pt-0">
          <Link href="/today" className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background" aria-label="King Todo">
            <span className="text-sm font-semibold">KT</span>
          </Link>

          <button
            type="button"
            aria-label="搜索任务"
            onClick={() => setShowSearch(true)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-muted-foreground transition-colors hover:bg-card/70 hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>

          {railNav.map((item) => {
            const Icon = item.icon
            const active = item.match === "tasks" ? pathname === "/tasks" : pathname === item.href || pathname.startsWith(item.href.split("?")[0])

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-2xl transition-colors",
                  active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:bg-card/70 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
              </Link>
            )
          })}
        </div>

        <div ref={accountMenuRef} className="relative flex w-full flex-col items-center px-2">
          <button
            type="button"
            aria-label="账号菜单"
            onClick={() => setShowAccountMenu((value) => !value)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-200",
              pathname === "/settings" || showAccountMenu
                ? "bg-card text-foreground shadow-sm ring-1 ring-border/70"
                : "text-muted-foreground hover:bg-card/70 hover:text-foreground hover:shadow-sm",
            )}
          >
            {avatarUrl ? <Image src={avatarUrl} alt="用户头像" width={32} height={32} className="h-8 w-8 rounded-xl object-cover shadow-sm" /> : <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-xs font-semibold text-background shadow-sm">{email.slice(0, 1).toUpperCase()}</span>}
          </button>

          {renderAccountMenu ? (
            <div className={cn("absolute bottom-0 left-[60px] z-20 w-60 transition-all duration-150", showAccountMenu ? "translate-x-0 scale-100 opacity-100" : "translate-x-1 scale-95 opacity-0")}>
              <div className="absolute bottom-4 left-[-6px] h-3 w-3 rotate-45 rounded-[3px] border-l border-t border-border bg-card" />
              <div className="rounded-2xl border border-border bg-card/95 p-3 shadow-floating backdrop-blur">
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-background px-3 py-3">
                {avatarUrl ? <Image src={avatarUrl} alt="用户头像" width={36} height={36} className="h-9 w-9 rounded-xl object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-sm font-semibold text-background">{email.slice(0, 1).toUpperCase()}</span>}
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">账号</p>
                  <p className="truncate text-sm font-medium text-foreground">{email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <Link
                  href="/settings?section=appearance"
                  onClick={() => setShowAccountMenu(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-muted active:bg-muted/80",
                    pathname === "/settings" ? "bg-primary/10 font-medium text-foreground" : "text-foreground",
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span>设置</span>
                </Link>

                <div className="rounded-xl p-1 transition-colors hover:bg-muted">
                  <SignOutButton className="h-10 w-full justify-start gap-3 border-0 bg-transparent px-3 text-destructive shadow-none hover:bg-transparent hover:text-destructive" />
                </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {isTasksSection ? (
        <div className="flex h-full min-h-0 w-[236px] flex-col bg-[hsl(var(--sidebar-panel))]">
          <div className="border-b border-border px-4 py-3">
            <h1 className="text-base font-semibold tracking-tight text-foreground">任务</h1>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
            <SidebarSection title="时间范围">
              {views.map((item) => (
                <Link
                  key={item.key}
                  href={`/tasks?view=${item.key}`}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                    activeView === item.key ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <span className="rounded-full bg-background px-2 py-0.5 text-[10px] tabular-nums text-muted-foreground/80">{viewCounts[item.key]}</span>
                </Link>
              ))}
            </SidebarSection>

            <SidebarSection title="清单">
              <form className="mb-3" onSubmit={handleCreateList}>
                <div className="flex gap-2 px-2">
                  <input className="h-9 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-sm" value={newListName} onChange={(event) => setNewListName(event.target.value)} placeholder="新增清单" />
                  <button type="submit" disabled={isCreating || !newListName.trim()} className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground disabled:opacity-50">
                    添加
                  </button>
                </div>
              </form>

              <div className="space-y-1">
                {lists.length ? lists.map((item) => <ListTreeItem key={item.id} item={item} depth={0} />) : <p className="px-3 text-sm text-muted-foreground">暂无清单</p>}
              </div>
            </SidebarSection>
          </div>
        </div>
      ) : isSettingsSection ? (
        <div className="flex h-full min-h-0 w-[236px] flex-col bg-[hsl(var(--sidebar-panel))]">
          <div className="border-b border-border px-4 py-3">
            <h1 className="text-base font-semibold tracking-tight text-foreground">设置</h1>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
            <SidebarSection title="设置菜单">
              {settingsNav.map((item) => (
                <Link
                  key={item.key}
                  href={`/settings?section=${item.key}`}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    activeSettingsSection === item.key ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </SidebarSection>
          </div>
        </div>
      ) : null}

      <TaskSearchModal open={showSearch} onClose={() => setShowSearch(false)} />
    </aside>
  )
}

function ListTreeItem({ item, depth }: { item: NestedList; depth: number }) {
  return (
    <div>
      <Link
        href={`/tasks?view=all&listId=${item.id}`}
        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <span className="truncate">{item.name}</span>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground/70">{item.taskCount}</span>
      </Link>
      {item.children.length ? item.children.map((child) => <ListTreeItem key={child.id} item={child} depth={depth + 1} />) : null}
    </div>
  )
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <div className="space-y-1">{children}</div>
    </section>
  )
}
