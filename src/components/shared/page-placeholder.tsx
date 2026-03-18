type PagePlaceholderProps = {
  title: string
  description: string
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-card">
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Scaffold</p>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
      </div>
    </section>
  )
}
