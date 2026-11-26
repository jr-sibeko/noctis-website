import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Noctis Auto Atelier collects, uses and protects your personal information under POPIA.",
};

// ✏️ Update these before launch
const lastUpdated = "26 November 2026";
const informationOfficer = "Junior Sibeko"; // the person responsible for privacy at Noctis

const sections = [
  {
    title: "1. Who we are",
    body: [
      `${site.fullName} (“Noctis”, “we”, “us”) is a mobile car detailing business based in ${site.area}, South Africa. We are the responsible party for the personal information you share with us through this website, WhatsApp, email or phone.`,
    ],
  },
  {
    title: "2. What we collect",
    body: [
      "We only collect what we need to respond to you and provide our services:",
    ],
    list: [
      "Your name, phone number and email address",
      "Your vehicle details (make, model, condition) and any photos you send us",
      "The address where you would like the service performed",
      "Your messages, booking requests and preferred dates",
      "Reviews you choose to submit, including your name and rating",
    ],
  },
  {
    title: "3. Why we use it",
    list: [
      "To reply to your enquiry and prepare a quote",
      "To schedule, perform and follow up on your booking",
      "To manage your membership, if you join one",
      "To publish your review on our website, only once you submit it and we approve it",
      "To send you offers, only if you have clearly agreed to receive them",
    ],
  },
  {
    title: "4. Who we share it with",
    body: [
      "We never sell your personal information. We share it only with trusted service providers who help us run this website, such as our website host, our email delivery service and our database provider. Some of these providers store information on servers outside South Africa. Where this happens, we use providers that are bound by data protection obligations similar to those in POPIA.",
    ],
  },
  {
    title: "5. How long we keep it",
    body: [
      "We keep your information only for as long as we need it for the purposes above, or as long as the law requires. After that, we delete it or make it anonymous.",
    ],
  },
  {
    title: "6. How we protect it",
    body: [
      "We take reasonable technical and organisational steps to keep your information safe, including secure (HTTPS) connections and access limited to the people who need it.",
    ],
  },
  {
    title: "7. Your rights",
    body: [
      "Under the Protection of Personal Information Act (POPIA), you have the right to:",
    ],
    list: [
      "Ask what personal information we hold about you",
      "Ask us to correct or delete your information",
      "Object to us using your information, including for marketing",
      "Withdraw your consent at any time",
      "Lodge a complaint with the Information Regulator (inforegulator.org.za)",
    ],
  },
  {
    title: "8. Cookies",
    body: [
      "This website does not use advertising or tracking cookies. If that changes, we will update this policy and ask for your consent first.",
    ],
  },
  {
    title: "9. Contact us",
    body: [
      `Information Officer: ${informationOfficer}`,
      `Email: ${site.email}`,
      `Phone: ${site.phoneDisplay}`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy policy"
        title="Your information,"
        highlight="handled with care."
        intro={`How we collect, use and protect your personal information. Last updated ${lastUpdated}.`}
      />

      <section className="mx-auto max-w-3xl px-6 pb-32 lg:px-10">
        <div className="space-y-14">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-2xl text-ivory md:text-3xl">
                {section.title}
              </h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-smoke">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-3">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 leading-relaxed text-smoke"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-champagne" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
