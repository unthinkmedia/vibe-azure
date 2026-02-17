import React from 'react';
import {
  CuiBadge,
  CuiButton,
  CuiDivider,
  CuiIcon,
  CuiToolbar,
} from '@charm-ux/cui/react';
import { vaultEssentials, secrets } from './data';

export const PageContent: React.FC = () => (
  <>
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

    {/* Overview Content */}
    <div style={{ padding: '24px 32px' }}>
      {/* Essentials Panel */}
      <h2 className="section-heading">Essentials</h2>
      <div className="essentials-panel">
        <div className="essentials-column">
          <div className="essentials-row">
            <span className="essentials-label">Resource group</span>
            <span className="essentials-value">
              <a href="javascript:;">{vaultEssentials.resourceGroup}</a>
            </span>
          </div>
          <div className="essentials-row">
            <span className="essentials-label">Location</span>
            <span className="essentials-value">{vaultEssentials.location}</span>
          </div>
          <div className="essentials-row">
            <span className="essentials-label">Subscription</span>
            <span className="essentials-value">
              <a href="javascript:;">{vaultEssentials.subscription}</a>
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
              <a href="javascript:;">{vaultEssentials.vaultUri}</a>
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
                <a href="javascript:;" className="secret-name-link">{secret.name}</a>
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
  </>
);
