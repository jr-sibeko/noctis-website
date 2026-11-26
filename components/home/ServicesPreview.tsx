import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";

export default function ServicesPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 lg:px-10">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-light leading-tight text-ivory md:text-6xl">
            Five disciplines.{" "}
            <span className="italic text-champagne-soft">One standard.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-sm leading-relaxed text-smoke">
            Every service is performed by hand with professional-grade products.
            Tell us about your car and we will recommend the right treatment.
          </p>
        </Reveal>
      </div>

      {/* Cards */}
      <div className="mt-20 grid gap-6 md:grid-cols-6">
        {services.map((service, i) => {
          const isLarge = i < 2;
          return (
            <Reveal
              key={service.slug}
              delay={i * 0.08}
              className={isLarge ? "md:col-span-3" : "md:col-span-2"}
            >
              <Link
                href={`/services/${service.slug}`}
                className={`group relative block aspect-[4/5] overflow-hidden border border-line md:aspect-auto ${
                  isLarge ? "md:h-[520px]" : "md:h-[400px]"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes={
                    isLarge
                      ? "(min-width: 768px) 50vw, 100vw"
                      : "(min-width: 768px) 33vw, 100vw"
                  }
                  className="object-cover grayscale-[40%] transition-all duration-[1600ms] ease-cinema group-hover:scale-110 group-hover:grayscale-0"
                />

                {/* Dark fade so the text is readable */}
                <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/40 to-noir/10 transition-opacity duration-700 group-hover:opacity-80" />

                {/* Text */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <span className="font-display text-lg text-champagne">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl text-ivory md:text-4xl">
                      {service.name}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm text-ivory/70">
                      {service.tagline}
                    </p>
                    <span className="mt-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-champagne">
                      Discover
                      <span className="h-px w-6 bg-champagne transition-all duration-500 group-hover:w-16" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
