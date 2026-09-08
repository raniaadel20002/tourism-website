"use client";

import React, { useState, useEffect } from "react";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ, type FAQ, type FAQMutation } from "@/api/faq";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_access_token") || "";
    }
    return "";
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  async function fetchFAQs() {
    try {
      setLoading(true);
      const token = getToken();
      const data = await getFAQs(token);
      setFaqs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch FAQs");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    
    try {
      const token = getToken();
      await deleteFAQ(id, token);
      await fetchFAQs();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete FAQ");
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingFAQ(null);
  };

  const handleSuccess = () => {
    fetchFAQs();
    handleCloseModal();
  };

  const filteredFAQs = faqs.filter(faq =>
    searchQuery.trim() === "" ||
    faq.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-1">
            Content Manager
          </h2>
          <h1 className="text-3xl font-bold text-[#004560] mb-2">FAQ</h1>
          <p className="text-gray-500 text-sm">
            Manage frequently asked questions and answers with multi-language support.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#006993] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#004560] transition-colors whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-md">
          <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#006993]"
          />
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-[#004560] font-bold text-sm">FAQ List ({filteredFAQs.length})</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading FAQs...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : filteredFAQs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? "No FAQs found matching your search" : "No FAQs yet. Click 'Add FAQ' to create one."}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <QuestionIcon className="w-5 h-5 text-[#006993] flex-shrink-0 mt-0.5" />
                      <h4 className="text-[#004560] font-bold text-base leading-snug">{faq.text}</h4>
                    </div>
                    <div className="flex items-start gap-3 ml-8">
                      <AnswerIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="mt-3 ml-8">
                      <span className="text-xs text-gray-400">ID: {faq.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-[#006993] hover:border-[#006993] transition-colors"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-1.5 border border-red-100 bg-red-50 rounded text-red-500 hover:bg-red-100 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <FAQModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          editingFAQ={editingFAQ}
        />
      )}
    </div>
  );
}

// FAQ Modal Component
function FAQModal({
  isOpen,
  onClose,
  onSuccess,
  editingFAQ,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingFAQ: FAQ | null;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [textEn, setTextEn] = useState(editingFAQ?.text || "");
  const [textFr, setTextFr] = useState("");
  const [textRu, setTextRu] = useState("");
  const [textRo, setTextRo] = useState("");
  
  const [answerEn, setAnswerEn] = useState(editingFAQ?.answer || "");
  const [answerFr, setAnswerFr] = useState("");
  const [answerRu, setAnswerRu] = useState("");
  const [answerRo, setAnswerRo] = useState("");

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_access_token") || "";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!textEn.trim()) {
      setError("Question text (English) is required");
      return;
    }
    if (!answerEn.trim()) {
      setError("Answer (English) is required");
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

      const faqData: FAQMutation = {
        ...(editingFAQ ? { id: editingFAQ.id } : {}),
        text: {
          en: textEn,
          fr: textFr || textEn,
          ru: textRu || textEn,
          ro: textRo || textEn,
        },
        answer: {
          en: answerEn,
          fr: answerFr || answerEn,
          ru: answerRu || answerEn,
          ro: answerRo || answerEn,
        },
      };

      if (editingFAQ) {
        await updateFAQ(faqData, token);
      } else {
        await createFAQ(faqData, token);
      }
      
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save FAQ");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#004560]">
            {editingFAQ ? "Edit FAQ" : "Add New FAQ"}
          </h2>
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

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#004560] mb-4">Question</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question (English) <span className="text-red-500">*</span>
              </label>
              <textarea
                value={textEn}
                onChange={(e) => setTextEn(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                rows={3}
                placeholder="Enter question in English"
                required
              />
            </div>

            <details>
              <summary className="cursor-pointer text-sm text-[#006993] hover:text-[#004560] font-medium mb-2">
                Add translations (optional)
              </summary>
              <div className="space-y-3 pl-4">
                <textarea
                  value={textFr}
                  onChange={(e) => setTextFr(e.target.value)}
                  placeholder="Question (French)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                  rows={2}
                />
                <textarea
                  value={textRu}
                  onChange={(e) => setTextRu(e.target.value)}
                  placeholder="Question (Russian)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                  rows={2}
                />
                <textarea
                  value={textRo}
                  onChange={(e) => setTextRo(e.target.value)}
                  placeholder="Question (Romanian)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                  rows={2}
                />
              </div>
            </details>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#004560] mb-4">Answer</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer (English) <span className="text-red-500">*</span>
              </label>
              <textarea
                value={answerEn}
                onChange={(e) => setAnswerEn(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                rows={4}
                placeholder="Enter answer in English"
                required
              />
            </div>

            <details>
              <summary className="cursor-pointer text-sm text-[#006993] hover:text-[#004560] font-medium mb-2">
                Add translations (optional)
              </summary>
              <div className="space-y-3 pl-4">
                <textarea
                  value={answerFr}
                  onChange={(e) => setAnswerFr(e.target.value)}
                  placeholder="Answer (French)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                  rows={3}
                />
                <textarea
                  value={answerRu}
                  onChange={(e) => setAnswerRu(e.target.value)}
                  placeholder="Answer (Russian)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                  rows={3}
                />
                <textarea
                  value={answerRo}
                  onChange={(e) => setAnswerRo(e.target.value)}
                  placeholder="Answer (Romanian)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006993]"
                  rows={3}
                />
              </div>
            </details>
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
                {editingFAQ ? "Updating..." : "Creating..."}
              </>
            ) : (
              editingFAQ ? "Update FAQ" : "Create FAQ"
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

function TrashIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

function QuestionIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AnswerIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  );
}
