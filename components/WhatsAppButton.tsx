"use client";

import { motion } from "motion/react";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Noctis on WhatsApp"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-champagne/40 bg-noir/80 px-5 py-3 backdrop-blur-md transition-colors duration-500 hover:border-champagne hover:bg-champagne"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
      </span>
      <span className="text-xs uppercase tracking-[0.25em] text-ivory transition-colors duration-500 group-hover:text-noir">
        WhatsApp
      </span>
    </motion.a>
  );
}
