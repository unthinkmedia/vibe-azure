/**
 * Scaffold: Azure Portal Browse Page
 *
 * Full-width resource browse/list page — the pattern used for Subscriptions,
 * All Resources, Resource Groups, Virtual Machines, etc. No section side nav.
 *
 * Layout:
 *   AppFrame → Header → slot="main" (full width)
 *     Breadcrumb
 *     PageHeader (title + star + copilot suggestions)
 *     Toolbar (+ Create, Manage view, Edit columns, Refresh, Export to CSV, Open query, Feedback)
 *     Divider
 *     Filter row (search + filter pills)
 *     Data table (checkbox, Name, column2, column3, column4, ...)
 *
 * Customization points (TODOs):
 *   - pageTitle, pageSubtitle — page identity
 *   - pageIconKey — azure-icons key for the leading icon
 *   - toolbarActions — add/remove toolbar buttons
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
import BrowseFilterRow from './BrowseFilterRow';
import { browseFilterStyles } from './BrowseFilterRow';
import BrowseDataTable, { BrowseInfoBar, browseTableStyles, browseInfoBarStyles } from './BrowseDataTable';
import useFilteredRows from './useFilteredRows';
import { toolbarNoWrapStyles } from './scaffold-styles';

import type { FilterDef } from './BrowseFilterRow';
import type { BrowseColumn, BrowseRow } from './BrowseDataTable';

// ─── Data (TODO: customize these) ───

const pageTitle = 'Subscriptions';
const pageSubtitle = 'Microsoft';
const pageIconKey = 'subscription';

const filters: FilterDef[] = [
  { label: 'Subscription', options: ['all'] },
  { label: 'Status', options: ['all', 'Active', 'Disabled', 'Warned'] },
];

const columns: BrowseColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'subscriptionId', label: 'Subscription ID' },
  { key: 'status', label: 'Status' },
  { key: 'offerId', label: 'Offer ID' },
];

const rows: BrowseRow[] = [
  { id: '1', name: 'Azure subscription 1', subscriptionId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', status: 'Active', offerId: 'MS-AZR-0003P' },
  { id: '2', name: 'Visual Studio Enterprise', subscriptionId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', status: 'Active', offerId: 'MS-AZR-0063P' },
  { id: '3', name: 'Pay-As-You-Go', subscriptionId: 'c3d4e5f6-a7b8-9012-cdef-123456789012', status: 'Active', offerId: 'MS-AZR-0003P' },
  { id: '4', name: 'Free Trial', subscriptionId: 'd4e5f6a7-b8c9-0123-def0-234567890123', status: 'Disabled', offerId: 'MS-AZR-0044P' },
  { id: '5', name: 'Dev/Test subscription', subscriptionId: 'e5f6a7b8-c9d0-1234-ef01-345678901234', status: 'Active', offerId: 'MS-AZR-0148P' },
];

const copilotSuggestions = [
  'Which subscriptions have the highest cost?',
  'Show me subscriptions nearing their spending limit.',
];

// ─── Styles ───

const styles = `
  body { margin: 0; }

  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }

  .browse-content {
    overflow-y: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Override table container padding for full-width page */
  .browse-table-container {
    padding: 0 32px 24px;
  }

  ${browseFilterStyles}
  ${browseTableStyles}
  ${browseInfoBarStyles}
  ${toolbarNoWrapStyles}
`;

// ─── Component ───

export default function ScaffoldBrowsePage() {
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

        {/* ─── Main Content (full-width — no section side nav) ─── */}
        <div slot="main" style={{ height: '100%', width: '100%', minWidth: 0, overflow: 'hidden' }}>
          <div className="browse-content">

            <AzureBreadcrumb items={['Home', pageTitle]} padding="32px" />

            {/* Page title row */}
            <PageHeader
              icon={azureIcon(pageIconKey)}
              title={pageTitle}
              subtitle={pageSubtitle}
              showFavorite
              copilotSuggestions={copilotSuggestions}
            />

            {/* Toolbar */}
            <div style={{ padding: '0 32px' }}>
              <CuiToolbar size="small" label="Actions">
                {/* TODO: Customize toolbar actions */}
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
                <CuiButton appearance="subtle" size="small">Open query</CuiButton>

                <CuiDivider orientation="vertical" style={{ height: '20px' }} />

                {selectedRows.size > 0 && (
                  <>
                    <CuiButton appearance="subtle" size="small">
                      <CuiIcon slot="start" name="delete" />
                      Cancel
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
              padding="32px"
            />

            <BrowseInfoBar
              selectedCount={selectedRows.size}
              totalCount={filteredRows.length}
              label={pageTitle.toLowerCase()}
              padding="32px"
            />

            <BrowseDataTable
              columns={columns}
              rows={filteredRows}
              selectedRows={selectedRows}
              onToggleAll={toggleAll}
              onToggleRow={toggleRow}
              resourceIconUrl={azureIcon(pageIconKey)}
              ariaLabel={pageTitle}
            />

          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
