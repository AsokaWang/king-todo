"use client"

import { useMemo, useState } from "react"
import { Check, MoonStar, SunMedium } from "lucide-react"
import {
  applyThemePreset,
  defaultDarkThemePresetId,
  defaultLightThemePresetId,
  defaultThemeMode,
  getThemePreset,
  getThemePresets,
  getThemePresetStorageKey,
  THEME_MODE_STORAGE_KEY,
  type ThemeMode,
  type ThemePresetId,
} from "@/lib/theme-preset"

export function ThemePresetSettings() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultThemeMode
    return (window.localStorage.getItem(THEME_MODE_STORAGE_KEY) as ThemeMode | null) ?? defaultThemeMode
  })

  const [selectedByMode, setSelectedByMode] = useState<Record<ThemeMode, ThemePresetId>>(() => {
    if (typeof window === "undefined") {
      return { light: defaultLightThemePresetId, dark: defaultDarkThemePresetId }
    }

    return {
      light: (window.localStorage.getItem(getThemePresetStorageKey("light")) as ThemePresetId | null) ?? defaultLightThemePresetId,
      dark: (window.localStorage.getItem(getThemePresetStorageKey("dark")) as ThemePresetId | null) ?? defaultDarkThemePresetId,
    }
  })

  const presets = useMemo(() => getThemePresets(mode), [mode])
  const currentPreset = useMemo(() => getThemePreset(mode, selectedByMode[mode]), [mode, selectedByMode])

  function handleChangeMode(nextMode: ThemeMode) {
    setMode(nextMode)
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, nextMode)
    applyThemePreset(nextMode, selectedByMode[nextMode])
  }

  function handleSelectTheme(presetId: ThemePresetId) {
    setSelectedByMode((current) => ({ ...current, [mode]: presetId }))
    window.localStorage.setItem(getThemePresetStorageKey(mode), presetId)
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, mode)
    applyThemePreset(mode, presetId)
  }

  return (
    <div className="grid h-full min-h-0 overflow-hidden xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-6">
      <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Theme Presets</p>
            <h1 className="text-2xl font-semibold tracking-tight">主题色</h1>
          </div>

          <div className="inline-flex rounded-2xl border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => handleChangeMode("light")}
              className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm transition-colors ${mode === "light" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <SunMedium className="h-4 w-4" />
              亮色
            </button>
            <button
              type="button"
              onClick={() => handleChangeMode("dark")}
              className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm transition-colors ${mode === "dark" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <MoonStar className="h-4 w-4" />
              暗色
            </button>
          </div>
        </div>

        <div className="mt-6 min-h-0 flex-1 overflow-y-scroll pr-2">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {presets.map((preset) => {
              const active = preset.id === selectedByMode[mode]

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectTheme(preset.id)}
                  className={`rounded-2xl border p-4 text-left transition-all ${active ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/25 hover:bg-muted/40"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{preset.name}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{preset.description}</p>
                    </div>
                    {active ? <Check className="h-4 w-4 text-primary" /> : null}
                  </div>

                  <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-background">
                    <div className="flex h-7 items-center gap-2 px-3" style={{ backgroundColor: preset.preview.background }}>
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: preset.preview.primary }} />
                      <span className="h-2.5 w-16 rounded-full bg-black/10" />
                      <span className="ml-auto h-2.5 w-8 rounded-full bg-black/10" />
                    </div>
                    <div className="grid gap-2 p-2.5" style={{ backgroundColor: preset.preview.background }}>
                      <div className="rounded-xl border p-2.5" style={{ backgroundColor: preset.preview.background, borderColor: `${preset.preview.primary}20` }}>
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="h-2.5 w-20 rounded-full bg-black/10" />
                          <span className="h-4 w-9 rounded-full" style={{ backgroundColor: preset.preview.accent }} />
                        </div>
                        <span className="mb-1.5 block h-2 w-full rounded-full bg-black/10" />
                        <span className="block h-2 w-3/4 rounded-full bg-black/10" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 flex-1 rounded-xl" style={{ backgroundColor: preset.preview.primary }} />
                        <div className="h-8 w-14 rounded-xl border border-border bg-card/80" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {preset.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-medium">当前主题</p>
          <p className="mt-2 text-xl font-semibold tracking-tight">{currentPreset.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{currentPreset.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border p-3 text-center">
              <span className="mx-auto block h-8 w-8 rounded-full border border-border" style={{ backgroundColor: currentPreset.preview.primary }} />
              <p className="mt-2 text-[11px] text-muted-foreground">主色</p>
            </div>
            <div className="rounded-xl border border-border p-3 text-center">
              <span className="mx-auto block h-8 w-8 rounded-full border border-border" style={{ backgroundColor: currentPreset.preview.background }} />
              <p className="mt-2 text-[11px] text-muted-foreground">背景</p>
            </div>
            <div className="rounded-xl border border-border p-3 text-center">
              <span className="mx-auto block h-8 w-8 rounded-full border border-border" style={{ backgroundColor: currentPreset.preview.accent }} />
              <p className="mt-2 text-[11px] text-muted-foreground">强调</p>
            </div>
          </div>
        </section>
      </aside>
    </div>
  )
}
