// @ts-nocheck
/**
 * Azure Cognitive Services (Speech) Overview — FigmaFoundry
 *
 * Resource overview page with essentials panel, Get Started tab
 * (Speech Studio CTA + API keys), and Usage & Insights tab
 * (KPI metrics, call volume chart, quota bars, recent errors).
 *
 * File structure:
 *   data.ts          — essentials, keys, metrics, quota, errors, nav items
 *   styles.ts        — scoped CSS
 *   Navigation.tsx   — side nav component (6 groups)
 *   PageContent.tsx  — essentials + tabs (Get Started, Usage & Insights)
 *   index.tsx        — this file, orchestrates the above
 */
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
import { resourceName, resourceType, copilotSuggestions } from './data';
import { styles } from './styles';

export default function CognitiveServicesOverview() {
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
              <div slot="primary">Alex Britez</div>
              <div slot="secondary">Available</div>
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

        {/* ─── Main Content ─── */}
        <div slot="main">
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem href="#">Cognitive Services</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">{resourceName}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          <PageHeader
            icon="https://api.iconify.design/fluent:brain-circuit-24-regular.svg"
            title={resourceName}
            subtitle={resourceType}
            showFavorite
            copilotSuggestions={copilotSuggestions}
          />

          {/* Browse Blade layout: sidebar + content */}
          <div className="blade-body">
            <div className="blade-sidebar">
              <Navigation />
            </div>
            <div className="blade-content">
              <PageContent />
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
      <style>{`
        .blade-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        .blade-sidebar {
          width: 220px;
          min-width: 220px;
          border-right: 1px solid var(--neutral-stroke2);
          background: var(--neutral-background1);
          overflow-y: auto;
        }
        .blade-content {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
}
