import { prisma } from "@/server/db/client"

export async function ensureUserSpace(user: {
  id: string
  email: string
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

  const existing = await prisma.personalSpace.findUnique({
    where: { userId: user.id },
  })

  if (existing) {
    return existing
  }

  return prisma.personalSpace.create({
    data: {
      userId: user.id,
      name: user.name?.trim() || user.email.split("@")[0] || "My Space",
    },
  })
}
