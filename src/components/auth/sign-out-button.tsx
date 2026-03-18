"use client"

import { cn } from "@/lib/utils/cn"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

type SignOutButtonProps = {
  className?: string
}

export function SignOutButton({ className }: SignOutButtonProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSignOut() {
    setIsSubmitting(true)

    try {
      await authClient.signOut()
      router.push("/sign-in")
      router.refresh()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSubmitting}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {isSubmitting ? "退出中..." : "退出登录"}
    </button>
  )
}
