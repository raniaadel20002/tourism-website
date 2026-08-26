import Image from "next/image";

export default function BlogsHero() {
  return (
    <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blogCover.png"
          alt="Discover Stories, Guides & Travel Tips"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Hero Text */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl flex flex-col items-start">
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-1 sm:mb-2">
            Explore Articles
          </span>
          <h1 className="font-roboto font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight tracking-tight drop-shadow-md">
            Discover Stories, Guides &amp; Travel Tips
          </h1>
        </div>
      </div>
    </div>
  );
}
