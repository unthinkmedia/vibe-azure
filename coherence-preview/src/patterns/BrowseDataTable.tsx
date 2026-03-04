/**
 * Pattern: Azure Browse Data Table
 *
 * Reusable data table with checkbox selection, sortable columns, resource
 * name links, and status badges. Matches the pattern used in BrowsePage,
 * BrowseBlade, and HomePage scaffolds.
 *
 * Usage:
 *   <BrowseDataTable
 *     columns={columns}
 *     rows={filteredRows}
 *     selectedRows={selectedRows}
 *     onToggleAll={toggleAll}
 *     onToggleRow={toggleRow}
 *     resourceIconUrl={azureIcon('subscription')}
 *     ariaLabel="Subscriptions"
 *   />
 */
import { CuiCheckbox, CuiIcon } from '@charm-ux/cui/react';

// ─── Types ───

export interface BrowseColumn {
  key: string;
  label: string;
  width?: string;
}

export interface BrowseRow {
  id: string;
  name: string;
  [key: string]: string;
}

interface BrowseDataTableProps {
  columns: BrowseColumn[];
  rows: BrowseRow[];
  selectedRows: Set<string>;
  onToggleAll: () => void;
  onToggleRow: (id: string) => void;
  /** Icon URL for the resource name column. If omitted, no icon is shown. */
  resourceIconUrl?: string;
  /** Accessible table label. */
  ariaLabel: string;
  /** Status column key — applies status badge CSS classes. Default: "status" */
  statusKey?: string;
}

// ─── Status class mapping ───

const statusClassMap: Record<string, string> = {
  active: 'browse-status-active',
  running: 'browse-status-active',
  succeeded: 'browse-status-active',
  disabled: 'browse-status-disabled',
  stopped: 'browse-status-disabled',
  warned: 'browse-status-warned',
  warning: 'browse-status-warned',
  exceeded: 'browse-status-exceeded',
  failed: 'browse-status-exceeded',
  error: 'browse-status-exceeded',
};

function getStatusClass(status: string): string {
  return statusClassMap[status.toLowerCase()] ?? '';
}

// ─── Component ───

export default function BrowseDataTable({
  columns,
  rows,
  selectedRows,
  onToggleAll,
  onToggleRow,
  resourceIconUrl,
  ariaLabel,
  statusKey = 'status',
}: BrowseDataTableProps) {
  const allSelected = selectedRows.size === rows.length && rows.length > 0;
  const someSelected = selectedRows.size > 0 && !allSelected;

  return (
    <div className="browse-table-container">
      <table className="browse-table" aria-label={ariaLabel}>
        <thead>
          <tr>
            <th className="checkbox-cell">
              <CuiCheckbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={onToggleAll}
                aria-label="Select all"
              />
            </th>
            {columns.map(col => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.label}
                <span className="sort-icon">↕</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td className="checkbox-cell">
                <CuiCheckbox
                  checked={selectedRows.has(row.id)}
                  onChange={() => onToggleRow(row.id)}
                  aria-label={`Select ${row.name}`}
                />
              </td>
              {columns.map(col => (
                <td key={col.key}>
                  {col.key === 'name' ? (
                    <div className="resource-name-cell">
                      {resourceIconUrl && <img src={resourceIconUrl} alt="" />}
                      <a className="resource-name" href="#">{row.name}</a>
                    </div>
                  ) : col.key === statusKey ? (
                    <span className={getStatusClass(row[col.key] ?? '')}>
                      {row[col.key]}
                    </span>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Shared CSS ───

export const browseTableStyles = `
  /* ─── Data table ─── */
  .browse-table-container {
    flex: 1;
    overflow: auto;
    padding: 0 24px 24px;
  }
  table.browse-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    table-layout: auto;
  }
  .browse-table thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .browse-table th {
    text-align: left;
    padding: 8px 12px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    background: var(--neutral-background2);
    border-bottom: 1px solid var(--neutral-stroke1);
    white-space: nowrap;
    font-size: 12px;
    user-select: none;
    cursor: pointer;
  }
  .browse-table th:hover {
    color: var(--neutral-foreground1);
  }
  .browse-table th .sort-icon {
    font-size: 10px;
    margin-left: 4px;
    opacity: 0.5;
  }
  .browse-table td {
    padding: 8px 12px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
    vertical-align: middle;
    font-size: 13px;
  }
  .browse-table tr:hover td {
    background: var(--subtle-background-hover);
  }
  .browse-table .resource-name {
    color: var(--brand-foreground-link);
    text-decoration: none;
    cursor: pointer;
  }
  .browse-table .resource-name:hover {
    text-decoration: underline;
  }
  .browse-table .resource-name-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .browse-table .resource-name-cell img {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  .browse-table .checkbox-cell {
    width: 36px;
    padding-left: 4px;
  }

  /* ─── Status badges ─── */
  .browse-status-active {
    color: var(--status-success-foreground1);
  }
  .browse-status-disabled {
    color: var(--neutral-foreground3);
  }
  .browse-status-warned {
    color: var(--status-warning-foreground1);
  }
  .browse-status-exceeded {
    color: var(--status-danger-foreground1);
  }
`;

// ─── Info bar ───

export function BrowseInfoBar({
  selectedCount,
  totalCount,
  label,
  padding = '24px',
}: {
  selectedCount: number;
  totalCount: number;
  label?: string;
  padding?: string;
}) {
  return (
    <div className="browse-info-bar" style={{ padding: `6px ${padding}` }}>
      <span>
        {selectedCount > 0
          ? `${selectedCount} of ${totalCount} selected`
          : `${totalCount} ${label ?? 'items'}`}
      </span>
    </div>
  );
}

export const browseInfoBarStyles = `
  .browse-info-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: var(--neutral-foreground3);
  }
`;
