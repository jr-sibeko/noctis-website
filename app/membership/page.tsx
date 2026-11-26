import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "The Noctis Circle: scheduled, priority detailing that keeps your car at its best all year round.",
};

// ✏️ Edit your plans here
const plans = [
  {
    name: "Essential",
    tagline: "Kept, consistently.",
    frequency: "Monthly",
    featured: false,
    perks: [
      "One Signature Wash every month",
      "Priority booking",
      "Member rate on add-on services",
      "Seasonal interior refresh",
    ],
  },
  {
    name: "Signature",
    tagline: "The standard, sustained.",
    frequency: "Every two weeks",
    featured: true,
    perks: [
      "Signature Wash every two weeks",
      "Interior Restoration every quarter",
      "Engine Bay Detail twice a year",
      "Priority booking, including weekends",
      "Member rate on add-on services",
    ],
  },
  {
    name: "Private",
    tagline: "For the collection.",
    frequency: "Tailored",
    featured: false,
    perks: [
      "Care for multiple vehicles",
      "Weekly or on-call scheduling",
      "Annual paint correction and coating maintenance",
      "The same dedicated detailer every visit",
    ],
  },
];

const benefits = [
  {
    title: "Priority booking",
    text: "Members are scheduled first, including the busy days before weekends and holidays.",
  },
  {
    title: "The same hands",
    text: "Where possible, the same detailer looks after your car each visit and learns its quirks.",
  },
  {
    title: "Member rates",
    text: "Add paint correction, coating or extras at a preferred member rate.",
  },
  {
    title: "Always ready",
    text: "No more last-minute washes before a meeting or a weekend away. Your car simply stays ready.",
  },
];

const faqs = [
  {
    question: "How much does membership cost?",
    answer:
      "Every vehicle is different, so pricing depends on its size, condition and the plan you choose. Message us with your car's make and model and we will send a tailored quote.",
  },
  {
    question: "Do I need to be home during the detail?",
    answer:
      "No. As long as we can access the vehicle and have a safe place to work, you can carry on with your day. We will message you when it is ready.",
  },
  {
    question: "Can I pause or cancel my membership?",
    answer:
      "Yes. Let us know before your next scheduled visit and we will pause or end your plan. No long-term lock-in.",
  },
  {
    question: "Which areas do you cover?",
    answer: `We currently serve ${site.area} and surrounding areas. If you are further out, ask us and we will do our best to accommodate you.`,
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="The Noctis"
        highlight="Circle."
        intro="Scheduled, priority care that keeps your car at its best all year round, without you ever having to think about it."
        image="/images/ceramic.jpg"
      />

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.1}>
              <div className="h-px w-12 bg-champagne" />
              <h3 className="mt-6 font-display text-2xl text-ivory">
                {benefit.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-smoke">
                {benefit.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="border-y border-line bg-graphite py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="text-center">
            <p className="eyebrow">Choose your plan</p>
            <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-6xl">
              Three ways to{" "}
              <span className="italic text-champagne-soft">belong.</span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.12}>
                <div
                  className={`relative flex h-full flex-col border p-10 transition-colors duration-500 ${
                    plan.featured
                      ? "border-champagne bg-noir"
                      : "border-line bg-noir/40 hover:border-champagne/40"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-10 bg-champagne px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-noir">
                      Recommended
                    </span>
                  )}

                  <p className="eyebrow">{plan.frequency}</p>
                  <h3 className="mt-6 font-display text-4xl text-ivory">
                    {plan.name}
                  </h3>
                  <p className="mt-2 font-display text-lg italic text-champagne-soft">
                    {plan.tagline}
                  </p>

                  <div className="my-8 h-px bg-line" />

                  <ul className="flex-1 space-y-4">
                    {plan.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex gap-4 text-sm text-ivory/85"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-champagne" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(
                      `Hi Noctis, I'd like to join the Noctis Circle (${plan.name} plan).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-10 block px-8 py-4 text-center text-xs uppercase tracking-[0.3em] transition-colors duration-500 ${
                      plan.featured
                        ? "bg-champagne text-noir hover:bg-ivory"
                        : "border border-champagne/60 text-champagne hover:bg-champagne hover:text-noir"
                    }`}
                  >
                    Enquire
                  </a>
                  <p className="mt-4 text-center text-xs text-smoke">
                    Tailored quote for your vehicle
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-32 lg:px-10">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-5xl">
            Before you <span className="italic text-champagne-soft">join.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <Faq items={faqs} />
        </Reveal>
        <Reveal delay={0.2} className="mt-14 text-center">
          <Link
            href="/book"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ivory/80 transition-colors duration-500 hover:text-ivory"
          >
            Still unsure? Request a consultation
            <span className="h-px w-8 bg-champagne transition-all duration-500 group-hover:w-14" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
