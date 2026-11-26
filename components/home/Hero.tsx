"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";

const cinema = [0.22, 1, 0.36, 1] as const;
const lines = ["Detailed in the dark.", "Revealed in the light."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Track how far the hero has scrolled out of view (0 → 1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image drifts down and zooms in, text drifts and fades out
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden"
    >
      {/* Background photo */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ scale: 1.25, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: cinema }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero.jpg"
            alt="A dark luxury car under studio lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Darkening layers so the text stays readable */}
      <div className="absolute inset-0 bg-noir/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-noir)_85%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-noir to-transparent" />

      {/* A beam of light that sweeps across once */}
      <motion.div
        aria-hidden="true"
        initial={{ x: "-120%" }}
        animate={{ x: "220%" }}
        transition={{ duration: 2.6, delay: 1.2, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-champagne-soft/15 to-transparent"
      />

      {/* Text and buttons */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.6, delay: 0.4, ease: cinema }}
          className="eyebrow"
        >
          Premium mobile detailing
        </motion.p>

        <h1 className="mt-8 font-display text-5xl font-light leading-[1.05] text-ivory sm:text-6xl md:text-8xl">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-2">
              <motion.span
                className={`block ${i === 1 ? "italic text-champagne-soft" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.4,
                  delay: 0.7 + i * 0.18,
                  ease: cinema,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: cinema }}
          className="mt-8 max-w-xl text-base leading-relaxed text-ivory/70 md:text-lg"
        >
          Paint correction, ceramic protection and interior restoration,
          performed by hand at your home or office.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.7, ease: cinema }}
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
        >
          <Link
            href="/book"
            className="bg-champagne px-10 py-4 text-xs uppercase tracking-[0.3em] text-noir transition-colors duration-500 hover:bg-ivory"
          >
            Book a detail
          </Link>
          <Link
            href="/services"
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ivory/80 transition-colors duration-500 hover:text-ivory"
          >
            Explore services
            <span className="h-px w-8 bg-champagne transition-all duration-500 group-hover:w-14" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Area, bottom left (desktop only) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.2 }}
        className="absolute bottom-10 left-6 z-10 hidden text-[0.65rem] uppercase tracking-[0.3em] text-smoke md:block lg:left-10"
      >
        {site.area}
      </motion.p>

      {/* Scroll indicator, bottom centre */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.2 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-smoke">
            Scroll
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-champagne"
              animate={{ y: [-16, 48] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
