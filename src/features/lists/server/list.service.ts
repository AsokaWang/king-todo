import { prisma } from "@/server/db/client"
import { ensureUserSpace } from "@/server/db/bootstrap"
import type { CreateListBody } from "@/features/lists/server/list.schema"

type CurrentUser = {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

type RawList = {
  id: string
  name: string
  color: string | null
  parentId: string | null
  sortOrder: number
  taskCount: number
}

type NestedList = RawList & {
  children: NestedList[]
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
        },
      },
    },
  })

  return buildTree(
    items.map((item) => ({
      id: item.id,
      name: item.name,
      color: item.color,
      parentId: item.parentId,
      sortOrder: item.sortOrder,
      taskCount: item.tasks.length,
    })),
  )
}

export async function createListForUser(user: CurrentUser, input: CreateListBody) {
  const space = await ensureUserSpace(user)

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
      name: input.name,
      color: input.color ?? null,
      sortOrder: siblings,
    },
  })
}
