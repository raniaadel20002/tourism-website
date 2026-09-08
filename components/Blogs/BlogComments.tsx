"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface LocalComment {
  id: string;
  name: string;
  text: string;
}

export default function BlogComments() {
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formComment, setFormComment] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const { t } = useLanguage();

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    setComments((prev) => [
      ...prev,
      { id: Date.now().toString(), name: formName.trim(), text: formComment.trim() },
    ]);
    setFormName("");
    setFormEmail("");
    setFormComment("");
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  return (
    <div className="mt-10 flex flex-col gap-8">

      {/* Comments Section — always visible */}
      <div>
        <h3 className="font-roboto font-bold text-[#000C09] text-lg sm:text-xl mb-4">
          {t("blogs.comments", "Comments")}
        </h3>

        {comments.length === 0 && (
          <p className="text-sm text-gray-400 font-roboto italic">No comments yet.</p>
        )}

        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex gap-3 border-b border-gray-100 pb-4"
            >
              {/* Quote icon block */}
              <div className="flex-shrink-0 w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div>
                <p className="font-roboto font-semibold text-sm text-[#000C09] mb-1">{c.name}</p>
                <p className="font-roboto text-sm text-[#484848] leading-relaxed">&quot;{c.text}&quot;</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment Form */}
      <div>
        <h3 className="font-roboto font-bold text-[#000C09] text-lg sm:text-xl mb-5">
          {t("blogs.addComment", "Add Comment")}
        </h3>

        {submittedMessage && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-roboto text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("blogs.commentSuccess", "Thank you! Your comment has been posted.")}</span>
          </div>
        )}

        <form onSubmit={handlePostComment} className="flex flex-col gap-4">

          <div>
            <label htmlFor="comment-name" className="block font-roboto text-sm text-[#000C09] mb-1.5">
              {t("blogs.commentName", "Your name")}
            </label>
            <input
              id="comment-name"
              type="text"
              required
              placeholder="Enter Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-roboto text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="comment-email" className="block font-roboto text-sm text-[#000C09] mb-1.5">
              {t("blogs.commentEmail", "Email")}
            </label>
            <input
              id="comment-email"
              type="email"
              placeholder="Enter Email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-roboto text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="comment-text" className="block font-roboto text-sm text-[#000C09] mb-1.5">
              {t("blogs.commentLabel", "Comment")}
            </label>
            <textarea
              id="comment-text"
              rows={4}
              required
              placeholder="Text..."
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-roboto text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2.5 rounded-lg bg-[#004560] hover:bg-[#003449] text-white font-roboto font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              {t("blogs.submitComment", "Post Comment")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
