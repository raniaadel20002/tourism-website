"use client";

import Image from "next/image";
import Link from "next/link";

export default function WhereBegins() {
  return (
    <section className="relative w-full bg-[#003853] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ── Top-Left Decorative Airplane ── */}
      <div
        className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-36 sm:w-48 lg:w-56 h-auto pointer-events-none select-none z-0 rotate-[15deg] opacity-75"
        aria-hidden="true"
      >
        <Image
          src="/images/home/whereBegins/Vector.svg"
          alt=""
          width={175}
          height={155}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* ── Bottom-Right Decorative Airplane ── */}
      <div
        className="absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 w-40 sm:w-52 lg:w-60 h-auto pointer-events-none select-none z-0 -rotate-[165deg] opacity-75"
        aria-hidden="true"
      >
        <Image
          src="/images/home/whereBegins/Vector.svg"
          alt=""
          width={175}
          height={155}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* ── Main Rounded Banner Container (Flexbox Layout) ── */}
      <div className="relative z-10 max-w-6xl mx-auto rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-2xl">
        
        {/* Banner Background Image */}
        <div className="relative w-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center">
          <Image
            src="/images/home/whereBegins/Frame 1171276613 (1).png"
            alt="Where Your Adventure Begins"
            fill
            priority
            className="object-cover object-center"
          />

          {/* ── Flexbox Content Container ── */}
          <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
            
            {/* Left side space for suitcase visual from background image */}
            <div className="hidden md:block w-1/2" aria-hidden="true" />

            {/* Right side Text & CTA (Centered on mobile, right-aligned block on tablet/desktop) */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              
              {/* Main Title */}
              <h2 className="font-roboto font-bold text-[#FDFEFF] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight tracking-tight mb-2 sm:mb-3 drop-shadow-md">
                Where Your Adventure Begins
              </h2>

              {/* Description */}
              <p className="font-roboto font-normal text-[#FFFFFF] text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-7 max-w-md opacity-95">
                Choose from Egypt&apos;s most exciting travel experiences.
              </p>

              {/* White Pill-shaped CTA Button */}
              <div>
                <Link
                  href="/trips"
                  className="inline-block bg-white text-[#004560] font-roboto font-semibold text-xs sm:text-sm md:text-[15px] px-8 sm:px-10 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Explore Tour Now
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
