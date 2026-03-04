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
  CuiSearchBox,
} from '@charm-ux/cui/react';
import CopilotButton from '../copilot-button';
import { azureIcon } from '../../patterns/azure-icons';
import PageHeader from '../../patterns/PageHeader';
import AzurePortalNav from '../../patterns/PatternAzurePortalNav';
import { HealthMetricCard } from '../../patterns/PatternHealthMetricCard';
import { agents, recentActivity, copilotSuggestions } from './data';
import type { AgentStatus, ActivityEntry } from './data';
import { styles } from './styles';

type StatusFilter = 'all' | AgentStatus;

export default function AgentMonitor() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchText, setSearchText] = useState('');

  const healthyCount = agents.filter(a => a.status === 'healthy').length;
  const degradedCount = agents.filter(a => a.status === 'degraded').length;
  const offlineCount = agents.filter(a => a.status === 'offline').length;
  const totalInvocations = agents.reduce((sum, a) => sum + a.invocations24h, 0);

  const filteredAgents = agents.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (searchText && !a.name.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  const filteredActivity = statusFilter === 'all'
    ? recentActivity
    : recentActivity.filter(e => {
        const agent = agents.find(a => a.name === e.agentName);
        return agent && agent.status === statusFilter;
      });

  return (
    <>
      <style>{styles}</style>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ── Header ── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span style={{ fontWeight: 'var(--font-weight-semi-bold)' as string, fontSize: 'var(--font-size-base400)' as string }}>Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox
            slot="search"
            hideLabel
            placeholder="Search resources, services, and docs (G+/)"
          />
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
          <CuiPopOver slot="actions-end" fixedPlacement>
            <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
              <CuiAvatar size={24} name="Alex Britez" />
            </CuiButton>
            <CuiPersona>
              <CuiAvatar name="Alex Britez" />
              <div slot="primary">alexbritez@microsoft.co...</div>
              <div slot="secondary">MICROSOFT</div>
            </CuiPersona>
            <CuiDivider className="my-xl" />
            <div className="d-flex flex-column align-start">
              <CuiButton appearance="link">View account</CuiButton>
              <CuiButton appearance="link">Sign Out</CuiButton>
            </div>
          </CuiPopOver>
        </CuiHeader>

        {/* ── Global Navigation ── */}
        <AzurePortalNav />

        {/* ── Main Content (full-width, no section side nav) ── */}
        <div slot="main" style={{ height: '100%', width: '100%', minWidth: 0, overflow: 'hidden' }}>
          <div className="am-content">
            {/* Breadcrumb */}
            <CuiBreadcrumb style={{ padding: '8px 32px 0' }}>
              <CuiBreadcrumbItem>Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem>Monitor</CuiBreadcrumbItem>
              <CuiBreadcrumbItem current="page">Agent Monitoring</CuiBreadcrumbItem>
            </CuiBreadcrumb>

            {/* Page Header */}
            <PageHeader
              title="Agent Monitoring"
              subtitle="Monitor all AI agents — status, performance, and recent activity"
              icon={azureIcon('monitor')}
              showFavorite
              copilotSuggestions={copilotSuggestions}
              maxVisibleSuggestions={2}
            />

            <CuiDivider style={{ margin: '0 32px 16px' }} />

            <div className="am-centered" style={{ paddingTop: 0 }}>
              {/* ── KPI Summary Row ── */}
              <div className="am-kpi-row">
                <HealthMetricCard
                  label="Total Agents"
                  value={agents.length}
                  subtext="Registered"
                  icon="bot"
                  accent="brand"
                />
                <HealthMetricCard
                  label="Healthy"
                  value={healthyCount}
                  subtext={`${Math.round((healthyCount / agents.length) * 100)}% of total`}
                  icon="checkmark-circle"
                  accent="success"
                />
                <HealthMetricCard
                  label="Degraded / Offline"
                  value={degradedCount + offlineCount}
                  subtext={`${degradedCount} degraded, ${offlineCount} offline`}
                  icon="warning"
                  accent="danger"
                />
                <HealthMetricCard
                  label="Invocations (24h)"
                  value={totalInvocations}
                  subtext="Across all agents"
                  icon="arrow-trending-lines"
                  accent="brand"
                />
              </div>

              {/* ── Agent Cards ── */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 className="am-section-title" style={{ margin: 0 }}>Agents</h2>
                <div className="am-filter-pills">
                  {(['all', 'healthy', 'degraded', 'offline'] as StatusFilter[]).map(f => (
                    <button
                      key={f}
                      className={`am-filter-pill${statusFilter === f ? ' active' : ''}`}
                      onClick={() => setStatusFilter(f)}
                    >
                      {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="am-agents-grid">
                {filteredAgents.map(agent => (
                  <div key={agent.id} className="am-agent-card">
                    <div className="am-agent-card-header">
                      <span className={`am-agent-status-dot ${agent.status}`} />
                      <span className="am-agent-name">{agent.name}</span>
                      <span className={`am-agent-status-badge ${agent.status}`}>{agent.status}</span>
                    </div>
                    <div className="am-agent-desc">{agent.description}</div>
                    <div className="am-agent-meta">
                      <span className="am-agent-meta-item">
                        <CuiIcon name="clock" style={{ fontSize: 12 }} />
                        {agent.lastActive}
                      </span>
                      <span className="am-agent-meta-item">
                        <CuiIcon name="arrow-trending-lines" style={{ fontSize: 12 }} />
                        {agent.invocations24h} calls
                      </span>
                      <span className="am-agent-meta-item">
                        <CuiIcon name="timer" style={{ fontSize: 12 }} />
                        {(agent.avgLatencyMs / 1000).toFixed(1)}s avg
                      </span>
                      <span className="am-agent-meta-item">
                        {agent.successRate}% success
                      </span>
                    </div>
                  </div>
                ))}
                {filteredAgents.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', padding: 24, textAlign: 'center', color: 'var(--neutral-foreground3)' }}>
                    No agents match the current filter.
                  </div>
                )}
              </div>

              {/* ── Recent Activity ── */}
              <h2 className="am-section-title">Recent Activity</h2>
              <table className="am-activity-table" aria-label="Recent agent activity">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Timestamp</th>
                    <th>Duration</th>
                    <th>Result</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivity.map(entry => (
                    <tr key={entry.id}>
                      <td style={{ fontWeight: 'var(--font-weight-semi-bold)' as string }}>{entry.agentName}</td>
                      <td>{entry.timestamp}</td>
                      <td className="am-duration">{(entry.durationMs / 1000).toFixed(1)}s</td>
                      <td>
                        <span className={`am-result-badge ${entry.result}`}>
                          {entry.result === 'success' && <CuiIcon name="checkmark" style={{ fontSize: 12 }} />}
                          {entry.result === 'failure' && <CuiIcon name="dismiss" style={{ fontSize: 12 }} />}
                          {entry.result === 'timeout' && <CuiIcon name="clock" style={{ fontSize: 12 }} />}
                          {entry.result}
                        </span>
                      </td>
                      <td className="am-summary" title={entry.summary}>{entry.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CuiAppFrame>
    </>
  );
}
