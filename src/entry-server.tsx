import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";

/**
 * Build-time entry used by `scripts/prerender.mjs` to inject a static HTML
 * snapshot of the portfolio into `dist/index.html` so crawlers and no-JS
 * clients get the full page content instead of an empty app shell.
 *
 * `renderToStaticMarkup` is used instead of `renderToString` because the
 * client boots with `createRoot` (not `hydrateRoot`), so we want clean markup
 * without hydration markers or Suspense abort templates.
 */
export function render(): string {
  return renderToStaticMarkup(<App />);
}
