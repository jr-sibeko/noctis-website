"use client";

import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Reach out",
    text: "Send us a WhatsApp or request a quote online. Tell us about your car and what you would like done.",
  },
  {
    number: "02",
    title: "Consultation",
    text: "We ask for a few photos, recommend the right treatment, and send you a tailored quote. No surprises.",
  },
  {
    number: "03",
    title: "We come to you",
    text: "At your home or office, at a time that suits you. We arrive fully equipped and work with care.",
  },
  {
    number: "04",
    title: "The reveal",
    text: "We walk you around the finished car and leave you with simple aftercare to keep it that way.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-graphite py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <Reveal className="text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-light leading-tight text-ivory md:text-6xl">
            From first message to{" "}
            <span className="italic text-champagne-soft">final reveal.</span>
          </h2>
        </Reveal>

        <div className="relative mt-24">
          {/* Gold line that draws across (desktop only) */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-linear-to-r from-champagne/0 via-champagne to-champagne/0 md:block"
          />

          {/* Steps */}
          <div className="grid gap-16 md:grid-cols-4 md:gap-10">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={0.3 + i * 0.2}>
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/60 bg-graphite font-display text-lg text-champagne">
                  {step.number}
                </span>
                <h3 className="mt-8 font-display text-2xl text-ivory">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-smoke">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
