import { SettingsWorkspace, type SettingsSection } from "@/components/settings/settings-workspace"

type SettingsPageProps = {
  searchParams: Promise<{
    section?: string
  }>
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const params = await searchParams

  const activeSection: SettingsSection =
    params.section === "account" ||
    params.section === "appearance" ||
    params.section === "ai-model" ||
    params.section === "preferences" ||
    params.section === "security"
      ? params.section
      : "appearance"

  return (
    <div className="h-full min-h-0">
      <SettingsWorkspace activeSection={activeSection} />
    </div>
  )
}
