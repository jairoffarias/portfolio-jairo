# Deployment Guide

This project runs in **demo mode** out of the box (no external accounts needed).
This guide walks through connecting each real service, one at a time — you can
do them in any order, and the site keeps working with local placeholder data
for anything you haven't configured yet.

## 1. Sanity CMS

1. Go to https://www.sanity.io/manage and create a free account/project.
2. Note your **Project ID** and choose a dataset name (default: `production`).
3. In `.env.local` (copy from `.env.example`):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-real-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Run the app (`npm run dev`) and open `/studio` — log in with your Sanity
   account. You now have a fully working CMS backed by your own project.
5. Optional — populate it with the same placeholder content used in demo mode:
   - In Sanity's dashboard, create an API token with **write** access
     (Settings → API → Tokens).
   - Add `SANITY_API_WRITE_TOKEN=...` to `.env.local`.
   - Run `npm run seed`.
6. Once any content exists in Sanity, the site automatically prefers it over
   the local placeholder data — no code changes needed.

## 2. Supabase (contact form storage)

1. Create a project at https://supabase.com (or ask this agent to provision
   one automatically — a Supabase MCP connector may already be available).
2. In the Supabase SQL editor, run the migration in
   `supabase/migrations/0001_contact_submissions.sql`.
3. Copy your project URL and **service role key** (Settings → API) into
   `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```
   The service role key is only ever used inside the Server Action — it is
   never exposed to the browser.

## 3. Resend (email notifications)

1. Create an account at https://resend.com and verify a sending domain (or
   use their shared `onboarding@resend.dev` sender for testing).
2. Create an API key and add it to `.env.local`:
   ```
   RESEND_API_KEY=re_...
   CONTACT_NOTIFY_EMAIL=hello@jairofarias.com
   CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
   ```

## 4. Cloudflare Turnstile (spam protection)

1. Go to the Cloudflare dashboard → Turnstile → add a site.
2. Copy the **Site Key** and **Secret Key** into `.env.local`:
   ```
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x...
   TURNSTILE_SECRET_KEY=0x...
   ```
   Without these, the contact form still works — Turnstile verification is
   skipped gracefully in demo mode.

## 5. Deploy to Vercel

1. Push this repository to GitHub.
2. Go to https://vercel.com/new and import the repository.
3. Vercel auto-detects Next.js — no build command changes needed.
4. Add every variable from `.env.example` that you've configured as
   Environment Variables in the Vercel project settings.
5. Set `NEXT_PUBLIC_SITE_URL` to your production domain (used for sitemap,
   canonical URLs and Open Graph tags).
6. Deploy.

### Note on first build time

The first production build compiles the embedded Sanity Studio (`/studio`),
which is a large admin application bundle. This routinely takes a few minutes
on the first build — that's expected Sanity behavior, not a problem with the
code. Vercel's build timeout is far longer than this, so it is not an issue
in production; it was simply the reason builds took longer than a few seconds
during development in a resource-constrained sandbox.

### Content revalidation webhook (optional)

To have the live site update automatically when you publish in Sanity Studio
without waiting for the next deploy, add a Sanity webhook that POSTs to a
Next.js revalidation route. This is not wired up yet — see `ARCHITECTURE.md`
for where to add it (`getProjects`/`getProjectBySlug` in `src/lib/content`).
