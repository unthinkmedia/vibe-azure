/**
 * Azure Cost Management + Billing Dashboard
 *
 * Subscription-level cost analysis page with:
 * - Cost breakdown donut chart by service
 * - Daily spend trend bar chart with budget threshold line
 * - Resource group table with sparklines, % change, anomaly badges
 * - Budget alerts panel with progress bars
 * - Advisor cost-optimization recommendations
 * - Copilot suggestions
 */
import { CuiAppFrame, CuiIcon } from '@charm-ux/cui/react';
import AzurePortalHeader from '../../patterns/AzurePortalHeader';
import AzurePortalNav from '../../patterns/PatternAzurePortalNav';
import AzureBreadcrumb from '../../patterns/AzureBreadcrumb';
import PageHeader from '../../patterns/PageHeader';
import { azureIcon } from '../../patterns/azure-icons';
import { costManagementStyles } from './styles';
import {
  serviceCosts,
  totalSpend,
  dailySpend,
  budgetThresholdPerDay,
  resourceGroups,
  budgetAlerts,
  recommendations,
  copilotSuggestions,
} from './data';

/* ─── Helpers ─── */
function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
}

/* ─── SVG Donut ─── */
function DonutChart() {
  const cx = 80, cy = 80, r = 64, circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="cm-donut-layout">
      <div className="cm-donut-wrap">
        <svg width={160} height={160} viewBox="0 0 160 160" aria-label="Cost breakdown by service">
          {serviceCosts.map((s) => {
            const pct = s.cost / totalSpend;
            const dash = pct * circumference;
            const gap = circumference - dash;
            const el = (
              <circle
                key={s.name}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={20}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div className="cm-donut-center">
          <span className="cm-donut-total">{fmt(totalSpend)}</span>
          <span className="cm-donut-label">this month</span>
        </div>
      </div>
      <div className="cm-donut-legend">
        {serviceCosts.map((s) => (
          <div key={s.name} className="cm-legend-item">
            <span className="cm-legend-swatch" style={{ background: s.color }} />
            <span>{s.name}</span>
            <span className="cm-legend-pct">{Math.round((s.cost / totalSpend) * 100)}%</span>
            <span className="cm-legend-cost">{fmt(s.cost)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Bar Chart ─── */
function DailySpendChart() {
  const max = Math.max(...dailySpend.map((d) => d.amount), budgetThresholdPerDay) * 1.1;
  const chartH = 160;
  const budgetY = chartH - (budgetThresholdPerDay / max) * chartH;

  return (
    <div style={{ position: 'relative' }}>
      <div className="cm-bar-chart">
        {dailySpend.map((d) => {
          const h = (d.amount / max) * chartH;
          const over = d.amount > budgetThresholdPerDay;
          return (
            <div key={d.day} className="cm-bar-col" title={`${d.label}: ${fmt(d.amount)}`}>
              <div
                className="cm-bar"
                style={{
                  height: h,
                  background: over ? 'var(--status-danger-foreground1)' : 'var(--brand-background1)',
                }}
              />
              {d.day % 7 === 1 && <span className="cm-bar-label">{d.label}</span>}
            </div>
          );
        })}
        <div className="cm-budget-line" style={{ bottom: `${(budgetThresholdPerDay / max) * 100}%` }} />
        <span className="cm-budget-tag" style={{ bottom: `${(budgetThresholdPerDay / max) * 100 + 1}%` }}>
          Budget: {fmt(budgetThresholdPerDay)}/day
        </span>
      </div>
    </div>
  );
}

/* ─── Sparkline SVG ─── */
function Sparkline({ data, color = 'var(--brand-foreground-link)' }: { data: number[]; color?: string }) {
  const w = 60, h = 20;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 2) - 1;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="cm-sparkline" width={w} height={h} aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

/* ─── Resource Group Table ─── */
function ResourceGroupTable() {
  return (
    <div className="cm-table-wrap">
      <table className="cm-table" role="table">
        <thead>
          <tr>
            <th>Resource Group</th>
            <th>Current Month</th>
            <th>Trend (7d)</th>
            <th>% Change</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {resourceGroups.map((rg) => {
            const change = pctChange(rg.cost, rg.lastMonthCost);
            const up = change > 0;
            return (
              <tr key={rg.name}>
                <td><span className="cm-rg-name">{rg.name}</span></td>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(rg.cost)}</td>
                <td>
                  <Sparkline
                    data={rg.trend}
                    color={up ? 'var(--status-danger-foreground1)' : 'var(--status-success-foreground1)'}
                  />
                </td>
                <td>
                  <span className={up ? 'cm-change-up' : 'cm-change-down'}>
                    {up ? '↑' : '↓'} {Math.abs(change)}%
                  </span>
                </td>
                <td>
                  {rg.anomaly ? (
                    <span className="cm-anomaly-badge">
                      <CuiIcon name="warning" style={{ fontSize: 12 }} />
                      Anomaly
                    </span>
                  ) : (
                    <span style={{ color: 'var(--neutral-foreground3)', fontSize: 'var(--font-size-base200)' }}>Normal</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Budget Alerts ─── */
function BudgetAlerts() {
  return (
    <div className="cm-budget-list">
      {budgetAlerts.map((b) => {
        const pct = Math.round((b.spent / b.budget) * 100);
        return (
          <div key={b.name} className="cm-budget-item">
            <div className="cm-budget-header">
              <span className="cm-budget-name">{b.name}</span>
              <span className="cm-budget-amount">{fmt(b.spent)} of {fmt(b.budget)}</span>
            </div>
            <div className="cm-progress-track">
              <div
                className={`cm-progress-fill ${b.status}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <span className={`cm-budget-pct ${b.status}`}>{pct}% used</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Recommendations ─── */
function Recommendations() {
  return (
    <div className="cm-rec-list">
      {recommendations.map((rec) => (
        <div key={rec.title} className="cm-rec-item">
          <div className="cm-rec-icon">
            <CuiIcon name={rec.icon} />
          </div>
          <div className="cm-rec-body">
            <div className="cm-rec-title">{rec.title}</div>
            <div className="cm-rec-desc">{rec.description}</div>
          </div>
          <span className="cm-rec-savings">{rec.savings}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function CostManagementDashboard() {
  return (
    <CuiAppFrame>
      <AzurePortalHeader />
      <AzurePortalNav />

      <div slot="main" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', background: 'var(--neutral-background2)' }}>
        <style>{costManagementStyles}</style>

        <AzureBreadcrumb items={['Home', 'Cost Management + Billing', 'Cost analysis']} padding="32px" />

        <PageHeader
          title="Cost Management | Cost analysis"
          subtitle="Subscription: Visual Studio Enterprise — 9a3b…f1e2"
          icon={azureIcon('cost-management')}
          showFavorite
          copilotSuggestions={copilotSuggestions}
          maxVisibleSuggestions={3}
        />

        <div className="cm-dashboard">
          {/* Row 1: Donut + Daily Spend */}
          <div className="cm-card">
            <h2 className="cm-card-title">Cost breakdown by service</h2>
            <DonutChart />
          </div>

          <div className="cm-card">
            <h2 className="cm-card-title">Daily spend — March 2026</h2>
            <DailySpendChart />
          </div>

          {/* Row 2: Resource Group Table (full width) */}
          <div className="cm-card cm-full-width">
            <h2 className="cm-card-title">Resource groups by cost</h2>
            <ResourceGroupTable />
          </div>

          {/* Row 3: Budget Alerts + Recommendations */}
          <div className="cm-card">
            <h2 className="cm-card-title">Budget alerts</h2>
            <BudgetAlerts />
          </div>

          <div className="cm-card">
            <h2 className="cm-card-title">
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CuiIcon url={azureIcon('advisor')} style={{ fontSize: 18 }} />
                Advisor recommendations
              </span>
            </h2>
            <Recommendations />
          </div>
        </div>
      </div>
    </CuiAppFrame>
  );
}
