import { API_BASE_URL } from "./apiConfig";

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

function getToken(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("admin_access_token") || "";
  }
  return "";
}

function authHeaders(token: string): HeadersInit {
  return {
    accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
}

async function parse<T>(res: Response, action: string): Promise<T> {
  let text = "";
  try { text = await res.text(); } catch { /* ignore */ }
  let json: BlogApiResponse<T>;
  try { json = JSON.parse(text); } catch {
    throw new Error(`${action} failed (${res.status}): ${text.slice(0, 120)}`);
  }
  if (!res.ok || !json.success) {
    throw new Error(json.message || `${action} failed (${res.status})`);
  }
  return json.data;
}

// ─── GET /api/Blogs ───────────────────────────────────────────────────────────

export async function getBlogs(
  pageNumber = 1,
  pageSize = 100
): Promise<Blog[]> {
  const q = new URLSearchParams({
    PageNumber: String(pageNumber),
    PageSize: String(pageSize),
  });
  return parse<Blog[]>(
    await fetch(`${API_BASE_URL}/api/Blogs?${q}`, {
      headers: { accept: "text/plain" },
      cache: "no-store",
    }),
    "Fetch blogs"
  );
}

// ─── GET /api/Blogs/{id} ─────────────────────────────────────────────────────

export async function getBlogById(id: number): Promise<Blog> {
  return parse<Blog>(
    await fetch(`${API_BASE_URL}/api/Blogs/${id}`, {
      headers: { accept: "text/plain" },
      cache: "no-store",
    }),
    "Fetch blog"
  );
}

// ─── POST /api/Blogs ─────────────────────────────────────────────────────────

export async function createBlog(body: CreateBlogInput): Promise<Blog> {
  const token = getToken();
  return parse<Blog>(
    await fetch(`${API_BASE_URL}/api/Blogs`, {
      method: "POST",
      headers: { ...authHeaders(token), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    "Create blog"
  );
}

// ─── PUT /api/Blogs/{id} ─────────────────────────────────────────────────────

export async function updateBlog(id: number, body: UpdateBlogInput): Promise<Blog> {
  const token = getToken();
  return parse<Blog>(
    await fetch(`${API_BASE_URL}/api/Blogs/${id}`, {
      method: "PUT",
      headers: { ...authHeaders(token), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    "Update blog"
  );
}

// ─── DELETE /api/Blogs/{id} ──────────────────────────────────────────────────

export async function deleteBlog(id: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/Blogs/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) {
    let msg = `Delete blog failed (${res.status})`;
    try { const j = await res.json(); if (j.message) msg = j.message; } catch { /* ignore */ }
    throw new Error(msg);
  }
}

// ─── POST /api/Blogs/image ───────────────────────────────────────────────────

export async function uploadBlogImage(blogId: number, file: File): Promise<void> {
  const token = getToken();
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE_URL}/api/Blogs/image?blogid=${blogId}`, {
    method: "POST",
    headers: authHeaders(token),
    body: form,
  });
  if (!res.ok) {
    let msg = `Upload blog image failed (${res.status})`;
    try { const j = await res.json(); if (j.message) msg = j.message; } catch { /* ignore */ }
    throw new Error(msg);
  }
}

// ─── POST /api/Blogs/section/image ───────────────────────────────────────────

export async function uploadBlogSectionImage(
  blogId: number,
  sectionId: number,
  file: File
): Promise<void> {
  const token = getToken();
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(
    `${API_BASE_URL}/api/Blogs/section/image?blogid=${blogId}&sectionid=${sectionId}`,
    { method: "POST", headers: authHeaders(token), body: form }
  );
  if (!res.ok) {
    let msg = `Upload section image failed (${res.status})`;
    try { const j = await res.json(); if (j.message) msg = j.message; } catch { /* ignore */ }
    throw new Error(msg);
  }
}

// ─── DELETE /api/Blogs/{id}/image ────────────────────────────────────────────

export async function deleteBlogImage(blogId: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/Blogs/${blogId}/image`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) {
    let msg = `Delete blog image failed (${res.status})`;
    try { const j = await res.json(); if (j.message) msg = j.message; } catch { /* ignore */ }
    throw new Error(msg);
  }
}

// ─── DELETE /api/Blogs/section/{sectionid}/image ─────────────────────────────

export async function deleteBlogSectionImage(sectionId: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/Blogs/section/${sectionId}/image`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) {
    let msg = `Delete section image failed (${res.status})`;
    try { const j = await res.json(); if (j.message) msg = j.message; } catch { /* ignore */ }
    throw new Error(msg);
  }
}
