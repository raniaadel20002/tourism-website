I need you to fix the Booking system in my existing tourism website.

IMPORTANT:
- DO NOT rewrite the project.
- DO NOT redesign any UI.
- DO NOT change existing working booking/checkout behavior unless required to connect it to the real API.
- DO NOT invent fake/mock/dummy booking data.
- DO NOT create a new booking architecture.
- First inspect the existing codebase and understand how the current Booking, Checkout, CartContext, BookingModal, Trips, and Admin Bookings pages work.
- Make only minimal, targeted changes.
- Preserve all existing UI, styling, routes, components, and working functionality.

GOAL:
Replace the current dummy/mock Booking data with the real backend Booking API, and make both the customer booking flow and Admin Bookings page use the real API.

BACKEND:
Base URL:
https://tripsy.runasp.net

Booking endpoints:

GET /api/Bookings

Query parameters:
- PageNumber
- PageSize
- Nationality
- SearchItem
- Phone
- Date
- Status
- TripId

Response structure:
{
  "success": true,
  "message": "...",
  "data": [
    {
      "id": 0,
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "nationality": "string",
      "bookingDate": "2026-09-06",
      "hotelName": "string",
      "roomNo": "string",
      "totalPrice": 0,
      "status": 0,
      "createdAt": "2026-09-06T00:00:00",
      "tripsBookings": [
        {
          "id": 0,
          "tripId": 0,
          "title": "string",
          "priceForChild": 0,
          "priceForAdult": 0,
          "noAdult": 0,
          "noChild": 0,
          "leaveDate": "2026-09-06",
          "subTotal": 0
        }
      ]
    }
  ]
}

GET /api/Bookings/{id}

POST /api/Bookings

Request body:
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "code": 512920,
  "nationality": "string",
  "hotelName": "string",
  "roomNo": "string",
  "tripsBookings": [
    {
      "tripId": 0,
      "noAdult": 0,
      "noChild": 0,
      "leaveDate": "2026-09-06"
    }
  ]
}

PUT /api/Bookings/confirm?id={id}

PUT /api/Bookings/finish?id={id}

DELETE /api/Bookings/{id}

AUTHENTICATION:
- POST /api/Bookings requires the existing authenticated user's Bearer token.
- GET/Admin operations should use the authentication mechanism already implemented in the project.
- DO NOT hardcode any token.
- DO NOT expose tokens in source code.

CURRENT PROJECT:
The project already has:
- BookingModal
- Checkout page
- BillingForm
- CheckoutTourSummary
- CartContext
- API files
- Admin Bookings page

The current customer booking flow is already working through:
BookingModal -> CartContext -> Checkout -> BillingForm -> completeBooking/createBooking

KEEP THIS FLOW.
Do not replace it with a new flow.

TASK 1 — CUSTOMER BOOKING

Inspect the existing booking code and find where dummy booking data is currently created/used.

Replace ONLY the dummy booking API/data layer with the real:
POST /api/Bookings

The data sent to the API must come from the existing booking/cart/checkout state.

Map the existing fields correctly:

firstName
lastName
email
phone
nationality
hotelName
roomNumber -> roomNo
trip id -> tripsBookings[].tripId
adult count -> tripsBookings[].noAdult
child count -> tripsBookings[].noChild
selected tour date -> tripsBookings[].leaveDate

Do not send frontend-only fields that the backend does not accept.

After successful POST:
- keep the existing confirmation flow.
- keep the existing confirmation page.
- do not redesign checkout.
- do not break coupon calculations or totals.

IMPORTANT DATE RULE:
The backend validates whether a trip is available on the selected day.

Do NOT bypass this validation.
Do NOT convert unavailable days into available days.
Do NOT hardcode Wednesday or any other day.
If the backend returns:
"Trip Id X is not available on Wednesday"
show a clear user-friendly error and keep the user on checkout instead of crashing.

TASK 2 — TRIP AVAILABILITY

Inspect the existing Trip API/model and Admin Add/Edit Trip implementation.

The GET Trip response contains:
availableDays

Example:
"availableDays": ["Monday", "Wednesday", "Friday"]

The Trip mutation API uses:
availabilityDayNo

Example mutation field:
"availabilityDayNo": [1, 3, 5]

IMPORTANT:
Do NOT assume the numeric mapping unless it is already defined somewhere in the existing project/backend contract.
Search the existing codebase and Swagger/API definitions first to determine the correct day-number mapping.

The Admin Add/Edit Trip page should allow configuring available days using the existing UI style.

When editing a trip:
- load the existing availableDays from the API.
- allow selecting/unselecting days.
- send the backend's expected availabilityDayNo field.
- after saving, refetch the trip and verify the API returns the configured availableDays.

Do NOT interpret an empty availableDays array as "Daily" unless the backend explicitly defines that behavior.

TASK 3 — BOOKING DATE UI

The BookingModal already has a date selector.

Use the selected trip's actual availableDays from the API.

The calendar/date selector should prevent selecting dates when the trip is unavailable on that weekday.

Do NOT hardcode available weekdays.

If availableDays is empty, do not silently treat every day as available.
Handle it according to the backend's actual behavior and make the user-facing behavior clear.

Do not redesign the BookingModal.

TASK 4 — ADMIN BOOKINGS

This is VERY IMPORTANT.

The Admin Bookings page is currently using DUMMY/MOCK booking data.

Remove the dummy booking data.

Connect the Admin Bookings page to:
GET /api/Bookings

The existing Admin Bookings UI/design MUST remain visually the same.

Only replace the data source and wire the existing controls to the API.

The Admin page should display real:
- booking ID
- customer first/last name
- email
- phone
- nationality
- booking date
- hotel
- room number
- total price
- status
- trip title
- adults
- children
- leave date
- subtotal

TASK 5 — ADMIN BOOKING ACTIONS

Wire the existing Admin actions to the real API:

Confirm:
PUT /api/Bookings/confirm?id={id}

Finish:
PUT /api/Bookings/finish?id={id}

Delete:
DELETE /api/Bookings/{id}

After each successful action:
- refetch the bookings list OR update the existing state correctly.
- do not leave stale dummy data on screen.

Do not invent new status values.
Use the status values returned by the API.

TASK 6 — ADMIN FILTERS

Inspect the existing Admin Bookings filters.

If the UI already has filters/search/pagination, connect them to the GET /api/Bookings query parameters where appropriate:

PageNumber
PageSize
Nationality
SearchItem
Phone
Date
Status
TripId

Do not add a new filter UI unless the existing UI already supports it or it is absolutely necessary.

TASK 7 — API LAYER

If an API file for bookings already exists, update it instead of creating duplicate API logic.

Prefer a clean API module such as:
api/bookings.ts

It should contain typed functions for:
- getBookings
- getBookingById
- createBooking
- confirmBooking
- finishBooking
- deleteBooking

Reuse the project's existing API_BASE_URL and authentication/token handling.

Do not duplicate authentication logic.

TASK 8 — ERROR HANDLING

Handle API errors properly.

Examples:
400 -> show the backend message to the user
401 -> use the existing authentication behavior
404 -> show appropriate error
500 -> show a generic server error

Never leave:
"Uncaught (in promise)"
or a blank page.

Do not swallow errors silently.

TASK 9 — REMOVE MOCK DATA

Search the entire project for:
- mock bookings
- dummy bookings
- hardcoded booking arrays
- fake booking objects
- sample booking records

Remove/replace ONLY booking-related dummy data.

Do NOT remove dummy/static data used intentionally for unrelated UI sections.

TASK 10 — VALIDATION

Before finishing:

1. Run TypeScript/type checking.
2. Run lint if configured.
3. Run production build.
4. Verify customer flow:
   Trip -> BookingModal -> Checkout -> POST /api/Bookings -> Confirmation
5. Verify Admin:
   Admin Bookings -> GET /api/Bookings
6. Verify:
   Confirm -> PUT confirm
7. Verify:
   Finish -> PUT finish
8. Verify:
   Delete -> DELETE
9. Verify no mock booking data remains.
10. Verify existing UI was not redesigned or unnecessarily changed.

VERY IMPORTANT FINAL RULE:
If you find that an existing piece of code is already working, DO NOT rewrite it.

Make the smallest possible changes required to connect the existing frontend to the real Booking API.

At the end, report:
- files changed
- what was changed in each file
- any backend/API limitation discovered
- whether the build passes
- whether dummy booking data was fully removed

Do NOT modify unrelated parts of the project.