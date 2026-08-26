"use client";

import { useState } from "react";
import Link from "next/link";

interface Destination {
  id: string;
  name: string;
  cardImage: string;
  heroBg: string;
}

const destinations: Destination[] = [
  {
    id: "red-sea",
    name: "Red sea",
    cardImage: "/images/home/hero/redsea.png",
    heroBg: "/images/home/hero/background.png",
  },
  {
    id: "luxor",
    name: "Luxor",
    cardImage: "/images/home/hero/luxor.png",
    heroBg: "/images/home/hero/luxor.png",
  },
  {
    id: "giza",
    name: "Giza",
    cardImage: "/images/home/hero/giza.png",
    heroBg: "/images/home/hero/giza.png",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-teal-950">
      {/* ── Background Crossfade Layers ── */}
      {destinations.map((dest, index) => (
        <div
          key={dest.id}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out pointer-events-none"
          style={{
            backgroundImage: `url('${dest.heroBg}')`,
            opacity: activeIndex === index ? 1 : 0,
            zIndex: activeIndex === index ? 1 : 0,
          }}
        />
      ))}

      {/* ── Dark Gradient & Vignette Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10 z-[2] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[2] pointer-events-none" />

      {/* ── Hero Main Content (Flexbox Only) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16 flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-8">
          
          {/* Left: Typography & CTA */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl self-center lg:self-center">
            {/* Small Title */}
            <span className="font-montez text-[#39CA5B] text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-2 tracking-wide drop-shadow">
              Explore
            </span>

            {/* Main Title */}
            <h1 className="font-roboto text-[#FFF8F8] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.12] mb-4 sm:mb-5 tracking-tight drop-shadow-md">
              Every Journey Has a Story.
              <br className="hidden sm:inline" />
              {" "}Start Yours in Egypt.
            </h1>

            {/* Description */}
            <p className="font-roboto text-[#FFF8F8] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md drop-shadow">
              From the golden dunes of the Sahara to the vibrant coral reefs of
              the Red Sea, discover unforgettable adventures crafted for every
              traveler.
            </p>

            {/* CTA Button */}
            <Link
              href="/trips"
              className="inline-flex items-center justify-center bg-[#F5FCFF] text-[#00266D] font-roboto font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Trips
            </Link>
          </div>

          {/* Right: Destination Cards Slider & Navigation */}
          <div className="flex flex-col items-center lg:items-end gap-3 sm:gap-4 w-full lg:w-auto">
            
            {/* Previous / Next Arrow Buttons positioned above cards */}
            <div className="flex items-center justify-center lg:justify-end gap-3 sm:gap-4 ">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous destination"
                className="group rounded-full cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#39CA5B]"
              >
                <img
                  src="/images/home/hero/⬅.png"
                  alt="Previous"
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md group-hover:brightness-110"
                />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next destination"
                className="group rounded-full cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#39CA5B]"
              >
                <img
                  src="/images/home/hero/➡.png"
                  alt="Next"
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md group-hover:brightness-110"
                />
              </button>
            </div>

            {/* Destination Cards Row (Horizontal Flex) */}
            <div className="flex flex-row items-end justify-center lg:justify-end gap-3 sm:gap-4 lg:gap-5 w-full overflow-x-auto lg:overflow-visible pb-2 px-2 scrollbar-none">
              {destinations.map((dest, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    aria-label={`Select ${dest.name}`}
                    className={`relative rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-500 ease-out focus:outline-none ${
                      isActive
                        ? "w-40 sm:w-48 lg:w-56 h-60 sm:h-72 lg:h-[340px] shadow-2xl ring-2 ring-white/70 scale-100 z-10"
                        : "w-28 sm:w-36 lg:w-44 h-44 sm:h-56 lg:h-[260px] opacity-80 hover:opacity-100 hover:scale-105 shadow-lg"
                    }`}
                  >
                    <img
                      src={dest.cardImage}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    />
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
