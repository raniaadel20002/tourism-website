interface InfoCardProps {
  title: string;
  body: string;
}

export default function AboutInfoCard({ title, body }: InfoCardProps) {
  return (
    <div className="bg-[#F4F8FA] rounded-2xl p-6 sm:p-7 md:p-8">
      <div className="mb-3">
        <h4 className="font-roboto font-medium text-[#004560] text-lg sm:text-xl md:text-[22px] mb-1.5 inline-block">
          {title}
        </h4>
        <div className="w-10 h-0.5 bg-[#004560] rounded-full" />
      </div>
      <p className="font-roboto font-normal text-[#484848] text-sm sm:text-base leading-relaxed">
        {body}
      </p>
    </div>
  );
}
