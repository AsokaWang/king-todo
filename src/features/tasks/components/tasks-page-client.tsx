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
  Flag,
  FolderTree,
  GripVertical,
  MoreHorizontal,
  CalendarCheck,
  CalendarClock,
  Eraser,
  Trash2,
  Tag,
} from "lucide-react"
import { TaskDetailDrawer } from "@/features/tasks/components/task-detail-drawer"
import { TaskDetailPanel } from "@/features/tasks/components/task-detail-panel"
import { DropdownSelect } from "@/components/ui/dropdown-select"
import { loadAiConfig } from "@/lib/ai-config"

type TaskItem = {
  id: string
  title: string
  description?: string | null
  status: "todo" | "in_progress" | "done" | "archived"
  priority: "low" | "medium" | "high"
  sortOrder: number
  dueAt?: string | null
  startAt?: string | null
  estimatedMinutes?: number | null
  actualMinutes: number
  list?: {
    id: string
    name: string
    emoji?: string | null
    color?: string | null
  } | null
  taskTags?: Array<{
    tag: {
      id: string
      name: string
      color?: string | null
    }
  }>
}

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
  clientId: string
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

const SECTION_COLLAPSE_STORAGE_KEY = "king-todo-task-sections-collapsed"

const defaultSectionState = {
  pending: false,
  overdue: false,
  completed: true,
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
  const [aiTaskDrafts, setAiTaskDrafts] = useState<AiParsedDraft[]>([])
  const [availableTags, setAvailableTags] = useState<TagOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
  const [aiOverallConfidence, setAiOverallConfidence] = useState<number | null>(null)
  const [draggingAiDraftId, setDraggingAiDraftId] = useState<string | null>(null)
  const [dropAiDraftId, setDropAiDraftId] = useState<string | null>(null)
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
    return items.filter((task) => task.status !== "done" && !(task.dueAt && new Date(task.dueAt).getTime() < now))
  }, [items])

  const overdueTasks = useMemo(() => {
    const now = Date.now()
    return items.filter((task) => task.status !== "done" && !!task.dueAt && new Date(task.dueAt).getTime() < now)
  }, [items])

  const completedTasks = useMemo(() => items.filter((task) => task.status === "done"), [items])

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
        await Promise.all([loadLists(), loadTasks(), loadTags()])
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
  }, [loadLists, loadTags, loadTasks])

  useEffect(() => {
    setSelectedTaskId(null)
  }, [pathname, activeListId, activeView])

  useEffect(() => {
    if (!newTaskHighlightId) return
    const timeout = window.setTimeout(() => setNewTaskHighlightId(null), 1200)
    return () => window.clearTimeout(timeout)
  }, [newTaskHighlightId])

  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!draftTitle.trim() && aiTaskDrafts.length === 0) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const draftsToCreate = aiTaskDrafts.length
        ? aiTaskDrafts.filter((item) => item.title?.trim())
        : [
            {
              clientId: `manual-${Date.now()}`,
              title: draftTitle.trim(),
              description: null,
              startAt: draftStartAt || null,
              dueAt: draftDueAt || null,
              priority: draftPriority,
              confidence: 1,
              tagNames: draftTagNames,
              listId: draftListId || null,
              listName: null,
              action: "create" as const,
              subtasks: draftSubtasks,
              warnings: [],
            },
          ]

      let firstCreatedTask: TaskItem | null = null

      for (const draft of draftsToCreate) {
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: draft.title?.trim(),
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

      if (firstCreatedTask) {
        setItems((current) => [firstCreatedTask!, ...current.map((task) => ({ ...task, sortOrder: task.sortOrder + 1 }))])
      }
      setDraftTitle("")
      setDraftStartAt("")
      setDraftDueAt("")
      setDraftPriority("medium")
      setDraftTagNames([])
      setDraftSubtasks([])
      setAiTaskDrafts([])
      setAiWarnings([])
      setAiOverallConfidence(null)
      setAiParsedSummary(null)
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
      setIsSubmitting(false)
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
      const overallConfidence = (payload.data.confidence as number | undefined) ?? null

      setAiTaskDrafts(parsedTasks)
      setAiOverallConfidence(overallConfidence)
      if (parsedTasks.length === 1) {
        const parsed = parsedTasks[0]
        setDraftTitle(parsed.title ?? draftTitle)
        setDraftStartAt(parsed.startAt ? new Date(parsed.startAt).toISOString().slice(0, 16) : draftStartAt)
        setDraftDueAt(parsed.dueAt ? new Date(parsed.dueAt).toISOString().slice(0, 16) : draftDueAt)
        setDraftPriority(parsed.priority ?? draftPriority)
        setDraftTagNames(parsed.tagNames.length ? parsed.tagNames : draftTagNames)
        setDraftListId(parsed.listId ?? draftListId ?? "")
        setDraftSubtasks(parsed.subtasks ?? [])
      }
      setAiWarnings(warnings)

      const summaryParts = [
        parsedTasks.length > 1 ? `任务:${parsedTasks.length}` : null,
        parsedTasks.some((item) => item.dueAt || item.startAt) ? "已识别时间" : null,
        parsedTasks.some((item) => item.action !== "create") ? "含操作意图" : null,
        parsedTasks.reduce((sum, item) => sum + item.subtasks.length, 0) ? `子任务:${parsedTasks.reduce((sum, item) => sum + item.subtasks.length, 0)}` : null,
      ].filter(Boolean)
      setAiParsedSummary(summaryParts.length ? `AI 已填充 ${summaryParts.join(" · ")}` : "AI 已完成解析，请确认后创建")
      setShowMoreOptions(true)
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

  async function persistTaskOrder(orderedTaskIds: string[]) {
    setItems((current) => {
      const orderMap = new Map(orderedTaskIds.map((id, index) => [id, index]))
      return [...current].sort((a, b) => (orderMap.get(a.id) ?? 9999) - (orderMap.get(b.id) ?? 9999))
    })

    const response = await fetch("/api/tasks/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        orderedTaskIds,
        listId: activeListId || null,
      }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      throw new Error(payload?.error?.message ?? "Failed to reorder tasks.")
    }
  }

  async function handleReorderWithinSection(dragTaskId: string, dropTaskId: string, section: "pending" | "overdue" | "completed") {
    if (dragTaskId === dropTaskId) return

    const sectionTasks = section === "pending" ? pendingTasks : section === "overdue" ? overdueTasks : completedTasks
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
      await persistTaskOrder(nextAllIds)
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
      | { type: "delete" },
  ) {
    const now = new Date()
    let body: Record<string, string | null>

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

    if (action.type === "priority") {
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

  function updateAiTaskDraft(clientId: string, updater: (draft: AiParsedDraft) => AiParsedDraft) {
    setAiTaskDrafts((current) => current.map((item) => (item.clientId === clientId ? updater(item) : item)))
  }

  function removeAiTaskDraft(clientId: string) {
    setAiTaskDrafts((current) => current.filter((item) => item.clientId !== clientId))
  }

  function reorderAiTaskDrafts(dragId: string, dropId: string) {
    setAiTaskDrafts((current) => {
      const next = [...current]
      const dragIndex = next.findIndex((item) => item.clientId === dragId)
      const dropIndex = next.findIndex((item) => item.clientId === dropId)
      if (dragIndex === -1 || dropIndex === -1) return current
      const [moved] = next.splice(dragIndex, 1)
      next.splice(dropIndex, 0, moved)
      return next
    })
  }

  function mergeAiDraftIntoSubtask(sourceId: string, targetId: string) {
    if (sourceId === targetId) return
    setAiTaskDrafts((current) => {
      const source = current.find((item) => item.clientId === sourceId)
      if (!source?.title) return current
      const mergedSubtasks: ParsedSubtaskDraft[] = [{ title: source.title }, ...source.subtasks]
      return current
        .filter((item) => item.clientId !== sourceId)
        .map((item) =>
          item.clientId === targetId
            ? {
                ...item,
                subtasks: [...item.subtasks, ...mergedSubtasks],
                warnings: [...(item.warnings ?? []), `已将“${source.title}”合并为子任务`],
              }
            : item,
        )
    })
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
      <div className="grid min-h-[calc(100vh-8rem)] gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-3">
          <section className="rounded-xl border border-border/80 bg-card px-4 py-4 shadow-none">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Tasks</p>
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
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-violet-50 hover:text-violet-600 disabled:opacity-50"
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
                                  ? "border-sky-600 bg-sky-600 text-white"
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
                              icon: <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.color ?? "#94a3b8" }} />,
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

              {(aiParsedSummary || aiWarnings.length > 0 || draftSubtasks.length > 0 || aiTaskDrafts.length > 0) ? (
                <div className="mt-2 space-y-2 border-t border-border/60 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {aiParsedSummary ? <p className="text-xs text-violet-600">{aiParsedSummary}</p> : null}
                    {aiOverallConfidence !== null ? (
                      <span className={`rounded-md px-2 py-1 text-xs ${aiOverallConfidence < 0.65 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                        置信度 {Math.round(aiOverallConfidence * 100)}%
                      </span>
                    ) : null}
                  </div>

                  {aiTaskDrafts.length > 0 ? (
                    <div className="space-y-3">
                      {aiTaskDrafts.map((draft, index) => (
                        <div
                          key={draft.clientId}
                          draggable
                          onDragStart={() => setDraggingAiDraftId(draft.clientId)}
                          onDragEnd={() => {
                            setDraggingAiDraftId(null)
                            setDropAiDraftId(null)
                          }}
                          onDragOver={(event) => {
                            event.preventDefault()
                            if (draggingAiDraftId !== draft.clientId) setDropAiDraftId(draft.clientId)
                          }}
                          onDrop={(event) => {
                            event.preventDefault()
                            if (draggingAiDraftId) reorderAiTaskDrafts(draggingAiDraftId, draft.clientId)
                            setDraggingAiDraftId(null)
                            setDropAiDraftId(null)
                          }}
                          className={`relative rounded-xl border p-3 ${draft.confidence < 0.65 ? "border-amber-200 bg-amber-50/50" : "border-violet-200/70 bg-violet-50/50"} ${dropAiDraftId === draft.clientId && draggingAiDraftId !== draft.clientId ? "ring-2 ring-sky-300" : ""}`}
                        >
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="cursor-grab text-muted-foreground/60">⋮⋮</span>
                              <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-700">AI 确认卡片 {index + 1}</p>
                              <span className={`rounded-md px-2 py-1 text-[11px] ${draft.confidence < 0.65 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                                {draft.confidence < 0.65 ? "低置信度" : "高置信度"} · {Math.round(draft.confidence * 100)}%
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {aiTaskDrafts.length > 1 ? (
                                <DropdownSelect
                                  items={aiTaskDrafts
                                    .filter((item) => item.clientId !== draft.clientId)
                                    .map((item) => ({ value: item.clientId, label: `合并到：${item.title ?? "未命名任务"}` }))}
                                  placeholder="合并为子任务"
                                  className="w-40"
                                  onChange={(value) => mergeAiDraftIntoSubtask(draft.clientId, value)}
                                />
                              ) : null}
                              <DropdownSelect
                                items={[
                                  { value: "create", label: "创建" },
                                  { value: "pinToTop", label: "置顶" },
                                  { value: "archive", label: "归档" },
                                  { value: "abandon", label: "放弃" },
                                ]}
                                value={draft.action}
                                placeholder="动作"
                                className="w-28"
                                onChange={(value) => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, action: value as AiParsedDraft["action"] }))}
                              />
                              <button
                                type="button"
                                onClick={() => removeAiTaskDraft(draft.clientId)}
                                className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                              >
                                删除卡片
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-2 md:grid-cols-2">
                            <input
                              value={draft.title ?? ""}
                              onChange={(event) => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, title: event.target.value }))}
                              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
                              placeholder="任务标题"
                            />
                            <DropdownSelect
                              items={[
                                { value: "high", label: "高优先级" },
                                { value: "medium", label: "中优先级" },
                                { value: "low", label: "低优先级" },
                              ]}
                              value={draft.priority ?? "medium"}
                              placeholder="优先级"
                              onChange={(value) => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, priority: value as TaskItem["priority"] }))}
                            />
                            <input
                              type="datetime-local"
                              value={draft.startAt ? new Date(draft.startAt).toISOString().slice(0, 16) : ""}
                              onChange={(event) => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, startAt: event.target.value || null }))}
                              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
                            />
                            <input
                              type="datetime-local"
                              value={draft.dueAt ? new Date(draft.dueAt).toISOString().slice(0, 16) : ""}
                              onChange={(event) => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, dueAt: event.target.value || null }))}
                              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
                            />
                          </div>

                          <div className="mt-2 grid gap-2 md:grid-cols-2">
                            <DropdownSelect
                              items={[
                                { value: "", label: "未分类", icon: "📁", group: "默认" },
                                ...flatLists.map((list) => ({ value: list.id, label: list.name, icon: list.emoji ?? "📁", group: list.depth === 0 ? "顶级清单" : "子清单" })),
                              ]}
                              value={draft.listId ?? ""}
                              placeholder="未分类"
                              searchable
                              grouped
                              onChange={(value) => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, listId: value || null }))}
                            />
                            <DropdownSelect
                              items={availableTags.map((tag) => ({
                                value: tag.name,
                                label: tag.name,
                                icon: <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.color ?? "#94a3b8" }} />,
                                group: "已有标签",
                              }))}
                              values={draft.tagNames}
                              placeholder="标签"
                              multiple
                              searchable
                              grouped
                              closeOnSelect={false}
                              createLabel="创建标签"
                              onCreateOption={async (label) => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, tagNames: item.tagNames.includes(label) ? item.tagNames : [...item.tagNames, label] }))}
                              onValuesChange={(values) => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, tagNames: values }))}
                            />
                          </div>

                          <div className="mt-2 space-y-2">
                            {draft.subtasks.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {draft.subtasks.map((subtask, subtaskIndex) => (
                                  <span key={`${subtask.title}-${subtaskIndex}`} className="inline-flex items-center rounded-md bg-background px-2 py-1 text-xs text-muted-foreground">
                                    {subtask.title}
                                    <button
                                      type="button"
                                      onClick={() => updateAiTaskDraft(draft.clientId, (item) => ({ ...item, subtasks: item.subtasks.filter((_, index) => index !== subtaskIndex) }))}
                                      className="ml-1 text-muted-foreground hover:text-foreground"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            {draft.warnings?.length ? (
                              <div className="flex flex-wrap gap-2">
                                {draft.warnings.map((warning, warningIndex) => (
                                  <span key={`${warning}-${warningIndex}`} className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700">
                                    {warning}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
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
                        <span key={`${warning}-${index}`} className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700">
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
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-16 animate-pulse rounded-2xl border border-border bg-card" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
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
                />
              </TaskSection>
            </div>
          )}
        </div>

        <TaskDetailPanel taskId={selectedTaskId} onUpdated={() => loadTasks()} />
      </div>

      <TaskDetailDrawer taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} onUpdated={() => loadTasks()} />
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
    <section className={`overflow-hidden rounded-xl border bg-card shadow-none ${tone === "overdue" ? "border-orange-200/70" : "border-border/80"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-muted/40"
      >
        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${collapsed ? "" : "rotate-90"}`} />
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{title}</span>
        <span className="text-[11px] text-muted-foreground">{count}</span>
      </button>

      {!collapsed ? <div className="border-t border-border/60">{children}</div> : null}
    </section>
  )
}

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
}: {
  section: "pending" | "overdue" | "completed"
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
  onReorder: (dragTaskId: string, dropTaskId: string, section: "pending" | "overdue" | "completed") => Promise<void>
  onTaskAction: (
    task: TaskItem,
    action:
      | { type: "today" | "tomorrow" | "clearDate" }
      | { type: "priority"; value: TaskItem["priority"] }
      | { type: "move"; value: string }
      | { type: "delete" },
  ) => Promise<void>
  onSelect: (taskId: string) => void
  onToggleStatus: (task: TaskItem, event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  if (items.length === 0) {
    return <div className="px-4 py-8 text-center text-sm text-muted-foreground">暂无任务</div>
  }

  return (
    <div className="divide-y divide-border/60">
      {items.map((task) => {
        const isSelected = selectedTaskId === task.id
        const dateMeta = formatDateMeta(task)
        const showInsertLine = draggingTaskId && dropTargetTaskId === task.id && draggingTaskId !== task.id
        const isNewTask = newTaskHighlightId === task.id

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
            className={`group relative w-full cursor-pointer px-3 py-2 text-left transition-all duration-200 hover:bg-muted/30 ${
              isSelected ? "bg-muted/60" : "bg-transparent"
            } ${isNewTask ? "bg-emerald-50 ring-1 ring-emerald-200/60 dark:bg-emerald-500/10" : ""} ${draggingTaskId === task.id ? "scale-[0.99] opacity-70" : ""}
            }`}
          >
            {showInsertLine ? <div className="absolute left-3 right-3 top-0 h-0.5 rounded-full bg-sky-500" /> : null}
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
                    <p className={`line-clamp-1 text-sm leading-5 ${task.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {task.title}
                    </p>
                    {(dateMeta || task.taskTags?.length || (!activeListId && task.list)) ? (
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
                        {task.taskTags?.map((item) => (
                          <span key={item.tag.id} className="rounded-md bg-muted px-2 py-0.5">#{item.tag.name}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-start gap-1">
                    <span
                      className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                        task.priority === "high" ? "bg-destructive" : task.priority === "medium" ? "bg-amber-400" : "bg-muted-foreground/30"
                      }`}
                    />
                    <DropdownSelect
                      items={[
                        { value: "today", label: "设为今天", icon: <CalendarCheck className="h-4 w-4" />, group: "日期" },
                        { value: "tomorrow", label: "设为明天", icon: <CalendarClock className="h-4 w-4" />, group: "日期" },
                        { value: "clearDate", label: "清空日期", icon: <Eraser className="h-4 w-4" />, group: "日期" },
                        { value: "priority:high", label: "高优先级", group: "优先级" },
                        { value: "priority:medium", label: "中优先级", group: "优先级" },
                        { value: "priority:low", label: "低优先级", group: "优先级" },
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
