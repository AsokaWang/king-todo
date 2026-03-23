"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import { Check, ChevronRight, Search, X } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export type DropdownSelectItem = {
  value: string
  label: string
  icon?: ReactNode
  description?: string
  disabled?: boolean
  group?: string
  destructive?: boolean
}

type DropdownSelectProps = {
  items: DropdownSelectItem[]
  value?: string | null
  values?: string[]
  placeholder: string
  onChange?: (value: string) => void
  onValuesChange?: (values: string[]) => void
  className?: string
  menuClassName?: string
  triggerClassName?: string
  searchable?: boolean
  grouped?: boolean
  multiple?: boolean
  closeOnSelect?: boolean
  variant?: "default" | "action"
  createLabel?: string
  onCreateOption?: (label: string) => void | Promise<void>
  renderTrigger?: (args: { open: boolean; selectedItems: DropdownSelectItem[]; toggle: () => void }) => ReactNode
}

export function DropdownSelect({
  items,
  value,
  values,
  placeholder,
  onChange,
  onValuesChange,
  className,
  menuClassName,
  triggerClassName,
  searchable = false,
  grouped = false,
  multiple = false,
  closeOnSelect,
  variant = "default",
  createLabel,
  onCreateOption,
  renderTrigger,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const shouldCloseOnSelect = closeOnSelect ?? !multiple

  const selectedValues = useMemo(() => (multiple ? values ?? [] : value ? [value] : []), [multiple, value, values])
  const selectedItems = useMemo(() => items.filter((item) => selectedValues.includes(item.value)), [items, selectedValues])

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) => {
      return [item.label, item.description, item.group]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(normalized))
    })
  }, [items, query])

  const groupedItems = useMemo(() => {
    if (!grouped) {
      return [{ key: "__default__", label: null, items: filteredItems }]
    }

    const map = new Map<string, DropdownSelectItem[]>()
    for (const item of filteredItems) {
      const key = item.group ?? "其他"
      map.set(key, [...(map.get(key) ?? []), item])
    }

    return Array.from(map.entries()).map(([key, groupItems]) => ({ key, label: key, items: groupItems }))
  }, [filteredItems, grouped])

  const normalizedQuery = query.trim().toLowerCase()
  const showCreateOption = Boolean(onCreateOption && normalizedQuery && !items.some((item) => item.label.toLowerCase() === normalizedQuery))

  const navigableItems = useMemo(
    () => [
      ...groupedItems.flatMap((group) => group.items.map((item) => ({ ...item, __kind: "option" as const }))),
      ...(showCreateOption ? [{ value: `__create__:${normalizedQuery}`, label: `${createLabel ?? "创建"} “${query.trim()}”`, __kind: "create" as const }] : []),
    ],
    [groupedItems, showCreateOption, normalizedQuery, createLabel, query],
  )

  useEffect(() => {
    if (!open) {
      setHighlightedIndex(-1)
      return
    }

    const firstEnabledIndex = navigableItems.findIndex((item) => item.__kind === "create" || !item.disabled)
    if (firstEnabledIndex >= 0) {
      setHighlightedIndex(firstEnabledIndex)
    }
  }, [navigableItems, open])

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      } else if (event.key === "ArrowDown") {
        event.preventDefault()
        setOpen(true)
        setHighlightedIndex((current) => {
          const next = current < navigableItems.length - 1 ? current + 1 : 0
          window.setTimeout(() => itemRefs.current[next]?.scrollIntoView({ block: "nearest" }), 0)
          return next
        })
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        setOpen(true)
        setHighlightedIndex((current) => {
          const next = current > 0 ? current - 1 : navigableItems.length - 1
          window.setTimeout(() => itemRefs.current[next]?.scrollIntoView({ block: "nearest" }), 0)
          return next
        })
      } else if (event.key === "Enter" && open && highlightedIndex >= 0) {
        event.preventDefault()
        const highlighted = navigableItems[highlightedIndex]
        if (highlighted?.__kind === "create") {
          void onCreateOption?.(query.trim())
          setQuery("")
          if (shouldCloseOnSelect) setOpen(false)
        } else if (highlighted && !highlighted.disabled) {
          toggleValue(highlighted.value)
        }
      }
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [highlightedIndex, navigableItems, onCreateOption, open, query, shouldCloseOnSelect])

  function toggleValue(nextValue: string) {
    if (multiple) {
      const current = values ?? []
      const next = current.includes(nextValue) ? current.filter((item) => item !== nextValue) : [...current, nextValue]
      onValuesChange?.(next)
    } else {
      onChange?.(nextValue)
    }

    if (shouldCloseOnSelect) {
      setOpen(false)
    }
  }

  const triggerContent = renderTrigger ? (
    renderTrigger({ open, selectedItems, toggle: () => setOpen((current) => !current) })
  ) : variant === "action" ? (
    <button
      type="button"
      onClick={() => setOpen((current) => !current)}
      data-state={open ? "open" : "closed"}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-muted-foreground transition-all hover:bg-muted hover:text-foreground data-[state=open]:bg-muted",
        triggerClassName,
      )}
    >
      <ChevronRight className={cn("h-4 w-4 transition-transform duration-200", open ? "-rotate-90" : "rotate-90")} />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setOpen((current) => !current)}
      data-state={open ? "open" : "closed"}
      className={cn(
        multiple
          ? "flex min-h-11 w-full flex-wrap items-center justify-between gap-2 rounded-2xl border border-input bg-background px-3 py-2 text-sm transition-colors hover:bg-muted/30 data-[state=open]:border-border/80"
          : "flex h-11 w-full items-center justify-between rounded-2xl border border-input bg-background px-3 text-sm transition-colors hover:bg-muted/30 data-[state=open]:border-border/80",
        triggerClassName,
      )}
    >
      <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
        {multiple ? (
          selectedItems.length ? (
            <>
              {selectedItems.slice(0, 2).map((item) => (
                <span key={item.value} className="inline-flex h-6 items-center gap-1 rounded-md bg-muted px-2 text-xs text-foreground/80">
                  {item.icon ? <span>{item.icon}</span> : null}
                  <span className="max-w-24 truncate">{item.label}</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleValue(item.value)
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedItems.length > 2 ? <span className="inline-flex h-6 items-center rounded-md bg-primary/10 px-2 text-xs text-primary">+{selectedItems.length - 2}</span> : null}
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )
        ) : (
          <>
            {selectedItems[0]?.icon ? <span className="text-base leading-none">{selectedItems[0].icon}</span> : null}
            <span className={cn("truncate", selectedItems[0] ? "text-foreground" : "text-muted-foreground")}>{selectedItems[0]?.label ?? placeholder}</span>
          </>
        )}
      </span>
      <ChevronRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", open ? "-rotate-90" : "rotate-90")} />
    </button>
  )

  return (
    <div className={cn("relative", className)} ref={rootRef}>
      {triggerContent}

      {open ? (
        <div
          className={cn(
            variant === "action"
              ? "absolute right-0 top-[calc(100%+6px)] z-20 min-w-40 rounded-xl border border-border/70 bg-card/95 p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-md"
              : "absolute left-0 top-[calc(100%+6px)] z-20 w-full rounded-2xl border border-border/70 bg-card/95 p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-md",
            menuClassName,
          )}
        >
          {searchable ? (
            <div className="sticky top-0 z-10 mb-1 border-b border-border/60 bg-card/95 px-1 pb-2 pt-1 backdrop-blur-md">
              <div className="flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-2.5 text-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="搜索"
                  className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
          ) : null}

          <div className={cn("max-h-64 overflow-y-auto pr-1", variant === "action" ? "min-w-32" : "")}> 
            {groupedItems.every((group) => group.items.length === 0) ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">暂无结果</div>
            ) : (
              groupedItems.map((group) => {
                if (group.items.length === 0) return null
                return (
                  <div key={group.key} className="first:mt-0 mt-1">
                    {group.label && grouped ? (
                      <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{group.label}</div>
                    ) : null}

                    {group.items.map((item) => {
                      const active = selectedValues.includes(item.value)
                      const itemIndex = navigableItems.findIndex((candidate) => candidate.value === item.value)
                      return (
                        <button
                          ref={(node) => {
                            itemRefs.current[itemIndex] = node
                          }}
                          key={item.value}
                          type="button"
                          disabled={item.disabled}
                          onMouseEnter={() => setHighlightedIndex(itemIndex)}
                          onClick={() => {
                            if (item.disabled) return
                            toggleValue(item.value)
                          }}
                          className={cn(
                              variant === "action"
                                ? "flex h-8 w-full items-center gap-2 rounded-lg px-2.5 text-sm text-foreground/85 transition-colors hover:bg-muted/55 hover:text-foreground"
                                : "flex min-h-10 w-full items-center justify-between rounded-lg px-3 text-sm transition-colors hover:bg-muted/55",
                            highlightedIndex === itemIndex ? "bg-muted/65 text-foreground" : "",
                            active && variant !== "action" ? "bg-primary/10 text-foreground" : "",
                            item.destructive ? "text-destructive hover:bg-destructive/10 hover:text-destructive" : "",
                            item.disabled ? "cursor-not-allowed opacity-50" : "",
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2 text-left">
                            {item.icon ? <span>{item.icon}</span> : null}
                            <span className="truncate">{item.label}</span>
                          </span>
                          {active && variant !== "action" ? <Check className="h-4 w-4 shrink-0" /> : null}
                        </button>
                      )
                    })}
                  </div>
                )
              })
            )}

            {showCreateOption ? (
              <button
                ref={(node) => {
                  itemRefs.current[navigableItems.length - 1] = node
                }}
                type="button"
                onMouseEnter={() => setHighlightedIndex(navigableItems.length - 1)}
                onClick={async () => {
                  await onCreateOption?.(query.trim())
                  setQuery("")
                  if (shouldCloseOnSelect) setOpen(false)
                }}
                className={cn(
                  "mt-1 flex min-h-10 w-full items-center rounded-lg border border-dashed border-border px-3 text-sm text-foreground/85 transition-colors hover:bg-muted/55",
                  highlightedIndex === navigableItems.length - 1 ? "bg-muted/65" : "",
                )}
              >
                {createLabel ?? "创建"} “{query.trim()}”
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
