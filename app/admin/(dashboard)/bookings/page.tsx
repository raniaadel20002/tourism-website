"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  getBookings,
  confirmBooking,
  finishBooking,
  deleteBooking,
  type Booking,
  type GetBookingsParams,
} from "@/api/bookings";

// ─── Status helpers ───────────────────────────────────────────────────────────

/** Map numeric status from API to display label */
function statusLabel(status: number): string {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Confirmed";
    case 2:
      return "Finished";
    case 3:
      return "Cancelled";
    default:
      return `Status ${status}`;
  }
}

function statusStyles(status: number): string {
  switch (status) {
    case 0:
      return "bg-yellow-50 text-yellow-600";
    case 1:
      return "bg-green-50 text-green-600";
    case 2:
      return "bg-blue-50 text-blue-600";
    case 3:
      return "bg-red-50 text-red-500";
    default:
      return "bg-gray-50 text-gray-600";
  }
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ─── Tab → API Status mapping ─────────────────────────────────────────────────
const TAB_STATUS: Record<string, number | undefined> = {
  All: undefined,
  Pending: 0,
  Confirmed: 1,
  Finished: 2,
  Cancelled: 3,
};

const TABS = ["All", "Pending", "Confirmed", "Finished", "Cancelled"];

const PAGE_SIZES = [10, 25, 50];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Filters
  const [activeTab, setActiveTab] = useState("All");
  const [searchItem, setSearchItem] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [date, setDate] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  // Expanded row for trip details
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getToken = (): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_access_token") || "";
    }
    return "";
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    setActionError(null);

    try {
      const token = getToken();
      const params: GetBookingsParams = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        Status: TAB_STATUS[activeTab],
        SearchItem: searchItem || undefined,
        Phone: phone || undefined,
        Nationality: nationality || undefined,
        Date: date || undefined,
      };

      const data = await getBookings(token, params);
      setBookings(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchItem, phone, nationality, date, pageSize, pageNumber]);

  // Debounce filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings();
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchBookings]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPageNumber(1);
  };

  const handleConfirm = async (id: number) => {
    setActionLoading(id);
    setActionError(null);
    try {
      const token = getToken();
      await confirmBooking(id, token);
      // Update status in local state immediately
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 1 } : b))
      );
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to confirm booking"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleFinish = async (id: number) => {
    setActionLoading(id);
    setActionError(null);
    try {
      const token = getToken();
      await finishBooking(id, token);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 2 } : b))
      );
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to finish booking"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }
    setActionLoading(id);
    setActionError(null);
    try {
      const token = getToken();
      await deleteBooking(id, token);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to delete booking"
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">
            Operations
          </h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">Bookings</h1>
          <p className="text-gray-500 text-sm">
            View, filter, and manage all customer bookings. Confirm pending
            bookings, mark them as finished, or remove them.
          </p>
        </div>
      </div>

      {/* Action error banner */}
      {actionError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <strong className="font-bold">Error: </strong>
          {actionError}
        </div>
      )}

      {/* Filters and Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col gap-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#006993] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Inputs */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchItem}
              onChange={(e) => {
                setSearchItem(e.target.value);
                setPageNumber(1);
              }}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <input
              type="text"
              placeholder="Filter by phone..."
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPageNumber(1);
              }}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <input
              type="text"
              placeholder="Filter by nationality..."
              value={nationality}
              onChange={(e) => {
                setNationality(e.target.value);
                setPageNumber(1);
              }}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
            />
          </div>
          <div className="relative flex-1 min-w-[150px]">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setPageNumber(1);
              }}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
            />
          </div>
        </div>

        {/* Per page selector */}
        <div className="flex justify-end mt-2">
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageNumber(1);
              }}
              className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]"
            >
              {PAGE_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s} per page
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-[#004560] font-bold text-sm">Bookings list</h3>
          {loading && (
            <span className="text-xs text-gray-400 animate-pulse">
              Loading...
            </span>
          )}
        </div>

        {error && (
          <div className="p-6 text-center text-red-600 text-sm">{error}</div>
        )}

        {!error && !loading && bookings.length === 0 && (
          <div className="p-6 text-center text-gray-400 text-sm">
            No bookings found.
          </div>
        )}

        {!error && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Nationality
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <React.Fragment key={booking.id}>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-[#006993] font-bold text-sm">
                          #{booking.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-[#006993] font-bold text-sm">
                            {booking.firstName} {booking.lastName}
                          </span>
                          <span className="text-gray-500 text-xs mt-0.5">
                            {booking.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium text-sm">
                          {booking.phone}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium text-sm">
                          {booking.nationality}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium text-sm">
                          {formatDate(booking.bookingDate)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#006993] font-bold text-sm">
                          €{booking.totalPrice?.toFixed(2) ?? "0.00"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold text-center min-w-[70px] ${statusStyles(
                            booking.status
                          )}`}
                        >
                          {statusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 flex-wrap">
                          {/* View trip details toggle */}
                          <button
                            onClick={() =>
                              setExpandedId(
                                expandedId === booking.id ? null : booking.id
                              )
                            }
                            className="px-3 py-1.5 border border-gray-200 rounded text-[#006993] text-xs font-medium hover:bg-gray-50 transition-colors"
                          >
                            {expandedId === booking.id ? "Hide" : "View"}
                          </button>

                          {/* Confirm — only for Pending */}
                          {booking.status === 0 && (
                            <button
                              onClick={() => handleConfirm(booking.id)}
                              disabled={actionLoading === booking.id}
                              className="px-3 py-1.5 bg-green-50 border border-green-200 rounded text-green-700 text-xs font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                            >
                              {actionLoading === booking.id
                                ? "..."
                                : "Confirm"}
                            </button>
                          )}

                          {/* Finish — only for Confirmed */}
                          {booking.status === 1 && (
                            <button
                              onClick={() => handleFinish(booking.id)}
                              disabled={actionLoading === booking.id}
                              className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors disabled:opacity-50"
                            >
                              {actionLoading === booking.id
                                ? "..."
                                : "Finish"}
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(booking.id)}
                            disabled={actionLoading === booking.id}
                            className="px-3 py-1.5 bg-red-50 border border-red-200 rounded text-red-600 text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === booking.id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded trip details row */}
                    {expandedId === booking.id && (
                      <tr className="bg-blue-50/30">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="text-xs text-gray-700 space-y-3">
                            {/* Customer extras */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
                              <div>
                                <span className="font-semibold text-gray-500 uppercase tracking-wider">Hotel</span>
                                <p className="mt-0.5">{booking.hotelName || "—"}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-500 uppercase tracking-wider">Room</span>
                                <p className="mt-0.5">{booking.roomNo || "—"}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-500 uppercase tracking-wider">Created</span>
                                <p className="mt-0.5">{formatDate(booking.createdAt)}</p>
                              </div>
                            </div>

                            {/* Trip bookings */}
                            {booking.tripsBookings && booking.tripsBookings.length > 0 ? (
                              <div>
                                <p className="font-semibold text-gray-600 mb-2">Trip(s):</p>
                                <div className="space-y-2">
                                  {booking.tripsBookings.map((tb) => (
                                    <div
                                      key={tb.id}
                                      className="bg-white rounded-lg p-3 border border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3"
                                    >
                                      <div>
                                        <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Trip</span>
                                        <p className="font-medium text-gray-800 mt-0.5">{tb.title}</p>
                                      </div>
                                      <div>
                                        <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Leave Date</span>
                                        <p className="mt-0.5">{formatDate(tb.leaveDate)}</p>
                                      </div>
                                      <div>
                                        <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Pax</span>
                                        <p className="mt-0.5">
                                          {tb.noAdult} Adult{tb.noAdult !== 1 ? "s" : ""}
                                          {tb.noChild > 0 ? `, ${tb.noChild} Child${tb.noChild !== 1 ? "ren" : ""}` : ""}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Sub-total</span>
                                        <p className="font-semibold text-[#006993] mt-0.5">
                                          €{tb.subTotal?.toFixed(2) ?? "0.00"}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-400 italic">No trip details available.</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        {!error && bookings.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Page {pageNumber}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
                className="px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPageNumber((p) => p + 1)}
                disabled={bookings.length < pageSize}
                className="px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Simple SVG Icons ─────────────────────────────────────────────────────────

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
