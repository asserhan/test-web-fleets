# Fleets

Create and browse company "fleets", in French and English.

A fleet is a grouping of companies. The `/fleets` page lists every fleet the
user owns with infinite scroll, and lets them create a new one through an
overlay with a live preview.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Database | PostgreSQL 16 + Prisma 7 (`@prisma/adapter-pg`) |
| Client data | TanStack Query 5 (`useInfiniteQuery`, `useMutation`) |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) |
| i18n | Intlayer 9 (`prefix-all` routing) |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Modal state | Zustand |

## Getting started

### Prerequisites

- Node.js 20+
- Docker, for PostgreSQL. Any other PostgreSQL instance works too — just point
  `DATABASE_URL` at it.

### Install

```bash
npm install
cp .env.example .env
```

`.env` holds two variables:

```dotenv
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fleets?schema=public"
DEMO_USER_EMAIL="demo@histia.net"
```

There is no authentication in this exercise. Fleets belong to a demo user that
the seed creates and the server resolves from `DEMO_USER_EMAIL`.

### Database

```bash
npm run db:setup
```

That runs four steps in order: start the PostgreSQL container, wait for it to
accept connections, apply migrations, then seed — a demo user plus 18 fleets,
which is enough to trigger a second page of infinite scroll.

### Run

```bash
npm run dev
```

Then open <http://localhost:3000/fleets>.

## Routes

| URL | Purpose |
|---|---|
| `/fleets` | redirects to `/fr/fleets` |
| `/fr/fleets` | French version |
| `/en/fleets` | English version |
| `GET /api/fleets?limit=&cursor=` | cursor-paginated list |
| `POST /api/fleets` | create a fleet |

Language is switched through the URL, so no language switcher is needed. Every
string lives in `src/content/fleets.content.ts`.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm run lint` | ESLint |
| `npm run db:setup` | container + migrations + seed |
| `npm run db:up` / `db:down` | start / stop PostgreSQL |
| `npm run db:migrate` | create a migration |
| `npm run db:seed` | seed (skipped if fleets already exist) |
| `npm run db:studio` | Prisma Studio |

To regenerate the demo fleets:

```bash
SEED_RESET=true npm run db:seed
```

## Features

**Fleet list.** Cursor pagination on `(createdAt, id)`, 12 fleets per page. The
next page is requested 200px before the bottom of the scroll area, behind a
custom scrollbar matching Figma.

**Creation overlay.** The "Créer une flotte" button opens an overlay composed
from the modal components provided in `src/components/modal`.

**Live preview.** The card on the left reflects the title, description and
colour as they are typed. The title also updates the breadcrumb above the card.
Empty values fall back to the "Titre" and "Description" placeholders.

**Tilt effect.** The preview card tilts in 3D on hover (±8°, spring-damped on
both entry and return) using `useMotionValue` and `useSpring`.

**No-reload updates.** On create, the mutation invalidates the TanStack Query
cache, so the new fleet appears at the top of the list without a page reload.

**Validation.** One Zod schema is shared by client and server. The title is
required, the colour is constrained to the palette, and the title error message
is translated.

**Loading, empty and error states.** Skeletons reusing the card's exact
geometry on first load and at the end of the list while the next page is
fetching; an empty state when the user has no fleets; and error messages if
either the list or the creation request fails.

**Bilingual.** French and English throughout, including placeholders,
`aria-label`s and validation messages.

**Responsive.** Targets 1920×1080 and 1400×900. Figma values are used verbatim
for 1920; smaller viewports are handled by `src/styles/fleets-responsive.css`
for the list and by `max-[…]` variants for the overlay.

## Layout

```
app/
  fleets/page.tsx            redirect to /fr/fleets
  [locale]/fleets/page.tsx   localised page
  [locale]/layout.tsx        providers (Intlayer, TanStack Query) + #app-root
  api/fleets/route.ts        paginated GET + POST
src/
  components/
    button/  modal/  background/   provided by the exercise (unmodified)
    fleets/                        FleetsPage, Repertoire, FleetCard,
                                   CreateFleetModal, FleetForm, FleetPreview
  content/fleets.content.ts        Intlayer FR/EN dictionary
  lib/
    api/fleets.ts                  fetch client
    queries/fleet-keys.ts          TanStack Query keys
    validations/fleet.ts           shared Zod schemas
    prisma.ts                      Prisma singleton
    users/demo-user.ts             demo user resolution
prisma/
  schema.prisma  migrations/  seed.ts
```

## Implementation notes

The provided components (`src/components/modal`, `src/components/button`) are
integrated without any modification. The overlay uses `Modal`, `Modal.Overlay`,
`Modal.Content` and `Modal.Return`, identified by `MODAL_IDS.createFleet` and
driven by the Zustand store — which is where the portal, Escape handling, body
scroll lock and backdrop treatment come from. Buttons use the `danger`,
`ghostMonochrome` and `ghostMedium` variants.

The project's Tailwind theme redefines the type scale in `@theme`: `text-sm` is
18px and `text-xl` is 40px, not the Tailwind defaults. Figma sizes are therefore
written as explicit pixel values or with the project's own tokens (`text-sx` for
14px, `text-s` for 16px).
