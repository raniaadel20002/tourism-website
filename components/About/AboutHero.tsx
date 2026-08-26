import Image from "next/image";

export default function AboutHero() {
  return (
    <div className="relative w-full bg-[#003853]  overflow-hidden">
      {/* Decorative Dotted Path across Hero */}
      <div
        className="absolute bottom-0  left-[506px] w-[340px] sm:w-[480px] lg:w-[620px] h-auto pointer-events-none select-none z-0 opacity-80"
        aria-hidden="true"
      >
        <Image
          src="/images/about/Vector (1).png"
          alt=""
          width={488}
          height={227}
          className="w-full h-auto z-10 object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 relative z-10">
        
        {/* Hero Left Text Content */}
        <div className="w-full lg:w-[50%] flex flex-col items-start">
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-2 tracking-wide">
            Our Story
          </span>
          <h1 className="font-roboto font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-tight sm:leading-tight tracking-tight drop-shadow-md max-w-xl">
            Discover Egypt with People Who Know It Best
          </h1>
        </div>

        {/* Hero Right: Airplane Window Graphic */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end items-center relative select-none">
          <div className="relative w-56 sm:w-68 md:w-80 lg:w-[320px] h-auto drop-shadow-2xl">
            <Image
              src="/images/about/image 11.png"
              alt="Airplane window overlooking clouds and aircraft"
              width={320}
              height={400}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
