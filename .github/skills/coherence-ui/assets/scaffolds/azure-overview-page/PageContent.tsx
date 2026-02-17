// @ts-nocheck
import {
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiToolbar,
} from '@charm-ux/cui/react';
import { essentialsData } from './data';

/** TODO: Add overview cards relevant to your resource */
export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Resource actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="add" />
            Create
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="delete" label="Delete" />
            Delete
          </CuiButton>
        </CuiToolbar>
      </div>

      <CuiDivider style={{ margin: '0' }} />

      <div className="content-area">
        {/* Essentials Panel */}
        <div className="essentials">
          {essentialsData.map((row) => (
            <div key={row.label} className="essentials-row">
              <span className="essentials-label">{row.label}</span>
              <span className="essentials-value">
                {row.href ? <a href={row.href}>{row.value}</a> : row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Card sections */}
        <h2 className="section-title">Get started</h2>
        <div className="card-row">
          <CuiCard appearance="outline" className="overview-card">
            <div slot="heading">Quick start</div>
            <p style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}>
              Get started with step-by-step instructions.
            </p>
            <CuiButton appearance="link">Learn more</CuiButton>
          </CuiCard>

          <CuiCard appearance="outline" className="overview-card">
            <div slot="heading">Monitoring</div>
            <p style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}>
              View metrics and logs for this resource.
            </p>
            <CuiButton appearance="link">View metrics</CuiButton>
          </CuiCard>

          <CuiCard appearance="outline" className="overview-card">
            <div slot="heading">Documentation</div>
            <p style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}>
              Read the documentation for this resource type.
            </p>
            <CuiButton appearance="link">Open docs</CuiButton>
          </CuiCard>
        </div>
      </div>
    </>
  );
}
