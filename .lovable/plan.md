# Adicionar cards de agendamento na landing page

## Objetivo
Adicionar três cards de agendamento na landing page `/`, posicionados acima do card existente da calculadora de comissões, mantendo a paleta e estilo atuais.

## Alterações propostas

### 1. Estrutura dos cards na landing page
- Editar `src/routes/index.tsx`.
- Inserir uma grade com três cards logo acima do card "Cálculo de Comissões".
- Cada card terá:
  - Título em destaque.
  - Descrição curta.
  - Botão "Agendar" que abre um link externo em nova aba.

### 2. Conteúdo dos cards
```text
Card 1
- Título: Agendar horário com Patricia
- Descrição: Agendar ACM, Primeira Visita, Reuniões.
- Link: https://calendar.app.google/1dJqDSYVx6FrMH8E8

Card 2
- Título: Agendar horário Sala Reunião I
- Descrição: Agendar horários na sala de reunião I.
- Link: https://calendar.app.google/DkzGyEYxnqBsDrkM6

Card 3
- Título: Agendar horário Sala Reunião II
- Descrição: Agendar horários na sala de reunião II.
- Link: https://calendar.app.google/mQvrkVBfZCJaiPPU7
```

### 3. Estilo
- Usar os mesmos tokens visuais da landing page: `bg-surface`, `rounded-2xl`, `text-foreground`, `text-muted-foreground`.
- Botão de agendar com estilo secundário (`border-border bg-surface-2 hover:border-accent hover:text-accent`) para diferenciar do CTA primário "Abrir calculadora".
- Layout responsivo: grid com 1 coluna em mobile e 3 colunas em desktop (`grid-cols-1 md:grid-cols-3`).
- Links externos com `target="_blank"` e `rel="noopener noreferrer"`.

### 4. SEO
- Não alterar os metadados existentes da landing page, a menos que seja necessário incluir algum termo relacionado aos agendamentos. Por simplicidade, manter os metadados atuais focados na calculadora.

## Critérios de aceitação
- A landing page `/` exibe três cards de agendamento acima do card da calculadora.
- Cada botão "Agendar" abre o link correto em nova aba.
- O layout permanece responsivo e visualmente consistente com o restante da página.
- O build do TanStack Router gera corretamente a árvore de rotas.
