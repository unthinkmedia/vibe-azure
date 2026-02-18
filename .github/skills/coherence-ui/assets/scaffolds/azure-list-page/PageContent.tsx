// @ts-nocheck
import {
  CuiButton,
  CuiCheckbox,
  CuiDivider,
  CuiIcon,
  CuiSearchBox,
} from '@charm-ux/cui/react';
import { listItems } from './data';

/** TODO: Replace with your detail view or card grid */
export default function PageContent() {
  return (
    <div className="list-layout">
      {/* ─── List Panel (left) ─── */}
      <div className="list-panel">
        <CuiSearchBox hideLabel placeholder="Search items" size="small" />
        <CuiSearchBox hideLabel placeholder="Filter by tags" size="small" />
        <CuiCheckbox>
          <span style={{ fontSize: 'var(--font-size-base200)' }}>Group by tag</span>
        </CuiCheckbox>

        <CuiButton appearance="subtle" size="small">
          <CuiIcon slot="start" name="add" />
          Add item
        </CuiButton>

        <CuiDivider />

        <div className="list-heading">All items</div>

        {listItems.map((item) => (
          <div key={item.id} className="list-item">
            <span>{item.name}</span>
            <CuiButton appearance="transparent" iconOnly size="small">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
          </div>
        ))}
      </div>

      {/* ─── Detail Content (right) ─── */}
      <div className="main-content">
        <p style={{ color: 'var(--neutral-foreground2)' }}>
          Select an item from the list or add a new one.
        </p>
      </div>
    </div>
  );
}
