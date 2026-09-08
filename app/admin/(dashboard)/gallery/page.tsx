"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  addGalleryImage,
  buildImageUrl,
  deleteGalleryImage,
  getAllGalleryImages,
} from "@/api/gallery";
import { GalleryImageAPI } from "@/modules/gallery.model";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImageAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setImages(await getAllGalleryImages());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const requestId = window.setTimeout(() => void loadImages(), 0);
    return () => window.clearTimeout(requestId);
  }, [loadImages]);

  const closeUpload = () => {
    if (isSaving) return;
    setIsUploadOpen(false);
    setSelectedFile(null);
    setIsFeatured(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("admin_access_token");

    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }
    if (!selectedFile) {
      setError("Select an image to upload.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const createdImage = await addGalleryImage(selectedFile, isFeatured, token);
      setImages((current) => [createdImage, ...current]);
      setSuccess("Gallery image uploaded successfully.");
      closeUpload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload the gallery image.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (image: GalleryImageAPI) => {
    const token = localStorage.getItem("admin_access_token");
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }
    if (!window.confirm(`Delete gallery image ${image.id}? This cannot be undone.`)) return;

    setDeletingId(image.id);
    setError(null);
    setSuccess(null);

    try {
      await deleteGalleryImage(image.id, token);
      setImages((current) => current.filter((item) => item.id !== image.id));
      setSuccess("Gallery image deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete the gallery image.");
    } finally {
      setDeletingId(null);
    }
  };

  const featuredCount = images.filter((image) => image.isFeatured).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">Media Manager</h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">Gallery</h1>
          <p className="text-gray-500 text-sm">Curate the images used across the travel experience. Featured images can be surfaced more prominently in the client app.</p>
        </div>
        <button type="button" onClick={() => { setError(null); setSuccess(null); setIsUploadOpen(true); }} className="flex items-center gap-2 bg-[#006993] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors">
          <PlusIcon className="w-4 h-4" />
          Add image
        </button>
      </div>

      {(error || success) && (
        <div className={`flex items-center justify-between gap-4 rounded-lg border p-3 text-sm ${error ? "border-red-100 bg-red-50 text-red-600" : "border-emerald-100 bg-emerald-50 text-emerald-700"}`} role={error ? "alert" : "status"}>
          <span>{error ?? success}</span>
          {error && <button type="button" onClick={() => void loadImages()} className="font-semibold underline">Try again</button>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard label="Total images" value={loading ? "—" : images.length} />
        <SummaryCard label="Featured" value={loading ? "—" : featuredCount} />
        <SummaryCard label="Standard" value={loading ? "—" : images.length - featuredCount} />
      </div>

      {loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-72 rounded-xl bg-gray-100 animate-pulse" />)}</div>}

      {!loading && !error && images.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">No gallery images have been added yet.</div>
      )}

      {!loading && images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <article key={image.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative h-48 w-full bg-gray-100">
                <Image src={buildImageUrl(image.imageUrl)} alt={`Gallery image ${image.id}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                {image.isFeatured && <div className="absolute top-3 left-3"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white text-[#006993] shadow-sm"><StarIcon className="w-3.5 h-3.5" />Featured</span></div>}
              </div>
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0"><p className="text-[#004560] font-bold text-sm">Image {image.id}</p><p className="text-gray-500 text-xs">{image.isFeatured ? "Featured" : "Standard"}</p></div>
                <div className="flex gap-2">
                  <a href={buildImageUrl(image.imageUrl)} target="_blank" rel="noreferrer" aria-label={`Preview gallery image ${image.id}`} className="p-1.5 border border-gray-200 rounded text-[#006993] hover:bg-gray-50 transition-colors"><EyeIcon className="w-4 h-4" /></a>
                  <button type="button" disabled={deletingId === image.id} onClick={() => void handleDelete(image)} aria-label={`Delete gallery image ${image.id}`} className="p-1.5 border border-red-100 rounded text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50">{deletingId === image.id ? <SpinnerIcon className="w-4 h-4 animate-spin" /> : <TrashIcon className="w-4 h-4" />}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="upload-gallery-title">
          <form onSubmit={handleUpload} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between gap-4"><div><h2 id="upload-gallery-title" className="text-xl font-bold text-[#004560]">Add gallery image</h2><p className="mt-1 text-sm text-gray-500">Upload an image and choose whether it is featured.</p></div><button type="button" onClick={closeUpload} aria-label="Close upload dialog" className="text-gray-400 hover:text-gray-600">×</button></div>
            <label className="block text-sm font-bold text-[#004560] mb-2" htmlFor="gallery-file">Image</label>
            <input ref={fileInputRef} id="gallery-file" type="file" accept="image/*" required onChange={handleFileChange} className="mb-5 block w-full rounded-lg border border-gray-200 p-2 text-sm text-gray-600" />
            <label className="mb-6 flex items-center gap-3 text-sm font-medium text-[#004560]"><input type="checkbox" checked={isFeatured} onChange={(event) => setIsFeatured(event.target.checked)} className="h-4 w-4 accent-[#006993]" />Mark as featured</label>
            <div className="flex justify-end gap-3"><button type="button" onClick={closeUpload} disabled={isSaving} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Cancel</button><button type="submit" disabled={isSaving || !selectedFile} className="rounded-lg bg-[#006993] px-4 py-2 text-sm font-medium text-white hover:bg-[#004560] disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? "Uploading…" : "Upload image"}</button></div>
          </form>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number | string }) {
  return <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><p className="text-sm font-semibold text-gray-500 mb-2">{label}</p><p className="text-3xl font-bold text-[#004560]">{value}</p></div>;
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>; }
function EyeIcon(props: React.SVGProps<SVGSVGElement>) { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>; }
function TrashIcon(props: React.SVGProps<SVGSVGElement>) { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>; }
function StarIcon(props: React.SVGProps<SVGSVGElement>) { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>; }
function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" d="M12 3a9 9 0 1 0 9 9" /></svg>; }