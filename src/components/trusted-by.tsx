export function TrustedBy() {
  const companies = ["OpenAI", "Vercel", "Stripe", "Notion", "Linear", "Figma"]

  return (
    <section className="py-16 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-8">Trusted by language learners at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <div
                key={index}
                className="text-muted-foreground/60 hover:text-muted-foreground transition-colors font-medium"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
