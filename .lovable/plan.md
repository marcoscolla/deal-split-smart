## Objetivo
Adicionar duas formas de retorno à landing page dentro da página da calculadora:
1. Logo RE/MAX clicável no topo da página.
2. Botão ao final da página para voltar à landing page.

## Arquivos alterados
- `src/routes/calculadora.tsx`

## Mudanças técnicas
1. Importar `Link` de `@tanstack/react-router` junto com `createFileRoute`.
2. No `header`, transformar a imagem do logo (`<img src="/LOGOREMAX07.png" ... />`) em um link para a raiz (`/`):
   - Usar `<Link to="/">` como wrapper da imagem.
   - Manter as classes e o `alt` existentes.
3. No final da seção de resumo (após os botões "Imobiliária" e "Corretor"), adicionar um botão/Link para voltar à landing page:
   - Usar `<Link to="/">` com estilo de botão.
   - Aplicar classes consistentes com o design atual (bordas arredondadas, cor de superfície, texto claro, hover com destaque).
   - Texto do botão: "Voltar" ou similar em português.

## Verificação
- Build do projeto passar sem erros.
- Preview: clicar no logo redireciona para `/`.
- Preview: o botão ao final da página redireciona para `/`.
