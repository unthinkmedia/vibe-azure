import { FormEvent, useState } from 'react';
import {
  CuiAppFrame,
  CuiAvatar,
  CuiButton,
  CuiCheckbox,
  CuiDivider,
  CuiDrawer,
  CuiHeader,
  CuiIcon,
  CuiInput,
  CuiNavHeading,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiRadioGroup,
  CuiRadio,
  CuiSearchBox,
  CuiSelect,
  CuiSideNav,
  CuiTextArea,
} from '@charm-ux/cui/react';

export default function AppRegistrationPage() {
  const [selectedNav, setSelectedNav] = useState('register');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Entra ID</span>
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

        {/* ─── Side Navigation ─── */}
        <CuiDrawer slot="navigation" inline open position="start" breakpoint="686px">
          <CuiSideNav>
            <CuiNavHeading>Manage</CuiNavHeading>
            <CuiNavItem
              label="App registrations"
              href="javascript:;"
              selected={selectedNav === 'register'}
              onClick={() => setSelectedNav('register')}
            >
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:app-generic-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:app-generic-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem
              label="Enterprise applications"
              href="javascript:;"
              selected={selectedNav === 'enterprise'}
              onClick={() => setSelectedNav('enterprise')}
            >
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:building-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:building-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem
              label="Certificates & secrets"
              href="javascript:;"
              selected={selectedNav === 'certs'}
              onClick={() => setSelectedNav('certs')}
            >
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:certificate-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:certificate-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavHeading>Security</CuiNavHeading>
            <CuiNavItem
              label="Authentication"
              href="javascript:;"
              selected={selectedNav === 'auth'}
              onClick={() => setSelectedNav('auth')}
            >
              <CuiIcon slot="icon" name="lock-closed" />
            </CuiNavItem>
            <CuiNavItem
              label="API permissions"
              href="javascript:;"
              selected={selectedNav === 'api'}
              onClick={() => setSelectedNav('api')}
            >
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:key-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:key-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavHeading>Support</CuiNavHeading>
            <CuiNavItem
              label="Overview"
              href="javascript:;"
              selected={selectedNav === 'overview'}
              onClick={() => setSelectedNav('overview')}
            >
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:info-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:info-24-filled.svg"
              />
            </CuiNavItem>
          </CuiSideNav>
        </CuiDrawer>

        {/* ─── Main Content ─── */}
        <div slot="main" style={{ padding: '40px 72px', maxWidth: 800 }}>
          <h1 className="font-base600 font-semi-bold" style={{ margin: '0 0 4px' }}>
            Register an application
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-base-300)',
              lineHeight: 'var(--line-height-base-300)',
              color: 'var(--neutral-foreground-2)',
              margin: '0 0 24px',
            }}
          >
            Register an application to integrate with Microsoft identity platform.
          </p>

          <CuiDivider style={{ margin: '0 0 24px' }} />

          <form onSubmit={handleSubmit}>
            {/* Application Identity */}
            <h2 className="font-base500 font-semi-bold" style={{ margin: '0 0 16px' }}>
              Application Identity
            </h2>

            <div style={{ marginBottom: 16 }}>
              <CuiInput
                label="Display name"
                name="displayName"
                required
                placeholder="Enter a user-facing display name for the application"
                helpText="Users will see this when they sign in. You can change this later."
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <CuiInput
                label="Application (client) ID"
                name="clientId"
                placeholder="Auto-generated after registration"
                disabled
                helpText="A unique identifier assigned by Microsoft Entra ID."
              />
            </div>

            <CuiDivider style={{ margin: '8px 0 24px' }} />

            {/* Supported Account Types */}
            <h2 className="font-base500 font-semi-bold" style={{ margin: '0 0 16px' }}>
              Supported account types
            </h2>
            <p
              style={{
                fontSize: 'var(--font-size-base-200)',
                color: 'var(--neutral-foreground-3)',
                margin: '0 0 12px',
              }}
            >
              Who can use this application or access this API?
            </p>

            <div style={{ marginBottom: 16 }}>
              <CuiRadioGroup name="accountType">
                <CuiRadio value="single-tenant">
                  Accounts in this organizational directory only (Contoso - Single tenant)
                </CuiRadio>
                <CuiRadio value="multi-tenant">
                  Accounts in any organizational directory (Any Microsoft Entra directory - Multitenant)
                </CuiRadio>
                <CuiRadio value="multi-tenant-personal">
                  Accounts in any organizational directory and personal Microsoft accounts
                </CuiRadio>
                <CuiRadio value="personal-only">
                  Personal Microsoft accounts only
                </CuiRadio>
              </CuiRadioGroup>
            </div>

            <CuiDivider style={{ margin: '8px 0 24px' }} />

            {/* Redirect URI */}
            <h2 className="font-base500 font-semi-bold" style={{ margin: '0 0 16px' }}>
              Redirect URI (optional)
            </h2>
            <p
              style={{
                fontSize: 'var(--font-size-base-200)',
                color: 'var(--neutral-foreground-3)',
                margin: '0 0 12px',
              }}
            >
              The URI to which the authentication response is sent after the user signs in or signs out.
            </p>

            <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-end' }}>
              <CuiSelect label="Platform" name="platform" style={{ width: 200 }}>
                <option value="">Select a platform</option>
                <option value="web">Web</option>
                <option value="spa">Single-page application</option>
                <option value="ios">iOS / macOS</option>
                <option value="android">Android</option>
                <option value="mobile">Mobile and desktop applications</option>
              </CuiSelect>
              <CuiInput
                label="URI"
                name="redirectUri"
                placeholder="https://localhost:3000/auth/callback"
                style={{ flex: 1 }}
              />
            </div>

            <CuiDivider style={{ margin: '8px 0 24px' }} />

            {/* Additional Settings */}
            <h2 className="font-base500 font-semi-bold" style={{ margin: '0 0 16px' }}>
              Additional settings
            </h2>

            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <CuiInput
                label="Application ID URI"
                name="appIdUri"
                placeholder="api://{client-id}"
                helpText="Identifies the application as a resource"
                style={{ flex: 1 }}
              />
              <CuiInput
                label="Publisher domain"
                name="publisherDomain"
                placeholder="contoso.onmicrosoft.com"
                disabled
                style={{ flex: 1 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <CuiTextArea
                label="Notes"
                name="notes"
                placeholder="Add any notes about this application registration"
                rows={3}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <CuiCheckbox>
                Grant admin consent to openid and offline_access permissions
              </CuiCheckbox>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <CuiButton appearance="primary" type="submit">
                Register
              </CuiButton>
              <CuiButton appearance="outline" type="reset">
                Cancel
              </CuiButton>
            </div>
          </form>
        </div>
      </CuiAppFrame>
      <style>{`
        body { margin: 0; }
        [slot='main'] { min-width: 320px; }
        @media (max-width: 768px) {
          [slot='main'] { padding: 24px 16px !important; }
        }
      `}</style>
    </>
  );
}
