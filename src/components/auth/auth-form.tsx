"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

type AuthFormMode = "sign-in" | "sign-up"

type AuthFormProps = {
  mode: AuthFormMode
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSignUp = mode === "sign-up"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      if (isSignUp) {
        await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: "/today",
        })
      } else {
        await authClient.signIn.email({
          email,
          password,
          callbackURL: "/today",
        })
      }

      router.push("/today")
      router.refresh()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Authentication failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-card">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">King Todo</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignUp ? "创建账号" : "登录"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignUp ? "先创建一个个人空间，再进入任务工作台。" : "登录后继续访问今日页与任务接口。"}
        </p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {isSignUp ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium">姓名</span>
            <input
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="你的名字"
              required
            />
          </label>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-medium">邮箱</span>
          <input
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium">密码</span>
          <input
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="至少 8 位"
            minLength={8}
            required
          />
        </label>

        {error ? (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "提交中..." : isSignUp ? "创建账号" : "登录"}
        </button>
      </form>

      <p className="mt-4 text-sm text-muted-foreground">
        {isSignUp ? "已有账号？" : "还没有账号？"}{" "}
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="font-medium text-primary hover:underline"
        >
          {isSignUp ? "去登录" : "去注册"}
        </Link>
      </p>
    </div>
  )
}
