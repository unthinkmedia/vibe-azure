/**
 * Pattern: Azure Browse Filter Row
 *
 * Search box + filter pills + "Add filter" link matching the Azure portal
 * browse pages. Used by BrowsePage and BrowseBlade scaffolds.
 *
 * Usage:
 *   <BrowseFilterRow
 *     filters={filters}
 *     filterText={filterText}
 *     onFilterTextChange={setFilterText}
 *   />
 */
import { CuiIcon, CuiSearchBox } from '@charm-ux/cui/react';

// ─── Types ───

export interface FilterDef {
  label: string;
  options: string[];
}

interface BrowseFilterRowProps {
  filters: FilterDef[];
  filterText: string;
  onFilterTextChange: (value: string) => void;
  /** Horizontal padding. Default: "24px". Use "32px" for full-width pages. */
  padding?: string;
}

// ─── Component ───

export default function BrowseFilterRow({
  filters,
  filterText,
  onFilterTextChange,
  padding = '24px',
}: BrowseFilterRowProps) {
  return (
    <div className="browse-filter-row" style={{ padding: `10px ${padding}` }}>
      <div className="browse-filter-search">
        <CuiSearchBox
          hideLabel
          placeholder="Filter for any field..."
          size="small"
          value={filterText}
          onInput={(e: any) => onFilterTextChange(e.target.value ?? '')}
        />
      </div>
      {filters.map(f => (
        <button key={f.label} className="browse-filter-pill">
          <span className="pill-label">{f.label}</span>
          <span className="pill-operator">==</span>
          <span className="pill-value">{f.options[0]}</span>
          <CuiIcon name="chevron-down" style={{ fontSize: '10px' }} />
        </button>
      ))}
      <button className="browse-add-filter">Add filter</button>
    </div>
  );
}

// ─── Shared CSS ───

export const browseFilterStyles = `
  /* ─── Filter row ─── */
  .browse-filter-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .browse-filter-search {
    min-width: 200px;
    flex: 0 1 280px;
  }
  .browse-filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border: 1px solid var(--neutral-stroke1);
    border-radius: var(--border-radius-md);
    background: var(--neutral-background1);
    font-size: 12px;
    color: var(--neutral-foreground2);
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
  }
  .browse-filter-pill:hover {
    border-color: var(--neutral-stroke1-hover);
    background: var(--subtle-background-hover);
  }
  .browse-filter-pill .pill-label {
    color: var(--neutral-foreground3);
  }
  .browse-filter-pill .pill-operator {
    color: var(--neutral-foreground3);
    font-size: 11px;
  }
  .browse-filter-pill .pill-value {
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .browse-add-filter {
    font-size: 12px;
    color: var(--brand-foreground-link);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 6px;
    font-family: inherit;
  }
  .browse-add-filter:hover {
    text-decoration: underline;
  }
`;
