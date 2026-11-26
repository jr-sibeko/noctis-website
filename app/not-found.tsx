import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Giant faint 404 in the background */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-display text-[40vw] font-light leading-none text-ivory/[0.03]"
      >
        404
      </span>

      <p className="eyebrow relative">Page not found</p>
      <h1 className="relative mt-6 font-display text-5xl font-light text-ivory md:text-7xl">
        Lost <span className="italic text-champagne-soft">in the dark.</span>
      </h1>
      <p className="relative mt-6 max-w-md text-smoke">
        The page you are looking for has moved, or never existed. Let us guide
        you back.
      </p>

      <div className="relative mt-12 flex flex-col gap-5 sm:flex-row">
        <Link
          href="/"
          className="bg-champagne px-10 py-4 text-xs uppercase tracking-[0.3em] text-noir transition-colors duration-500 hover:bg-ivory"
        >
          Back to home
        </Link>
        <Link
          href="/services"
          className="border border-champagne/60 px-10 py-4 text-xs uppercase tracking-[0.3em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-noir"
        >
          View services
        </Link>
      </div>
    </section>
  );
}
