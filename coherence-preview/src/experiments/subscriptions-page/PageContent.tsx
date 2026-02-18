import { useState } from 'react';
import {
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiTab,
  CuiTabPanel,
  CuiTabs,
  CuiToolbar,
} from '@charm-ux/cui/react';

export default function PageContent() {
  const [activeTab, setActiveTab] = useState('check-access');

  return (
    <>
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
              <h3 className="font-base400 font-semi-bold" style={{ margin: '0 0 4px' }}>
                My access
              </h3>
              <p className="font-base300" style={{ margin: '0 0 12px', color: 'var(--neutral-foreground2)' }}>
                View my level of access to this resource.
              </p>
              <CuiButton appearance="primary" size="medium">
                View my access
              </CuiButton>

              <CuiDivider style={{ margin: '24px 0' }} />

              <h3 className="font-base400 font-semi-bold" style={{ margin: '0 0 4px' }}>
                Check access
              </h3>
              <p className="font-base300" style={{ margin: '0 0 12px', color: 'var(--neutral-foreground2)' }}>
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
                <CuiCard appearance="outline" className="section-card">
                  <div slot="heading">Grant access to this resource</div>
                  <p className="font-base300" style={{ margin: '0 0 8px', color: 'var(--neutral-foreground2)' }}>
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

                <CuiCard appearance="outline" className="section-card">
                  <div slot="heading">View access to this resource</div>
                  <p className="font-base300" style={{ margin: '0 0 8px', color: 'var(--neutral-foreground2)' }}>
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

                <CuiCard appearance="outline" className="section-card">
                  <div slot="heading">View deny assignments</div>
                  <p className="font-base300" style={{ margin: '0 0 8px', color: 'var(--neutral-foreground2)' }}>
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

          {/* ─── Placeholder Tab Panels ─── */}
          <CuiTabPanel id="role-assignments">
            <div style={{ padding: '24px 0' }}>
              <p className="font-base300" style={{ color: 'var(--neutral-foreground2)' }}>
                Role assignments for this resource will appear here.
              </p>
            </div>
          </CuiTabPanel>

          <CuiTabPanel id="roles">
            <div style={{ padding: '24px 0' }}>
              <p className="font-base300" style={{ color: 'var(--neutral-foreground2)' }}>
                Available roles will appear here.
              </p>
            </div>
          </CuiTabPanel>

          <CuiTabPanel id="deny-assignments">
            <div style={{ padding: '24px 0' }}>
              <p className="font-base300" style={{ color: 'var(--neutral-foreground2)' }}>
                Deny assignments will appear here.
              </p>
            </div>
          </CuiTabPanel>

          <CuiTabPanel id="classic-admins">
            <div style={{ padding: '24px 0' }}>
              <p className="font-base300" style={{ color: 'var(--neutral-foreground2)' }}>
                Classic administrators will appear here.
              </p>
            </div>
          </CuiTabPanel>
        </CuiTabs>
      </div>
    </>
  );
}
