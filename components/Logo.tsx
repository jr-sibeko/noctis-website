type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function Logo({
  className = "",
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="#C8A96A"
          strokeWidth="1"
        />
        <circle
          cx="24"
          cy="24"
          r="19"
          fill="none"
          stroke="#2A2A2E"
          strokeWidth="0.5"
        />
        <line
          x1="16"
          y1="13"
          x2="16"
          y2="35"
          stroke="#EDEAE3"
          strokeWidth="1.8"
        />
        <line
          x1="32"
          y1="13"
          x2="32"
          y2="35"
          stroke="#EDEAE3"
          strokeWidth="1.8"
        />
        <line
          x1="16"
          y1="13"
          x2="32"
          y2="35"
          stroke="#C8A96A"
          strokeWidth="1.8"
        />
      </svg>

      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.3em] text-ivory">
            NOCTIS
          </span>
          <span className="mt-1 text-[0.55rem] tracking-[0.4em] text-champagne">
            AUTO ATELIER
          </span>
        </span>
      ) : (
        <span className="sr-only">Noctis Auto Atelier</span>
      )}
    </span>
  );
}
