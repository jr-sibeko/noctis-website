"use client";

import Image from "next/image";
import { motion } from "motion/react";

const cinema = [0.22, 1, 0.36, 1] as const;

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro?: string;
  image?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  highlight,
  intro,
  image,
}: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden pb-20 pt-40">
      {/* Optional background photo */}
      {image && (
        <>
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.4, ease: cinema }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-noir/70" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-noir to-transparent" />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: cinema }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>

        <h1 className="mt-6 font-display text-5xl font-light leading-[1.05] text-ivory md:text-8xl">
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.3, delay: 0.5, ease: cinema }}
            >
              {title}
            </motion.span>
          </span>
          {highlight && (
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block italic text-champagne-soft"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.3, delay: 0.68, ease: cinema }}
              >
                {highlight}
              </motion.span>
            </span>
          )}
        </h1>

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: cinema }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-smoke"
          >
            {intro}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 1.1, ease: cinema }}
          className="hairline mt-12 w-40 origin-left"
        />
      </div>
    </section>
  );
}
