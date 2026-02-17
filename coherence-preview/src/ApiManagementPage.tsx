import {
  CuiAppFrame,
  CuiAvatar,
  CuiBadge,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiCard,
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

const serviceEssentials = {
  name: 'apim-contoso-prod',
  resourceGroup: 'rg-contoso-prod',
  location: 'East US',
  subscription: 'Contoso Production',
  subscriptionId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  status: 'Online',
  tier: 'Standard',
  units: 1,
  virtualIpAddress: '20.85.134.72',
  publicIpAddresses: '20.85.134.72',
  gatewayUrl: 'https://apim-contoso-prod.azure-api.net',
  managementUrl: 'https://apim-contoso-prod.management.azure-api.net',
  developerPortalUrl: 'https://apim-contoso-prod.developer.azure-api.net',
  createdOn: '2025-06-15',
  tags: { Environment: 'Production', CostCenter: 'Engineering', Owner: 'team-platform' },
};

interface ApiItem {
  name: string;
  displayName: string;
  path: string;
  protocols: string[];
  isCurrent: boolean;
  apiType: string;
}

const apis: ApiItem[] = [
  { name: 'echo-api', displayName: 'Echo API', path: '/echo', protocols: ['HTTPS'], isCurrent: true, apiType: 'REST' },
  { name: 'petstore-api', displayName: 'Petstore API', path: '/petstore', protocols: ['HTTPS'], isCurrent: true, apiType: 'REST' },
  { name: 'weather-api', displayName: 'Weather Service', path: '/weather', protocols: ['HTTPS', 'HTTP'], isCurrent: true, apiType: 'REST' },
  { name: 'graphql-api', displayName: 'GraphQL Gateway', path: '/graphql', protocols: ['HTTPS'], isCurrent: true, apiType: 'GraphQL' },
  { name: 'orders-api', displayName: 'Orders API', path: '/orders/v2', protocols: ['HTTPS'], isCurrent: true, apiType: 'REST' },
  { name: 'legacy-soap', displayName: 'Legacy SOAP Service', path: '/soap', protocols: ['HTTPS'], isCurrent: false, apiType: 'SOAP' },
];

interface SubscriptionItem {
  name: string;
  displayName: string;
  scope: string;
  state: 'Active' | 'Suspended' | 'Cancelled';
  createdDate: string;
}

const subscriptions: SubscriptionItem[] = [
  { name: 'master', displayName: 'Built-in all-access subscription', scope: 'All APIs', state: 'Active', createdDate: '2025-06-15' },
  { name: 'mobile-app-sub', displayName: 'Mobile App Subscription', scope: 'Petstore API', state: 'Active', createdDate: '2025-08-20' },
  { name: 'partner-sub', displayName: 'Partner Integration', scope: 'Orders API', state: 'Active', createdDate: '2025-09-10' },
  { name: 'test-sub', displayName: 'Test Subscription', scope: 'All APIs', state: 'Suspended', createdDate: '2025-10-05' },
];

// ─── Component ───

export default function ApiManagementPage() {
  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background-2);
    }
    .apim-page-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 32px 0;
    }
    .apim-resource-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-size: var(--font-size-base-500);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
    }
    .apim-resource-subtitle {
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
      margin: 0 0 0 32px;
      padding-bottom: 8px;
    }
    .apim-header-links {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 32px 12px;
      font-size: var(--font-size-base-200);
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
      min-width: 140px;
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
    .apim-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--font-size-base-200);
      background: var(--neutral-background-1);
      border: 1px solid var(--neutral-stroke-2);
      border-radius: var(--border-radius-md);
      overflow: hidden;
    }
    .apim-table th {
      text-align: left;
      padding: 10px 16px;
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-2);
      background: var(--neutral-background-3);
      border-bottom: 1px solid var(--neutral-stroke-2);
    }
    .apim-table td {
      padding: 10px 16px;
      color: var(--neutral-foreground-1);
      border-bottom: 1px solid var(--neutral-stroke-2);
    }
    .apim-table tr:last-child td {
      border-bottom: none;
    }
    .apim-table tr:hover td {
      background: var(--subtle-background-hover);
    }
    .api-name-link {
      color: var(--brand-foreground-link);
      text-decoration: none;
      font-weight: var(--font-weight-semibold);
    }
    .api-name-link:hover {
      text-decoration: underline;
    }
    .stat-cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-card {
      --card-padding: 16px;
    }
    .stat-value {
      font-size: var(--font-size-hero-700);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
      line-height: 1;
      margin-bottom: 4px;
    }
    .stat-label {
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
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

            <CuiNavHeading>APIs</CuiNavHeading>
            <CuiNavItem label="APIs" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:plug-connected-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:plug-connected-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Products" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:box-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:box-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Subscriptions" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:key-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:key-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Named values" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:grid-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:grid-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Backends" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:cloud-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:cloud-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Schemas" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:database-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:database-24-filled.svg"
              />
            </CuiNavItem>

            <CuiNavHeading>Deployment + infrastructure</CuiNavHeading>
            <CuiNavItem label="Gateways" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:server-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:server-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Locations" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:globe-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:globe-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Custom domains" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:link-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:link-24-filled.svg"
              />
            </CuiNavItem>

            <CuiNavHeading>Settings</CuiNavHeading>
            <CuiNavItem label="Networking" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:wifi-1-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:wifi-1-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Protocols" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:shield-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:shield-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Properties" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:info-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:info-24-filled.svg"
              />
            </CuiNavItem>

            <CuiDivider />
            <CuiNavItem label="Developer portal" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:globe-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:globe-24-filled.svg"
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
              <CuiBreadcrumbItem href="#">API Management services</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">{serviceEssentials.name}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row */}
          <div className="apim-page-header">
            <CuiIcon
              url="https://api.iconify.design/fluent:plug-connected-24-regular.svg"
              style={{ fontSize: '24px' }}
            />
            <h1 className="apim-resource-title">
              {serviceEssentials.name} | Overview
            </h1>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="star" />
            </CuiButton>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
          </div>
          <p className="apim-resource-subtitle">API Management service</p>

          {/* Header links */}
          <div className="apim-header-links">
            <CuiButton appearance="link" size="small" href="#">
              <CuiIcon
                slot="start"
                url="https://api.iconify.design/fluent:open-24-regular.svg"
                style={{ fontSize: '14px' }}
              />
              Developer portal
            </CuiButton>
            <CuiButton appearance="link" size="small" href="#">
              Send us your feedback
            </CuiButton>
          </div>

          {/* Toolbar */}
          <div style={{ padding: '0 32px' }}>
            <CuiToolbar size="small" label="API Management actions">
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="delete" />
                Delete
              </CuiButton>
              <CuiDivider orientation="vertical" style={{ height: '20px' }} />
              <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
              <CuiButton appearance="subtle" size="small">Feedback</CuiButton>
            </CuiToolbar>
          </div>

          <CuiDivider style={{ margin: '0' }} />

          {/* ─── Overview Content ─── */}
          <div style={{ padding: '24px 32px' }}>
            {/* Stat cards */}
            <div className="stat-cards">
              <CuiCard appearance="outline" className="stat-card">
                <div className="stat-value">{apis.length}</div>
                <div className="stat-label">APIs</div>
              </CuiCard>
              <CuiCard appearance="outline" className="stat-card">
                <div className="stat-value">{subscriptions.length}</div>
                <div className="stat-label">Subscriptions</div>
              </CuiCard>
              <CuiCard appearance="outline" className="stat-card">
                <div className="stat-value">2</div>
                <div className="stat-label">Products</div>
              </CuiCard>
              <CuiCard appearance="outline" className="stat-card">
                <div className="stat-value">{serviceEssentials.units}</div>
                <div className="stat-label">Scale units</div>
              </CuiCard>
            </div>

            {/* Essentials Panel */}
            <h2 className="section-heading">Essentials</h2>
            <div className="essentials-panel">
              <div className="essentials-column">
                <div className="essentials-row">
                  <span className="essentials-label">Resource group</span>
                  <span className="essentials-value">
                    <a href="#">{serviceEssentials.resourceGroup}</a>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Status</span>
                  <span className="essentials-value">
                    <CuiBadge appearance="filled" color="success" size="small">
                      {serviceEssentials.status}
                    </CuiBadge>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Location</span>
                  <span className="essentials-value">{serviceEssentials.location}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Subscription</span>
                  <span className="essentials-value">
                    <a href="#">{serviceEssentials.subscription}</a>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Subscription ID</span>
                  <span className="essentials-value">{serviceEssentials.subscriptionId}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Tags</span>
                  <span className="essentials-value">
                    <div className="tags-row">
                      {Object.entries(serviceEssentials.tags).map(([k, v]) => (
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
                  <span className="essentials-label">Gateway URL</span>
                  <span className="essentials-value">
                    <a href="#">{serviceEssentials.gatewayUrl}</a>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Management URL</span>
                  <span className="essentials-value">
                    <a href="#">{serviceEssentials.managementUrl}</a>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Developer portal URL</span>
                  <span className="essentials-value">
                    <a href="#">{serviceEssentials.developerPortalUrl}</a>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Tier</span>
                  <span className="essentials-value">{serviceEssentials.tier}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Virtual IP address</span>
                  <span className="essentials-value">{serviceEssentials.virtualIpAddress}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Created on</span>
                  <span className="essentials-value">{serviceEssentials.createdOn}</span>
                </div>
              </div>
            </div>

            {/* APIs Table */}
            <h2 className="section-heading" style={{ marginTop: 32 }}>APIs</h2>
            <table className="apim-table">
              <thead>
                <tr>
                  <th>Display name</th>
                  <th>Name</th>
                  <th>URL suffix</th>
                  <th>Type</th>
                  <th>Protocols</th>
                  <th>Is current</th>
                </tr>
              </thead>
              <tbody>
                {apis.map((api) => (
                  <tr key={api.name}>
                    <td>
                      <a href="#" className="api-name-link">{api.displayName}</a>
                    </td>
                    <td>{api.name}</td>
                    <td>{api.path}</td>
                    <td>
                      <CuiBadge appearance="outline" size="small">
                        {api.apiType}
                      </CuiBadge>
                    </td>
                    <td>{api.protocols.join(', ')}</td>
                    <td>
                      {api.isCurrent ? (
                        <CuiIcon name="checkmark" style={{ color: 'var(--success-foreground-1)', fontSize: '16px' }} />
                      ) : (
                        <CuiIcon name="dismiss" style={{ color: 'var(--neutral-foreground-3)', fontSize: '16px' }} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Subscriptions Table */}
            <h2 className="section-heading" style={{ marginTop: 32 }}>Subscriptions</h2>
            <table className="apim-table">
              <thead>
                <tr>
                  <th>Display name</th>
                  <th>Scope</th>
                  <th>State</th>
                  <th>Created date</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.name}>
                    <td>
                      <a href="#" className="api-name-link">{sub.displayName}</a>
                    </td>
                    <td>{sub.scope}</td>
                    <td>
                      <CuiBadge
                        appearance="filled"
                        color={sub.state === 'Active' ? 'success' : sub.state === 'Suspended' ? 'warning' : 'danger'}
                        size="small"
                      >
                        {sub.state}
                      </CuiBadge>
                    </td>
                    <td>{sub.createdDate}</td>
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
