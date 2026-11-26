import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getService, services } from "@/lib/services";
import { whatsappLink } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

// Build a page for every service ahead of time (fast loading)
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

// The title shown in Google and on the browser tab
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return { title: service.name, description: service.summary };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  // Unknown address, e.g. /services/banana → 404 page
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`Service ${service.number}`}
        title={service.name}
        highlight={service.tagline}
        intro={service.summary}
        image={service.image}
      />

      {/* Description + booking card */}
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-24 lg:px-10">
        <div>
          <Reveal>
            <p className="eyebrow">The treatment</p>
            <p className="mt-8 font-display text-2xl font-light leading-relaxed text-ivory md:text-3xl">
              {service.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 border-l border-champagne/50 pl-8">
              <p className="eyebrow">Ideal for</p>
              <p className="mt-4 text-lg text-smoke">{service.idealFor}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <aside className="border border-line bg-graphite p-8 md:p-10 lg:sticky lg:top-28">
            <p className="eyebrow">Duration</p>
            <p className="mt-3 font-display text-3xl text-ivory">
              {service.duration}
            </p>

            <div className="my-8 h-px bg-line" />

            <p className="eyebrow">Included</p>
            <ul className="mt-6 space-y-4">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-4 text-sm text-ivory/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-champagne" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4">
              <Link
                href={`/book?service=${service.slug}`}
                className="bg-champagne px-8 py-4 text-center text-xs uppercase tracking-[0.3em] text-noir transition-colors duration-500 hover:bg-ivory"
              >
                Request a quote
              </Link>
              <a
                href={whatsappLink(
                  `Hi Noctis, I'm interested in ${service.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-champagne/60 px-8 py-4 text-center text-xs uppercase tracking-[0.3em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-noir"
              >
                Ask on WhatsApp
              </a>
            </div>
            <p className="mt-6 text-center text-xs text-smoke">
              Pricing depends on the size and condition of your vehicle.
            </p>
          </aside>
        </Reveal>
      </section>

      {/* Other services */}
      <section className="border-t border-line bg-graphite py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-light text-ivory md:text-5xl">
              Explore <span className="italic text-champagne-soft">more.</span>
            </h2>
            <Link
              href="/services"
              className="hidden text-xs uppercase tracking-[0.25em] text-smoke transition-colors duration-300 hover:text-ivory md:block"
            >
              All services
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.1}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden border border-line"
                >
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover grayscale-[40%] transition-all duration-[1600ms] ease-cinema group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="font-display text-champagne">
                      {other.number}
                    </span>
                    <h3 className="mt-2 font-display text-2xl text-ivory">
                      {other.name}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
