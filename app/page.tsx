import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import Process from "@/components/home/Process";
import ReviewsPreview from "@/components/home/ReviewsPreview";
import Promo from "@/components/home/Promo";
import FinalCta from "@/components/home/FinalCta";

// Re-check for newly approved reviews at most once a minute (keeps the home page fast)
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Process />
      <ReviewsPreview />
      <Promo />
      <FinalCta />
    </>
  );
}
