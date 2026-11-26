import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import BeforeAfter from "@/components/BeforeAfter";
import GalleryGrid from "@/components/GalleryGrid";
import FinalCta from "@/components/home/FinalCta";
import { beforeAfter } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look at the finish: paint correction, ceramic coating and interior restoration by Noctis.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Proof is in"
        highlight="the reflection."
        intro="A look at the Noctis finish. Drag to compare, or tap any image to see it up close."
        image="/images/promo.jpg"
      />

      {/* Before and after (only shows if there are pairs in lib/gallery.ts) */}
      {beforeAfter.length > 0 && (
        <section className="border-b border-line bg-graphite py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="eyebrow">Transformations</p>
              <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-6xl">
                Drag to{" "}
                <span className="italic text-champagne-soft">reveal.</span>
              </h2>
            </Reveal>

            <div className="mt-14 space-y-20">
              {beforeAfter.map((pair, i) => (
                <Reveal key={pair.after + i} delay={0.1}>
                  <BeforeAfter
                    before={pair.before}
                    after={pair.after}
                    alt={pair.alt}
                    caption={pair.caption}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo grid with filters and full-screen viewer */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <GalleryGrid />
      </section>

      <FinalCta />
    </>
  );
}
