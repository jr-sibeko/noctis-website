import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/home/FinalCta";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Signature wash, interior restoration, paint correction, ceramic coating and engine bay detailing, performed by hand.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="The Noctis"
        highlight="collection."
        intro="Five treatments, each performed by hand with professional-grade products. Not sure which you need? Send us a photo and we will recommend one."
        image="/images/polish.jpg"
      />

      <section className="mx-auto max-w-7xl space-y-32 px-6 py-24 lg:px-10">
        {services.map((service, i) => {
          const flip = i % 2 === 1; // every second service swaps sides
          return (
            <article
              key={service.slug}
              className="grid items-center gap-12 md:grid-cols-2 md:gap-20"
            >
              {/* Photo */}
              <Reveal className={flip ? "md:order-2" : ""}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden border border-line"
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale-[30%] transition-all duration-[1600ms] ease-cinema group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-noir/20" />
                </Link>
              </Reveal>

              {/* Text */}
              <Reveal delay={0.15} className={flip ? "md:order-1" : ""}>
                <span className="font-display text-2xl text-champagne">
                  {service.number}
                </span>
                <h2 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
                  {service.name}
                </h2>
                <p className="mt-3 font-display text-xl italic text-champagne-soft">
                  {service.tagline}
                </p>
                <p className="mt-6 leading-relaxed text-smoke">
                  {service.summary}
                </p>

                <div className="mt-8 flex items-center gap-6 border-t border-line pt-6 text-xs uppercase tracking-[0.25em] text-smoke">
                  <span>Duration</span>
                  <span className="text-ivory">{service.duration}</span>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <Link
                    href={`/services/${service.slug}`}
                    className="border border-champagne/60 px-8 py-3 text-xs uppercase tracking-[0.25em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-noir"
                  >
                    View details
                  </Link>
                  <Link
                    href={`/book?service=${service.slug}`}
                    className="group flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ivory/80 transition-colors duration-500 hover:text-ivory"
                  >
                    Request a quote
                    <span className="h-px w-8 bg-champagne transition-all duration-500 group-hover:w-14" />
                  </Link>
                </div>
              </Reveal>
            </article>
          );
        })}
      </section>

      <FinalCta />
    </>
  );
}
