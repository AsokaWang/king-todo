"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import type { FlowStepStatus, FlowView } from "@/features/tasks/contracts"

export function FlowWorkspace({ flowId }: { flowId: string }) {
  const [flow, setFlow] = useState<FlowView | null>(null)
  const [newStepTitle, setNewStepTitle] = useState("")
  const [draggingStepId, setDraggingStepId] = useState<string | null>(null)
  const [editingStepId, setEditingStepId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")
  const [editingDescription, setEditingDescription] = useState("")
  const [editingEstimatedMinutes, setEditingEstimatedMinutes] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadFlow = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/flows/${flowId}`, { credentials: "include", cache: "no-store" })
      const payload = await response.json()
      if (!response.ok || !payload.ok) throw new Error(payload?.error?.message ?? "Failed to load flow.")
      setFlow(payload.data as FlowView)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to load flow.")
    } finally {
      setIsLoading(false)
    }
  }, [flowId])

  useEffect(() => {
    void loadFlow()
  }, [loadFlow])

  async function createStep() {
    if (!newStepTitle.trim()) return
    const response = await fetch(`/api/flows/${flowId}/steps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: newStepTitle.trim() }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      setError(payload?.error?.message ?? "Failed to create step.")
      return
    }
    setFlow(payload.data as FlowView)
    setNewStepTitle("")
  }

  async function toggleStep(stepId: string, status: FlowStepStatus) {
    const nextStatus = status === "done" ? "todo" : "done"
    const response = await fetch(`/api/flows/${flowId}/steps/${stepId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: nextStatus }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      setError(payload?.error?.message ?? "Failed to update step.")
      return
    }
    setFlow(payload.data as FlowView)
  }

  async function reorderSteps(targetStepId: string) {
    if (!flow || !draggingStepId || draggingStepId === targetStepId) return
    const steps = [...flow.steps]
    const dragIndex = steps.findIndex((item) => item.id === draggingStepId)
    const dropIndex = steps.findIndex((item) => item.id === targetStepId)
    if (dragIndex === -1 || dropIndex === -1) return
    const [moved] = steps.splice(dragIndex, 1)
    steps.splice(dropIndex, 0, moved)
    const response = await fetch(`/api/flows/${flowId}/steps/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ orderedStepIds: steps.map((step) => step.id) }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      setError(payload?.error?.message ?? "Failed to reorder steps.")
      return
    }
    setFlow(payload.data as FlowView)
    setDraggingStepId(null)
  }

  async function saveStep(stepId: string) {
    const response = await fetch(`/api/flows/${flowId}/steps/${stepId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: editingTitle.trim(),
        description: editingDescription.trim() ? editingDescription.trim() : null,
        estimatedMinutes: editingEstimatedMinutes.trim() ? Number(editingEstimatedMinutes) : null,
      }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      setError(payload?.error?.message ?? "Failed to save step.")
      return
    }
    setFlow(payload.data as FlowView)
    setEditingStepId(null)
  }

  async function updateFlowStatus(status: FlowView["status"]) {
    const response = await fetch(`/api/flows/${flowId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    })
    const payload = await response.json()
    if (!response.ok || !payload.ok) {
      setError(payload?.error?.message ?? "Failed to update flow.")
      return
    }
    setFlow(payload.data as FlowView)
  }

  if (isLoading) {
    return <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">加载 Flow 中...</div>
  }

  if (!flow) {
    return <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">{error ?? "Flow 不存在"}</div>
  }

  return (
    <div className="grid h-[calc(100vh-8rem)] gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Flow</p>
            <h1 className="text-2xl font-semibold tracking-tight">{flow.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">状态：{flow.status} · 步骤 {flow.steps.length}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["draft", "active", "done", "cancelled"] as const).map((item) => (
                <button key={item} type="button" onClick={() => void updateFlowStatus(item)} className={`rounded-full px-2.5 py-1 text-xs ${flow.status === item ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{item}</button>
              ))}
            </div>
          </div>
          {flow.sourceTaskId ? <Link href={`/tasks/${flow.sourceTaskId}`} className="text-sm font-medium text-primary hover:underline">返回原任务</Link> : null}
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-border px-3 py-3">
          <div className="flex gap-2">
            <input value={newStepTitle} onChange={(event) => setNewStepTitle(event.target.value)} className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm" placeholder="新增步骤标题" />
            <button type="button" onClick={() => void createStep()} className="rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">新增步骤</button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {flow.steps.map((step) => (
            <div key={step.id} draggable onDragStart={() => setDraggingStepId(step.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => void reorderSteps(step.id)} className={`rounded-xl border border-border/70 bg-background px-4 py-3 ${draggingStepId === step.id ? "opacity-60" : ""}`}>
              {editingStepId === step.id ? (
                <div className="space-y-3">
                  <input value={editingTitle} onChange={(event) => setEditingTitle(event.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
                  <textarea value={editingDescription} onChange={(event) => setEditingDescription(event.target.value)} className="min-h-[96px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="步骤描述" />
                  <input type="number" min="0" value={editingEstimatedMinutes} onChange={(event) => setEditingEstimatedMinutes(event.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" placeholder="预计分钟" />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setEditingStepId(null)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">取消</button>
                    <button type="button" onClick={() => void saveStep(step.id)} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">保存步骤</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <button type="button" onClick={() => void toggleStep(step.id, step.status)} className="flex items-center gap-3 text-left">
                    <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${step.status === "done" ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>{step.status === "done" ? "✓" : ""}</span>
                    <div>
                      <p className="font-medium text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground">状态：{step.status} · 排序 {step.sortOrder + 1}</p>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">预计 {step.estimatedMinutes ?? 0} 分钟</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingStepId(step.id)
                        setEditingTitle(step.title)
                        setEditingDescription(step.description ?? "")
                        setEditingEstimatedMinutes(step.estimatedMinutes?.toString() ?? "")
                      }}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted"
                    >
                      编辑
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {flow.steps.length === 0 ? <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">当前 Flow 还没有步骤。</div> : null}
        </div>
      </section>

      <aside className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Flow Summary</p>
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p>标题：{flow.title}</p>
          <p>状态：{flow.status}</p>
          <p>步骤数：{flow.steps.length}</p>
          <p>依赖数：{flow.dependencies.length}</p>
          <p>已完成：{flow.steps.filter((step) => step.status === "done").length}</p>
        </div>
      </aside>
    </div>
  )
}
