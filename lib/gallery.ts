export const galleryCategories = [
  "All",
  "Exterior",
  "Interior",
  "Paint & coating",
] as const;

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Exterior" | "Interior" | "Paint & coating";
  tall?: boolean; // true = takes up two rows in the grid
};

// ✏️ Replace these with photos of your own work before launch
export const gallery: GalleryItem[] = [
  {
    src: "/images/hero.jpg",
    alt: "Gloss black finish under studio light",
    category: "Exterior",
    tall: true,
  },
  { src: "/images/foam.jpg", alt: "Snow foam pre-wash", category: "Exterior" },
  {
    src: "/images/interior.jpg",
    alt: "Restored leather interior",
    category: "Interior",
    tall: true,
  },
  {
    src: "/images/polish.jpg",
    alt: "Machine polishing the clear coat",
    category: "Paint & coating",
  },
  {
    src: "/images/ceramic.jpg",
    alt: "Water beading on ceramic coating",
    category: "Paint & coating",
  },
  {
    src: "/images/engine.jpg",
    alt: "Detailed engine bay",
    category: "Exterior",
  },
  {
    src: "/images/promo.jpg",
    alt: "Headlight detail at night",
    category: "Exterior",
    tall: true,
  },
];

export type BeforeAfterPair = {
  before: string;
  after: string;
  alt: string;
  caption: string;
};

// ✏️ Before-and-after pairs. Replace the demo with your real photos.
// To hide this section completely, delete everything between the [ and ].
export const beforeAfter: BeforeAfterPair[] = [
  {
    before: "/images/foam.jpg",
    after: "/images/hero.jpg",
    alt: "Demo comparison",
    caption:
      "Demo only: replace with a real before and after of your own work.",
  },
];
