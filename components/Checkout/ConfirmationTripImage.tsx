import Image from "next/image";

interface ConfirmationTripImageProps {
  src: string;
  tripTitle: string;
  tourDate: string;
  totalAmount: number;
}

export default function ConfirmationTripImage({
  src,
  tripTitle,
  tourDate,
  totalAmount,
}: ConfirmationTripImageProps) {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center my-4 sm:my-6">
      <div className="relative w-full max-w-lg h-56 sm:h-72 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 group">
        <Image
          src={src}
          alt={tripTitle}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 550px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle Gradient & Trip Name Badge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 sm:p-6">
          <div className="text-white">
            <span className="text-xs uppercase tracking-wider font-semibold bg-emerald-600/90 backdrop-blur-xs px-2.5 py-1 rounded-full inline-block mb-1.5 font-roboto">
              Confirmed Experience
            </span>
            <p className="font-roboto font-bold text-base sm:text-lg drop-shadow-md">
              {tripTitle}
            </p>
            <p className="font-roboto text-xs sm:text-sm text-gray-200">
              Date: {tourDate} • Total: ${totalAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
