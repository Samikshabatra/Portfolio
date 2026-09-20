# samikshabatra.dev

Personal portfolio for Samiksha Batra — AI/ML Engineer.

**Live:** <https://portfolio-fat60xp9g-samikshas-projects-2fe90868.vercel.app>

Next.js 16 (App Router) · TypeScript · Tailwind v4. Prerendered throughout, with one
hourly-revalidated route for the live GitHub activity graph.

Editorial layout on warm paper: Instrument Serif for display, Archivo for text, IBM
Plex Mono for numbers. Light by default, dark on request.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

Node 20+ (built on 24). No environment variables, no API keys, no secrets.

Use `localhost`, not `127.0.0.1` — Next's dev HMR socket binds to the hostname it
advertises, and connecting by IP kills the client runtime (no scroll reveals, dead
theme toggle). Production is unaffected.

## Editing content

**All content lives in `src/data/`. You never need to open a component to change what the page says.**

| File | What it holds |
|---|---|
| `src/data/profile.ts` | Name, title, bio, email, phone, links, résumé path, photo toggle, site URL |
| `src/data/experience.ts` | Roles, plus the awards and certifications lists |
| `src/data/projects.ts` | Featured projects with their metrics, and the shorter "Also built" list |
| `src/data/skills.ts` | Tool groups and their chips |
| `src/data/sections.ts` | Section order and nav labels — drives both the rail and the page |

### Adding a project

Append an object to `projects` in `src/data/projects.ts`. Nothing else changes.

```ts
{
  slug: "my-project",
  title: "My Project",
  pitch: "One sentence on what it does, from the user's side.",
  detail: "Two or three sentences on how it actually works.",
  year: "2026",
  domain: "Short phrase, plain words",
  stack: ["Python", "FastAPI"],
  metrics: [
    { value: "0.91", label: "F1 on the held-out set", scale: 0.91,
      of: { label: "baseline, 0.74", scale: 0.74 } },
    { value: "120", label: "tests passing" },
  ],
  repo: "https://github.com/Samikshabatra/my-project",
  demo: "https://example.com",   // optional — adds the live-app button
}
```

**On `metrics`:** `scale` (0–1) draws the bar. `of` adds a tick for the reference
point the number is being compared against, which is the whole idea — a bar that
stops short of its baseline is telling the truth about the trade-off. Leave both
off for a number with no meaningful scale (`19/21`, `227 tests`). For a
lower-is-better metric, skip the bar and put the comparison in the label.

`flagship: true` gives one project the accent rule and larger title. Only one
project should carry it.

### Adding your photo

1. Drop a square image (640×640 or larger) at `public/headshot.jpg`.
2. Set `hasPhoto: true` in `src/data/profile.ts`.

Until then the About section shows a typographic monogram in exactly the same
space, so adding the photo shifts nothing.

### Updating the résumé

Replace `public/resume.pdf`. Both the hero and the contact section link to it.

### Setting the canonical URL

`siteUrl` in `src/data/profile.ts` feeds canonical URLs, Open Graph tags,
`sitemap.xml`, `robots.txt` and the JSON-LD `Person` block. It is still the
placeholder, and it needs the **stable production alias** — not the URL above.

The deployed link contains a build hash (`fat60xp9g`), which means Vercel minted
it for one deployment and it changes on the next push. Vercel also assigns a
permanent alias per project, listed under **Project → Domains**. Put that one in
`siteUrl`, or a custom domain once there is one, and redeploy. A canonical tag
pointing at a URL that expires is worse than no canonical tag.

### Project covers

**A cover is either a screenshot of the project's own interface or a diagram of its
own pipeline. Never a stock photograph.** An abstract picture of a building tells a
recruiter nothing, and a picture that is not the thing is a small lie at the top of
every card.

Set `cover` on a project and it renders that image from `public/projects/`. Leave it
off and `ProjectCover` draws the `pipeline` stages instead — flat and typographic, so
nobody mistakes it for a running app.

Three covers are real screenshots today: the Credit Risk platform (captured from its
live Streamlit deployment), CyberSentinel (`docs/screenshots/` in its repo) and
StatusForge (its n8n canvas). **Five still need one:** Market Intelligence Agent,
InVision, ClipIt, RAG Pipeline Debugger and RADAR. To add one:

1. Run the project, screenshot its interface at roughly 1440×900.
2. Save it as `public/projects/<slug>.webp` — 1440×750 works, the card is 1.92:1.
3. Add `cover` and `coverAlt` to that project in `src/data/projects.ts`.

### The activity graph

`src/app/api/contributions/route.ts` has two sources and falls through in order:

1. **GitHub's GraphQL API**, used when `GITHUB_TOKEN` is set. Same data that
   draws the graph on the profile page, current within minutes.
2. **A public mirror**, used when there is no token. It scrapes the profile page
   on its own schedule and can run a day or more behind.

Neither can be called from the browser: the REST API has no contributions
endpoint, the GraphQL endpoint rejects unauthenticated requests even for public
profiles, and the HTML graph sends no CORS headers. Hence the route.

**To get live data**, add a token in Vercel → Settings → Environment Variables:

- Name `GITHUB_TOKEN`, any environment.
- Create it at github.com/settings/tokens as a **fine-grained** token with
  **no repository access and no account permissions** — reading a public
  profile's contribution calendar needs a valid token, not a privileged one.
- Redeploy. The panel then reads "Live from GitHub" instead of naming the
  mirror.

Both paths are cached for ten minutes. If every source fails the route returns
an empty set and the section degrades to a link to the profile — it will not
break the page or the build.

## Deploying to Vercel

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new) —
it detects Next.js and needs no configuration. Every push to the default branch
redeploys.

Everything is prerendered except `/api/contributions`, which is incrementally
revalidated. There are still no environment variables and no secrets.

For a custom domain: Vercel project → Settings → Domains → add it, then point
your registrar's records where Vercel tells you. Update `siteUrl` to match and
redeploy.

## How it is put together

```
src/
  app/
    layout.tsx             fonts, metadata, JSON-LD, pre-paint theme script
    page.tsx               section composition
    globals.css            design tokens, type scale, the three animations
    opengraph-image.tsx    social card, generated at build time
    sitemap.ts robots.ts
  components/              one component per section, plus TopNav, Section,
                           ProjectCover, Reveal, Tag, ThemeToggle, CopyEmail,
                           BrandIcons
  data/                    all content
  lib/                     cn(), JSON-LD builder
public/
  resume.pdf
  portrait.webp            hero
  headshot.jpg             unused by the current layout; kept for square crops
  projects/*.webp          project covers
```

Section numbering, names and the line under each heading all come from
`src/data/sections.ts`. `Section` reads them by id, so the nav and the headings can
never drift out of step — add a section there and everything follows.

### Theming

Colours are CSS custom properties on `:root`, redefined under
`:root[data-theme="dark"]`.

**Light is the first impression for everyone.** The blocking script in
`layout.tsx` deliberately ignores the OS `prefers-color-scheme`: a visitor whose
machine is in dark mode still lands on white. Dark is opt-in through the toggle,
and only a choice made there is stored in `localStorage` and reapplied before
first paint, so a returning visitor never sees a flash of the wrong theme.

If you are testing and the page keeps opening dark, you toggled it at some
point — click the toggle once, or clear the site's local storage.

One accent (`--accent`, blue) carries every link, metric and active state.
`--ember` is a second hue used **only** as a marker — the status dot, the full stop
in a headline — and never for text you have to read, because it does not clear AA at
body size on paper.

Two things worth knowing before editing `globals.css`:

- Everything in that file is **unlayered**, so it outranks every Tailwind
  utility regardless of specificity. That is why there is no universal
  `border-color` rule — it would beat `hover:border-accent-line`.
- The `@theme inline` block does **not** emit its variables as real custom
  properties; it inlines them into generated utilities. Plain CSS in this file
  must reference the underlying variable (`var(--font-archivo)`), not the theme
  token (`var(--font-sans)`).

### Accessibility and motion

Semantic landmarks, a skip link, visible focus rings, `aria-current` on the
the current section in the nav, and a visible label or `aria-label` on every
control.
Text contrast measured at 7.35:1 (dark) and 5.99:1 (light) for muted body copy;
headings are far higher. `prefers-reduced-motion` collapses every animation and
turns off smooth scrolling. Scroll-reveal starts hidden, so a `<noscript>` rule
forces it visible when JavaScript is off.
