# RentNest — Frontend

A role-based rental marketplace built with Next.js App Router. Tenants browse and request properties, landlords manage listings and requests, admins moderate the platform. See [`API_INTEGRATION.md`](./API_INTEGRATION.md) for the full frontend-to-backend endpoint map.

## Tech stack

- **Next.js 16.2** (App Router, Turbopack, Server Actions), **React 19.2**
- **TypeScript 5**
- **Tailwind CSS 4** + shadcn/ui components on **Base UI** primitives (`@base-ui/react`) — not Radix, see conventions below
- **Stripe Checkout** for payments
- **Sonner** for toast notifications
- **jsonwebtoken** for server-side JWT verification (middleware, `getMe`, page-level role checks)
- **Prettier** (with `prettier-plugin-tailwindcss` for class sorting) + **ESLint 9** for formatting/linting

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

### Environment variables

| Variable | Purpose |
|---|---|
| `BACKEND_API_URL` | Base URL of the backend API (e.g. `http://localhost:5000`) |
| `JWT_ACCESS_SECRET` | Must match the backend's access token secret — used to verify/decode the `accessToken` cookie server-side (middleware, `getMe`, page-level role checks) |

### Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Turbopack dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all `.ts`/`.tsx` files with Prettier |
| `npm run typecheck` | Type-check the project without emitting output |

## Project structure

```
app/
  (public_group)/          # home, /properties, /properties/[id] — public routes
  (auth_group)/auth/        # /auth/login, /auth/register
  dashboard/
    layout.tsx               # role-aware sidebar shell
    tenant/                   # overview, request history, payments (hash-tab sections)
      requests/[id]/pay/       # Stripe Checkout initiation
    landlord/                 # overview, properties (CRUD), requests, reviews
    admin/                     # overview, users, listings, requests (moderation views)
  payment/
    success/ cancel/          # Stripe redirect targets
components/
  ui/                        # shadcn/ui primitives
  shared/Navbar.tsx
  entity-avatar.tsx           # shared avatar-with-fallback used across admin/landlord lists
  request-status-badge.tsx    # PENDING/APPROVED/REJECTED/ACTIVE/COMPLETED badge + gating helpers
  payment-status-badge.tsx
lib/types.ts                 # shared domain types (IProperty, IRentalRequest, IPayment, etc.)
middleware.ts (proxy.ts)     # auth + role-based route protection
```

## Auth & routing model

- JWT `accessToken`/`refreshToken` stored as `httpOnly` cookies, set by the backend on login/register.
- `middleware.ts` redirects unauthenticated users to `/auth/login?redirectTo=<original path>`, and role-gates `/dashboard/{tenant,landlord,admin}` by decoding the JWT.
- Each dashboard route reads the JWT independently (via `jwtUtils.verifyToken`) for the same role check at the page level, since middleware alone shouldn't be the only enforcement layer.
- Tenant/admin dashboards use **hash-anchor sections** (`/dashboard/tenant#requests`) for sub-navigation on a single page; landlord uses **real nested routes** (`/dashboard/landlord/properties`) since property CRUD needs distinct URLs (create/edit forms).

## Known limitations (see `API_INTEGRATION.md` for full detail)

- Single image per property — no gallery (backend `Property.image` is a single nullable string, not an array).
- No advanced search/filter UI on the public properties list, despite backend support for it.
- Admin user table has no search or pagination yet.
- Several admin/rental endpoints are wired in code but not yet verified against real backend responses — flagged inline in `API_INTEGRATION.md`.
- No `/` home page with featured properties yet — development went straight to `/properties`.

## Conventions worth knowing before contributing

- **UI library is Base UI, not Radix** — trigger components (`DialogTrigger`, `SheetTrigger`) use `render={<Component />}` with no `asChild` prop; buttons wrapping a `Link` need `nativeButton={false}` or you'll hit a hydration/console error.
- **Server actions returning form state** follow the `{success, statusCode?, message?, data?, errors?}` shape (see `PropertyFormState`, `SubmitReviewState` in `lib/types.ts`) — reuse this pattern for new forms rather than inventing a new shape.
- **Client components that call a server action directly** (not through `useActionState`) should wrap the call in `try/catch` — a thrown fetch/parse error inside an event handler isn't caught by React error boundaries.