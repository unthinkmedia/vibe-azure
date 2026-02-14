import {
  CuiAppFrame,
  CuiAvatar,
  CuiBadge,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiDivider,
  CuiDrawer,
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
import CopilotButton from './CopilotButton';

// ─── Mock Data ───

const vaultEssentials = {
  name: 'kv-contoso-prod-eastus',
  resourceGroup: 'rg-contoso-prod',
  location: 'East US',
  subscription: 'Contoso Production',
  subscriptionId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  vaultUri: 'https://kv-contoso-prod-eastus.vault.azure.net/',
  skuName: 'Standard',
  directoryId: 'f8c7e9a2-1d3b-4e5f-9a6c-8b7d0e2f4a1c',
  softDelete: 'Enabled (90 days)',
  purgeProtection: 'Enabled',
  createdOn: '2025-04-12',
  tags: { Environment: 'Production', CostCenter: 'Engineering', Owner: 'team-platform' },
};

interface Secret {
  name: string;
  status: 'Enabled' | 'Disabled';
  contentType: string;
  expirationDate: string;
  createdOn: string;
}

const secrets: Secret[] = [
  {
    name: 'DatabaseConnectionString',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-09-15',
    createdOn: '2025-04-12',
  },
  {
    name: 'StorageAccountKey',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-06-01',
    createdOn: '2025-05-20',
  },
  {
    name: 'SendGridApiKey',
    status: 'Enabled',
    contentType: 'application/json',
    expirationDate: '2026-12-31',
    createdOn: '2025-06-03',
  },
  {
    name: 'RedisPassword',
    status: 'Disabled',
    contentType: 'text/plain',
    expirationDate: '2025-11-30',
    createdOn: '2025-03-18',
  },
  {
    name: 'AppInsightsInstrumentationKey',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2027-01-15',
    createdOn: '2025-07-22',
  },
  {
    name: 'CosmosDbPrimaryKey',
    status: 'Enabled',
    contentType: 'application/json',
    expirationDate: '2026-08-20',
    createdOn: '2025-08-10',
  },
];

// ─── Component ───

export default function KeyVaultPage() {
  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background-2);
    }
    .kv-page-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 32px 0;
    }
    .kv-resource-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-size: var(--font-size-base-500);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
    }
    .kv-resource-subtitle {
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
      margin: 0 0 0 32px;
      padding-bottom: 12px;
    }
    .essentials-panel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      background: var(--neutral-background-1);
      border: 1px solid var(--neutral-stroke-2);
      border-radius: var(--border-radius-md);
      padding: 20px 24px;
    }
    .essentials-column {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .essentials-column + .essentials-column {
      border-left: 1px solid var(--neutral-stroke-2);
      padding-left: 24px;
    }
    .essentials-row {
      display: flex;
      gap: 8px;
      font-size: var(--font-size-base-200);
      line-height: 1.4;
    }
    .essentials-label {
      color: var(--neutral-foreground-3);
      min-width: 130px;
      flex-shrink: 0;
    }
    .essentials-value {
      color: var(--neutral-foreground-1);
      word-break: break-all;
    }
    .essentials-value a {
      color: var(--brand-foreground-link);
      text-decoration: none;
    }
    .essentials-value a:hover {
      text-decoration: underline;
    }
    .secrets-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--font-size-base-200);
      background: var(--neutral-background-1);
      border: 1px solid var(--neutral-stroke-2);
      border-radius: var(--border-radius-md);
      overflow: hidden;
    }
    .secrets-table th {
      text-align: left;
      padding: 10px 16px;
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-2);
      background: var(--neutral-background-3);
      border-bottom: 1px solid var(--neutral-stroke-2);
    }
    .secrets-table td {
      padding: 10px 16px;
      color: var(--neutral-foreground-1);
      border-bottom: 1px solid var(--neutral-stroke-2);
    }
    .secrets-table tr:last-child td {
      border-bottom: none;
    }
    .secrets-table tr:hover td {
      background: var(--subtle-background-hover);
    }
    .secret-name-link {
      color: var(--brand-foreground-link);
      text-decoration: none;
      font-weight: var(--font-weight-semibold);
    }
    .secret-name-link:hover {
      text-decoration: underline;
    }
    .section-heading {
      font-size: var(--font-size-base-400);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
      margin: 0 0 16px;
    }
    .tags-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  `;

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox
            slot="search"
            hideLabel
            placeholder="Search resources, services, and docs (G+/)"
          />
          <CopilotButton slot="overflow-actions" />
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Cloud Shell">
            <CuiIcon url="https://api.iconify.design/fluent:terminal-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Notifications">
            <CuiIcon name="alert" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Settings">
            <CuiIcon url="https://api.iconify.design/fluent:settings-24-regular.svg" />
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

        {/* ─── Side Navigation ─── */}
        <CuiDrawer
          slot="navigation"
          id="navigation-drawer"
          inline
          position="start"
          breakpoint="686px"
          open
        >
          <CuiSideNav size="small">
            <CuiNavItem label="Overview" href="#" selected>
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:home-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:home-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Activity log" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:document-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:document-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Access control (IAM)" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:person-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:person-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Tags" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:tag-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:tag-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Diagnose and solve problems" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:stethoscope-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:stethoscope-24-filled.svg"
              />
            </CuiNavItem>

            <CuiNavHeading>Objects</CuiNavHeading>

            <CuiNavItem label="Keys" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:key-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:key-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Secrets" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:lock-closed-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:lock-closed-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Certificates" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:certificate-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:certificate-24-filled.svg"
              />
            </CuiNavItem>

            <CuiNavHeading>Settings</CuiNavHeading>

            <CuiNavItem label="Access policies" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:shield-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:shield-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Networking" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:globe-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:globe-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Properties" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:info-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:info-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Locks" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:lock-closed-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:lock-closed-24-filled.svg"
              />
            </CuiNavItem>
          </CuiSideNav>
        </CuiDrawer>

        {/* ─── Main Content ─── */}
        <div slot="main">
          {/* Breadcrumb */}
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem href="#">Key vaults</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">{vaultEssentials.name}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row */}
          <div className="kv-page-header">
            <CuiIcon
              url="https://api.iconify.design/fluent:key-multiple-24-regular.svg"
              style={{ fontSize: '24px' }}
            />
            <h1 className="kv-resource-title">
              {vaultEssentials.name} | Overview
            </h1>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="star" />
            </CuiButton>
          </div>
          <p className="kv-resource-subtitle">Key vault</p>

          {/* Toolbar */}
          <div style={{ padding: '0 32px' }}>
            <CuiToolbar size="small" label="Key vault actions">
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="add" />
                Create
              </CuiButton>
              <CuiDivider orientation="vertical" style={{ height: '20px' }} />
              <CuiButton appearance="subtle" size="small">Delete</CuiButton>
              <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
              <CuiButton appearance="subtle" size="small">Feedback</CuiButton>
            </CuiToolbar>
          </div>

          <CuiDivider style={{ margin: '0' }} />

          {/* ─── Overview Content ─── */}
          <div style={{ padding: '24px 32px' }}>
            {/* Essentials Panel */}
            <h2 className="section-heading">Essentials</h2>
            <div className="essentials-panel">
              <div className="essentials-column">
                <div className="essentials-row">
                  <span className="essentials-label">Resource group</span>
                  <span className="essentials-value">
                    <a href="#">{vaultEssentials.resourceGroup}</a>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Location</span>
                  <span className="essentials-value">{vaultEssentials.location}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Subscription</span>
                  <span className="essentials-value">
                    <a href="#">{vaultEssentials.subscription}</a>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Subscription ID</span>
                  <span className="essentials-value">{vaultEssentials.subscriptionId}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Tags</span>
                  <span className="essentials-value">
                    <div className="tags-row">
                      {Object.entries(vaultEssentials.tags).map(([k, v]) => (
                        <CuiBadge key={k} appearance="outline" size="small">
                          {k}: {v}
                        </CuiBadge>
                      ))}
                    </div>
                  </span>
                </div>
              </div>
              <div className="essentials-column">
                <div className="essentials-row">
                  <span className="essentials-label">Vault URI</span>
                  <span className="essentials-value">
                    <a href="#">{vaultEssentials.vaultUri}</a>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">SKU</span>
                  <span className="essentials-value">{vaultEssentials.skuName}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Directory ID</span>
                  <span className="essentials-value">{vaultEssentials.directoryId}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Soft delete</span>
                  <span className="essentials-value">{vaultEssentials.softDelete}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Purge protection</span>
                  <span className="essentials-value">{vaultEssentials.purgeProtection}</span>
                </div>
              </div>
            </div>

            {/* Secrets Table */}
            <h2 className="section-heading" style={{ marginTop: 32 }}>Secrets</h2>
            <table className="secrets-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Expiration date</th>
                  <th>Content type</th>
                  <th>Created on</th>
                </tr>
              </thead>
              <tbody>
                {secrets.map((secret) => (
                  <tr key={secret.name}>
                    <td>
                      <a href="#" className="secret-name-link">{secret.name}</a>
                    </td>
                    <td>
                      <CuiBadge
                        appearance="filled"
                        color={secret.status === 'Enabled' ? 'success' : 'danger'}
                        size="small"
                      >
                        {secret.status}
                      </CuiBadge>
                    </td>
                    <td>{secret.expirationDate}</td>
                    <td>{secret.contentType}</td>
                    <td>{secret.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
