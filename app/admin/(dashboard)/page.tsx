"use client";

import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/api/apiConfig";

type TimeRange = "Daily" | "Monthly" | "Yearly";

interface TopTrip {
  tripTitle: string;
  bookingCount: number;
}

interface ReportData {
  totalBookings: number;
  totalRevenue: number;
  topTrips: TopTrip[];
}

interface ReportResponse {
  success: boolean;
  message: string;
  data: ReportData;
}

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("Daily");
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (range: TimeRange) => {
    setLoading(true);
    setError("");

    try {
      const endpoint =
        range === "Daily"
          ? "/api/Reports/daily"
          : range === "Monthly"
            ? "/api/Reports/monthly"
            : "/api/Reports/yearly";

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
        cache: "no-store",
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(
          `Reports API failed (${res.status}): ${text || "Empty response"}`
        );
      }

      if (!text.trim()) {
        throw new Error("Reports API returned an empty response.");
      }

      let json: ReportResponse;

      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Reports API returned invalid JSON.");
      }

      if (!json.success || !json.data) {
        throw new Error(json.message || "Failed to load report.");
      }

      setReport(json.data);
    } catch (err) {
      console.error("Dashboard report error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load dashboard data."
      );
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReport(timeRange);
  }, [timeRange, fetchReport]);

  const handleRefresh = () => {
    fetchReport(timeRange);
  };

  const totalBookings = report?.totalBookings ?? 0;
  const totalRevenue = report?.totalRevenue ?? 0;
  const topTrips = report?.topTrips ?? [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">
            Admin Dashboard
          </h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Track booking activity, revenue, customers, and the trips that are
            getting the most attention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-100 p-1">
            {(["Daily", "Monthly", "Yearly"] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === range
                  ? "bg-[#004560] text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total bookings"
          value={loading ? "..." : String(totalBookings)}
          icon={<ClipboardDocumentIcon />}
          iconBg="bg-teal-50"
          iconColor="text-[#006993]"
        />

        <StatCard
          title="Total revenue"
          value={loading ? "..." : String(totalRevenue)}
          icon={<ArrowTrendingUpIcon />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />

        {/* API does not provide new customers, so don't invent a value. */}
        <StatCard
          title="New customers"
          value="—"
          icon={<UsersIcon />}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Leaders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full min-h-[300px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Top trips
              </p>
              <h3 className="text-xl font-bold text-[#004560]">
                Booking leaders
              </h3>
            </div>

            <div className="flex items-center text-[#006993] bg-[#F0F7FA] px-3 py-1.5 rounded-lg text-sm font-medium gap-1.5">
              <TrophyIcon className="w-4 h-4" />
              <span>{timeRange}</span>
            </div>
          </div>

          {loading ? (
            <div className="flex-1 border border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50/50">
              <p className="text-gray-500 text-sm">Loading...</p>
            </div>
          ) : topTrips.length === 0 ? (
            <div className="flex-1 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
              <ChartBarIcon className="w-8 h-8 text-[#006993] mb-3" />
              <h4 className="text-[#004560] font-bold text-lg mb-1">
                No top trips yet
              </h4>
              <p className="text-gray-500 text-sm max-w-sm">
                Top trips will appear after bookings are recorded.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {topTrips.map((trip, index) => (
                <div
                  key={`${trip.tripTitle}-${index}`}
                  className="flex items-center justify-between py-4 px-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#006993]">
                      #{index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {trip.tripTitle}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-[#004560]">
                    {trip.bookingCount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Report */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Current report
              </p>
              <h3 className="text-xl font-bold text-[#004560]">
                {timeRange} Report
              </h3>
            </div>

            <div className="p-2 bg-[#F0F7FA] rounded-lg text-[#006993]">
              <CalendarIcon className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-3">
            <ReportRow
              label="Total bookings"
              value={loading ? "..." : String(totalBookings)}
            />
            <ReportRow
              label="Total revenue"
              value={loading ? "..." : String(totalRevenue)}
            />
            <ReportRow label="New customers" value="—" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-2">{title}</h4>
        <p className="text-3xl font-bold text-[#004560]">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${iconBg} ${iconColor}`}>{icon}</div>
    </div>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-xl">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm font-bold text-[#004560]">{value}</span>
    </div>
  );
}

// ─── Simple SVG Icons ─────────────────────────────────────────────────────────

function ClipboardDocumentIcon(props: any) {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

function ArrowTrendingUpIcon(props: any) {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function ChartBarIcon(props: any) {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}