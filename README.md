# Eventra — Frontend (Next.js)

Frontend of the Event Management System built with **Next.js 14 App Router** and **Tailwind CSS**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Frontend framework (App Router) |
| Tailwind CSS | Styling |
| useState | Simple state management |
| fetch() | API calls to backend (no axios) |
| localStorage | Store token + user data |

---

## 📁 Folder Structure

```
client/
├── app/
│   ├── layout.jsx                        # Root layout
│   ├── page.jsx                          # Home page (/)
│   ├── not-found.jsx                     # 404 page
│   ├── loading.jsx                       # Global loading UI
│   ├── error.jsx                         # Global error UI
│   ├── (auth)/
│   │   ├── login/page.jsx                # /login ✅
│   │   └── register/page.jsx             # /register ✅
│   ├── events/
│   │   ├── page.jsx                      # /events ✅
│   │   └── [id]/page.jsx                 # /events/:id ✅
│   ├── create-event/
│   │   └── page.jsx                      # /create-event ✅
│   ├── booking/
│   │   └── [id]/
│   │       ├── page.jsx                  # /booking/:id ✅
│   │       └── success/page.jsx          # /booking/:id/success ✅
│   ├── dashboard/
│   │   ├── layout.jsx                    # Dashboard sidebar layout
│   │   ├── page.jsx                      # /dashboard ✅
│   │   ├── bookings/page.jsx             # /dashboard/bookings ✅
│   │   ├── tickets/page.jsx              # /dashboard/tickets ❌
│   │   ├── notifications/page.jsx        # /dashboard/notifications ❌
│   │   └── profile/page.jsx             # /dashboard/profile ❌
│   └── admin/
│       ├── layout.jsx                    # Admin sidebar layout
│       ├── page.jsx                      # /admin ✅
│       ├── users/page.jsx                # /admin/users ✅
│       ├── events/page.jsx               # /admin/events ❌
│       ├── bookings/page.jsx             # /admin/bookings ✅
│       ├── payments/page.jsx             # /admin/payments ❌
│       ├── categories/page.jsx           # /admin/categories ✅
│       └── reviews/page.jsx              # /admin/reviews ❌
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── DashboardSidebar.jsx
│   │   └── AdminSidebar.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Badge.jsx
│   │   ├── Avatar.jsx
│   │   ├── Spinner.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   ├── StarRating.jsx
│   │   ├── Toast.jsx
│   │   └── CategoryBadge.jsx             # ✅ Done
│   ├── cards/
│   │   ├── EventCard.jsx
│   │   ├── BookingCard.jsx
│   │   ├── TicketCard.jsx
│   │   └── StatCard.jsx
│   ├── forms/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── EventForm.jsx
│   │   ├── BookingForm.jsx
│   │   └── ProfileForm.jsx
│   ├── events/
│   │   ├── EventGrid.jsx
│   │   ├── EventFilter.jsx
│   │   ├── EventHero.jsx
│   │   ├── EventSchedule.jsx
│   │   └── EventReviews.jsx
│   ├── dashboard/
│   │   ├── BookingHistory.jsx
│   │   ├── NotificationList.jsx
│   │   └── UpcomingEvents.jsx
│   └── admin/
│       ├── UsersTable.jsx
│       ├── EventsTable.jsx
│       ├── BookingsTable.jsx
│       ├── PaymentsTable.jsx
│       └── AnalyticsChart.jsx
│
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── placeholder-event.jpg
│   └── icons/
│
├── middleware.js                         # Route protection
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── .env.local
```

---

## 🔐 Environment Variables — `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:9090/api
```

---

## 🚀 Getting Started

```bash
cd client
npm install
npm run dev
```

Frontend runs on: **http://localhost:3000**

---

## ✅ Completed Pages

| Page | Route | Status |
|---|---|---|
| Login | /login | ✅ Done |
| Register | /register | ✅ Done |
| Events Listing | /events | ✅ Done |
| Event Detail | /events/:id | ✅ Done |
| Create Event | /create-event | ✅ Done |
| Booking Page | /booking/:id | ✅ Done |
| Booking Success | /booking/:id/success | ✅ Done |
| User Dashboard | /dashboard | ✅ Done |
| My Bookings | /dashboard/bookings | ✅ Done |
| Admin Dashboard | /admin | ✅ Done |
| Admin Users | /admin/users | ✅ Done |
| Admin Bookings | /admin/bookings | ✅ Done |
| Admin Categories | /admin/categories | ✅ Done |
| Home | / | ❌ Not started |
| My Tickets | /dashboard/tickets | ❌ Not started |
| Notifications | /dashboard/notifications | ❌ Not started |
| Profile | /dashboard/profile | ❌ Not started |
| Admin Events | /admin/events | ❌ Not started |
| Admin Payments | /admin/payments | ❌ Not started |
| Admin Reviews | /admin/reviews | ❌ Not started |

---

## ✅ Completed Features — Detail

### Authentication
- [x] Register page — full form with validation, API connected
- [x] Login page — full form with validation, API connected
- [x] Token saved to localStorage on success
- [x] User data saved to localStorage on success
- [x] Redirect to /dashboard after login/register

### Category Module
- [x] Admin categories page — full CRUD (create, edit, soft delete)
- [x] Add/Edit modal with form validation
- [x] Category filter pills on events listing page
- [x] CategoryBadge reusable component (Active/Inactive)

### Event Module
- [x] Events listing page — fetch all events from API
- [x] Category filter pills — filter events by category
- [x] Event detail page — full event info with organizer details
- [x] Create event page — form for organizers (title, description,
      date, time, location, price, seats, category, image URL)

### Booking Module
- [x] Booking page — seat selector + live total price calculation
- [x] Confirm booking — POST to API with auth token
- [x] Booking success page — shows ticket code after confirmation
- [x] My bookings page — list all user bookings with status badges
- [x] Cancel booking — PUT request with confirmation dialog
- [x] In-place status update after cancel (no re-fetch)

### Admin Panel
- [x] Admin dashboard — analytics stats cards
      (total users, events, bookings, confirmed, cancelled, revenue)
- [x] Quick links to all admin sections
- [x] Admin bookings page — all bookings table with status filter pills
- [x] Admin users page — all users table with activate/deactivate toggle
- [x] Role badges (admin/organizer/user) with different colors
- [x] Admin categories page — full category management

---

## 📋 What's Next (Frontend)

- [ ] Home page — hero section, featured events, category pills, stats bar
- [ ] Navbar + Footer components
- [ ] My tickets page — /dashboard/tickets
- [ ] Notifications page — /dashboard/notifications
- [ ] Profile update page — /dashboard/profile
- [ ] Admin events page — /admin/events
- [ ] Admin payments page — /admin/payments
- [ ] Admin reviews page — /admin/reviews
- [ ] Payment flow pages
- [ ] Reviews section on event detail page

---

## 🎨 Design System

| Element | Value |
|---|---|
| Primary Color | `#0f172a` (Deep Navy) |
| Background | `#fafaf9` (Warm White) |
| Accent | `#b8960c` (Gold) |
| Heading Font | Georgia, serif |
| Body Font | System default |
| Border Radius | `rounded-md` (6px) |
| Transition | `200ms ease` |
| Card Style | `bg-white border border-gray-200 rounded-lg shadow-sm` |

---

## 🗺️ Page to Route Map

| File | URL | Status |
|---|---|---|
| `app/page.jsx` | `/` | ❌ |
| `app/(auth)/login/page.jsx` | `/login` | ✅ |
| `app/(auth)/register/page.jsx` | `/register` | ✅ |
| `app/events/page.jsx` | `/events` | ✅ |
| `app/events/[id]/page.jsx` | `/events/123` | ✅ |
| `app/create-event/page.jsx` | `/create-event` | ✅ |
| `app/booking/[id]/page.jsx` | `/booking/123` | ✅ |
| `app/booking/[id]/success/page.jsx` | `/booking/123/success` | ✅ |
| `app/dashboard/page.jsx` | `/dashboard` | ✅ |
| `app/dashboard/bookings/page.jsx` | `/dashboard/bookings` | ✅ |
| `app/dashboard/tickets/page.jsx` | `/dashboard/tickets` | ❌ |
| `app/dashboard/notifications/page.jsx` | `/dashboard/notifications` | ❌ |
| `app/dashboard/profile/page.jsx` | `/dashboard/profile` | ❌ |
| `app/admin/page.jsx` | `/admin` | ✅ |
| `app/admin/users/page.jsx` | `/admin/users` | ✅ |
| `app/admin/bookings/page.jsx` | `/admin/bookings` | ✅ |
| `app/admin/categories/page.jsx` | `/admin/categories` | ✅ |
| `app/admin/events/page.jsx` | `/admin/events` | ❌ |
| `app/admin/payments/page.jsx` | `/admin/payments` | ❌ |
| `app/admin/reviews/page.jsx` | `/admin/reviews` | ❌ |

---

## 📊 Frontend Progress

```
Auth (Login + Register)     ████████████████████  100%
Category Module             ████████████████████  100%
Event Module                ████████████████████  100%
Booking Module              ████████████████████  100%
Admin Dashboard             ████████████████░░░░   80%
User Dashboard              ████████░░░░░░░░░░░░   40%
Home Page                   ░░░░░░░░░░░░░░░░░░░░    0%
Navbar + Footer             ░░░░░░░░░░░░░░░░░░░░    0%
Payment Module              ░░░░░░░░░░░░░░░░░░░░    0%
Reviews Module              ░░░░░░░░░░░░░░░░░░░░    0%
Notifications               ░░░░░░░░░░░░░░░░░░░░    0%

Overall Frontend            ████████████░░░░░░░░   60%
```

---

*Last updated: May 2026*