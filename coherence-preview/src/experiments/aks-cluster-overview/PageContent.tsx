// @ts-nocheck
import { useState } from 'react';
import {
  CuiBadge,
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiMessageBar,
  CuiToolbar,
} from '@charm-ux/cui/react';
import {
  clusterHealth,
  essentialsData,
  nodePools,
  recentDeployments,
  NodePool,
  Deployment,
} from './data';

function barColorClass(percent: number): string {
  if (percent >= 80) return 'high';
  if (percent >= 50) return 'medium';
  return 'low';
}

function NodePoolCard({ pool }: { pool: NodePool }) {
  return (
    <CuiCard appearance="outline" className="nodepool-card">
      <div className="nodepool-header">
        <span className="nodepool-name">{pool.name}</span>
        <span className={`nodepool-mode-badge ${pool.mode.toLowerCase()}`}>{pool.mode}</span>
      </div>
      <div className="nodepool-meta">
        <span>{pool.vmSize}</span>
        <span>{pool.nodeCount}/{pool.maxNodes} nodes</span>
        <span>{pool.osType}</span>
      </div>

      <div className="nodepool-bar-group">
        <div className="nodepool-bar-label">
          <span>CPU</span>
          <span>{pool.cpuPercent}%</span>
        </div>
        <div className="nodepool-bar-track">
          <div
            className={`nodepool-bar-fill ${barColorClass(pool.cpuPercent)}`}
            style={{ width: `${pool.cpuPercent}%` }}
          />
        </div>
      </div>

      <div className="nodepool-bar-group">
        <div className="nodepool-bar-label">
          <span>Memory</span>
          <span>{pool.memoryPercent}%</span>
        </div>
        <div className="nodepool-bar-track">
          <div
            className={`nodepool-bar-fill ${barColorClass(pool.memoryPercent)}`}
            style={{ width: `${pool.memoryPercent}%` }}
          />
        </div>
      </div>

      <div className={`nodepool-status ${pool.status === 'Ready' ? 'ready' : pool.status === 'Scaling' ? 'scaling' : 'notready'}`}>
        <span className={`status-dot ${pool.status === 'Ready' ? 'success' : pool.status === 'Scaling' ? 'warning' : 'error'}`} />
        {pool.status}
      </div>
    </CuiCard>
  );
}

function deployBadgeClass(status: string): string {
  switch (status) {
    case 'Succeeded': return 'succeeded';
    case 'In Progress': return 'in-progress';
    case 'Failed': return 'failed';
    default: return 'pending';
  }
}

export default function PageContent() {
  const [showCertWarning, setShowCertWarning] = useState(true);

  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Cluster actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:plug-connected-24-regular.svg" />
            Connect
          </CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:arrow-clockwise-24-regular.svg" />
            Start
          </CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:stop-24-regular.svg" />
            Stop
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="delete" />
            Delete
          </CuiButton>
        </CuiToolbar>
      </div>

      <CuiDivider style={{ margin: '0' }} />

      {/* ─── Certificate Warning ─── */}
      <div style={{ padding: '12px 32px 0' }}>
        <CuiMessageBar
          intent="warning"
          shape="square"
          dismissible
          open={showCertWarning}
          onMessageBarHide={() => setShowCertWarning(false)}
        >
          <CuiIcon slot="icon" name="warning" />
          The cluster TLS certificate expires in <strong>14 days</strong> (March 4, 2026).
          Rotate certificates now to avoid disruption.{' '}
          <CuiButton appearance="link">Rotate certificates</CuiButton>
        </CuiMessageBar>
      </div>

      <div className="content-area">
        {/* ─── Essentials Panel ─── */}
        <div className="essentials">
          {essentialsData.map((row) => (
            <div key={row.label} className="essentials-row">
              <span className="essentials-label">{row.label}</span>
              <span className="essentials-value">
                {row.status && <span className={`status-dot ${row.status}`} />}
                {row.href ? <a href={row.href}>{row.value}</a> : row.value}
              </span>
            </div>
          ))}
        </div>

        {/* ─── Cluster Health Summary ─── */}
        <h2 className="section-title">Cluster Health</h2>
        <CuiCard appearance="outline" className="health-card">
          <div className="health-grid">
            <div className="health-metric">
              <p className="health-metric-label">Status</p>
              <div className={`health-status-badge ${clusterHealth.overallStatus.toLowerCase()}`}>
                <span className={`status-dot ${clusterHealth.overallStatus === 'Healthy' ? 'success' : clusterHealth.overallStatus === 'Warning' ? 'warning' : 'error'}`} />
                {clusterHealth.overallStatus}
              </div>
            </div>
            <div className="health-metric">
              <p className="health-metric-label">API Server</p>
              <div className="health-metric-value" style={{ color: 'var(--status-success-foreground1)', fontSize: 16 }}>
                <span className="status-dot success" />
                {clusterHealth.apiServerStatus}
              </div>
            </div>
            <div className="health-metric">
              <p className="health-metric-label">Nodes</p>
              <div className="health-metric-value">
                {clusterHealth.nodeHealthy}<span style={{ color: 'var(--neutral-foreground3)', fontWeight: 'var(--font-weight-regular)', fontSize: 16 }}>/{clusterHealth.nodeTotal}</span>
              </div>
              <p className="health-metric-sub">healthy</p>
            </div>
            <div className="health-metric">
              <p className="health-metric-label">Pods</p>
              <div className="health-metric-value">
                {clusterHealth.podRunning}<span style={{ color: 'var(--neutral-foreground3)', fontWeight: 'var(--font-weight-regular)', fontSize: 16 }}>/{clusterHealth.podTotal}</span>
              </div>
              <p className="health-metric-sub">running</p>
            </div>
            <div className="health-metric">
              <p className="health-metric-label">Uptime</p>
              <div className="health-metric-value" style={{ fontSize: 18 }}>
                {clusterHealth.uptime}
              </div>
              <p className="health-metric-sub">v{clusterHealth.kubernetesVersion}</p>
            </div>
          </div>
        </CuiCard>

        {/* ─── Node Pool Utilization ─── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            Node Pools ({nodePools.length})
          </h2>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="add" />
            Add node pool
          </CuiButton>
        </div>
        <div className="nodepool-grid">
          {nodePools.map((pool) => (
            <NodePoolCard key={pool.name} pool={pool} />
          ))}
        </div>

        {/* ─── Recent Deployments ─── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            Recent Deployments
          </h2>
          <CuiButton appearance="subtle" size="small">View all workloads</CuiButton>
        </div>
        <table className="deployments-table">
          <thead>
            <tr>
              <th>Deployment</th>
              <th>Namespace</th>
              <th>Status</th>
              <th>Replicas</th>
              <th>Image</th>
              <th>Last updated</th>
              <th>Initiated by</th>
            </tr>
          </thead>
          <tbody>
            {recentDeployments.map((dep) => (
              <tr key={dep.name}>
                <td>
                  <a href="#" className="deployment-name-link">{dep.name}</a>
                </td>
                <td><span className="namespace-tag">{dep.namespace}</span></td>
                <td>
                  <span className={`deploy-badge ${deployBadgeClass(dep.status)}`}>
                    {dep.status === 'Succeeded' && <CuiIcon name="checkmark" style={{ fontSize: 12 }} />}
                    {dep.status === 'Failed' && <CuiIcon name="dismiss" style={{ fontSize: 12 }} />}
                    {dep.status === 'In Progress' && <CuiIcon name="arrow-sync" style={{ fontSize: 12 }} />}
                    {dep.status === 'Pending' && <CuiIcon name="clock" style={{ fontSize: 12 }} />}
                    {dep.status}
                  </span>
                </td>
                <td>{dep.replicas}</td>
                <td style={{ fontFamily: 'var(--font-family-monospace)', fontSize: 'var(--font-size-base200)' }}>
                  {dep.image}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{dep.lastUpdated}</td>
                <td>{dep.initiatedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
