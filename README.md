# Jairo Farias — Portfólio Internacional

Portfólio premium, multilíngue (PT/EN/ES) e totalmente administrável via Sanity CMS,
construído com Next.js App Router, TypeScript e Tailwind CSS.

## Rotas

| Rota | Descrição |
|---|---|
| `/[pt\|en\|es]` | Home |
| `/[locale]/work` | Listagem de projetos com filtro por categoria |
| `/[locale]/work/[slug]` | Case study — montado por blocos reordenáveis |
| `/[locale]/web-development` | Página de serviço de desenvolvimento web |
| `/[locale]/playground` | Experimentos e estudos visuais |
| `/[locale]/about` | Sobre, serviços e tecnologias |
| `/[locale]/contact` | Formulário de contato (RHF + Zod + Server Action) |
| `/[locale]/privacy` | Política de privacidade |
| `/studio` | Sanity Studio embutido (CMS) |

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` — você será redirecionado para `/pt`.

Sem nenhuma variável de ambiente configurada, o site funciona imediatamente em
**modo demonstração**: todo o conteúdo vem de `src/data/seed/*.ts` (24 projetos
placeholder, serviços, tecnologias, etc.), e o formulário de contato funciona
mas não persiste dados nem envia e-mail de verdade. Veja `.env.example` e
`DEPLOYMENT.md` para conectar os serviços reais.

## Scripts

```bash
npm run dev         # desenvolvimento
npm run build        # build de produção
npm run start          # roda o build de produção
npm run lint             # eslint
npm run typecheck         # checagem de tipos TypeScript
npm run seed                # popula seu Sanity real com o conteúdo placeholder
```

## Documentação

- `ARCHITECTURE.md` — decisões técnicas, estrutura de pastas, como o modo
  demonstração funciona e como ele se conecta ao Sanity real.
- `DEPLOYMENT.md` — passo a passo para configurar Sanity, Supabase, Resend,
  Cloudflare Turnstile e publicar na Vercel.
- `CONTENT_GUIDE.md` — como editar todo o conteúdo do site pelo Sanity Studio.
- `.env.example` — todas as variáveis de ambiente necessárias.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · GSAP + ScrollTrigger ·
Framer Motion · Sanity CMS + Sanity Studio · next-intl · Supabase · Resend ·
React Hook Form + Zod · Cloudflare Turnstile · Vercel.
