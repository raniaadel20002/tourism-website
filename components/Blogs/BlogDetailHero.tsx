import Image from "next/image";
import { BlogItem } from "@/data/blogs";

interface BlogDetailHeroProps {
  blog: BlogItem;
}

export default function BlogDetailHero({ blog }: BlogDetailHeroProps) {
  return (
    <section className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={blog.heroImage || "/images/home/whereBegins/Frame 1171276613 (1).png"}
          alt={blog.title}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlay for optimal readability */}
        <div className="absolute inset-0 bg-black/45 backdrop-brightness-90" />
      </div>

      {/* Centered Blog Hero Title */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-roboto font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight tracking-tight drop-shadow-md">
          {blog.heroTitle || blog.title}
        </h1>
      </div>
    </section>
  );
}
