"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    Number: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.Number || !formData.message) return;

    const phoneNumber = "20000000000";

    const whatsappMessage = `
  Name: ${formData.name}
  Message: ${formData.message}
  `;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full lg:w-[50%] flex flex-col">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 md:p-12 shadow-sm border border-gray-100/90 flex flex-col flex-1">

        {/* Form Title */}
        <h2 className="font-roboto font-bold text-[#004560] text-2xl sm:text-3xl lg:text-[32px] leading-tight mb-3">
          Have questions? Feel free to write us
        </h2>

        {/* Form Subtitle */}
        <p className="font-roboto font-normal text-[#484848] text-xs sm:text-sm md:text-[14px] leading-relaxed mb-8">
          Have a question or need more information about our products? Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>

        {/* Success Notification Banner */}
        {submitted && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-roboto text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6 flex-1 justify-between">
          <div className="flex flex-col gap-5 sm:gap-6">

            {/* Name Input */}
            <div className="flex flex-col items-start">
              <label htmlFor="name-input" className="font-roboto font-medium text-[#000C09] text-xs sm:text-sm mb-2">
                Your name
              </label>
              <input
                id="name-input"
                type="text"
                required
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-xl font-roboto text-xs sm:text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors"
              />
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col items-start">
              <label htmlFor="number-input" className="font-roboto font-medium text-[#000C09] text-xs sm:text-sm mb-2">
                Number
              </label>
              <input
                id="number-input"
                type="number"
                required
                placeholder="Enter Your Phone Number"
                value={formData.Number}
                onChange={(e) => setFormData({ ...formData, Number: e.target.value })}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-xl font-roboto text-xs sm:text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col items-start">
              <label htmlFor="message-input" className="font-roboto font-medium text-[#000C09] text-xs sm:text-sm mb-2">
                Massage
              </label>
              <textarea
                id="message-input"
                rows={5}
                required
                placeholder="Write your massage"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-xl font-roboto text-xs sm:text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors resize-none"
              />
            </div>

          </div>

          {/* Centered Send Message Button */}
          <div className="flex justify-center pt-4 sm:pt-6">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 sm:px-14 py-3 sm:py-3.5 rounded-full bg-[#004560] hover:bg-[#003449] text-white font-roboto font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              Send Message
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
