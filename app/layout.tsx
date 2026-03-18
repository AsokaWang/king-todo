import type { Metadata } from "next"
import "./globals.css"
import { ThemePresetProvider } from "@/components/theme/theme-preset-provider"

export const metadata: Metadata = {
  title: "King Todo",
  description: "AI-driven task, calendar, and time tracking workspace.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <ThemePresetProvider>{children}</ThemePresetProvider>
      </body>
    </html>
  )
}
