// @ts-nocheck
/**
 * Create Page — multi-step wizard form.
 * Submitting navigates to the detail/overview sub-route.
 */
import { useState, FormEvent } from 'react';
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
  CuiTab,
  CuiTabPanel,
  CuiTabs,
} from '@charm-ux/cui/react';
import PageHeader from '../../../patterns/PageHeader';
import { experimentId, resourceTypeLabel, tabLabels } from '../data';
import { styles } from '../styles';

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('basics');

  const navigateToBrowse = () => {
    window.location.hash = experimentId;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.hash = `${experimentId}/detail`;
  };

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

        <CuiDrawer slot="navigation" id="navigation-drawer" inline position="start" breakpoint="686px" open>
          <CuiSideNav size="small">
            <CuiNavItem label="Home" href={`#${experimentId}`}>
              <CuiIcon slot="icon" url="https://api.iconify.design/fluent:home-24-regular.svg" selectedUrl="https://api.iconify.design/fluent:home-24-filled.svg" />
            </CuiNavItem>
          </CuiSideNav>
        </CuiDrawer>

        <div slot="main" style={{ position: 'relative' }}>
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem>
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} style={{ color: 'var(--brand-foreground-link)', textDecoration: 'none' }}>
                  Home
                </a>
              </CuiBreadcrumbItem>
              <CuiBreadcrumbItem>
                <a href={`#${experimentId}`} style={{ color: 'var(--brand-foreground-link)', textDecoration: 'none' }}>
                  {resourceTypeLabel}s
                </a>
              </CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">Create {resourceTypeLabel}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          <PageHeader title={`Create ${resourceTypeLabel}`} subtitle={resourceTypeLabel} />

          <div className="close-button">
            <CuiButton appearance="subtle" iconOnly size="small" aria-label="Close" onClick={navigateToBrowse}>
              <CuiIcon name="dismiss" />
            </CuiButton>
          </div>

          <CuiDivider style={{ margin: '12px 0 0' }} />

          {/* TODO: Customize the form tabs and fields for your resource */}
          <form onSubmit={handleSubmit}>
            <div style={{ padding: '0 32px' }}>
              <CuiTabs activeId={activeTab} onTabsChange={(e: any) => setActiveTab(e.detail?.id || 'basics')}>
                {Object.entries(tabLabels).map(([id, label]) => (
                  <CuiTab key={id} id={id}>{label}</CuiTab>
                ))}
                <CuiTabPanel id="basics">
                  <div className="form-section">
                    <h3>Project details</h3>
                    <div className="field-single">
                      <CuiInput label="Resource name" name="resourceName" required />
                    </div>
                  </div>
                </CuiTabPanel>
                {/* TODO: Add content for other tab panels */}
              </CuiTabs>
            </div>
            <div className="form-actions">
              <CuiButton appearance="primary" type="submit">Review + create</CuiButton>
              <CuiButton appearance="outline" type="button" onClick={navigateToBrowse}>Cancel</CuiButton>
            </div>
          </form>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
