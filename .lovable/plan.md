## Objetivo
Incluir um card de "Total" na seção de resultados, posicionado logo após os cards de Angariação e Venda, exibindo a soma dos valores ativos.

## Alterações
1. **src/routes/index.tsx**
   - Adicionar `total` ao cálculo do `useMemo`: soma de `angariacao + venda`.
   - Inserir um novo card destacado após os cards de Angariação e Venda, mostrando o total calculado.
   - Usar o mesmo estilo dos cards existentes, com destaque visual apropriado para o valor final.

## Validação
- Verificar o preview para confirmar que o card aparece abaixo de Angariação e Venda.
- Conferir se o total atualiza em tempo real conforme os valores mudam.