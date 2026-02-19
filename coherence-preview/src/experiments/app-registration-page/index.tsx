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
import AzurePortalNav from '../../patterns/PatternAzurePortalNav';
import PageContent from './PageContent';
import { headerTitle } from './data';
import { styles } from './styles';

export default function AppRegistrationPage() {
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
          <CuiButton
            slot="overflow-actions"
            appearance="subtle"
            shape="rounded"
            size="large"
            iconOnly
          >
            <CuiIcon name="settings" />
            <span className="visually-hidden">Settings</span>
          </CuiButton>
          <CuiButton
            slot="overflow-actions"
            appearance="subtle"
            shape="rounded"
            size="large"
            iconOnly
          >
            <CuiIcon name="alert" />
            <span className="visually-hidden">Notifications</span>
          </CuiButton>
          <CuiPopOver slot="actions-end" fixedPlacement>
            <CuiButton
              slot="anchor"
              appearance="subtle"
              shape="rounded"
              size="large"
              iconOnly
            >
              <CuiAvatar size={24} name="Alex Britez" />
            </CuiButton>
            <CuiPersona>
              <CuiAvatar name="Alex Britez" />
              <div slot="primary">Alex Britez</div>
              <div slot="secondary">alex@contoso.com</div>
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

        {/* ─── Main Content ─── */}
        <PageContent />
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
