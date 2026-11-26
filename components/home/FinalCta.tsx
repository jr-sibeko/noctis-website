"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";
import { site, whatsappLink } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-40">
      {/* Slow pulsing gold glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          aria-hidden="true"
          className="h-[600px] w-[600px] rounded-full bg-champagne/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">Your turn</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-5xl font-light leading-[1.05] text-ivory md:text-7xl">
            Ready to see your car{" "}
            <span className="italic text-champagne-soft">in a new light?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-smoke">
            Tell us about your vehicle and we will reply with a tailored
            recommendation and quote.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/book"
              className="w-full bg-champagne px-10 py-4 text-xs uppercase tracking-[0.3em] text-noir transition-colors duration-500 hover:bg-ivory sm:w-auto"
            >
              Request a quote
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-champagne/60 px-10 py-4 text-xs uppercase tracking-[0.3em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-noir sm:w-auto"
            >
              WhatsApp us
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="hairline mx-auto mt-16 w-40" />
          <p className="mt-8 text-sm text-smoke">
            Prefer to talk?{" "}
            <a
              href={`tel:${site.phoneLink}`}
              className="text-ivory underline decoration-champagne/50 underline-offset-4 transition-colors duration-300 hover:text-champagne"
            >
              {site.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
