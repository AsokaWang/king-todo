import { prisma } from "@/server/db/client"
import { ok, fail } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"
import { ensureUserSpace } from "@/server/db/bootstrap"

export async function GET() {
  try {
    const session = await requireSession()
    const space = await ensureUserSpace(session.user)

    const tags = await prisma.tag.findMany({
      where: { spaceId: space.id },
      orderBy: [{ updatedAt: "desc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        color: true,
      },
    })

    return ok(tags)
  } catch (error) {
    return fail(error)
  }
}
