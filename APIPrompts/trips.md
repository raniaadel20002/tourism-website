# Trips

GET /api/Trips
Get all trips.

GET /api/Trips/{id}
Get a specific trip by ID.

GET /api/Trips/marker/{markerId}
Get a trip by marker ID.

GET /api/Trips/type/{typeId}
Get trips by trip type.

POST /api/Trips
Create a new trip.

PUT /api/Trips
Update an existing trip.

DELETE /api/Trips/{id}/deactivate
Deactivate a trip.

PUT /api/Trips/{id}/reactivate
Reactivate a trip.

POST /api/Trips/{id}/image
Upload images to a trip.

DELETE /api/Trips/{id}/image/{imageId}
Delete a trip image.

PUT /api/Trips/{id}/image/{imageId}/set-primary
Set a trip image as primary.

---

## GET

**/api/Trips**

### Parameters

| Name            | Type            | In     | Description |
| --------------- | --------------- | ------ | ----------- |
| PageNumber      | integer($int32) | query  |             |
| PageSize        | integer($int32) | query  |             |
| MinPrice        | number($double) | query  |             |
| MaxPrice        | number($double) | query  |             |
| TypeId          | integer($int32) | query  |             |
| DestinationId   | integer($int32) | query  |             |
| SearchItem      | string          | query  |             |
| includeInactive | boolean         | query  | true/false  |
| Accept-Language | string          | header |             |

### Request URL

```text
https://tripsy.runasp.net/api/Trips?includeInactive=false
```

### Response body

```json
{
  "success": true,
  "message": "Trips Data",
  "data": [
    {
      "id": 1,
      "markerID": "532404",
      "destinationInfo": {
        "id": 1,
        "name": "Hurghada",
        "imageUrl": "images/destinations/307ffaf8-69ad-434f-a65f-6a9fcff35d6a.webp",
        "isFeatured": false
      },
      "destination": null,
      "name": "diving",
      "description": "Scuba Diving in Hurghada – Red Sea Diving & Underwater",
      "timeFrom": null,
      "durationValue": 1,
      "durationTypeName": "Hours",
      "adultPrice": 50,
      "childPrice": 15,
      "currencyName": "EUR",
      "isActive": true,
      "tripTypeName": "diving",
      "createdBy": "Karim Ayman",
      "createdAt": "2026-09-01T20:32:19.2812345",
      "highlights": [],
      "includes": [],
      "excludes": [],
      "whatToBring": [],
      "availableDays": [],
      "images": []
    }
  ]
}
```

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## POST

**/api/Trips**

### Parameters

No parameters

### Request body

**application/json**

```json
{
  "destinationId": 0,
  "name": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string"
  },
  "description": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string"
  },
  "timeFrom": "string",
  "durationValue": 0,
  "durationType": 0,
  "adultPrice": 0,
  "childPrice": 0,
  "tripTypeId": 0,
  "highlights": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "includes": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "excludes": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "whatToBring": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "availabilityDayNo": [
    0
  ]
}
```

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## PUT

**/api/Trips**

### Parameters

No parameters

### Request body

**application/json**

```json
{
  "id": 0,
  "destinationId": 0,
  "name": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string"
  },
  "description": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string"
  },
  "timeFrom": "string",
  "durationValue": 0,
  "durationType": 0,
  "adultPrice": 0,
  "childPrice": 0,
  "tripTypeId": 0,
  "highlights": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "includes": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "excludes": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "whatToBring": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "availabilityDayNo": [
    0
  ]
}
```

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## GET

**/api/Trips/{id}**

### Parameters

| Name            | Type            | In     | Description |
| --------------- | --------------- | ------ | ----------- |
| id *            | integer($int32) | path   |             |
| Accept-Language | string          | header | Default: en |

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## GET

**/api/Trips/marker/{markerId}**

### Parameters

| Name            | Type   | In     | Description |
| --------------- | ------ | ------ | ----------- |
| markerId *      | string | path   |             |
| Accept-Language | string | header | Default: en |

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## GET

**/api/Trips/type/{typeId}**

### Parameters

| Name            | Type            | In     | Description |
| --------------- | --------------- | ------ | ----------- |
| PageNumber      | integer($int32) | query  |             |
| PageSize        | integer($int32) | query  |             |
| typeId *        | integer($int32) | path   |             |
| Accept-Language | string          | header | Default: en |

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## DELETE

**/api/Trips/{id}/deactivate**

### Parameters

| Name | Type            | In   | Description |
| ---- | --------------- | ---- | ----------- |
| id * | integer($int32) | path |             |

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## PUT

**/api/Trips/{id}/reactivate**

### Parameters

| Name | Type            | In   | Description |
| ---- | --------------- | ---- | ----------- |
| id * | integer($int32) | path |             |

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## POST

**/api/Trips/{id}/image**

### Parameters

| Name | Type            | In   | Description |
| ---- | --------------- | ---- | ----------- |
| id * | integer($int32) | path |             |

### Request body

**multipart/form-data**

| Name   | Type  | Description              |
| ------ | ----- | ------------------------ |
| Images | array | Add multiple image files |

### Example

```bash
curl -X 'POST' \
  'https://tripsy.runasp.net/api/Trips/1/image' \
  -H 'accept: text/plain' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Images=@Frame1171276591.png;type=image/png'
```

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

### Response body

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "imageUrl": "string"
    }
  ]
}
```

---

## DELETE

**/api/Trips/{id}/image/{imageId}**

### Parameters

| Name      | Type            | In   | Description |
| --------- | --------------- | ---- | ----------- |
| id *      | integer($int32) | path |             |
| imageId * | integer($int32) | path |             |

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

---

## PUT

**/api/Trips/{id}/image/{imageId}/set-primary**

### Parameters

| Name      | Type            | In   | Description |
| --------- | --------------- | ---- | ----------- |
| id *      | integer($int32) | path |             |
| imageId * | integer($int32) | path |             |

### Responses

200 OK

400 Bad Request

401 Unauthorized

404 Not Found
