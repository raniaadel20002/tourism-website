You are working on an existing Next.js tourism website.

## Goal

Audit the Trip data flow against the current Swagger API and fix only the missing/wrong data handling.

The current Trip API contract is:

* `GET /api/Trips`
* `GET /api/Trips/{id}`
* `GET /api/Trips/marker/{markerId}`
* `GET /api/Trips/type/{typeId}`

The Trip response contains:

```text
id
markerID
destinationInfo
destination
name
description
timeFrom
durationValue
durationTypeName
adultPrice
childPrice
currencyName
isActive
tripTypeName
createdBy
createdAt
highlights[]
includes[]
excludes[]
whatToBring[]
availableDays[]
images[]
```

## Important: DO NOT BREAK THE EXISTING PROJECT

Before changing anything:

1. Inspect the current implementation.
2. Inspect:

   * `api/trips.ts`
   * `modules/trip.model`
   * `utils/tripTransform.ts`
   * public Trip Details page
   * `TripCard`
   * Trips listing page
   * Admin Trip list
   * Admin Add Trip
   * Admin Edit Trip
   * any booking code that consumes Trip data
3. Compare all of them against the API contract above.

Do NOT redesign anything.

Do NOT rewrite the Trip module.

Do NOT change the existing UI layout, styling, animations, routing structure, booking flow, or working API logic unless it is directly required to fix a verified Trip data issue.

Do NOT introduce mock/fake/static Trip data.

Do NOT create duplicate API logic if an existing helper already handles the request.

## Trip Details URL

The backend DOES NOT provide a slug/name endpoint.

It DOES provide:

`GET /api/Trips/marker/{markerId}`

and every Trip contains `markerID`.

Therefore, if the current public Trip URL can safely use `markerID`, use the existing marker endpoint for direct Trip loading instead of:

`getTrips()` → load all trips → find one.

The desired data flow is:

```text
TripCard
→ markerID-based URL
→ Trip Details
→ GET /api/Trips/marker/{markerId}
→ render the returned Trip
```

Do NOT implement a fake slug lookup by loading all Trips.

However, before changing the URL structure, inspect the existing routing and links carefully.

If changing the URL would require a large or risky refactor, STOP and report it instead of making the change.

## Trip Details data

Make sure the public Trip Details page uses the real API response and does not silently drop important Trip fields.

Verify at minimum:

* name
* description
* destinationInfo
* timeFrom
* durationValue
* durationTypeName
* adultPrice
* childPrice
* currencyName
* tripTypeName
* highlights
* includes
* excludes
* whatToBring
* availableDays
* images
* markerID

Only display fields that already have an appropriate place in the existing UI.

Do NOT invent new UI sections just to display fields.

If a field has no existing UI location, leave the UI unchanged and report that field as currently unused.

## Admin Trip Add/Edit

Compare the Admin Add/Edit Trip forms with the actual `TripMutation`/API contract.

Verify that existing fields are correctly:

* loaded
* displayed
* editable
* submitted
* preserved when editing

Pay special attention to:

* name and translations if currently supported
* description and translations if currently supported
* destination
* trip type
* timeFrom
* durationValue
* duration type
* adult price
* child price
* currency
* highlights
* includes
* excludes
* whatToBring
* availableDays
* images
* active/inactive state

Do NOT add fields to the UI just because they exist in the GET response if the POST/PUT contract does not support them.

Use the actual `TripMutation` type and Swagger request body as the source of truth for POST/PUT.

## Critical safety rule

If you discover that fixing the Trip Details + Admin mapping requires:

* a major refactor
* changing unrelated components
* changing shared architecture
* changing the existing visual design
* changing booking behavior
* changing authentication
* changing unrelated API modules

DO NOT make those changes.

Stop and report:

1. What is wrong.
2. Which files are affected.
3. Why the fix would be risky.
4. The smallest safe fix you recommend.

## Implementation rules

* Preserve all working code.
* Make minimal targeted changes only.
* Reuse existing functions/types.
* Do not create unnecessary abstractions.
* Do not change naming conventions unnecessarily.
* Do not remove existing functionality.
* Do not add console logs.
* Do not add mock data.
* Do not modify unrelated modules.

After changes, run the relevant TypeScript/build checks if available.

Finally, report exactly:

### Fixed

* ...

### Intentionally unchanged

* ...

### Potential issue requiring backend support

* ...

Do not claim something is fixed unless you actually verified the code path.
