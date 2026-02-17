import { FormEvent } from 'react';
import {
  CuiButton,
  CuiCheckbox,
  CuiDivider,
  CuiInput,
  CuiRadioGroup,
  CuiRadio,
  CuiSelect,
  CuiTextArea,
} from '@charm-ux/cui/react';

export default function PageContent() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
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
  );
}
