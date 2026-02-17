/**
 * Copilot Button for the Azure Portal header.
 * Uses standard CuiButton with a white pill shape and the native Coherence copilot icon.
 */
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';

export default function CopilotButton({ slot }: { slot?: string }) {
  return (
    <>
      <style>{`
        .copilot-btn::part(control) {
          background: #fff !important;
          color: #242424 !important;
          border: 1px solid #d1d1d1 !important;
          border-radius: 999px;
          padding: 4px 14px;
          gap: 6px;
        }
        .copilot-btn::part(control):hover {
          background: #f0f0f0 !important;
        }
      `}</style>
      <CuiButton
        slot={slot}
        appearance="outline"
        size="large"
        className="copilot-btn"
        aria-label="Copilot"
      >
        <CuiIcon slot="start" name="copilot" label="Copilot" />
        Copilot
      </CuiButton>
    </>
  );
}
