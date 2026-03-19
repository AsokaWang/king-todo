"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, Calendar, CalendarCheck, CalendarDays, CalendarRange, Check, ChevronRight, FolderPlus, Grid2x2, Lightbulb, List, ListTodo, MoreHorizontal, Palette, Plus, Search, Settings, Settings2, Shield, Sparkles, Sun, User, X } from "lucide-react"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { TaskSearchModal } from "@/components/app/task-search-modal"
import { emojiCategoryLabels, emojiCategoryOrder, emojiSeedsByCategory, type EmojiCategoryKey, type EmojiSeedItem } from "@/data/emojis"
import { cn } from "@/lib/utils/cn"

type AppSidebarProps = {
  email: string
  avatarUrl?: string | null
}

type NestedList = {
  id: string
  emoji: string | null
  name: string
  color: string | null
  parentId: string | null
  sortOrder: number
  taskCount: number
  completedTaskCount: number
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

const listColorOptions = [
  "#6b8dff",
  "#4f7cff",
  "#46b6c9",
  "#34c3b3",
  "#5fa38c",
  "#7cb342",
  "#a6d94e",
  "#d6c94f",
  "#f0a33e",
  "#c58a52",
  "#e06d5d",
  "#d95c45",
  "#ef5b7d",
  "#d96adf",
  "#9b84e8",
  "#7a6ff0",
  "#8d6e63",
  "#78909c",
  "#111827",
] satisfies string[]
const colorFamilies = [
  { key: "warm", label: "暖色", colors: ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#fb7185", "#ec4899"] },
  { key: "green", label: "绿青", colors: ["#84cc16", "#22c55e", "#10b981", "#14b8a6", "#34d399", "#2dd4bf"] },
  { key: "blue", label: "蓝色", colors: ["#38bdf8", "#0ea5e9", "#3b82f6", "#6366f1", "#60a5fa", "#818cf8"] },
  { key: "purple", label: "紫粉", colors: ["#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f472b6", "#c084fc"] },
  { key: "neutral", label: "中性", colors: ["#78716c", "#a8a29e", "#64748b", "#6b7280", "#374151", "#111827"] },
] as const
const LIST_COLLAPSED_STORAGE_KEY = "king-todo-collapsed-lists"
const LIST_RECENT_EMOJIS_STORAGE_KEY = "king-todo-recent-emojis"
const INLINE_ROOT_ID = "__root__"
type EmojiDataItem = {
  emoji: string
  unified: string
  keywords: string[]
}

const settingsNav = [
  { key: "account", label: "账户", icon: User },
  { key: "appearance", label: "主题色", icon: Palette },
  { key: "ai-model", label: "AI 模型", icon: Bot },
  { key: "preferences", label: "偏好", icon: Settings2 },
  { key: "security", label: "安全", icon: Shield },
] as const

const emojiDataset = emojiCategoryOrder.reduce<Record<EmojiCategoryKey, EmojiDataItem[]>>((accumulator, category) => {
  const rawItems = emojiSeedsByCategory[category] ?? []
  accumulator[category] = rawItems.map((item: EmojiSeedItem) => ({
    emoji: unifiedToEmoji(item.unified),
    unified: item.unified,
    keywords: item.keywords,
  }))
  return accumulator
}, {} as Record<EmojiCategoryKey, EmojiDataItem[]>)

export function AppSidebar({ email, avatarUrl }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const accountMenuRef = useRef<HTMLDivElement | null>(null)
  const emojiTriggerRef = useRef<HTMLButtonElement | null>(null)
  const emojiPopoverRef = useRef<HTMLDivElement | null>(null)
  const parentSelectRef = useRef<HTMLDivElement | null>(null)
  const [lists, setLists] = useState<NestedList[]>([])
  const [viewCounts, setViewCounts] = useState<ViewCounts>({ all: 0, today: 0, tomorrow: 0, week: 0, month: 0 })
  const [collapsedListIds, setCollapsedListIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const raw = window.localStorage.getItem(LIST_COLLAPSED_STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [isCreating, setIsCreating] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [listDraftEmoji, setListDraftEmoji] = useState("📁")
  const [listDraftName, setListDraftName] = useState("")
  const [listDraftColor, setListDraftColor] = useState("#6b8dff")
  const [listDraftParentId, setListDraftParentId] = useState<string | null>(null)
  const [listDraftParentName, setListDraftParentName] = useState<string | null>(null)
  const [editingListId, setEditingListId] = useState<string | null>(null)
  const [openListMenuId, setOpenListMenuId] = useState<string | "root" | null>(null)
  const [renderListMenuId, setRenderListMenuId] = useState<string | "root" | null>(null)
  const [draggingListId, setDraggingListId] = useState<string | null>(null)
  const [dropTargetListId, setDropTargetListId] = useState<string | null>(null)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [renderAccountMenu, setRenderAccountMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showParentListPicker, setShowParentListPicker] = useState(false)
  const [activeColorFamily, setActiveColorFamily] = useState<(typeof colorFamilies)[number]["key"]>("warm")
  const [customColorInput, setCustomColorInput] = useState("#6b8dff")
  const [recentEmojis, setRecentEmojis] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [emojiSearch, setEmojiSearch] = useState("")
  const [activeEmojiCategory, setActiveEmojiCategory] = useState<EmojiCategoryKey>("smileys_people")
  const [inlineCreateParentId, setInlineCreateParentId] = useState<string | null>(null)

  const activeView = useMemo(() => searchParams.get("view") ?? "all", [searchParams])
  const activeListId = useMemo(() => searchParams.get("listId") ?? "", [searchParams])
  const activeSettingsSection = useMemo(() => searchParams.get("section") ?? "appearance", [searchParams])
  const isTasksSection = pathname === "/tasks" || pathname.startsWith("/tasks/")
  const isSettingsSection = pathname === "/settings"
  const flattenedLists = useMemo(() => flattenLists(lists), [lists])
  const invalidParentIds = useMemo(() => {
    if (!editingListId) return new Set<string>()
    return new Set([editingListId, ...collectDescendantIds(lists, editingListId)])
  }, [editingListId, lists])
  const availableParentLists = useMemo(
    () => flattenedLists.filter((list) => !invalidParentIds.has(list.id)),
    [flattenedLists, invalidParentIds],
  )
  const topLevelParentLists = useMemo(
    () => availableParentLists.filter((list) => list.depth === 0),
    [availableParentLists],
  )

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

  useEffect(() => {
    if (openListMenuId) {
      setRenderListMenuId(openListMenuId)
      return
    }

    if (!renderListMenuId) return

    const timeout = window.setTimeout(() => setRenderListMenuId(null), 110)
    return () => window.clearTimeout(timeout)
  }, [openListMenuId, renderListMenuId])

  useEffect(() => {
    if (!openListMenuId) return

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-list-menu-root="true"]')) {
        return
      }
      setOpenListMenuId(null)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenListMenuId(null)
      }
    }

    function handleDismiss() {
      setOpenListMenuId(null)
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("scroll", handleDismiss, true)
    window.addEventListener("resize", handleDismiss)

    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("scroll", handleDismiss, true)
      window.removeEventListener("resize", handleDismiss)
    }
  }, [openListMenuId])

  useEffect(() => {
    setOpenListMenuId(null)
  }, [pathname, searchParams])

  useEffect(() => {
    if (!showEmojiPicker) return

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (emojiTriggerRef.current?.contains(target) || emojiPopoverRef.current?.contains(target)) {
        return
      }
      setShowEmojiPicker(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowEmojiPicker(false)
      }
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showEmojiPicker])

  useEffect(() => {
    if (!showColorPicker) return

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-color-picker-root="true"]')) return
      setShowColorPicker(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowColorPicker(false)
      }
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showColorPicker])

  useEffect(() => {
    if (!showParentListPicker) return

    function handlePointerDown(event: MouseEvent) {
      if (parentSelectRef.current?.contains(event.target as Node)) return
      setShowParentListPicker(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowParentListPicker(false)
      }
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showParentListPicker])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(LIST_COLLAPSED_STORAGE_KEY, JSON.stringify(collapsedListIds))
  }, [collapsedListIds])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const rawRecent = window.localStorage.getItem(LIST_RECENT_EMOJIS_STORAGE_KEY)

      if (rawRecent) {
        const parsed = JSON.parse(rawRecent)
        if (Array.isArray(parsed)) {
          setRecentEmojis(parsed.filter((item): item is string => typeof item === "string").slice(0, 12))
        }
      }
    } catch {
      return
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(LIST_RECENT_EMOJIS_STORAGE_KEY, JSON.stringify(recentEmojis))
  }, [recentEmojis])

  useEffect(() => {
    if (typeof document === "undefined") return

    const root = document.documentElement
    const update = () => setIsDarkMode(root.classList.contains("dark") || root.dataset.themeMode === "dark")

    update()

    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme-mode"] })

    return () => observer.disconnect()
  }, [])

  async function reloadLists() {
    const response = await fetch("/api/lists", { credentials: "include", cache: "no-store" })
    const payload = await response.json()
    if (response.ok && payload.ok) setLists(payload.data.items)
  }

  function rememberRecentEmoji(emoji: string) {
    setRecentEmojis((current) => [emoji, ...current.filter((item) => item !== emoji)].slice(0, 12))
  }

  function startInlineCreate(parentId?: string | null) {
    setEditingListId(null)
    setListDraftParentId(parentId ?? null)
    setListDraftParentName(null)
    setListDraftEmoji("📁")
    setListDraftColor("#6b8dff")
    setCustomColorInput("#6b8dff")
    setListDraftName("")
    setEmojiSearch("")
    setActiveEmojiCategory("smileys_people")
    setOpenListMenuId(null)
    setShowColorPicker(false)
    setShowParentListPicker(false)
    setShowListModal(false)
    setInlineCreateParentId(parentId ?? INLINE_ROOT_ID)

    if (parentId) {
      setCollapsedListIds((current) => current.filter((id) => id !== parentId))
    }
  }

  function openCreateListModal(parentId?: string | null, parentName?: string | null) {
    setEditingListId(null)
    setListDraftParentId(parentId ?? null)
    setListDraftParentName(parentName ?? null)
    setListDraftEmoji("📁")
    setListDraftColor("#6b8dff")
    setCustomColorInput("#6b8dff")
    setListDraftName("")
    setEmojiSearch("")
    setActiveEmojiCategory("smileys_people")
    setOpenListMenuId(null)
    setInlineCreateParentId(null)
    setShowEmojiPicker(false)
    setShowColorPicker(false)
    setShowParentListPicker(false)
    setShowListModal(true)
  }

  function promoteInlineCreateToModal(parentId?: string | null, parentName?: string | null) {
    setEditingListId(null)
    setListDraftParentId(parentId ?? null)
    setListDraftParentName(parentName ?? null)
    setEmojiSearch("")
    setActiveEmojiCategory("smileys_people")
    setOpenListMenuId(null)
    setInlineCreateParentId(null)
    setShowColorPicker(false)
    setShowParentListPicker(false)
    setShowListModal(true)
  }

  function openEditListModal(list: NestedList) {
    setEditingListId(list.id)
    setListDraftParentId(list.parentId)
    setListDraftParentName(null)
    setListDraftEmoji(list.emoji ?? "📁")
    setListDraftColor(list.color ?? "#6b8dff")
    setCustomColorInput(list.color ?? "#6b8dff")
    setListDraftName(list.name)
    setEmojiSearch("")
    setActiveEmojiCategory("smileys_people")
    setOpenListMenuId(null)
    setInlineCreateParentId(null)
    setShowEmojiPicker(false)
    setShowColorPicker(false)
    setShowParentListPicker(false)
    setShowListModal(true)
  }

  function resetListDraft() {
    setListDraftName("")
    setListDraftEmoji("📁")
    setListDraftColor("#6b8dff")
    setListDraftParentId(null)
    setListDraftParentName(null)
    setInlineCreateParentId(null)
    setEditingListId(null)
    setShowEmojiPicker(false)
    setShowColorPicker(false)
    setShowParentListPicker(false)
    setEmojiSearch("")
    setActiveEmojiCategory("smileys_people")
  }

  function closeListModal() {
    setShowListModal(false)
    resetListDraft()
  }

  async function submitList() {
    if (!listDraftName.trim()) return false

    setIsCreating(true)
    try {
      const response = await fetch(editingListId ? `/api/lists/${editingListId}` : "/api/lists", {
        method: editingListId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: listDraftName.trim(), parentId: listDraftParentId, emoji: listDraftEmoji, color: listDraftColor }),
      })

      const payload = await response.json()
      if (response.ok && payload.ok) {
        const nextListId = !editingListId ? payload.data.id : editingListId
        const shouldCloseModal = showListModal

        if (shouldCloseModal) {
          setShowListModal(false)
        }

        resetListDraft()
        await reloadLists()

        if (nextListId) {
          router.push(`/tasks?view=all&listId=${nextListId}`)
        }

        return true
      }

      return false
    } finally {
      setIsCreating(false)
    }
  }

  async function handleCreateList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submitList()
  }

  async function handleDeleteList(listId: string) {
    const confirmed = window.confirm("确认删除这个清单吗？其中任务会保留，但会移出该清单。")
    if (!confirmed) return

    const response = await fetch(`/api/lists/${listId}`, {
      method: "DELETE",
      credentials: "include",
    })

    const payload = await response.json()
    if (response.ok && payload.ok) {
      setOpenListMenuId(null)
      await reloadLists()
    }
  }

  async function handleMoveList(listId: string, direction: "up" | "down") {
    const flat = flattenLists(lists)
    const current = flat.find((item) => item.id === listId)
    if (!current) return

    const siblings = flat.filter((item) => item.parentId === current.parentId)
    const currentIndex = siblings.findIndex((item) => item.id === listId)
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= siblings.length) return

    const target = siblings[targetIndex]

    const nextSortCurrent = target.sortOrder
    const nextSortTarget = current.sortOrder

    await Promise.all([
      fetch(`/api/lists/${current.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sortOrder: nextSortCurrent }),
      }),
      fetch(`/api/lists/${target.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sortOrder: nextSortTarget }),
      }),
    ])

    setOpenListMenuId(null)
    await reloadLists()
  }

  async function handleReorderList(draggedId: string, targetId: string) {
    if (draggedId === targetId) return

    const flat = flattenLists(lists)
    const dragged = flat.find((item) => item.id === draggedId)
    const target = flat.find((item) => item.id === targetId)

    if (!dragged || !target || dragged.parentId !== target.parentId) {
      return
    }

    await Promise.all([
      fetch(`/api/lists/${dragged.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sortOrder: target.sortOrder }),
      }),
      fetch(`/api/lists/${target.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sortOrder: dragged.sortOrder }),
      }),
    ])

    setDraggingListId(null)
    setDropTargetListId(null)
    await reloadLists()
  }

  function toggleListCollapsed(listId: string) {
    setCollapsedListIds((current) => (current.includes(listId) ? current.filter((id) => id !== listId) : [...current, listId]))
  }

  function cancelInlineCreate() {
    resetListDraft()
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
                    "flex h-9 items-center justify-between rounded-xl px-3 text-sm transition-colors",
                    activeView === item.key ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <span className="text-[11px] tabular-nums text-muted-foreground/75">{viewCounts[item.key]}</span>
                </Link>
              ))}
            </SidebarSection>

            <SidebarSection>
              <div className="group mb-2 flex h-8 items-center justify-between px-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">清单</span>
                <button
                  type="button"
                  onClick={() => openCreateListModal()}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
                  aria-label="新建清单"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                {lists.length ? (
                  <>
                    {lists.map((item) => (
                      <ListTreeItem
                        key={item.id}
                        item={item}
                        depth={0}
                        isDarkMode={isDarkMode}
                        activeListId={activeListId}
                        collapsedListIds={collapsedListIds}
                        openListMenuId={openListMenuId}
                        renderListMenuId={renderListMenuId}
                        inlineCreateParentId={inlineCreateParentId}
                        inlineDraftName={listDraftName}
                        isCreating={isCreating}
                        onToggleCollapsed={toggleListCollapsed}
                        onToggleMenu={setOpenListMenuId}
                        onCreateSibling={(parentId) => startInlineCreate(parentId)}
                        onCreateChild={(parentId) => startInlineCreate(parentId)}
                        onInlineDraftNameChange={setListDraftName}
                        onSubmitInlineCreate={() => void submitList()}
                        onCancelInlineCreate={cancelInlineCreate}
                        onOpenCreateModal={openCreateListModal}
                        onPromoteCreateModal={promoteInlineCreateToModal}
                        onEditList={openEditListModal}
                        onDeleteList={handleDeleteList}
                        onMoveList={handleMoveList}
                        draggingListId={draggingListId}
                        dropTargetListId={dropTargetListId}
                        onDragStart={setDraggingListId}
                        onDragEnd={() => {
                          setDraggingListId(null)
                          setDropTargetListId(null)
                        }}
                        onDragOverTarget={setDropTargetListId}
                        onDropOnTarget={handleReorderList}
                      />
                    ))}
                    {inlineCreateParentId === INLINE_ROOT_ID ? (
                      <InlineListDraftRow
                        depth={0}
                        value={listDraftName}
                        isCreating={isCreating}
                        onChange={setListDraftName}
                        onSubmit={() => void submitList()}
                        onCancel={cancelInlineCreate}
                        onMoreOptions={() => promoteInlineCreateToModal(null, null)}
                      />
                    ) : null}
                  </>
                ) : (
                  <>
                    {inlineCreateParentId === INLINE_ROOT_ID ? (
                      <InlineListDraftRow
                        depth={0}
                        value={listDraftName}
                        isCreating={isCreating}
                        onChange={setListDraftName}
                        onSubmit={() => void submitList()}
                        onCancel={cancelInlineCreate}
                        onMoreOptions={() => promoteInlineCreateToModal(null, null)}
                      />
                    ) : (
                      <p className="px-3 text-sm text-muted-foreground">暂无清单</p>
                    )}
                  </>
                )}
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

      {showListModal ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm">
          <button type="button" aria-label="关闭清单弹窗" className="absolute inset-0" onClick={closeListModal} />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-floating">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">List</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">{editingListId ? "编辑清单" : listDraftParentName ? `在 ${listDraftParentName} 下新增清单` : "新建清单"}</h2>
              </div>
              <button
                type="button"
                onClick={closeListModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={(event) => void handleCreateList(event)}>
              <label className="block space-y-2">
                <span className="text-sm font-medium">清单名称</span>
                <div className="relative flex items-center gap-3">
                  <button
                    ref={emojiTriggerRef}
                    type="button"
                    onClick={() => setShowEmojiPicker((current) => !current)}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-[22px] transition-all hover:bg-muted active:scale-[0.98]"
                    aria-label="选择清单图标"
                  >
                    {listDraftEmoji}
                  </button>
                  <EmojiPickerPopover
                    open={showEmojiPicker}
                    popoverRef={emojiPopoverRef}
                    value={listDraftEmoji}
                    isDarkMode={isDarkMode}
                    search={emojiSearch}
                    activeCategory={activeEmojiCategory}
                    recentEmojis={recentEmojis}
                    onClose={() => setShowEmojiPicker(false)}
                    onSearchChange={setEmojiSearch}
                    onCategoryChange={setActiveEmojiCategory}
                    onSelect={(emoji: string) => {
                      setListDraftEmoji(emoji)
                      rememberRecentEmoji(emoji)
                      setShowEmojiPicker(false)
                    }}
                  />
                  <input
                    autoFocus
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-0 focus:border-primary/60"
                    value={listDraftName}
                    onChange={(event) => setListDraftName(event.target.value)}
                    placeholder="例如：工作、家庭、周计划"
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium">清单颜色</span>
                <div className="relative" data-color-picker-root="true">
                  <div className="grid grid-cols-10 gap-2">
                    {listColorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setListDraftColor(color)}
                        className={cn(
                          "h-8 w-8 rounded-full border-2 transition-transform hover:scale-105",
                          listDraftColor === color ? "border-foreground" : "border-transparent",
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => setShowColorPicker((current) => !current)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform hover:scale-105",
                        showColorPicker && !listColorOptions.includes(listDraftColor) ? "border-foreground" : "border-transparent",
                      )}
                      style={{ background: !listColorOptions.includes(listDraftColor) ? listDraftColor : "conic-gradient(from 180deg, #ef4444, #f59e0b, #84cc16, #14b8a6, #3b82f6, #8b5cf6, #ec4899, #ef4444)" }}
                      aria-label="更多颜色"
                    >
                      {listColorOptions.includes(listDraftColor) ? <Plus className="h-3.5 w-3.5 text-white drop-shadow-sm" /> : null}
                    </button>
                  </div>

                  {showColorPicker ? (
                    <ColorPickerPopover
                      selectedColor={listDraftColor}
                      customColorInput={customColorInput}
                      activeFamily={activeColorFamily}
                      onClose={() => setShowColorPicker(false)}
                      onFamilyChange={setActiveColorFamily}
                      onSelectColor={(color) => {
                        setListDraftColor(color)
                        setCustomColorInput(color)
                      }}
                      onCustomColorInputChange={setCustomColorInput}
                    />
                  ) : null}
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium">上级清单</span>
                <div className="relative" ref={parentSelectRef}>
                  <button
                    type="button"
                    onClick={() => setShowParentListPicker((current) => !current)}
                    className="flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background px-3 text-sm transition-colors hover:bg-muted/30"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="text-base leading-none">{listDraftParentId ? topLevelParentLists.find((item) => item.id === listDraftParentId)?.emoji ?? "📁" : "📁"}</span>
                      <span className={cn("truncate", listDraftParentId ? "text-foreground" : "text-muted-foreground")}>
                        {listDraftParentId ? topLevelParentLists.find((item) => item.id === listDraftParentId)?.name ?? "无上级（顶层）" : "无上级（顶层）"}
                      </span>
                    </span>
                    <ChevronRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", showParentListPicker ? "-rotate-90" : "rotate-90")} />
                  </button>

                  {showParentListPicker ? (
                    <div className="absolute left-0 top-[calc(100%+6px)] z-20 w-full rounded-2xl border border-border/70 bg-card/95 p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-md">
                      <button
                        type="button"
                        onClick={() => {
                          setListDraftParentId(null)
                          setListDraftParentName(null)
                          setShowParentListPicker(false)
                        }}
                        className={cn(
                          "flex h-10 w-full items-center justify-between rounded-lg px-3 text-sm transition-colors hover:bg-muted/55",
                          !listDraftParentId ? "bg-primary/10 text-foreground" : "text-muted-foreground",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span>📁</span>
                          <span>无上级（顶层）</span>
                        </span>
                        {!listDraftParentId ? <Check className="h-4 w-4" /> : null}
                      </button>

                      {topLevelParentLists.length ? <div className="my-1 h-px bg-border/60" /> : null}

                      <div className="max-h-56 overflow-y-auto pr-1">
                        {topLevelParentLists.map((list) => (
                          <button
                            key={list.id}
                            type="button"
                            onClick={() => {
                              setListDraftParentId(list.id)
                              setListDraftParentName(list.name)
                              setShowParentListPicker(false)
                            }}
                            className={cn(
                              "flex h-10 w-full items-center justify-between rounded-lg px-3 text-sm transition-colors hover:bg-muted/55",
                              listDraftParentId === list.id ? "bg-primary/10 text-foreground" : "text-foreground/85",
                            )}
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <span>{list.emoji ?? "📁"}</span>
                              <span className="truncate">{list.name}</span>
                            </span>
                            {listDraftParentId === list.id ? <Check className="h-4 w-4 shrink-0" /> : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </label>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeListModal}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm transition-colors hover:bg-muted"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !listDraftName.trim()}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
                >
                  {isCreating ? (editingListId ? "保存中..." : "创建中...") : editingListId ? "保存" : "创建"}
                </button>
              </div>
            </form>

          </div>
        </div>
      ) : null}

      <TaskSearchModal open={showSearch} onClose={() => setShowSearch(false)} />
    </aside>
  )
}

function ListTreeItem({ item, depth, isDarkMode, activeListId, collapsedListIds, openListMenuId, renderListMenuId, inlineCreateParentId, inlineDraftName, isCreating, onToggleCollapsed, onToggleMenu, onCreateSibling, onCreateChild, onInlineDraftNameChange, onSubmitInlineCreate, onCancelInlineCreate, onOpenCreateModal, onPromoteCreateModal, onEditList, onDeleteList, onMoveList, draggingListId, dropTargetListId, onDragStart, onDragEnd, onDragOverTarget, onDropOnTarget }: { item: NestedList; depth: number; isDarkMode: boolean; activeListId: string; collapsedListIds: string[]; openListMenuId: string | "root" | null; renderListMenuId: string | "root" | null; inlineCreateParentId: string | null; inlineDraftName: string; isCreating: boolean; onToggleCollapsed: (listId: string) => void; onToggleMenu: (listId: string | "root" | null) => void; onCreateSibling: (parentId?: string | null) => void; onCreateChild: (parentId?: string | null) => void; onInlineDraftNameChange: (value: string) => void; onSubmitInlineCreate: () => void; onCancelInlineCreate: () => void; onOpenCreateModal: (parentId?: string | null, parentName?: string | null) => void; onPromoteCreateModal: (parentId?: string | null, parentName?: string | null) => void; onEditList: (list: NestedList) => void; onDeleteList: (listId: string) => Promise<void>; onMoveList: (listId: string, direction: "up" | "down") => Promise<void>; draggingListId: string | null; dropTargetListId: string | null; onDragStart: (listId: string) => void; onDragEnd: () => void; onDragOverTarget: (listId: string | null) => void; onDropOnTarget: (draggedId: string, targetId: string) => Promise<void> }) {
  const [isPressAnimating, setIsPressAnimating] = useState(false)
  const hasChildren = item.children.length > 0
  const isCollapsed = collapsedListIds.includes(item.id)
  const isActive = activeListId === item.id
  const isDragging = draggingListId === item.id
  const isDropTarget = dropTargetListId === item.id && draggingListId !== item.id
  const isParentGroup = hasChildren || depth === 0
  const showInlineDraft = inlineCreateParentId === item.id
  const isRootList = depth === 0
  const isNestedItem = depth > 0
  const displayColor = item.color ?? "#6b8dff"

  const incompleteCount = item.taskCount - item.completedTaskCount

  return (
    <div className="relative space-y-1" data-list-menu-root="true">
      <div
        draggable
        onDragStart={() => onDragStart(item.id)}
        onDragEnd={onDragEnd}
        onDragOver={(event) => {
          event.preventDefault()
          onDragOverTarget(item.id)
        }}
        onDragLeave={() => onDragOverTarget(null)}
        onDrop={(event) => {
          event.preventDefault()
          if (draggingListId) {
            void onDropOnTarget(draggingListId, item.id)
          }
        }}
        className={cn(
          "group flex items-center gap-1 transition-all duration-100 ease-out",
          isDragging ? "opacity-45" : "opacity-100",
        )}
        style={{ marginLeft: `${depth * 8}px` }}
      >
        <div
        className={cn(
          "relative flex min-w-0 flex-1 items-center rounded-lg transition-all duration-100",
          isNestedItem
            ? isActive
              ? "bg-primary/5"
              : "hover:bg-muted/35"
            : isActive
              ? "border border-border/50 bg-muted/70"
              : "hover:bg-muted/55",
          isPressAnimating ? "scale-[0.985] bg-muted/80" : "scale-100",
          isDropTarget ? "ring-1 ring-primary/15 bg-primary/8" : "",
        )}
      >
        <Link
          href={`/tasks?view=all&listId=${item.id}`}
          onClick={() => {
            if (isRootList && hasChildren) {
              setIsPressAnimating(true)
              window.setTimeout(() => setIsPressAnimating(false), 170)
              onToggleCollapsed(item.id)
            }
          }}
          className={cn(
            "relative flex min-w-0 flex-1 items-center justify-between text-sm transition-colors",
            isNestedItem
              ? isActive
                ? "h-[30px] rounded-lg text-foreground"
                : "h-[30px] rounded-lg text-muted-foreground/90 hover:text-foreground"
              : isActive
                ? "h-9 rounded-lg px-3 font-medium text-foreground"
                : "h-9 rounded-lg px-3 text-muted-foreground hover:text-foreground",
          )}
        >
          {isNestedItem ? <span className={cn("absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 rounded-full transition-opacity", isActive ? "opacity-100" : "opacity-0")} style={{ backgroundColor: displayColor }} /> : null}
          <div className={cn("flex min-w-0 items-center", isNestedItem ? "gap-2 pl-2" : "gap-2.5")}>
            {isParentGroup ? (
              <>
                <span
                  className={cn(
                    "shrink-0 rounded-full",
                    isNestedItem ? "h-1.5 w-1.5" : "h-2 w-2",
                  )}
                  style={{ backgroundColor: displayColor }}
                />
                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center leading-none",
                    isNestedItem ? "h-4 w-4 text-[13px] opacity-70" : "h-5 w-5 text-[15px]",
                  )}
                >
                  {item.emoji ?? "📁"}
                </span>
              </>
            ) : (
              <>
                <span className="relative flex shrink-0 items-center gap-1.5 pl-2.5 before:absolute before:left-[3px] before:top-1/2 before:h-px before:w-[7px] before:-translate-y-1/2 before:bg-border/35">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: displayColor }} />
                  <span className="text-[13px] leading-none opacity-65">{item.emoji ?? "📄"}</span>
                </span>
                <span className="truncate text-[13px] font-normal">{item.name}</span>
              </>
            )}
            {isParentGroup && <span className={cn("truncate tracking-tight", isNestedItem ? "text-[13px] font-normal" : "text-[13px] font-medium")}>{item.name}</span>}
          </div>
          <div className="flex min-w-6 items-center justify-end gap-1.5">
            {incompleteCount > 0 && (
              <span
                className={cn(
                  "tabular-nums",
                  isNestedItem
                    ? isActive
                      ? "text-[11px] text-foreground/65"
                      : "text-[11px] text-muted-foreground/75"
                    : isActive
                      ? "text-[11px] text-foreground/70"
                      : "text-[11px] text-muted-foreground/75",
                )}
              >
                {incompleteCount}
              </span>
            )}
          </div>
        </Link>

        <div className="mr-1 flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onToggleMenu(openListMenuId === item.id ? null : item.id)}
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-all duration-100 ease-out hover:bg-background/80 hover:text-foreground active:scale-[0.98]",
              openListMenuId === item.id
                ? "bg-background/85 opacity-100 text-foreground"
                : isActive
                  ? "opacity-80 hover:opacity-100"
                  : "opacity-0 group-hover:opacity-85",
            )}
            aria-label="清单菜单"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
        </div>
      </div>

      {renderListMenuId === item.id ? (
        <div
          className={cn(
            "absolute right-1 top-[calc(100%+6px)] z-30 w-56 origin-top-right rounded-xl border border-border/70 bg-card/95 p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-md transition-all duration-130",
            openListMenuId === item.id ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-1 scale-[0.98] opacity-0",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <ListMenuAction
            label={isRootList ? "添加清单" : "添加子清单"}
            icon={<FolderPlus className="h-4 w-4" />}
            onClick={() => (isRootList ? onCreateSibling(item.parentId) : onCreateChild(item.id))}
          />
          <ListMenuAction
            label={isRootList ? "添加子清单" : "添加清单"}
            icon={<FolderPlus className="h-4 w-4" />}
            onClick={() => (isRootList ? onCreateChild(item.id) : onCreateSibling(item.parentId))}
          />
          <div className="my-1 h-px bg-border/60" />
          <ListMenuAction label="编辑清单" icon={<Settings className="h-4 w-4" />} onClick={() => onEditList(item)} />
          <div className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">排序</div>
          <ListMenuAction label="上移" icon={<ChevronRight className="h-4 w-4 -rotate-90" />} onClick={() => void onMoveList(item.id, "up")} />
          <ListMenuAction label="下移" icon={<ChevronRight className="h-4 w-4 rotate-90" />} onClick={() => void onMoveList(item.id, "down")} />
          <div className="my-1 h-px bg-border/60" />
          <ListMenuAction label="删除" icon={<X className="h-4 w-4" />} destructive onClick={() => void onDeleteList(item.id)} />
        </div>
      ) : null}

      {showInlineDraft ? (
        <InlineListDraftRow
          depth={depth + 1}
          value={inlineDraftName}
          isCreating={isCreating}
          onChange={onInlineDraftNameChange}
          onSubmit={onSubmitInlineCreate}
          onCancel={onCancelInlineCreate}
          onMoreOptions={() => onPromoteCreateModal(item.id, item.name)}
        />
      ) : null}

      {hasChildren ? (
        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity,transform] will-change-[max-height,opacity,transform]",
            depth === 0 ? "duration-200" : "duration-150",
            isCollapsed ? "pointer-events-none -translate-y-1 opacity-0" : "translate-y-0 opacity-100",
          )}
          style={{
            maxHeight: isCollapsed ? "0px" : "1600px",
            transitionTimingFunction: isCollapsed ? "cubic-bezier(0.4, 0, 1, 1)" : "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
        <div className={cn("relative", depth === 0 ? "ml-2 mt-0.5 pl-2 before:absolute before:bottom-2 before:left-[19px] before:top-1.5 before:w-px before:-translate-x-1/2 before:bg-border/30" : "ml-2 pl-2 before:absolute before:bottom-2 before:left-[19px] before:top-1.5 before:w-px before:-translate-x-1/2 before:bg-border/30")}>
            {item.children.map((child) => (
              <ListTreeItem
                key={child.id}
                item={child}
                depth={depth + 1}
                isDarkMode={isDarkMode}
                activeListId={activeListId}
                collapsedListIds={collapsedListIds}
                openListMenuId={openListMenuId}
                renderListMenuId={renderListMenuId}
                inlineCreateParentId={inlineCreateParentId}
                inlineDraftName={inlineDraftName}
                isCreating={isCreating}
                onToggleCollapsed={onToggleCollapsed}
                onToggleMenu={onToggleMenu}
                onCreateSibling={onCreateSibling}
                onCreateChild={onCreateChild}
                onInlineDraftNameChange={onInlineDraftNameChange}
                onSubmitInlineCreate={onSubmitInlineCreate}
                onCancelInlineCreate={onCancelInlineCreate}
                onOpenCreateModal={onOpenCreateModal}
                onPromoteCreateModal={onPromoteCreateModal}
                onEditList={onEditList}
                onDeleteList={onDeleteList}
                onMoveList={onMoveList}
                draggingListId={draggingListId}
                dropTargetListId={dropTargetListId}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOverTarget={onDragOverTarget}
                onDropOnTarget={onDropOnTarget}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ListMenuAction({ label, icon, destructive = false, onClick }: { label: string; icon: React.ReactNode; destructive?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-lg px-3 text-sm transition-all duration-100 ease-out hover:bg-muted/55 active:scale-[0.985]",
        destructive ? "text-foreground/88 hover:text-destructive" : "text-foreground/88 hover:text-foreground",
      )}
    >
      <span className={cn("shrink-0", destructive ? "text-muted-foreground group-hover:text-destructive" : "text-muted-foreground")}>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function InlineListDraftRow({ depth, value, isCreating, onChange, onSubmit, onCancel, onMoreOptions }: { depth: number; value: string; isCreating: boolean; onChange: (value: string) => void; onSubmit: () => void; onCancel: () => void; onMoreOptions: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <form
      className="mx-1 flex items-center gap-1 rounded-xl bg-muted/40 px-2 py-1.5"
      style={{ marginLeft: `${depth * 14 + 28}px` }}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <span className="shrink-0 text-[15px] leading-none">📁</span>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault()
            onCancel()
          }
        }}
        placeholder="输入清单名称"
        className="h-8 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
      />
      <button
        type="button"
        onClick={onMoreOptions}
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        aria-label="更多选项"
      >
        <Settings2 className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        aria-label="取消新建清单"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <button
        type="submit"
        disabled={isCreating || !value.trim()}
        className="inline-flex h-7 items-center justify-center rounded-lg bg-primary px-2.5 text-xs font-medium text-primary-foreground disabled:opacity-50"
      >
        {isCreating ? "创建中" : "创建"}
      </button>
    </form>
  )
}

function EmojiPickerPopover({ open, popoverRef, value, isDarkMode, search, activeCategory, recentEmojis, onClose, onSearchChange, onCategoryChange, onSelect }: { open: boolean; popoverRef: React.RefObject<HTMLDivElement | null>; value: string; isDarkMode: boolean; search: string; activeCategory: EmojiCategoryKey; recentEmojis: string[]; onClose: () => void; onSearchChange: (value: string) => void; onCategoryChange: (value: EmojiCategoryKey) => void; onSelect: (emoji: string) => void }) {
  if (!open) return null

  const normalizedSearch = search.trim().toLowerCase()
  const categoryItems = emojiDataset[activeCategory] ?? []
  const visibleItems = normalizedSearch
    ? emojiCategoryOrder.flatMap((category) => emojiDataset[category]).filter((item: EmojiDataItem) => item.keywords.some((keyword: string) => keyword.toLowerCase().includes(normalizedSearch)) || item.emoji.includes(normalizedSearch))
    : categoryItems

  return (
    <div
      ref={popoverRef}
      className={cn(
        "emoji-picker-popover absolute left-0 top-[calc(100%+6px)] z-20 w-[468px] origin-top-left overflow-hidden rounded-2xl border shadow-[0_10px_30px_rgba(15,23,42,0.16)] backdrop-blur-md transition-all duration-150",
        isDarkMode ? "border-border/50 bg-[hsl(var(--card)/0.96)]" : "border-border/70 bg-card/95",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <style jsx>{`
        .emoji-picker-popover :global(input),
        .emoji-picker-popover :global(button) {
          box-shadow: none !important;
        }

        .emoji-picker-popover :global(input:focus),
        .emoji-picker-popover :global(input:focus-visible),
        .emoji-picker-popover :global(button:focus),
        .emoji-picker-popover :global(button:focus-visible) {
          box-shadow: none !important;
          outline: none !important;
        }
      `}</style>
      <div className="p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-2.5 focus-within:border-primary/35 focus-within:ring-0">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="搜索 emoji"
              className="h-9 min-w-0 flex-1 appearance-none bg-transparent text-sm outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
            aria-label="关闭 emoji 选择器"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!normalizedSearch ? (
          <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
            {emojiCategoryOrder.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                  activeCategory === category ? "bg-primary/12 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                  {emojiCategoryLabels[category]}
                </button>
              ))}
          </div>
        ) : null}

        {recentEmojis.length ? (
          <EmojiQuickRow label="最近使用" items={recentEmojis} onSelect={onSelect} />
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/70 px-2 py-2">
          <div className="h-[232px] overflow-y-auto pr-1">
            <div className="grid grid-cols-9 gap-1.5">
              {visibleItems.map((item: EmojiDataItem) => (
                <button
                  key={`${item.unified}-${item.emoji}`}
                  type="button"
                  onClick={() => onSelect(item.emoji)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl text-lg transition-all hover:-translate-y-0.5 hover:bg-muted active:scale-95",
                    value === item.emoji ? "bg-primary/10 ring-1 ring-primary/20" : "",
                  )}
                  title={item.keywords.join(" / ")}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
            {visibleItems.length === 0 ? <p className="py-10 text-center text-sm text-muted-foreground">没有找到匹配的 emoji</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmojiQuickRow({ label, items, onSelect }: { label: string; items: string[]; onSelect: (emoji: string) => void }) {
  return (
    <div className="mb-2">
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.slice(0, 12).map((emoji) => (
          <button
            key={`${label}-${emoji}`}
            type="button"
            onClick={() => onSelect(emoji)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border/60 bg-background text-base transition-all hover:-translate-y-0.5 hover:bg-muted active:scale-95"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

function ColorPickerPopover({ selectedColor, customColorInput, activeFamily, onClose, onFamilyChange, onSelectColor, onCustomColorInputChange }: { selectedColor: string; customColorInput: string; activeFamily: (typeof colorFamilies)[number]["key"]; onClose: () => void; onFamilyChange: (family: (typeof colorFamilies)[number]["key"]) => void; onSelectColor: (color: string) => void; onCustomColorInputChange: (value: string) => void }) {
  const currentFamily = colorFamilies.find((family) => family.key === activeFamily) ?? colorFamilies[0]

  return (
    <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-[320px] rounded-2xl border border-border/70 bg-card/95 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-4 w-4 rounded-full border border-white/40" style={{ backgroundColor: selectedColor }} />
          <span className="text-sm font-medium">推荐色系</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="关闭颜色选择器"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {colorFamilies.map((family) => (
          <button
            key={family.key}
            type="button"
            onClick={() => onFamilyChange(family.key)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
              activeFamily === family.key ? "bg-primary/12 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {family.label}
          </button>
        ))}
      </div>

      <div className="mb-3 grid grid-cols-6 gap-2">
        {currentFamily.colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onSelectColor(color)}
            className={cn(
              "h-8 w-8 rounded-full border-2 transition-transform hover:scale-105",
              selectedColor === color ? "border-foreground" : "border-transparent",
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground">自定义颜色</span>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={selectedColor}
            onChange={(event) => onSelectColor(event.target.value)}
            className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-background p-1"
          />
          <input
            type="text"
            value={customColorInput}
            onChange={(event) => {
              const nextValue = event.target.value
              onCustomColorInputChange(nextValue)
              if (/^#[0-9a-fA-F]{6}$/.test(nextValue)) {
                onSelectColor(nextValue)
              }
            }}
            placeholder="#6b8dff"
            className="h-10 min-w-0 flex-1 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary/60"
          />
        </div>
      </div>
    </div>
  )
}

function unifiedToEmoji(unified: string) {
  return unified
    .split("-")
    .map((part) => String.fromCodePoint(Number.parseInt(part, 16)))
    .join("")
}

function getSoftIconStyle(hexColor: string, isDarkMode: boolean) {
  const rgb = hexToRgb(hexColor) ?? { r: 107, g: 141, b: 255 }
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const backgroundSaturation = clamp(s * 0.32, 18, 28)
  const backgroundLightness = isDarkMode ? 26 : 92
  const iconSaturation = clamp(s * 0.58, 26, 42)
  const iconLightness = isDarkMode ? 78 : 42

  return {
    backgroundColor: `hsla(${h} ${backgroundSaturation}% ${backgroundLightness}% / ${isDarkMode ? 0.22 : 0.12})`,
    color: `hsl(${h} ${iconSaturation}% ${iconLightness}%)`,
    boxShadow: `inset 0 0 0 1px ${isDarkMode ? "rgba(255,255,255,0.14)" : "rgba(15,23,42,0.08)"}`,
  }
}

function hexToRgb(hexColor: string) {
  const normalized = hexColor.replace("#", "")
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHsl(r: number, g: number, b: number) {
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const lightness = (max + min) / 2

  if (max === min) {
    return { h: 0, s: 0, l: lightness * 100 }
  }

  const delta = max - min
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)
  let hue = 0

  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0)
      break
    case green:
      hue = (blue - red) / delta + 2
      break
    default:
      hue = (red - green) / delta + 4
      break
  }

  return { h: Math.round(hue * 60), s: saturation * 100, l: lightness * 100 }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function flattenLists(items: NestedList[], depth = 0): Array<NestedList & { depth: number }> {
  return items.flatMap((item) => [
    { ...item, depth },
    ...flattenLists(item.children, depth + 1),
  ])
}

function collectDescendantIds(items: NestedList[], targetId: string): string[] {
  for (const item of items) {
    if (item.id === targetId) {
      return flattenLists(item.children).map((child) => child.id)
    }

    const descendantIds = collectDescendantIds(item.children, targetId)
    if (descendantIds.length > 0) {
      return descendantIds
    }
  }

  return []
}

function SidebarSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      {title ? <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{title}</p> : null}
      <div className="space-y-1">{children}</div>
    </section>
  )
}
