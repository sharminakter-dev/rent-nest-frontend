# API Integration — RentNest Frontend

Maps every frontend component/action to the backend endpoint it consumes. All requests to protected endpoints send the `accessToken` cookie via a `cookie` header (see `authHeaders()` in each `_actions` file). Base URL: `process.env.BACKEND_API_URL`.

---

## Auth

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `loginAction` (`app/(auth_group)/auth/login/_actions/authAction.ts`) → `LoginForm` | POST | `/api/auth/login` | Sets `accessToken`/`refreshToken` cookies on success, redirects via `redirectTo` query param or role-based dashboard |
| `registerAction` (same file) → `RegisterForm` | POST | `/api/auth/register` | Same cookie/redirect behavior as login |
| `getMe()` (`service/getMe.ts`) → `RootLayout`, `Navbar`, dashboard `layout.tsx` | GET | `/api/auth/me` | Reads `accessToken` cookie; returns `{success, data: {result: {...IUserProfile}}}` |
| `logout()` (`service/logOut.ts`) → `Navbar`, `DashboardSidebar` | — | Clears auth cookies client/server side | Used by both nav dropdown and sidebar sign-out |
| `middleware.ts` (`proxy.ts`) | — | — | Route guarding: redirects unauthenticated users to `/auth/login?redirectTo=...`, role-gates `/dashboard/{tenant,landlord,admin}` |

## Properties (public)

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| Properties list page | GET | `/api/properties` | Supports `searchTerm`, `location`, `minRent`, `maxRent`, `bedrooms`, `bathrooms`, `type` (category slug), `isFeatured`, `isAvailable`, `sortBy`, `sortOrder`, `page`, `limit` query params. **Advanced filter UI not yet built** — backend supports all of these, frontend doesn't send them yet. |
| `getPropertyById()` (`_actions/propertyActions.ts`) → `PropertiesByIdPage` | GET | `/api/properties/:id` | |
| `getAllCategories()` / `getAllCategoriesFull()` (`_actions/propertyActions.ts`) → `PropertyForm` (category `<Select>`) | GET | `/api/categories` | `getAllCategories` returns slugs only (`string[]`); `getAllCategoriesFull` returns full `ICategory[]` — form needs the full version to auto-fill `name`/`description` hidden fields |

## Rentals — Tenant

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `requestProperty()` (`_actions/rentalActions.ts`) → `RequestPropertyDialog` | POST | `/api/rentals` | Body: `{propertyId, startDate, durationMonths, message}` |
| `getMyRentals()` (`app/dashboard/tenant/_actions/tenantActions.ts`) → `RequestsSection` | GET | `/api/rentals` | Returns requests with nested `property {title, isAvailable}`, `tenant {name}`, `review {rating} \| null` |
| `cancelRentalRequest()` → `RequestRow` (Cancel button) | — | `/api/rentals/:id` (assumed — confirm method/path) | Shown only while `canCancelRequest(status)` — needs backend verification |

## Payments — Tenant

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `initiatePayment()` (`app/dashboard/_actions/paymentActions.ts`) → `PayRequestForm` (`/dashboard/tenant/requests/[id]/pay`) | POST | `/api/payments/create` | Body: `{rentalRequestId}`; response `data` is a raw Stripe Checkout URL string — action calls `redirect()` on it directly |
| `getMyPayments()` (`app/dashboard/tenant/_actions/tenantActions.ts`) → `PaymentsSection` | GET | `/api/payments` | Amounts are in cents; `status: SUCCESS \| FAILED \| PENDING \| REFUNDED` |
| `getPaymentForRequest()` (`app/dashboard/_actions/paymentActions.ts`) → `/payment/success` page | GET | `/api/payments` (client-filters by `rentalRequestId`) | Confirms real payment status post-redirect rather than trusting the Stripe redirect alone, since confirmation is async via webhook |
| — (backend only, no frontend caller) | POST | `/api/payments/confirm` | Stripe webhook target — must receive raw body, not JSON-parsed |

## Reviews — Tenant

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `submitReview()` (`app/dashboard/tenant/_actions/reviewActions.ts`) → `ReviewDialog` | POST | `/api/reviews` | Body: `{rentalId, rating, comment}`; shown only when `status` is `ACTIVE`/`COMPLETED` and no review exists yet |

## Landlord

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `getMyProperties()` (`app/dashboard/_actions/landlordActions.ts`) → `LandlordPropertiesPage`, `PropertyRow`, edit page prefill, `LandlordDashboard` overview | GET | `/api/landlord` | ⚠️ Not nested under `/landlord/properties` like the others — confirmed intentional, not a typo, per backend service review |
| `createProperty()` → `PropertyForm` (create mode) | POST | `/api/landlord/properties` | Body requires nested `category: {slug, name, description}` — backend `upsert`s by slug; form auto-fills `name`/`description` via hidden inputs sourced from `getAllCategoriesFull()` |
| `updateProperty()` → `PropertyForm` (edit mode) | PATCH | `/api/landlord/properties/:id` | Body: `{title?, description?, image?, rent, isAvailable}` (`isAvailable` required, rest optional per `IUdateProertyPayload`) — `location`/`bedrooms`/`bathrooms`/`categoryId` are **not** wired into the edit form yet, though the backend interface now accepts them |
| `deleteProperty()` → `PropertyRow` | DELETE | `/api/landlord/properties/:id` | Confirm dialog before calling |
| `getMyRequests()` (`app/dashboard/landlord/requests/`) → `RequestActionRow` | GET | `/api/landlord/requests` | Returns `tenant {id, name, email}`, `property {id, title, rent}` |
| `updateRequestStatus()` → `RequestActionRow` (Approve/Reject buttons) | PATCH | `/api/landlord/requests/:id` | Body: `{status: "APPROVED" \| "REJECTED"}` — do **not** send `"ACTIVE"`, that transition happens automatically via the payment webhook |
| `getMyReviews()` → `LandlordReviewsPage` | GET | `/api/landlord/reviews` | Reviews across all of the landlord's properties |

## Admin

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `getAllUsers()` (`app/dashboard/_actions/adminActions.ts`) → `UsersSection` | GET | `/api/admin/users` | Returns `AdminUserRecord[]` — profile, role, status, phone, etc. **No search/pagination UI or query params sent yet** — spec requires both. |
| `getAllProperties()` → `ListingsSection` | GET | `/api/admin/properties` | Platform-wide listing view, read-only |
| `getAllRentals()` → `RentalsSection` | GET | `/api/admin/rentals` | Platform-wide rental request view, read-only |
| `updateUserStatus()` → `UsersSection` (Ban/Reactivate buttons) | PATCH | `/api/admin/users/:id` | Body: `{status: "ACTIVE" \| "BANNED"}`; revalidates `/dashboard/admin` on success |
| `AdminDashboard` (`app/dashboard/admin/_components/AdminDashboard.tsx`) | — | — | `AdminDashboardPage` fetches all three lists + `getMe()` in parallel via `Promise.all` |

⚠️ **Endpoints are wired up in code but responses haven't been verified against real Postman samples yet** (unlike tenant/landlord, which were confirmed against actual payloads throughout development).

**Not yet built:** content-moderation *write* actions (force-unlisting a property, removing a rental request) — `ListingsSection`/`RentalsSection` are read-only views only.

---

## Loading & error states

| Route | `loading.tsx` | `error.tsx` |
|---|---|---|
| `/properties/[id]` | ✅ | inherits root |
| `/properties` (list) | should add | inherits root |
| `/dashboard/tenant` | ✅ | inherits `/dashboard` |
| `/dashboard/landlord` | ✅ | inherits `/dashboard` |
| `/dashboard/landlord/properties` | ✅ | inherits `/dashboard` |
| `/dashboard/landlord/requests` | ✅ | inherits `/dashboard` |
| `/dashboard/admin` | ✅ | inherits `/dashboard` (or own, optional) |
| `/payment/success` | should add | inherits root |
| `app/dashboard/*` (all dashboard routes) | — | ✅ `app/dashboard/error.tsx` — keeps sidebar mounted |
| Everything else | — | ✅ `app/error.tsx` root fallback |

**Client-side action error handling**: server actions invoked directly from client components (`PropertyRow.handleDelete`, `RequestActionRow.handleAction`, `UsersSection.handleStatus`, `RequestRow.handleCancel`) should each wrap their `await` in `try/catch` — a thrown error (network failure, non-JSON response) inside an event handler is **not** caught by React error boundaries, so without explicit `try/catch` the user gets silent failure (stuck loading state, no toast) rather than feedback. Confirm this pattern is applied to all four call sites.

---

## Known open items

- **`updateProperty` HTTP method drift** — confirm the backend route registers `PATCH` (not `PUT`) before shipping; both appeared at different points in development.
- **Category editing on update is unresolved** — `createProperty` uses a nested `category` object (upserted by slug); `updateProperty`'s Prisma call takes a flat `categoryId` FK. These aren't symmetric, and category isn't currently editable via the edit form.
- **`cancelRentalRequest`'s endpoint is unconfirmed** — referenced in `RequestRow` but never verified against a real backend route/payload in this document's history.
- **Admin endpoints unverified** — `/api/admin/{users,properties,rentals}` and the ban/unban `PATCH` payload are wired in code but not confirmed against real responses.
- **Ownership/authorization gaps found during backend review** (fix before ship): `getPaymentById` initially allowed any tenant to fetch any payment by ID; `updateRentalStatus` initially had no landlord-ownership check; `POST /api/payments/create`'s route allowed `LANDLORD` role through despite the service rejecting it. Fixes were proposed inline during development — confirm they made it into the deployed backend.
- **Single image per property** — `Property.image` is `String?`, not an array/relation. A true multi-photo gallery on the details page isn't possible without a schema change (`images String[]` or a `PropertyImage` model). Current UI shows one image only.
- **Advanced search/filter UI not built** — backend fully supports `searchTerm`/`location`/`minRent`/`maxRent`/`bedrooms`/`bathrooms`/`type`; no frontend filter bar sends these yet.
- **Admin user table has no search or pagination** — spec requires both; `UsersSection` currently renders the full unfiltered list.
- **Home page (`/`) with featured properties not built** — route table specifies `GET /api/properties` (likely `isFeatured=true`) powering a home page; development went straight to `/properties`.