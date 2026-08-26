import Hero from "@/components/Home/Hero";
import TourCategories from "@/components/Home/TourCategories";
import BestSellingTours from "@/components/Home/BestSellingTours";
import PopularDestinations from "@/components/Home/PopularDestinations";
import HowItWorks from "@/components/Home/HowItWorks";
import Gallery from "@/components/Home/Gallery";
import BlogSection from "@/components/Home/BlogSection";
import WhereBegins from "@/components/Home/WhereBegins";
import FAQ from "@/components/Home/FAQ";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TourCategories />
      <BestSellingTours />
      <PopularDestinations />
      <HowItWorks />
      <Gallery />
      <BlogSection />
      <WhereBegins/>
      <FAQ />
    </main>
  );
}
