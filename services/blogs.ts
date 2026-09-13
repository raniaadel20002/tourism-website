import { authFetch } from "@/utils/authFetch";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogSection {
  id: number;
  sectionNumber: number;
  title: string;
  content: string;
  imageUrl: string | null;
  blogId: number;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  blogSections: BlogSection[];
}

export interface CreateBlogSectionInput {
  sectionNumber: number;
  title: string;
  content: string;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  blogSections: CreateBlogSectionInput[];
}

export interface UpdateBlogSectionInput {
  id: number;
  title: string;
  sectionNumber: number;
  content: string;
}

export interface UpdateBlogInput {
  id: number;
  title: string;
  content: string;
  blogSections: UpdateBlogSectionInput[];
}

interface BlogApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function parse<T>(res: Response, action: string): Promise<T> {
  if (res.status === 401) {
    throw Object.assign(new Error("UNAUTHORIZED"), {
      isUnauthorized: true,
    });
  }

  if (!res.ok) throw new Error(`${action}: ${res.status}`);

  const json: BlogApiResponse<T> = await res.json();

  if (!json.success) throw new Error(json.message || action);

  return json.data;
}

// ─── GET /api/Blogs ───────────────────────────────────────────────────────────

export async function getBlogs(
  pageNumber = 1,
  pageSize = 100,
  lang?: string
): Promise<Blog[]> {
  const q = new URLSearchParams({
    PageNumber: String(pageNumber),
    PageSize: String(pageSize),
  });

  const res = await authFetch(`/api/Blogs?${q}`, {
    method: "GET",
    headers: {
      accept: "text/plain",
      ...(lang ? { "Accept-Language": lang } : {}),
    },
  });

  return parse<Blog[]>(res, "Fetch blogs");
}

// ─── GET /api/Blogs/{id} ─────────────────────────────────────────────────────

export async function getBlogById(id: number, lang?: string): Promise<Blog> {
  const res = await authFetch(`/api/Blogs/${id}`, {
    method: "GET",
    headers: {
      accept: "text/plain",
      ...(lang ? { "Accept-Language": lang } : {}),
    },
  });

  return parse<Blog>(res, "Fetch blog");
}

// ─── POST /api/Blogs ─────────────────────────────────────────────────────────

export async function createBlog(body: CreateBlogInput): Promise<Blog> {
  const res = await authFetch("/api/Blogs", {
    method: "POST",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parse<Blog>(res, "Create blog");
}

// ─── PUT /api/Blogs/{id} ─────────────────────────────────────────────────────

export async function updateBlog(
  id: number,
  body: UpdateBlogInput
): Promise<Blog> {
  const res = await authFetch(`/api/Blogs/${id}`, {
    method: "PUT",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parse<Blog>(res, "Update blog");
}

// ─── DELETE /api/Blogs/{id} ──────────────────────────────────────────────────

export async function deleteBlog(id: number): Promise<void> {
  const res = await authFetch(`/api/Blogs/${id}`, {
    method: "DELETE",
    headers: {
      accept: "text/plain",
    },
  });

  if (!res.ok) {
    let msg = `Delete blog failed (${res.status})`;

    try {
      const j = await res.json();
      if (j.message) msg = j.message;
    } catch {
      // ignore
    }

    throw new Error(msg);
  }
}

// ─── POST /api/Blogs/image ───────────────────────────────────────────────────

export async function uploadBlogImage(
  blogId: number,
  file: File
): Promise<void> {
  const form = new FormData();
  form.append("file", file);

  const res = await authFetch(
    `/api/Blogs/image?blogid=${blogId}`,
    {
      method: "POST",
      headers: {
        accept: "text/plain",
      },
      body: form,
    }
  );

  if (!res.ok) {
    let msg = `Upload blog image failed (${res.status})`;

    try {
      const j = await res.json();
      if (j.message) msg = j.message;
    } catch {
      // ignore
    }

    throw new Error(msg);
  }
}

// ─── POST /api/Blogs/section/image ───────────────────────────────────────────

export async function uploadBlogSectionImage(
  blogId: number,
  sectionId: number,
  file: File
): Promise<void> {
  const form = new FormData();
  form.append("file", file);

  const res = await authFetch(
    `/api/Blogs/section/image?blogid=${blogId}&sectionid=${sectionId}`,
    {
      method: "POST",
      headers: {
        accept: "text/plain",
      },
      body: form,
    }
  );

  if (!res.ok) {
    let msg = `Upload section image failed (${res.status})`;

    try {
      const j = await res.json();
      if (j.message) msg = j.message;
    } catch {
      // ignore
    }

    throw new Error(msg);
  }
}

// ─── DELETE /api/Blogs/{id}/image ────────────────────────────────────────────

export async function deleteBlogImage(blogId: number): Promise<void> {
  const res = await authFetch(`/api/Blogs/${blogId}/image`, {
    method: "DELETE",
    headers: {
      accept: "text/plain",
    },
  });

  if (!res.ok) {
    let msg = `Delete blog image failed (${res.status})`;

    try {
      const j = await res.json();
      if (j.message) msg = j.message;
    } catch {
      // ignore
    }

    throw new Error(msg);
  }
}

// ─── DELETE /api/Blogs/section/{sectionid}/image ─────────────────────────────

export async function deleteBlogSectionImage(
  sectionId: number
): Promise<void> {
  const res = await authFetch(
    `/api/Blogs/section/${sectionId}/image`,
    {
      method: "DELETE",
      headers: {
        accept: "text/plain",
      },
    }
  );

  if (!res.ok) {
    let msg = `Delete section image failed (${res.status})`;

    try {
      const j = await res.json();
      if (j.message) msg = j.message;
    } catch {
      // ignore
    }

    throw new Error(msg);
  }
}