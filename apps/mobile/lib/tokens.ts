// Design tokens — warm beige + cream + paper-grain text-forward.
// Values come from designer's bilingual feedback (DEVELOPER-FEEDBACK):
//   ink #2A211A, cream #F5EBD7, card #ECE0C5
// Older tokens (#2A211A / #F5EBD7 / #FAF4E8) are aliased so any leftover
// references read the warmer values without a flag-day rewrite.

export const tokens = {
  // Surfaces
  cream: "#F5EBD7", // app background (warmer than the prior #F5EBD7)
  card: "#ECE0C5", // primary card surface
  parchment: "#E8DBC4", // soft section bg / button surface
  ivory: "#FAF4E8", // bright surface when we want a near-white card

  // Ink
  ink: "#2A211A", // primary text — deep warm brown, not pure black
  ink2: "#5A4A38",
  ink3: "#8A7A66",
  hairline: "#D6C7A8", // a touch warmer than the prior #D9CBB1

  // Accents (kept from designer's tokens.jsx)
  sage: "#8FA189",
  rose: "#C28C7E",
  dusk: "#8896A8",
  ember: "#B57C5F",
  gold: "#B89556",

  // Dark — used by Today's swipe-stack backdrop
  night: "#1A1310",
} as const;
