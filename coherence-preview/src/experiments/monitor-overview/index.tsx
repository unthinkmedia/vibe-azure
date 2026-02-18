/**
 * Monitor | Overview — Azure Monitor service page
 *
 * Uses the Service Blade layout pattern: the title bar, breadcrumb, info banner,
 * and tabs all span full width above the sidebar + content row. This matches
 * how Azure portal renders service-level pages like Monitor, Defender, etc.
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
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
} from '@charm-ux/cui/react';
import CopilotButton from '../copilot-button';
import CopilotSuggestions from '../../patterns/CopilotSuggestions';
import Navigation from './Navigation';
import PageContent from './PageContent';
import { serviceName, pageTitle } from './data';
import { styles } from './styles';

const monitorSuggestions = [
  'Summarize these Monitor services in a table',
  'Run an anomaly investigation into my resource',
  'Catch me up on my alerts',
];

export default function MonitorOverview() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox
            slot="search"
            hideLabel
            placeholder="Search resources, services, and docs (G+/)"
          />
          <CopilotButton slot="search" />
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

        {/* ─── No navigation slot — sidebar is inside main ─── */}

        {/* ─── Main ─── */}
        <div slot="main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Breadcrumb — full width */}
          <div className="monitor-breadcrumb">
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Title bar — full width */}
          <div className="monitor-title-bar">
            <CuiIcon
              url="https://api.iconify.design/fluent:pulse-24-regular.svg"
              style={{ fontSize: '24px' }}
            />
            <h1 className="monitor-title">
              <span className="monitor-title-bold">{serviceName}</span> | {pageTitle}
            </h1>
            <CuiButton appearance="subtle" iconOnly size="small" aria-label="More actions">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
            <CopilotSuggestions suggestions={monitorSuggestions} />
          </div>

          {/* Subtitle */}
          <p className="monitor-subtitle">Microsoft</p>

          {/* ─── Body: sidebar + content ─── */}
          <div className="monitor-body">
            {/* Collapsible service sidebar */}
            <div className={`monitor-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
              <Navigation />
            </div>

            {/* Content area */}
            <div className="monitor-content">
              {/* Sidebar toggle */}
              <CuiButton
                appearance="subtle"
                size="small"
                iconOnly
                aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                className="monitor-sidebar-toggle"
                style={{ left: 4 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <CuiIcon
                  url={sidebarOpen
                    ? 'https://api.iconify.design/fluent:chevron-left-24-regular.svg'
                    : 'https://api.iconify.design/fluent:chevron-right-24-regular.svg'
                  }
                />
              </CuiButton>

              <div style={{ paddingLeft: 32 }}>
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
                <div className="monitor-tabs">
                  <button className="monitor-tab active">Overview</button>
                  <button className="monitor-tab">Tutorials</button>
                </div>

                <PageContent />
              </div>
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
