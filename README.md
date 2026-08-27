# RentNest — Frontend

**Live demo:** [https://rentnest-frontend-beryl.vercel.app](https://rentnest-frontend-beryl.vercel.app)
**Backend (production):** [https://rent-nest-psi-ten.vercel.app](https://rent-nest-psi-ten.vercel.app)

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

Local development (`.env.local`):
```env
# accessible from server components or server functions only
BACKEND_API_URL=http://localhost:5000
JWT_ACCESS_SECRET=<match backend's access token secret exactly>
JWT_REFRESH_SECRET=<match backend's refresh token secret exactly>

# accessible from the client and from server components/functions
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
```

Production (Vercel project settings): same variable names, values pointing at the deployed backend —
```env
BACKEND_API_URL=https://rent-nest-psi-ten.vercel.app
NEXT_PUBLIC_BACKEND_API_URL=https://rent-nest-psi-ten.vercel.app
JWT_ACCESS_SECRET=<production secret — must match the deployed backend's, and should differ from the local dev secret>
JWT_REFRESH_SECRET=<production secret — same requirement>
```

| Variable | Purpose |
|---|---|
| `BACKEND_API_URL` | Server-only base URL of the backend API, used by every `_actions/*.ts` server action (`fetch` calls in `authHeaders()`-based requests) |
| `JWT_ACCESS_SECRET` | Must match the backend's access token signing secret exactly — used to verify/decode the `accessToken` cookie server-side (`proxy.ts` middleware, `getMe`, page-level role checks) |
| `JWT_REFRESH_SECRET` | Must match the backend's refresh token signing secret exactly — used by `proxy.ts` to verify the `refreshToken` cookie when silently refreshing an expired access token |
| `NEXT_PUBLIC_BACKEND_API_URL` | Client-exposed backend URL (any `NEXT_PUBLIC_*` var is bundled into client JS and visible in the browser) — ⚠️ not currently referenced by any component built so far in this codebase; confirm whether this is intentionally reserved for future client-side `fetch` calls (e.g. a client component polling an endpoint directly) or safe to remove if unused |

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