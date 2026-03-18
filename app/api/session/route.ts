import { getSession } from "@/server/auth/get-session"
import { fail, ok } from "@/server/api/response"

export async function GET() {
  try {
    const session = await getSession()
    return ok({ session: session ?? null })
  } catch (error) {
    return fail(error)
  }
}
