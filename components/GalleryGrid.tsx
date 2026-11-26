"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gallery, galleryCategories, type GalleryItem } from "@/lib/gallery";

type Category = (typeof galleryCategories)[number];
const cinema = [0.22, 1, 0.36, 1] as const;

export default function GalleryGrid() {
  const [active, setActive] = useState<Category>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const items =
    active === "All"
      ? gallery
      : gallery.filter((item) => item.category === active);

  // Close the full-screen viewer with the Esc key
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`relative px-5 py-2 text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
              active === category ? "text-noir" : "text-smoke hover:text-ivory"
            }`}
          >
            {active === category && (
              <motion.span
                layoutId="gallery-tab"
                className="absolute inset-0 bg-champagne"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative">{category}</span>
          </button>
        ))}
      </div>

      {/* Photo grid */}
      <motion.div
        layout
        className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.button
              layout
              key={item.src}
              type="button"
              onClick={() => setSelected(item)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: cinema }}
              className={`group relative overflow-hidden border border-line ${item.tall ? "row-span-2" : ""}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale-[30%] transition-all duration-[1400ms] ease-cinema group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-noir/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 translate-y-2 p-6 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="eyebrow">{item.category}</p>
                <p className="mt-2 text-sm text-ivory">{item.alt}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Full-screen viewer */}
      <AnimatePresence>
        {selected && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selected.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-noir/95 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, ease: cinema }}
              className="relative h-[75vh] w-full max-w-5xl"
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <p className="absolute bottom-8 left-0 right-0 text-center text-sm text-smoke">
              {selected.alt}
            </p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-6 top-6 text-xs uppercase tracking-[0.3em] text-ivory transition-colors duration-300 hover:text-champagne"
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
