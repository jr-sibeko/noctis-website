"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { submitReview, type ReviewState } from "@/app/reviews/actions";
import { services } from "@/lib/services";

const initialState: ReviewState = { status: "idle", message: "" };
const ratingLabels = ["", "Poor", "Fair", "Good", "Very good", "Exceptional"];
const cinema = [0.22, 1, 0.36, 1] as const;

const inputClass =
  "mt-3 w-full border-b border-line bg-transparent pb-3 text-ivory outline-none transition-colors duration-300 placeholder:text-smoke/50 focus:border-champagne";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-smoke">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-2 block text-xs text-red-400">{error}</span>
      )}
    </label>
  );
}

export default function ReviewForm() {
  const [state, formAction, pending] = useActionState(
    submitReview,
    initialState,
  );
  const [rating, setRating] = useState(0); // the star they clicked
  const [hover, setHover] = useState(0); // the star the mouse is over
  const errors = state.errors ?? {};
  const v = state.values ?? {};
  const shown = hover || rating;

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        /* ---------- Thank-you message ---------- */
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: cinema }}
          className="border border-champagne/40 bg-noir p-10 text-center md:p-14"
        >
          <div className="hairline mx-auto w-24" />
          <h3 className="mt-8 font-display text-4xl font-light text-ivory">
            Thank you<span className="italic text-champagne-soft">.</span>
          </h3>
          <p className="mx-auto mt-6 max-w-md text-smoke">{state.message}</p>
        </motion.div>
      ) : (
        /* ---------- The form ---------- */
        <motion.form
          key="form"
          action={formAction}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative space-y-10"
        >
          {/* Spam trap: hidden from people */}
          <div
            aria-hidden="true"
            className="absolute h-0 w-0 overflow-hidden opacity-0"
          >
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          {/* Star rating */}
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-smoke">
              Your rating
            </span>
            <div
              className="mt-4 flex items-center gap-1"
              onMouseLeave={() => setHover(0)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <motion.button
                  key={n}
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  aria-pressed={rating === n}
                  className="p-1"
                >
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className={`h-8 w-8 transition-colors duration-200 ${
                      n <= shown ? "fill-champagne" : "fill-line"
                    }`}
                  >
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                  </svg>
                </motion.button>
              ))}
              <span className="ml-4 font-display text-lg italic text-champagne-soft">
                {ratingLabels[shown]}
              </span>
            </div>
            <input type="hidden" name="rating" value={rating} />
            {errors.rating && (
              <p className="mt-2 text-xs text-red-400">{errors.rating}</p>
            )}
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <Field label="Your name" name="name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={v.name}
                placeholder="e.g. Thabo M."
                className={inputClass}
              />
            </Field>

            <Field
              label="Vehicle (optional)"
              name="vehicle"
              error={errors.vehicle}
            >
              <input
                id="vehicle"
                name="vehicle"
                type="text"
                defaultValue={v.vehicle}
                placeholder="e.g. Audi A4"
                className={inputClass}
              />
            </Field>
          </div>

          <Field
            label="Service received (optional)"
            name="service"
            error={errors.service}
          >
            <select
              id="service"
              name="service"
              defaultValue={v.service ?? ""}
              className={`${inputClass} cursor-pointer appearance-none`}
            >
              <option value="" className="bg-noir">
                Choose a service
              </option>
              {services.map((service) => (
                <option
                  key={service.slug}
                  value={service.name}
                  className="bg-noir"
                >
                  {service.name}
                </option>
              ))}
              <option value="Membership" className="bg-noir">
                Membership
              </option>
            </select>
          </Field>

          <Field label="Your review" name="comment" error={errors.comment}>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              defaultValue={v.comment}
              placeholder="How was your experience with Noctis?"
              className={`${inputClass} resize-none`}
            />
          </Field>

          {/* Permission to publish */}
          <div>
            <label className="flex items-start gap-4 text-sm leading-relaxed text-smoke">
              <input
                type="checkbox"
                name="consent"
                defaultChecked={v.consent === "on"}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-champagne"
              />
              <span>
                I agree that Noctis may publish my name, vehicle and review on
                this website, as set out in the{" "}
                <Link
                  href="/privacy"
                  className="text-ivory underline decoration-champagne/50 underline-offset-4 hover:text-champagne"
                >
                  privacy policy
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <p className="mt-2 text-xs text-red-400">{errors.consent}</p>
            )}
          </div>

          {state.status === "error" && (
            <p
              role="alert"
              className="border border-red-400/40 bg-red-400/5 px-5 py-4 text-sm text-red-300"
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-champagne px-12 py-5 text-xs uppercase tracking-[0.3em] text-noir transition-colors duration-500 hover:bg-ivory disabled:cursor-wait disabled:opacity-60 md:w-auto"
          >
            {pending ? "Sending…" : "Submit review"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
