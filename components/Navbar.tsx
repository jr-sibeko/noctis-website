"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo";
import { navLinks } from "@/lib/site";

const cinema = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-700 ease-cinema ${
        solid
          ? "border-line bg-noir/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="Noctis home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
                    active ? "text-ivory" : "text-smoke hover:text-ivory"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-champagne transition-all duration-500 ease-cinema ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="hidden border border-champagne/60 px-6 py-3 text-xs uppercase tracking-[0.25em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-noir md:inline-flex"
          >
            Book a detail
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="relative h-10 w-10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`absolute left-2 right-2 h-px bg-ivory transition-all duration-500 ${
                open ? "top-1/2 rotate-45" : "top-[40%]"
              }`}
            />
            <span
              className={`absolute left-2 right-2 h-px bg-ivory transition-all duration-500 ${
                open ? "top-1/2 -rotate-45" : "top-[60%]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: cinema }}
            className="h-[calc(100dvh-5rem)] bg-noir md:hidden"
          >
            <ul className="flex flex-col gap-8 px-6 pt-12">
              {[...navLinks, { href: "/book", label: "Book a detail" }].map(
                (link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.07,
                      duration: 0.6,
                      ease: cinema,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-4xl text-ivory"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
