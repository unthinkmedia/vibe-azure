/**
 * Cost Anomaly Investigator — Azure Cost Management diagnostic page
 *
 * Helps platform engineers diagnose unexpected spending spikes with:
 * - Cost delta heatmap (resource groups, severity color-coded)
 * - Top movers table (15 resources by largest absolute increase)
 * - Anomaly timeline (30-day flagged events vs budget threshold)
 * - Recommendations panel (savings cards with alert rule creation)
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
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
} from '@charm-ux/cui/react';
import CopilotButton from '../copilot-button';
import PageHeader from '../../patterns/PageHeader';
import AzurePortalNav from '../../patterns/PatternAzurePortalNav';
import Navigation from './Navigation';
import PageContent from './PageContent';
import { serviceName, pageTitle } from './data';
import { styles } from './styles';

const copilotSuggestions = [
  'Why did my costs spike this week?',
  'Show me idle resources I can shut down',
  'Compare this month to last month',
];

export default function CostAnomalyInvestigator() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

        {/* ─── Global Navigation (hamburger menu) ─── */}
        <AzurePortalNav />

        {/* ─── Main ─── */}
        <div slot="main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Breadcrumb */}
          <div className="cost-breadcrumb">
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem href="#">Cost Management</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Title */}
          <PageHeader
            icon="https://api.iconify.design/fluent:money-24-regular.svg"
            title={<><strong>{serviceName}</strong> | {pageTitle}</>}
            subtitle="Contoso Engineering (contoso-eng-sub)"
            copilotSuggestions={copilotSuggestions}
            titleWeight="regular"
            horizontalPadding="16px"
          />

          {/* Body: sidebar + content */}
          <div className="cost-body">
            <div className={`cost-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
              <Navigation />
            </div>

            <div className="cost-content">
              <CuiButton
                appearance="subtle"
                size="small"
                iconOnly
                aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                className="cost-sidebar-toggle"
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
