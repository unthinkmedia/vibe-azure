import { useState } from 'react';
import {
  CuiAppFrame,
  CuiAvatar,
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
  CuiTab,
  CuiTabPanel,
  CuiTabs,
  CuiToolbar,
} from '@charm-ux/cui/react';
import CopilotButton from './CopilotButton';

export default function AccessControlPage() {
  const [activeTab, setActiveTab] = useState('check-access');

  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background-2);
    }
    .iam-content {
      padding: 24px 32px;
    }
    .iam-page-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 32px 0;
    }
    .iam-resource-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-size: var(--font-size-base-500);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
    }
    .iam-resource-subtitle {
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
      margin: 0 0 0 32px;
      padding-bottom: 12px;
    }
    .section-card {
      flex: 1 1 300px;
      min-width: 280px;
      max-width: 420px;
    }
    .card-grid {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 20px;
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
            <CuiNavItem label="Overview" href="#">
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
            <CuiNavItem label="Access control (IAM)" href="#" selected>
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
            <CuiNavItem label="Resource visualizer" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:diagram-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:diagram-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Events" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:flash-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:flash-24-filled.svg"
              />
            </CuiNavItem>

            <CuiNavHeading>APIs</CuiNavHeading>
            <CuiNavItem label="Workspaces" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:folder-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:folder-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="APIs" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:plug-connected-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:plug-connected-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="MCP Servers" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:server-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:server-24-filled.svg"
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
            <CuiNavItem label="Policy fragments" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:puzzle-piece-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:puzzle-piece-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="API Tags" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:tag-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:tag-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Schemas" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:database-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:database-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Credential manager" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:shield-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:shield-24-filled.svg"
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
              <CuiBreadcrumbItem active current="page">alexbritezFeb6</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row */}
          <div className="iam-page-header">
            <CuiIcon
              url="https://api.iconify.design/fluent:person-24-regular.svg"
              style={{ fontSize: '24px' }}
            />
            <h1 className="iam-resource-title">
              alexbritezFeb6 | Access control (IAM)
            </h1>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="star" />
            </CuiButton>
          </div>
          <p className="iam-resource-subtitle">API Management service</p>

          {/* Toolbar */}
          <div style={{ padding: '0 32px' }}>
            <CuiToolbar size="small" label="IAM actions">
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="add" />
                Add
              </CuiButton>
              <CuiDivider orientation="vertical" style={{ height: '20px' }} />
              <CuiButton appearance="subtle" size="small">
                Download role assignments
              </CuiButton>
              <CuiButton appearance="subtle" size="small">
                Edit columns
              </CuiButton>
              <CuiButton appearance="subtle" size="small">
                Refresh
              </CuiButton>
              <CuiButton appearance="subtle" size="small">
                Delete
              </CuiButton>
              <CuiButton appearance="subtle" size="small">
                Feedback
              </CuiButton>
            </CuiToolbar>
          </div>

          <CuiDivider style={{ margin: '0' }} />

          {/* Tabs */}
          <div style={{ padding: '0 32px' }}>
            <CuiTabs
              activeId={activeTab}
              onTabsChange={(e: any) => setActiveTab(e.detail?.id || 'check-access')}
            >
              <CuiTab id="check-access">Check access</CuiTab>
              <CuiTab id="role-assignments">Role assignments</CuiTab>
              <CuiTab id="roles">Roles</CuiTab>
              <CuiTab id="deny-assignments">Deny assignments</CuiTab>
              <CuiTab id="classic-admins">Classic administrators</CuiTab>

              {/* ─── Check Access Tab Panel ─── */}
              <CuiTabPanel id="check-access">
                <div style={{ padding: '24px 0' }}>
                  {/* My access section */}
                  <h3
                    className="font-base400 font-semi-bold"
                    style={{ margin: '0 0 4px' }}
                  >
                    My access
                  </h3>
                  <p
                    className="font-base300"
                    style={{ margin: '0 0 12px', color: 'var(--neutral-foreground-2)' }}
                  >
                    View my level of access to this resource.
                  </p>
                  <CuiButton appearance="primary" size="medium">
                    View my access
                  </CuiButton>

                  <CuiDivider style={{ margin: '24px 0' }} />

                  {/* Check access section */}
                  <h3
                    className="font-base400 font-semi-bold"
                    style={{ margin: '0 0 4px' }}
                  >
                    Check access
                  </h3>
                  <p
                    className="font-base300"
                    style={{ margin: '0 0 12px', color: 'var(--neutral-foreground-2)' }}
                  >
                    Review the level of access a user, group, service principal, or managed identity
                    has to this resource.{' '}
                    <CuiButton appearance="link" href="https://learn.microsoft.com" target="_blank">
                      Learn more
                    </CuiButton>
                  </p>
                  <CuiButton appearance="primary" size="medium">
                    Check access
                  </CuiButton>

                  {/* Cards grid */}
                  <div className="card-grid">
                    {/* Grant access card */}
                    <CuiCard appearance="outline" className="section-card">
                      <div slot="heading">Grant access to this resource</div>
                      <p
                        className="font-base300"
                        style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}
                      >
                        Grant access to resources by assigning a role.
                      </p>
                      <CuiButton appearance="link" href="https://learn.microsoft.com" target="_blank">
                        Learn more
                      </CuiButton>
                      <div slot="footer">
                        <CuiButton appearance="outline" size="medium">
                          Add role assignment
                        </CuiButton>
                      </div>
                    </CuiCard>

                    {/* View access card */}
                    <CuiCard appearance="outline" className="section-card">
                      <div slot="heading">View access to this resource</div>
                      <p
                        className="font-base300"
                        style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}
                      >
                        View the role assignments that grant access to this and other resources.
                      </p>
                      <CuiButton appearance="link" href="https://learn.microsoft.com" target="_blank">
                        Learn more
                      </CuiButton>
                      <div slot="footer">
                        <CuiButton appearance="primary" size="medium">
                          View
                        </CuiButton>
                      </div>
                    </CuiCard>

                    {/* Deny assignments card */}
                    <CuiCard appearance="outline" className="section-card">
                      <div slot="heading">View deny assignments</div>
                      <p
                        className="font-base300"
                        style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}
                      >
                        View the role assignments that have been denied access to specific actions at
                        this scope.
                      </p>
                      <CuiButton appearance="link" href="https://learn.microsoft.com" target="_blank">
                        Learn more
                      </CuiButton>
                    </CuiCard>
                  </div>
                </div>
              </CuiTabPanel>

              {/* ─── Role Assignments Tab Panel ─── */}
              <CuiTabPanel id="role-assignments">
                <div style={{ padding: '24px 0' }}>
                  <p className="font-base300" style={{ color: 'var(--neutral-foreground-2)' }}>
                    Role assignments for this resource will appear here.
                  </p>
                </div>
              </CuiTabPanel>

              {/* ─── Roles Tab Panel ─── */}
              <CuiTabPanel id="roles">
                <div style={{ padding: '24px 0' }}>
                  <p className="font-base300" style={{ color: 'var(--neutral-foreground-2)' }}>
                    Available roles will appear here.
                  </p>
                </div>
              </CuiTabPanel>

              {/* ─── Deny Assignments Tab Panel ─── */}
              <CuiTabPanel id="deny-assignments">
                <div style={{ padding: '24px 0' }}>
                  <p className="font-base300" style={{ color: 'var(--neutral-foreground-2)' }}>
                    Deny assignments will appear here.
                  </p>
                </div>
              </CuiTabPanel>

              {/* ─── Classic Administrators Tab Panel ─── */}
              <CuiTabPanel id="classic-admins">
                <div style={{ padding: '24px 0' }}>
                  <p className="font-base300" style={{ color: 'var(--neutral-foreground-2)' }}>
                    Classic administrators will appear here.
                  </p>
                </div>
              </CuiTabPanel>
            </CuiTabs>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
