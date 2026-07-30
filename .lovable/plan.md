## Objetivo

Adicionar dois botões que copiam o resumo do cálculo em texto para a área de transferência: um com a visão da **Imobiliária** e outro com a visão do **Corretor/Cooperado**.

## Onde

Nova seção de ações no fim do bloco "Resumo dos valores" em `src/routes/index.tsx`, com dois botões lado a lado:
- "Copiar resumo — Imobiliária"
- "Copiar resumo — Corretor"

Ao clicar, o texto vai para a área de transferência e o botão mostra "Copiado!" por ~2s.

## Conteúdo dos textos

Imobiliária (resumo completo):
```text
Valor do imóvel: R$ 1.000.000,00
Comissão base total (6%): R$ 60.000,00
Ajuste (10%): - R$ 6.000,00
Parceria (50%): - R$ 27.000,00
Base líquida: R$ 27.000,00
Divisão Parceiro / Imobiliária: 50% / 50%
Angariação (45%): R$ 6.075,00
Venda (45%): R$ 6.075,00
Total cooperado (angariação + venda): R$ 12.150,00
Saldo imobiliária: R$ 14.850,00
```

Corretor/Cooperado:
```text
Valor do imóvel: R$ 1.000.000,00
Comissão base total (6%): R$ 60.000,00
Ajuste (10%): - R$ 6.000,00
Divisão Parceiro / Imobiliária: 50% / 50%
Angariação (45%): R$ 6.075,00
Venda (45%): R$ 6.075,00
Total (angariação + venda): R$ 12.150,00
```

Regras: linhas de Ajuste, Parceria, Angariação e Venda só aparecem quando a respectiva opção estiver marcada. A linha de divisão Parceiro / Imobiliária aparece nos dois resumos, refletindo os percentuais configurados. Valores usam a mesma formatação BRL/percentual já existente na tela.

## Detalhes técnicos

- Reaproveita `calc`, `brl` e `fmtPct` existentes; nenhuma mudança na lógica de cálculo.
- Duas funções puras `buildImobiliariaText()` / `buildCorretorText()` no mesmo arquivo, montando as linhas condicionalmente.
- Cópia via `navigator.clipboard.writeText`, com fallback para `document.execCommand('copy')` em navegadores sem permissão.
- Feedback de estado com `useState` (qual botão foi copiado) e `setTimeout` para resetar.
- Estilo dos botões seguindo o tema escuro atual (borda `border`, fundo `surface-2`, hover com `accent`).
