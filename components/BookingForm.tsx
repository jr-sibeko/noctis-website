"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sendBooking, type BookingState } from "@/app/book/actions";
import { services } from "@/lib/services";
import { whatsappLink } from "@/lib/site";

const initialState: BookingState = { status: "idle", message: "" };
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

export default function BookingForm({
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const [state, formAction, pending] = useActionState(
    sendBooking,
    initialState,
  );
  const [service, setService] = useState(defaultService); // remembers the chosen service
  const errors = state.errors ?? {};
  const v = state.values ?? {};

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        /* ---------- Success message ---------- */
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: cinema }}
          className="border border-champagne/40 bg-graphite p-10 text-center md:p-16"
        >
          <div className="hairline mx-auto w-24" />
          <h2 className="mt-8 font-display text-4xl font-light text-ivory md:text-5xl">
            Request{" "}
            <span className="italic text-champagne-soft">received.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-smoke">{state.message}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a
              href={whatsappLink(
                "Hi Noctis, I have just sent a booking request on your website.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-champagne px-8 py-4 text-xs uppercase tracking-[0.3em] text-noir transition-colors duration-500 hover:bg-ivory"
            >
              Message us on WhatsApp
            </a>
            <Link
              href="/services"
              className="text-xs uppercase tracking-[0.3em] text-ivory/80 transition-colors duration-500 hover:text-ivory"
            >
              Back to services
            </Link>
          </div>
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
          {/* Spam trap: hidden from people, bots fill it in */}
          <div
            aria-hidden="true"
            className="absolute h-0 w-0 overflow-hidden opacity-0"
          >
            <label>
              Company
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <Field label="Full name" name="name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                defaultValue={v.name}
                placeholder="Thabo Mokoena"
                className={inputClass}
              />
            </Field>

            <Field label="Phone / WhatsApp" name="phone" error={errors.phone}>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                defaultValue={v.phone}
                placeholder="082 123 4567"
                className={inputClass}
              />
            </Field>

            <Field label="Email" name="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={v.email}
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>

            <Field
              label="Vehicle make and model"
              name="vehicle"
              error={errors.vehicle}
            >
              <input
                id="vehicle"
                name="vehicle"
                type="text"
                defaultValue={v.vehicle}
                placeholder="e.g. BMW X3, 2021"
                className={inputClass}
              />
            </Field>

            <Field label="Service" name="service" error={errors.service}>
              <select
                id="service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${inputClass} cursor-pointer appearance-none`}
              >
                <option value="" className="bg-noir">
                  Choose a service
                </option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug} className="bg-noir">
                    {s.name}
                  </option>
                ))}
                <option value="membership" className="bg-noir">
                  Membership enquiry
                </option>
                <option value="not-sure" className="bg-noir">
                  Not sure, please advise
                </option>
              </select>
            </Field>

            <Field
              label="Suburb / area"
              name="location"
              error={errors.location}
            >
              <input
                id="location"
                name="location"
                type="text"
                autoComplete="address-level2"
                defaultValue={v.location}
                placeholder="e.g. Sandton"
                className={inputClass}
              />
            </Field>

            <Field
              label="Preferred date (optional)"
              name="date"
              error={errors.date}
            >
              <input
                id="date"
                name="date"
                type="date"
                defaultValue={v.date}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </Field>
          </div>

          <Field
            label="Anything else? (optional)"
            name="message"
            error={errors.message}
          >
            <textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={v.message}
              placeholder="Tell us about the condition of the car, or anything we should know."
              className={`${inputClass} resize-none`}
            />
          </Field>

          {/* POPIA consent */}
          <div>
            <label className="flex items-start gap-4 text-sm leading-relaxed text-smoke">
              <input
                type="checkbox"
                name="consent"
                defaultChecked={v.consent === "on"}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-champagne"
              />
              <span>
                I agree that Noctis may use these details to contact me about my
                request, as set out in the{" "}
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
            {pending ? "Sending…" : "Send request"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
