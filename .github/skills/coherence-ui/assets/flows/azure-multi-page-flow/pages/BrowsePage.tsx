// @ts-nocheck
/**
 * Browse Page — the default landing page for this flow.
 * Shows a list/browse view. The "Create" button navigates to the create sub-route.
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
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSideNav,
} from '@charm-ux/cui/react';
import PageHeader from '../../../patterns/PageHeader';
import { experimentId, browseTitle, browseSubtitle, copilotSuggestions } from '../data';
import { styles } from '../styles';

export default function BrowsePage() {
  const navigateToCreate = () => {
    window.location.hash = `${experimentId}/create`;
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

        <div slot="main">
          <div style={{ padding: '8px 24px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          <PageHeader
            title={browseTitle}
            subtitle={browseSubtitle}
            showFavorite
            copilotSuggestions={copilotSuggestions}
            maxVisibleSuggestions={2}
            horizontalPadding="24px"
          />

          {/* TODO: Replace with your command bar and list content */}
          <div className="command-bar">
            <CuiButton appearance="subtle" size="small" onClick={navigateToCreate}>
              <CuiIcon slot="start" name="add" style={{ fontSize: 16 }} />
              Create
            </CuiButton>
          </div>

          <div className="empty-state">
            <h2>No resources to display</h2>
            <p>Get started by creating your first resource.</p>
            <CuiButton appearance="primary" onClick={navigateToCreate}>
              <CuiIcon slot="start" name="add" />
              Create
            </CuiButton>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
