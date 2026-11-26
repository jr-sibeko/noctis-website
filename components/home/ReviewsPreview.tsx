import Link from "next/link";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import { getApprovedReviews } from "@/lib/supabase";

export default async function ReviewsPreview() {
  const reviews = await getApprovedReviews(20);

  // No approved reviews yet? Hide this section completely.
  if (reviews.length === 0) return null;

  // Highest ratings first (newest first among equal ratings), maximum three
  const featured = [...reviews].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const gridColumns =
    featured.length === 1
      ? "max-w-2xl"
      : featured.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section className="border-b border-line bg-graphite py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Client reviews</p>
            <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-6xl">
              From the{" "}
              <span className="italic text-champagne-soft">driver’s seat.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/reviews"
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ivory/80 transition-colors duration-500 hover:text-ivory"
            >
              Read all reviews
              <span className="h-px w-8 bg-champagne transition-all duration-500 group-hover:w-14" />
            </Link>
          </Reveal>
        </div>

        {/* Review cards */}
        <div className={`mt-16 grid gap-6 ${gridColumns}`}>
          {featured.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.12}>
              <article className="flex h-full flex-col border border-line bg-noir p-8 md:p-10">
                <Stars rating={review.rating} />
                <p className="mt-6 flex-1 font-display text-xl font-light italic leading-relaxed text-ivory">
                  “{review.comment}”
                </p>
                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-sm text-ivory">{review.name}</p>
                  {(review.vehicle || review.service) && (
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-smoke">
                      {[review.vehicle, review.service]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Link
            href="/reviews#write"
            className="text-xs uppercase tracking-[0.3em] text-champagne underline decoration-champagne/40 underline-offset-8 transition-colors duration-300 hover:text-ivory"
          >
            Had a Noctis detail? Leave a review
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
