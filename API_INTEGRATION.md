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
| Properties list page | GET | `/api/properties` | Supports `searchTerm`, `location`, `minRent`, `maxRent`, `bedrooms`, `bathrooms`, `type` (category slug), `isFeatured`, `isAvailable`, `sortBy`, `sortOrder`, `page`, `limit` query params |
| `getPropertyById()` (`_actions/propertyActions.ts`) → `PropertiesByIdPage` | GET | `/api/properties/:id` | |
| `getAllCategories()` / `getAllCategoriesFull()` (`_actions/propertyActions.ts`) → `PropertyForm` (category `<Select>`) | GET | `/api/categories` | `getAllCategories` returns slugs only (`string[]`); `getAllCategoriesFull` returns full `ICategory[]` — form needs the full version to auto-fill `name`/`description` hidden fields |

## Rentals — Tenant

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `requestProperty()` (`_actions/rentalActions.ts`) → `RequestPropertyDialog` | POST | `/api/rentals` | Body: `{propertyId, startDate, durationMonths, message}` |
| `getMyRentals()` (`app/dashboard/tenant/_actions/tenantActions.ts`) → `RequestsSection` | GET | `/api/rentals` | Returns requests with nested `property {title, isAvailable}`, `tenant {name}`, `review {rating} \| null` |

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
| `submitReview()` (`app/dashboard/tenant/_actions/reviewActions.ts`) → `LeaveReviewDialog` | POST | `/api/reviews` | Body: `{rentalId, rating, comment}`; shown only when `status` is `ACTIVE`/`COMPLETED` and no review exists yet |

## Landlord

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `getMyProperties()` (`app/dashboard/_actions/landlordActions.ts`) → `LandlordPropertiesPage`, `PropertyRow`, edit page prefill | GET | `/api/landlord` | ⚠️ Not nested under `/landlord/properties` like the others — confirm this isn't a typo |
| `createProperty()` → `PropertyForm` (create mode) | POST | `/api/landlord/properties` | Body requires nested `category: {slug, name, description}` — backend `upsert`s by slug; sending only `slug` with empty `name`/`description` will error if the slug doesn't already exist |
| `updateProperty()` → `PropertyForm` (edit mode) | PATCH | `/api/landlord/properties/:id` | Body: `{title?, description?, image?, rent, isAvailable}` — only these fields are accepted per `IUdateProertyPayload`; `location`/`bedrooms`/`bathrooms`/`category` are **not** editable via this endpoint currently |
| `deleteProperty()` → `PropertyRow` | DELETE | `/api/landlord/properties/:id` | Confirm dialog before calling |
| `getMyRequests()` (`app/dashboard/landlord/requests/`) → `RequestsPageContent` | GET | `/api/landlord/requests` | Returns `tenant {id, name, email}`, `property {id, title, rent}` |
| `updateRequestStatus()` → `RequestsPageContent` (Approve/Reject buttons) | PATCH | `/api/landlord/requests/:id` | Body: `{status: "APPROVED" \| "REJECTED"}` — do **not** send `"ACTIVE"`, that transition happens automatically via the payment webhook |
| `getMyReviews()` → `LandlordReviewsPage` | GET | `/api/landlord/reviews` | Reviews across all of the landlord's properties |

## Admin — *not yet built*

| Frontend | Method | Endpoint | Notes |
|---|---|---|---|
| `/dashboard/admin` overview | GET | `/api/admin/users` | Also needs a properties/requests overview source — endpoint TBD |
| User ban/unban action | PATCH | `/api/admin/users/:id` | Payload shape unconfirmed — likely `{status: "ACTIVE" \| "BANNED"}` per the `UserStatus` enum |

---

## Known open items

- **`getMyProperties()` hits `/api/landlord`** while every sibling landlord action is nested under `/api/landlord/properties` or `/api/landlord/requests` — verify this is intentional.
- **`updateProperty` currently sends `PUT` in one version, `PATCH` in another** across this codebase's history — confirm which the backend route actually registers before shipping.
- **Category editing on update is unresolved**: `createProperty` uses a nested `category` object (upserted by slug), but `updateProperty`'s Prisma call would need a flat `categoryId` FK — these two are not symmetric, and update-time category changes aren't wired up yet.
- **Admin endpoints are unconfirmed** — no sample requests/responses have been tested yet for `/api/admin/users`.
- **Ownership/authorization gaps found during backend review** (should be fixed before ship): `getPaymentById` allowed any tenant to fetch any payment by ID; `updateRentalStatus` initially had no landlord-ownership check; `POST /api/payments/create`'s route allowed `LANDLORD` role through despite the service rejecting it.