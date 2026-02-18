import BrowsePage from './pages/BrowsePage';
import CreatePage from './pages/CreatePage';
import OverviewPage from './pages/OverviewPage';

/**
 * Multi-page experiment: API Management end-to-end flow.
 *
 * Sub-routes (set via window.location.hash):
 *   #apim-flow           → Browse page (default)
 *   #apim-flow/create    → Create wizard
 *   #apim-flow/overview  → Resource overview
 *
 * Navigation between pages: window.location.hash = 'apim-flow/create';
 */
export default function ApimFlow({ subRoute }: { subRoute?: string }) {
  switch (subRoute) {
    case 'create':
      return <CreatePage />;
    case 'overview':
      return <OverviewPage />;
    default:
      return <BrowsePage />;
  }
}
