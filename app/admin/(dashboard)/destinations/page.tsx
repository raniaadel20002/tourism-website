"use client";

import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  type Destination,
} from "@/api/destinations";
import { buildImageUrl } from "@/api/gallery";

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────

interface DestinationModalProps {
  isOpen: boolean;
  editId?: number | null;
  onClose: () => void;
  onSuccess: (dest: Destination, isEdit: boolean) => void;
}

const emptyForm = {
  nameEn: "",
  nameFr: "",
  nameRu: "",
  nameRo: "",
  isFeatured: false,
  imageFile: null as File | null,
};

function DestinationModal({ isOpen, editId, onClose, onSuccess }: DestinationModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = editId != null;

  // Reset / pre-fill when modal opens
  useEffect(() => {
    if (!isOpen) return;

    setError(null);
    setSaving(false);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (!isEdit) {
      setForm(emptyForm);
      return;
    }

    const token = localStorage.getItem("admin_access_token");
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    setLoadingEdit(true);
    setForm(emptyForm);
    getDestinationById(editId!, token)
      .then((dest) => {
        setForm({
          nameEn: dest.name ?? "",
          nameFr: "",
          nameRu: "",
          nameRo: "",
          isFeatured: dest.isFeatured,
          imageFile: null,
        });
        setPreviewUrl(dest.imageUrl ? buildImageUrl(dest.imageUrl) : null);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load destination.")
      )
      .finally(() => setLoadingEdit(false));
  }, [isOpen, isEdit, editId]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, saving, onClose]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, imageFile: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nameEn.trim()) { setError("The English name is required."); return; }
    if (!form.nameFr.trim()) { setError("The French name is required."); return; }
    if (!form.nameRu.trim()) { setError("The Russian name is required."); return; }
    if (!form.nameRo.trim()) { setError("The Romanian name is required."); return; }
    if (!isEdit && !form.imageFile) { setError("An image is required for new destinations."); return; }

    const token = localStorage.getItem("admin_access_token");
    if (!token) { setError("Your session has expired. Please sign in again."); return; }

    setSaving(true);
    setError(null);
    try {
      const result = isEdit
        ? await updateDestination({ id: editId!, ...form }, token)
        : await createDestination(form, token);
      onSuccess(result, isEdit);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save destination.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dest-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget && !saving) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 id="dest-modal-title" className="text-xl font-bold text-[#004560]">
            {isEdit ? `Edit Destination #${editId}` : "Add Destination"}
          </h2>
          <button
            type="button"
            onClick={() => { if (!saving) onClose(); }}
            disabled={saving}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form id="dest-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {loadingEdit ? (
            <div className="flex items-center justify-center py-10 text-sm text-gray-500">Loading…</div>
          ) : (
            <>
              {error && (
                <div role="alert" className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Name fields */}
              <p className="text-xs text-gray-400">All four language names are required by the API.</p>
              {([
                ["nameEn", "English"],
                ["nameFr", "French"],
                ["nameRu", "Russian"],
                ["nameRo", "Romanian"],
              ] as const).map(([key, label]) => (
                <div key={key}>
                  <label htmlFor={`dest-${key}`} className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`dest-${key}`}
                    type="text"
                    required
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={`Destination name in ${label}`}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993] focus:ring-1 focus:ring-[#006993]/20"
                  />
                </div>
              ))}

              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.isFeatured}
                  onClick={() => setForm((f) => ({ ...f, isFeatured: !f.isFeatured }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#006993]/30 ${form.isFeatured ? "bg-[#006993]" : "bg-gray-200"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.isFeatured ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className="text-sm text-gray-700">Featured destination</span>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Image {!isEdit && <span className="text-red-500">*</span>}
                  {isEdit && <span className="normal-case font-normal text-gray-400 ml-1">(leave blank to keep current)</span>}
                </label>
                {previewUrl && (
                  <div className="mb-2 w-full h-36 rounded-lg overflow-hidden border border-gray-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#006993]/10 file:text-[#006993] file:text-sm file:font-medium hover:file:bg-[#006993]/20"
                />
              </div>
            </>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={() => { if (!saving) onClose(); }}
            disabled={saving}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="dest-form"
            disabled={saving || loadingEdit}
            className="px-4 py-2 text-sm font-medium bg-[#006993] text-white rounded-lg hover:bg-[#004560] transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving…
              </>
            ) : isEdit ? (
              "Save changes"
            ) : (
              "Create destination"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadDestinations = useCallback(async (search = searchQuery, size = pageSize) => {
    const token = localStorage.getItem("admin_access_token");
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setDestinations(
        await getDestinations(token, { pageNumber: 1, pageSize: size, searchTerm: search || undefined })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load destinations.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, pageSize]);

  useEffect(() => {
    const id = window.setTimeout(() => void loadDestinations(), 0);
    return () => window.clearTimeout(id);
  }, [loadDestinations]);

  // Debounced search
  useEffect(() => {
    const id = window.setTimeout(() => void loadDestinations(searchQuery, pageSize), 400);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const openAdd = () => {
    setEditingId(null);
    setError(null);
    setSuccess(null);
    setModalOpen(true);
  };

  const openEdit = (id: number) => {
    setEditingId(id);
    setError(null);
    setSuccess(null);
    setModalOpen(true);
  };

  const handleModalSuccess = (result: Destination, isEdit: boolean) => {
    setDestinations((prev) =>
      isEdit
        ? prev.map((d) => (d.id === result.id ? result : d))
        : [result, ...prev]
    );
    setSuccess(isEdit ? "Destination updated successfully." : "Destination created successfully.");
  };

  const remove = async (dest: Destination) => {
    const token = localStorage.getItem("admin_access_token");
    if (!token) { setError("Your session has expired. Please sign in again."); return; }
    if (!window.confirm(`Delete destination "${dest.name}"? This cannot be undone.`)) return;

    setDeletingId(dest.id);
    setError(null);
    setSuccess(null);
    try {
      await deleteDestination(dest.id, token);
      setDestinations((prev) => prev.filter((d) => d.id !== dest.id));
      setSuccess("Destination deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete destination.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">Content Manager</h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">Destinations</h1>
          <p className="text-gray-500 text-sm">
            Manage destination names, imagery, featured status, and translated API content.
          </p>
        </div>
        <button
          type="button"
          id="add-destination-btn"
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#006993] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          Add destination
        </button>
      </div>

      {/* Feedback banner */}
      {(error || success) && (
        <div
          role={error ? "alert" : "status"}
          className={`rounded-lg border p-3 text-sm ${error ? "border-red-100 bg-red-50 text-red-600" : "border-emerald-100 bg-emerald-50 text-emerald-700"}`}
        >
          {error ?? success}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-[500px]">
          <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search destinations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
          />
        </div>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => {
              const size = Number(e.target.value);
              setPageSize(size);
              void loadDestinations(searchQuery, size);
            }}
            className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
          <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[#004560] font-bold text-sm">Destination list</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[40%]">Destination</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Trips</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                    Loading destinations…
                  </td>
                </tr>
              )}
              {!loading && !error && destinations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                    No destinations found.
                  </td>
                </tr>
              )}
              {!loading &&
                destinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden shrink-0 relative border border-gray-200">
                          {dest.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={buildImageUrl(dest.imageUrl ?? "")}
                              alt={dest.name ?? ""}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                              <ImagePlaceholderIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#006993] font-bold text-sm">{dest.name ?? "—"}</span>
                          <span className="text-gray-500 text-xs mt-0.5">ID {dest.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {dest.isFeatured ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200">
                          <StarIcon className="w-3.5 h-3.5" />
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          <XMarkIcon className="w-3.5 h-3.5" />
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-bold text-sm">{dest.tripsCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(dest.id)}
                          title="Edit destination"
                          className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-[#006993] hover:border-[#006993] transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === dest.id}
                          onClick={() => void remove(dest)}
                          title="Delete destination"
                          className="p-1.5 border border-red-100 bg-red-50 rounded text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          {deletingId === dest.id ? (
                            <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin block" />
                          ) : (
                            <TrashIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit modal */}
      <DestinationModal
        isOpen={modalOpen}
        editId={editingId}
        onClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
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
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}
function XMarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
function ImagePlaceholderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}
