"use client"

type TaskDraft = {
  clientId: string
  title: string | null
  description: string | null
  startAt: string | null
  dueAt: string | null
  priority: "low" | "medium" | "high" | null
  confidence: number
  tagNames: string[]
  listId: string | null
  listName: string | null
  action: "create" | "pinToTop" | "archive" | "abandon"
  subtasks: Array<{ title: string }>
  rationale?: string | null
  riskLevel?: "low" | "medium" | "high"
  suggestions?: string[]
  warnings?: string[]
  selected: boolean
}

type Props = {
  open: boolean
  drafts: TaskDraft[]
  onClose: () => void
  onChange: (drafts: TaskDraft[]) => void
  onConfirm: () => void
}

const priorityToneMap = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-primary/10 text-primary",
  low: "bg-muted text-muted-foreground",
} as const

const riskToneMap = {
  high: "border-destructive/25 bg-destructive/10 text-destructive",
  medium: "border-amber-500/25 bg-amber-500/10 text-amber-700",
  low: "border-border bg-muted text-muted-foreground",
} as const

export function AiTaskDraftReviewSheet({ open, drafts, onClose, onChange, onConfirm }: Props) {
  if (!open) return null

  const selectedCount = drafts.filter((draft) => draft.selected).length
  const totalWarnings = drafts.reduce((count, draft) => count + (draft.warnings?.length ?? 0), 0)

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-black/30 backdrop-blur-sm">
      <button type="button" aria-label="关闭草稿确认" className="flex-1 cursor-default" onClick={onClose} />
      <aside className="h-full w-full max-w-2xl overflow-y-auto border-l border-primary/10 bg-[linear-gradient(180deg,rgba(99,102,241,0.06),rgba(255,255,255,0.94))] p-5 shadow-floating dark:bg-[linear-gradient(180deg,rgba(99,102,241,0.10),rgba(17,24,39,0.94))]">
        <div className="mb-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                AI Drafts
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">确认 AI 任务草稿</h2>
              <p className="mt-1 text-sm text-muted-foreground">把想法变成结构化任务，再把任务变成可执行计划。</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">关闭</button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">草稿总数</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{drafts.length}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">已选创建</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{selectedCount}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">风险提示</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{totalWarnings}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {drafts.map((draft) => (
            <div key={draft.clientId} className={`rounded-2xl border p-4 shadow-sm transition-colors ${draft.selected ? "border-primary/25 bg-primary/5" : "border-border/70 bg-background/70"}`}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={draft.selected}
                    onChange={(event) => onChange(drafts.map((item) => (item.clientId === draft.clientId ? { ...item, selected: event.target.checked } : item)))}
                  />
                  创建此任务
                </label>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`rounded-full px-2.5 py-1 ${draft.priority ? priorityToneMap[draft.priority] : "bg-muted text-muted-foreground"}`}>优先级 {draft.priority ?? "未设置"}</span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">清单 {draft.listName ?? "未分类"}</span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">动作 {draft.action === "abandon" ? "取消" : draft.action}</span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  value={draft.title ?? ""}
                  onChange={(event) => onChange(drafts.map((item) => (item.clientId === draft.clientId ? { ...item, title: event.target.value } : item)))}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
                  placeholder="任务标题"
                />

                {draft.rationale ? (
                  <div className="rounded-xl border border-border/70 bg-background/80 p-3">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">推荐解释</p>
                    <p className="text-sm text-foreground/85">{draft.rationale}</p>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-md border px-2.5 py-1 text-xs ${riskToneMap[draft.riskLevel ?? "low"]}`}>风险 {draft.riskLevel === "high" ? "高" : draft.riskLevel === "medium" ? "中" : "低"}</span>
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">置信度 {Math.round(draft.confidence * 100)}%</span>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="space-y-1 text-sm">
                    <span className="text-xs text-muted-foreground">开始时间</span>
                    <input
                      type="datetime-local"
                      value={draft.startAt ? draft.startAt.slice(0, 16) : ""}
                      onChange={(event) => onChange(drafts.map((item) => (item.clientId === draft.clientId ? { ...item, startAt: event.target.value ? new Date(event.target.value).toISOString() : null } : item)))}
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                    />
                  </label>
                  <label className="space-y-1 text-sm">
                    <span className="text-xs text-muted-foreground">截止时间</span>
                    <input
                      type="datetime-local"
                      value={draft.dueAt ? draft.dueAt.slice(0, 16) : ""}
                      onChange={(event) => onChange(drafts.map((item) => (item.clientId === draft.clientId ? { ...item, dueAt: event.target.value ? new Date(event.target.value).toISOString() : null } : item)))}
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                    />
                  </label>
                </div>

                {draft.suggestions?.length ? (
                  <div className="rounded-xl border border-primary/15 bg-primary/5 p-3">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-primary">建议</p>
                    <div className="flex flex-wrap gap-2">
                      {draft.suggestions.map((suggestion, index) => (
                        <span key={`${suggestion}-${index}`} className="rounded-md bg-white/70 px-2 py-1 text-xs text-foreground/80">{suggestion}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {draft.tagNames.length ? (
                  <div className="flex flex-wrap gap-2">
                    {draft.tagNames.map((tag) => (
                      <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">#{tag}</span>
                    ))}
                  </div>
                ) : null}

                {draft.subtasks.length ? (
                  <div className="rounded-xl border border-border/70 bg-background/80 p-3">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">子任务</p>
                    <div className="flex flex-wrap gap-2">
                      {draft.subtasks.map((subtask, index) => (
                        <span key={`${subtask.title}-${index}`} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{subtask.title}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {draft.warnings?.length ? (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-amber-700">提示</p>
                    <div className="flex flex-wrap gap-2">
                      {draft.warnings.map((warning, index) => (
                        <span key={`${warning}-${index}`} className="rounded-md border border-amber-500/20 bg-white/60 px-2 py-1 text-xs text-amber-800">{warning}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 mt-5 border-t border-border bg-card/95 px-1 pt-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm">
            <div>
              <p className="text-sm font-medium">准备创建 {selectedCount} 条任务</p>
              <p className="text-xs text-muted-foreground">建议先阅读解释与提示，再批量写入任务系统。</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted">取消</button>
              <button type="button" onClick={onConfirm} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">创建选中任务</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
