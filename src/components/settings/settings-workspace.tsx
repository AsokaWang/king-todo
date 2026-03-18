"use client"

import { AiModelSettings } from "@/components/settings/ai-model-settings"
import { ThemePresetSettings } from "@/components/theme/theme-preset-settings"

export type SettingsSection = "account" | "appearance" | "ai-model" | "preferences" | "security"

export function SettingsWorkspace({ activeSection }: { activeSection: SettingsSection }) {
  return (
    <div className="h-full min-h-0 min-w-0">
      {activeSection === "appearance" ? <ThemePresetSettings /> : activeSection === "ai-model" ? <AiModelSettings /> : <SettingsPlaceholder section={activeSection} />}
    </div>
  )
}

function SettingsPlaceholder({ section }: { section: Exclude<SettingsSection, "appearance" | "ai-model"> }) {
  const copy = {
    account: { title: "账户", description: "账户资料将在这里管理。" },
    preferences: { title: "偏好", description: "通知与默认行为将在这里管理。" },
    security: { title: "安全", description: "密码与安全设置将在这里管理。" },
  }[section]

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Settings</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{copy.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{copy.description}</p>
    </section>
  )
}
