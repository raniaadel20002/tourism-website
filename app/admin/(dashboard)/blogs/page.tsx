"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  uploadBlogSectionImage,
  deleteBlogImage,
  deleteBlogSectionImage,
  type Blog,
  type CreateBlogInput,
  type UpdateBlogInput,
  type CreateBlogSectionInput,
  type UpdateBlogSectionInput,
} from "@/api/blogs";
import { buildImageUrl } from "@/api/gallery";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionDraft {
  id?: number; // present when editing existing
  sectionNumber: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  imageFile?: File | null;
  deleteImage?: boolean;
}

interface FormState {
  title: string;
  content: string;
  sections: SectionDraft[];
  imageFile: File | null;
  deleteMainImage: boolean;
}

const emptyForm = (): FormState => ({
  title: "",
  content: "",
  sections: [],
  imageFile: null,
  deleteMainImage: false,
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);

  const mainImageInputRef = useRef<HTMLInputElement>(null);

  // ── Load ──────────────────────────────────────────────────────────────────

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setBlogs(await getBlogs(1, 100));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // ── Open modal ────────────────────────────────────────────────────────────

  const openAdd = () => {
    setEditBlog(null);
    setForm(emptyForm());
    setSaveError(null);
    setModalOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setEditBlog(blog);
    setForm({
      title: blog.title,
      content: blog.content,
      sections: blog.blogSections
        .slice()
        .sort((a, b) => a.sectionNumber - b.sectionNumber)
        .map((s) => ({
          id: s.id,
          sectionNumber: s.sectionNumber,
          title: s.title,
          content: s.content,
          imageUrl: s.imageUrl,
          imageFile: null,
          deleteImage: false,
        })),
      imageFile: null,
      deleteMainImage: false,
    });
    setSaveError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditBlog(null);
    setForm(emptyForm());
    setSaveError(null);
  };

  // ── Sections helpers ──────────────────────────────────────────────────────

  const addSection = () => {
    setForm((f) => ({
      ...f,
      sections: [
        ...f.sections,
        { sectionNumber: f.sections.length + 1, title: "", content: "", imageFile: null, deleteImage: false },
      ],
    }));
  };

  const removeSection = (idx: number) => {
    setForm((f) => ({
      ...f,
      sections: f.sections
        .filter((_, i) => i !== idx)
        .map((s, i) => ({ ...s, sectionNumber: i + 1 })),
    }));
  };

  const updateSection = (idx: number, patch: Partial<SectionDraft>) => {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, i) => (i === idx ? { ...s, ...patch } : s)),
    }));
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.title.trim()) { setSaveError("Title is required"); return; }
    if (!form.content.trim()) { setSaveError("Content is required"); return; }
    setSaving(true);
    setSaveError(null);
    try {
      if (editBlog) {
        // PUT
        const body: UpdateBlogInput = {
          id: editBlog.id,
          title: form.title,
          content: form.content,
          blogSections: form.sections.map((s): UpdateBlogSectionInput => ({
            id: s.id ?? 0,
            title: s.title,
            sectionNumber: s.sectionNumber,
            content: s.content,
          })),
        };
        const updated = await updateBlog(editBlog.id, body);

        // Main image operations
        if (form.deleteMainImage && editBlog.imageUrl) {
          await deleteBlogImage(updated.id).catch(() => {});
        }
        if (form.imageFile) {
          await uploadBlogImage(updated.id, form.imageFile);
        }

        // Section image operations
        const savedSections = updated.blogSections.sort((a, b) => a.sectionNumber - b.sectionNumber);
        for (let i = 0; i < form.sections.length; i++) {
          const draft = form.sections[i];
          const saved = savedSections[i];
          if (!saved) continue;
          if (draft.deleteImage && draft.imageUrl) {
            await deleteBlogSectionImage(saved.id).catch(() => {});
          }
          if (draft.imageFile) {
            await uploadBlogSectionImage(updated.id, saved.id, draft.imageFile);
          }
        }
      } else {
        // POST
        const body: CreateBlogInput = {
          title: form.title,
          content: form.content,
          blogSections: form.sections.map((s): CreateBlogSectionInput => ({
            sectionNumber: s.sectionNumber,
            title: s.title,
            content: s.content,
          })),
        };
        const created = await createBlog(body);

        // Main image
        if (form.imageFile) {
          await uploadBlogImage(created.id, form.imageFile);
        }

        // Section images
        const savedSections = created.blogSections.sort((a, b) => a.sectionNumber - b.sectionNumber);
        for (let i = 0; i < form.sections.length; i++) {
          const draft = form.sections[i];
          const saved = savedSections[i];
          if (saved && draft.imageFile) {
            await uploadBlogSectionImage(created.id, saved.id, draft.imageFile);
          }
        }
      }

      closeModal();
      await load();
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBlog(deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">Content Manager</h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">Blogs</h1>
          <p className="text-gray-500 text-sm">Manage articles, section content, and the images that support each story.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#006993] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add blog
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[#004560] font-bold text-sm">Blog list</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[35%]">Blog</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[38%]">Content</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sections</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">Loading...</td>
                </tr>
              )}
              {!loading && error && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-red-500 text-sm">{error}</td>
                </tr>
              )}
              {!loading && !error && blogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">No blogs yet. Click &ldquo;Add blog&rdquo; to create one.</td>
                </tr>
              )}
              {!loading && !error && blogs.map((blog) => {
                const imgUrl = blog.imageUrl ? buildImageUrl(blog.imageUrl) : null;
                return (
                  <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden shrink-0 relative flex items-center justify-center">
                          {imgUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={imgUrl} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[#006993] font-bold text-sm leading-tight line-clamp-2">{blog.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-500 text-sm line-clamp-2">{blog.content}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-bold text-sm">{blog.blogSections.length}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-bold text-sm">{blog.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(blog)}
                          className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-[#006993] hover:border-[#006993] transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(blog)}
                          className="p-1.5 border border-red-100 bg-red-50 rounded text-red-500 hover:bg-red-100 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ──────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#004560]">{editBlog ? "Edit Blog" : "Add Blog"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">

              {saveError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{saveError}</div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#006993]"
                  placeholder="Blog title"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content <span className="text-red-500">*</span></label>
                <textarea
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#006993] resize-none"
                  placeholder="Main content..."
                />
              </div>

              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
                {editBlog?.imageUrl && !form.deleteMainImage && (
                  <div className="flex items-center gap-3 mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={buildImageUrl(editBlog.imageUrl)} alt="" className="w-20 h-14 object-cover rounded-lg border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, deleteMainImage: true, imageFile: null }))}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove image
                    </button>
                  </div>
                )}
                <input
                  ref={mainImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm((f) => ({ ...f, imageFile: e.target.files?.[0] ?? null, deleteMainImage: false }))}
                  className="text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-[#006993] file:text-white hover:file:bg-[#004560] file:cursor-pointer"
                />
                {form.imageFile && (
                  <p className="text-xs text-gray-400 mt-1">{form.imageFile.name}</p>
                )}
              </div>

              {/* Sections */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Sections</label>
                  <button
                    type="button"
                    onClick={addSection}
                    className="text-xs text-[#006993] hover:text-[#004560] font-semibold flex items-center gap-1"
                  >
                    <PlusIcon className="w-3.5 h-3.5" /> Add section
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {form.sections.map((sec, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Section {sec.sectionNumber}</span>
                        <button
                          type="button"
                          onClick={() => removeSection(idx)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Section title"
                        value={sec.title}
                        onChange={(e) => updateSection(idx, { title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#006993]"
                      />
                      <textarea
                        rows={3}
                        placeholder="Section content"
                        value={sec.content}
                        onChange={(e) => updateSection(idx, { content: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#006993] resize-none"
                      />

                      {/* Section image */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Section image</label>
                        {sec.imageUrl && !sec.deleteImage && (
                          <div className="flex items-center gap-3 mb-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={buildImageUrl(sec.imageUrl)} alt="" className="w-16 h-12 object-cover rounded border border-gray-200" />
                            <button
                              type="button"
                              onClick={() => updateSection(idx, { deleteImage: true, imageFile: null })}
                              className="text-xs text-red-500 hover:text-red-700 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => updateSection(idx, { imageFile: e.target.files?.[0] ?? null, deleteImage: false })}
                          className="text-xs text-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer"
                        />
                        {sec.imageFile && <p className="text-xs text-gray-400 mt-1">{sec.imageFile.name}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                disabled={saving}
                className="px-5 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-[#006993] text-white text-sm font-medium hover:bg-[#004560] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <SpinnerIcon className="w-4 h-4 animate-spin" />}
                {saving ? "Saving..." : editBlog ? "Save changes" : "Create blog"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ──────────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-[#004560] text-lg mb-2">Delete blog?</h3>
            <p className="text-gray-500 text-sm mb-6">
              &ldquo;<span className="font-medium text-gray-700">{deleteTarget.title}</span>&rdquo; will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting && <SpinnerIcon className="w-4 h-4 animate-spin" />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}
function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
