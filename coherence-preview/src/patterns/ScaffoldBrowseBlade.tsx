/**
 * Scaffold: Azure Browse Blade with Collapsible Side Panel
 *
 * Combines the Browse Page pattern (toolbar, filter pills, checkbox data table)
 * with the Service Blade collapsible sidebar. The page title spans full width
 * above the sidebar, and the toolbar + filters + table live inside the content
 * area to the right of the collapsible nav.
 *
 * Layout:
 *   AppFrame → Header → slot="main"
 *     Breadcrumb (full width)
 *     PageHeader (full width, above sidebar)
 *     blade-body:
 *       Collapsible sidebar (left) — CuiSideNav with toggle
 *       Content area (right):
 *         Toolbar
 *         Divider
 *         Filter row (search + filter pills)
 *         Info bar
 *         Data table (checkbox, sortable columns)
 *
 * Customization points (TODOs):
 *   - serviceName, pageTitle, pageSubtitle — page identity
 *   - serviceIconKey — azure-icons key for the leading icon
 *   - navSections[] — sidebar nav items
 *   - filters[] — filter dropdown definitions
 *   - columns[] — table column definitions
 *   - rows[] — table data
 *   - copilotSuggestions — inline Copilot prompts
 */
import { useState } from 'react';
import {
  CuiAppFrame,
  CuiButton,
  CuiDivider,
  CuiIcon,
  CuiMenu,
  CuiMenuItem,
  CuiToolbar,
} from '@charm-ux/cui/react';
import { azureIcon } from './azure-icons';
import PageHeader from './PageHeader';
import AzurePortalNav from './PatternAzurePortalNav';
import AzurePortalHeader from './AzurePortalHeader';
import AzureBreadcrumb from './AzureBreadcrumb';
import BladeSidebar, { bladeSidebarStyles } from './BladeSidebar';
import BrowseFilterRow, { browseFilterStyles } from './BrowseFilterRow';
import BrowseDataTable, { BrowseInfoBar, browseTableStyles, browseInfoBarStyles } from './BrowseDataTable';
import useFilteredRows from './useFilteredRows';
import { toolbarNoWrapStyles } from './scaffold-styles';

import type { BladeNavSection } from './BladeSidebar';
import type { FilterDef } from './BrowseFilterRow';
import type { BrowseColumn, BrowseRow } from './BrowseDataTable';

// ─── Data (TODO: customize these) ───

const serviceName = 'Cost Management';
const pageTitle = 'Budgets';
const pageSubtitle = 'Microsoft';
const serviceIconKey = 'cost-management';

const navSections: BladeNavSection[] = [
  {
    heading: null,
    items: [
      { label: 'Overview', name: 'navigation' },
      { label: 'Cost analysis', name: 'data-trending' },
      { label: 'Cost alerts', azureIconKey: 'cost-alerts' },
      { label: 'Budgets', name: 'calculator' },
      { label: 'Advisor recommendations', azureIconKey: 'advisor' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Configuration', name: 'settings' },
      { label: 'Properties', name: 'info' },
    ],
  },
];

const filters: FilterDef[] = [
  { label: 'Subscription', options: ['all'] },
  { label: 'Time period', options: ['Current month', 'Last 30 days', 'Last 3 months'] },
];

const columns: BrowseColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'amount', label: 'Budget amount' },
  { key: 'spent', label: 'Current spend' },
  { key: 'status', label: 'Status' },
  { key: 'resetPeriod', label: 'Reset period' },
];

const rows: BrowseRow[] = [
  { id: '1', name: 'Monthly Dev Budget', amount: '$500.00', spent: '$342.18', status: 'Active', resetPeriod: 'Monthly' },
  { id: '2', name: 'Production Infra', amount: '$2,000.00', spent: '$1,847.50', status: 'Warned', resetPeriod: 'Monthly' },
  { id: '3', name: 'Staging Environment', amount: '$300.00', spent: '$98.42', status: 'Active', resetPeriod: 'Monthly' },
  { id: '4', name: 'Q1 Marketing Campaign', amount: '$5,000.00', spent: '$5,120.00', status: 'Exceeded', resetPeriod: 'Quarterly' },
  { id: '5', name: 'AI/ML Experimentation', amount: '$1,000.00', spent: '$0.00', status: 'Disabled', resetPeriod: 'Monthly' },
];

const copilotSuggestions = [
  'Which budgets are close to being exceeded?',
  'Show me spending trends over the last 3 months.',
];

// ─── Styles ───

const styles = `
  body { margin: 0; }

  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* Override blade-content background for browse blade */
  .blade-content {
    background: var(--neutral-background2);
  }

  ${bladeSidebarStyles}
  ${browseFilterStyles}
  ${browseTableStyles}
  ${browseInfoBarStyles}
  ${toolbarNoWrapStyles}
`;

// ─── Component ───

export default function ScaffoldBrowseBlade() {
  const [selectedNav, setSelectedNav] = useState(pageTitle);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');
  const filteredRows = useFilteredRows(rows, filterText);

  const toggleAll = () => {
    if (selectedRows.size === rows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(rows.map(r => r.id)));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        <AzurePortalHeader />
        <AzurePortalNav />

        {/* ─── Main ─── */}
        <div slot="main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <AzureBreadcrumb items={['Home', serviceName]} />

          {/* Title — full width above sidebar */}
          <PageHeader
            icon={azureIcon(serviceIconKey)}
            title={<><strong>{serviceName}</strong> | {pageTitle}</>}
            subtitle={pageSubtitle}
            titleWeight="regular"
            horizontalPadding="16px"
            showFavorite
            copilotSuggestions={copilotSuggestions}
          />

          {/* ─── Body: sidebar + content ─── */}
          <BladeSidebar
            navSections={navSections}
            selectedNav={selectedNav}
            onNavChange={setSelectedNav}
            contentBackground="neutral-background2"
          >
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Toolbar */}
                <div style={{ padding: '0 24px' }}>
                <CuiToolbar size="small" label="Actions">
                  <CuiButton appearance="subtle" size="small">
                    <CuiIcon slot="start" name="add" />
                    Add
                  </CuiButton>

                  <CuiDivider orientation="vertical" style={{ height: '20px' }} />

                  <CuiMenu>
                    <CuiButton slot="trigger" appearance="subtle" size="small">
                      Manage view
                      <CuiIcon slot="end" name="chevron-down" />
                    </CuiButton>
                    <CuiMenuItem>Save view</CuiMenuItem>
                    <CuiMenuItem>Save view as...</CuiMenuItem>
                    <CuiMenuItem>Reset to default</CuiMenuItem>
                  </CuiMenu>

                  <CuiButton appearance="subtle" size="small">
                    <CuiIcon slot="start" name="edit" />
                    Edit columns
                  </CuiButton>

                  <CuiDivider orientation="vertical" style={{ height: '20px' }} />

                  <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
                  <CuiButton appearance="subtle" size="small">
                    <CuiIcon slot="start" name="arrow-download" />
                    Export to CSV
                  </CuiButton>

                  <CuiDivider orientation="vertical" style={{ height: '20px' }} />

                  {selectedRows.size > 0 && (
                    <>
                      <CuiButton appearance="subtle" size="small">
                        <CuiIcon slot="start" name="delete" />
                        Delete
                      </CuiButton>
                      <CuiDivider orientation="vertical" style={{ height: '20px' }} />
                    </>
                  )}

                  <CuiButton appearance="subtle" size="small">Feedback</CuiButton>
                </CuiToolbar>
              </div>

              <CuiDivider style={{ margin: 0 }} />

              <BrowseFilterRow
                filters={filters}
                filterText={filterText}
                onFilterTextChange={setFilterText}
              />

              <BrowseInfoBar
                selectedCount={selectedRows.size}
                totalCount={filteredRows.length}
                label={pageTitle.toLowerCase()}
              />

              <BrowseDataTable
                columns={columns}
                rows={filteredRows}
                selectedRows={selectedRows}
                onToggleAll={toggleAll}
                onToggleRow={toggleRow}
                ariaLabel={pageTitle}
              />
              </div>
          </BladeSidebar>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
