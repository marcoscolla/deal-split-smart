Atualizar favicon com o logo RE/MAX carregado

## Objetivo
Substituir o favicon padrão do projeto pelo logo RE/MAX enviado (IMG_1933.png), aplicando-o a todas as páginas do aplicativo.

## Alterações propostas

### 1. Gerar favicon a partir da imagem carregada
- Usar a imagem `user-uploads://IMG_1933.png` (montada em `/mnt/user-uploads/IMG_1933.png`).
- Redimensionar para 64x64 px com padding transparente para preservar a proporção do balão do logo, salvando em `public/favicon.png`.

### 2. Referenciar o novo favicon no root
- Em `src/routes/__root.tsx`, substituir o link atual `{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }` por `{ rel: "icon", type: "image/png", href: "/favicon.png" }`.

### 3. Remover favicon antigo
- Excluir `public/favicon.ico` para evitar que o ícone padrão do Lovable continue sendo servido.

## Critérios de aceitação
- O navegador carrega `/favicon.png` como ícone do site em todas as rotas (`/` e `/calculadora`).
- O arquivo `public/favicon.ico` padrão é removido.
- O build continua passando sem erros.
