# frontend-template-v1

A frontend-first starter for simple websites and webpages, structured as a Bun workspaces monorepo so a backend can be added later without restructuring anything. By default only the frontend runs — the `api` app is an optional scaffold for when a client needs auth, a database, or server logic.

## Stack

**Frontend (`apps/web`)**
- **[Vite](https://vite.dev/)** — build tool and dev server
- **[React 19](https://react.dev/)** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com/)** — via `@tailwindcss/vite`, no PostCSS config needed
- **[shadcn/ui](https://ui.shadcn.com/)** — copy-in component library (`Button` included)
- **[framer-motion](https://motion.dev/)** — animation
- **[react-icons](https://react-icons.github.io/react-icons/)** — icon packs
- **[react-spinners](https://www.davidhu.io/react-spinners/)** — loading spinners

**Backend (`apps/api`) — optional, scaffolded but not wired up by default**
- **[Hono](https://hono.dev/)** — lightweight server framework
- **[Drizzle ORM](https://orm.drizzle.team/)** + **PostgreSQL** (`pg` driver)
- Runs on **[Bun](https://bun.sh/)**

**Tooling**
- **Bun** — package manager, workspace runner, and runtime for the API (replaces npm/node everywhere)

## Project structure

```
apps/
  web/                  # frontend — the only app that runs by default
    src/
      components/ui/    # shadcn components (Button, etc.)
      lib/utils.ts       # cn() helper (clsx + tailwind-merge)
      index.css          # Tailwind v4 import + shadcn theme variables (light/dark)
      App.tsx            # demo page — replace with your own content
      main.tsx           # React root mount
    components.json      # shadcn/ui config
    vite.config.ts        # Vite + Tailwind v4 plugin + @ path alias
  api/                   # backend — optional, add only if the project needs one
    src/
      index.ts           # Hono app entry, has a /api/health route
      db/
        schema.ts         # Drizzle table definitions
        index.ts          # Drizzle client (reads DATABASE_URL)
    drizzle.config.ts      # drizzle-kit config
    .env.example           # DATABASE_URL, PORT
package.json             # workspace root — defines apps/* as workspaces
```

## Getting started

Install once from the repo root — Bun resolves both workspaces:

```bash
bun install
```

### Frontend only (default)

```bash
bun run dev       # starts apps/web on http://localhost:5173
bun run build     # production build to apps/web/dist/
```

### Adding the backend

```bash
bun run dev:api    # starts apps/api on http://localhost:3000
```

Before running the API, copy `apps/api/.env.example` to `apps/api/.env` and set `DATABASE_URL` to a real Postgres connection string. Then:

```bash
cd apps/api
bun run db:generate   # generate a migration from src/db/schema.ts
bun run db:migrate    # apply migrations
bun run db:studio     # browse the database
```

Running both frontend and backend at once just means running `bun run dev` and `bun run dev:api` in separate terminals (or wire up a `concurrently`-style script if you want a single command).

## Adding more shadcn components

```bash
cd apps/web
bunx shadcn add card
bunx shadcn add input
bunx shadcn add dialog
```

Components land in `apps/web/src/components/ui/` and are yours to edit directly — there's no library to upgrade later.

## Path aliases

In `apps/web`, `@/*` resolves to `src/*`:

```ts
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

Configured in both `tsconfig.app.json` (for the TS server) and `vite.config.ts` (for the bundler).

## Styling

Tailwind v4 is wired up via the `@tailwindcss/vite` plugin — no `tailwind.config.js` or `postcss.config.js` required. Theme tokens (colors, radius, etc.) live in `apps/web/src/index.css` as CSS variables under `:root` and `.dark`, mapped through `@theme inline` for Tailwind utility classes. Toggle dark mode by adding/removing the `dark` class on a parent element (e.g. `<html>`).

## When to add the backend

Start with just `apps/web` for static pages, marketing sites, and portfolios. Add `apps/api` once the client needs persistent data, user accounts, or server-side logic — the scaffold is already wired for Hono + Drizzle + PostgreSQL, matching the full stack used elsewhere (Vite + React + Hono + Drizzle + PostgreSQL + Bun), so there's no migration cost to bring it in later.
