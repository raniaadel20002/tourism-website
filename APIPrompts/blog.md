## Task: Fix and Complete Blog API Integration

Open and read this entire file first, then execute the task directly.

### Goal

Connect the existing Blog frontend and Admin Blog functionality to the real Blog API.

The Blog API is already documented in the Swagger information provided in this file/project.

### Rules

* Inspect the existing Blog code before changing anything.
* Use the existing project structure and components.
* Use the real Blog API only.
* Do NOT use dummy/static blog data.
* Do NOT invent fields that are not provided by the API.
* Preserve the existing Blog UI/design.
* Preserve existing working functionality.
* Make only the minimum required changes.
* Do NOT rewrite or refactor unrelated code.
* Do NOT redesign the pages.
* Do NOT create unnecessary new components/files.
* Do NOT remove working functionality unless it directly conflicts with the real API.
* Do NOT generate an analysis/report before fixing.
* Do NOT explain what you are going to do.
* Just inspect the relevant files, implement the required fixes, and finish.

### API Contract

#### GET `/api/Blogs`

Query parameters:

* `PageNumber`
* `PageSize`

Response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "title": "string",
      "content": "string",
      "imageUrl": "string",
      "blogSections": [
        {
          "id": 0,
          "sectionNumber": 0,
          "title": "string",
          "content": "string",
          "imageUrl": "string",
          "blogId": 0
        }
      ]
    }
  ]
}
```

#### GET `/api/Blogs/{id}`

Returns one Blog object with:

* `id`
* `title`
* `content`
* `imageUrl`
* `blogSections`

#### POST `/api/Blogs`

Request body:

```json
{
  "title": "string",
  "content": "string",
  "blogSections": [
    {
      "sectionNumber": 0,
      "title": "string",
      "content": "string"
    }
  ]
}
```

#### PUT `/api/Blogs/{id}`

Request body:

```json
{
  "id": 0,
  "title": "string",
  "content": "string",
  "blogSections": [
    {
      "id": 0,
      "title": "string",
      "sectionNumber": 0,
      "content": "string"
    }
  ]
}
```

#### DELETE `/api/Blogs/{id}`

Deletes the blog.

#### POST `/api/Blogs/image`

Query:

* `blogid`

Multipart form:

* `file`

Used to upload the main Blog image.

#### POST `/api/Blogs/section/image`

Query:

* `blogid`
* `sectionid`

Multipart form:

* `file`

Used to upload a section image.

#### DELETE `/api/Blogs/{id}/image`

Deletes the main Blog image.

#### DELETE `/api/Blogs/section/{sectionid}/image`

Deletes a section image.

### Important Data Rule

The API does NOT provide:

* author
* tag/category
* publication date
* intro
* arbitrary metadata

Do NOT create fake values for these.

If the existing UI expects fields that do not exist in the API, adapt the existing UI minimally so it displays only real API data.

### Public Blog

Make the existing public Blog pages/components use the real Blog API.

* Blog listing → GET `/api/Blogs`
* Blog details → GET `/api/Blogs/{id}`
* Display real:

  * title
  * content
  * image
  * blog sections
* Render `blogSections` dynamically.
* Section order must follow `sectionNumber`.
* Do not use dummy blog objects.

### Admin Blog

Make the existing Admin Blog functionality work with the real API.

It must support:

* Load blogs from GET `/api/Blogs`
* Create blog with POST `/api/Blogs`
* Edit blog with PUT `/api/Blogs/{id}`
* Delete blog with DELETE `/api/Blogs/{id}`
* Upload main blog image with POST `/api/Blogs/image`
* Upload section image with POST `/api/Blogs/section/image`
* Delete main blog image
* Delete section image

Use the API response/data structure exactly.

### Image Handling

Use the project's existing image URL/helper logic if one already exists.

Do not invent image URLs.

If the API returns no image, do not show a fake/default blog image.

### Final Requirement

After implementing the fixes:

* Keep the existing UI.
* Keep existing routing.
* Keep existing styling.
* Keep existing working functionality.
* Use real API data everywhere.
* Remove/stop using dummy Blog data if it is currently being displayed.
* Do not touch Trips or unrelated modules.

**Just implement the Blog API integration.**
