import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import ReviewForm from "@/components/ReviewForm";
import { getSupabase, type Review } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What our clients say about Noctis Auto Atelier.",
};

// Always load fresh reviews, so approved ones appear straight away
export const dynamic = "force-dynamic";

async function getApprovedReviews(): Promise<Review[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("id, created_at, name, vehicle, service, rating, comment")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Could not load reviews:", error);
    return [];
  }
  return data ?? [];
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-ZA", {
    month: "long",
    year: "numeric",
  });
}

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  const count = reviews.length;
  const average = count
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / count
    : 0;

  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="In their"
        highlight="own words."
        intro="Every review here was written by a real Noctis client and checked by us before publishing."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        {count > 0 ? (
          <>
            {/* Average rating */}
            <Reveal>
              <div className="flex flex-col gap-6 border-y border-line py-10 md:flex-row md:items-center md:justify-between">
                <div className="flex items-end gap-6">
                  <span className="font-display text-7xl font-light text-ivory">
                    {average.toFixed(1)}
                  </span>
                  <div className="pb-3">
                    <Stars rating={Math.round(average)} />
                    <p className="mt-2 text-sm text-smoke">
                      Based on {count} review{count === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <a
                  href="#write"
                  className="border border-champagne/60 px-8 py-4 text-center text-xs uppercase tracking-[0.3em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-noir"
                >
                  Write a review
                </a>
              </div>
            </Reveal>

            {/* Review cards */}
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {reviews.map((review, i) => (
                <Reveal key={review.id} delay={(i % 2) * 0.1}>
                  <article className="flex h-full flex-col border border-line bg-graphite p-8 md:p-10">
                    <Stars rating={review.rating} />
                    <p className="mt-6 flex-1 font-display text-xl font-light italic leading-relaxed text-ivory md:text-2xl">
                      “{review.comment}”
                    </p>
                    <div className="mt-8 border-t border-line pt-6">
                      <p className="text-sm text-ivory">{review.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-smoke">
                        {[review.vehicle, review.service]
                          .filter(Boolean)
                          .join(" · ")}
                        {review.vehicle || review.service ? " · " : ""}
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          /* Before any reviews are approved */
          <Reveal>
            <div className="border border-line bg-graphite px-8 py-20 text-center">
              <div className="hairline mx-auto w-24" />
              <h2 className="mt-8 font-display text-4xl font-light text-ivory md:text-5xl">
                Be among{" "}
                <span className="italic text-champagne-soft">the first.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-smoke">
                Noctis is new, and our first clients are writing our story. If
                we have detailed your car, we would be honoured to hear about
                it.
              </p>
              <a
                href="#write"
                className="mt-10 inline-block bg-champagne px-10 py-4 text-xs uppercase tracking-[0.3em] text-noir transition-colors duration-500 hover:bg-ivory"
              >
                Write a review
              </a>
            </div>
          </Reveal>
        )}
      </section>

      {/* Write a review */}
      <section
        id="write"
        className="scroll-mt-24 border-t border-line bg-graphite py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-24 lg:px-10">
          <Reveal>
            <p className="eyebrow">Share your experience</p>
            <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-5xl">
              Tell us how{" "}
              <span className="italic text-champagne-soft">it felt.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-smoke">
              Your review helps other car owners choose with confidence. Reviews
              appear once we have checked them, usually within a day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ReviewForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
