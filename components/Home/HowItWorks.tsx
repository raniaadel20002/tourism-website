import Image from "next/image";

interface Step {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: "/images/home/howItWorks/icon1.png",
    title: "Choose an Experience",
    description: "Browse adventures that match your travel style.",
  },
  {
    id: 2,
    icon: "/images/home/howItWorks/icon2.png",
    title: "Reserve Securely",
    description: "Book safely using trusted payment methods.",
  },
  {
    id: 3,
    icon: "/images/home/howItWorks/icon3.png",
    title: "Receive Instant Confirmation",
    description: "Your itinerary arrives instantly in your inbox.",
  },
  {
    id: 4,
    icon: "/images/home/howItWorks/icon4.png",
    title: "Enjoy the Journey",
    description: "Pack your bags  we'll take care of the rest.",
  },
];

// function CardTopShape() {
//   return (
//     <svg
//       viewBox="0 0 1438 1200"
//       fill="#FFFFFF"
//       className="w-[117.37px] h-[112.42px] pointer-events-none select-none"
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//     >
//       <path
//         d="M159.295 15.4548C304.87 -78.7732 491.761 142.613 680.19 145.645C920.008 149.504 1043.35 -135.13 1259.64 15.4548C1583.1 240.651 1411.52 701.839 1170.36 923.809C960.735 1116.74 691.655 1188.83 397.74 1018.05C150.113 874.177 3.22708 662.442 -2.55404 399.931C-6.39079 225.711 24.6325 102.619 159.295 15.4548Z"
//         fill="#FFFFFF"
//       />
//     </svg>
//   );
// }

function HowItWorksCard({ step }: { step: Step }) {
  return (
    <div className="relative w-full max-w-[295px] h-[200px] bg-white rounded-[16px] px-3 pt-12 pb-5 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">
      {/* White organic decorative crest extending above card */}
      {/* <div className="absolute -top-[56px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-0">
        <CardTopShape />
      </div> */}

      {/* Centered green icon placed inside top decorative shape */}
      <div className="absolute -top-[65px] left-1/2 -translate-x-1/2 w-[110px] h-[110px] z-10 flex items-center justify-center pointer-events-none">
        <Image
          src={step.icon}
          alt={step.title}
          width={190}
          height={190}
          className="w-[190px] h-[190px] object-contain scale-110"
        />
      </div>

      {/* Card Title */}
      <h3
        className="text-[#000C09] text-[18px] sm:text-[19px] lg:text-[19.5px] font-medium leading-[140%] text-center font-roboto mb-2 whitespace-nowrap"
        style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif" }}
      >
        {step.title}
      </h3>

      {/* Card Description */}
      <p
        className="text-[#000C09] text-[15px] sm:text-[16px] font-normal leading-[150%] text-center font-roboto max-w-[245px]"
        style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif" }}
      >
        {step.description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="relative bg-[#13445d] py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-x-clip">
      {/* Background Decorative Shape from heart.svg */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1358px] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/howItWorks/heart.svg"
          alt=""
          width={1358}
          height={1133}
          className="w-full h-auto object-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          {/* Small Decorative Subtitle */}
          <p
            className="text-[#69DD84] text-[32px] sm:text-[36px] font-normal leading-[160%] text-center font-montez"
            style={{ fontFamily: "var(--font-montez), Montez, cursive" }}
          >
            Book Your Adventure in Minutes
          </p>

          {/* Main Title */}
          <h2
            className="text-[#F5F9FF] text-[34px] sm:text-[40px] font-semibold leading-[160%] text-center font-roboto"
            style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif" }}
          >
            How It Works
          </h2>

          {/* Green Horizontal Line */}
          <div className="mt-1 mx-auto w-[117px] h-[8px] bg-[#69DD84] rounded-[4px]" />
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20 justify-items-center mt-24">
          {steps.map((step) => (
            <HowItWorksCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

