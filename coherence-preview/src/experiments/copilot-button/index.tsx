/**
 * Copilot Button for the Azure Portal header.
 * Uses CuiButton with CSS custom properties for a white pill shape.
 */
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';

const copilotStyles: React.CSSProperties & Record<string, string> = {
  '--button-bg-color': '#ffffff',
  '--button-fg-color': '#242424',
  '--button-border-color': 'transparent',
  '--button-hover-bg-color': '#f0f0f0',
  '--button-border-radius': '3px',
  '--button-padding-x': '12px',
  '--button-content-gap': '5px',
  marginLeft: '12px',
} as any;

export default function CopilotButton({ slot }: { slot?: string }) {
  return (
    <CuiButton
      slot={slot}
      size="medium"
      shape="square"
      style={copilotStyles}
      aria-label="Copilot"
    >
      <CuiIcon slot="start" name="copilot" label="Copilot" />
      Copilot
    </CuiButton>
  );
}
