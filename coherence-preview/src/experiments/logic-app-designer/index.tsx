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
import AzurePortalNav from '../../patterns/PatternAzurePortalNav';
import PageHeader from '../../patterns/PageHeader';
import { Navigation } from './Navigation';
import { PageContent } from './PageContent';
import { headerTitle, pageTitle, resourceType, breadcrumb } from './data';
import { styles } from './styles';
import { azureIcon } from '../../patterns/azure-icons';

export default function LogicAppDesigner() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">{headerTitle}</span>
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
        <div slot="main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Breadcrumb — full width */}
          <div style={{ padding: '4px 16px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              {breadcrumb.map((crumb, i) => (
                <CuiBreadcrumbItem
                  key={i}
                  href="#"
                  active={i === breadcrumb.length - 1 || undefined}
                  current={i === breadcrumb.length - 1 ? 'page' : undefined}
                >
                  {crumb}
                </CuiBreadcrumbItem>
              ))}
            </CuiBreadcrumb>
          </div>

          {/* Title — full width above sidebar */}
          <PageHeader
            icon={azureIcon('logic-app')}
            title={<><strong>{pageTitle}</strong> | Logic app designer</>}
            subtitle={resourceType}
            titleWeight="regular"
            horizontalPadding="16px"
            showFavorite
          />

          {/* ─── Body: sidebar + content ─── */}
          <div className="blade-body">
            {/* Collapsible service sidebar */}
            <div className={`blade-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
              <Navigation />
            </div>

            {/* Content area */}
            <div className="blade-content">
              {/* Sidebar toggle strip */}
              <div className="blade-toggle-strip">
                <CuiButton
                  appearance="subtle"
                  size="small"
                  iconOnly
                  aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <CuiIcon name={sidebarOpen ? 'chevron-left' : 'arrow-right'} />
                </CuiButton>
              </div>

              {/* Designer Canvas fills remaining space */}
              <PageContent />
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
