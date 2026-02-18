import { useState, FormEvent } from 'react';
import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiDivider,
  CuiDrawer,
  CuiHeader,
  CuiIcon,
  CuiInput,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSelect,
  CuiSideNav,
  CuiTab,
  CuiTabPanel,
  CuiTabs,
} from '@charm-ux/cui/react';
import CopilotButton from '../../copilot-button';
import PageHeader from '../../../patterns/PageHeader';
import {
  resourceTypeLabel,
  tabLabels,
  pricingTiers,
  regions,
  subscriptions,
  resourceGroups,
} from '../data';
import { styles } from '../styles';

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('basics');

  const navigateToBrowse = () => {
    window.location.hash = 'apim-flow';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.hash = 'apim-flow/overview';
  };

  const navigateToNext = () => {
    const tabOrder = Object.keys(tabLabels);
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const navigateToPrev = () => {
    const tabOrder = Object.keys(tabLabels);
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const nextTabLabel = () => {
    const tabOrder = Object.keys(tabLabels) as (keyof typeof tabLabels)[];
    const currentIndex = tabOrder.indexOf(activeTab as keyof typeof tabLabels);
    if (currentIndex < tabOrder.length - 1) {
      return `Next: ${tabLabels[tabOrder[currentIndex + 1]]} >`;
    }
    return null;
  };

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox slot="search" hideLabel placeholder="Search resources, services, and docs (G+/)" />
          <CopilotButton slot="search" />
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Cloud Shell">
            <CuiIcon url="https://api.iconify.design/fluent:terminal-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Notifications">
            <CuiIcon name="alert" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Settings">
            <CuiIcon name="settings" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Help + support">
            <CuiIcon url="https://api.iconify.design/fluent:question-circle-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Feedback">
            <CuiIcon name="person-feedback" />
          </CuiButton>
          <CuiPopOver slot="actions-end" fixedPlacement>
            <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
              <CuiAvatar size={24} name="Alex Britez" />
            </CuiButton>
            <CuiPersona>
              <CuiAvatar name="Alex Britez" />
              <div slot="primary">alexbritez@microsoft.co...</div>
              <div slot="secondary">MICROSOFT (MICROSOFT.ONM...)</div>
            </CuiPersona>
            <CuiDivider className="my-xl" />
            <div className="d-flex flex-column align-start">
              <CuiButton appearance="link">Your profile</CuiButton>
              <CuiButton appearance="link">View account</CuiButton>
              <CuiButton appearance="link">Sign Out</CuiButton>
            </div>
          </CuiPopOver>
        </CuiHeader>

        <CuiDrawer slot="navigation" id="navigation-drawer" inline position="start" breakpoint="686px" open>
          <CuiSideNav size="small">
            <CuiNavItem label="Home" href="#apim-flow">
              <CuiIcon slot="icon" url="https://api.iconify.design/fluent:home-24-regular.svg" selectedUrl="https://api.iconify.design/fluent:home-24-filled.svg" />
            </CuiNavItem>
          </CuiSideNav>
        </CuiDrawer>

        <div slot="main" style={{ position: 'relative' }}>
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem>
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} style={{ color: 'var(--brand-foreground-link)', textDecoration: 'none' }}>
                  Home
                </a>
              </CuiBreadcrumbItem>
              <CuiBreadcrumbItem>
                <a href="#apim-flow" style={{ color: 'var(--brand-foreground-link)', textDecoration: 'none' }}>
                  API Management services
                </a>
              </CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">Create {resourceTypeLabel}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          <PageHeader
            title={`Create ${resourceTypeLabel}`}
            subtitle={resourceTypeLabel}
          />

          <div className="close-button">
            <CuiButton appearance="subtle" iconOnly size="small" aria-label="Close" onClick={navigateToBrowse}>
              <CuiIcon name="dismiss" />
            </CuiButton>
          </div>

          <CuiDivider style={{ margin: '12px 0 0' }} />

          <form onSubmit={handleSubmit}>
            <div style={{ padding: '0 32px' }}>
              <CuiTabs
                activeId={activeTab}
                onTabsChange={(e: any) => setActiveTab(e.detail?.id || 'basics')}
              >
                <CuiTab id="basics">{tabLabels.basics}</CuiTab>
                <CuiTab id="monitor">{tabLabels.monitor}</CuiTab>
                <CuiTab id="networking">{tabLabels.networking}</CuiTab>
                <CuiTab id="identity">{tabLabels.identity}</CuiTab>
                <CuiTab id="tags">{tabLabels.tags}</CuiTab>
                <CuiTab id="review">{tabLabels.review}</CuiTab>

                <CuiTabPanel id="basics">
                  <div className="form-section">
                    <h3>Project details</h3>
                    <p style={{ color: 'var(--neutral-foreground2)', fontSize: 13, margin: '0 0 16px' }}>
                      Select the subscription to manage deployed resources and costs. Use resource groups like folders to organize and manage all your resources.
                    </p>
                    <div className="field-single">
                      <CuiSelect label="Subscription" name="subscription" required>
                        {subscriptions.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </CuiSelect>
                    </div>
                    <div className="field-single">
                      <CuiSelect label="Resource group" name="resourceGroup" required>
                        {resourceGroups.map(rg => (
                          <option key={rg.value} value={rg.value}>{rg.label}</option>
                        ))}
                      </CuiSelect>
                    </div>
                    <a href="#" className="create-new-link">Create new</a>

                    <CuiDivider style={{ margin: '8px 0 24px' }} />

                    <h3>Instance details</h3>
                    <div className="field-single">
                      <CuiSelect label="Region" name="region" required>
                        {regions.map(r => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </CuiSelect>
                    </div>
                    <div className="field-single">
                      <CuiInput label="Resource name" name="resourceName" required />
                    </div>
                    <div className="field-single">
                      <CuiInput label="Organization name" name="orgName" required placeholder="Enter organization name" />
                    </div>
                    <div className="field-single">
                      <CuiInput label="Administrator email" name="adminEmail" required placeholder="Enter administrator email" type="email" />
                    </div>

                    <CuiDivider style={{ margin: '8px 0 24px' }} />

                    <h3>Pricing tier</h3>
                    <p className="pricing-description">
                      API Management pricing tiers vary in computing capacity per unit and the offered feature set.{' '}
                      <a href="#" className="learn-more-link">Learn more ↗</a>
                    </p>
                    <div className="field-single">
                      <CuiSelect label="Pricing tier" name="pricingTier" required>
                        {pricingTiers.map(pt => (
                          <option key={pt.value} value={pt.value}>{pt.label}</option>
                        ))}
                      </CuiSelect>
                    </div>
                    <a href="#" className="learn-more-link" style={{ marginBottom: 16, display: 'inline-block' }}>
                      View all pricing tiers
                    </a>
                    <p className="pricing-note">
                      Add API Management service units to accommodate more API traffic without changing the pricing tier.{' '}
                      <a href="#" className="learn-more-link">Learn more ↗</a>
                    </p>
                  </div>
                </CuiTabPanel>

                <CuiTabPanel id="monitor">
                  <div className="form-section">
                    <h3>Monitor + secure</h3>
                    <p style={{ color: 'var(--neutral-foreground2)' }}>Configure monitoring and security options.</p>
                  </div>
                </CuiTabPanel>

                <CuiTabPanel id="networking">
                  <div className="form-section">
                    <h3>Networking</h3>
                    <p style={{ color: 'var(--neutral-foreground2)' }}>Configure network connectivity.</p>
                  </div>
                </CuiTabPanel>

                <CuiTabPanel id="identity">
                  <div className="form-section">
                    <h3>Managed identity</h3>
                    <p style={{ color: 'var(--neutral-foreground2)' }}>Configure managed identity settings.</p>
                  </div>
                </CuiTabPanel>

                <CuiTabPanel id="tags">
                  <div className="form-section">
                    <h3>Tags</h3>
                    <p style={{ color: 'var(--neutral-foreground2)', marginBottom: 16 }}>
                      Tags are name/value pairs that enable you to categorize resources and view consolidated billing.
                    </p>
                    <div className="field-row">
                      <CuiInput label="Name" name="tagName" placeholder="e.g. Environment" />
                      <CuiInput label="Value" name="tagValue" placeholder="e.g. Production" />
                    </div>
                  </div>
                </CuiTabPanel>

                <CuiTabPanel id="review">
                  <div className="form-section">
                    <h3>Review + install</h3>
                    <p style={{ color: 'var(--neutral-foreground2)' }}>Review your selections before creating.</p>
                  </div>
                </CuiTabPanel>
              </CuiTabs>
            </div>

            <div className="form-actions">
              <CuiButton appearance="primary" type="submit">Review + create</CuiButton>
              <CuiButton appearance="outline" type="button" onClick={navigateToPrev}>
                <CuiIcon slot="start" name="chevron-left" style={{ fontSize: 12 }} />
                Previous
              </CuiButton>
              {nextTabLabel() && (
                <CuiButton appearance="outline" type="button" onClick={navigateToNext}>
                  {nextTabLabel()}
                </CuiButton>
              )}
            </div>
          </form>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
