/**
 * Pattern: Azure Portal Breadcrumb
 *
 * Simple breadcrumb wrapper matching the Azure portal pattern.
 * Renders CuiBreadcrumb with consistent size and padding.
 *
 * Usage:
 *   <AzureBreadcrumb items={['Home', 'Resource Group', 'My Resource']} />
 */
import {
  CuiBreadcrumb,
  CuiBreadcrumbItem,
} from '@charm-ux/cui/react';

interface AzureBreadcrumbProps {
  /** Breadcrumb items — last item is marked as current page. */
  items: string[];
  /** Horizontal padding. Default: "16px". Use "32px" for full-width pages. */
  padding?: string;
}

export default function AzureBreadcrumb({ items, padding = '16px' }: AzureBreadcrumbProps) {
  return (
    <div style={{ padding: `4px ${padding} 0` }}>
      <CuiBreadcrumb label="Navigation" size="small">
        {items.map((crumb, i) => (
          <CuiBreadcrumbItem
            key={i}
            href="#"
            active={i === items.length - 1 || undefined}
            current={i === items.length - 1 ? 'page' : undefined}
          >
            {crumb}
          </CuiBreadcrumbItem>
        ))}
      </CuiBreadcrumb>
    </div>
  );
}
