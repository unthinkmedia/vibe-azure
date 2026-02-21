import { useMemo } from 'react';
import { CuiButton, CuiIcon, CuiMessageBar } from '@charm-ux/cui/react';
import { HealthMetricCard } from '../../patterns/PatternHealthMetricCard';
import {
  agentPools,
  healthMetrics,
  longFailingPipelines,
  recentRuns,
  slowestStages,
  successRate,
  type PipelineStatus,
} from './data';

function statusLabel(status: PipelineStatus): string {
  if (status === 'succeeded') return 'Succeeded';
  if (status === 'failed') return 'Failed';
  return 'In progress';
}

function HealthSummary() {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (successRate / 100) * circumference;

  return (
    <section className="apd-section" aria-labelledby="apd-health-heading">
      <h2 id="apd-health-heading">Pipeline health summary</h2>
      <p className="apd-section-desc">Pass/fail/in-progress counts with an overall success rate for the last 24 hours.</p>
      <div className="apd-health-layout">
        <div className="apd-health-strip">
          {healthMetrics.map((metric) => (
            <HealthMetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              subtext={metric.subtext}
              icon={metric.icon}
              accent={metric.accent}
            />
          ))}
        </div>

        <div className="apd-donut-card" aria-label="Overall success rate donut chart">
          <h3>Overall success rate</h3>
          <div className="apd-donut-wrap">
            <svg width="128" height="128" viewBox="0 0 128 128" role="img" aria-label={`Success rate ${successRate} percent`}>
              <circle cx="64" cy="64" r={radius} fill="none" stroke="var(--neutral-background5)" strokeWidth="12" />
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke="var(--status-success-foreground1)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="apd-donut-center">
              <span className="apd-donut-value">{successRate}%</span>
              <span className="apd-donut-label">Successful</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRuns() {
  const maxDuration = useMemo(() => Math.max(...recentRuns.map((run) => run.durationMinutes)), []);

  return (
    <section className="apd-section" aria-labelledby="apd-timeline-heading">
      <h2 id="apd-timeline-heading">Recent pipeline timeline</h2>
      <p className="apd-section-desc">Recent runs with duration bars, status indicators, and commit context.</p>
      <div className="apd-card">
        <ul className="apd-timeline-list" aria-label="Recent pipeline runs">
          {recentRuns.map((run) => (
            <li key={run.id} className="apd-timeline-item">
              <div className="apd-run-main">
                <div className="apd-run-title-row">
                  <span className="apd-run-name">{run.pipeline}</span>
                  <span className={`apd-status-pill ${run.status}`}>{statusLabel(run.status)}</span>
                </div>
                <div className="apd-run-meta">{run.id} · {run.branch} · {run.startedAt}</div>
                <div className="apd-run-commit">{run.commitMessage}</div>
              </div>
              <div className="apd-run-duration">
                <div className="apd-duration-top">{run.durationMinutes} min</div>
                <div className="apd-duration-track">
                  <div
                    className={`apd-duration-fill ${run.status}`}
                    style={{ width: `${Math.max(10, (run.durationMinutes / maxDuration) * 100)}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SlowestStages() {
  const maxAvg = useMemo(() => Math.max(...slowestStages.map((stage) => stage.avgDurationMinutes)), []);

  return (
    <section className="apd-section" aria-labelledby="apd-stages-heading">
      <h2 id="apd-stages-heading">Slowest stages</h2>
      <p className="apd-section-desc">Longest-running stages by average duration across active pipelines.</p>
      <div className="apd-card">
        <table className="apd-table" aria-label="Slowest stage breakdown">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Avg duration</th>
              <th>P95</th>
              <th>Pipelines</th>
            </tr>
          </thead>
          <tbody>
            {slowestStages.map((stage) => (
              <tr key={stage.stage}>
                <td>
                  <div className="apd-stage-cell">
                    <span>{stage.stage}</span>
                    <div className="apd-stage-track">
                      <div
                        className="apd-stage-fill"
                        style={{ width: `${Math.max(8, (stage.avgDurationMinutes / maxAvg) * 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>{stage.avgDurationMinutes.toFixed(1)} min</td>
                <td>{stage.p95DurationMinutes.toFixed(1)} min</td>
                <td>{stage.pipelineCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AgentPoolUtilization() {
  return (
    <section className="apd-section" aria-labelledby="apd-agents-heading">
      <h2 id="apd-agents-heading">Build agent pool utilization</h2>
      <p className="apd-section-desc">Online, busy, and offline agent availability by pool.</p>
      <div className="apd-card">
        <ul className="apd-agent-list" aria-label="Agent pool utilization">
          {agentPools.map((pool) => {
            const utilization = pool.online === 0 ? 0 : Math.round((pool.busy / pool.online) * 100);
            return (
              <li key={pool.pool} className="apd-agent-item">
                <div>
                  <div className="apd-agent-name">{pool.pool}</div>
                  <div className="apd-agent-meta">
                    Online {pool.online} · Busy {pool.busy} · Offline {pool.offline}
                  </div>
                </div>
                <div className="apd-agent-utilization">
                  <span>{utilization}% busy</span>
                  <div className="apd-agent-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={utilization}>
                    <div className="apd-agent-fill" style={{ width: `${utilization}%` }} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function LongFailureAlert() {
  return (
    <div className="apd-alert-bar">
      <CuiMessageBar intent="warning" shape="square">
        <CuiIcon name="warning" slot="icon" />
        {longFailingPipelines.map((pipeline, index) => (
          <span key={pipeline.pipeline}>
            <strong>{pipeline.pipeline}</strong> failing for {pipeline.failingForHours}h ({pipeline.lastFailureReason})
            {index < longFailingPipelines.length - 1 ? '; ' : '.'}
          </span>
        ))}
        <CuiButton slot="actions" appearance="outline" size="small">Open failing pipelines</CuiButton>
      </CuiMessageBar>
    </div>
  );
}

export default function PageContent() {
  return (
    <div className="apd-content-inner">
      <LongFailureAlert />

      <div className="apd-grid">
        <div>
          <HealthSummary />
          <TimelineRuns />
        </div>
        <div>
          <SlowestStages />
          <AgentPoolUtilization />
        </div>
      </div>
    </div>
  );
}
