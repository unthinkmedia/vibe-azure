// @ts-nocheck
import { useState } from 'react';
import {
  CuiAccordion,
  CuiAccordionItem,
  CuiBadge,
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiMessageBar,
  CuiRadio,
  CuiRadioGroup,
  CuiTag,
  CuiToolbar,
} from '@charm-ux/cui/react';
import {
  securityLevels,
  ipRules,
  vnetRules,
  privateEndpoints,
  SecurityLevel,
} from './data';

export default function NetworkingPage() {
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>('public-selected');

  const isPublicSelected = securityLevel === 'public-selected';
  const isPrivateOnly = securityLevel === 'private-only';

  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Networking actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="save" />
            Save
          </CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:arrow-undo-24-regular.svg" />
            Discard
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
        </CuiToolbar>
      </div>

      <CuiDivider style={{ margin: '0' }} />

      <div className="content-area">
        {/* ─── Info banner ─── */}
        <CuiMessageBar
          intent="info"
          shape="square"
          style={{
            '--message-bar-bg-color': 'var(--brand-background2)',
            '--message-bar-icon-fg-color': 'var(--brand-foreground-link)',
            '--message-bar-border': '1px solid var(--brand-stroke1)',
            marginBottom: '24px',
          }}
        >
          Configure networking to control how your function app is accessed. Public access settings apply to inbound traffic. To configure outbound traffic, use VNet integration.{' '}
          <a href="#" style={{ color: 'var(--brand-foreground-link)' }}>Learn more</a>
        </CuiMessageBar>

        {/* ─── Security Level Selection ─── */}
        <section className="net-section">
          <h2 className="section-title">Public network access</h2>
          <p className="net-description">
            Choose who can access this function app over the public internet.
          </p>

          <CuiRadioGroup
            name="securityLevel"
            value={securityLevel}
            onChange={(e) => setSecurityLevel(e.target.value as SecurityLevel)}
          >
            {securityLevels.map((level) => (
              <div key={level.value} className="net-radio-option">
                <CuiRadio value={level.value}>
                  {level.label}
                </CuiRadio>
                <p className="net-radio-description">{level.description}</p>
              </div>
            ))}
          </CuiRadioGroup>
        </section>

        <CuiDivider style={{ margin: '8px 0 24px' }} />

        {/* ─── Network Access Details (Accordion) ─── */}
        <section className="net-section">
          <h2 className="section-title">Network access configuration</h2>

          <CuiAccordion>
            {/* ── Firewall / IP Rules ── */}
            <CuiAccordionItem
              heading="Firewall and IP restrictions"
              open={isPublicSelected}
              disabled={!isPublicSelected}
            >
              <div slot="end">
                <CuiTag size="small" appearance="outline" shape="circular">
                  {ipRules.length} rule{ipRules.length !== 1 ? 's' : ''}
                </CuiTag>
              </div>

              <div className="net-accordion-content">
                <p className="net-description" style={{ marginBottom: 12 }}>
                  Add IP addresses or CIDR ranges that are allowed to access this resource. Traffic from all other addresses will be denied.
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                  <CuiButton appearance="subtle" size="small">
                    <CuiIcon slot="start" name="add" />
                    Add IP rule
                  </CuiButton>
                </div>

                <table className="net-table">
                  <thead>
                    <tr>
                      <th>Rule name</th>
                      <th>Start IP</th>
                      <th>End IP</th>
                      <th style={{ width: 60 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ipRules.map((rule) => (
                      <tr key={rule.name}>
                        <td>{rule.name}</td>
                        <td><code className="net-code">{rule.startIp}</code></td>
                        <td><code className="net-code">{rule.endIp}</code></td>
                        <td>
                          <CuiButton appearance="subtle" size="small" iconOnly aria-label={`Delete ${rule.name}`}>
                            <CuiIcon name="delete" />
                          </CuiButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CuiAccordionItem>

            {/* ── VNet / Subnet Integration ── */}
            <CuiAccordionItem
              heading="Virtual network integration"
              open={isPublicSelected}
              disabled={!isPublicSelected}
            >
              <div slot="end">
                <CuiTag size="small" appearance="outline" shape="circular">
                  {vnetRules.length} subnet{vnetRules.length !== 1 ? 's' : ''}
                </CuiTag>
              </div>

              <div className="net-accordion-content">
                <p className="net-description" style={{ marginBottom: 12 }}>
                  Allow traffic from specific virtual network subnets. Service endpoints must be enabled on the selected subnets.
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                  <CuiButton appearance="subtle" size="small">
                    <CuiIcon slot="start" name="add" />
                    Add VNet rule
                  </CuiButton>
                </div>

                <table className="net-table">
                  <thead>
                    <tr>
                      <th>Rule name</th>
                      <th>Virtual network</th>
                      <th>Subnet</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vnetRules.map((rule) => (
                      <tr key={rule.name}>
                        <td>{rule.name}</td>
                        <td>
                          <a href="#" className="net-link">{rule.vnet}</a>
                        </td>
                        <td>{rule.subnet}</td>
                        <td>
                          <CuiBadge
                            appearance="outline"
                            size="small"
                            color={rule.status === 'Active' ? 'success' : 'warning'}
                          >
                            {rule.status}
                          </CuiBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CuiAccordionItem>

            {/* ── Private Endpoints ── */}
            <CuiAccordionItem heading="Private endpoints" open>
              <div slot="end">
                <CuiTag size="small" appearance="outline" shape="circular">
                  {privateEndpoints.length} endpoint{privateEndpoints.length !== 1 ? 's' : ''}
                </CuiTag>
              </div>

              <div className="net-accordion-content">
                <p className="net-description" style={{ marginBottom: 12 }}>
                  Private endpoints assign a private IP address from your VNet, effectively bringing the service into your virtual network. All traffic can be routed through the private endpoint.
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                  <CuiButton appearance="subtle" size="small">
                    <CuiIcon slot="start" name="add" />
                    Add private endpoint
                  </CuiButton>
                </div>

                <table className="net-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Subnet</th>
                      <th>Private IP</th>
                      <th>Connection state</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privateEndpoints.map((ep) => (
                      <tr key={ep.name}>
                        <td>
                          <a href="#" className="net-link">{ep.name}</a>
                        </td>
                        <td>{ep.subnet}</td>
                        <td><code className="net-code">{ep.privateIp}</code></td>
                        <td>
                          <CuiBadge
                            appearance="outline"
                            size="small"
                            color={
                              ep.status === 'Approved' ? 'success'
                                : ep.status === 'Pending' ? 'warning'
                                  : 'danger'
                            }
                          >
                            {ep.status}
                          </CuiBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CuiAccordionItem>
          </CuiAccordion>
        </section>

        {/* ─── Save bar ─── */}
        <CuiDivider style={{ margin: '24px 0 16px' }} />
        <div className="net-save-bar">
          <CuiButton appearance="primary" size="small">
            Save
          </CuiButton>
          <CuiButton appearance="outline" size="small">
            Discard
          </CuiButton>
        </div>
      </div>
    </>
  );
}
