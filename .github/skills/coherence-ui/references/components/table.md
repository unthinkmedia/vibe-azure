# Table

**Tag:** `cui-table`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/table/

## Import

```js
import '@charm-ux/cui/dist/components/table/index.js'
```

## Guidance

A table organizes content through intersecting rows and columns. Each intersection point, known as a cell, contains a specific piece of information that corresponds to the header cells in both the associated row and column.

A table is a basic organizational tool with no added functionality. If you’re looking for an option that includes column sorting and can be used with complex features like column sorting, filtering, or grouping, use a data grid.

> Go to table in the toolkit

### Standards

You must meet the following requirements when using this component.

#### General requirements

Columns are in priority order: the most critical information appears first.
Content in individual cells is kept as brief as possible.
Pagination is used when needed. Infinite scrolling is never used.
For a single table on a page, the maximum number of rows is 20.
For multiple tables on a page, the maximum number of rows is 10.

#### Accessibility requirements

All columns have a header. Column headers are visible on every page.

### Anatomy

#### Basic elements

The table is made up of a few individual elements that come together to form the entire grid. 

#### Cell

A cell is any single piece of content that appears in the data grid.

#### Column header

A column header is used to label or categorize the content that appears below it. There is only one column header per column.

#### Row

A row is a horizontal grouping of cells that typically represent a single entity and details related to that entity.

#### Column

A column is a vertical grouping of cells that contains details related to the column header for various entities.

### Best practices

#### Use for simple and lightweight content organization

Because the table lacks functionality that lets people to customize the data displayed in it, tables should only be used in instances where a maximum of 10–20 rows are needed. 

If you need to display more data, use the data grid, which includes features that let people narrow down the information displayed.
