import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Noctis is a South African detailing studio built on patience, precision and care.",
};

const values = [
  {
    number: "I",
    title: "Patience",
    text: "We never rush a finish. Good work takes the time it takes.",
  },
  {
    number: "II",
    title: "Precision",
    text: "Every panel, seam and stitch is inspected under proper light before we call it done.",
  },
  {
    number: "III",
    title: "Protection",
    text: "Safe methods and pH-balanced products that protect your car’s finish and its value.",
  },
  {
    number: "IV",
    title: "Discretion",
    text: "We respect your home, your time and your privacy. We arrive, we work, we reveal.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Born in"
        highlight="the details."
        intro="Noctis is a young South African detailing studio with one belief: your car deserves more than a quick wash."
        image="/images/interior.jpg"
      />

      {/* Story */}
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:gap-24 lg:px-10">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <p className="mt-8 font-display text-3xl font-light leading-snug text-ivory md:text-4xl">
            “A clean car is easy. A car that feels{" "}
            <span className="italic text-champagne-soft">new again</span> takes
            obsession.”
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {/* ✏️ Rewrite these paragraphs in your own words: who you are and why you started */}
          <div className="space-y-6 leading-relaxed text-smoke">
            <p>
              Noctis started with a simple frustration: most car washes are
              built for speed, not care. Cars come out wet, swirled and only
              half clean, and owners have learned to accept it.
            </p>
            <p>
              We are a small team of first-time founders who decided to do it
              differently. We learn from experienced detailers, invest in
              professional products, and treat every car as if it were our own.
            </p>
            <p>
              The name comes from the Latin for “of the night”. Much of the work
              happens quietly, out of sight. What matters is the moment of the
              reveal, when you see your car again and it feels new.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Wide image */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden border border-line">
            <Image
              src="/images/engine.jpg"
              alt="Detailing work in progress"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-noir/30" />
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="mt-24 border-y border-line bg-graphite py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="text-center">
            <p className="eyebrow">What we stand for</p>
            <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-6xl">
              Four{" "}
              <span className="italic text-champagne-soft">principles.</span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <span className="font-display text-3xl italic text-champagne">
                  {value.number}
                </span>
                <h3 className="mt-6 font-display text-2xl text-ivory">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-smoke">
                  {value.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
