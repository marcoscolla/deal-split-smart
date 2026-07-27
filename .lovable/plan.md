## Objetivo
Ampliar as regras de cálculo com Royalties e Parceria (descontados da comissão bruta), introduzir um split editável Franquia/Imobiliária (padrão 50/50) e reorganizar os cards de resultado.

## Alterações em `src/routes/index.tsx`

### Estado
- Adicionar `royOn=true`, `royPct=10.0`.
- Adicionar `parOn=false`, `parPct=12.5`.
- Adicionar `franquiaPct=50.0` (editável, aplicado sempre — sem checkbox).
- Manter `refOn/refPct` (Referenciamento) inalterados.

### Configurações de rateio (ordem)
1. Royalties (novo)
2. Parceria (novo)
3. Referenciamento (existente)
4. Angariação (existente)
5. Venda (existente)

Adicionar, abaixo da lista, uma linha extra "Franquia" com apenas o `PercentInput` (sem checkbox) para editar o split.

### Fórmulas (`useMemo`)
```text
base           = propertyValue * grossPct%
royalties      = royOn ? base * royPct%      : 0
parceria       = parOn ? base * parPct%      : 0
referenciamento= refOn ? base * refPct%      : 0
net            = base - royalties - parceria - referenciamento
franquia       = net * franquiaPct%
imobiliaria    = net * (100 - franquiaPct)%
angariacao     = angOn ? imobiliaria * angPct% : 0
venda          = venOn ? imobiliaria * venPct% : 0
```

### Resumo dos valores (linhas mudas)
- Comissão base total
- Royalties (se ativo) — negativo
- Parceria (se ativo) — negativo
- Referenciamento (se ativo) — negativo
- Base líquida

### Cards de destaque (nesta ordem)
1. **Royalties** (se `royOn`) — mostra `royPct%` e valor
2. **Parceria** (se `parOn`) — mostra `parPct%` e valor
3. **Franquia / Imobiliária** — card único mostrando os dois valores lado a lado, com o `franquiaPct%` aplicado
4. **Angariação** (se `angOn`) — valor sobre a base da Imobiliária
5. **Venda** (se `venOn`) — valor sobre a base da Imobiliária

Remover o card "Total a receber".

## Validação
- Conferir no preview a nova ordem e os novos cards.
- Verificar que ao desativar Royalties/Parceria os valores voltam a compor a base líquida.
- Ajustar o percentual da Franquia e confirmar que Angariação/Venda recalculam sobre os 50% restantes (Imobiliária).
