import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import type { CreateListBody, UpdateListBody } from "@/features/lists/server/list.schema"
import { HttpError } from "@/server/errors/http"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

type RawList = {
  id: string
  emoji: string | null
  name: string
  color: string | null
  parentId: string | null
  sortOrder: number
  taskCount: number
  completedTaskCount: number
}

type NestedList = RawList & {
  children: NestedList[]
}

async function assertValidParent(spaceId: string, parentId: string | null | undefined) {
  if (!parentId) return

  const parent = await prisma.list.findFirst({
    where: {
      id: parentId,
      spaceId,
      archivedAt: null,
    },
    select: { id: true },
  })

  if (!parent) {
    throw new HttpError(400, "INVALID_PARENT", "所选上级清单无效，请重新选择。")
  }
}

async function assertNoParentCycle(spaceId: string, listId: string, parentId: string | null | undefined) {
  if (!parentId) return

  let currentParentId: string | null = parentId

  while (currentParentId) {
    if (currentParentId === listId) {
      throw new HttpError(400, "INVALID_PARENT", "不能将清单移动到自己的子清单下。")
    }

    const currentNode: { parentId: string | null } | null = await prisma.list.findFirst({
      where: {
        id: currentParentId,
        spaceId,
        archivedAt: null,
      },
      select: { parentId: true },
    })

    if (!currentNode) {
      throw new HttpError(400, "INVALID_PARENT", "所选上级清单无效，请重新选择。")
    }

    currentParentId = currentNode.parentId
  }
}

function buildTree(items: RawList[]) {
  const map = new Map<string, NestedList>()

  for (const item of items) {
    map.set(item.id, { ...item, children: [] })
  }

  const roots: NestedList[] = []

  for (const item of map.values()) {
    if (item.parentId && map.has(item.parentId)) {
      map.get(item.parentId)?.children.push(item)
    } else {
      roots.push(item)
    }
  }

  const sortNodes = (nodes: NestedList[]) => {
    nodes.sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name))
    for (const node of nodes) {
      sortNodes(node.children)
    }
  }

  sortNodes(roots)
  return roots
}

export async function listListsForUser(user: CurrentUser) {
  const space = await ensureUserSpace(user)

  const items = await prisma.list.findMany({
    where: {
      spaceId: space.id,
      archivedAt: null,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      tasks: {
        where: {
          archivedAt: null,
        },
        select: {
          id: true,
          status: true,
        },
      },
    },
  })

  return buildTree(
    items.map((item) => ({
      id: item.id,
      emoji: item.emoji,
      name: item.name,
      color: item.color,
      parentId: item.parentId,
      sortOrder: item.sortOrder,
      taskCount: item.tasks.length,
      completedTaskCount: item.tasks.filter((task) => task.status === "done").length,
    })),
  )
}

export async function createListForUser(user: CurrentUser, input: CreateListBody) {
  const space = await ensureUserSpace(user)

  await assertValidParent(space.id, input.parentId)

  const siblings = await prisma.list.count({
    where: {
      spaceId: space.id,
      parentId: input.parentId ?? null,
      archivedAt: null,
    },
  })

  return prisma.list.create({
    data: {
      spaceId: space.id,
      parentId: input.parentId ?? null,
      emoji: input.emoji ?? "📁",
      name: input.name,
      color: input.color ?? null,
      sortOrder: siblings,
    },
  })
}

export async function updateListForUser(user: CurrentUser, listId: string, input: UpdateListBody) {
  const space = await ensureUserSpace(user)

  const existing = await prisma.list.findFirst({
    where: {
      id: listId,
      spaceId: space.id,
      archivedAt: null,
    },
  })

  if (!existing) {
    throw new HttpError(404, "NOT_FOUND", "List not found.")
  }

  if (input.parentId === listId) {
    throw new HttpError(400, "VALIDATION_ERROR", "List cannot be its own parent.")
  }

  await assertValidParent(space.id, input.parentId)
  await assertNoParentCycle(space.id, listId, input.parentId)

  return prisma.list.update({
    where: { id: listId },
    data: {
      emoji: input.emoji === null ? "📁" : input.emoji,
      name: input.name,
      parentId: input.parentId === undefined ? undefined : input.parentId,
      color: input.color === undefined ? undefined : input.color,
      sortOrder: input.sortOrder,
    },
  })
}

export async function deleteListForUser(user: CurrentUser, listId: string) {
  const space = await ensureUserSpace(user)

  const existing = await prisma.list.findFirst({
    where: {
      id: listId,
      spaceId: space.id,
      archivedAt: null,
    },
    include: {
      children: true,
    },
  })

  if (!existing) {
    throw new HttpError(404, "NOT_FOUND", "List not found.")
  }

  await prisma.$transaction([
    prisma.task.updateMany({
      where: { listId },
      data: { listId: null },
    }),
    prisma.list.updateMany({
      where: { parentId: listId },
      data: { parentId: existing.parentId },
    }),
    prisma.list.delete({ where: { id: listId } }),
  ])

  return { id: listId }
}
