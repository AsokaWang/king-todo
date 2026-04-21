import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import { HttpError } from "@/server/errors/http"
import type { FlowView } from "@/features/tasks/contracts"
import type { CreateFlowBody, CreateFlowStepBody, ReorderFlowStepsBody, UpdateFlowBody, UpdateFlowStepBody } from "@/features/flows/server/flow.schema"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

function toFlowView(flow: {
  id: string
  sourceTaskId: string | null
  title: string
  description: string | null
  status: "draft" | "active" | "done" | "cancelled"
  sortOrder: number
  steps: Array<{ id: string; title: string; description: string | null; status: "todo" | "in_progress" | "done" | "cancelled"; sortOrder: number; estimatedMinutes: number | null; actualMinutes: number }>
  dependencies: Array<{ id: string; fromStepId: string; toStepId: string; type: "finish_to_start" }>
  createdAt: Date
  updatedAt: Date
}): FlowView {
  return {
    id: flow.id,
    sourceTaskId: flow.sourceTaskId,
    title: flow.title,
    description: flow.description,
    status: flow.status,
    sortOrder: flow.sortOrder,
    steps: flow.steps.map((step) => ({
      id: step.id,
      title: step.title,
      description: step.description,
      status: step.status,
      sortOrder: step.sortOrder,
      estimatedMinutes: step.estimatedMinutes,
      actualMinutes: step.actualMinutes,
    })),
    dependencies: flow.dependencies.map((dependency) => ({
      id: dependency.id,
      fromStepId: dependency.fromStepId,
      toStepId: dependency.toStepId,
      type: dependency.type,
    })),
    createdAt: flow.createdAt.toISOString(),
    updatedAt: flow.updatedAt.toISOString(),
  }
}

export async function createFlowForUser(user: CurrentUser, input: CreateFlowBody) {
  const space = await ensureUserSpace(user)
  const flow = await prisma.flow.create({
    data: {
      spaceId: space.id,
      title: input.title,
      description: input.description ?? null,
      sourceTaskId: input.sourceTaskId ?? null,
    },
    include: {
      steps: { orderBy: { sortOrder: "asc" } },
      dependencies: true,
    },
  })
  return toFlowView(flow)
}

export async function createFlowFromTaskForUser(user: CurrentUser, taskId: string) {
  const space = await ensureUserSpace(user)
  const task = await prisma.task.findFirst({
    where: { id: taskId, spaceId: space.id, archivedAt: null },
    include: {
      subtasks: {
        where: { archivedAt: null },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  })

  if (!task) {
    throw new HttpError(404, "NOT_FOUND", "Task not found.")
  }

  const existing = await prisma.flow.findFirst({
    where: { sourceTaskId: task.id, spaceId: space.id },
    include: { steps: { orderBy: { sortOrder: "asc" } }, dependencies: true },
  })

  if (existing) {
    return toFlowView(existing)
  }

  const flow = await prisma.flow.create({
    data: {
      spaceId: space.id,
      sourceTaskId: task.id,
      title: task.title,
      description: task.description,
      steps: task.subtasks.length
        ? {
            create: task.subtasks.map((subtask, index) => ({
              title: subtask.title,
              description: subtask.description,
              status: subtask.status === "archived" || subtask.status === "cancelled" ? "cancelled" : subtask.status === "done" ? "done" : subtask.status === "in_progress" ? "in_progress" : "todo",
              sortOrder: index,
              estimatedMinutes: subtask.estimatedMinutes,
              actualMinutes: subtask.actualMinutes,
            })),
          }
        : undefined,
    },
    include: {
      steps: { orderBy: { sortOrder: "asc" } },
      dependencies: true,
    },
  })

  return toFlowView(flow)
}

export async function getFlowByIdForUser(user: CurrentUser, flowId: string) {
  const space = await ensureUserSpace(user)
  const flow = await prisma.flow.findFirst({
    where: { id: flowId, spaceId: space.id },
    include: {
      steps: { orderBy: { sortOrder: "asc" } },
      dependencies: true,
    },
  })

  if (!flow) {
    throw new HttpError(404, "NOT_FOUND", "Flow not found.")
  }

  return toFlowView(flow)
}

export async function updateFlowForUser(user: CurrentUser, flowId: string, input: UpdateFlowBody) {
  const space = await ensureUserSpace(user)
  const flow = await prisma.flow.findFirst({ where: { id: flowId, spaceId: space.id }, select: { id: true } })
  if (!flow) throw new HttpError(404, "NOT_FOUND", "Flow not found.")

  await prisma.flow.update({
    where: { id: flowId },
    data: {
      title: input.title,
      description: input.description === null ? null : input.description,
      status: input.status,
    },
  })

  return getFlowByIdForUser(user, flowId)
}

export async function createFlowStepForUser(user: CurrentUser, flowId: string, input: CreateFlowStepBody) {
  const space = await ensureUserSpace(user)
  const flow = await prisma.flow.findFirst({ where: { id: flowId, spaceId: space.id }, select: { id: true } })
  if (!flow) throw new HttpError(404, "NOT_FOUND", "Flow not found.")

  await prisma.flowStep.create({
    data: {
      flowId,
      title: input.title,
      description: input.description ?? null,
      estimatedMinutes: input.estimatedMinutes ?? null,
      sortOrder: await prisma.flowStep.count({ where: { flowId } }),
    },
  })

  return getFlowByIdForUser(user, flowId)
}

export async function updateFlowStepForUser(user: CurrentUser, flowId: string, stepId: string, input: UpdateFlowStepBody) {
  const space = await ensureUserSpace(user)
  const step = await prisma.flowStep.findFirst({
    where: { id: stepId, flowId, flow: { spaceId: space.id } },
    select: { id: true },
  })
  if (!step) throw new HttpError(404, "NOT_FOUND", "Flow step not found.")

  await prisma.flowStep.update({
    where: { id: stepId },
    data: {
      title: input.title,
      description: input.description === null ? null : input.description,
      status: input.status,
      estimatedMinutes: input.estimatedMinutes === null ? null : input.estimatedMinutes,
      sortOrder: input.sortOrder,
    },
  })

  return getFlowByIdForUser(user, flowId)
}

export async function reorderFlowStepsForUser(user: CurrentUser, flowId: string, input: ReorderFlowStepsBody) {
  const space = await ensureUserSpace(user)
  const steps = await prisma.flowStep.findMany({
    where: { flowId, flow: { spaceId: space.id }, id: { in: input.orderedStepIds } },
    select: { id: true },
  })
  if (steps.length !== input.orderedStepIds.length) {
    throw new HttpError(400, "INVALID_ORDER", "Ordered step ids are invalid.")
  }

  await prisma.$transaction(
    input.orderedStepIds.map((stepId, index) =>
      prisma.flowStep.update({ where: { id: stepId }, data: { sortOrder: index } }),
    ),
  )

  return getFlowByIdForUser(user, flowId)
}
