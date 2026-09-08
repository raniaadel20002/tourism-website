"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getTrips, deactivateTrip, reactivateTrip, type Trip } from "@/api/trips";
import { getTripTypes, type TripType } from "@/api/tripType";
import { getDestinations, type Destination } from "@/api/destinations";
import AddTripModal from "@/components/Admin/AddTripModal";
import { API_BASE_URL } from "@/api/apiConfig";

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripTypes, setTripTypes] = useState<TripType[]>([]);
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<number | "All">("All");
  const [selectedType, setSelectedType] = useState<number | "All">("All");
  const [destinationNameFilter, setDestinationNameFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active only");
  const [pageSize, setPageSize] = useState(10);

  // Get auth token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_access_token") || "";
    }
    return "";
  };

  // Fetch initial dropdown data on mount
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const token = getToken();
        const [typesData, destData] = await Promise.all([
          getTripTypes(token).catch(() => []),
          getDestinations(token, { pageNumber: 1, pageSize: 100 }).catch(() => [])
        ]);
        setTripTypes(typesData);
        setAllDestinations(destData);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      }
    }
    fetchInitialData();
  }, []);

  // Fetch trips dynamically based on filters (debounced)
  useEffect(() => {
    async function fetchTripsData() {
      try {
        setLoading(true);
        const token = getToken();
        const tripsData = await getTrips(token, 1, pageSize, {
          searchItem: searchQuery || undefined,
          destinationId: selectedDestination !== "All" ? selectedDestination : undefined,
          typeId: selectedType !== "All" ? selectedType : undefined,
          minPrice: minPrice ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
          includeInactive: statusFilter === "All statuses"
        });
        setTrips(tripsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchTripsData();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedDestination, selectedType, minPrice, maxPrice, statusFilter, pageSize, refreshTrigger]);

  const handleAddTripSuccess = () => {
    // Refresh the trips list after create or update
    setRefreshTrigger(prev => prev + 1);
  };

  const openEditModal = (trip: Trip) => {
    setEditingTrip(trip);
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setEditingTrip(null);
  };

  // Handle toggle active/inactive
  const handleToggleStatus = async (trip: Trip) => {
    try {
      const token = getToken();
      if (trip.isActive) {
        await deactivateTrip(trip.id, token);
      } else {
        await reactivateTrip(trip.id, token);
      }
      // Refresh the trip in local state
      setTrips(prev => prev.map(t => 
        t.id === trip.id ? { ...t, isActive: !t.isActive } : t
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to toggle trip status");
    }
  };

  // Filter trips (only for destinationNameFilter which API doesn't support directly)
  const filteredTrips = trips.filter(trip => {
    // Destination name text input
    if (destinationNameFilter && !trip.destinationInfo?.name?.toLowerCase().includes(destinationNameFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">
            Content Manager
          </h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">Trips</h1>
          <p className="text-gray-500 text-sm">
            Manage tour content, prices, schedules, availability, translations, and image galleries.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#006993] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          Add trip
        </button>
      </div>

      {/* Filters — Row 1 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search trips"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
            />
          </div>
          {/* Language */}
          <div className="relative">
            <select className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]">
              <option>English</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {/* All destinations */}
          <div className="relative">
            <select 
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value === "All" ? "All" : Number(e.target.value))}
              className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]"
            >
              <option value="All">All destinations</option>
              {allDestinations.map(dest => (
                <option key={dest.id} value={dest.id}>{dest.name}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {/* All types */}
          <div className="relative">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value === "All" ? "All" : Number(e.target.value))}
              className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]"
            >
              <option value="All">All types</option>
              {tripTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filters — Row 2 */}
        <div className="flex flex-wrap gap-4">
          {/* Destination name */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Destination name"
              value={destinationNameFilter}
              onChange={(e) => setDestinationNameFilter(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
            />
          </div>
          {/* Min price */}
          <div className="w-32">
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
            />
          </div>
          {/* Max price */}
          <div className="w-32">
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
            />
          </div>
          {/* Active only */}
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]"
            >
              <option>Active only</option>
              <option>All statuses</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {/* Per page */}
          <div className="relative">
            <select 
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#006993]"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[#004560] font-bold text-sm">Trip list</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading trips...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : filteredTrips.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No trips found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[28%]">
                    Trip
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Price
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
                {filteredTrips.map((trip) => {
                  const rawImage =
                    trip.images?.find(img => img.isPrimary)?.imageUrl ||
                    trip.images?.[0]?.imageUrl ||
                    trip.destinationInfo?.imageUrl ||
                    null;
                  const primaryImage = rawImage
                    ? (rawImage.startsWith("http://") || rawImage.startsWith("https://")
                        ? rawImage
                        : `${API_BASE_URL}/${rawImage}`)
                    : null;
                  
                  return (
                    <tr key={trip.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex gap-3 items-center">
                          <div className="w-14 h-14 rounded bg-pink-100 shrink-0 overflow-hidden relative">
                            {primaryImage ? (
                              <img src={primaryImage} alt={trip.name || ''} className="w-full h-full object-cover" />
                            ) : (
                              <div className="absolute inset-0 bg-pink-300/30"></div>
                            )}
                          </div>
                          <div>
                            <a href="#" className="text-[#006993] font-bold text-sm leading-tight hover:underline block">
                              {trip.name || 'Untitled Trip'}
                            </a>
                            <span className="text-gray-400 text-xs mt-0.5 block">
                              ID {trip.id} / Marker {trip.markerID || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700 font-medium text-sm">
                          {trip.destinationInfo?.name || trip.destination || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700 font-medium text-sm">{trip.tripTypeName || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 text-gray-700 text-sm font-medium">
                            <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                            {trip.timeFrom || 'N/A'}
                          </div>
                          <span className="text-gray-400 text-xs">
                            {trip.durationValue} {trip.durationTypeName || 'Hours'} / {trip.availableDays?.length ? 'Custom' : 'Daily'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[#004560] font-bold text-sm">
                            {trip.adultPrice} {trip.currencyName || 'EUR'}
                          </span>
                          <span className="text-gray-400 text-xs">
                            Child {trip.childPrice} {trip.currencyName || 'EUR'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {trip.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-200">
                            <PowerIcon className="w-3.5 h-3.5" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                            <PowerIcon className="w-3.5 h-3.5" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(trip)}
                            title="Edit trip"
                            className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-[#006993] hover:border-[#006993] transition-colors">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleToggleStatus(trip)}
                            className={`p-1.5 border rounded transition-colors ${
                              trip.isActive 
                                ? 'border-red-100 bg-red-50 text-red-400 hover:bg-red-100' 
                                : 'border-green-100 bg-green-50 text-green-400 hover:bg-green-100'
                            }`}
                            title={trip.isActive ? 'Deactivate' : 'Reactivate'}
                          >
                            <BanIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Trip Modal */}
      <AddTripModal
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onSuccess={handleAddTripSuccess}
        editTrip={editingTrip}
      />
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function PlusIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function PencilIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

function BanIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PowerIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
    </svg>
  );
}
