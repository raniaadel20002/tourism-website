import Image from "next/image";

export default function GalleryHero() {
  return (
    <div className="relative w-full bg-[#003853] pt-15 pb-6 sm:pt-28 sm:pb-16 lg:pt-14 lg:pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-5">

        {/* Hero Left Text Content */}
        <div className="w-full lg:w-[45%] flex flex-col items-start z-10">
          <span className="font-montez text-[#39CA5B] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-wide">
            Travel Moments
          </span>
          <h1 className="font-roboto font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-tight sm:leading-tight tracking-tight drop-shadow-md">
            Explore Egypt Through Our Lens
          </h1>
        </div>

        {/* Hero Right: Overlapping Rotated Images + Camera Graphic */}
        <div className="w-full lg:w-[52%] flex justify-center lg:justify-end items-center relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] z-10 select-none">
          <div className="relative w-[320px] sm:w-[420px] md:w-[480px] h-[220px] sm:h-[260px] md:h-[290px]">

            {/* Photo 1: Top Left Swimmer */}
            <div className="absolute top-0 left-6 sm:left-10 w-40 sm:w-52 h-28 sm:h-36 rounded-xl overflow-hidden border-[3px] sm:border-4 border-white shadow-xl -rotate-6 transition-transform duration-300 hover:scale-105 z-10">
              <Image src="/images/home/Gallery/Frame1171276587.png" alt="Travel Moment 1" fill className="object-cover" />
            </div>

            {/* Photo 2: Top Right Diver */}
            <div className="absolute top-2 right-12 sm:right-16 w-36 sm:w-48 h-26 sm:h-34 rounded-xl overflow-hidden border-[3px] sm:border-4 border-white shadow-xl rotate-3 transition-transform duration-300 hover:scale-105 z-10">
              <Image src="/images/home/Gallery/Frame1171276589.png" alt="Travel Moment 2" fill className="object-cover" />
            </div>

            {/* Photo 3: Center Scuba Divers Circle */}
            <div className="absolute bottom-2 left-20 sm:left-24 w-44 sm:w-56 h-30 sm:h-40 rounded-xl overflow-hidden border-[3px] sm:border-4 border-white shadow-2xl -rotate-12 transition-transform duration-300 hover:scale-105 z-20">
              <Image src="/images/home/Gallery/6ad7f35add4c0722da04a0431f5c2163 1.png" alt="Travel Moment 3" fill className="object-cover" />
            </div>

            {/* Photo 4: Right Flyboard Rider */}
            <div className="absolute bottom-1 right-2 sm:right-4 w-36 sm:w-48 h-28 sm:h-36 rounded-xl overflow-hidden border-[3px] sm:border-4 border-white shadow-xl rotate-12 transition-transform duration-300 hover:scale-105 z-20">
              <Image src="/images/home/Gallery/Frame1171276588.png" alt="Travel Moment 4" fill className="object-cover" />
            </div>

            {/* Foreground Camera Graphic */}
            <div className="absolute -bottom-2 -left-4 sm:left-0 w-32 sm:w-40 md:w-44 h-auto z-30 drop-shadow-2xl">
              <Image
                src="/images/gallaryCamera.png"
                alt="Vintage Camera"
                width={200}
                height={140}
                className="w-full h-auto object-contain -rotate-90 origin-center scale-110"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
