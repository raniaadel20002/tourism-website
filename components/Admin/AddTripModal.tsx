"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  createTrip,
  updateTrip,
  addTripImages,
  deleteTripImage,
  setPrimaryTripImage,
  type TripMutation,
  type Trip,
  type TripImage,
} from "@/api/trips";
import { getTripTypes, type TripType } from "@/api/tripType";
import { getDestinations, type Destination } from "@/api/destinations";
import { buildImageUrl } from "@/api/gallery";

interface AddTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  /** When provided, the modal opens in Edit mode pre-filled with this trip's data. */
  editTrip?: Trip | null;
  /** @deprecated The modal now fetches destinations from the API directly. This prop is kept for backward compat. */
  availableDestinations?: Array<{ id: number; name: string }>;
}

const AVAILABLE_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AddTripModal({
  isOpen,
  onClose,
  onSuccess,
  editTrip,
}: AddTripModalProps) {
  const isEditMode = editTrip != null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tripTypes, setTripTypes] = useState<TripType[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  // Image state
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<TripImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [destinationId, setDestinationId] = useState<number>(0);
  const [nameEn, setNameEn] = useState("");
  const [nameFr, setNameFr] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameRo, setNameRo] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [descriptionRo, setDescriptionRo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [durationValue, setDurationValue] = useState<number>(1);
  const [durationType, setDurationType] = useState<0 | 1>(0);
  const [adultPrice, setAdultPrice] = useState<number>(0);
  const [childPrice, setChildPrice] = useState<number>(0);
  const [tripTypeId, setTripTypeId] = useState<number>(0);

  // Available days
  const [availableDays, setAvailableDays] = useState<string[]>([]);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_access_token") || "";
    }
    return "";
  };

  // Fetch trip types + destinations when modal opens, and pre-fill form in edit mode
  useEffect(() => {
    if (isOpen) {
      const token = getToken();


      Promise.all([
        getTripTypes(token).catch((err) => {
          console.error("Failed to fetch trip types:", err);
          return [] as TripType[];
        }),
        getDestinations(token, {
          pageNumber: 1,
          pageSize: 100,
        }).catch((err) => {
          console.error("Failed to fetch destinations:", err);
          return [] as Destination[];
        }),
      ]).then(([types, dests]) => {
        setTripTypes(types);
        setDestinations(dests);

        // Resolve destinationId after destinations are loaded (edit mode)
        if (editTrip?.destinationInfo?.id) {
          setDestinationId(editTrip.destinationInfo.id);
        }

        // Resolve tripTypeId by name once types are loaded (edit mode)
        if (editTrip?.tripTypeName) {
          const match = types.find(
            (t) => t.name === editTrip.tripTypeName
          );

          if (match) {
            setTripTypeId(match.id);
          }
        }
      });

      // Pre-fill all other form fields when editing
      if (editTrip) {
        setDestinationId(0); // reset; real value set after destinations load in .then() above
        setNameEn(editTrip.name ?? "");
        setNameFr("");
        setNameRu("");
        setNameRo("");
        setDescriptionEn(editTrip.description ?? "");
        setDescriptionFr("");
        setDescriptionRu("");
        setDescriptionRo("");
        setTimeFrom(editTrip.timeFrom ?? "");
        setDurationValue(editTrip.durationValue ?? 1);
        setDurationType(
          editTrip.durationTypeName?.toLowerCase() === "days" ? 1 : 0
        );
        setAdultPrice(editTrip.adultPrice ?? 0);
        setChildPrice(editTrip.childPrice ?? 0);
        setExistingImages(editTrip.images || []);

        // Pre-select available days when editing — deduplicate in case the API
        // returns repeated day-name strings (which would propagate to duplicate
        // day numbers in the PUT payload and trigger a 400 from the server).
        setAvailableDays([...new Set(editTrip.availableDays ?? [])]);
      } else {
        // Reset for add mode
        resetForm();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps


  }, [isOpen, editTrip]);

  const handleDayToggle = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day)
        ? prev.filter((item) => item !== day)
        : [...prev, day]
    );
  };

  const handleSelectAllDays = () => {
    setAvailableDays((prev) =>
      prev.length === AVAILABLE_DAYS.length ? [] : [...AVAILABLE_DAYS]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // Validation
    if (!destinationId || destinationId === 0) {
      setError("Please select a destination");
      return;
    }

    if (!tripTypeId || tripTypeId === 0) {
      setError("Please select a trip type");
      return;
    }

    if (!nameEn.trim()) {
      setError("English name is required");
      return;
    }

    if (!descriptionEn.trim()) {
      setError("English description is required");
      return;
    }

    if (adultPrice <= 0) {
      setError("Adult price must be greater than 0");
      return;
    }

    if (childPrice < 0) {
      setError("Child price cannot be negative");
      return;
    }

    if (durationValue <= 0) {
      setError("Duration must be greater than 0");
      return;
    }

    if (availableDays.length === 0) {
      setError("Please select at least one available day");
      return;
    }

    if (!isEditMode && imageFiles.length === 0) {
      setError("Please select at least one image for the new trip");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = getToken();

      if (!token) {
        setError("You must be logged in to save a trip");
        return;
      }

      const tripData: TripMutation = {
        destinationId,
        name: {
          en: nameEn,
          fr: nameFr || nameEn,
          ru: nameRu || nameEn,
          ro: nameRo || nameEn,
        },
        description: {
          en: descriptionEn,
          fr: descriptionFr || descriptionEn,
          ru: descriptionRu || descriptionEn,
          ro: descriptionRo || descriptionEn,
        },
        timeFrom: timeFrom || null,
        durationValue,
        durationType,
        adultPrice,
        childPrice,
        tripTypeId,
        availabilityDayNo: availableDays.map((day) => {
          const dayNumbers: Record<string, number> = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
            Saturday: 5,
            Sunday: 6,
          };

          return dayNumbers[day];
        }),
      };

      if (isEditMode && editTrip) {
        await updateTrip(editTrip.id, tripData, token);

        if (imageFiles.length > 0) {
          await addTripImages(editTrip.id, imageFiles, token);
        }
      } else {
        const newTrip = await createTrip(tripData, token);

        if (imageFiles.length > 0) {
          await addTripImages(newTrip.id, imageFiles, token);
        }
      }

      // Reset form
      resetForm();

      // Notify parent
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEditMode
            ? "Failed to update trip"
            : "Failed to create trip"
      );
    } finally {
      setLoading(false);
    }


  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleDeleteExistingImage = async (imageId: number) => {
    if (!editTrip) return;
    if (!window.confirm("Delete this image?")) return;


    const token = getToken();
    setLoading(true);

    try {
      await deleteTripImage(editTrip.id, imageId, token);

      setExistingImages((prev) =>
        prev.filter((img) => img.id !== imageId)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete image"
      );
    } finally {
      setLoading(false);
    }


  };

  const handleSetPrimaryImage = async (imageId: number) => {
    if (!editTrip) return;


    const token = getToken();
    setLoading(true);

    try {
      await setPrimaryTripImage(editTrip.id, imageId, token);

      setExistingImages((prev) =>
        prev.map((img) => ({
          ...img,
          isPrimary: img.id === imageId,
        }))
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to set primary image"
      );
    } finally {
      setLoading(false);
    }


  };

  const resetForm = () => {
    setDestinationId(0);
    setNameEn("");
    setNameFr("");
    setNameRu("");
    setNameRo("");
    setDescriptionEn("");
    setDescriptionFr("");
    setDescriptionRu("");
    setDescriptionRo("");
    setTimeFrom("");
    setDurationValue(1);
    setDurationType(0);
    setAdultPrice(0);
    setChildPrice(0);
    setTripTypeId(0);
    setAvailableDays([]);
    setImageFiles([]);
    setExistingImages([]);


    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError(null);


  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"> <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
    {/* Header */} <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200"> <h2 className="text-2xl font-bold text-[#004560]">
      {isEditMode
        ? `Edit Trip #${editTrip?.id}`
        : "Add New Trip"} </h2>


      <button
        onClick={handleClose}
        disabled={loading}
        className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
      >
        <XIcon className="w-6 h-6" />
      </button>
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="flex-1 overflow-y-auto px-6 py-4"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {destinations.length === 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          <strong>Warning:</strong> No destinations found. Please
          create destinations first before adding trips.
        </div>
      )}

      {tripTypes.length === 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          <strong>Warning:</strong> No trip types found. Please
          create trip types first before adding trips.
        </div>
      )}

      {/* Basic Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#004560] mb-4">
          Basic Information
        </h3>

        {/* Destination */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination <span className="text-red-500">*</span>
          </label>

          <select
            value={destinationId}
            onChange={(e) =>
              setDestinationId(Number(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
            required
          >
            <option value={0}>Select a destination</option>

            {destinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trip Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trip Type <span className="text-red-500">*</span>
          </label>

          <select
            value={tripTypeId}
            onChange={(e) =>
              setTripTypeId(Number(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
            required
          >
            <option value={0}>Select a trip type</option>

            {tripTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name (English) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trip Name (English){" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
            placeholder="Enter trip name in English"
            required
          />
        </div>

        {/* Other Language Names */}
        <details className="mb-4">
          <summary className="cursor-pointer text-sm text-[#006993] hover:text-[#004560] font-medium">
            Add translations (optional)
          </summary>

          <div className="mt-2 space-y-3 pl-4">
            <input
              type="text"
              value={nameFr}
              onChange={(e) => setNameFr(e.target.value)}
              placeholder="Trip Name (French)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
            />

            <input
              type="text"
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
              placeholder="Trip Name (Russian)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
            />

            <input
              type="text"
              value={nameRo}
              onChange={(e) => setNameRo(e.target.value)}
              placeholder="Trip Name (Romanian)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
            />
          </div>
        </details>

        {/* Description (English) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (English){" "}
            <span className="text-red-500">*</span>
          </label>

          <textarea
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
            rows={4}
            placeholder="Enter trip description in English"
            required
          />
        </div>

        {/* Other Language Descriptions */}
        <details className="mb-4">
          <summary className="cursor-pointer text-sm text-[#006993] hover:text-[#004560] font-medium">
            Add description translations (optional)
          </summary>

          <div className="mt-2 space-y-3 pl-4">
            <textarea
              value={descriptionFr}
              onChange={(e) => setDescriptionFr(e.target.value)}
              placeholder="Description (French)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
              rows={3}
            />

            <textarea
              value={descriptionRu}
              onChange={(e) => setDescriptionRu(e.target.value)}
              placeholder="Description (Russian)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
              rows={3}
            />

            <textarea
              value={descriptionRo}
              onChange={(e) => setDescriptionRo(e.target.value)}
              placeholder="Description (Romanian)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
              rows={3}
            />
          </div>
        </details>
      </div>

      {/* Schedule & Duration */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#004560] mb-4">
          Schedule & Duration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time (optional)
            </label>

            <input
              type="time"
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
            />
          </div>

          {/* Duration Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              value={durationValue}
              onChange={(e) =>
                setDurationValue(Number(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
              min="1"
              required
            />
          </div>

          {/* Duration Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration Unit{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              value={durationType}
              onChange={(e) =>
                setDurationType(
                  Number(e.target.value) as 0 | 1
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
              required
            >
              <option value={0}>Hours</option>
              <option value={1}>Days</option>
            </select>
          </div>
        </div>

        {/* Available Days */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Available Days{" "}
              <span className="text-red-500">*</span>
            </label>

            <button
              type="button"
              onClick={handleSelectAllDays}
              disabled={loading}
              className="text-xs font-medium text-[#006993] hover:text-[#004560] transition-colors disabled:opacity-50"
            >
              {availableDays.length === AVAILABLE_DAYS.length
                ? "Clear All"
                : "Select All"}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AVAILABLE_DAYS.map((day) => {
              const selected = availableDays.includes(day);

              return (
                <label
                  key={day}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${selected
                    ? "border-[#006993] bg-[#006993]/10 text-[#004560]"
                    : "border-gray-300 bg-white text-gray-700 hover:border-[#006993]/50"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleDayToggle(day)}
                    disabled={loading}
                    className="accent-[#006993]"
                  />

                  <span className="text-sm">{day}</span>
                </label>
              );
            })}
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Select the days when this trip is available for booking.
          </p>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#004560] mb-4">
          Pricing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Adult Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adult Price{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              value={adultPrice}
              onChange={(e) =>
                setAdultPrice(Number(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Child Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Child Price{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              value={childPrice}
              onChange={(e) =>
                setChildPrice(Number(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#004560] mb-4">
          Images
        </h3>

        {/* Upload New Images */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Images{" "}
            {!isEditMode && (
              <span className="text-red-500">*</span>
            )}
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={loading}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#006993] file:text-white hover:file:bg-[#004560] disabled:opacity-50 cursor-pointer"
          />
        </div>

        {/* Existing Images */}
        {isEditMode && existingImages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Existing Images
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {existingImages.map((img) => (
                <div
                  key={img.id}
                  className={`relative rounded-xl overflow-hidden border-2 ${img.isPrimary
                    ? "border-green-500 shadow-md"
                    : "border-gray-200"
                    }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={buildImageUrl(img.imageUrl ?? "")}
                    alt="Trip Image"
                    className="w-full h-24 object-cover"
                  />

                  {img.isPrimary && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                      PRIMARY
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex justify-between items-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleSetPrimaryImage(img.id)
                      }
                      disabled={loading || img.isPrimary}
                      className={`text-xs px-2 py-1 rounded transition-colors font-medium ${img.isPrimary
                        ? "bg-green-500/20 text-green-300 cursor-default"
                        : "bg-white/20 text-white hover:bg-white/40"
                        }`}
                      title={
                        img.isPrimary
                          ? "Already primary"
                          : "Set as primary"
                      }
                    >
                      {img.isPrimary
                        ? "Primary"
                        : "Set Primary"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteExistingImage(img.id)
                      }
                      disabled={loading}
                      className="p-1.5 text-red-300 hover:text-red-100 hover:bg-red-500/30 rounded transition-colors"
                      title="Delete image"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>

    {/* Footer */}
    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button
        type="button"
        onClick={handleClose}
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

            {isEditMode ? "Saving..." : "Creating..."}
          </>
        ) : (
          isEditMode ? "Save Changes" : "Create Trip"
        )}
      </button>
    </div>
  </div>
  </div>


  );
}

// Simple X icon
function XIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    > <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      /> </svg>
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
    > <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      /> </svg>
  );
}
