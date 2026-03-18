import { createListBodySchema } from "@/features/lists/server/list.schema"
import { createListForUser, listListsForUser } from "@/features/lists/server/list.service"
import { fail, ok } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"

export async function GET() {
  try {
    const session = await requireSession()
    const data = await listListsForUser(session.user)
    return ok({ items: data })
  } catch (error) {
    return fail(error)
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireSession()
    const body = await request.json()
    const input = createListBodySchema.parse(body)
    const data = await createListForUser(session.user, input)
    return ok(data, 201)
  } catch (error) {
    return fail(error)
  }
}
