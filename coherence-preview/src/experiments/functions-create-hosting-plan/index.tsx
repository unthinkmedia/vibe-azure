import { useState } from 'react';
import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiDivider,
  CuiHeader,
  CuiIcon,
  CuiPersona,
  CuiPopOver,
  CuiRadio,
  CuiRadioGroup,
  CuiSearchBox,
} from '@charm-ux/cui/react';
import CopilotButton from '../copilot-button';
import AzurePortalNav from '../../patterns/PatternAzurePortalNav';
import { hostingPlans, featureRows } from './data';
import { styles } from './styles';

export default function FunctionsCreateHostingPlan() {
  const [selectedPlan, setSelectedPlan] = useState('flex-consumption');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  };

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span style={{ fontSize: 'var(--font-size-base400)', fontWeight: 'var(--font-weight-semi-bold)' }}>Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox
            slot="search"
            hideLabel
            placeholder="Search resources, services and docs"
          />
          <CopilotButton slot="search" />
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Cloud Shell">
            <CuiIcon name="code-regular" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Notifications">
            <CuiIcon name="alert" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Settings">
            <CuiIcon name="settings" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Help + support">
            <CuiIcon name="info" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Feedback">
            <CuiIcon name="person-feedback" />
          </CuiButton>
          <CuiPopOver slot="actions-end" fixedPlacement>
            <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
              <CuiAvatar size={24} name="Connie Wilson" />
            </CuiButton>
            <CuiPersona>
              <CuiAvatar name="Connie Wilson" />
              <div slot="primary">Connie Wilson</div>
              <div slot="secondary">CONTOSO</div>
            </CuiPersona>
            <CuiDivider style={{ margin: '8px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <CuiButton appearance="link">Your profile</CuiButton>
              <CuiButton appearance="link">View account</CuiButton>
              <CuiButton appearance="link">Sign Out</CuiButton>
            </div>
          </CuiPopOver>
        </CuiHeader>

        {/* ─── Global Nav ─── */}
        <AzurePortalNav />

        {/* ─── Main Content ─── */}
        <div slot="main">
          {/* Breadcrumb */}
          <div className="fchp-breadcrumb">
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">
                Create Function App
              </CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Blade header */}
          <div className="fchp-blade-header">
            <h1 className="fchp-blade-title">Create Function App</h1>
            <CuiButton appearance="subtle" iconOnly size="small" aria-label="Favorite">
              <CuiIcon name="star" />
            </CuiButton>
            <CuiButton appearance="subtle" iconOnly size="small" aria-label="More actions">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
            <CuiButton
              className="fchp-blade-close"
              appearance="subtle"
              iconOnly
              size="small"
              aria-label="Close"
            >
              <CuiIcon name="dismiss" />
            </CuiButton>
          </div>

          {/* Scrollable content */}
          <div className="fchp-content">
            <h2 className="fchp-section-title">Select a hosting option</h2>
            <p className="fchp-section-desc">
              These options determine how your app scales, resources available per
              instance, and pricing.{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Learn more about Functions hosting options
              </a>
            </p>

            {/* ─── Comparison Table ─── */}
            <CuiRadioGroup
              name="hosting-plan"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              style={{ display: 'contents' }}
            >
              <table className="fchp-table" role="grid">
                <colgroup>
                  <col style={{ width: 160 }} />
                  {hostingPlans.map((p) => (
                    <col key={p.id} />
                  ))}
                </colgroup>

                {/* ─── Header Row ─── */}
                <thead>
                  <tr>
                    <th className="fchp-label-col fchp-plan-name" style={{ margin: 0 }}>
                      Hosting plans
                    </th>
                    {hostingPlans.map((plan) => (
                      <th
                        key={plan.id}
                        className={`fchp-plan-header ${
                          selectedPlan === plan.id ? 'fchp-selected' : ''
                        }`}
                        onClick={() => setSelectedPlan(plan.id)}
                        role="columnheader"
                      >
                        <CuiRadio value={plan.id} />
                        <div className="fchp-plan-name">{plan.name}</div>
                        <p className="fchp-plan-desc">{plan.description}</p>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* ─── Feature Rows ─── */}
                <tbody>
                  {featureRows.map((feature, idx) => {
                    const isExpanded = expandedRows.has(feature.id);
                    const isLastRow = idx === featureRows.length - 1;

                    return (
                      <FeatureRowGroup
                        key={feature.id}
                        feature={feature}
                        isExpanded={isExpanded}
                        isLastRow={isLastRow}
                        selectedPlan={selectedPlan}
                        onToggle={() => toggleRow(feature.id)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </CuiRadioGroup>
          </div>

          {/* ─── Footer ─── */}
          <div className="fchp-footer">
            <CuiButton appearance="primary">Select</CuiButton>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}

/* ─── Feature Row Sub-component ─── */

function FeatureRowGroup({
  feature,
  isExpanded,
  isLastRow,
  selectedPlan,
  onToggle,
}: {
  feature: (typeof featureRows)[0];
  isExpanded: boolean;
  isLastRow: boolean;
  selectedPlan: string;
  onToggle: () => void;
}) {
  const renderValue = (planId: string) => {
    const val = feature.values[planId];
    if (!val) return <span className="fchp-dash">-</span>;
    switch (val.type) {
      case 'check':
        return (
          <span className="fchp-check">
            <CuiIcon name="checkmark" />
          </span>
        );
      case 'dash':
        return <span className="fchp-dash">-</span>;
      case 'text':
        return <span>{val.value}</span>;
      case 'link':
        return (
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: 'var(--brand-foreground-link)', textDecoration: 'none' }}
          >
            {val.label}
          </a>
        );
      default:
        return null;
    }
  };

  const selectedColClass = (planId: string) => {
    if (selectedPlan !== planId) return '';
    if (isLastRow && !isExpanded) return 'fchp-selected-col-last';
    return 'fchp-selected-col';
  };

  return (
    <>
      {/* Summary row */}
      <tr>
        <td
          className="fchp-label-col fchp-feature-label"
          onClick={onToggle}
          aria-expanded={isExpanded}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle();
            }
          }}
        >
          <div className="fchp-feature-label-content">
            <CuiIcon
              name="chevron-right"
              className={`fchp-chevron ${isExpanded ? 'fchp-expanded' : ''}`}
            />
            <span className={`fchp-label-text ${feature.isLink ? 'fchp-is-link' : ''}`}>
              {feature.label}
            </span>
          </div>
        </td>
        {hostingPlans.map((plan) => (
          <td key={plan.id} className={selectedColClass(plan.id)}>
            {renderValue(plan.id)}
          </td>
        ))}
      </tr>

      {/* Explanation row (expanded) */}
      {isExpanded && (
        <tr className="fchp-explanation-row">
          <td className="fchp-label-col" />
          {hostingPlans.map((plan) => (
            <td
              key={plan.id}
              className={
                selectedPlan === plan.id
                  ? isLastRow
                    ? 'fchp-selected-col-last'
                    : 'fchp-selected-col'
                  : ''
              }
            >
              {feature.explanations[plan.id]}
            </td>
          ))}
        </tr>
      )}
    </>
  );
}
