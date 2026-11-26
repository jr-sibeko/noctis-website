export type Service = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  image: string;
  duration: string;
  includes: string[];
  idealFor: string;
};

export const services: Service[] = [
  {
    slug: "signature-wash",
    number: "01",
    name: "Signature Wash",
    tagline: "The ritual, not the rinse.",
    summary:
      "A meticulous hand wash using the two-bucket method and pH-neutral foam.",
    description:
      "Our entry into the Noctis standard. Snow foam pre-wash lifts grit before a mitt ever touches the paint, followed by a two-bucket hand wash, wheel and arch deep clean, and a hand dry with plush microfibre. Glass, trim and tyres are finished to a quiet, satin perfection.",
    image: "/images/foam.jpg",
    duration: "1.5 – 2 hours",
    includes: [
      "Snow foam pre-wash",
      "Two-bucket hand wash",
      "Wheels, tyres and arches deep cleaned",
      "Microfibre hand dry",
      "Streak-free glass inside and out",
      "Tyre and trim dressing",
    ],
    idealFor: "Regular upkeep between deeper details.",
  },
  {
    slug: "interior-restoration",
    number: "02",
    name: "Interior Restoration",
    tagline: "Step back into new.",
    summary:
      "Deep extraction, steam and leather care that returns the cabin to showroom.",
    description:
      "Every seam, vent and stitch is treated by hand. Carpets and mats are shampooed and extracted, surfaces are steam-cleaned and protected, and leather is gently cleansed then nourished with a conditioner that leaves a natural, matte finish — never greasy.",
    image: "/images/interior.jpg",
    duration: "3 – 4 hours",
    includes: [
      "Full vacuum including boot",
      "Carpet and mat shampoo and extraction",
      "Steam clean of vents, consoles and panels",
      "Leather cleanse and conditioning",
      "UV protection on plastics and trim",
      "Odour neutralising treatment",
    ],
    idealFor: "Family cars, pre-sale prep, or a long-overdue refresh.",
  },
  {
    slug: "paint-correction",
    number: "03",
    name: "Paint Correction",
    tagline: "Erase the years. Reveal the depth.",
    summary:
      "Machine polishing that removes swirls and scratches for a mirror finish.",
    description:
      "Under inspection lighting we map every swirl, holograms and light scratch, then machine polish the clear coat in stages until the reflection is sharp enough to read. The result is paint with genuine depth — the kind that looks wet even when it is dry.",
    image: "/images/polish.jpg",
    duration: "1 – 2 days",
    includes: [
      "Full decontamination wash and clay bar",
      "Paint depth inspection",
      "Multi-stage machine compounding and polishing",
      "Swirl and light scratch removal",
      "Panel wipe to reveal true finish",
      "Sealant protection",
    ],
    idealFor: "Dark paintwork, older vehicles, or cars bought second-hand.",
  },
  {
    slug: "ceramic-coating",
    number: "04",
    name: "Ceramic Coating",
    tagline: "Armour that looks like glass.",
    summary:
      "A hard, hydrophobic layer that protects paint from sun, dust and rain.",
    description:
      "Built for the South African sun. After full correction, a professional-grade ceramic coating is applied panel by panel and left to cure. It bonds with the clear coat to resist UV fade, bird droppings and road grime — water beads and slides away, and the car stays cleaner for longer.",
    image: "/images/ceramic.jpg",
    duration: "2 – 3 days",
    includes: [
      "Paint correction before coating",
      "Professional ceramic coating application",
      "Wheels and glass coating",
      "Controlled curing time",
      "Aftercare guide",
      "Complimentary 30-day inspection",
    ],
    idealFor: "New cars, or anyone who wants long-term protection.",
  },
  {
    slug: "engine-bay-detail",
    number: "05",
    name: "Engine Bay Detail",
    tagline: "Clean where it counts.",
    summary:
      "A safe, low-moisture degrease and dress for an engine that looks factory-fresh.",
    description:
      "Sensitive components are covered before a gentle degrease and low-pressure clean. Hoses, plastics and covers are then dressed with a non-greasy protectant, leaving an engine bay that is ready for a buyer's inspection or a car show.",
    image: "/images/engine.jpg",
    duration: "1 – 1.5 hours",
    includes: [
      "Protection of electrical components",
      "Safe degreasing",
      "Low-pressure rinse and hand detailing",
      "Plastics and hoses dressed",
      "Bonnet underside cleaned",
    ],
    idealFor: "Resale preparation and enthusiasts.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
