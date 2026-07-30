import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ChangeEvent } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const parseCurrency = (s: string) => {
  const digits = s.replace(/\D/g, "");
  if (!digits) return 0;
  return parseInt(digits, 10) / 100;
};

const fmtPct = (n: number) => n.toString().replace(".", ",");

function CurrencyInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <input
      inputMode="numeric"
      value={brl(value)}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(parseCurrency(e.target.value))}
      className="w-full rounded-lg bg-surface-2 border border-border px-4 py-3 text-lg font-medium text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
    />
  );
}

function PercentInput({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  const [raw, setRaw] = useState<string | null>(null);
  const display = raw ?? value.toString().replace(".", ",");
  return (
    <div className={`inline-flex items-center rounded-md border border-border bg-surface-2 px-2.5 py-1.5 gap-1 transition ${disabled ? "opacity-40" : "focus-within:border-accent"}`}>
      <input
        disabled={disabled}
        value={display}
        onFocus={() => setRaw(value.toString().replace(".", ","))}
        onBlur={() => setRaw(null)}
        onChange={(e) => {
          const v = e.target.value.replace(/[^\d,.]/g, "");
          setRaw(v);
          const num = parseFloat(v.replace(",", "."));
          if (!isNaN(num)) onChange(num);
          else if (v === "") onChange(0);
        }}
        className="w-14 bg-transparent text-right text-sm font-medium text-foreground outline-none"
      />
      <span className="text-sm text-muted-foreground">%</span>
    </div>
  );
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex h-5 w-5 items-center justify-center rounded border transition ${
        checked ? "border-accent-active bg-accent-active" : "border-border bg-transparent hover:border-muted-foreground"
      }`}
      aria-pressed={checked}
    >
      {checked && <Check className="h-3.5 w-3.5 text-background" strokeWidth={3} />}
    </button>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-2">
      <span className={`text-sm ${muted ? "text-muted-foreground" : "text-foreground"}`}>{label}</span>
      <span className={`font-semibold tabular-nums transition-all duration-150 ${muted ? "text-foreground" : "text-foreground text-lg"}`}>
        {value}
      </span>
    </div>
  );
}

function Index() {
  const [propertyValue, setPropertyValue] = useState(1_000_000);
  const [grossPct, setGrossPct] = useState(6.0);
  const [refOn, setRefOn] = useState(false);
  const [refPct, setRefPct] = useState(10.0);
  const [parOn, setParOn] = useState(false);
  const [parPct, setParPct] = useState(50.0);
  const [angOn, setAngOn] = useState(true);
  const [angPct, setAngPct] = useState(45.0);
  const [venOn, setVenOn] = useState(true);
  const [venPct, setVenPct] = useState(45.0);
  const [franquiaPct, setFranquiaPct] = useState(50.0);
  const imobiliariaPct = 100 - franquiaPct;

  const calc = useMemo(() => {
    const base = propertyValue * (grossPct / 100);
    const referral = refOn ? base * (refPct / 100) : 0;
    const afterRef = base - referral;
    const parceria = parOn ? afterRef * (parPct / 100) : 0;
    const net = afterRef - parceria;
    const franquia = net * (franquiaPct / 100);

    const imobiliaria = net * (imobiliariaPct / 100);

    const angariacao = angOn ? franquia * (angPct / 100) : 0;
    const venda = venOn ? franquia * (venPct / 100) : 0;
    return { base, referral, parceria, net, franquia, imobiliaria, angariacao, venda };
  }, [propertyValue, grossPct, refOn, refPct, parOn, parPct, angOn, angPct, venOn, venPct, franquiaPct, imobiliariaPct]);

  const [copied, setCopied] = useState<null | "imob" | "corretor">(null);

  const buildImobiliariaText = () => {
    const lines = [
      `Valor do imóvel: ${brl(propertyValue)}`,
      `Comissão base (${fmtPct(grossPct)}%): ${brl(calc.base)}`,
    ];
    lines.push(``);
    if (refOn) lines.push(`Ajuste (${fmtPct(refPct)}%): - ${brl(calc.referral)}`);
    if (parOn) lines.push(`Parceria (${fmtPct(parPct)}%): - ${brl(calc.parceria)}`);
    if (refOn || parOn) {lines.push(`Base líquida: ${brl(calc.net)}`); lines.push(``);}
    lines.push(`Divisão: Cooperado (${fmtPct(franquiaPct)}%) / Imobiliária (${fmtPct(imobiliariaPct)}%)`);
    if (angOn) lines.push(`Angariação (${fmtPct(angPct)}%): ${brl(calc.angariacao)}`);
    if (venOn) lines.push(`Venda (${fmtPct(venPct)}%): ${brl(calc.venda)}`);
    if (angOn || venOn)
      lines.push(`Total cooperado (angariação + venda): ${brl(calc.angariacao + calc.venda)}`);
    lines.push(``);
    lines.push(
      `Total Imobiliária: ${brl(calc.imobiliaria + calc.franquia - (calc.angariacao + calc.venda))}`,
    );
    return lines.join("\n");
  };

  const buildCorretorText = () => {
    const lines = [
      `Valor do imóvel: ${brl(propertyValue)}`,
      `Comissão base (${fmtPct(grossPct)}%): ${brl(calc.base)}`,
    ];
    lines.push(``);
    if (refOn) lines.push(`Ajuste (${fmtPct(refPct)}%): - ${brl(calc.referral)}`);
    if (parOn) lines.push(`Parceria (${fmtPct(parPct)}%): - ${brl(calc.parceria)}`);
    if (refOn || parOn) {lines.push(`Base líquida: ${brl(calc.net)}`); lines.push(``);}
    lines.push(`Divisão: Cooperado (${fmtPct(franquiaPct)}%) / Imobiliária (${fmtPct(imobiliariaPct)}%)`);
    if (angOn) lines.push(`Angariação (${fmtPct(angPct)}%): ${brl(calc.angariacao)}`);
    if (venOn) lines.push(`Venda (${fmtPct(venPct)}%): ${brl(calc.venda)}`);
    if (angOn || venOn)
      lines.push(``);
      lines.push(`Total (angariação + venda): ${brl(calc.angariacao + calc.venda)}`);
    return lines.join("\n");
  };

  const copy = async (kind: "imob" | "corretor") => {
    const text = kind === "imob" ? buildImobiliariaText() : buildCorretorText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(kind);
    setTimeout(() => setCopied(null), 2000);
  };

  const rateio = [
    { label: "Ajuste", on: refOn, setOn: setRefOn, pct: refPct, setPct: setRefPct },
    { label: "Parceria", on: parOn, setOn: setParOn, pct: parPct, setPct: setParPct },
    { label: "Angariação", on: angOn, setOn: setAngOn, pct: angPct, setPct: setAngPct },
    { label: "Venda", on: venOn, setOn: setVenOn, pct: venPct, setPct: setVenPct },
  ];


  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <div className="mb-4">
            <img src="/LOGOREMAX07.png" alt="RE/MAX" className="w-full object-contain" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Cálculo de Comissões
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Simulação do rateio de comissões.
          </p>
        </header>

        <div className="space-y-4">
          <section className="rounded-2xl bg-surface p-6 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Valor do imóvel
              </label>
              <CurrencyInput value={propertyValue} onChange={setPropertyValue} />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Comissão bruta
              </label>
              <div className="flex items-center gap-3">
                <PercentInput value={grossPct} onChange={setGrossPct} />
                <span className="text-sm text-muted-foreground">do valor do imóvel</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-surface p-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Configurações de rateio
            </h2>
            <div className="divide-y divide-border">
              {rateio.map((r) => (
                <div key={r.label} className="flex items-center justify-between py-3">
                  <label className="flex cursor-pointer items-center gap-3">
                    <Checkbox checked={r.on} onChange={r.setOn} />
                    <span className={`text-sm ${r.on ? "text-foreground" : "text-muted-foreground"}`}>
                      {r.label}
                    </span>
                  </label>
                  <PercentInput value={r.pct} onChange={r.setPct} disabled={!r.on} />
                </div>
              ))}
              <div className="flex items-center justify-between py-3 gap-3">
                <span className="text-sm text-foreground">Parceiro / Imobiliária</span>
                <div className="flex items-center gap-2">
                  <PercentInput
                    value={franquiaPct}
                    onChange={(n) => setFranquiaPct(Math.max(0, Math.min(100, n)))}
                  />
                  <span className="text-xs text-muted-foreground">/</span>
                  <PercentInput
                    value={imobiliariaPct}
                    onChange={(n) => setFranquiaPct(Math.max(0, Math.min(100, 100 - n)))}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-surface p-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Resumo dos valores
            </h2>
            <div className="divide-y divide-border">
              <Row label="Comissão base total" value={brl(calc.base)} muted />
              {refOn && (
                <Row label={`Ajuste (${fmtPct(refPct)}%)`} value={`- ${brl(calc.referral)}`} muted />
              )}
              {parOn && (
                <Row label={`Parceria (${fmtPct(parPct)}%)`} value={`- ${brl(calc.parceria)}`} muted />
              )}
              <Row label="Base líquida" value={brl(calc.net)} muted />
            </div>

            <div className="mt-5 space-y-3">
              {parOn && (
                <div className="rounded-xl border border-border bg-surface-2 p-5">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Parceria ({fmtPct(parPct)}%)
                  </div>
                  <div className="mt-1 text-2xl font-bold tabular-nums text-accent transition-all duration-150">
                    {brl(calc.parceria)}
                  </div>
                </div>
              )}              
              {(angOn || venOn) && (
                <div className="rounded-xl border border-border bg-surface-2 p-5">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Venda ({fmtPct(venPct)}%)
                      </div>
                      <div className="mt-1 text-2xl font-bold tabular-nums text-accent transition-all duration-150">
                        {brl(calc.venda)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Angariação ({fmtPct(angPct)}%)
                      </div>
                      <div className="mt-1 text-2xl font-bold tabular-nums text-accent transition-all duration-150">
                        {brl(calc.angariacao)}
                      </div>
                    </div>
                  
                  </div>
                  
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <br></br>
                      
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        COOPERADO
                      </div>
                      <div className="mt-1 text-2xl font-bold tabular-nums text-accent transition-all duration-150">
                        {brl(calc.angariacao + calc.venda)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="rounded-xl border border-border bg-surface-2 p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Imobiliária
                    </div>
                    <div className="mt-1 text-2xl font-bold tabular-nums text-accent transition-all duration-150">
                      {brl((calc.imobiliaria + calc.franquia ) - (calc.angariacao + calc.venda))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => copy("imob")}
                className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
              >
                {copied === "imob" ? "Copiado!" : "Imobiliária"}
              </button>
              <button
                type="button"
                onClick={() => copy("corretor")}
                className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
              >
                {copied === "corretor" ? "Copiado!" : "Corretor"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
