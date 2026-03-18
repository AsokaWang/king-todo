import { HttpError } from "@/server/errors/http"
import { getSession } from "@/server/auth/get-session"

export async function requireSession() {
  const session = await getSession()

  if (!session?.user) {
    throw new HttpError(401, "UNAUTHORIZED", "Authentication required.")
  }

  return session
}
