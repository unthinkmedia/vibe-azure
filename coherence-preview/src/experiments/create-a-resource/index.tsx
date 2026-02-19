import {
  CuiAppFrame,
  CuiAvatar,
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
import PageContent from './PageContent';
import { headerTitle, pageTitle, breadcrumb, copilotSuggestions } from './data';
import { styles } from './styles';

export default function CreateAResourcePage() {
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
              <div slot="secondary">alexbritez@microsoft.com</div>
            </CuiPersona>
            <CuiDivider style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <CuiButton appearance="link">View account</CuiButton>
              <CuiButton appearance="link">Sign out</CuiButton>
            </div>
          </CuiPopOver>
        </CuiHeader>

        {/* ─── Global Navigation (hamburger menu) ─── */}
        <AzurePortalNav />

        {/* ─── Main Slot ─── */}
        <div slot="main" className="create-resource-page">
          {/* Breadcrumb + Title + Suggestions */}
          <div className="page-header-area">
            <div className="page-breadcrumb">{breadcrumb}</div>
            <PageHeader
              title={pageTitle}
              copilotSuggestions={copilotSuggestions}
              horizontalPadding="0"
            />
          </div>

          {/* Page Body */}
          <PageContent />

          {/* Feedback */}
          <a className="feedback-link" href="javascript:;" aria-label="Give feedback">
            <CuiIcon name="person-feedback" style={{ width: 14, height: 14 }} />
            Give feedback
          </a>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
