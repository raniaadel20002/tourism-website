import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative w-full bg-[#003853] pt-24 pb-2 sm:pt-28 sm:pb-16 lg:pt-16 lg:pb-0 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-8">

        {/* Hero Left: Text Content */}
        <div className="w-full md:w-[60%] lg:w-[55%] flex flex-col items-start text-left">
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-2 tracking-wide">
            Get in Touch
          </span>
          <h1 className="font-roboto font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight tracking-tight drop-shadow-sm mb-4">
            Let&apos;s Start Your Next Adventure
          </h1>
          <p className="font-roboto font-normal text-white/90 text-sm sm:text-base md:text-[15px] leading-relaxed max-w-xl">
            Whether you&apos;re planning your dream vacation, looking for the perfect tour, or simply have a question, our team is here to help. Reach out to us, and let&apos;s create unforgettable memories together.
          </p>
        </div>

        {/* Hero Right: Phone Image + Soundwave Squiggles */}
        <div className="md:w-[40%] lg:w-[35%] flex justify-center items-end md:justify-end relative">
          <div className="relative sm:w-44 md:w-48 lg:w-40">

            {/* Green Telephone Handset with Cord */}
            <Image
              src="/images/contact/a30531347a56ee917b0d45426ea275a5f70609b7.png"
              alt="Green vintage telephone"
              width={108}
              height={416}
              priority
              className="w-full h-auto object-contain drop-shadow-xl"
            />

            {/* Soundwaves Squiggles positioned to the left of the mouthpiece */}
            <div className="absolute -left-22 sm:bottom-12 md:bottom-14 lg:w-[60%] sm:w-10 md:w-12">
              <Image
                src="/images/contact/Group 13.png"
                alt=""
                width={68}
                height={60}
                className="w-full h-auto object-contain"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
