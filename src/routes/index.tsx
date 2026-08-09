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
        <div className="mb-8 w-full max-w-xs">
          <img src="/LOGOREMAX07.png" alt="RE/MAX" className="w-full object-contain" />
        </div>

        <div className="w-full rounded-2xl bg-surface p-8 sm:p-10">
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
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-semibold text-background transition hover:bg-accent-active focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              Abrir calculadora
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Clique no botão acima para acessar a calculadora.
        </p>
      </div>
    </div>
  );
}
