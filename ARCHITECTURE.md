# Architecture

## Stack rationale

Next.js App Router + TypeScript + Tailwind CSS, with Server Components used
by default for all data-fetching pages. Client Components are used only
where interactivity requires it (header/mobile menu, work filters, contact
form, animations).

## Folder structure

```
src/
  app/
    [locale]/            # all internationalized routes (next-intl)
      page.tsx            # Home
      work/                # listing + [slug] case study
      web-development/
      playground/
      about/
      contact/              # page.tsx + actions.ts (Server Action)
      privacy/
      layout.tsx             # root <html>, header/footer, fonts, Person JSON-LD
      not-found.tsx
    studio/[[...tool]]/    # embedded Sanity Studio (outside i18n routing)
    sitemap.ts / robots.ts
  components/
    ui/                    # small primitives (Button, Kicker, Container, Label)
    layout/                # SiteHeader, SiteFooter, LocaleSwitcher
    sections/               # ProjectCard/Grid, ServiceCard, ClientMarquee, WorkExplorer
    blocks/                  # one component per case-study block type + BlockRenderer
    animations/                # Reveal (Framer Motion), HeroTitle + ScrollProgress (GSAP)
    forms/                       # ContactForm
    seo/                           # JsonLd
  lib/
    content/                       # data-access layer (Sanity + local fallback)
    sanity/                          # client, image builder, GROQ queries
    supabase/ resend/ turnstile/      # server-only integration clients
    validation/                        # Zod schemas
    seo/                                 # hreflang/canonical helper
  sanity/
    schemaTypes/                         # all document/object/block schemas
    structure.ts                          # Studio desk structure
  data/seed/                                # local placeholder content (24 projects, etc.)
sanity.config.ts                             # Studio config (root, referenced by /studio)
supabase/migrations/                          # SQL for the contact_submissions table
scripts/seed.ts                                # pushes local seed data into real Sanity
```

## The demo-mode fallback pattern

Every function in `src/lib/content/*.ts` follows the same shape:

```ts
export async function getProjects(locale) {
  if (!isSanityConfigured) return seedProjects;
  try {
    const data = await sanityClient.fetch(query);
    return data?.length ? data : seedProjects;
  } catch {
    return seedProjects;
  }
}
```

`isSanityConfigured` (in `src/lib/utils.ts`) checks whether
`NEXT_PUBLIC_SANITY_PROJECT_ID` is set to a real value. This means:

- With no Sanity project connected, the entire site is fully browsable using
  realistic placeholder content — nothing is hardcoded into page components.
- The moment a real Sanity project is connected and has content, every page
  automatically switches to live CMS data with zero code changes.
- If a Sanity fetch ever fails at runtime (network issue, wrong dataset,
  etc.), the site degrades gracefully to placeholder content instead of
  crashing.

The same pattern is used for Supabase (`isSupabaseConfigured`), Resend
(`isResendConfigured`) and Turnstile (`isTurnstileConfigured`) in the contact
form Server Action (`src/app/[locale]/contact/actions.ts`) — each integration
is skipped gracefully (with a `console.warn`) rather than failing when not
configured yet.

## Modular block builder

Case studies (`project` documents) and generic `page` documents share the
same `blocks` array field in Sanity, typed as a union of 17 object types
(Hero, Text, Image, Video, Gallery, Grid, Carousel, Text+Image, Metrics,
Credits, CTA, Tech List, Service List, Testimonials, Mockups, Spacer,
Divider — see `src/sanity/schemaTypes/blocks/`). Editors can add, remove and
reorder blocks freely in Studio. `src/components/blocks/block-renderer.tsx`
maps each `_type` to its React component. The local seed projects populate a
representative subset of these blocks so the pattern is visible without any
CMS content.

## Internationalization

`next-intl` with `localePrefix: "always"` (`pt` is the default locale).
Routing config lives in `src/i18n/routing.ts`; UI strings in
`messages/{pt,en,es}.json`. Content translation (project titles/body copy)
is modeled in Sanity but not yet wired for field-level localization — see
"Known limitations" below.

## Adding a content-revalidation webhook

Right now every page is statically generated at build time
(`generateStaticParams` in `work/[slug]/page.tsx`) or rendered per-request
with the demo-mode fallback. To make Studio publishes reflect instantly:

1. Add a Route Handler at `src/app/api/revalidate/route.ts` that checks a
   shared secret and calls `revalidatePath`/`revalidateTag`.
2. In Sanity → API → Webhooks, point a webhook at that route for `create`,
   `update` and `delete` events.
3. Tag the `fetch` calls in `src/lib/content/*.ts` with `next: { tags: [...] }`
   so `revalidateTag` can target them precisely.

## Known limitations / suggested next steps

- **Field-level translation**: the Sanity schemas are not yet using
  `@sanity/document-internationalization` or localized field objects, so
  translating a project's title/body per locale isn't wired up yet — the
  brief's PT → auto-translate → review flow needs to be implemented on top
  of one of those two patterns.
- **Visual regression / accessibility testing**: no automated a11y or visual
  tests are included; recommend adding `@axe-core/playwright` in CI.
- **Image optimization for Sanity assets**: `urlFor` (in
  `src/lib/sanity/image.ts`) is wired up but not yet used everywhere images
  come from Sanity — case study block components currently expect a
  resolved `{ url, alt }` shape from the GROQ query projections, which is
  already correct for both Sanity and local seed data.
- **Revalidation webhook**: see above — not implemented yet, pages rely on
  the default Next.js caching until the next deploy.
