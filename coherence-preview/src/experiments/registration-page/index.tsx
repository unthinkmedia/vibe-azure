import {
  CuiAppFrame,
  CuiButton,
  CuiHeader,
} from '@charm-ux/cui/react';
import { headerTitle } from './data';
import AzurePortalNav from '../../patterns/PatternAzurePortalNav';
import { PageContent } from './PageContent';

export default function RegistrationPage() {
  return (
    <CuiAppFrame skipToMainText="Skip to main content">
      <CuiHeader slot="header" navigationIconLabel="toggle navigation">
        <CuiButton slot="title" appearance="transparent">
          <span className="font-base400">{headerTitle}</span>
        </CuiButton>
      </CuiHeader>

      {/* ─── Global Navigation (hamburger menu) ─── */}
      <AzurePortalNav />

      <div slot="main">
        <PageContent />
      </div>
    </CuiAppFrame>
  );
}
