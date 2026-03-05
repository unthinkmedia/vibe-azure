/**
 * Pattern: Azure Portal Header (Reusable)
 *
 * Standard Azure portal header bar — identical in all scaffolds.
 * Renders inside CuiAppFrame's slot="header".
 *
 * Usage:
 *   <CuiAppFrame>
 *     <AzurePortalHeader />
 *     ...
 *   </CuiAppFrame>
 */
import {
  CuiAvatar,
  CuiButton,
  CuiDivider,
  CuiHeader,
  CuiIcon,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
} from '@charm-ux/cui/react';
import CopilotButton from './CopilotButton';

export default function AzurePortalHeader() {
  return (
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
  );
}
