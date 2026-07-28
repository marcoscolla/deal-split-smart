## Objetivo
Remover as regras de Royalties e Parceria e permitir configurar tanto o percentual da Franquia quanto o da Imobiliária (com sincronia entre si, somando 100%).

## Alterações em `src/routes/index.tsx`

### Estado
- Remover: `royOn`, `royPct`, `parOn`, `parPct`.
- Manter: `refOn/refPct`, `angOn/angPct`, `venOn/venPct`, `franquiaPct`.
- Adicionar: `imobiliariaPct` (padrão 50.0), sincronizado com `franquiaPct` (sempre soma 100).

### Configurações de rateio (ordem)
1. Referenciamento
2. Angariação
3. Venda

Abaixo da lista, uma linha com dois `PercentInput` lado a lado: **Franquia** e **Imobiliária**. Editar um recalcula o outro (`imobiliaria = 100 - franquia`).

### Fórmulas
```text
base           = propertyValue * grossPct%
referenciamento= refOn ? base * refPct% : 0
net            = base - referenciamento
franquia       = net * franquiaPct%
imobiliaria    = net * imobiliariaPct%
angariacao     = angOn ? imobiliaria * angPct% : 0
venda          = venOn ? imobiliaria * venPct% : 0
```

### Resumo dos valores
- Comissão base total
- Referenciamento (se ativo) — negativo
- Base líquida

### Cards de destaque
1. Franquia / Imobiliária (card único com ambos os percentuais dinâmicos)
2. Angariação (se ativo)
3. Venda (se ativo)

## Validação
Verificar no preview que ao alterar Franquia para 60%, Imobiliária vira 40% automaticamente, e Angariação/Venda recalculam sobre o novo valor da Imobiliária.