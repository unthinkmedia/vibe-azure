// @ts-nocheck
/**
 * Azure Multi-Page Flow — router entry point
 *
 * Routes between multiple pages within a single experiment using hash sub-routes.
 * Hash format: #<experiment-id>/<page>  (e.g., #my-flow/create, #my-flow/detail)
 * The default (no sub-route) shows the first/browse page.
 *
 * File structure:
 *   index.tsx          — this file, routes between pages
 *   data.ts            — shared types, mock data for all pages
 *   styles.ts          — combined CSS for all pages
 *   pages/
 *     BrowsePage.tsx   — listing/browse page (default)
 *     CreatePage.tsx   — creation wizard
 *     DetailPage.tsx   — resource detail/overview (after creation)
 *     (add more pages as needed)
 *
 * Navigation between pages: window.location.hash = '<experiment-id>/<page>';
 * The main.tsx router parses sub-routes and passes them as the `subRoute` prop.
 */
import BrowsePage from './pages/BrowsePage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';

// TODO: Add/remove pages and sub-routes to match your flow
export default function MultiPageFlow({ subRoute }: { subRoute?: string }) {
  switch (subRoute) {
    case 'create':
      return <CreatePage />;
    case 'detail':
      return <DetailPage />;
    default:
      return <BrowsePage />;
  }
}
