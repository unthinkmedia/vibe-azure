// @ts-nocheck
import {
  CuiButton,
  CuiDivider,
  CuiIcon,
  CuiToolbar,
} from '@charm-ux/cui/react';

/** TODO: Replace with your page content (tabs, cards, tables, etc.) */
export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="add" />
            Add
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
          <CuiButton appearance="subtle" size="small">Feedback</CuiButton>
        </CuiToolbar>
      </div>

      <CuiDivider style={{ margin: '0' }} />

      {/* Page Content */}
      <div style={{ padding: '24px 32px' }}>
        <p style={{ color: 'var(--neutral-foreground-2)' }}>
          Page content goes here.
        </p>
      </div>
    </>
  );
}
