import { useState, useEffect, useRef } from 'react';

interface DesignIntent {
  experimentId: string;
  title: string;
  vision: string;
  problem: string;
  successCriteria: string[];
  nonGoals: string[];
  constraints: string[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'completed' | 'abandoned';
}

// Vite glob import — eagerly loads all intent.json files at build time
const intentModules = import.meta.glob<DesignIntent>(
  './experiments/*/intent.json',
  { eager: true, import: 'default' },
);

function getIntent(experimentId: string): DesignIntent | null {
  const key = `./experiments/${experimentId}/intent.json`;
  return intentModules[key] ?? null;
}

type Props = { experimentId: string };

const STATUS_COLORS: Record<string, string> = {
  draft: '#ca5010',
  active: '#0078d4',
  completed: '#107c10',
  abandoned: '#8a8886',
};

export default function IntentButton({ experimentId }: Props) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<DesignIntent | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIntent(getIntent(experimentId));
  }, [experimentId]);

  const statusColor = intent ? (STATUS_COLORS[intent.status] ?? '#8a8886') : '#8a8886';

  // When no intent exists, show a "Create Intent" button that prompts the user
  if (!intent) {
    return (
      <>
        <button
          ref={btnRef}
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            fontSize: 13,
            fontWeight: 500,
            color: '#ca5010',
            background: 'var(--neutral-background3)',
            border: '1px dashed #ca5010',
            borderRadius: 4,
            cursor: 'pointer',
          }}
          aria-label="Create design intent"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Create Intent
        </button>

        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                zIndex: 10001,
                background: 'var(--neutral-background1, #fff)',
                border: '1px solid var(--neutral-stroke1)',
                borderRadius: 8,
                boxShadow: '0 8px 24px rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.10)',
                padding: 20,
                width: 520,
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--neutral-foreground1)' }}>
                  No Design Intent
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: 16, color: 'var(--neutral-foreground3)', cursor: 'pointer', padding: '0 2px', lineHeight: 1 }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', lineHeight: 1.5, margin: '0 0 12px' }}>
                This experiment does not have a design intent yet. The intent captures your <strong>vision</strong>, <strong>problem statement</strong>, and <strong>success criteria</strong> — it drives every build decision.
              </p>
              <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', lineHeight: 1.5, margin: '0 0 16px' }}>
                To create one, ask your AI agent to call the <strong>design_intent</strong> MCP tool, or say: <em>"Open the Intent form for {experimentId}"</em>
              </p>
              <div style={{
                padding: '10px 12px',
                background: 'var(--neutral-background3, #f5f5f5)',
                borderRadius: 6,
                fontSize: 12,
                color: 'var(--neutral-foreground3)',
                lineHeight: 1.5,
              }}>
                💡 <strong>Tip:</strong> The Intent MCP App lets you view, edit, and manage all your design intents in one place.
              </div>
            </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--neutral-foreground1)',
          background: 'var(--neutral-background3)',
          border: '1px solid var(--neutral-stroke2)',
          borderRadius: 4,
          cursor: 'pointer',
        }}
        aria-label="View design intent"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M4 1h5.586L13 4.414V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm5 1H4v12h8V5H9V2ZM6 8h4v1H6V8Zm0 2h4v1H6v-1Zm0-4h2v1H6V6Z" fill="currentColor"/>
        </svg>
        Intent
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
          {/* Modal */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              zIndex: 10001,
              background: 'var(--neutral-background1, #fff)',
              border: '1px solid var(--neutral-stroke1)',
              borderRadius: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.10)',
              padding: 0,
              width: 520,
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid var(--neutral-stroke2)',
              position: 'sticky',
              top: 0,
              background: 'var(--neutral-background1, #fff)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--neutral-foreground1)' }}>
                  Design Intent
                </span>
                <span style={{
                  display: 'inline-block',
                  padding: '1px 8px',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  background: statusColor,
                  color: '#fff',
                }}>
                  {intent.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 16,
                  color: 'var(--neutral-foreground3)',
                  cursor: 'pointer',
                  padding: '0 2px',
                  lineHeight: 1,
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{intent.title}</div>
                <div style={{ fontSize: 12, color: 'var(--neutral-foreground3)' }}>
                  {intent.experimentId}{intent.updatedAt ? ` · Updated ${intent.updatedAt.slice(0, 10)}` : ''}
                </div>
              </div>

              <Section label="Vision" content={intent.vision} />
              <Section label="Problem Statement" content={intent.problem} />
              <ListSection label="Success Criteria" items={intent.successCriteria} />
              <ListSection label="Non-Goals" items={intent.nonGoals} />
              <ListSection label="Constraints" items={intent.constraints} />

              <div style={{
                fontSize: 11,
                color: 'var(--neutral-foreground3)',
                borderTop: '1px solid var(--neutral-stroke2)',
                paddingTop: 10,
                marginTop: 2,
              }}>
                Created {intent.createdAt.slice(0, 10)}
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}

/* ─── Small sub-components ─── */

function Section({ label, content }: { label: string; content: string }) {
  if (!content) return null;
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--neutral-foreground3)', marginBottom: 3 }}>
        {label}
      </div>
      <div style={{ fontSize: 13, color: 'var(--neutral-foreground2)', lineHeight: 1.5 }}>
        {content}
      </div>
    </div>
  );
}

function ListSection({ label, items }: { label: string; items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--neutral-foreground3)', marginBottom: 3 }}>
        {label}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--neutral-foreground2)', lineHeight: 1.6 }}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}
