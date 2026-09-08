"use client";

import React, { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/api/apiConfig";

type Admin = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  nationality: string;
  notes: string;
  createdAt: string;
};

type AdminsResponse = {
  success: boolean;
  message: string;
  data: Admin[];
};

type AdminResponse = {
  success: boolean;
  message: string;
  data: Admin;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  password: string;
  notes: string;
};

const emptyForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  password: "",
  notes: "",
};

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const pageSize = 20;

  // ─────────────────────────────────────────────────────────────────────────
  // GET ADMINS
  // ─────────────────────────────────────────────────────────────────────────

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_access_token");

      const res = await fetch(
        `${API_BASE_URL}/api/Admins?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const text = await res.text();

      if (!res.ok) {
        throw new Error(
          `Admins API failed (${res.status}): ${
            text || "Empty response"
          }`
        );
      }

      if (!text.trim()) {
        throw new Error("Admins API returned an empty response.");
      }

      let json: AdminsResponse;

      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Admins API returned invalid JSON.");
      }

      if (!json.success || !Array.isArray(json.data)) {
        throw new Error(json.message || "Failed to load admins.");
      }

      setAdmins(json.data);
    } catch (err) {
      console.error("Admins GET error:", err);

      setError(
        err instanceof Error ? err.message : "Failed to load admins."
      );

      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // ─────────────────────────────────────────────────────────────────────────
  // OPEN ADD MODAL
  // ─────────────────────────────────────────────────────────────────────────

  const openAddModal = () => {
    setEditingAdmin(null);
    setFormData(emptyForm);
    setError("");
    setModalOpen(true);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // OPEN EDIT MODAL
  // ─────────────────────────────────────────────────────────────────────────

  const openEditModal = (admin: Admin) => {
    setEditingAdmin(admin);

    setFormData({
      firstName: admin.firstName || "",
      lastName: admin.lastName || "",
      email: admin.email || "",
      phone: admin.phone || "",
      nationality: admin.nationality || "",
      password: "",
      notes: admin.notes || "",
    });

    setError("");
    setModalOpen(true);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // CLOSE MODAL
  // ─────────────────────────────────────────────────────────────────────────

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingAdmin(null);
    setFormData(emptyForm);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // FORM CHANGE
  // ─────────────────────────────────────────────────────────────────────────

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ─────────────────────────────────────────────────────────────────────────
  // POST / PUT
  // ─────────────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_access_token");

      let body: Record<string, unknown>;
      let method: "POST" | "PUT";

      if (editingAdmin) {
        // Swagger PUT accepts ONLY these fields.
        method = "PUT";

        body = {
          id: editingAdmin.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        };
      } else {
        // Swagger POST fields.
        method = "POST";

        body = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          nationality: formData.nationality,
          password: formData.password,
          notes: formData.notes,
        };
      }

      const res = await fetch(`${API_BASE_URL}/api/Admins`, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const text = await res.text();

      if (!res.ok) {
        let message = `Admins ${method} failed (${res.status})`;

        if (text.trim()) {
          try {
            const errorJson = JSON.parse(text);
            message =
              errorJson.message ||
              errorJson.detail ||
              message;
          } catch {
            message = `${message}: ${text}`;
          }
        }

        throw new Error(message);
      }

      if (!text.trim()) {
        throw new Error("Server returned an empty response.");
      }

      let json: AdminResponse | { success: boolean; message: string };

      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid JSON.");
      }

      if (!json.success) {
        throw new Error(json.message || "Operation failed.");
      }

      setModalOpen(false);
      setEditingAdmin(null);
      setFormData(emptyForm);

      await fetchAdmins();
    } catch (err) {
      console.error(`Admins ${editingAdmin ? "PUT" : "POST"} error:`, err);

      setError(
        err instanceof Error ? err.message : "Operation failed."
      );
    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────────────────────────────────────

  const handleDelete = async (admin: Admin) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${admin.firstName} ${admin.lastName}?`
    );

    if (!confirmed) return;

    setDeletingId(admin.id);
    setError("");

    try {
      const token = localStorage.getItem("admin_access_token");

      const res = await fetch(
        `${API_BASE_URL}/api/Admins/${admin.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await res.text();

      if (!res.ok) {
        let message = `Admins DELETE failed (${res.status})`;

        if (text.trim()) {
          try {
            const errorJson = JSON.parse(text);

            message =
              errorJson.message ||
              errorJson.detail ||
              message;
          } catch {
            message = `${message}: ${text}`;
          }
        }

        throw new Error(message);
      }

      if (text.trim()) {
        try {
          const json = JSON.parse(text);

          if (json.success === false) {
            throw new Error(json.message || "Delete failed.");
          }
        } catch (parseError) {
          // Ignore non-JSON successful DELETE responses.
          if (
            parseError instanceof Error &&
            parseError.message === "Delete failed."
          ) {
            throw parseError;
          }
        }
      }

      await fetchAdmins();
    } catch (err) {
      console.error("Admins DELETE error:", err);

      setError(
        err instanceof Error ? err.message : "Failed to delete admin."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // SEARCH
  // ─────────────────────────────────────────────────────────────────────────

  const filteredAdmins = admins.filter((admin) => {
    const fullName =
      `${admin.firstName} ${admin.lastName}`.toLowerCase();

    const searchValue = search.toLowerCase().trim();

    return (
      fullName.includes(searchValue) ||
      admin.email.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">
            Content Manager
          </h2>

          <h1 className="text-3xl font-bold text-[#004560] mb-2">
            Admins
          </h1>

          <p className="text-gray-500 text-sm">
            Manage administrative users, roles, and contact information used
            to access the admin dashboard.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#006993] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add admin
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 w-full max-w-[300px] text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
        />

        <div className="relative">
          <select
            value={pageSize}
            disabled
            className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]"
          >
            <option value={20}>20 per page</option>
          </select>

          <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          onClick={fetchAdmins}
          disabled={loading}
          className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-[#006993] hover:border-[#006993] transition-colors disabled:opacity-50"
          title="Refresh"
        >
          ↻
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[#004560] font-bold text-sm">
            Admin list
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Role
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Phone
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
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500 text-sm"
                  >
                    Loading admins...
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500 text-sm"
                  >
                    No admins found.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-[#004560] font-bold text-sm">
                        {admin.firstName} {admin.lastName}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-500 text-sm">
                        {admin.email}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium text-sm">
                        {admin.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium text-sm">
                        {admin.phone || "—"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium text-sm">
                        {admin.id}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(admin)}
                          disabled={deletingId === admin.id}
                          className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-[#006993] hover:border-[#006993] transition-colors disabled:opacity-50"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(admin)}
                          disabled={deletingId === admin.id}
                          className="p-1.5 border border-red-100 bg-red-50 rounded text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          {deletingId === admin.id ? (
                            <span className="block w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                          ) : (
                            <TrashIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Page{" "}
            <span className="text-[#006993] font-medium">
              {pageNumber}
            </span>
          </span>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setPageNumber((prev) => Math.max(1, prev - 1))
              }
              disabled={pageNumber === 1 || loading}
              className={`flex items-center gap-1 text-sm font-medium ${
                pageNumber === 1 || loading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 hover:text-[#004560]"
              } transition-colors`}
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={() => setPageNumber((prev) => prev + 1)}
              disabled={loading || admins.length < pageSize}
              className={`flex items-center gap-1 text-sm font-medium ${
                loading || admins.length < pageSize
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 hover:text-[#004560]"
              } transition-colors`}
            >
              Next
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          ADD / EDIT MODAL
      ───────────────────────────────────────────────────────────────────── */}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-[#004560]">
                  {editingAdmin ? "Edit admin" : "Add admin"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {editingAdmin
                    ? "Update the admin information."
                    : "Create a new administrative user."}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />

                  <FormField
                    label="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email */}
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required={!editingAdmin}
                  disabled={!!editingAdmin}
                />

                {/* Phone + Nationality */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={!editingAdmin}
                  />

                  <FormField
                    label="Nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    required={!editingAdmin}
                  />
                </div>

                {/* Password - Add only */}
                {!editingAdmin && (
                  <FormField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#006993] resize-none"
                    placeholder="Notes"
                  />
                </div>

                {/* Edit info */}
                {editingAdmin && (
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
                    Email, nationality, notes, and password are not sent by
                    the PUT endpoint. Only first name, last name, phone, and
                    ID are supported for editing according to the API.
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-[#006993] text-white rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingAdmin
                      ? "Save changes"
                      : "Add admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM FIELD
// ─────────────────────────────────────────────────────────────────────────────

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#006993] disabled:bg-gray-50 disabled:text-gray-400"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

function PlusIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

function PencilIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function ChevronLeftIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

