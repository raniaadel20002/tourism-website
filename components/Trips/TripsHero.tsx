import Image from "next/image";

export default function TripsHero() {
  return (
    <div className="relative w-full h-auto sm:h-[340px] md:h-[400px] lg:h-[69vh] top-0 flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/search.png"
          alt="Find Your Next Adventure"
          fill
          priority
          className="object-contain !w-full"
        />
      </div>

      {/* Hero Text */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl flex flex-col items-start">
          <span className="font-montez text-[#39CA5B] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-1 sm:mb-2">
            Explore Egypt
          </span>
          <h1 className="font-roboto font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight tracking-tight drop-shadow-md">
            Find Your Next Adventure
          </h1>
        </div>
      </div>
    </div>
  );
}
