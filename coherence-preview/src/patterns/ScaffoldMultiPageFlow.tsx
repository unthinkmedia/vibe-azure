/**
 * Multi-Page Flow Scaffold — Live Preview
 *
 * Shows how multiple pages can live in a single experiment using sub-routes.
 * The main.tsx router passes `subRoute` to switch between pages.
 *
 * Pattern: #<experiment-id>/<sub-route>
 * - Default (no sub-route) → Browse page
 * - /create → Create wizard
 * - /detail → Resource detail/overview
 */
import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiDivider,
  CuiDrawer,
  CuiHeader,
  CuiIcon,
  CuiInput,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSideNav,
  CuiToolbar,
} from '@charm-ux/cui/react';
import { useState } from 'react';
import PageHeader from './PageHeader';

// ── Inline data for scaffold preview ──
const experimentId = 'scaffold-multi-page-flow';
const resourceType = 'Sample Resource';

function ScaffoldBrowse({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <CuiAppFrame skipToMainText="Skip to main content">
      <CuiHeader slot="header" navigationIconLabel="toggle navigation">
        <CuiButton slot="title" appearance="transparent">
          <span className="font-base400">Microsoft Azure</span>
        </CuiButton>
        <CuiSearchBox slot="search" hideLabel placeholder="Search resources, services, and docs (G+/)" />
        <CuiPopOver slot="actions-end" fixedPlacement>
          <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
            <CuiAvatar size={24} name="Alex Britez" />
          </CuiButton>
          <CuiPersona>
            <CuiAvatar name="Alex Britez" />
            <div slot="primary">Alex Britez</div>
          </CuiPersona>
        </CuiPopOver>
      </CuiHeader>

      <CuiDrawer slot="navigation" id="navigation-drawer" inline position="start" breakpoint="686px" open>
        <CuiSideNav size="small">
          <CuiNavItem label="Home" href="#">
            <CuiIcon slot="icon" url="https://api.iconify.design/fluent:home-24-regular.svg" />
          </CuiNavItem>
        </CuiSideNav>
      </CuiDrawer>

      <div slot="main">
        <div style={{ padding: '8px 24px 0' }}>
          <CuiBreadcrumb label="Navigation" size="small">
            <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
          </CuiBreadcrumb>
        </div>

        <PageHeader
          title={`${resourceType}s`}
          subtitle="Microsoft (microsoft.onmicrosoft.com)"
          showFavorite
          copilotSuggestions={['How many resources do I have?']}
          horizontalPadding="24px"
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 24px', borderBottom: '1px solid var(--neutral-stroke2)' }}>
          <CuiButton appearance="subtle" size="small" onClick={() => onNavigate('create')}>
            <CuiIcon slot="start" name="add" style={{ fontSize: 16 }} />
            Create
          </CuiButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 'var(--font-size-base400)', fontWeight: 'var(--font-weight-semi-bold)' }}>
            No resources to display
          </h2>
          <p style={{ margin: '0 0 24px', fontSize: 'var(--font-size-base300)', color: 'var(--neutral-foreground3)', maxWidth: 480 }}>
            Get started by creating your first resource.
          </p>
          <CuiButton appearance="primary" onClick={() => onNavigate('create')}>
            <CuiIcon slot="start" name="add" />
            Create
          </CuiButton>
        </div>
      </div>
    </CuiAppFrame>
  );
}

function ScaffoldCreate({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <CuiAppFrame skipToMainText="Skip to main content">
      <CuiHeader slot="header" navigationIconLabel="toggle navigation">
        <CuiButton slot="title" appearance="transparent">
          <span className="font-base400">Microsoft Azure</span>
        </CuiButton>
        <CuiSearchBox slot="search" hideLabel placeholder="Search resources, services, and docs (G+/)" />
        <CuiPopOver slot="actions-end" fixedPlacement>
          <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
            <CuiAvatar size={24} name="Alex Britez" />
          </CuiButton>
          <CuiPersona>
            <CuiAvatar name="Alex Britez" />
            <div slot="primary">Alex Britez</div>
          </CuiPersona>
        </CuiPopOver>
      </CuiHeader>

      <CuiDrawer slot="navigation" id="navigation-drawer" inline position="start" breakpoint="686px" open>
        <CuiSideNav size="small">
          <CuiNavItem label="Home" href="#">
            <CuiIcon slot="icon" url="https://api.iconify.design/fluent:home-24-regular.svg" />
          </CuiNavItem>
        </CuiSideNav>
      </CuiDrawer>

      <div slot="main" style={{ position: 'relative' }}>
        <div style={{ padding: '8px 32px 0' }}>
          <CuiBreadcrumb label="Navigation" size="small">
            <CuiBreadcrumbItem>Home</CuiBreadcrumbItem>
            <CuiBreadcrumbItem>{resourceType}s</CuiBreadcrumbItem>
            <CuiBreadcrumbItem active current="page">Create {resourceType}</CuiBreadcrumbItem>
          </CuiBreadcrumb>
        </div>

        <PageHeader title={`Create ${resourceType}`} subtitle={resourceType} />

        <div style={{ position: 'absolute', top: 16, right: 24 }}>
          <CuiButton appearance="subtle" iconOnly size="small" aria-label="Close" onClick={() => onNavigate('browse')}>
            <CuiIcon name="dismiss" />
          </CuiButton>
        </div>

        <CuiDivider style={{ margin: '12px 0 0' }} />

        <div style={{ padding: '24px 32px', maxWidth: 640 }}>
          <h3 style={{ fontSize: 'var(--font-size-base400)', fontWeight: 'var(--font-weight-semi-bold)', margin: '0 0 16px' }}>
            Project details
          </h3>
          <div style={{ marginBottom: 16, maxWidth: 400 }}>
            <CuiInput label="Resource name" name="resourceName" required />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, padding: '16px 32px', borderTop: '1px solid var(--neutral-stroke2)', background: 'var(--neutral-background1)', position: 'sticky', bottom: 0 }}>
          <CuiButton appearance="primary" onClick={() => onNavigate('detail')}>Review + create</CuiButton>
          <CuiButton appearance="outline" onClick={() => onNavigate('browse')}>Cancel</CuiButton>
        </div>
      </div>
    </CuiAppFrame>
  );
}

function ScaffoldDetail({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <CuiAppFrame skipToMainText="Skip to main content">
      <CuiHeader slot="header" navigationIconLabel="toggle navigation">
        <CuiButton slot="title" appearance="transparent">
          <span className="font-base400">Microsoft Azure</span>
        </CuiButton>
        <CuiSearchBox slot="search" hideLabel placeholder="Search resources, services, and docs (G+/)" />
        <CuiPopOver slot="actions-end" fixedPlacement>
          <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
            <CuiAvatar size={24} name="Alex Britez" />
          </CuiButton>
          <CuiPersona>
            <CuiAvatar name="Alex Britez" />
            <div slot="primary">Alex Britez</div>
          </CuiPersona>
        </CuiPopOver>
      </CuiHeader>

      <CuiDrawer slot="navigation" id="navigation-drawer" inline position="start" breakpoint="686px" open>
        <CuiSideNav size="small">
          <CuiNavItem label="Overview" href="#" selected>
            <CuiIcon slot="icon" url="https://api.iconify.design/fluent:home-24-regular.svg" selectedUrl="https://api.iconify.design/fluent:home-24-filled.svg" />
          </CuiNavItem>
          <CuiNavItem label="Activity log" href="#">
            <CuiIcon slot="icon" url="https://api.iconify.design/fluent:document-24-regular.svg" />
          </CuiNavItem>
        </CuiSideNav>
      </CuiDrawer>

      <div slot="main">
        <div style={{ padding: '8px 32px 0' }}>
          <CuiBreadcrumb label="Navigation" size="small">
            <CuiBreadcrumbItem>Home</CuiBreadcrumbItem>
            <CuiBreadcrumbItem>{resourceType}s</CuiBreadcrumbItem>
            <CuiBreadcrumbItem active current="page">my-resource-01</CuiBreadcrumbItem>
          </CuiBreadcrumb>
        </div>

        <PageHeader
          title="my-resource-01 | Overview"
          subtitle={resourceType}
          showFavorite
        />

        <div style={{ padding: '0 32px' }}>
          <CuiToolbar size="small" label="Resource actions">
            <CuiButton appearance="subtle" size="small">
              <CuiIcon slot="start" name="delete" />
              Delete
            </CuiButton>
            <CuiDivider orientation="vertical" style={{ height: '20px' }} />
            <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
          </CuiToolbar>
        </div>

        <CuiDivider style={{ margin: '0' }} />

        <div style={{ padding: '24px 32px' }}>
          <h2 style={{ fontSize: 'var(--font-size-base400)', fontWeight: 'var(--font-weight-semi-bold)', margin: '0 0 16px' }}>
            Overview
          </h2>
          <p style={{ color: 'var(--neutral-foreground2)' }}>
            Resource created successfully. This is the detail page.
          </p>
          <CuiButton appearance="outline" style={{ marginTop: 16 }} onClick={() => onNavigate('browse')}>
            ← Back to list
          </CuiButton>
        </div>
      </div>
    </CuiAppFrame>
  );
}

export default function ScaffoldMultiPageFlow() {
  const [page, setPage] = useState('browse');

  const styles = `
    body { margin: 0; }
    [slot='main'] { min-width: 320px; padding: 0; background: var(--neutral-background2); }
  `;

  return (
    <>
      {page === 'create' && <ScaffoldCreate onNavigate={setPage} />}
      {page === 'detail' && <ScaffoldDetail onNavigate={setPage} />}
      {page !== 'create' && page !== 'detail' && <ScaffoldBrowse onNavigate={setPage} />}
      <style>{styles}</style>
    </>
  );
}
