# Promo Codes

GET /api/PromoCodes

Get all promo codes.

POST /api/PromoCodes

Create a new promo code.

GET /api/PromoCodes/nonrelatedtrip

Get promo codes for non-related trips.

GET /api/PromoCodes/relatedtrip

Get promo codes for related trips.

GET /api/PromoCodes/{id}

Get a specific promo code by ID.

GET /api/PromoCodes/code/{Code}

Get a promo code by code.

---

## GET

**/api/PromoCodes**

### Parameters

| Name | Type | In | Description |
| ---- | ---- | -- | ----------- |
| PageNumber | integer($int32) | query | |
| PageSize | integer($int32) | query | |

### Response body

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "tripId": 0,
      "tripName": "string",
      "tripType": "string",
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": "2026-09-02T14:31:04.712Z",
      "createdBy": "string"
    }
  ]
}
Responses

200 OK
400 Bad Request
401 Unauthorized
404 Not Found

POST

/api/PromoCodes

Request body

application/json

{
  "discountEuro": 0,
  "discountpercent": 0,
  "limited": 0,
  "tripId": 0
}
Responses

200 OK
400 Bad Request
401 Unauthorized
404 Not Found

Response body
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "code": 0
  }
}
GET

/api/PromoCodes/nonrelatedtrip

Parameters
Name	Type	In	Description
PageNumber	integer($int32)	query	
PageSize	integer($int32)	query	
Response body
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "isActived": true
    }
  ]
}
Responses

200 OK
400 Bad Request
401 Unauthorized
404 Not Found

GET

/api/PromoCodes/relatedtrip

Parameters
Name	Type	In	Description
PageNumber	integer($int32)	query	
PageSize	integer($int32)	query	
Response body
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "tripId": 0,
      "tripName": "string",
      "tripType": "string",
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": "2026-09-02T14:31:04.729Z",
      "createdBy": "string"
    }
  ]
}
Responses

200 OK
400 Bad Request
401 Unauthorized
404 Not Found

GET

/api/PromoCodes/{id}

Parameters
Name	Type	In	Description
id	integer($int32)	path	
Response body
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "code": 0,
    "discountEuro": 0,
    "discountpercent": 0,
    "limited": 0,
    "tripId": 0,
    "tripName": "string",
    "tripType": "string",
    "priceForChild": 0,
    "priceForAdult": 0,
    "createdAt": "2026-09-02T14:31:04.737Z",
    "createdBy": "string"
  }
}
Responses

200 OK
400 Bad Request
401 Unauthorized
404 Not Found

GET

/api/PromoCodes/code/{Code}

Parameters
Name	Type	In	Description
Code	number($double)	path	
Response body
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "code": 0,
    "discountEuro": 0,
    "discountpercent": 0,
    "limited": 0,
    "tripId": 0,
    "tripName": "string",
    "tripType": "string",
    "priceForChild": 0,
    "priceForAdult": 0,
    "createdAt": "2026-09-02T14:31:04.743Z",
    "createdBy": "string"
  }
}
Responses

200 OK
400 Bad Request
401 Unauthorized
404 Not Found
