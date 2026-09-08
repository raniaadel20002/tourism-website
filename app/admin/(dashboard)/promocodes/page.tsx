"use client";

import React, { useState, useEffect } from "react";
import { getPromoCodes, createPromoCode, type PromoCode, type PromoCodeMutation } from "@/api/promoCode";
import { getTrips, type Trip } from "@/api/trips";

export default function PromoCodesPage() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "related" | "general">("all");

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_access_token") || "";
    }
    return "";
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const token = getToken();
      const [promoData, tripsData] = await Promise.all([
        getPromoCodes(token),
        getTrips(token)
      ]);
      setPromoCodes(promoData);
      setTrips(tripsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  const handleSuccess = () => {
    fetchData();
    setIsAddModalOpen(false);
  };

  const filteredPromoCodes = promoCodes.filter(code => {
    if (filter === "related") return code.tripId && code.tripId > 0;
    if (filter === "general") return !code.tripId || code.tripId === 0;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">
            Marketing
          </h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">Promo Codes</h1>
          <p className="text-gray-500 text-sm">
            Create and manage discount promo codes. Codes can apply to all trips or a specific trip.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#006993] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          New Promo Code
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-[#006993] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Codes
          </button>
          <button
            onClick={() => setFilter("related")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "related"
                ? "bg-[#006993] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Trip-Specific
          </button>
          <button
            onClick={() => setFilter("general")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "general"
                ? "bg-[#006993] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            General
          </button>
        </div>
      </div>

      {/* Promo Codes List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[#004560] font-bold text-sm">
            Promo Codes ({filteredPromoCodes.length})
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading promo codes...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : filteredPromoCodes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No promo codes found. Click 'New Promo Code' to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Usage Limit
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Trip
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPromoCodes.map((code) => (
                  <tr key={code.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#006993] text-white font-mono font-bold text-sm px-3 py-1.5 rounded">
                          {code.code}
                        </div>
                        <span className="text-xs text-gray-400">ID: {code.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {code.discountEuro !== null && code.discountEuro > 0 && (
                          <span className="text-green-600 font-bold text-sm">
                            €{code.discountEuro} OFF
                          </span>
                        )}
                        {code.discountpercent !== null && code.discountpercent > 0 && (
                          <span className="text-green-600 font-bold text-sm">
                            {code.discountpercent}% OFF
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700 text-sm">
                        {code.limited > 0 ? `${code.limited} uses` : "Unlimited"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {code.tripId && code.tripId > 0 ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-[#006993] font-medium text-sm">
                            {code.tripName || "Trip #" + code.tripId}
                          </span>
                          {code.tripType && (
                            <span className="text-gray-400 text-xs">{code.tripType}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">All Trips</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {code.createdAt && (
                          <span className="text-gray-600 text-sm">
                            {new Date(code.createdAt).toLocaleDateString()}
                          </span>
                        )}
                        {code.createdBy && (
                          <span className="text-gray-400 text-xs">by {code.createdBy}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <PromoCodeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleSuccess}
          trips={trips}
        />
      )}
    </div>
  );
}

// Promo Code Modal Component
function PromoCodeModal({
  isOpen,
  onClose,
  onSuccess,
  trips,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  trips: Trip[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [discountEuro, setDiscountEuro] = useState<number>(0);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [limited, setLimited] = useState<number>(0);
  const [tripId, setTripId] = useState<number>(0);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_access_token") || "";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (discountEuro <= 0 && discountPercent <= 0) {
      setError("Please specify either euro discount or percentage discount");
      return;
    }
    if (discountEuro > 0 && discountPercent > 0) {
      setError("Please specify only one type of discount (euro OR percentage)");
      return;
    }
    if (discountPercent > 100) {
      setError("Percentage discount cannot exceed 100%");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const token = getToken();
      if (!token) {
        setError("You must be logged in");
        return;
      }

      const promoData: PromoCodeMutation = {
        discountEuro: discountEuro>0? discountEuro:null,
        discountpercent: discountPercent>0? discountPercent:null,
        limited,
        tripId: tripId > 0 ? tripId : null,
      };

      await createPromoCode(promoData, token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create promo code");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#004560]">Create Promo Code</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Euro Discount
              </label>
              <input
                type="number"
                value={discountEuro}
                onChange={(e) => setDiscountEuro(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                min="0"
                step="0.01"
                placeholder="e.g., 10.00"
              />
              <p className="text-xs text-gray-500 mt-1">Fixed euro amount off the price</p>
            </div>

            <div className="text-center text-gray-400 text-sm font-medium">OR</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Percentage Discount
              </label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                min="0"
                max="100"
                placeholder="e.g., 20"
              />
              <p className="text-xs text-gray-500 mt-1">Percentage off the price (0-100)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                value={limited}
                onChange={(e) => setLimited(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                min="0"
                placeholder="0 = unlimited"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum number of times this code can be used (0 for unlimited)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apply to Trip (optional)
              </label>
              <select
                value={tripId}
                onChange={(e) => setTripId(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
              >
                <option value={0}>All Trips (General Code)</option>
                {trips.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.name || `Trip #${trip.id}`}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Leave as "All Trips" for a general promo code
              </p>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-[#006993] text-white rounded-lg hover:bg-[#004560] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              "Create Promo Code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Icons
function PlusIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
