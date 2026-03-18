import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth/auth-form"
import { getSession } from "@/server/auth/get-session"

export default async function SignInPage() {
  const session = await getSession()

  if (session?.user) {
    redirect("/today")
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <AuthForm mode="sign-in" />
    </main>
  )
}
