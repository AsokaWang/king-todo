"use client"

import { useEffect } from "react"
import { applyThemePreset, defaultDarkThemePresetId, defaultLightThemePresetId, defaultThemeMode, getThemePresetStorageKey, THEME_MODE_STORAGE_KEY, type ThemeMode } from "@/lib/theme-preset"

export function ThemePresetProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mode = (window.localStorage.getItem(THEME_MODE_STORAGE_KEY) as ThemeMode | null) ?? defaultThemeMode
    const preset =
      window.localStorage.getItem(getThemePresetStorageKey(mode)) ??
      (mode === "dark" ? defaultDarkThemePresetId : defaultLightThemePresetId)

    applyThemePreset(mode, preset)
  }, [])

  return (
    <>
      <div id="theme-switch-overlay" aria-hidden="true" />
      {children}
    </>
  )
}
