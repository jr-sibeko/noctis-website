import Link from "next/link";
import Logo from "./Logo";
import CurrentYear from "./CurrentYear";
import { navLinks, site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-graphite">
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-4 lg:px-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-6 max-w-sm font-display text-2xl italic text-ivory/80">
            {site.tagline}
          </p>
          <Link
            href="/book"
            className="mt-8 inline-flex border border-champagne/60 px-6 py-3 text-xs uppercase tracking-[0.25em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-noir"
          >
            Request a quote
          </Link>
        </div>

        {/* Explore */}
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-6 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-smoke transition-colors duration-300 hover:text-ivory"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-6 space-y-3 text-sm text-smoke">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-ivory"
              >
                WhatsApp us
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phoneLink}`}
                className="transition-colors duration-300 hover:text-ivory"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors duration-300 hover:text-ivory"
              >
                {site.email}
              </a>
            </li>
            <li>{site.area}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>

      {/* Bottom strip: everything on the left, so the WhatsApp button never covers it */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 pb-28 pt-6 text-xs text-smoke md:flex-row md:items-center md:gap-10 md:pb-6 lg:px-10">
          <p>
            © <CurrentYear /> {site.fullName}. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="transition-colors duration-300 hover:text-ivory"
          >
            Privacy policy (POPIA)
          </Link>
        </div>
      </div>
    </footer>
  );
}
