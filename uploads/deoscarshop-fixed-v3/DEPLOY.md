# Dé.Oscar — Guia de Deploy

## 1. O que foi construído

Site Next.js completo substituindo a landing page estática:

- **Loja**: `/produtos` (catálogo + filtro por categoria), `/produtos/[slug]` (página de produto com length/colour/quantity), carrinho (drawer + página `/carrinho`), `/checkout`.
- **Pedidos**: salvos no Supabase via `/api/checkout` com `payment_status: pending`.
- **Pagamento**: estrutura pronta para Fiserv em `lib/fiserv.ts` + `/api/fiserv/charge` + `/api/fiserv/webhook`. Nenhuma credencial no frontend.
- **Admin**: `/admin/login` (Supabase Auth) → `/admin/dashboard` (lista, busca, expande detalhes, atualiza status de pagamento/pedido).
- **Páginas finais**: `/sucesso` e `/pagamento-falhou` com botão WhatsApp.
- **Email**: estrutura pronta em `lib/email.ts` (stub — ver seção 5).
- Identidade visual preto/dourado, fontes Cormorant Garamond + Jost, mantidas 100% fiéis ao site original.

## 2. Variáveis de ambiente

Crie um arquivo `.env.local` na raiz (use `.env.example` como base):

```
NEXT_PUBLIC_SUPABASE_URL=          # você já tem
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # você já tem
SUPABASE_SERVICE_ROLE_KEY=         # Settings > API > service_role (NUNCA expor no frontend)

FISERV_MERCHANT_ID=
FISERV_STORE_ID=
FISERV_API_KEY=
FISERV_API_SECRET=
FISERV_API_URL=
FISERV_CONNECT_URL=

RESEND_API_KEY=                    # opcional, para emails reais
STORE_OWNER_EMAIL=owner@deoscar.com.au
NOTIFICATIONS_FROM_EMAIL=orders@deoscar.com.au
```

Todas as chaves `FISERV_*` e `SUPABASE_SERVICE_ROLE_KEY` são lidas **apenas** em código server-side (`/app/api/*`, `lib/supabase/admin.ts`, `lib/fiserv.ts`) e nunca chegam ao bundle do navegador.

## 3. Conectar seu Supabase (você já tem o projeto)

1. No Supabase Dashboard → **SQL Editor** → cole e execute o conteúdo de `supabase/schema.sql`. Isso cria:
   - tabela `orders`
   - tabela `order_items`
   - Row Level Security (anon só pode `INSERT`, nunca `SELECT/UPDATE/DELETE` — leitura/escrita de admin passa pela service role key no backend)
2. Crie o usuário admin: **Authentication → Users → Add User** (email + senha que você vai usar para logar em `/admin/login`).
3. Copie as 3 chaves (URL, anon key, service_role key) para o `.env.local`.

## 4. Pagamento — Fiserv / First Data

A estrutura está pronta mas **não está ligada visualmente ao checkout ainda**, porque a Fiserv tem múltiplos produtos (Connect/hosted redirect vs Commerce Hub REST direto) com payloads diferentes. Preciso de uma informação sua para fechar isso:

> **Qual produto Fiserv você usa?** (Connect/hosted checkout redirecionável, ou API REST direta com campos de cartão no seu form)

Com a resposta, eu:
- ajusto `lib/fiserv.ts` para o payload exato da sua conta,
- crio o formulário de cartão (ou o redirect) na página de checkout,
- conecto ao fluxo: `pending` → chama Fiserv → `paid`/`failed` → redireciona para `/sucesso` ou `/pagamento-falhou`.

Até lá, o pedido é criado normalmente como `pending` e fica visível no admin — você pode marcar manualmente como `paid` enquanto a integração final não entra.

## 5. Email (opcional, mas recomendado)

`lib/email.ts` já está estruturado para chamar tanto o cliente quanto você (proprietário) após cada pedido. Para ativar de verdade:

```bash
npm install resend
```
Crie conta gratuita em resend.com, adicione `RESEND_API_KEY` no `.env.local`, e descomente o bloco indicado dentro de `sendEmail()` em `lib/email.ts`.

## 6. Deploy (Vercel recomendado)

1. Suba este projeto para um repositório no GitHub.
2. Em vercel.com → **New Project** → importe o repo.
3. Em **Settings → Environment Variables**, adicione todas as variáveis da seção 2.
4. Deploy. A Vercel detecta Next.js automaticamente.

## 7. Testar checkout com segurança antes de ir ao ar

1. Use as credenciais **sandbox/cert** da Fiserv (não as de produção) em `FISERV_API_URL` e demais chaves enquanto testa.
2. Faça um pedido de teste completo no site → confirme que aparece em `/admin/dashboard` com `payment_status: pending`.
3. Quando a integração de cartão estiver ligada, use os **números de cartão de teste** fornecidos no portal sandbox da Fiserv (nunca um cartão real).
4. Confirme que o status muda para `paid` (cartão de teste aprovado) ou `failed` (cartão de teste de recusa) e que o redirecionamento para `/sucesso` ou `/pagamento-falhou` funciona.
5. Só troque para as chaves de produção da Fiserv depois desse ciclo completo validado.

## 8. Arquivos principais alterados/criados

Projeto inteiro é novo (Next.js), construído a partir do design do HTML original:

- `app/` — todas as páginas (loja, checkout, admin, sucesso/falha)
- `app/api/` — checkout, Fiserv charge/webhook, admin orders
- `lib/` — supabase (client/server/admin), fiserv.ts, email.ts, products.ts
- `components/` — Navbar, Footer, ProductCard, CartDrawer, SiteChrome
- `context/CartContext.tsx` — carrinho com persistência local
- `middleware.ts` — protege `/admin/*`
- `supabase/schema.sql` — schema completo para colar no SQL Editor
- `tailwind.config.ts`, `app/globals.css` — paleta black/gold/cream idêntica ao original

## Pendências para eu finalizar (responda e eu completo)

1. **Produto Fiserv** (Connect/hosted vs REST direto) — para ligar o pagamento de fato.
2. **Fotos reais dos produtos** — atualmente uso imagens de placeholder do Unsplash; me envie as fotos reais (ou os links) e eu substituo em `lib/products.ts`.
3. **Número de WhatsApp real** — usei `61000000000` como placeholder nos botões.
4. **Textos/preços finais dos 6 produtos** — usei conteúdo de exemplo coerente com a marca; me envie a lista real (nome, descrição, preço, comprimentos, cores) e eu atualizo.
