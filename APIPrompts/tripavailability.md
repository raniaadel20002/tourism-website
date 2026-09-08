Fix ONLY the Availability update issue in the existing Admin Trip Add/Edit form.

### Current behavior

* Editing a Trip WITHOUT changing Available Days → PUT succeeds.
* Editing a Trip AFTER changing Available Days → API may return:
  `400 Bad Request`
  `Duplicate availability days are not allowed.`
* The Network payload was checked and is already unique, for example:
  `availabilityDayNo: [2, 7, 4, 3, 6, 5, 1]`
* Therefore, do NOT assume the problem is simply duplicate values in the payload.

### Existing working logic

* `availableDays` state already exists.
* `handleDayToggle` is already implemented correctly.
* `handleSelectAllDays` is already implemented correctly.
* Edit mode already does:
  `setAvailableDays(editTrip.availableDays ?? [])`
* `resetForm()` already resets `availableDays` to `[]`.
* `tripData` already maps day names to numbers for `availabilityDayNo`.

### Task

Trace ONLY the Availability flow:
`editTrip.availableDays → availableDays state → checkbox changes → tripData → PUT /api/Trips`

Find the actual cause of the 400 error and make the SMALLEST possible fix.

### Strict rules

* Do NOT rewrite or refactor the component.
* Do NOT change the API contract.
* Do NOT change unrelated Trip fields.
* Do NOT modify working Add/Edit logic.
* Do NOT redesign the UI.
* Do NOT add unnecessary validation or abstractions.
* Do NOT blindly add `Set` unless you prove the duplicate is actually introduced before the request.
* Preserve all existing behavior.
* Change only the minimum lines necessary to fix this issue.

Before editing, inspect the existing code and identify the exact cause. Then apply the minimal targeted fix and briefly explain which lines were changed and why.
