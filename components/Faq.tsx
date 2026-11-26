"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type FaqItem = {
  question: string;
  answer: string;
};

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0); // first question starts open

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-7 text-left"
            >
              <span
                className={`font-display text-xl transition-colors duration-300 md:text-2xl ${
                  isOpen ? "text-champagne-soft" : "text-ivory"
                }`}
              >
                {item.question}
              </span>

              {/* Plus / minus icon */}
              <span className="relative h-4 w-4 shrink-0">
                <span className="absolute left-0 top-1/2 h-px w-4 bg-champagne" />
                <span
                  className={`absolute left-1/2 top-0 h-4 w-px bg-champagne transition-transform duration-500 ${
                    isOpen ? "scale-y-0" : "scale-y-100"
                  }`}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 leading-relaxed text-smoke">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
