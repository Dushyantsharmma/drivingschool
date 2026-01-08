import React from "react";

const styles = {
  hero: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    borderRadius: "24px",
  },
  svg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    transform: "scale(1.1)", // prevents blur edges
  },
};

export default function DrivingHero() {
  return (
    <section style={styles.hero}>
      <svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        style={styles.svg}
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b6e3d4" />
            <stop offset="100%" stopColor="#7cc6b8" />
          </linearGradient>

          {/* Blur */}
          <filter id="blur">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* BLURRED BACKGROUND GROUP */}
        <g filter="url(#blur)">
          {/* Sky */}
          <rect width="1440" height="700" fill="url(#sky)" />

          {/* Mountains */}
          <path
            d="M0 420 L300 220 L600 420 L900 200 L1200 420 L1440 300 V700 H0 Z"
            fill="#4f8f5d"
          />
          <path
            d="M0 480 L350 300 L700 480 L1050 260 L1440 420 V700 H0 Z"
            fill="#3b6f4a"
          />

          {/* Forest */}
          <rect y="520" width="1440" height="180" fill="#1f4d3a" />

          {/* Road */}
          <path
            d="M700 700 C680 580 720 450 760 350 C800 250 900 180 980 120"
            stroke="#d6a04f"
            strokeWidth="120"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Dark Overlay */}
        <rect
          width="1440"
          height="700"
          fill="rgba(0,0,0,0.35)"
        />
      </svg>
    </section>
  );
}
