import type { LocaleMeta } from "@/i18n/config";

/**
 * Drapeaux dessinés en SVG inline : nets à toute taille, identiques sur tous
 * les OS (contrairement aux emojis, absents sous Windows) et sans requête réseau.
 * Ratio 3:2, viewBox 24×16.
 */

type FlagCode = LocaleMeta["flag"];

function Fr() {
  return (
    <>
      <rect width="8" height="16" fill="#0d2c8c" />
      <rect x="8" width="8" height="16" fill="#f4f4f4" />
      <rect x="16" width="8" height="16" fill="#c8102e" />
    </>
  );
}

function Gb() {
  return (
    <>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#f4f4f4" strokeWidth="3.2" />
      <path
        d="M0 0 24 16M24 0 0 16"
        stroke="#c8102e"
        strokeWidth="1.9"
        clipPath="url(#gb-diag)"
      />
      <clipPath id="gb-diag">
        <path d="M12 8 24 8 24 16zM12 8 12 16 0 16zM12 8 0 8 0 0zM12 8 12 0 24 0z" />
      </clipPath>
      <path d="M12 0v16M0 8h24" stroke="#f4f4f4" strokeWidth="5.4" />
      <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="3.2" />
    </>
  );
}

function Pt() {
  return (
    <>
      <rect width="24" height="16" fill="#da291c" />
      <rect width="9.6" height="16" fill="#046a38" />
      <circle cx="9.6" cy="8" r="3.5" fill="#ffe900" stroke="#046a38" strokeWidth="0.5" />
      <circle cx="9.6" cy="8" r="2.2" fill="#da291c" />
      <circle cx="9.6" cy="8" r="1" fill="#f4f4f4" />
    </>
  );
}

function Sa() {
  return (
    <>
      <rect width="24" height="16" fill="#006c35" />
      {/* Shahada stylisée + sabre, sans reproduire la calligraphie exacte */}
      <g fill="#f4f4f4">
        <rect x="4.5" y="5" width="15" height="0.9" rx="0.45" />
        <rect x="6.5" y="6.6" width="11" height="0.7" rx="0.35" />
        <rect x="4.5" y="10.2" width="13.5" height="0.85" rx="0.42" />
        <path d="M18 10.6 20 10 19.4 11.2z" />
      </g>
    </>
  );
}

function Cn() {
  const small: Array<[number, number, number]> = [
    [8.6, 2.1, 0.72],
    [10.3, 3.9, 0.72],
    [10.3, 6.3, 0.72],
    [8.6, 8.1, 0.72],
  ];
  return (
    <>
      <rect width="24" height="16" fill="#ee1c25" />
      <g fill="#ffde00">
        <Star cx={4.6} cy={5} r={2.6} />
        {small.map(([cx, cy, r], i) => (
          <Star key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </>
  );
}

function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.382;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return <polygon points={points.join(" ")} />;
}

const FLAGS: Record<FlagCode, () => React.JSX.Element> = {
  fr: Fr,
  gb: Gb,
  pt: Pt,
  sa: Sa,
  cn: Cn,
};

export function Flag({ code, className = "" }: { code: FlagCode; className?: string }) {
  const Shape = FLAGS[code];
  return (
    <svg
      viewBox="0 0 24 16"
      className={`shrink-0 rounded-[1.5px] ring-1 ring-inset ring-white/15 ${className}`}
      aria-hidden
      focusable="false"
    >
      <Shape />
    </svg>
  );
}
