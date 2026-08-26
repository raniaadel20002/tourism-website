import Image from "next/image";
import AboutInfoCard from "./AboutInfoCard";

export default function AboutCompany() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-14 mb-20 sm:mb-24">
      
      {/* Left Column: Travel Collage Image + Decorative Dotted Line */}
      <div className="w-full lg:w-[46%] flex flex-col items-center justify-center relative">
        <div className="relative w-72 sm:w-96 md:w-[420px] lg:w-[440px] h-auto">
          <Image
            src="/images/about/Group12.png"
            alt="Collage of Egyptian destinations and traveler"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Dotted path extending below collage */}
        <div
          className="absolute sm:w-56 md:w-40 lg:w-65 top-100 right-12 h-auto opacity-80 z-1 overflow-hidden"
          aria-hidden="true"
        >
          <Image
            src="/images/about/Vectorcopy.png"
            alt=""
            width={272}
            height={404}
            className="w-full h-auto object-contain z-1 overflow-hidden"
          />
        </div>
      </div>

      {/* Right Column: Company Story + Mission & Vision Cards */}
      <div className="w-full lg:w-[50%] flex flex-col items-start">
        <h3 className="font-roboto font-medium text-[#000C09] text-2xl sm:text-3xl md:text-[30px] mb-4">
          About Our Company
        </h3>
        
        <p className="font-roboto font-normal text-[#484848] text-sm sm:text-base leading-relaxed mb-8">
          We believe that travel is more than just visiting places it&apos;s about stories, moments, and memories that last a lifetime.<br className="hidden sm:inline" />
          Our team is made up of local experts and travel enthusiasts who know every hidden gem, every perfect timing, and every detail that turns a trip into an experience.
        </p>

        <div className="w-full flex flex-col gap-6">
          <AboutInfoCard
            title="Our Mission"
            body="To provide authentic, safe, and inspiring travel experiences that allow every visitor to explore Egypt with confidence, comfort, and unforgettable memories."
          />
          <AboutInfoCard
            title="Our Vision"
            body="To become Egypt&apos;s most trusted travel platform by connecting travelers with extraordinary destinations, exceptional service, and meaningful cultural experiences."
          />
        </div>

      </div>

    </div>
  );
}
