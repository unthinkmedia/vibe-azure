/**
 * Scaffold: Azure Service Blade
 *
 * Alternate AppFrame layout that matches how Azure portal renders service-level
 * pages like "Monitor | Overview". The key difference from the standard Resource
 * Page scaffold:
 *
 *   Standard:   AppFrame navigation slot holds the side nav,
 *               title lives inside slot="main" (to the right of nav).
 *
 *   This blade:  AppFrame navigation slot is unused. Inside slot="main",
 *                a full-width title bar spans the top, with a custom flex
 *                layout below it — collapsible sidebar (left) + content (right).
 *                The info banner and tabs live inside the content area (to the
 *                right of the sidebar), not full-width above the body.
 *
 * This matches the real Azure portal pattern where the page title
 * ("Monitor | Overview") always spans full width above the service sidebar,
 * regardless of whether the sidebar is expanded or collapsed.
 */
import { useState } from 'react';
import {
  CuiAppFrame,
  CuiButton,
  CuiIcon,
  CuiMessageBar,
} from '@charm-ux/cui/react';
import { ServiceCard } from './PatternServiceCard';
import { azureIcon } from './azure-icons';
import PageHeader from './PageHeader';
import AzurePortalNav from './PatternAzurePortalNav';
import AzurePortalHeader from './AzurePortalHeader';
import AzureBreadcrumb from './AzureBreadcrumb';
import BladeSidebar, { bladeSidebarStyles } from './BladeSidebar';
import { infoMessageBarStyles, bladeTabStyles } from './scaffold-styles';

import type { BladeNavSection } from './BladeSidebar';

/* ─── Service nav items (customize per service) ─── */

const navSections: BladeNavSection[] = [
  {
    heading: null,
    items: [
      { label: 'Overview', name: 'navigation' },
      { label: 'Activity log', azureIconKey: 'activity-log' },
      { label: 'Alerts', name: 'alert' },
      { label: 'Issues (preview)', name: 'warning' },
      { label: 'Metrics', azureIconKey: 'monitor' },
      { label: 'Logs', azureIconKey: 'audit-logs' },
      { label: 'Change Analysis', name: 'arrow-sync' },
      { label: 'Service health', azureIconKey: 'diagnostics' },
      { label: 'Workbooks', azureIconKey: 'workbooks' },
    ],
  },
  {
    heading: 'Insights',
    items: [
      { label: 'Insights', azureIconKey: 'application-insights' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Settings', name: 'settings' },
      { label: 'Support + Troubleshooting', name: 'chat' },
    ],
  },
];

export default function ScaffoldServiceBlade() {
  const [selected, setSelected] = useState('Overview');
  const [bannerVisible, setBannerVisible] = useState(true);

  /* ─── Customize these ─── */
  const serviceName = 'Monitor';
  const pageTitle = 'Overview';

  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background1);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    /* Card grid for overview content */
    .blade-card-section {
      margin-bottom: 28px;
    }
    .blade-card-section h2 {
      font-size: var(--font-size-base500);
      font-weight: var(--font-weight-semi-bold);
      color: var(--neutral-foreground1);
      margin: 0 0 4px;
    }
    .blade-card-section p {
      font-size: var(--font-size-base200);
      color: var(--neutral-foreground3);
      margin: 0 0 14px;
    }
    .blade-card-section p a {
      color: var(--brand-foreground-link);
      text-decoration: none;
    }
    .blade-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px;
    }

    .blade-content-inner {
      flex: 1;
      overflow-y: auto;
      padding: 24px 24px;
    }

    ${bladeSidebarStyles}
    ${infoMessageBarStyles}
    ${bladeTabStyles}
  `;

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        <AzurePortalHeader />
        <AzurePortalNav />

        {/* ─── Main ─── */}
        <div slot="main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <AzureBreadcrumb items={['Home']} />

          {/* Title — shared PageHeader, full width above sidebar */}
          <PageHeader
            icon={azureIcon('monitor')}
            title={<><strong>{serviceName}</strong> | {pageTitle}</>}
            subtitle="Microsoft"
            titleWeight="regular"
            horizontalPadding="16px"
            copilotSuggestions={[
              'Summarize these Monitor services in a table',
              'Run an anomaly investigation into my resource',
              'Catch me up on my alerts',
            ]}
          />

          {/* ─── Body: sidebar + content ─── */}
          <BladeSidebar
            navSections={navSections}
            selectedNav={selected}
            onNavChange={setSelected}
          >
                {/* Info banner — inside content area */}
                <CuiMessageBar
                  intent="info"
                  shape="square"
                  dismissible
                  open={bannerVisible}
                  onMessageBarHide={() => setBannerVisible(false)}
                >
                  <CuiIcon slot="icon" name="info-filled" label="info" />
                  The Log Analytics agents, used by VM Insights, won't be supported as of August 31, 2024.
                  Plan to migrate to VM Insights on Azure Monitor agent prior to this date.
                  <CuiButton slot="action" appearance="link" href="#">→</CuiButton>
                </CuiMessageBar>

                {/* Tabs — inside content area */}
                <div className="blade-tabs">
                  <button className="blade-tab active">Overview</button>
                  <button className="blade-tab">Tutorials</button>
                </div>

                {/* ─── Insights section ─── */}
                <div className="blade-card-section">
                  <h2>Insights</h2>
                  <p>Use curated monitoring views for specific Azure resources. <a href="#">View all insights</a></p>
                  <div className="blade-card-grid">
                    {[
                      { title: 'Application Insights', description: "Monitor your app's availability, performance, errors, and usage.", icon: 'app-generic' },
                      { title: 'Container Insights', description: 'Gain visibility into the performance and health of your controllers, nodes, and containers.', icon: 'box' },
                      { title: 'VM Insights', description: 'Monitor the health, performance, and dependencies of your VMs and VM scale sets.', icon: 'desktop' },
                      { title: 'Network Insights', description: 'View the health and metrics for all deployed network resources.', icon: 'globe' },
                    ].map(card => (
                      <ServiceCard key={card.title} {...card} />
                    ))}
                  </div>
                </div>

                {/* ─── Detection section ─── */}
                <div className="blade-card-section">
                  <h2>Detection, triage, and diagnosis</h2>
                  <p>Visualize, analyze, and respond to monitoring data and events. <a href="#">Learn more about monitoring ↗</a></p>
                  <div className="blade-card-grid">
                    {[
                      { title: 'Metrics', description: 'Create charts to monitor and investigate the usage and performance of your Azure resources.', icon: 'data-trending' },
                      { title: 'Alerts', description: 'Get notified and respond using alerts and actions.', icon: 'alert' },
                      { title: 'Logs', description: 'Analyze and diagnose issues with log queries.', icon: 'notebook' },
                      { title: 'Workbooks', description: 'View, create and share interactive reports.', icon: 'book-open' },
                    ].map(card => (
                      <ServiceCard key={card.title} {...card} />
                    ))}
                  </div>
                </div>
          </BladeSidebar>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
