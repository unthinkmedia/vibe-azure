# Data Grid

**Tag:** `cui-data-grid`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/data-grid/

## Import

```js
import '@charm-ux/cui/dist/components/data-grid/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Basic elements

- The data grid is made up of several individual elements that come together to form the entire grid. There are also a few optional elements and components available that can be used based what types of interactions are needed.

### Cell content

- Default text
- Secondary text
- Multiline text
- Inline message
- Link
- Multiline link
- Button
- Badges
- Persona

### Built-in functionality

In addition to the table structure that a data grid provides, there is functionality built in that enables user task completion, layout and view customization, and streamlined ways to navigate the data grid. 


All functionality demonstrated below can be used seamlessly together on a data grid. Depending on your scenario and user needs, you can use a selection of the available functionality, or all of it.


Several of the functions listed require the use of additional components. Be sure to follow the components’ individual sets of standards when implementing them; links with more information are provided in each section.

### Taking action on the entire data grid

- The toolbar is used directly above the data grid and displays actions that apply to either the entire data grid (such as export), or can be done without selecting a specific entity first (such as create).

### Taking action on individual rows

- By placing checkboxes in the first column of a data grid, people can select individual rows to take action on. Once they make any number of selections, they take action with the buttons available in the toolbar.

### Sorting columns

People can apply sorting to individual columns, where the cells beneath the header are then organized alphabetically, numerically, or by other means depending on what the scenario requires. Sorting is applied by interacting with a column’s column header, and can be sorted up or down (such as from A to Z, or Z to A). 


Only one column can be sorted at once. If sorting is applied to a new column, the sorting applied to any other column is overridden.

### Grouping rows

Several rows, or entities, can be grouped by using chevrons with the parent row. The parent row acts as a categorization tool where all the entities grouped within it, or child rows, are directly related to the parent row’s cell content. Each child row would maintain their respective details while being categorized inline in the data grid. The chevron is used to expand or collapse parent rows.


For example, in a data grid displaying job postings, a column titled Role might have a parent row within it listing Remote roles. All child rows below it would display only the job postings that can be done remotely.

### Additional functionality

The data grid’s functionality can be expanded even further through the use of additional components.


All functionality demonstrated below can be used in addition to the built-in functionality provided in the data grid. Depending on your scenario and user needs, you can use a selection of the available functionality, or all of it.

### Text search

- The search input field in the toolbar lets people type in key words to quickly find results they’re looking for. After typing their query and pressing enter, the matching results in the data grid become bolded and highlighted in yellow to draw attention to the relevant content. It doesn’t reorder or hide any rows.

### Filtering

Filtering is most typically accessed via the toolbar and lets the user scope the content available. People can make selections based on the type of content they want to access and apply them as filters. Once the filters are applied, the data grid updates to show only content that matches the selected filters. 


For example, if a status column has associated information like completed, in progress, blocked, etc., people can filter by Status: Completed, and only rows with that status are shown in the data grid. Removing the filters shows all content again.

### Navigating pages

- In data grids where there are more than 10–20 rows, pagination is used to navigate between pages of information. It allows people to easily and quickly navigate between hundreds, or even thousands, of rows. The column headers are always available on every page and don’t change.

### Resizing columns

- First column edge is dragged to the left.
- First column displays at a smaller width.

### Inline editing

- Four rows are selected.
- The selected items are moved into an edit page where the editable columns’ cells now have input fields.

### Responsiveness

Responsive layout techniques allow your app page elements and designs that use flexible layouts to render optimally in different window sizes and orientations. 


Data grids are unique in their responsive behavior because the content requires a specific method of organization to be interpreted correctly. As such, the data grid will always maintain its layout regardless of screen size. It’s the only component that doesn’t truncate, wrap, or reflow to accommodate changes in screen size. This means that at reduced page widths, horizontal scroll becomes available to access data grid content that no longer fits within the window.


To see how this component behaves, see the data grid code.

### Show and hide actions based on selections

- Your app may require some actions that apply to the entire data grid. There may also be actions that are only available for individual rows within the data grid. In those scenarios, the actions available for individual rows aren’t shown by default because they require the selection of a row first.

### Limit nested groups

While grouping can be a helpful categorization tool, nesting too many groups can result in an overly complicated experience. It requires more interactions and a significant amount of horizontal space to display information, which can reduce overall efficiency for people simply trying to access the nested information.


If more categorization is needed, consider implementing filtering, sorting, or other view settings mentioned previously to allow users to choose how their content is organized. 


Alternatively, organizational structures like a tree view can be used instead when each piece of data has its own page or significant amounts of associated content.

### Double labeling cells

- The labeled-by attribute is used twice in cells not in the first column. This is to relate the cell information with both the column header, which represents the type of information, and the first cell of the row, which typically represents the entity as a whole.

### Limit one interactive element per cell

- Because arrowing is used to move between cells, there is no key that easily moves focus between interactive elements inside one cell. If including actions, use the most frequently used action.

### Aria labels for grouped child rows

- To associate a child row with the parent row, use aria describedby, using the parent row’s content as the label.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Adding controls

There is a slot available to pass controls into the data-grid - data-grid-controls - as well as a pagination slot for under the grid. You can access these and listen to event handlers as you normally would with components.

```html
import {
  CuiButton,
  CuiButtonGroup,
  CuiDataGrid,
  CuiIcon
  CuiInput,
  CuiPagination,
  CuiSearchBox,
} from '@charm-ux/fui/react';

// Helpers to set up 5 rows and 5 columns of dummy data
const demoData = Array.from({ length: 5 }, (x, i) => i + 1); // [1, 2, 3, 4, 5]
const columns = demoData.map(x => {
  return {
    field: `field${x}`,
    content: `Column ${x}`,

});
const initialRows = demoData.map(x => {
  const row = {
    id: x,
    cells: columns.reduce((cell, column) => {
      cell[column.field] = `Row ${x}, ${column.content}`;
      return cell;
    }, {}),

  return row;
});

export default function() {
  const [dataRows, setDataRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [editCells, setEditCells] = useState({});

  const handleAddRow = () => {
    const x = dataRows.length + 1;
    setDataRows([
      ...dataRows,
      {
        id: x,
        cells: columns.reduce((cell, column) => {
          cell[column.field] = `Row ${x}, ${column.content}`;
          return cell;
        }, {}),
      },
    ]);

  const handleSearch = (value) => {
    setSearchValue(value.toLowerCase());

  const handleClearSearch = () => {
    setSearchValue('');

  const handleEdit = () => {
    setEditMode(!editMode);
    if (!editMode) {
      // Entering edit mode: initialize editCells with selected row values
      const cells = {};
      selectedRows.forEach(row => {
        cells[row.id] = { ...row.cells };
      });
      setEditCells(cells);
    } else {
      setEditCells({});
    }

  const handleSave = () => {
    // Save edited cells back to dataRows
    const newRows = dataRows.map(row => {
      if (editCells[row.id]) {
        return { ...row, cells: { ...editCells[row.id] } };
      }
      return row;
    });
    setDataRows(newRows);
    setEditMode(false);
    setEditCells({});

  const handleInputChange = (rowId, field, value) => {
    setEditCells(prev => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: value,
      },
    }));

  const handleRowSelect = (rows) => {
    setSelectedRows(rows);

  // Highlight search matches
  const highlight = (text) => {
    if (!searchValue) return text;
    const regex = new RegExp(`(${searchValue})`, 'ig');
    return text.replace(regex, '<span class="highlight">$1</span>');

  // Render cells, with edit and search highlight logic
  const renderCell = (row, field) => {
    if (editMode && selectedRows.some(r => r.id === row.id)) {
<cui-input
          value={editCells[row.id]?.[field] ?? row.cells[field]}
          onInput={e => handleInputChange(row.id, field, e.target.value)}
          style="max-width: 150"
        />

    }
    const cellValue = row.cells[field];
<span dangerouslySetInnerHTML={{ __html: highlight(cellValue) }} />

<cui-data-grid
      rows={dataRows}
      columns={columns}
      id="controls-example"
      label="Data Grid with controls example"
      select="multiple"
      onRowSelectChange={e => handleRowSelect(e.detail.selectedRows)}
      onSelectAllChange={e => handleRowSelect(e.detail.selectedRows)}
      renderCell={renderCell}
    >
      <div slot="data-grid-controls" class="table-commands" style="display: flex; align-items: center">
        <cui-button-group>
          <cui-button appearance="subtle" class="add-button" onClick={handleAddRow}>
            <cui-icon name="add" slot="start"></cui-icon>
            New
          </cui-button>
          <cui-button appearance="subtle" class="edit-button" onClick={handleEdit} disabled={!selectedRows.length || editMode}>
            Edit
          </cui-button>
          <cui-button appearance="subtle" class="save-button" onClick={handleSave} disabled={!editMode}>
            Save
          </cui-button>
        </cui-button-group>
        <div style="flex-grow: 1" />
        <cui-search-box
          value={searchValue}
          onSearch={e => handleSearch(e.target.value)}
          onClear={handleClearSearch}
          style="width: 250"
        />
      </div>
      <div slot="pagination">
        <cui-pagination hideItemsPerPage></cui-pagination>
      </div>
    </cui-data-grid>
```

### Fixed heading or column

If you have a long data grid and would like the heading to follow the user down as the scroll, or if you have an especially wide data grid that requires horizontal scrolling, you can add use the attributes fixed-heading or fixed-column to fix the heading or the first column to the screen during scrolling.

```html
// Helpers to set up 10 rows and 10 columns of dummy data
const demoData = Array.from({ length: 10 }, (x, i) => i + 1); // [1, 2, 3, 4, 5]
const columns = demoData.map(x => {
  return {
    field: `field${x}`,
    content: `Column ${x}`,
    display: {
      minWidth: '100px',
    },

});
const rows = demoData.map(x => {
  const row = {
    id: x,
    cells: columns.reduce((cell, column) => {
      cell[column.field] = `Row ${x}, ${column.content}`;
      return cell;
    }, {}),

  return row;
});
<div style="height: 300px">
      <cui-data-grid
        rows={rows}
        columns={columns}
        fixedColumn
        fixedHeading
        label="Fixed Heading Example"
      ></cui-data-grid>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| data-grid-controls | This will position the command bar and search controls above the data-grid. |
| no-records | This is a placeholder for the content displayed when no items are displayed in the data-grid. |
| pagination | This will position a pagination control below the data-grid. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| bulkSelectOptions | `BulkSelectOption[]` | Used to generate custom selections in a multiselect table | `[]` |
| collapse-all-rows-label | `string` | Label for the "collapse all rows" button. | `Collapse all rows` |
| collapse-row-label | `string` | Label for the "collapse row" button. | `Collapse row` |
| columns | `Column[]` | The table columns and their configuration. |  |
| expand-all-rows-label | `string` | Label for the "expand all rows" button. | `Expand all rows` |
| expand-on-click | `boolean` | Enables expanding/collapsing a row when clicking it. | `false` |
| expand-row-label | `string` | Label for the "expand row" button. | `Expand row` |
| fixed-column | `boolean` | Fixes the first column to the left of the screen when table is scrolled. | `false` |
| fixed-heading | `boolean` | Fixes the table headings to the top of the screen when table is scrolled. | `false` |
| fixed-placement | `boolean` | Enable this option to prevent the select options dropdown from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. | `false` |
| hide-select-all | `boolean` | Hide the "select all" checkbox. | `false` |
| label | `string | undefined` | Used to provide screen readers with a label for the data grid. |  |
| lazy | `boolean` | Enables lazy loading behavior. | `false` |
| loadChildren | `(parentRow: Row, currentChildren: Row[]) => Promise<Row[]>` | When lazy loading is on, set this function to return a promise that resolves to an array of child rows for the provided parent row. |  |
| loading | `boolean` | Puts table in a loading state. | `false` |
| more-options-label | `string` | Label for the "more options" dropdown. | `More Options` |
| no-results-label | `string` | String displayed when no results are found. | `No results found` |
| no-scroll | `boolean` | Turns off internal scrollbars. Use this if you want to handle overflow scrolling outside of the table. Make sure to handle both vertical and horizontal scrolling. | `false` |
| rows | `Row[]` | The table rows and their configuration. |  |
| select | `'single' | 'multiple' | undefined` | Shows checkbox or radio control on each row and a "select all" checkbox in header if 'multiple' is selected. |  |
| select-all | `boolean` | Toggles the "select all" checkbox when `select` is set to "multiple". |  |
| select-all-indeterminate | `boolean` | Set the "select all" checkbox to indeterminate state. | `false` |
| select-all-label | `string` | Label for the bulk select checkbox. | `Select all` |
| selectedRows | `Row[]` | Gets all rows that are currently selected. |  |
| select-on-click | `boolean` | Enables toggling selection when clicking the row. | `false` |
| select-row-label | `string` | Label for the row selection checkbox. | `Select row` |
| sort-by | `string | undefined` | Field that data is sorted by. |  |
| sort-descending | `boolean` | Indicates if field is sorted descending. | `false` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| after-row-collapse | Emitted after a row collapses. |
| after-row-expand | Emitted after a row expands and children are loaded. |
| bulk-select | Emitted when a bulk-select option is clicked. |
| expand-all-change | Emitted when a expand all toggle is clicked. |
| ready | Emitted when the component has completed its initial render. |
| row-collapse | Emitted when a row collapses. |
| row-expand | Emitted when a row expands. |
| row-invoke | Emitted when a row is clicked or enter key is pressed on it. |
| row-select-change | Emitted when selectable row is toggled. |
| select-all-change | Emitted when "select all" checkbox is toggled. |
| sort | Emitted when a sortable column header is clicked. |

### CSS Parts

| Part | Description |
|------|-------------|
| no-records | Controls styles for empty records message container. |
| table-body | Allows for custom styles in data grid table body. |
| table-head | Allows for custom styles in data grid table heading. |
