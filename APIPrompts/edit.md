# Admin Fixes — Trainer Feedback

We need to fix the following Admin/public integration issues from the trainer feedback.

IMPORTANT:

* Inspect the existing implementation FIRST.
* Preserve all currently working code and UI.
* Make minimal targeted fixes.
* Do NOT rewrite or refactor the project unnecessarily.
* Do NOT change unrelated features.
* Do NOT redesign existing pages.
* Do NOT invent API fields or endpoints. Use the existing Swagger/API implementation.
* Work on the issues ONE BY ONE in the order below.
* After each issue, verify that the existing functionality still works before moving to the next one.

---

## 1. Admin 401 Error

The Admin login and token already work.

Problem:
While the Admin is logged in and navigating between Admin tabs/pages, a 401 error is sometimes displayed as a large visible error/banner.

Fix the actual issue with the current implementation.

Check:

* existing token storage
* existing AdminGuard
* existing API helper/fetch/axios logic
* Authorization header
* existing 401 handling
* why a 401 is being rendered visibly

Requirements:

* Do NOT rewrite authentication.
* Do NOT replace the existing token system.
* Do NOT remove error handling completely.
* Do NOT blindly hide all 401 errors.
* A valid logged-in Admin should not see a large 401 error message while navigating normally.
* If a genuine 401 happens, handle it through the existing authentication flow.
* Avoid redirect loops.
* Keep other API errors working normally.

Make the smallest fix possible.

---

## 2. Languages in Add/Edit

Problem:
When editing an existing Trip, English data appears correctly, but other existing translations can appear empty.

Also, the update payload currently risks replacing missing translations with English.

Example of the problematic behavior:

* Existing French translation
* Existing Russian translation
* Existing Romanian translation

Open Edit → some translations are empty → submit another change → old translations can be overwritten/lost.

Fix the complete data flow:

API response
→ Trip data
→ Edit form
→ existing translations displayed
→ Update payload
→ API

Requirements:

* Inspect the actual Trip type/interface and API response first.
* Determine exactly where the translations are returned.
* Do NOT guess the API structure.
* Existing translations must appear in Edit.
* If the Admin changes only another field, existing translations must remain unchanged.
* Do not replace an existing translation with English just because an input is temporarily empty.
* If the user intentionally clears a translation, respect that intentional change according to the existing API behavior.
* Add and Edit must both continue working.
* Preserve the existing language-routing/UI work.

Do NOT redesign the Add/Edit modal.

---

## 3. Trip Filtering on Home

Problem:
Trip Type filtering on the Home page should use the backend API rather than loading all trips and filtering them only on the frontend when the API already supports filtering.

Requirements:

* Inspect the existing Trips API and Swagger implementation first.
* Identify the existing parameter used for Trip Type filtering, such as the existing type/typeId parameter.
* When the user selects a Trip Type, send the appropriate filter to the API.
* Display the returned trips.
* Do not fetch all trips and then perform the main Trip Type filtering only with JavaScript if the backend supports the filter.
* Preserve pagination/search/other existing filters if they already work.
* Keep the current UI/design.
* Do not modify unrelated Trip functionality.

Do not invent a new endpoint.

---

## 4. Booking Success UI

Problem:
After a successful booking, the success message/modal/state does not appear cleanly and can be affected by the surrounding page layout.

Requirements:

* Inspect the existing booking success state/modal/toast.
* Keep the current design.
* Make the success state clearly visible after a successful booking.
* Fix only the actual UI issue, including positioning/z-index/overlay/state handling if needed.
* Do not redesign the Booking page or Confirmation page.
* Do not change the booking API flow unless the investigation proves it is necessary.
* Make sure the success state does not get hidden behind other elements.

---

# Execution Order

Do the fixes exactly in this order:

1. Admin 401
2. Add/Edit translations
3. Home Trip Type API filtering
4. Booking success UI

After each fix:

* inspect the changed code
* test the relevant flow
* make sure existing functionality was not broken
* then continue to the next issue

# Critical Scope Rule

Do NOT:

* rewrite large files
* restructure the project
* replace working components
* change the existing Admin design
* change authentication architecture
* change API contracts
* create unnecessary new files
* modify unrelated modules
* perform cleanup/refactoring unrelated to these four issues

Use the existing architecture and make the smallest targeted changes necessary.

# Final Report

When all four issues are completed, report briefly:

1. Root cause of each issue.
2. Files changed.
3. What was changed.
4. How each issue was tested.
5. Any issue that could not be verified because of missing API/backend information.

Do not make additional changes outside these four issues.
