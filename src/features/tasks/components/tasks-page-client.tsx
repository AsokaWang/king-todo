"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock3,
  Info,
  Flag,
  FolderTree,
  GripVertical,
  MoreHorizontal,
  CalendarCheck,
  CalendarClock,
  Eraser,
  Pin,
  Trash2,
  Archive,
  Tag,
} from "lucide-react"
import { TaskDetailDrawer } from "@/features/tasks/components/task-detail-drawer"
import { TaskDetailPanel } from "@/features/tasks/components/task-detail-panel"
import { AiTaskDraftReviewSheet } from "@/features/tasks/components/ai-task-draft-review-sheet"
import type { TaskListItemView } from "@/features/tasks/contracts"
import { TimerActionButtons } from "@/components/timer/timer-action-buttons"
import { DropdownSelect } from "@/components/ui/dropdown-select"
import { loadAiConfig } from "@/lib/ai-config"

type TaskItem = TaskListItemView

type TasksResponse = {
  items: TaskItem[]
  page: number
  pageSize: number
  total: number
  hasNextPage: boolean
}

type TagOption = {
  id: string
  name: string
  color?: string | null
}

type ParsedSubtaskDraft = { title: string }

type AiParsedDraft = {
  title: string | null
  description: string | null
  startAt: string | null
  dueAt: string | null
  priority: TaskItem["priority"] | null
  confidence: number
  tagNames: string[]
  listId: string | null
  listName: string | null
  action: "create" | "pinToTop" | "archive" | "abandon"
  subtasks: ParsedSubtaskDraft[]
  rationale?: string | null
  riskLevel?: "low" | "medium" | "high"
  suggestions?: string[]
  warnings?: string[]
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

type FlatList = NestedList & { depth: number }

type CurrentTimerTaskState = {
  id: string
  status: "running" | "paused"
  task?: {
    id: string
    title: string
  } | null
}

const SECTION_COLLAPSE_STORAGE_KEY = "king-todo-task-sections-collapsed"

const defaultSectionState = {
  pending: false,
  overdue: false,
  completed: true,
  cancelled: true,
  childLists: false,
}

function flattenLists(lists: NestedList[], depth = 0): FlatList[] {
  return lists.flatMap((list) => [{ ...list, depth }, ...flattenLists(list.children, depth + 1)])
}

function findListById(lists: NestedList[], listId: string): NestedList | null {
  for (const list of lists) {
    if (list.id === listId) return list
    const found = findListById(list.children, listId)
    if (found) return found
  }
  return null
}

function getViewTitle(view: string) {
  switch (view) {
    case "today":
      return "今天"
    case "tomorrow":
      return "明天"
    case "week":
      return "本周"
    case "month":
      return "本月"
    default:
      return "全部任务"
  }
}

function formatDateMeta(task: TaskItem) {
  if (task.startAt && task.dueAt) {
    return `${new Date(task.startAt).toLocaleString("zh-CN")} - ${new Date(task.dueAt).toLocaleString("zh-CN")}`
  }

  if (task.dueAt) {
    return `截止 ${new Date(task.dueAt).toLocaleString("zh-CN")}`
  }

  if (task.startAt) {
    return `开始 ${new Date(task.startAt).toLocaleString("zh-CN")}`
  }

  return ""
}

export function TasksPageClient() {
  const [items, setItems] = useState<TaskItem[]>([])
  const [lists, setLists] = useState<NestedList[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [draftTitle, setDraftTitle] = useState("")
  const [draftStartAt, setDraftStartAt] = useState("")
  const [draftDueAt, setDraftDueAt] = useState("")
  const [draftPriority, setDraftPriority] = useState<TaskItem["priority"]>("medium")
  const [draftListId, setDraftListId] = useState("")
  const [draftTagNames, setDraftTagNames] = useState<string[]>([])
  const [draftSubtasks, setDraftSubtasks] = useState<ParsedSubtaskDraft[]>([])
  const [availableTags, setAvailableTags] = useState<TagOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isTogglingId, setIsTogglingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null)
  const [dropTargetTaskId, setDropTargetTaskId] = useState<string | null>(null)
  const [newTaskHighlightId, setNewTaskHighlightId] = useState<string | null>(null)
  const [showCalendarPicker, setShowCalendarPicker] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [isParsingAi, setIsParsingAi] = useState(false)
  const [aiWarnings, setAiWarnings] = useState<string[]>([])
  const [aiParsedSummary, setAiParsedSummary] = useState<string | null>(null)
  const [aiFeedbackTone, setAiFeedbackTone] = useState<"default" | "warning">("default")
  const [aiDrafts, setAiDrafts] = useState<Array<AiParsedDraft & { clientId?: string; selected: boolean }>>([])
  const [showAiDraftReview, setShowAiDraftReview] = useState(false)
  const [currentTimer, setCurrentTimer] = useState<CurrentTimerTaskState | null>(null)
  const [collapsedSections, setCollapsedSections] = useState(defaultSectionState)
  const [activeQuickDate, setActiveQuickDate] = useState<"today" | "tomorrow" | "week" | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const calendarRef = useRef<HTMLDivElement | null>(null)
  const moreRef = useRef<HTMLDivElement | null>(null)

  const activeView = searchParams.get("view") ?? "all"
  const activeListId = searchParams.get("listId") ?? ""

  const flatLists = useMemo(() => flattenLists(lists), [lists])
  const selectedList = useMemo(() => (activeListId ? findListById(lists, activeListId) : null), [activeListId, lists])
  const headerTitle = selectedList?.name ?? getViewTitle(activeView)
  const headerEmoji = selectedList?.emoji ?? "🗂️"

  const childLists = useMemo(() => selectedList?.children ?? [], [selectedList])
  const taskActionListItems = useMemo(
    () => [
      { value: "move:", label: "移动到未分类", icon: "📁", group: "清单" },
      ...flatLists.map((list) => ({ value: `move:${list.id}`, label: list.name, icon: list.emoji ?? "📁", group: "清单" })),
    ],
    [flatLists],
  )

  const pendingTasks = useMemo(() => {
    const now = Date.now()
    return items.filter((task) => task.status !== "done" && task.status !== "cancelled" && !(task.dueAt && new Date(task.dueAt).getTime() < now))
  }, [items])

  const overdueTasks = useMemo(() => {
    const now = Date.now()
    return items.filter((task) => task.status !== "done" && task.status !== "cancelled" && !!task.dueAt && new Date(task.dueAt).getTime() < now)
  }, [items])

  const completedTasks = useMemo(() => items.filter((task) => task.status === "done"), [items])
  const cancelledTasks = useMemo(() => items.filter((task) => task.status === "cancelled"), [items])

  const visibleTaskIds = useMemo(() => items.map((task) => task.id), [items])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(SECTION_COLLAPSE_STORAGE_KEY)
      if (raw) {
        setCollapsedSections({ ...defaultSectionState, ...JSON.parse(raw) })
      }
    } catch {
      setCollapsedSections(defaultSectionState)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(SECTION_COLLAPSE_STORAGE_KEY, JSON.stringify(collapsedSections))
  }, [collapsedSections])

  useEffect(() => {
    setDraftListId(activeListId)
  }, [activeListId])

  useEffect(() => {
    if (!aiParsedSummary) return
    const timeout = window.setTimeout(() => setAiParsedSummary(null), 3500)
    return () => window.clearTimeout(timeout)
  }, [aiParsedSummary])

  useEffect(() => {
    if (aiWarnings.length === 0) return
    const timeout = window.setTimeout(() => setAiWarnings([]), 5000)
    return () => window.clearTimeout(timeout)
  }, [aiWarnings])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (calendarRef.current && !calendarRef.current.contains(target)) {
        setShowCalendarPicker(false)
      }
      if (moreRef.current && !moreRef.current.contains(target)) {
        setShowMoreOptions(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowCalendarPicker(false)
        setShowMoreOptions(false)
      }
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const loadLists = useCallback(async () => {
    const response = await fetch("/api/lists", { credentials: "include", cache: "no-store" })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      throw new Error(payload?.error?.message ?? "Failed to load lists.")
    }
    setLists(payload.data.items as NestedList[])
  }, [])

  const loadTags = useCallback(async () => {
    const response = await fetch("/api/tags", { credentials: "include", cache: "no-store" })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      throw new Error(payload?.error?.message ?? "Failed to load tags.")
    }
    setAvailableTags(payload.data as TagOption[])
  }, [])

  const loadCurrentTimer = useCallback(async () => {
    try {
      const response = await fetch("/api/timer/current", { credentials: "include", cache: "no-store" })
      const payload = await response.json()
      if (response.ok && payload.ok) {
        setCurrentTimer(payload.data.currentTimer)
      }
    } catch {
    }
  }, [])

  const loadTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      params.set("view", activeView)
      if (activeListId) {
        params.set("listId", activeListId)
      }

      const response = await fetch(`/api/tasks?${params.toString()}`, {
        credentials: "include",
        cache: "no-store",
      })
      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to load tasks.")
      }

      setItems((payload.data as TasksResponse).items)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load tasks.")
    } finally {
      setIsLoading(false)
    }
  }, [activeListId, activeView])

  useEffect(() => {
    let active = true

    async function loadAll() {
      try {
        await Promise.all([loadLists(), loadTasks(), loadTags(), loadCurrentTimer()])
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load task workspace.")
          setIsLoading(false)
        }
      }
    }

    void loadAll()
    return () => {
      active = false
    }
  }, [loadCurrentTimer, loadLists, loadTags, loadTasks])

  useEffect(() => {
    setSelectedTaskId(null)
  }, [pathname, activeListId, activeView])

  useEffect(() => {
    if (!newTaskHighlightId) return
    const timeout = window.setTimeout(() => setNewTaskHighlightId(null), 1200)
    return () => window.clearTimeout(timeout)
  }, [newTaskHighlightId])

  async function createTasksFromDrafts(draftsToCreate: AiParsedDraft[]) {
    let firstCreatedTask: TaskItem | null = null
    let createdCount = 0

    for (const draft of draftsToCreate) {
      if (!draft.title?.trim()) continue

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: draft.title.trim(),
          listId: draft.listId || undefined,
          priority: draft.priority ?? "medium",
          startAt: draft.startAt ? new Date(draft.startAt).toISOString() : undefined,
          dueAt: draft.dueAt ? new Date(draft.dueAt).toISOString() : undefined,
          tagNames: draft.tagNames,
        }),
      })

      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to create task.")
      }

      const createdTask = payload.data as TaskItem
      firstCreatedTask ??= createdTask
      createdCount += 1

      for (const subtask of draft.subtasks) {
        const subtaskResponse = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: subtask.title,
            parentTaskId: createdTask.id,
            listId: createdTask.list?.id || draft.listId || undefined,
          }),
        })
        const subtaskPayload = await subtaskResponse.json()
        if (!subtaskResponse.ok || !subtaskPayload.ok) {
          throw new Error(subtaskPayload?.error?.message ?? "Failed to create AI subtasks.")
        }
      }

      if (draft.action === "archive" || draft.action === "abandon") {
        await fetch(`/api/tasks/${createdTask.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ archive: true }),
        })
      }

      if (draft.action === "pinToTop") {
        await fetch(`/api/tasks/${createdTask.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ pinToTop: true }),
        })
      }
    }

    return { firstCreatedTask, createdCount }
  }

  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!draftTitle.trim()) {
      return
    }

    setError(null)

    try {
      const draftsToCreate: AiParsedDraft[] = [
        {
          title: draftTitle.trim(),
          description: null,
          startAt: draftStartAt || null,
          dueAt: draftDueAt || null,
          priority: draftPriority,
          confidence: 1,
          tagNames: draftTagNames,
          listId: draftListId || null,
          listName: null,
          action: "create",
          subtasks: draftSubtasks,
          warnings: [],
        },
      ]

      const { firstCreatedTask } = await createTasksFromDrafts(draftsToCreate)

      if (firstCreatedTask) {
        setItems((current) => [firstCreatedTask!, ...current.map((task) => ({ ...task, sortOrder: task.sortOrder + 1 }))])
      }
      setDraftTitle("")
      setDraftStartAt("")
      setDraftDueAt("")
      setDraftPriority("medium")
      setDraftTagNames([])
      setDraftSubtasks([])
      setAiWarnings([])
      setAiParsedSummary(null)
      setAiFeedbackTone("default")
      setActiveQuickDate(null)
      setShowCalendarPicker(false)
      setShowMoreOptions(false)
      if (firstCreatedTask) {
        setNewTaskHighlightId(firstCreatedTask.id)
        setSelectedTaskId(firstCreatedTask.id)
      }
      void loadTasks()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to create task.")
    } finally {
    }
  }

  async function handleParseWithAi() {
    if (!draftTitle.trim()) {
      setError("先输入自然语言任务描述，再使用 AI 解析。")
      return
    }

    setIsParsingAi(true)
    setError(null)

    try {
      const config = loadAiConfig()

      if (config.provider !== "custom" && !config.apiKey.trim()) {
        throw new Error("请先到设置页配置 AI API Key")
      }

      if (config.provider === "custom" && !config.baseUrl.trim()) {
        throw new Error("Custom provider 需要先配置 Base URL")
      }

      const response = await fetch("/api/ai/parse-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          input: draftTitle,
          config,
          context: {
            activeListId: activeListId || null,
            activeView,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Shanghai",
          },
        }),
      })

      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "AI 解析失败")
      }

      const parsedTasks = (payload.data.tasks as AiParsedDraft[]) ?? []
      const warnings = (payload.data.warnings as string[]) ?? []
      setAiWarnings(warnings)

      const validDrafts = parsedTasks.filter((item) => item.title?.trim())
      if (validDrafts.length === 0) {
        setAiFeedbackTone("warning")
        setAiParsedSummary(warnings[0] ?? "AI 没有识别出可创建的任务，请调整描述后重试。")
        return
      }

      const normalizedDrafts = validDrafts.map((draft, index) => ({ ...draft, clientId: `ai-${Date.now()}-${index}`, selected: true }))
      setAiDrafts(normalizedDrafts)
      setShowAiDraftReview(true)
      setAiFeedbackTone(warnings.length > 0 ? "warning" : "default")
      setAiParsedSummary(`AI 已生成 ${normalizedDrafts.length} 条待确认草稿。`)
      setAiWarnings(warnings)
      setDraftStartAt("")
      setDraftDueAt("")
      setDraftPriority("medium")
      setDraftListId(activeListId)
      setDraftTagNames([])
      setDraftSubtasks([])
      setActiveQuickDate(null)
      setShowCalendarPicker(false)
      setShowMoreOptions(false)
      setAiFeedbackTone(warnings.length > 0 ? "warning" : "default")
    } catch (parseError) {
      setError(parseError instanceof Error ? parseError.message : "AI 解析失败")
    } finally {
      setIsParsingAi(false)
    }
  }

  async function handleToggleStatus(task: TaskItem, event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setIsTogglingId(task.id)
    setError(null)

    try {
      const nextStatus = task.status === "done" ? "todo" : "done"
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: nextStatus }),
      })

      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to update task status.")
      }

      await loadTasks()
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : "Failed to update task status.")
    } finally {
      setIsTogglingId(null)
    }
  }

  function toggleSection(section: keyof typeof defaultSectionState) {
    setCollapsedSections((current) => ({ ...current, [section]: !current[section] }))
  }

  function applyQuickDate(type: "today" | "tomorrow" | "week") {
    const now = new Date()
    const start = new Date(now)
    start.setSeconds(0, 0)
    const end = new Date(start)

    if (type === "today") {
      end.setHours(23, 59, 0, 0)
    } else if (type === "tomorrow") {
      start.setDate(start.getDate() + 1)
      start.setHours(9, 0, 0, 0)
      end.setTime(start.getTime())
      end.setHours(18, 0, 0, 0)
    } else {
      const day = start.getDay()
      const diffToSunday = day === 0 ? 0 : 7 - day
      end.setDate(end.getDate() + diffToSunday)
      end.setHours(18, 0, 0, 0)
    }

    setDraftStartAt(start.toISOString().slice(0, 16))
    setDraftDueAt(end.toISOString().slice(0, 16))
    setActiveQuickDate(type)
  }

  function clearQuickDate() {
    setDraftStartAt("")
    setDraftDueAt("")
    setActiveQuickDate(null)
  }

  async function persistTaskOrder(taskId: string, targetTaskId: string, orderedTaskIds: string[]) {
    setItems((current) => {
      const orderMap = new Map(orderedTaskIds.map((id, index) => [id, index]))
      return [...current].sort((a, b) => (orderMap.get(a.id) ?? 9999) - (orderMap.get(b.id) ?? 9999))
    })

    const targetIndex = orderedTaskIds.indexOf(taskId)
    const response = await fetch("/api/tasks/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        taskId,
        sourceContainer: { type: "list", id: activeListId || null },
        targetContainer: { type: "list", id: activeListId || null },
        targetIndex: targetIndex === -1 ? orderedTaskIds.indexOf(targetTaskId) : targetIndex,
      }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      throw new Error(payload?.error?.message ?? "Failed to reorder tasks.")
    }
  }

  async function handleReorderWithinSection(dragTaskId: string, dropTaskId: string, section: TaskListSection) {
    if (dragTaskId === dropTaskId) return

    const sectionTasks = section === "pending" ? pendingTasks : section === "overdue" ? overdueTasks : section === "completed" ? completedTasks : cancelledTasks
    const sectionIds = sectionTasks.map((task) => task.id)
    const dragIndex = sectionIds.indexOf(dragTaskId)
    const dropIndex = sectionIds.indexOf(dropTaskId)

    if (dragIndex === -1 || dropIndex === -1) return

    const nextSectionIds = [...sectionIds]
    const [movedId] = nextSectionIds.splice(dragIndex, 1)
    nextSectionIds.splice(dropIndex, 0, movedId)

    const orderedTaskIds = visibleTaskIds.map((id) => id)
    let replaceIndex = 0
    const nextAllIds = orderedTaskIds.map((id) => {
      if (sectionIds.includes(id)) {
        const nextId = nextSectionIds[replaceIndex]
        replaceIndex += 1
        return nextId
      }
      return id
    })

    try {
      await persistTaskOrder(dragTaskId, dropTaskId, nextAllIds)
      setDropTargetTaskId(null)
      await loadTasks()
    } catch (reorderError) {
      setError(reorderError instanceof Error ? reorderError.message : "Failed to reorder tasks.")
      setDropTargetTaskId(null)
      await loadTasks()
    }
  }

  async function handleTaskQuickAction(
    task: TaskItem,
    action:
      | { type: "today" | "tomorrow" | "clearDate" }
      | { type: "priority"; value: TaskItem["priority"] }
      | { type: "move"; value: string }
      | { type: "pin" }
      | { type: "archive" }
      | { type: "delete" },
  ) {
    const now = new Date()
    let body: Record<string, string | boolean | null>

    if (action.type === "delete") {
      const response = await fetch(`/api/tasks/${task.id}`, { method: "DELETE", credentials: "include" })
      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        setError(payload?.error?.message ?? "Failed to delete task.")
        return
      }
      await loadTasks()
      return
    }

    if (action.type === "pin") {
      body = { pinToTop: true }
    } else if (action.type === "archive") {
      body = { status: "cancelled" }
    } else if (action.type === "priority") {
      body = { priority: action.value }
    } else if (action.type === "move") {
      body = { listId: action.value }
    } else if (action.type === "today") {
      const due = new Date(now)
      due.setHours(23, 59, 0, 0)
      body = { dueAt: due.toISOString() }
    } else if (action.type === "tomorrow") {
      const due = new Date(now)
      due.setDate(due.getDate() + 1)
      due.setHours(18, 0, 0, 0)
      body = { dueAt: due.toISOString() }
    } else {
      body = { dueAt: null, startAt: null }
    }

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      })
      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error?.message ?? "Failed to update task.")
      }
      await loadTasks()
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Failed to update task.")
    }
  }

  const dateSummary = useMemo(() => {
    if (draftStartAt && draftDueAt) {
      return `${draftStartAt.slice(5, 16)} - ${draftDueAt.slice(5, 16)}`
    }
    if (draftDueAt) return `截止 ${draftDueAt.slice(5, 16)}`
    if (draftStartAt) return `开始 ${draftStartAt.slice(5, 16)}`
    return "日期"
  }, [draftDueAt, draftStartAt])

  return (
    <>
      <div className="grid h-[calc(100vh-8rem)] min-h-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(440px,30vw)] 2xl:grid-cols-[minmax(0,1fr)_minmax(480px,32vw)]">
        <div className="flex min-w-0 min-h-0 flex-col gap-3 overflow-hidden">
          <section className="rounded-2xl border border-primary/15 bg-[linear-gradient(180deg,rgba(99,102,241,0.06),rgba(99,102,241,0.02))] px-4 py-4 shadow-none">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Tasks Workspace
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{headerEmoji}</span>
                  <div>
                    <h1 className="text-[24px] font-semibold tracking-tight">{headerTitle}</h1>
                    <p className="text-xs text-muted-foreground">
                      {activeListId ? "当前为二级清单任务视图" : `当前视图：${getViewTitle(activeView)}`}
                    </p>
                  </div>
                </div>
              </div>

              {childLists.length > 0 ? (
                <button
                  type="button"
                  onClick={() => toggleSection("childLists")}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  <ChevronRight className={`h-4 w-4 transition-transform ${collapsedSections.childLists ? "" : "rotate-90"}`} />
                  {collapsedSections.childLists ? "展开二级清单" : "折叠二级清单"}
                </button>
              ) : null}
            </div>

            {childLists.length > 0 && !collapsedSections.childLists ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {childLists.map((child) => (
                  <Link
                    key={child.id}
                    href={`/tasks?view=all&listId=${child.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <span>{child.emoji ?? "📁"}</span>
                    <span>{child.name}</span>
                  </Link>
                ))}
              </div>
            ) : null}

            <form onSubmit={handleCreateTask} className="mt-4 rounded-lg border border-border bg-muted/30 px-3 py-2 transition-colors hover:bg-background focus-within:border-border/80">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center text-muted-foreground">+</span>
                <input
                  className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                  placeholder={`添加任务到「${headerTitle}」，回车创建`}
                />

                <button
                    type="button"
                    onClick={() => void handleParseWithAi()}
                    disabled={isParsingAi || !draftTitle.trim()}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
                    aria-label="AI 解析任务"
                  >
                    <Bot className={`h-4 w-4 ${isParsingAi ? "animate-pulse" : ""}`} />
                  </button>

                <div ref={calendarRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCalendarPicker((current) => !current)}
                    className="inline-flex h-8 items-center gap-2 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <CalendarDays className="h-4 w-4" />
                    <span className="hidden sm:inline">{dateSummary}</span>
                  </button>

                  {showCalendarPicker ? (
                    <div className="absolute right-0 top-10 z-20 w-[320px] rounded-xl border border-border bg-card p-4 shadow-floating">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
                          {(["today", "tomorrow", "week"] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => applyQuickDate(type)}
                              className={`inline-flex h-7 items-center justify-center rounded-full border px-2.5 text-xs font-medium transition-all ${
                                activeQuickDate === type
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                            >
                              {type === "today" ? "今天" : type === "tomorrow" ? "明天" : "本周"}
                            </button>
                          ))}
                        </div>
                        <label className="space-y-1 text-sm">
                          <span className="text-muted-foreground">开始时间</span>
                          <input
                            type="datetime-local"
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                            value={draftStartAt}
                            onChange={(event) => setDraftStartAt(event.target.value)}
                          />
                        </label>
                        <label className="space-y-1 text-sm">
                          <span className="text-muted-foreground">结束时间段 / 截止时间</span>
                          <input
                            type="datetime-local"
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                            value={draftDueAt}
                            onChange={(event) => setDraftDueAt(event.target.value)}
                          />
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const now = new Date()
                              const later = new Date(now.getTime() + 60 * 60 * 1000)
                              setDraftStartAt(now.toISOString().slice(0, 16))
                              setDraftDueAt(later.toISOString().slice(0, 16))
                              setActiveQuickDate(null)
                            }}
                            className="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 text-xs hover:bg-muted"
                          >
                            今天 1 小时
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              clearQuickDate()
                            }}
                            className="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 text-xs hover:bg-muted"
                          >
                            清空
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div ref={moreRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowMoreOptions((current) => !current)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="更多任务选项"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${showMoreOptions ? "rotate-180" : ""}`} />
                  </button>

                  {showMoreOptions ? (
                    <div className="absolute right-0 top-10 z-20 w-[340px] rounded-xl border border-border bg-card p-4 shadow-floating">
                      <div className="space-y-4">
                        <div className="space-y-1 text-sm">
                          <span className="inline-flex items-center gap-2 text-muted-foreground"><Flag className="h-4 w-4" />优先级</span>
                          <DropdownSelect
                            items={[
                              { value: "high", label: "高优先级" },
                              { value: "medium", label: "中优先级" },
                              { value: "low", label: "低优先级" },
                            ]}
                            value={draftPriority}
                            placeholder="选择优先级"
                            onChange={(value) => setDraftPriority(value as TaskItem["priority"])}
                          />
                        </div>

                        <div className="space-y-1 text-sm">
                          <span className="inline-flex items-center gap-2 text-muted-foreground"><FolderTree className="h-4 w-4" />二级清单</span>
                          <DropdownSelect
                            items={[
                              { value: "", label: "未分类", icon: "📁", group: "默认" },
                              ...flatLists.map((list) => ({
                                value: list.id,
                                label: list.name,
                                icon: list.emoji ?? "📁",
                                group: list.depth === 0 ? "顶级清单" : "子清单",
                              })),
                            ]}
                            value={draftListId}
                            placeholder="未分类"
                            onChange={setDraftListId}
                            searchable
                            grouped
                          />
                        </div>

                        <div className="space-y-1 text-sm">
                          <span className="inline-flex items-center gap-2 text-muted-foreground"><Tag className="h-4 w-4" />标签</span>
                          <DropdownSelect
                            items={availableTags.map((tag) => ({
                              value: tag.name,
                              label: tag.name,
                                icon: tag.color ? <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.color }} /> : <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />,
                              group: "已有标签",
                            }))}
                            values={draftTagNames}
                            placeholder="选择标签"
                            multiple
                            searchable
                            grouped
                            closeOnSelect={false}
                            onValuesChange={setDraftTagNames}
                            createLabel="创建标签"
                            onCreateOption={async (label) => {
                              setDraftTagNames((current) => (current.includes(label) ? current : [...current, label]))
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-2 rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
                建议流程：先收集 → AI 拆解 → 确认草稿 → 开始计时 → 在洞察页复盘。
              </div>

              {(aiParsedSummary || aiWarnings.length > 0 || draftSubtasks.length > 0) ? (
                <div className="mt-2 space-y-2 border-t border-border/60 pt-2">
                  {aiParsedSummary ? (
                    <div
                      className={`inline-flex max-w-full items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs ${
                        aiFeedbackTone === "warning"
                          ? "border-border bg-muted text-foreground"
                          : "border-primary/20 bg-primary/10 text-primary"
                      }`}
                    >
                      <Info className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{aiParsedSummary}</span>
                    </div>
                  ) : null}

                  {draftSubtasks.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {draftSubtasks.map((subtask, index) => (
                        <span key={`${subtask.title}-${index}`} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                          子任务：{subtask.title}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {aiWarnings.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {aiWarnings.map((warning, index) => (
                        <span key={`${warning}-${index}`} className="rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground">
                          {warning}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </form>
          </section>

          {error ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
          ) : null}

          {isLoading ? (
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-16 animate-pulse rounded-2xl border border-border bg-card" />
              ))}
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-hidden">
              <div className="flex h-full min-h-0 flex-col gap-3 overflow-y-auto pr-1">
                <TaskSection
                  title="待完成"
                  count={pendingTasks.length}
                  collapsed={collapsedSections.pending}
                  onToggle={() => toggleSection("pending")}
                >
                  <TaskList
                  section="pending"
                  items={pendingTasks}
                  selectedTaskId={selectedTaskId}
                  activeListId={activeListId}
                  draggingTaskId={draggingTaskId}
                  dropTargetTaskId={dropTargetTaskId}
                  newTaskHighlightId={newTaskHighlightId}
                  actionListItems={taskActionListItems}
                  isTogglingId={isTogglingId}
                  onDragStart={setDraggingTaskId}
                  onDragEnd={() => {
                    setDraggingTaskId(null)
                    setDropTargetTaskId(null)
                  }}
                  onDragEnter={setDropTargetTaskId}
                  onReorder={handleReorderWithinSection}
                  onTaskAction={handleTaskQuickAction}
                  onSelect={setSelectedTaskId}
                  onToggleStatus={handleToggleStatus}
                  onRefresh={async () => {
                    await loadTasks()
                    await loadCurrentTimer()
                  }}
                  currentTimerTaskId={currentTimer?.task?.id ?? null}
                  currentTimerStatus={currentTimer?.status ?? null}
                />
              </TaskSection>

              <TaskSection
                title="已过期"
                count={overdueTasks.length}
                collapsed={collapsedSections.overdue}
                tone="overdue"
                onToggle={() => toggleSection("overdue")}
              >
                <TaskList
                  section="overdue"
                  items={overdueTasks}
                  selectedTaskId={selectedTaskId}
                  activeListId={activeListId}
                  draggingTaskId={draggingTaskId}
                  dropTargetTaskId={dropTargetTaskId}
                  newTaskHighlightId={newTaskHighlightId}
                  actionListItems={taskActionListItems}
                  isTogglingId={isTogglingId}
                  onDragStart={setDraggingTaskId}
                  onDragEnd={() => {
                    setDraggingTaskId(null)
                    setDropTargetTaskId(null)
                  }}
                  onDragEnter={setDropTargetTaskId}
                  onReorder={handleReorderWithinSection}
                  onTaskAction={handleTaskQuickAction}
                  onSelect={setSelectedTaskId}
                  onToggleStatus={handleToggleStatus}
                  onRefresh={async () => {
                    await loadTasks()
                    await loadCurrentTimer()
                  }}
                  currentTimerTaskId={currentTimer?.task?.id ?? null}
                  currentTimerStatus={currentTimer?.status ?? null}
                />
              </TaskSection>

                <TaskSection
                  title="已完成"
                  count={completedTasks.length}
                  collapsed={collapsedSections.completed}
                  onToggle={() => toggleSection("completed")}
                >
                  <TaskList
                    section="completed"
                    items={completedTasks}
                    selectedTaskId={selectedTaskId}
                    activeListId={activeListId}
                  draggingTaskId={draggingTaskId}
                  dropTargetTaskId={dropTargetTaskId}
                  newTaskHighlightId={newTaskHighlightId}
                  actionListItems={taskActionListItems}
                  isTogglingId={isTogglingId}
                  onDragStart={setDraggingTaskId}
                  onDragEnd={() => {
                    setDraggingTaskId(null)
                    setDropTargetTaskId(null)
                  }}
                  onDragEnter={setDropTargetTaskId}
                  onReorder={handleReorderWithinSection}
                  onTaskAction={handleTaskQuickAction}
                  onSelect={setSelectedTaskId}
                  onToggleStatus={handleToggleStatus}
                  onRefresh={async () => {
                    await loadTasks()
                    await loadCurrentTimer()
                  }}
                  currentTimerTaskId={currentTimer?.task?.id ?? null}
                  currentTimerStatus={currentTimer?.status ?? null}
                />
                </TaskSection>

                <TaskSection
                  title="已取消"
                  count={cancelledTasks.length}
                  collapsed={collapsedSections.cancelled}
                  onToggle={() => toggleSection("cancelled")}
                >
                  <TaskList
                    section="cancelled"
                    items={cancelledTasks}
                    selectedTaskId={selectedTaskId}
                    activeListId={activeListId}
                    draggingTaskId={draggingTaskId}
                    dropTargetTaskId={dropTargetTaskId}
                    newTaskHighlightId={newTaskHighlightId}
                    actionListItems={taskActionListItems}
                    isTogglingId={isTogglingId}
                    onDragStart={setDraggingTaskId}
                    onDragEnd={() => {
                      setDraggingTaskId(null)
                      setDropTargetTaskId(null)
                    }}
                    onDragEnter={setDropTargetTaskId}
                    onReorder={handleReorderWithinSection}
                    onTaskAction={handleTaskQuickAction}
                    onSelect={setSelectedTaskId}
                    onToggleStatus={handleToggleStatus}
                    onRefresh={async () => {
                      await loadTasks()
                      await loadCurrentTimer()
                    }}
                    currentTimerTaskId={currentTimer?.task?.id ?? null}
                    currentTimerStatus={currentTimer?.status ?? null}
                  />
                </TaskSection>
              </div>
            </div>
          )}
        </div>

        <TaskDetailPanel taskId={selectedTaskId} onUpdated={() => loadTasks()} />
      </div>

      <TaskDetailDrawer taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} onUpdated={() => loadTasks()} />
      <AiTaskDraftReviewSheet
        open={showAiDraftReview}
        drafts={aiDrafts.map((draft) => ({ ...draft, clientId: draft.clientId ?? draft.title ?? Math.random().toString() }))}
        onClose={() => setShowAiDraftReview(false)}
        onChange={(nextDrafts) => setAiDrafts(nextDrafts)}
        onConfirm={async () => {
          const selectedDrafts = aiDrafts.filter((draft) => draft.selected && draft.title?.trim())
          if (selectedDrafts.length === 0) {
            setShowAiDraftReview(false)
            return
          }
          const { firstCreatedTask, createdCount } = await createTasksFromDrafts(selectedDrafts)
          if (firstCreatedTask) {
            setItems((current) => [firstCreatedTask, ...current.map((task) => ({ ...task, sortOrder: task.sortOrder + 1 }))])
            setNewTaskHighlightId(firstCreatedTask.id)
            setSelectedTaskId(firstCreatedTask.id)
          }
          setShowAiDraftReview(false)
          setAiDrafts([])
          setDraftTitle("")
          setDraftStartAt("")
          setDraftDueAt("")
          setDraftPriority("medium")
          setDraftListId(activeListId)
          setDraftTagNames([])
          setDraftSubtasks([])
          setActiveQuickDate(null)
          setShowCalendarPicker(false)
          setShowMoreOptions(false)
          setAiParsedSummary(`AI 已创建 ${createdCount} 条任务。`)
          await loadTasks()
        }}
      />
    </>
  )
}

function TaskSection({
  title,
  count,
  collapsed,
  tone,
  onToggle,
  children,
}: {
  title: string
  count: number
  collapsed: boolean
  tone?: "default" | "overdue"
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <section className={`flex min-h-0 flex-col overflow-hidden rounded-xl border bg-card shadow-none ${tone === "overdue" ? "border-destructive/20" : "border-border/80"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-muted/40"
      >
        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${collapsed ? "" : "rotate-90"}`} />
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{title}</span>
        <span className="text-[11px] text-muted-foreground">{count}</span>
      </button>

      {!collapsed ? <div className="min-h-0 border-t border-border/60">{children}</div> : null}
    </section>
  )
}

type TaskListSection = "pending" | "overdue" | "completed" | "cancelled"

function TaskList({
  section,
  items,
  selectedTaskId,
  activeListId,
  draggingTaskId,
  dropTargetTaskId,
  newTaskHighlightId,
  actionListItems,
  isTogglingId,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onReorder,
  onTaskAction,
  onSelect,
  onToggleStatus,
  onRefresh,
  currentTimerTaskId,
  currentTimerStatus,
}: {
  section: TaskListSection
  items: TaskItem[]
  selectedTaskId: string | null
  activeListId: string
  draggingTaskId: string | null
  dropTargetTaskId: string | null
  newTaskHighlightId: string | null
  actionListItems: Array<{ value: string; label: string; icon: React.ReactNode; group: string }>
  isTogglingId: string | null
  onDragStart: (taskId: string) => void
  onDragEnd: () => void
  onDragEnter: (taskId: string | null) => void
  onReorder: (dragTaskId: string, dropTaskId: string, section: TaskListSection) => Promise<void>
  onTaskAction: (
    task: TaskItem,
    action:
      | { type: "today" | "tomorrow" | "clearDate" }
      | { type: "priority"; value: TaskItem["priority"] }
      | { type: "move"; value: string }
      | { type: "pin" }
      | { type: "archive" }
      | { type: "delete" },
  ) => Promise<void>
  onSelect: (taskId: string) => void
  onToggleStatus: (task: TaskItem, event: React.MouseEvent<HTMLButtonElement>) => void
  onRefresh: () => Promise<void>
  currentTimerTaskId: string | null
  currentTimerStatus: "running" | "paused" | null
}) {
  if (items.length === 0) {
    return <div className="px-4 py-8 text-center text-sm text-muted-foreground">暂无任务</div>
  }

  return (
    <div className="max-h-[min(34rem,calc(100vh-19rem))] overflow-y-auto divide-y divide-border/60">
      {items.map((task) => {
        const isSelected = selectedTaskId === task.id
        const dateMeta = formatDateMeta(task)
        const showInsertLine = draggingTaskId && dropTargetTaskId === task.id && draggingTaskId !== task.id
        const isNewTask = newTaskHighlightId === task.id
        const isTimingTask = currentTimerTaskId === task.id
        const showSource = task.source === "ai" || task.source === "quick_add"
        const showEffort = Boolean(task.summary.effortSummary.estimatedMinutes || task.summary.effortSummary.actualMinutes)
        const showSubtaskProgress = task.summary.subtaskCount > 0

        return (
          <div
            key={task.id}
            role="button"
            tabIndex={0}
            draggable
            onClick={() => onSelect(task.id)}
            onDragStart={() => onDragStart(task.id)}
            onDragEnd={onDragEnd}
            onDragOver={(event) => {
              event.preventDefault()
              if (draggingTaskId && draggingTaskId !== task.id) {
                onDragEnter(task.id)
              }
            }}
            onDragEnter={() => {
              if (draggingTaskId && draggingTaskId !== task.id) {
                onDragEnter(task.id)
              }
            }}
            onDrop={async (event) => {
              event.preventDefault()
              if (draggingTaskId) {
                await onReorder(draggingTaskId, task.id, section)
                onDragEnd()
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onSelect(task.id)
              }
            }}
            className={`group relative w-full cursor-pointer rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-muted/30 ${
              isTimingTask
                ? "bg-primary/10 ring-1 ring-primary/25 shadow-[0_0_0_1px_rgba(99,102,241,0.08)]"
                : isSelected
                  ? "bg-muted/60 ring-1 ring-border/70"
                  : "bg-transparent"
            } ${isNewTask ? "bg-primary/10 ring-1 ring-primary/20" : ""} ${draggingTaskId === task.id ? "scale-[0.99] opacity-70" : ""}`}
          >
            {showInsertLine ? <div className="absolute left-3 right-3 top-0 h-0.5 rounded-full bg-primary/70" /> : null}
            <div className="flex items-start gap-2">
              <span className={`flex w-4 flex-shrink-0 items-center justify-center self-stretch text-muted-foreground/40 transition-opacity ${draggingTaskId === task.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <GripVertical className="h-4 w-4" />
              </span>
              <button
                type="button"
                onClick={(event) => void onToggleStatus(task, event)}
                disabled={isTogglingId === task.id}
                className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground"
              >
                {task.status === "done" ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5" />}
              </button>

              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className={`line-clamp-1 text-sm leading-5 ${task.status === "done" ? "text-muted-foreground line-through" : task.summary.isOverdue ? "text-destructive" : "text-foreground"}`}>
                      {task.title}
                    </p>
                    {(dateMeta || (!activeListId && task.list) || isTimingTask || task.summary.isOverdue || showSubtaskProgress || showEffort || showSource) ? (
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {dateMeta ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5">
                            <Clock3 className="h-3 w-3" />
                            {dateMeta}
                          </span>
                        ) : null}
                        {!activeListId && task.list ? (
                          <span className="rounded-md bg-muted px-2 py-0.5">{task.list.emoji ?? "📁"} {task.list.name}</span>
                        ) : null}
                        {isTimingTask ? (
                          <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 ${currentTimerStatus === "running" ? "bg-primary/12 text-primary" : "bg-amber-500/10 text-amber-700"}`}>
                            <span className={`h-2 w-2 rounded-full ${currentTimerStatus === "running" ? "bg-primary" : "bg-amber-600"}`} />
                            {currentTimerStatus === "running" ? "计时中" : "已暂停"}
                          </span>
                        ) : null}
                        {task.summary.isOverdue ? (
                          <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-destructive">已逾期</span>
                        ) : null}
                        {showSubtaskProgress ? (
                          <span className="rounded-md bg-muted px-2 py-0.5">
                            子任务 {task.summary.completedSubtaskCount}/{task.summary.subtaskCount}
                          </span>
                        ) : null}
                        {showEffort ? (
                          <span className="rounded-md bg-muted px-2 py-0.5">
                            {`耗时 ${task.summary.effortSummary.actualMinutes}m / 预计 ${task.summary.effortSummary.estimatedMinutes ?? 0}m`}
                          </span>
                        ) : null}
                        {showSource ? (
                          <span className={`rounded-md px-2 py-0.5 ${task.source === "ai" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                            {task.source === "ai" ? "AI" : "快速添加"}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-start gap-1.5">
                    <span
                      className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                        task.priority === "high" ? "bg-destructive" : task.priority === "medium" ? "bg-primary/60" : "bg-muted-foreground/30"
                      }`}
                    />
                    <div className={`flex items-center gap-1 transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                      {task.status !== "done" && task.status !== "cancelled" && task.status !== "archived" ? (
                        <div onClick={(event) => event.stopPropagation()}>
                          <TimerActionButtons compact taskId={task.id} onChanged={onRefresh} />
                        </div>
                      ) : null}
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          void onTaskAction(task, { type: "pin" })
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="置顶任务"
                      >
                        <Pin className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          void onTaskAction(task, { type: "archive" })
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="归档任务"
                      >
                        <Archive className="h-4 w-4" />
                      </button>
                    </div>
                    <DropdownSelect
                      items={[
                        { value: "today", label: "设为今天", icon: <CalendarCheck className="h-4 w-4" />, group: "日期" },
                        { value: "tomorrow", label: "设为明天", icon: <CalendarClock className="h-4 w-4" />, group: "日期" },
                        { value: "clearDate", label: "清空日期", icon: <Eraser className="h-4 w-4" />, group: "日期" },
                        { value: "priority:high", label: "高优先级", group: "优先级" },
                        { value: "priority:medium", label: "中优先级", group: "优先级" },
                        { value: "priority:low", label: "低优先级", group: "优先级" },
                        { value: "task:pin", label: "置顶任务", icon: <Pin className="h-4 w-4" />, group: "操作" },
                        { value: "task:archive", label: "归档任务", icon: <Archive className="h-4 w-4" />, group: "操作" },
                        ...actionListItems,
                        { value: "danger:delete", label: "删除任务", icon: <Trash2 className="h-4 w-4" />, group: "危险操作", destructive: true },
                      ]}
                      placeholder="更多操作"
                      variant="action"
                      grouped
                      searchable
                      menuClassName="w-48"
                      onChange={(value) => {
                        if (value === "today" || value === "tomorrow" || value === "clearDate") {
                          return void onTaskAction(task, { type: value })
                        }
                        if (value.startsWith("priority:")) {
                          return void onTaskAction(task, { type: "priority", value: value.split(":")[1] as TaskItem["priority"] })
                        }
                        if (value.startsWith("move:")) {
                          return void onTaskAction(task, { type: "move", value: value.slice(5) })
                        }
                        if (value === "task:pin") {
                          return void onTaskAction(task, { type: "pin" })
                        }
                        if (value === "task:archive") {
                          return void onTaskAction(task, { type: "archive" })
                        }
                        if (value === "danger:delete") {
                          return void onTaskAction(task, { type: "delete" })
                        }
                      }}
                      renderTrigger={({ open, toggle }) => (
                        <div data-task-menu-root="true">
                          <button
                            type="button"
                            data-state={open ? "open" : "closed"}
                            onClick={(event) => {
                              event.stopPropagation()
                              toggle()
                            }}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-muted hover:text-foreground data-[state=open]:bg-muted ${
                              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
