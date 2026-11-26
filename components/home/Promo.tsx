"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import { whatsappLink } from "@/lib/site";

// ✏️ Edit your current promotion here
const promo = {
  label: "Founding client offer",
  title: "The first chapter.",
  highlight: "15% off.",
  text: "As one of our first clients, enjoy 15% off any Interior Restoration, Paint Correction or Ceramic Coating, plus a complimentary Engine Bay Detail.",
  validUntil: "31 January 2027",
  whatsappMessage: "Hi Noctis, I'd like to claim the founding client offer.",
};

export default function Promo() {
  const ref = useRef<HTMLElement>(null);

  // Parallax: the photo moves slower than the page
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-40">
      {/* Background photo */}
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[15%] -bottom-[15%]"
      >
        <Image
          src="/images/promo.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Darkening layers */}
      <div className="absolute inset-0 bg-noir/70" />
      <div className="absolute inset-0 bg-linear-to-r from-noir via-noir/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-3 border border-champagne/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-champagne">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-champagne" />
              {promo.label}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-5xl font-light leading-[1.05] text-ivory md:text-7xl">
              {promo.title}
              <span className="block italic text-champagne-soft">
                {promo.highlight}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ivory/75">
              {promo.text}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
              <a
                href={whatsappLink(promo.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-champagne px-10 py-4 text-center text-xs uppercase tracking-[0.3em] text-noir transition-colors duration-500 hover:bg-ivory"
              >
                Claim on WhatsApp
              </a>
              <Link
                href="/book"
                className="group flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-ivory/80 transition-colors duration-500 hover:text-ivory"
              >
                Request a quote
                <span className="h-px w-8 bg-champagne transition-all duration-500 group-hover:w-14" />
              </Link>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-smoke">
              Valid until {promo.validUntil}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
