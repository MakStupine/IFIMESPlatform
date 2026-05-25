// SVG data URI placeholder for articles without images
// Blue gradient with IFIMES globe icon — matches brand colors
export const ARTICLE_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f"/>
      <stop offset="100%" style="stop-color:#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  <circle cx="400" cy="220" r="60" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <ellipse cx="400" cy="220" rx="60" ry="25" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  <line x1="400" y1="160" x2="400" y2="280" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>
  <ellipse cx="400" cy="220" rx="25" ry="60" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  <text x="400" y="320" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="rgba(255,255,255,0.35)" letter-spacing="4">IFIMES</text>
</svg>
`)}`;
