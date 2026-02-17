import {
  CuiAppFrame,
  CuiButton,
  CuiDrawer,
  CuiHeader,
} from '@charm-ux/cui/react';
import { headerTitle } from './data';
import { Navigation } from './Navigation';
import { PageContent } from './PageContent';

export default function RegistrationPage() {
  return (
    <CuiAppFrame skipToMainText="Skip to main content">
      <CuiHeader slot="header">
        <CuiButton slot="title" appearance="transparent">
          <span className="font-base400">{headerTitle}</span>
        </CuiButton>
      </CuiHeader>

      <CuiDrawer slot="navigation" inline open position="start" breakpoint="686px">
        <Navigation />
      </CuiDrawer>

      <div slot="main">
        <PageContent />
      </div>
    </CuiAppFrame>
  );
}
