"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterProps = {
  before: string;
  after: string;
  alt: string;
  caption?: string;
};

export default function BeforeAfter({
  before,
  after,
  alt,
  caption,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50); // handle starts in the middle (50%)

  return (
    <figure>
      <div className="relative aspect-[16/10] w-full select-none overflow-hidden border border-line">
        {/* AFTER photo: full width underneath */}
        <Image
          src={after}
          alt={`${alt}, after`}
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover"
        />

        {/* BEFORE photo: on top, cut off at the handle */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${alt}, before`}
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Labels */}
        <span className="absolute left-5 top-5 bg-noir/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-ivory backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-5 top-5 bg-champagne px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-noir">
          After
        </span>

        {/* Gold line and round handle */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${position}%` }}
        >
          <div className="absolute inset-y-0 -left-px w-0.5 bg-champagne" />
          <div className="absolute left-0 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne bg-noir/80 text-sm text-champagne backdrop-blur-sm">
            ‹ ›
          </div>
        </div>

        {/* Invisible slider covering the photo: it does the dragging */}
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Drag to compare before and after"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      {caption && (
        <figcaption className="mt-4 text-sm text-smoke">{caption}</figcaption>
      )}
    </figure>
  );
}
