import { CuiCard, CuiIcon } from '@charm-ux/cui/react';

export default function AzureFunctionCard() {
  return (
    <CuiCard
      appearance="outline"
      heading="Azure Function"
      style={{
        maxWidth: '320px',
        borderLeft: '3px solid var(--brand-background-1)',
      }}
    >
      <CuiIcon
        slot="media-start"
        name="flash"
        label="Azure Function icon"
        style={{
          fontSize: '32px',
          color: 'var(--brand-background-1)',
        }}
      />
      <p style={{ margin: 0, color: 'var(--neutral-foreground-2)' }}>
        A serverless compute service that lets you run event-triggered code
        without having to explicitly provision or manage infrastructure.
      </p>
    </CuiCard>
  );
}
