/**
 * Hook: useFilteredRows
 *
 * Filters an array of rows by a text query across all string values.
 * Used by BrowsePage, BrowseBlade, and HomePage scaffolds.
 *
 * Usage:
 *   const filteredRows = useFilteredRows(rows, filterText);
 */
import { useMemo } from 'react';

export default function useFilteredRows<T extends Record<string, string>>(
  rows: T[],
  filterText: string,
): T[] {
  return useMemo(
    () =>
      filterText
        ? rows.filter(r =>
            Object.values(r).some(v =>
              v.toLowerCase().includes(filterText.toLowerCase()),
            ),
          )
        : rows,
    [rows, filterText],
  );
}
