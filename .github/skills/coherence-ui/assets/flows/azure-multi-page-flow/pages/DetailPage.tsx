// @ts-nocheck
/**
 * Detail Page — resource overview after creation.
 * Shows a resource blade with side nav, toolbar, and content.
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
  CuiNavHeading,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSideNav,
  CuiToolbar,
} from '@charm-ux/cui/react';
import PageHeader from '../../../patterns/PageHeader';
import AzurePortalNav from '../../../patterns/PatternAzurePortalNav';
import {
  experimentId,
  resourceName,
  detailTitle,
  resourceType,
  detailNavSections,
} from '../data';
import { styles } from '../styles';

export default function DetailPage() {
  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox slot="search" hideLabel placeholder="Search resources, services, and docs (G+/)" />
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Copilot">
            <CuiIcon name="bot" />
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
          </CuiPopOver>
        </CuiHeader>

        {/* ─── Global Navigation ─── */}
        <AzurePortalNav />

        <div slot="main" style={{ display: 'flex', height: '100%' }}>
          <nav style={{ width: 220, minWidth: 220, borderRight: '1px solid var(--neutral-stroke2)', background: 'var(--neutral-background1)', overflowY: 'auto', flexShrink: 0 }}>
            <CuiSideNav size="small">
              {detailNavSections.map((section, si) => (
                <div key={si}>
                  {section.dividerBefore && <CuiDivider />}
                  {section.heading && <CuiNavHeading>{section.heading}</CuiNavHeading>}
                  {section.items.map((item) => (
                    <CuiNavItem key={item.label} label={item.label} href="#" selected={item.selected || undefined}>
                      <CuiIcon slot="icon" url={item.icon} selectedUrl={item.iconFilled} />
                    </CuiNavItem>
                  ))}
                </div>
              ))}
            </CuiSideNav>
          </nav>

          <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem href={`#${experimentId}`}>{resourceType}s</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">{resourceName}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          <PageHeader
            title={`${resourceName} | ${detailTitle}`}
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

          {/* TODO: Replace with your resource overview content */}
          <div style={{ padding: '24px 32px' }}>
            <h2 className="section-heading">Overview</h2>
            <p style={{ color: 'var(--neutral-foreground2)' }}>
              Resource {resourceName} created successfully. Customize this page with your resource details.
            </p>
          </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
