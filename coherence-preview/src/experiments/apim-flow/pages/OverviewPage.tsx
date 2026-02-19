import {
  CuiAppFrame,
  CuiAvatar,
  CuiBadge,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiHeader,
  CuiIcon,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiToolbar,
} from '@charm-ux/cui/react';
import CopilotButton from '../../copilot-button';
import PageHeader from '../../../patterns/PageHeader';
import AzurePortalNav from '../../../patterns/PatternAzurePortalNav';
import {
  resourceName,
  overviewTitle,
  resourceType,
  serviceEssentials,
  apis,
  apiSubscriptions,
} from '../data';
import { styles } from '../styles';

export default function OverviewPage() {
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

        {/* ─── Global Navigation (hamburger menu) ─── */}
        <AzurePortalNav />

        <div slot="main">
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem href="#apim-flow">API Management services</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">{resourceName}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          <PageHeader
            icon="https://api.iconify.design/fluent:plug-connected-24-regular.svg"
            title={`${resourceName} | ${overviewTitle}`}
            subtitle={resourceType}
            showFavorite
          />

          {/* Header links */}
          <div className="apim-header-links">
            <CuiButton appearance="link" size="small" href="#">
              <CuiIcon slot="start" url="https://api.iconify.design/fluent:open-24-regular.svg" style={{ fontSize: '14px' }} />
              Developer portal
            </CuiButton>
            <CuiButton appearance="link" size="small" href="#">Send us your feedback</CuiButton>
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

          <div style={{ padding: '24px 32px' }}>
            {/* Stat cards */}
            <div className="stat-cards">
              <CuiCard appearance="outline" className="stat-card">
                <div className="stat-value">{apis.length}</div>
                <div className="stat-label">APIs</div>
              </CuiCard>
              <CuiCard appearance="outline" className="stat-card">
                <div className="stat-value">{apiSubscriptions.length}</div>
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
                  <span className="essentials-value"><a href="#">{serviceEssentials.resourceGroup}</a></span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Status</span>
                  <span className="essentials-value">
                    <CuiBadge appearance="filled" color="success" size="small">{serviceEssentials.status}</CuiBadge>
                  </span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Location</span>
                  <span className="essentials-value">{serviceEssentials.location}</span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Subscription</span>
                  <span className="essentials-value"><a href="#">{serviceEssentials.subscription}</a></span>
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
                        <CuiBadge key={k} appearance="outline" size="small">{k}: {v}</CuiBadge>
                      ))}
                    </div>
                  </span>
                </div>
              </div>
              <div className="essentials-column">
                <div className="essentials-row">
                  <span className="essentials-label">Gateway URL</span>
                  <span className="essentials-value"><a href="#">{serviceEssentials.gatewayUrl}</a></span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Management URL</span>
                  <span className="essentials-value"><a href="#">{serviceEssentials.managementUrl}</a></span>
                </div>
                <div className="essentials-row">
                  <span className="essentials-label">Developer portal URL</span>
                  <span className="essentials-value"><a href="#">{serviceEssentials.developerPortalUrl}</a></span>
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
                    <td><a href="#" className="api-name-link">{api.displayName}</a></td>
                    <td>{api.name}</td>
                    <td>{api.path}</td>
                    <td><CuiBadge appearance="outline" size="small">{api.apiType}</CuiBadge></td>
                    <td>{api.protocols.join(', ')}</td>
                    <td>
                      {api.isCurrent ? (
                        <CuiIcon name="checkmark" style={{ color: 'var(--success-foreground-1)', fontSize: '16px' }} />
                      ) : (
                        <CuiIcon name="dismiss" style={{ color: 'var(--neutral-foreground3)', fontSize: '16px' }} />
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
                {apiSubscriptions.map((sub) => (
                  <tr key={sub.name}>
                    <td><a href="#" className="api-name-link">{sub.displayName}</a></td>
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
