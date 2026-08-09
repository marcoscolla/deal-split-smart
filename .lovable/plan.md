# Landing page com acesso à calculadora

## Objetivo
Criar uma landing page em `/` que mantenha o logo e a paleta de cores atuais e contenha um botão que leva o usuário à calculadora, que será movida para `/calculadora`.

## Alterações propostas

### 1. Mover a calculadora para `/calculadora`
- Renomear o arquivo `src/routes/index.tsx` para `src/routes/calculadora.tsx`.
- Atualizar o `createFileRoute("/")` para `createFileRoute("/calculadora")`.
- O conteúdo e o estado da calculadora permanecem inalterados.

### 2. Criar landing page em `/`
- Criar um novo `src/routes/index.tsx`.
- Componente com a mesma estrutura visual centralizada e fundo `bg-background`.
- Exibir o logo `LOGOREMAX07.png` no topo, igual ao da calculadora.
- Título: "Cálculo de Comissões".
- Subtítulo breve explicando o propósito da ferramenta.
- Botão de CTA: "Abrir calculadora" usando `<Link to="/calculadora">` do TanStack Router, com estilo primário (usando o token `--accent` para manter a identidade visual).

### 3. Metadados SEO
- A landing page `/` terá seu próprio `head()` com title, description, og:title e og:description.
- A calculadora `/calculadora` também terá seus próprios metadados distintos.
- Não alterar o `og:image` de `__root.tsx` a menos que seja gerada uma nova imagem específica.

### 4. Estilo
- Manter os tokens CSS existentes em `src/styles.css` (sem alterações).
- Usar as mesmas classes de superfície (`bg-surface`, `rounded-2xl`, etc.) para manter coerência visual.

## Estrutura de rotas esperada
```text
src/routes/
  __root.tsx        -> layout/shell global
  index.tsx         -> /     (landing page)
  calculadora.tsx   -> /calculadora (calculadora existente)
```

## Critérios de aceitação
- A URL `/` exibe a landing page com o logo e o botão "Abrir calculadora".
- Clicar no botão navega para `/calculadora` sem recarregar a página.
- A `/calculadora` funciona exatamente como a calculadora atual.
- O build do TanStack Router gera corretamente a árvore de rotas.
- Nenhuma funcionalidade da calculadora é perdida ou alterada.