<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-app-client

Single-package Next.js 16 (App Router) app with shadcn/ui and better-auth. No monorepo, no test runner, no CI.

## Developer commands

- `npm run dev` — dev server (port 3000 via `BETTER_AUTH_URL`); also regenerates the AGENTS.md header block above — commit it, don't remove it
- `npm run build` — `next build`
- `npm run start` — `next start` production server
- `npm run lint` — eslint with `eslint-config-next` (core-web-vitals + typescript rules)
- `npm run format` — `prettier --write "**/*.{ts,tsx}"` (tailwind class sorting via `prettier-plugin-tailwindcss`; `cn`/`cva` registered as tailwind functions)
- `npm run typecheck` — `tsc --noEmit`

Suggested local verification order: `lint -> typecheck -> build`. There is no `test` script or test framework installed.

## Paths & imports

- Path alias `@/*` maps to the repo root: `import { Button } from "@/components/ui/button"`.
- App Router: `app/layout.tsx` (root), `app/page.tsx` (home). Auth API route: `app/api/auth/[...all]/route.ts` (`POST`/`GET` via `toNextJsHandler`).
- shadcn/ui components live in `components/ui/`; add new ones with `npx shadcn@latest add <component>` (see README). Style is `base-nova`, RSC enabled (components.json).
- `components/theme-provider.tsx` wraps the app in next-themes; dark-mode hotkey is the `d` key (ignored while typing).

## Auth (better-auth)

- Server: `lib/auth.ts` — better-auth with `@better-auth/mongo-adapter`. MongoDB URI is hardcoded to `mongodb://localhost:27017/database`, db name `hireloopdb` — a local MongoDB instance is required for email/password auth.
- Route handler: `app/api/auth/[...all]/route.ts`. Client: `lib/auth-client.ts` (`createAuthClient` from `better-auth/react`; exports `signIn`, `signUp`, `useSession`).
- Google provider needs `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## Environment

- `.env` is gitignored — create it locally, never commit. Required: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (http://localhost:3000), plus Google OAuth secrets if using social sign-in.
- `next-env.d.ts` is generated and gitignored — don't edit or commit it.
- `.next/`, `out/`, `build/` are build outputs, gitignored.

## Styling

- Tailwind CSS 4 (`@tailwindcss/postcss`); design tokens live in `app/globals.css` (`@theme inline` block plus `:root`/`.dark` variables). Add new tokens to the inline theme block rather than inventing arbitrary class values.
- Run `npm run format` before committing so tailwind class order matches prettier-plugin-tailwindcss.

## Working-tree note

- `package.json`/`package-lock.json` and the auth files (`lib/auth.ts`, `lib/auth-client.ts`, `app/api/auth/...`) have uncommitted changes in the working tree — check `git status` before assuming a clean tree.
