import { useState, useEffect, useCallback, useRef } from 'react';

const GH_TOKEN_KEY = 'gh_deploy_token';
const OWNER = 'unthinkmedia';
const REPO = 'vibe-azure';
const WORKFLOW_FILE = 'azure-static-web-apps-deploy.yml';

type DeployState = 'idle' | 'deploying' | 'success' | 'error' | 'needs-token';

type Props = { experimentId: string; experimentTitle: string };

export default function ShareButton({ experimentId, experimentTitle }: Props) {
  const [state, setState] = useState<DeployState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const btnRef = useRef<HTMLButtonElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; right: number } | null>(null);

  // Position the popover when needs-token is shown
  useEffect(() => {
    if (state === 'needs-token' && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopoverPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    } else {
      setPopoverPos(null);
    }
  }, [state]);

  useEffect(() => {
    if (state === 'success') {
      const t = setTimeout(() => setState('idle'), 5000);
      return () => clearTimeout(t);
    }
  }, [state]);

  const triggerDeploy = useCallback(async (token: string) => {
    setState('deploying');
    setErrorMsg('');
    try {
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          body: JSON.stringify({
            ref: 'main',
            inputs: { experiment_id: experimentId },
          }),
        },
      );
      if (res.status === 204) {
        setState('success');
      } else if (res.status === 401 || res.status === 403) {
        localStorage.removeItem(GH_TOKEN_KEY);
        setErrorMsg('Token invalid or missing permissions (needs repo or actions:write scope)');
        setState('needs-token');
      } else {
        const body = await res.text();
        setErrorMsg(`GitHub API returned ${res.status}: ${body}`);
        setState('error');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setState('error');
    }
  }, [experimentId]);

  const handleClick = () => {
    const stored = localStorage.getItem(GH_TOKEN_KEY);
    if (!stored) {
      setState('needs-token');
      return;
    }
    triggerDeploy(stored);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = tokenInput.trim();
    if (!token) return;
    localStorage.setItem(GH_TOKEN_KEY, token);
    setTokenInput('');
    triggerDeploy(token);
  };

  const statusLabel = {
    idle: null,
    deploying: (
      <span style={{ fontSize: 12, color: 'var(--neutral-foreground2)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        ⏳ Deploying…
      </span>
    ),
    success: (
      <span style={{ fontSize: 12, color: '#107c10', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        &#10003; Deploy triggered
      </span>
    ),
    error: (
      <span style={{ fontSize: 12, color: '#d13438', display: 'inline-flex', alignItems: 'center', gap: 4 }} title={errorMsg}>
        &#10007; {errorMsg.slice(0, 60)}
      </span>
    ),
    'needs-token': null,
  }[state];

  return (
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
      {statusLabel}

      <button
        ref={btnRef}
        onClick={handleClick}
        disabled={state === 'deploying'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--neutral-foreground-on-brand)',
          background: state === 'deploying' ? 'var(--neutral-background-disabled)' : 'var(--brand-background)',
          border: 'none',
          borderRadius: 4,
          cursor: state === 'deploying' ? 'wait' : 'pointer',
        }}
        aria-label={`Deploy ${experimentTitle}`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M13.5 4.06 8.58 1.18a1.13 1.13 0 0 0-1.16 0L2.5 4.06A1.18 1.18 0 0 0 2 5.12v5.76a1.18 1.18 0 0 0 .5 1.06l4.92 2.88a1.13 1.13 0 0 0 1.16 0l4.92-2.88a1.18 1.18 0 0 0 .5-1.06V5.12a1.18 1.18 0 0 0-.5-1.06ZM8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" fill="currentColor"/>
        </svg>
        {state === 'deploying' ? 'Deploying…' : 'Share'}
      </button>

      {state === 'needs-token' && popoverPos && (
        <>
          {/* backdrop to close on outside click */}
          <div
            onClick={() => setState('idle')}
            style={{ position: 'fixed', inset: 0, zIndex: 10000 }}
          />
          <div
            style={{
              position: 'fixed',
              top: popoverPos.top,
              right: popoverPos.right,
              zIndex: 10001,
              background: '#fff',
              border: '1px solid var(--neutral-stroke1)',
              borderRadius: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.10)',
              padding: 16,
              width: 300,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--neutral-foreground1)' }}>
                GitHub Token
              </span>
              <button
                type="button"
                onClick={() => setState('idle')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 16,
                  color: 'var(--neutral-foreground3)',
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1,
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: 12, color: 'var(--neutral-foreground2)', margin: '0 0 12px' }}>
              Enter a GitHub PAT with <strong>repo</strong> or <strong>actions:write</strong> scope to trigger deploys.
            </p>
            {errorMsg && (
              <p style={{ fontSize: 11, color: '#d13438', margin: '0 0 8px' }}>
                {errorMsg}
              </p>
            )}
            <form onSubmit={handleTokenSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                type="password"
                placeholder="ghp_xxxxxxxxxxxx"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                autoFocus
                style={{
                  padding: '6px 10px',
                  fontSize: 13,
                  border: '1px solid var(--neutral-stroke1)',
                  borderRadius: 4,
                  background: 'var(--neutral-background1)',
                  color: 'var(--neutral-foreground1)',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '6px 12px',
                  fontSize: 13,
                  fontWeight: 500,
                  background: 'var(--brand-background)',
                  color: 'var(--neutral-foreground-on-brand)',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Save &amp; Deploy
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
