// @ts-nocheck
import { useState, FormEvent } from 'react';
import {
  CuiButton,
  CuiDivider,
  CuiInput,
  CuiSelect,
  CuiTab,
  CuiTabPanel,
  CuiTabs,
} from '@charm-ux/cui/react';

/** TODO: Add form fields per tab, connect review to summarize inputs */
export default function PageContent() {
  const [activeTab, setActiveTab] = useState('basics');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ padding: '0 32px' }}>
        <CuiTabs
          activeId={activeTab}
          onTabsChange={(e: any) => setActiveTab(e.detail?.id || 'basics')}
        >
          <CuiTab id="basics">Basics</CuiTab>
          <CuiTab id="networking">Networking</CuiTab>
          <CuiTab id="advanced">Advanced</CuiTab>
          <CuiTab id="tags">Tags</CuiTab>
          <CuiTab id="review">Review + create</CuiTab>

          {/* ─── Basics Tab ─── */}
          <CuiTabPanel id="basics">
            <div className="form-section">
              <h3>Project details</h3>
              <div className="field-single">
                <CuiSelect label="Subscription" name="subscription" required>
                  <option value="">Select a subscription</option>
                  <option value="sub-1">Azure subscription 1</option>
                  <option value="sub-2">Visual Studio Enterprise</option>
                </CuiSelect>
              </div>
              <div className="field-single">
                <CuiSelect label="Resource group" name="resourceGroup" required>
                  <option value="">Select a resource group</option>
                  <option value="rg-1">rg-production</option>
                  <option value="rg-2">rg-development</option>
                </CuiSelect>
              </div>

              <CuiDivider style={{ margin: '8px 0 24px' }} />

              <h3>Instance details</h3>
              <div className="field-single">
                <CuiInput
                  label="Name"
                  name="name"
                  required
                  placeholder="Enter a unique name"
                />
              </div>
              <div className="field-row">
                <CuiSelect label="Region" name="region" required>
                  <option value="">(US) East US</option>
                  <option value="westus">(US) West US</option>
                  <option value="westeurope">(Europe) West Europe</option>
                  <option value="southeastasia">(Asia Pacific) Southeast Asia</option>
                </CuiSelect>
              </div>
            </div>
          </CuiTabPanel>

          {/* ─── Networking Tab ─── */}
          <CuiTabPanel id="networking">
            <div className="form-section">
              <h3>Network configuration</h3>
              <p style={{ color: 'var(--neutral-foreground2)' }}>
                Configure networking options for this resource.
              </p>
            </div>
          </CuiTabPanel>

          {/* ─── Advanced Tab ─── */}
          <CuiTabPanel id="advanced">
            <div className="form-section">
              <h3>Advanced settings</h3>
              <p style={{ color: 'var(--neutral-foreground2)' }}>
                Configure advanced settings.
              </p>
            </div>
          </CuiTabPanel>

          {/* ─── Tags Tab ─── */}
          <CuiTabPanel id="tags">
            <div className="form-section">
              <h3>Tags</h3>
              <p style={{ color: 'var(--neutral-foreground2)', marginBottom: 16 }}>
                Tags are name/value pairs that enable you to categorize resources.
              </p>
              <div className="field-row">
                <CuiInput label="Name" name="tagName" placeholder="e.g. Environment" />
                <CuiInput label="Value" name="tagValue" placeholder="e.g. Production" />
              </div>
            </div>
          </CuiTabPanel>

          {/* ─── Review Tab ─── */}
          <CuiTabPanel id="review">
            <div className="form-section">
              <h3>Review + create</h3>
              <p style={{ color: 'var(--neutral-foreground2)' }}>
                Review your selections before creating the resource.
              </p>
            </div>
          </CuiTabPanel>
        </CuiTabs>
      </div>

      {/* Bottom actions bar */}
      <div className="form-actions">
        <CuiButton appearance="primary" type="submit">
          Review + create
        </CuiButton>
        <CuiButton appearance="outline">Previous</CuiButton>
        <CuiButton appearance="outline">Next</CuiButton>
        <CuiButton appearance="subtle">Download a template for automation</CuiButton>
      </div>
    </form>
  );
}
