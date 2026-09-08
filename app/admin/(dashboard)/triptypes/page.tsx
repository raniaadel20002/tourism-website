"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  createTripType,
  deleteTripType,
  getTripTypeById,
  getTripTypes,
  updateTripType,
} from "@/api/tripType";
import type { TripType, TripTypeNameLocalized } from "@/modules/tripType.model";

const emptyName: TripTypeNameLocalized = { en: "", fr: "", ru: "", ro: "" };

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────

interface TripTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (tripType: TripType, isEdit: boolean) => void;
  /** When provided the modal operates in "edit" mode */
  editId?: number | null;
}

function TripTypeModal({ isOpen, onClose, onSuccess, editId }: TripTypeModalProps) {
  const [name, setName] = useState<TripTypeNameLocalized>(emptyName);
  const [saving, setSaving] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const isEditMode = editId != null;

  // When opening in edit mode, load the existing trip type
  useEffect(() => {
    if (!isOpen) return;

    if (!isEditMode) {
      setName(emptyName);
      setError(null);
      setSaving(false);
      return;
    }

    const token = localStorage.getItem("admin_access_token");
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    setLoadingEdit(true);
    setError(null);
    setName(emptyName);

    getTripTypeById(editId!, token)
      .then((type) => {
        // API only returns a single `name` string; pre-fill English field
        setName({ en: type.name, fr: "", ru: "", ro: "" });
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load trip type.");
      })
      .finally(() => {
        setLoadingEdit(false);
      });
  }, [isOpen, isEditMode, editId]);

  // Auto-focus first field after opening
  useEffect(() => {
    if (isOpen && !loadingEdit) {
      const id = window.setTimeout(() => firstInputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [isOpen, loadingEdit]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, saving, onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!name.en.trim()) {
      setError("The English name is required.");
      return;
    }
    if (!name.fr.trim()) {
      setError("The French name is required.");
      return;
    }
    if (!name.ru.trim()) {
      setError("The Russian name is required.");
      return;
    }
    if (!name.ro.trim()) {
      setError("The Romanian name is required.");
      return;
    }

    const token = localStorage.getItem("admin_access_token");
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const result = isEditMode
        ? await updateTripType(editId!, name, token)
        : await createTripType(name, token);

      onSuccess(result, isEditMode);
      onClose();
    } catch (err) {
      // Surface the exact API error to the user
      setError(err instanceof Error ? err.message : "Failed to save trip type.");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!saving) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trip-type-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2
            id="trip-type-modal-title"
            className="text-xl font-bold text-[#004560]"
          >
            {isEditMode ? `Edit Trip Type #${editId}` : "Add Trip Type"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={saving}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form id="trip-type-form" onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {loadingEdit ? (
            <div className="flex items-center justify-center py-8 text-sm text-gray-500">
              Loading…
            </div>
          ) : (
            <>
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              <p className="text-xs text-gray-500">
                All four language names are required by the API.
              </p>

              {(["en", "fr", "ru", "ro"] as const).map((locale, idx) => (
                <div key={locale}>
                  <label
                    htmlFor={`trip-type-name-${locale}`}
                    className="block text-xs font-bold text-gray-500 uppercase mb-1"
                  >
                    {locale === "en"
                      ? "English"
                      : locale === "fr"
                      ? "French"
                      : locale === "ru"
                      ? "Russian"
                      : "Romanian"}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={idx === 0 ? firstInputRef : undefined}
                    id={`trip-type-name-${locale}`}
                    type="text"
                    required
                    value={name[locale]}
                    onChange={(e) =>
                      setName((prev) => ({ ...prev, [locale]: e.target.value }))
                    }
                    placeholder={`Trip type name in ${
                      locale === "en"
                        ? "English"
                        : locale === "fr"
                        ? "French"
                        : locale === "ru"
                        ? "Russian"
                        : "Romanian"
                    }`}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993] focus:ring-1 focus:ring-[#006993]/20"
                  />
                </div>
              ))}
            </>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            disabled={saving}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="trip-type-form"
            disabled={saving || loadingEdit}
            className="px-4 py-2 text-sm font-medium bg-[#006993] text-white rounded-lg hover:bg-[#004560] transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving…
              </>
            ) : isEditMode ? (
              "Save changes"
            ) : (
              "Create trip type"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TripTypesPage() {
  const [types, setTypes] = useState<TripType[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadTypes = useCallback(
    async (size = pageSize) => {
      const token = localStorage.getItem("admin_access_token");
      if (!token) {
        setError("Your session has expired. Please sign in again.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        setTypes(await getTripTypes(token, { pageNumber: 1, pageSize: size }));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load trip types."
        );
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    const id = window.setTimeout(() => void loadTypes(), 0);
    return () => window.clearTimeout(id);
  }, [loadTypes]);

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

  const handleModalSuccess = (result: TripType, isEdit: boolean) => {
    setTypes((current) =>
      isEdit
        ? current.map((item) => (item.id === result.id ? result : item))
        : [result, ...current]
    );
    setSuccess(
      isEdit
        ? "Trip type updated successfully."
        : "Trip type created successfully."
    );
  };

  const remove = async (type: TripType) => {
    const token = localStorage.getItem("admin_access_token");
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }
    if (
      !window.confirm(
        `Delete trip type "${type.name}"? This cannot be undone.`
      )
    )
      return;

    setDeletingId(type.id);
    setError(null);
    setSuccess(null);
    try {
      await deleteTripType(type.id, token);
      setTypes((current) => current.filter((item) => item.id !== type.id));
      setSuccess("Trip type deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete trip type."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">
            Content Manager
          </h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">Trip Types</h1>
          <p className="text-gray-500 text-sm">
            Manage multilingual trip categories used to organize tours and
            customer browsing.
          </p>
        </div>
        <button
          type="button"
          id="add-trip-type-btn"
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#006993] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          Add trip type
        </button>
      </div>

      {/* Feedback banner */}
      {(error || success) && (
        <div
          role={error ? "alert" : "status"}
          className={`rounded-lg border p-3 text-sm ${
            error
              ? "border-red-100 bg-red-50 text-red-600"
              : "border-emerald-100 bg-emerald-50 text-emerald-700"
          }`}
        >
          {error ?? success}
        </div>
      )}

      {/* Page size control */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => {
              const size = Number(e.target.value);
              setPageSize(size);
              void loadTypes(size);
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

      {/* Trip Types table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[#004560] font-bold text-sm">Trip type list</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    Loading trip types…
                  </td>
                </tr>
              )}
              {!loading && !error && types.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No trip types have been added yet.
                  </td>
                </tr>
              )}
              {!loading &&
                types.map((type) => (
                  <tr
                    key={type.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-[#006993] font-bold text-sm">
                        {type.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-bold text-sm">
                        {type.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(type.id)}
                          title="Edit trip type"
                          className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-[#006993] hover:border-[#006993]"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === type.id}
                          onClick={() => void remove(type)}
                          title="Delete trip type"
                          className="p-1.5 border border-red-100 bg-red-50 rounded text-red-500 hover:bg-red-100 disabled:opacity-50"
                        >
                          {deletingId === type.id ? (
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
      <TripTypeModal
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

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}