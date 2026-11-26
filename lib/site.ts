export const site = {
  name: "Noctis",
  fullName: "Noctis Auto Atelier",
  tagline: "Detailed in the dark. Revealed in the light.",
  description:
    "Premium mobile car detailing in South Africa. Paint correction, ceramic coating and interior restoration, delivered to your door.",
  area: "Your Area, Province",
  email: "you@example.com",
  phoneDisplay: "+27 00 000 0000",
  phoneLink: "+27000000000",
  whatsapp: "27000000000", // country code + number, no +, no spaces, no leading 0
  instagram: "https://instagram.com/",
  hours: "Mon – Sat · 07:00 – 18:00",
};

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export function whatsappLink(
  message = "Hi Noctis, I'd like to book a detail.",
) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
