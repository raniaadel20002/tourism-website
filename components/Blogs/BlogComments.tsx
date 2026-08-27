"use client";

import { useState } from "react";
import { BlogComment } from "@/data/blogs";

import { useLanguage } from "@/context/LanguageContext";

interface BlogCommentsProps {
  initialComments: BlogComment[];
}

export default function BlogComments({ initialComments }: BlogCommentsProps) {
  const [customComments, setCustomComments] = useState<BlogComment[]>([]);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formComment, setFormComment] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const { t } = useLanguage();

  const allDisplayComments = [...initialComments, ...customComments];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newComment: BlogComment = {
      id: Date.now().toString(),
      name: formName.trim(),
      text: formComment.trim(),
    };

    setCustomComments((prev) => [...prev, newComment]);
    setFormName("");
    setFormEmail("");
    setFormComment("");
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  return (
    <>
      {/* Comments Section */}
      <div className="mt-12 pt-6 border-t border-gray-100">
        <h3 className="font-roboto font-bold text-[#000C09] text-lg sm:text-xl mb-5">
          {t("blogs.comments", "Comments")} ({allDisplayComments.length})
        </h3>

        <div className="space-y-4">
          {allDisplayComments.map((c) => (
            <div
              key={c.id}
              className="border-l-[3.5px] rtl:border-l-0 rtl:border-r-[3.5px] border-[#006993] pl-4 sm:pl-5 rtl:pl-0 rtl:pr-4 rtl:sm:pr-5 py-2 bg-transparent"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#006993] font-serif text-2xl leading-none">"</span>
                <span className="font-roboto font-semibold text-[#000C09] text-sm sm:text-base">
                  {c.name}
                </span>
              </div>
              <p className="font-roboto font-normal text-[#484848] text-xs sm:text-sm mt-1.5 leading-relaxed">
                &quot;{c.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="mt-12 pt-4">
        <h3 className="font-roboto font-bold text-[#000C09] text-lg sm:text-xl mb-5">
          {t("blogs.leaveComment", "Leave a Comment")}
        </h3>

        {submittedMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-roboto text-xs sm:text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("blogs.commentSuccess", "Thank you! Your comment has been posted.")}</span>
          </div>
        )}

        <form onSubmit={handlePostComment} className="flex flex-col gap-4">

          {/* Your Name Input */}
          <div className="flex flex-col items-start rtl:items-start">
            <label htmlFor="comment-name" className="font-roboto font-medium text-[#000C09] text-xs sm:text-sm mb-1.5">
              {t("blogs.commentName", "Your Name")}
            </label>
            <input
              id="comment-name"
              type="text"
              required
              placeholder={t("contact.namePlaceholder", "Enter Name")}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl font-roboto text-xs sm:text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col items-start rtl:items-start">
            <label htmlFor="comment-email" className="font-roboto font-medium text-[#000C09] text-xs sm:text-sm mb-1.5">
              {t("blogs.commentEmail", "Your Email")}
            </label>
            <input
              id="comment-email"
              type="email"
              required
              placeholder="name@example.com"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl font-roboto text-xs sm:text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors"
            />
          </div>

          {/* Comment Textarea */}
          <div className="flex flex-col items-start rtl:items-start">
            <label htmlFor="comment-text" className="font-roboto font-medium text-[#000C09] text-xs sm:text-sm mb-1.5">
              {t("blogs.commentMessage", "Write your comment...")}
            </label>
            <textarea
              id="comment-text"
              rows={4}
              required
              placeholder={t("blogs.commentMessage", "Write your comment...")}
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl font-roboto text-xs sm:text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors resize-none"
            />
          </div>

          {/* Submit Post Comment Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-full bg-[#004560] hover:bg-[#003449] text-white font-roboto font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              {t("blogs.submitComment", "Post Comment")}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
