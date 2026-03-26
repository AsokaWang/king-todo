"use client"

import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { FolderPlus, MoreHorizontal, Plus, Search, Settings, X } from "lucide-react"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { cn } from "@/lib/utils/cn"

export function SidebarAccountMenu({
  email,
  avatarUrl,
  pathname,
  showAccountMenu,
  renderAccountMenu,
  onToggle,
  onClose,
}: {
  email: string
  avatarUrl?: string | null
  pathname: string
  showAccountMenu: boolean
  renderAccountMenu: boolean
  onToggle: () => void
  onClose: () => void
}) {
  return (
    <>
      <button
        type="button"
        aria-label="账号菜单"
        onClick={onToggle}
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
                onClick={onClose}
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
    </>
  )
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

type ViewItem = {
  key: keyof ViewCounts
  label: string
  icon: LucideIcon
}

type SettingsNavItem = {
  key: string
  label: string
  icon: LucideIcon
}

type SidebarTasksPanelProps = {
  activeView: string
  activeListId: string
  viewCounts: ViewCounts
  views: readonly ViewItem[]
  lists: NestedList[]
  isDarkMode: boolean
  collapsedListIds: string[]
  openListMenuId: string | "root" | null
  renderListMenuId: string | "root" | null
  inlineCreateParentId: string | null
  listDraftName: string
  isCreating: boolean
  onOpenCreateListModal: (parentId?: string | null, parentName?: string | null) => void
  onToggleCollapsed: (listId: string) => void
  onToggleMenu: (listId: string | "root" | null) => void
  onStartInlineCreate: (parentId?: string | null) => void
  onInlineDraftNameChange: (value: string) => void
  onSubmitInlineCreate: () => void
  onCancelInlineCreate: () => void
  onPromoteCreateModal: (parentId?: string | null, parentName?: string | null) => void
  onEditList: (list: NestedList) => void
  onDeleteList: (listId: string) => Promise<void>
  onMoveList: (listId: string, direction: "up" | "down") => Promise<void>
  draggingListId: string | null
  dropTargetListId: string | null
  onDragStart: (listId: string) => void
  onDragEnd: () => void
  onDragOverTarget: (listId: string | null) => void
  onDropOnTarget: (draggedId: string, targetId: string) => Promise<void>
}

type SidebarSettingsPanelProps = {
  activeSettingsSection: string
  settingsNav: readonly SettingsNavItem[]
}

type InlineListDraftRowProps = {
  depth: number
  value: string
  isCreating: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
  onMoreOptions: () => void
}

type ListTreeItemProps = {
  item: NestedList
  depth: number
  activeListId: string
  collapsedListIds: string[]
  openListMenuId: string | "root" | null
  renderListMenuId: string | "root" | null
  inlineCreateParentId: string | null
  inlineDraftName: string
  isCreating: boolean
  onToggleCollapsed: (listId: string) => void
  onToggleMenu: (listId: string | "root" | null) => void
  onCreateChild: (parentId?: string | null) => void
  onInlineDraftNameChange: (value: string) => void
  onSubmitInlineCreate: () => void
  onCancelInlineCreate: () => void
  onPromoteCreateModal: (parentId?: string | null, parentName?: string | null) => void
  onEditList: (list: NestedList) => void
  onDeleteList: (listId: string) => Promise<void>
  onMoveList: (listId: string, direction: "up" | "down") => Promise<void>
  draggingListId: string | null
  dropTargetListId: string | null
  onDragStart: (listId: string) => void
  onDragEnd: () => void
  onDragOverTarget: (listId: string | null) => void
  onDropOnTarget: (draggedId: string, targetId: string) => Promise<void>
}

export function SidebarTasksPanel({
  activeView,
  activeListId,
  viewCounts,
  views,
  lists,
  collapsedListIds,
  openListMenuId,
  renderListMenuId,
  inlineCreateParentId,
  listDraftName,
  isCreating,
  onOpenCreateListModal,
  onToggleCollapsed,
  onToggleMenu,
  onStartInlineCreate,
  onInlineDraftNameChange,
  onSubmitInlineCreate,
  onCancelInlineCreate,
  onPromoteCreateModal,
  onEditList,
  onDeleteList,
  onMoveList,
  draggingListId,
  dropTargetListId,
  onDragStart,
  onDragEnd,
  onDragOverTarget,
  onDropOnTarget,
}: SidebarTasksPanelProps) {
  return (
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
              onClick={() => onOpenCreateListModal()}
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
                    activeListId={activeListId}
                    collapsedListIds={collapsedListIds}
                    openListMenuId={openListMenuId}
                    renderListMenuId={renderListMenuId}
                    inlineCreateParentId={inlineCreateParentId}
                    inlineDraftName={listDraftName}
                    isCreating={isCreating}
                    onToggleCollapsed={onToggleCollapsed}
                    onToggleMenu={onToggleMenu}
                    onCreateChild={(parentId?: string | null) => onStartInlineCreate(parentId)}
                    onInlineDraftNameChange={onInlineDraftNameChange}
                    onSubmitInlineCreate={onSubmitInlineCreate}
                    onCancelInlineCreate={onCancelInlineCreate}
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
                {inlineCreateParentId === "__root__" ? (
                  <InlineListDraftRow
                    depth={0}
                    value={listDraftName}
                    isCreating={isCreating}
                    onChange={onInlineDraftNameChange}
                    onSubmit={onSubmitInlineCreate}
                    onCancel={onCancelInlineCreate}
                    onMoreOptions={() => onPromoteCreateModal(null, null)}
                  />
                ) : null}
              </>
            ) : inlineCreateParentId === "__root__" ? (
              <InlineListDraftRow
                depth={0}
                value={listDraftName}
                isCreating={isCreating}
                onChange={onInlineDraftNameChange}
                onSubmit={onSubmitInlineCreate}
                onCancel={onCancelInlineCreate}
                onMoreOptions={() => onPromoteCreateModal(null, null)}
              />
            ) : (
              <p className="px-3 text-sm text-muted-foreground">暂无清单</p>
            )}
          </div>
        </SidebarSection>
      </div>
    </div>
  )
}

export function SidebarSettingsPanel({ activeSettingsSection, settingsNav }: SidebarSettingsPanelProps) {
  return (
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
  )
}

function SidebarSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      {title ? <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{title}</p> : null}
      <div className="space-y-1">{children}</div>
    </section>
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
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function InlineListDraftRow({ depth, value, isCreating, onChange, onSubmit, onCancel, onMoreOptions }: InlineListDraftRowProps) {
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
      <button type="button" onClick={onMoreOptions} className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground" aria-label="更多选项">
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>
      <button type="button" onClick={onCancel} className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground" aria-label="取消新建清单">
        <X className="h-3.5 w-3.5" />
      </button>
      <button type="submit" disabled={isCreating || !value.trim()} className="inline-flex h-7 items-center justify-center rounded-lg bg-primary px-2.5 text-xs font-medium text-primary-foreground disabled:opacity-50">
        {isCreating ? "创建中" : "创建"}
      </button>
    </form>
  )
}

function ListTreeItem(props: ListTreeItemProps) {
  const {
    item,
    depth,
    activeListId,
    collapsedListIds,
    openListMenuId,
    renderListMenuId,
    inlineCreateParentId,
    inlineDraftName,
    isCreating,
    onToggleCollapsed,
    onToggleMenu,
    onCreateChild,
    onInlineDraftNameChange,
    onSubmitInlineCreate,
    onCancelInlineCreate,
    onPromoteCreateModal,
    onEditList,
    onDeleteList,
    onMoveList,
    draggingListId,
    dropTargetListId,
    onDragStart,
    onDragEnd,
    onDragOverTarget,
    onDropOnTarget,
  } = props

  const hasChildren = item.children.length > 0
  const isCollapsed = collapsedListIds.includes(item.id)
  const isActive = activeListId === item.id
  const isDragging = draggingListId === item.id
  const isDropTarget = dropTargetListId === item.id && draggingListId !== item.id
  const showInlineDraft = inlineCreateParentId === item.id
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
        className={cn("group flex items-center gap-1 transition-all duration-100 ease-out", isDragging ? "opacity-45" : "opacity-100")}
        style={{ marginLeft: `${depth * 8}px` }}
      >
        <div className={cn("relative flex min-w-0 flex-1 items-center rounded-lg transition-all duration-150", isActive ? "bg-muted/75" : "hover:bg-muted/30", isDropTarget ? "ring-1 ring-primary/15 bg-primary/8" : "") }>
          <Link href={`/tasks?view=all&listId=${item.id}`} className="relative flex h-9 min-w-0 flex-1 items-center justify-between rounded-lg px-3 text-sm transition-colors">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color ?? "#6b8dff" }} />
              <span className="text-[14px] opacity-80">{item.emoji ?? "📁"}</span>
              <span className="truncate text-[13px] font-medium text-foreground/92">{item.name}</span>
            </div>
            <div className="flex min-w-6 items-center justify-end gap-1.5">
              {incompleteCount > 0 ? <span className="text-[11px] tabular-nums text-muted-foreground/75">{incompleteCount}</span> : null}
            </div>
          </Link>

          {hasChildren ? (
            <button type="button" onClick={() => onToggleCollapsed(item.id)} className="mr-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-background/80 hover:text-foreground">
              <FolderPlus className={cn("h-3.5 w-3.5 transition-transform", isCollapsed ? "" : "rotate-45")} />
            </button>
          ) : null}

          <button type="button" onClick={() => onToggleMenu(openListMenuId === item.id ? null : item.id)} className="mr-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-all duration-150 ease-out hover:bg-background/80 hover:text-foreground" aria-label="清单菜单">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {renderListMenuId === item.id ? (
        <div className={cn("absolute right-1 top-[calc(100%+6px)] z-30 w-56 origin-top-right rounded-xl border border-border/70 bg-card/95 p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-md transition-all duration-130", openListMenuId === item.id ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-1 scale-[0.98] opacity-0")}>
          <ListMenuAction label="添加子清单" icon={<FolderPlus className="h-4 w-4" />} onClick={() => onCreateChild(item.id)} />
          <div className="my-1 h-px bg-border/60" />
          <ListMenuAction label="编辑清单" icon={<Settings className="h-4 w-4" />} onClick={() => onEditList(item)} />
          <ListMenuAction label="上移" icon={<Search className="h-4 w-4" />} onClick={() => void onMoveList(item.id, "up")} />
          <ListMenuAction label="下移" icon={<Search className="h-4 w-4" />} onClick={() => void onMoveList(item.id, "down")} />
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

      {hasChildren && !isCollapsed ? (
        <div className="ml-2 pl-2">
          {item.children.map((child) => (
            <ListTreeItem key={child.id} {...props} item={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
