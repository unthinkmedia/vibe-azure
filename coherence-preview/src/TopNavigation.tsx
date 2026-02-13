import {
  CuiButton,
  CuiDivider,
  CuiIcon,
  CuiMenu,
  CuiMenuItem,
  CuiToolbar,
} from '@charm-ux/cui/react';

export default function TopNavigation() {
  return (
    <>
      <style>{`
        .top-nav cui-button::part(content) {
          white-space: nowrap;
        }
      `}</style>
      <CuiToolbar size="small" label="Role assignment actions" className="top-nav">
      {/* Add — dropdown menu with chevron */}
      <CuiMenu>
        <CuiButton slot="trigger" appearance="subtle" size="small">
          <CuiIcon slot="start" name="add" />
          Add
          <CuiIcon slot="end" name="chevron-down" />
        </CuiButton>
        <CuiMenuItem>Add role assignment</CuiMenuItem>
        <CuiMenuItem>Add co-administrator</CuiMenuItem>
      </CuiMenu>

      <CuiDivider orientation="vertical" style={{ height: '20px' }} />

      {/* Download role assignments */}
      <CuiButton appearance="subtle" size="small">
        <CuiIcon slot="start" name="arrow-download" />
        Download role assignments
      </CuiButton>

      {/* Edit columns */}
      <CuiButton appearance="subtle" size="small">
        <CuiIcon
          slot="start"
          url="https://api.iconify.design/fluent:column-edit-24-regular.svg"
          label="Edit columns"
        />
        Edit columns
      </CuiButton>

      {/* Refresh */}
      <CuiButton appearance="subtle" size="small">
        <CuiIcon slot="start" name="arrow-sync" />
        Refresh
      </CuiButton>

      <CuiDivider orientation="vertical" style={{ height: '20px' }} />

      {/* Delete */}
      <CuiButton appearance="subtle" size="small">
        <CuiIcon
          slot="start"
          url="https://api.iconify.design/fluent:delete-24-regular.svg"
          label="Delete"
        />
        Delete
      </CuiButton>

      <CuiDivider orientation="vertical" style={{ height: '20px' }} />

      {/* Feedback */}
      <CuiButton appearance="subtle" size="small">
        <CuiIcon slot="start" name="person-feedback" />
        Feedback
      </CuiButton>
    </CuiToolbar>
    </>
  );
}
