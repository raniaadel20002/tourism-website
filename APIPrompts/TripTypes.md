# TripTypes API

Base URL: `https://tripsy.runasp.net/`

Implement TripTypes API integration using the existing API config/client and authentication system. Do not hardcode the base URL or Bearer token.

## GET `/api/TripTypes`

**Query Parameters:**

* `PageNumber` — integer, optional
* `PageSize` — integer, optional

**Request:**

```http
GET /api/TripTypes?PageNumber=1&PageSize=10
Authorization: Bearer {accessToken}
Accept: text/plain
```

**200 Response:**

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "name": "string"
    }
  ]
}
```

**Errors:** `400`, `401`, `404` → `ProblemDetails`

---

## POST `/api/TripTypes`

Create a trip type.

**Request Body:**

```json
{
  "name": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string"
  }
}
```

**200 Response:**

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string"
  }
}
```

**Errors:** `400`, `401`, `404` → `ProblemDetails`

---

## PUT `/api/TripTypes`

Update a trip type.

**Request Body:**

```json
{
  "id": 0,
  "name": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string"
  }
}
```

**200 Response:**

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string"
  }
}
```

**Errors:** `400`, `401`, `404` → `ProblemDetails`

---

## GET `/api/TripTypes/{id}`

Get one trip type.

**Path:** `id` — integer, required

**Request:**

```http
GET /api/TripTypes/1
Authorization: Bearer {accessToken}
```

**200 Response:**

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string"
  }
}
```

**Errors:** `400`, `401`, `404` → `ProblemDetails`

---

## DELETE `/api/TripTypes/{id}`

Delete one trip type.

**Path:** `id` — integer, required

**Request:**

```http
DELETE /api/TripTypes/1
Authorization: Bearer {accessToken}
```

**200 Response:**

```json
{
  "success": true,
  "message": "string",
  "data": "string"
}
```

**Errors:** `400`, `401`, `404` → `ProblemDetails`

---

## Implementation Rules

* Use the existing API client/config.
* Base URL: `https://tripsy.runasp.net/`
* Automatically attach the authenticated access token.
* Never hardcode the token.
* Keep all TripTypes API functions isolated.
* Reuse existing project patterns.
* Do not modify unrelated functionality.
* Support TypeScript types if the project uses TypeScript.
