// @ts-nocheck
/**
 * Azure Overview Page — main entry point
 *
 * Resource overview with essentials panel (key-value pairs) and card grid sections.
 *
 * File structure:
 *   data.ts          — essentials data, card data, nav items, types
 *   styles.ts        — scoped CSS
 *   Navigation.tsx   — side nav component
 *   PageContent.tsx  — essentials panel + card grid (the unique part)
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
import PageHeader from '../../patterns/PageHeader';
import AzurePortalNav from '../../patterns/PatternAzurePortalNav';
import Navigation from './Navigation';
import PageContent from './PageContent';
import { resourceName, resourceType, copilotSuggestions } from './data';
import { styles } from './styles';

export default function AzureOverviewPage() {
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
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Copilot">
            <CuiIcon name="bot" />
          </CuiButton>
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

        {/* ─── Global Navigation (hamburger-toggled overlay) ─── */}
        <AzurePortalNav />

        {/* ─── Main Content (flex: section nav + page body) ─── */}
        <div slot="main" style={{ display: 'flex', height: '100%' }}>
          <Navigation />
          <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">{resourceName}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* TODO: Customize icon, title, and suggestions for your resource */}
          <PageHeader
            icon="https://api.iconify.design/fluent:app-generic-24-regular.svg"
            title={resourceName}
            subtitle={resourceType}
            showFavorite
            copilotSuggestions={copilotSuggestions}
          />

          <PageContent />
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
