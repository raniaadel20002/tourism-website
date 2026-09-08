"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  getReviews,
  deleteReview,
  type Review,
} from "@/api/review";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [tripIdInput, setTripIdInput] = useState("");
  const [tripId, setTripId] = useState<number | undefined>(undefined);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getToken = (): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_access_token") || "";
    }
    return "";
  };

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const data = await getReviews(token, {
        PageNumber: pageNumber,
        PageSize: pageSize,
        ...(tripId !== undefined ? { TripId: tripId } : {}),
      });

      setReviews(data || []);
    } catch (err) {
      setReviews([]);
      setError(
        err instanceof Error ? err.message : "Failed to fetch reviews"
      );
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, tripId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleTripFilter = () => {
    const value = tripIdInput.trim();

    if (!value) {
      setTripId(undefined);
      setPageNumber(1);
      return;
    }

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed <= 0) {
      setError("Trip ID must be a valid positive number.");
      return;
    }

    setError("");
    setTripId(parsed);
    setPageNumber(1);
  };

  const handleClear = () => {
    setTripIdInput("");
    setTripId(undefined);
    setPageNumber(1);
    setError("");
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      const token = getToken();

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      await deleteReview(id, token);

      await fetchReviews();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete review"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">
            Moderation
          </h2>

          <h1 className="text-3xl font-bold text-[#004560] mb-2">
            Reviews
          </h1>

          <p className="text-gray-500 text-sm">
            Read customer feedback, inspect the related trip, and remove
            reviews when needed.
          </p>
        </div>

        {/* Showing badge */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-3 flex flex-col items-center min-w-[90px]">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
            Showing
          </span>

          <span className="text-2xl font-bold text-[#004560]">
            {reviews.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            type="number"
            value={tripIdInput}
            onChange={(e) => setTripIdInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTripFilter();
              }
            }}
            placeholder="Filter by Trip ID"
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
          />
        </div>

        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
            className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>

          <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          onClick={handleTripFilter}
          className="text-sm font-medium text-[#006993] hover:text-[#004560] transition-colors"
        >
          Search
        </button>

        <button
          onClick={handleClear}
          className="text-sm font-medium text-[#006993] hover:text-[#004560] transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[#004560] font-bold text-sm">
            Review list
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-gray-500 text-sm">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
            <ChatBubbleIcon className="w-10 h-10 text-[#006993] mb-4" />

            <h4 className="text-[#004560] font-bold text-lg mb-2">
              No reviews found
            </h4>

            <p className="text-gray-500 text-sm max-w-sm">
              Reviews will appear here after customers submit feedback.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="p-4 font-semibold text-gray-500">Customer</th>
                  <th className="p-4 font-semibold text-gray-500">Trip</th>
                  <th className="p-4 font-semibold text-gray-500">Rating</th>
                  <th className="p-4 font-semibold text-gray-500">Comment</th>
                  <th className="p-4 font-semibold text-gray-500">Date</th>
                  <th className="p-4 font-semibold text-gray-500 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="font-medium text-[#004560]">
                        {review.firstName} {review.lastName}
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        {review.email}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-gray-700">
                        {review.tripName || "Unknown trip"}
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Trip ID: {review.markerID || "-"}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-[#004560]">
                        {review.rate}/5
                      </span>
                    </td>

                    <td className="p-4 max-w-xs">
                      <p className="text-gray-600 line-clamp-2">
                        {review.comment || "-"}
                      </p>
                    </td>

                    <td className="p-4 text-gray-500 whitespace-nowrap">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
              onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
              disabled={pageNumber === 1 || loading}
              className={`flex items-center gap-1 text-sm font-medium ${
                pageNumber === 1 || loading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 hover:text-[#004560]"
              }`}
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={() => setPageNumber((prev) => prev + 1)}
              disabled={loading || reviews.length < pageSize}
              className={`flex items-center gap-1 text-sm font-medium ${
                loading || reviews.length < pageSize
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-500 hover:text-[#004560]"
              }`}
            >
              Next
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function SearchIcon(props: any) {
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

function ChatBubbleIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  );
}