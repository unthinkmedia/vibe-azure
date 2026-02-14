/**
 * Copilot Button for the Azure Portal header.
 * Uses standard CuiButton with a white pill shape and the multicolor sparkle icon.
 */
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';

const copilotSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L11.1 6.05C11.35 6.95 11.95 7.7 12.75 8.15L16 10L12.75 11.85C11.95 12.3 11.35 13.05 11.1 13.95L10 18L8.9 13.95C8.65 13.05 8.05 12.3 7.25 11.85L4 10L7.25 8.15C8.05 7.7 8.65 6.95 8.9 6.05L10 2Z" fill="url(%23cg1)"/><path d="M15 2L15.55 3.8C15.68 4.2 15.97 4.55 16.35 4.75L18 5.5L16.35 6.25C15.97 6.45 15.68 6.8 15.55 7.2L15 9L14.45 7.2C14.32 6.8 14.03 6.45 13.65 6.25L12 5.5L13.65 4.75C14.03 4.55 14.32 4.2 14.45 3.8L15 2Z" fill="url(%23cg2)"/><defs><linearGradient id="cg1" x1="4" y1="2" x2="16" y2="18" gradientUnits="userSpaceOnUse"><stop stop-color="%236656D6"/><stop offset=".5" stop-color="%23C45AB3"/><stop offset="1" stop-color="%23E6804D"/></linearGradient><linearGradient id="cg2" x1="12" y1="2" x2="18" y2="9" gradientUnits="userSpaceOnUse"><stop stop-color="%236656D6"/><stop offset=".5" stop-color="%23C45AB3"/><stop offset="1" stop-color="%23E6804D"/></linearGradient></defs></svg>`;

const copilotIconUrl = `data:image/svg+xml,${copilotSvg}`;

export default function CopilotButton({ slot }: { slot?: string }) {
  return (
    <>
      <style>{`
        .copilot-btn::part(control) {
          background: #fff;
          color: #242424;
          border: 1px solid #d1d1d1;
          border-radius: 999px;
          padding: 4px 14px;
          gap: 6px;
        }
        .copilot-btn::part(control):hover {
          background: #f5f5f5;
        }
      `}</style>
      <CuiButton
        slot={slot}
        appearance="subtle"
        size="large"
        className="copilot-btn"
        aria-label="Copilot"
      >
        <CuiIcon slot="start" url={copilotIconUrl} label="Copilot" />
        Copilot
      </CuiButton>
    </>
  );
}
