# Content Guide (for editors)

Everything on this site — text, images, videos, project data, SEO fields —
is editable through **Sanity Studio** at `/studio`, once a Sanity project is
connected (see `DEPLOYMENT.md`). Nothing needs a code change to update.

## Where things live in Studio

- **Configurações Globais** — your name, role, email, phone, location,
  social links, availability badge, default SEO. Shown site-wide (header,
  footer, contact page, meta tags).
- **Projetos** — every case study. Each has:
  - Basic fields (title, slug, category, year, client, cover image, excerpt,
    featured toggle, order).
  - Services and Technologies (references to their own collections).
  - Related projects.
  - **Blocos do case** — the modular page builder. Add, remove, drag to
    reorder any of: Hero, Text, Image, Video, Gallery, Grid, Carousel,
    Text + Image, Metrics, Credits, CTA, Tech List, Service List,
    Testimonials, Mockups, Spacer, Divider.
  - SEO tab (meta title/description/OG image/no-index).
- **Playground** — standalone experiments shown on the Playground page.
- **Páginas** — generic pages built the same block-based way, for anything
  outside the fixed page list.
- **Clientes / Serviços / Tecnologias / Depoimentos** — shared collections
  referenced from projects and rendered on the Home and About pages.
- **Menus** — placeholder collection for future custom navigation structures.

## Editing guidelines

- **Never leave metrics, testimonials or awards as placeholders in
  published content.** The seed data intentionally uses "—" and "a
  definir" instead of invented numbers — replace them with real, verifiable
  data before publishing, or omit the block entirely.
- Keep excerpts under ~160 characters — they're also used as the fallback
  meta description.
- Cover images should be at least 1600px wide for crisp display on large
  screens; the site crops to a consistent aspect ratio automatically.
- Reorder projects on the Home page using the `featured` toggle (max 6 shown)
  and `orderRank` field.

## Translations

Locale switching (PT/EN/ES) is live for all interface labels. Field-level
translation of project content (titles, descriptions, block text) is not
yet wired to a localization plugin — see "Known limitations" in
`ARCHITECTURE.md` for the recommended approach
(`@sanity/document-internationalization`) and the intended flow:
Portuguese draft → automatic translation → manual review → publish.
