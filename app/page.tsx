import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import Process from "@/components/home/Process";
import Promo from "@/components/home/Promo";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Process />
      <Promo />
      <FinalCta />
    </>
  );
}
