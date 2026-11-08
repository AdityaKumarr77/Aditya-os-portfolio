// Shared security configuration for the build.
//
// The CSP is injected as a <meta> tag at build time by the Vite plugin in
// `vite.config.ts`, and also written to `dist/_headers` for hosts that support
// the Netlify/Cloudflare `_headers` format.
//
// Dev deliberately has no CSP: `@vitejs/plugin-react` injects an inline HMR
// preamble that a strict `script-src 'self'` would block.

const COMMON_DIRECTIVES = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self'",
  // Google Fonts stylesheet + framer-motion inline style attributes.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: https://skillicons.dev",
  "connect-src 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
];

// `frame-ancestors` is ignored in a <meta> CSP and is only sent as a header.
// `upgrade-insecure-requests` is intentionally omitted so local HTTP previews
// keep working.
export const CSP_META = COMMON_DIRECTIVES.join("; ") + ";";
export const CSP_HEADER = [...COMMON_DIRECTIVES, "frame-ancestors 'none'"].join("; ") + ";";

export const SECURITY_HEADERS = [
  ["Content-Security-Policy", CSP_HEADER],
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()"],
  ["Strict-Transport-Security", "max-age=31536000; includeSubDomains"],
];

/** Render the Netlify/Cloudflare `_headers` file contents. */
export function renderHeadersFile() {
  return [
    "/*",
    ...SECURITY_HEADERS.map(([key, value]) => `  ${key}: ${value}`),
    "",
  ].join("\n");
}
