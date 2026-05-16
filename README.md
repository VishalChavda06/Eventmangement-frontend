# Eventra — Frontend (Next.js)

Frontend of the Event Management System built with **Next.js 14 App Router** and **Tailwind CSS**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Frontend framework (App Router) |
| Tailwind CSS | Styling |
| useState | Simple state management |
| fetch() | API calls to backend |
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
│   │   ├── login/page.jsx                # /login
│   │   └── register/page.jsx             # /register
│   ├── events/
│   │   ├── page.jsx                      # /events
│   │   └── [id]/page.jsx                 # /events/:id
│   ├── create-event/
│   │   └── page.jsx                      # /create-event
│   ├── booking/
│   │   └── [id]/
│   │       ├── page.jsx                  # /booking/:id
│   │       └── success/page.jsx          # /booking/:id/success
│   ├── dashboard/
│   │   ├── layout.jsx                    # Dashboard sidebar layout
│   │   ├── page.jsx                      # /dashboard
│   │   ├── bookings/page.jsx             # /dashboard/bookings
│   │   ├── tickets/page.jsx              # /dashboard/tickets
│   │   ├── notifications/page.jsx        # /dashboard/notifications
│   │   └── profile/page.jsx             # /dashboard/profile
│   └── admin/
│       ├── layout.jsx                    # Admin sidebar layout
│       ├── page.jsx                      # /admin
│       ├── users/page.jsx                # /admin/users
│       ├── events/page.jsx               # /admin/events
│       ├── bookings/page.jsx             # /admin/bookings
│       ├── payments/page.jsx             # /admin/payments
│       ├── categories/page.jsx           # /admin/categories
│       └── reviews/page.jsx              # /admin/reviews
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
│   │   └── Toast.jsx
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
├── services/
│   ├── api.js                            # Axios base instance
│   ├── authService.js                    # Login, register API calls
│   ├── eventService.js                   # Event CRUD API calls
│   ├── bookingService.js                 # Booking API calls
│   ├── paymentService.js                 # Payment API calls
│   ├── ticketService.js                  # Ticket API calls
│   ├── notificationService.js            # Notification API calls
│   └── reviewService.js                  # Review API calls
│
├── redux/
│   ├── store.js
│   └── features/
│       ├── authSlice.js
│       ├── eventSlice.js
│       ├── bookingSlice.js
│       ├── notificationSlice.js
│       └── categorySlice.js
│
├── hooks/
│   ├── useAuth.js
│   ├── useEvents.js
│   ├── useBooking.js
│   └── useNotifications.js
│
├── utils/
│   ├── formatDate.js
│   ├── formatPrice.js
│   ├── generateTicketCode.js
│   └── validateForm.js
│
├── constants/
│   ├── routes.js
│   ├── categories.js
│   └── roles.js
│
├── providers/
│   └── ReduxProvider.jsx
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
| Dashboard (placeholder) | /dashboard | ✅ Done |
| Home | / | ❌ Not started |
| Events Listing | /events | ❌ Not started |
| Event Detail | /events/:id | ❌ Not started |
| Create Event | /create-event | ❌ Not started |
| Booking | /booking/:id | ❌ Not started |
| Booking Success | /booking/:id/success | ❌ Not started |
| User Dashboard | /dashboard | ❌ Not started |
| Admin Dashboard | /admin | ❌ Not started |

---

## 📋 What's Next (Frontend)

- [ ] Navbar + Footer
- [ ] Home page — hero, featured events, categories, stats
- [ ] Events listing page — search + filter
- [ ] Event detail page
- [ ] Create event page (organizer)
- [ ] Booking page
- [ ] User dashboard pages
- [ ] Admin dashboard pages

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

---

## 🗺️ Page to Route Map

| File | URL |
|---|---|
| `app/page.jsx` | `/` |
| `app/(auth)/login/page.jsx` | `/login` |
| `app/(auth)/register/page.jsx` | `/register` |
| `app/events/page.jsx` | `/events` |
| `app/events/[id]/page.jsx` | `/events/123` |
| `app/booking/[id]/page.jsx` | `/booking/123` |
| `app/booking/[id]/success/page.jsx` | `/booking/123/success` |
| `app/dashboard/page.jsx` | `/dashboard` |
| `app/dashboard/bookings/page.jsx` | `/dashboard/bookings` |
| `app/dashboard/tickets/page.jsx` | `/dashboard/tickets` |
| `app/dashboard/notifications/page.jsx` | `/dashboard/notifications` |
| `app/admin/page.jsx` | `/admin` |
| `app/admin/users/page.jsx` | `/admin/users` |
| `app/admin/events/page.jsx` | `/admin/events` |

---

## 📊 Frontend Progress

```
Login Page              ████████████████████  100%
Register Page           ████████████████████  100%
Dashboard Placeholder   ████████████████████  100%
Navbar + Footer         ░░░░░░░░░░░░░░░░░░░░    0%
Home Page               ░░░░░░░░░░░░░░░░░░░░    0%
Events Pages            ░░░░░░░░░░░░░░░░░░░░    0%
Booking Pages           ░░░░░░░░░░░░░░░░░░░░    0%
User Dashboard          ░░░░░░░░░░░░░░░░░░░░    0%
Admin Dashboard         ░░░░░░░░░░░░░░░░░░░░    0%

Overall Frontend        ███░░░░░░░░░░░░░░░░░   15%
```

---

*Last updated: May 2026*