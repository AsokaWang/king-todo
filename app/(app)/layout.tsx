import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app/app-sidebar"
import { CurrentTimerBar } from "@/components/timer/current-timer-bar"
import { getSession } from "@/server/auth/get-session"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayoutInner>{children}</AppLayoutInner>
}

async function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session?.user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <CurrentTimerBar />
      <div className="flex min-h-0 flex-1">
        <AppSidebar email={session.user.email} avatarUrl={session.user.image ?? null} />
        <main className="min-h-0 min-w-0 flex-1 overflow-hidden p-4 md:p-5 xl:p-6">{children}</main>
      </div>
    </div>
  )
}
