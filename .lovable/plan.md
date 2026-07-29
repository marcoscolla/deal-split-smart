## Objetivo
Reintroduzir a regra de **Parceria** como item configurável, abaixo de Referenciamento, e ajustar a exibição do card Total.

## Alterações em `src/routes/index.tsx`

### Estado
- Adicionar `parOn` (padrão: desmarcado) e `parPct` (padrão 12,5%).

### Configurações de rateio (ordem)
1. Referenciamento (checkbox + %)
2. **Parceria** (checkbox + %) — novo
3. Angariação
4. Venda
5. Parceiro / Imobiliária (dois percentuais sincronizados em 100%)

### Fórmulas
```text
base            = valorImovel * comissaoBruta%
referenciamento = refOn ? base * refPct% : 0
apósRef         = base - referenciamento
parceria        = parOn ? apósRef * parPct% : 0
baseLiquida     = apósRef - parceria
parceiro        = baseLiquida * parceiroPct%
imobiliaria     = baseLiquida * imobiliariaPct%
angariacao      = angOn ? ... (mesma base atual) : 0
venda           = venOn ? ... (mesma base atual) : 0
```
A Parceria incide sobre o valor já descontado do Referenciamento.

### Resumo dos valores
- Comissão base total
- Referenciamento (se ativo) — negativo
- **Parceria (se ativo) — negativo**
- Base líquida

### Cards
1. **Parceria** (só se ativo) — acima do card de Angariação
2. Angariação (se ativo)
3. Venda (se ativo)
4. **Total** — exibido **somente se** Angariação ou Venda estiver marcado
5. Parceiro / Imobiliária (mantido, em duas colunas, após Venda/Total)

## Validação
Conferir no preview: ativar Referenciamento 10% e Parceria 12,5% e verificar que a Parceria usa a base já líquida do referenciamento; desmarcar Angariação e Venda e confirmar que o card Total desaparece.