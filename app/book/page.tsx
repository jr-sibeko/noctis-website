import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a detail",
  description:
    "Request a quote or book a premium mobile detail with Noctis Auto Atelier.",
};

type Props = {
  searchParams: Promise<{ service?: string }>;
};

const nextSteps = [
  "We review your request and vehicle details.",
  "We contact you on WhatsApp or by phone to confirm and send your quote.",
  "We arrive at your chosen place and time, fully equipped.",
];

export default async function BookPage({ searchParams }: Props) {
  // If they came from a service page, e.g. /book?service=paint-correction, pre-select it
  const { service } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Book a detail"
        title="Let us take it"
        highlight="from here."
        intro="Tell us about your car and what you would like done. We will reply with a recommendation and a tailored quote."
      />

      <section className="mx-auto grid max-w-7xl gap-20 px-6 pb-32 lg:grid-cols-[1.6fr_1fr] lg:gap-24 lg:px-10">
        <Reveal>
          <BookingForm defaultService={service ?? ""} />
        </Reveal>

        <Reveal delay={0.15}>
          <aside className="space-y-12 lg:border-l lg:border-line lg:pl-12">
            <div>
              <p className="eyebrow">Prefer to chat?</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block border border-champagne/60 px-8 py-4 text-center text-xs uppercase tracking-[0.3em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-noir"
              >
                WhatsApp us
              </a>
              <ul className="mt-8 space-y-3 text-sm text-smoke">
                <li>
                  <a
                    href={`tel:${site.phoneLink}`}
                    className="transition-colors hover:text-ivory"
                  >
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-ivory"
                  >
                    {site.email}
                  </a>
                </li>
                <li>{site.area}</li>
                <li>{site.hours}</li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">What happens next</p>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-5">
                    <span className="font-display text-xl text-champagne">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-smoke">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
