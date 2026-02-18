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
 *
 * This matches the real Azure portal pattern where the page title
 * ("Monitor | Overview") always spans full width above the service sidebar,
 * regardless of whether the sidebar is expanded or collapsed.
 */
import { useState } from 'react';
import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiDivider,
  CuiHeader,
  CuiIcon,
  CuiMessageBar,
  CuiNavHeading,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { ServiceCard } from './PatternServiceCard';
import CopilotButton from '../experiments/copilot-button';

/* ─── Service nav items (customize per service) ─── */
const navSections = [
  {
    heading: null,
    items: [
      { label: 'Overview', icon: 'home', selected: true },
      { label: 'Activity log', icon: 'document' },
      { label: 'Alerts', icon: 'alert' },
      { label: 'Issues (preview)', icon: 'warning' },
      { label: 'Metrics', icon: 'data-trending' },
      { label: 'Logs', icon: 'notebook' },
      { label: 'Change Analysis', icon: 'arrow-sync' },
      { label: 'Service health', icon: 'heart-pulse' },
      { label: 'Workbooks', icon: 'book-open' },
    ],
  },
  {
    heading: 'Insights',
    items: [
      { label: 'Insights', icon: 'lightbulb' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Settings', icon: 'settings' },
      { label: 'Support + Troubleshooting', icon: 'chat-help' },
    ],
  },
];

export default function ScaffoldServiceBlade() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState('Overview');

  /* ─── Customize these ─── */
  const serviceName = 'Monitor';
  const pageTitle = 'Overview';

  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background-1);
    }

    /* ─── Full-width title bar (above the sidebar + content row) ─── */
    .blade-breadcrumb {
      padding: 4px 16px 0;
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
    }
    .blade-title-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 16px 8px;
    }
    .blade-title {
      margin: 0;
      font-size: 20px;
      font-weight: var(--font-weight-regular);
      color: var(--neutral-foreground-1);
    }
    .blade-subtitle {
      font-size: var(--font-size-base-100);
      color: var(--neutral-foreground-3);
      margin: 0 0 0 16px;
      padding-bottom: 4px;
    }

    /* Copilot suggestion pills row */
    .blade-copilot-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px 8px;
      flex-wrap: wrap;
    }
    .blade-copilot-pill {
      font-size: var(--font-size-base-200);
      border-radius: 16px;
      padding: 4px 12px;
      border: 1px solid var(--neutral-stroke-2);
      background: var(--neutral-background-1);
      color: var(--neutral-foreground-1);
      cursor: pointer;
      white-space: nowrap;
    }
    .blade-copilot-pill:hover {
      background: var(--neutral-background-3);
    }

    /* ─── Body: sidebar + content side by side ─── */
    .blade-body {
      display: flex;
      flex: 1;
      overflow: hidden;
      border-top: 1px solid var(--neutral-stroke-2);
    }

    /* Collapsible service sidebar */
    .blade-sidebar {
      width: 220px;
      min-width: 220px;
      border-right: 1px solid var(--neutral-stroke-2);
      background: var(--neutral-background-1);
      overflow-y: auto;
      transition: width 0.2s, min-width 0.2s;
    }
    .blade-sidebar.collapsed {
      width: 0;
      min-width: 0;
      overflow: hidden;
      border-right: none;
    }
    .blade-sidebar-toggle {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }

    /* Content area */
    .blade-content {
      flex: 1;
      overflow-y: auto;
      background: var(--neutral-background-2);
      position: relative;
    }
    .blade-content-inner {
      padding: 24px 32px;
    }



    /* Info message bar — blue Azure style for intent="info" */
    cui-message-bar[intent='info'] {
      --message-bar-bg-color: var(--brand-background2);
      --message-bar-icon-fg-color: var(--brand-foreground-link);
      --message-bar-border: 1px solid var(--brand-stroke1);
    }

    /* Card grid for overview content */
    .blade-card-section {
      margin-bottom: 24px;
    }
    .blade-card-section h2 {
      font-size: var(--font-size-base-400);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
      margin: 0 0 4px;
    }
    .blade-card-section p {
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
      margin: 0 0 12px;
    }
    .blade-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px;
    }


    /* Tabs */
    .blade-tabs {
      display: flex;
      gap: 0;
      border-bottom: 1px solid var(--neutral-stroke-2);
      padding: 0 16px;
    }
    .blade-tab {
      padding: 8px 16px;
      font-size: var(--font-size-base-300);
      font-weight: var(--font-weight-regular);
      color: var(--neutral-foreground-2);
      border: none;
      background: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
    }
    .blade-tab.active {
      color: var(--brand-foreground-link);
      border-bottom-color: var(--brand-foreground-link);
      font-weight: var(--font-weight-semibold);
    }
  `;

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header (standard Azure portal header) ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox
            slot="search"
            hideLabel
            placeholder="Search resources, services, and docs (G+/)"
          />
          <CopilotButton slot="overflow-actions" />
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Cloud Shell">
            <CuiIcon url="https://api.iconify.design/fluent:terminal-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Notifications">
            <CuiIcon name="alert" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Settings">
            <CuiIcon name="settings" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Help + support">
            <CuiIcon url="https://api.iconify.design/fluent:question-circle-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Feedback">
            <CuiIcon name="person-feedback" />
          </CuiButton>
          <CuiPopOver slot="actions-end" fixedPlacement>
            <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
              <CuiAvatar size={24} name="Alex Britez" />
            </CuiButton>
            <CuiPersona>
              <CuiAvatar name="Alex Britez" />
              <div slot="primary">alexbritez@microsoft.co...</div>
              <div slot="secondary">MICROSOFT (MICROSOFT.ONM...)</div>
            </CuiPersona>
            <CuiDivider className="my-xl" />
            <div className="d-flex flex-column align-start">
              <CuiButton appearance="link">Your profile</CuiButton>
              <CuiButton appearance="link">View account</CuiButton>
              <CuiButton appearance="link">Sign Out</CuiButton>
            </div>
          </CuiPopOver>
        </CuiHeader>

        {/* ─── No navigation slot used — sidebar lives in main ─── */}

        {/* ─── Main: Full blade layout ─── */}
        <div slot="main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Breadcrumb — full width */}
          <div className="blade-breadcrumb">
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Title bar — full width */}
          <div className="blade-title-bar">
            <CuiIcon
              url="https://api.iconify.design/fluent:pulse-24-regular.svg"
              style={{ fontSize: '24px' }}
            />
            <h1 className="blade-title">
              <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{serviceName}</span> | {pageTitle}
            </h1>
            <CuiButton appearance="subtle" iconOnly size="small" aria-label="More actions">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
            {/* Copilot avatar */}
            <CopilotButton />
          </div>

          {/* Copilot suggestion pills */}
          <div className="blade-copilot-row">
            <button className="blade-copilot-pill">Summarize these Monitor services in a table</button>
            <button className="blade-copilot-pill">Run an anomaly investigation into my resource</button>
            <button className="blade-copilot-pill">Catch me up on my alerts</button>
          </div>

          {/* Info banner */}
          <CuiMessageBar intent="info" shape="square" dismissible open>
            <CuiIcon slot="icon" name="info-filled" label="info" />
            The Log Analytics agents, used by VM Insights, won't be supported as of August 31, 2024.
            Plan to migrate to VM Insights on Azure Monitor agent prior to this date.
            <CuiButton slot="action" appearance="link" href="#">→</CuiButton>
          </CuiMessageBar>

          {/* Tabs (Overview / Tutorials) */}
          <div className="blade-tabs">
            <button className="blade-tab active">Overview</button>
            <button className="blade-tab">Tutorials</button>
          </div>

          {/* ─── Blade body: sidebar + content ─── */}
          <div className="blade-body" style={{ flex: 1 }}>
            {/* Collapsible service sidebar */}
            <div className={`blade-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
              <CuiSideNav size="small">
                {navSections.map((section, si) => (
                  <span key={si}>
                    {section.heading && <CuiNavHeading>{section.heading}</CuiNavHeading>}
                    {section.items.map((item) => (
                      <CuiNavItem
                        key={item.label}
                        label={item.label}
                        href="#"
                        selected={selected === item.label ? true : undefined}
                        onClick={() => setSelected(item.label)}
                      >
                        <CuiIcon
                          slot="icon"
                          url={`https://api.iconify.design/fluent:${item.icon}-24-regular.svg`}
                          selectedUrl={`https://api.iconify.design/fluent:${item.icon}-24-filled.svg`}
                        />
                      </CuiNavItem>
                    ))}
                  </span>
                ))}
              </CuiSideNav>
            </div>

            {/* Content area */}
            <div className="blade-content">
              {/* Sidebar toggle (visible when collapsed) */}
              {!sidebarOpen && (
                <CuiButton
                  appearance="subtle"
                  size="small"
                  iconOnly
                  aria-label="Expand sidebar"
                  style={{ position: 'absolute', left: 4, top: 8, zIndex: 1 }}
                  onClick={() => setSidebarOpen(true)}
                >
                  <CuiIcon url="https://api.iconify.design/fluent:chevron-right-24-regular.svg" />
                </CuiButton>
              )}
              {sidebarOpen && (
                <CuiButton
                  appearance="subtle"
                  size="small"
                  iconOnly
                  aria-label="Collapse sidebar"
                  style={{ position: 'absolute', left: 4, top: 8, zIndex: 1 }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <CuiIcon url="https://api.iconify.design/fluent:chevron-left-24-regular.svg" />
                </CuiButton>
              )}

              <div className="blade-content-inner" style={{ paddingLeft: sidebarOpen ? 32 : 40 }}>
                {/* ─── Insights section ─── */}
                <div className="blade-card-section">
                  <h2>Insights</h2>
                  <p>Use curated monitoring views for specific Azure resources. <a href="#" style={{ color: 'var(--brand-foreground-link)' }}>View all insights</a></p>
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
                  <p>Visualize, analyze, and respond to monitoring data and events. <a href="#" style={{ color: 'var(--brand-foreground-link)' }}>Learn more about monitoring ↗</a></p>
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
              </div>
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
