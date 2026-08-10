import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cálculo de Comissões Imobiliárias" },
      { name: "description", content: "Calcule o rateio de comissões imobiliárias de forma simples e rápida: ajuste, parceria, angariação e venda." },
      { property: "og:title", content: "Cálculo de Comissões Imobiliárias" },
      { property: "og:description", content: "Calcule o rateio de comissões imobiliárias de forma simples e rápida: ajuste, parceria, angariação e venda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://terracapitalcalc.lovable.app/" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-8 w-full">
          <img src="/LOGOREMAX07.png" alt="RE/MAX" className="w-full object-contain" />
        </div>

        <div className="w-full space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-surface p-5 text-left">
              <h2 className="text-lg font-semibold text-foreground">Agendar horário com Patricia</h2>
              <p className="mt-2 text-sm text-muted-foreground">Agendar ACM, Primeira Visita, Reuniões.</p>
              <a
                href="https://calendar.app.google/1dJqDSYVx6FrMH8E8"
                target="_blank"
                rel=""
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
              >
                Agendar
              </a>
            </div>

            <div className="rounded-2xl bg-surface p-5 text-left">
              <h2 className="text-lg font-semibold text-foreground">Agendar horário Sala Reunião I</h2>
              <p className="mt-2 text-sm text-muted-foreground">Agendar horários na sala de reunião I.</p>
              <a
                href="https://calendar.app.google/DkzGyEYxnqBsDrkM6"
                target="_blank"
                rel=""
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
              >
                Agendar
              </a>
            </div>

            <div className="rounded-2xl bg-surface p-5 text-left">
              <h2 className="text-lg font-semibold text-foreground">Agendar horário Sala Reunião II</h2>
              <p className="mt-2 text-sm text-muted-foreground">Agendar horários na sala de reunião II.</p>
              <a
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0DbeHqmUZR9mujGA22kHFUbAt8XAJ16qfRExsIDUz2V2DDB6hIMJnx5xERXbxxD_Y3v22D3RMW"
                target="_blank"
                rel=""
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
              >
                Agendar
              </a>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-surface p-8 sm:p-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Cálculo de Comissões
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Ferramenta para simular o rateio de comissões imobiliárias entre cooperado e imobiliária,
              com suporte a ajustes, parceria, angariação e venda.
            </p>

            <div className="mt-8">
              <Link
                to="/calculadora"
                className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-semibold text-background transition hover:bg-accent-active focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                Abrir calculadora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
