import { prisma } from "@/server/db/client"

export async function syncUserProfileFromSession(user: {
  id: string
  name?: string | null
  image?: string | null
}) {
  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: user.name ?? undefined,
      image: user.image ?? undefined,
    },
  })
}

export async function ensureUserSpace(user: {
  id: string
  email: string
  name?: string | null
  image?: string | null
}) {
  return prisma.personalSpace.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      name: user.name?.trim() || user.email.split("@")[0] || "My Space",
    },
  })
}
