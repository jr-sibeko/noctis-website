type StarsProps = {
  rating: number;
  className?: string;
};

export default function Stars({ rating, className = "" }: StarsProps) {
  return (
    <span
      className={`inline-flex gap-1 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 ${n <= rating ? "fill-champagne" : "fill-line"}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
