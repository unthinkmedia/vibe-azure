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
import CopilotButton from '../../copilot-button';
import PageHeader from '../../../patterns/PageHeader';
import { browseTitle, browseSubtitle, copilotSuggestions, filterPills, commandBarActions } from '../data';
import { styles } from '../styles';

export default function BrowsePage() {
  const navigateToCreate = () => {
    window.location.hash = 'apim-flow/create';
  };

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox slot="search" hideLabel placeholder="Search resources, services, and docs (G+/)" />
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

        <CuiDrawer slot="navigation" id="navigation-drawer" inline position="start" breakpoint="686px" open>
          <CuiSideNav size="small">
            <CuiNavItem label="Home" href="#apim-flow">
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

          {/* Command bar */}
          <div className="command-bar">
            {commandBarActions.map((action, i) => (
              <CuiButton
                key={i}
                appearance={action.primary ? 'subtle' : 'transparent'}
                size="small"
                disabled={action.disabled}
                onClick={action.primary ? navigateToCreate : undefined}
              >
                <CuiIcon
                  slot="start"
                  {...(action.icon.startsWith('http') ? { url: action.icon } : { name: action.icon })}
                  style={{ fontSize: 16 }}
                />
                {action.label}
                {action.hasChevron && (
                  <CuiIcon slot="end" name="chevron-down" style={{ fontSize: 12 }} />
                )}
              </CuiButton>
            ))}
            <div className="group-by">
              <CuiIcon url="https://api.iconify.design/fluent:group-list-24-regular.svg" style={{ fontSize: 16 }} />
              Group by none
              <CuiIcon name="chevron-down" style={{ fontSize: 12 }} />
            </div>
          </div>

          {/* Filter bar */}
          <div className="filter-bar">
            <div className="filter-input">
              <CuiIcon url="https://api.iconify.design/fluent:filter-24-regular.svg" style={{ fontSize: 14 }} />
              Filter for any field...
            </div>
            {filterPills.map((pill, i) => (
              <span className="filter-pill" key={i}>
                {pill.label} <strong>{pill.value}</strong>
                {pill.removable && (
                  <button className="filter-pill-remove" aria-label={`Remove ${pill.label} filter`}>×</button>
                )}
              </span>
            ))}
            <button className="add-filter">
              <CuiIcon name="add" style={{ fontSize: 14 }} />
              Add filter
            </button>
          </div>

          {/* Empty state */}
          <div className="empty-state">
            <svg className="empty-state-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="50" r="35" fill="var(--neutral-background3)" />
              <path d="M40 55 Q60 30 80 55" stroke="var(--neutral-stroke1)" strokeWidth="2" fill="none" />
              <path d="M35 60 Q60 40 85 60" stroke="var(--neutral-stroke1)" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="60" cy="45" r="8" fill="var(--neutral-background4)" />
              <rect x="50" y="70" width="20" height="4" rx="2" fill="var(--neutral-stroke2)" />
              <rect x="45" y="78" width="30" height="3" rx="1.5" fill="var(--neutral-stroke2)" opacity="0.5" />
            </svg>
            <h2>No API Management services to display</h2>
            <p>
              Hybrid and multi-cloud management, observability, and discovery platform for APIs across all environments.
            </p>
            <CuiButton appearance="primary" onClick={navigateToCreate}>
              <CuiIcon slot="start" name="add" />
              Create
            </CuiButton>
            <a href="#" style={{ marginTop: 8, fontSize: 13, color: 'var(--brand-foreground-link)', textDecoration: 'none' }}>
              Learn more
            </a>
          </div>

          {/* Footer */}
          <div className="browse-footer">
            <span>Showing 1 - 0 of 0. Display count: auto</span>
            <a href="#" style={{ fontSize: 13, color: 'var(--neutral-foreground3)', textDecoration: 'none' }}>
              Give feedback
            </a>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
