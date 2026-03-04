import { useState, useRef } from 'react';

const FEED_TOKEN = 'OFNQRU1vdGdxek1OdnlUdGJTZjF2VHZCWUJiaWtudmtjWEN3MVFsdzJwOXpkNElXcWsyNkpRUUo5OUNDQUNBQUFBQUFBcm9oQUFBU0FaRE8zdEk0';

const EXAMPLE_PROMPT = `Build me an Azure Container Apps resource overview page. It should have a side navigation with sections for Overview, Activity log, Containers, Revisions, and Networking. The overview section should show key properties like the resource group, location, status, FQDN, and the latest revision. Include a toolbar with Restart, Stop, and Delete actions. Show a health metrics section with cards for Request count, P95 latency, and CPU usage. Below that, a recent revisions table showing revision name, status, created date, and traffic percentage.`;

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={label || 'Copy to clipboard'}
      title={label || 'Copy to clipboard'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 8px',
        fontSize: 11,
        fontWeight: 500,
        color: copied ? 'var(--status-success-foreground1, #107c10)' : 'var(--brand-foreground-link, #0078d4)',
        background: copied ? 'var(--status-success-background1, #dff6dd)' : 'var(--neutral-background3, #f5f5f5)',
        border: '1px solid ' + (copied ? 'var(--status-success-foreground1, #107c10)' : 'var(--neutral-stroke2)'),
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" fill="currentColor"/>
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M4 4V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2Zm1 0h6a1 1 0 0 1 1 1v6h2V2H5v2Zm-3 1v9h9V5H2Z" fill="currentColor"/>
          </svg>
          {label || 'Copy'}
        </>
      )}
    </button>
  );
}

function CodeBlock({ code, language, copyLabel }: { code: string; language?: string; copyLabel?: string }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 6,
      border: '1px solid var(--neutral-stroke2)',
      background: 'var(--neutral-background3, #f5f5f5)',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 8px 4px 12px',
        borderBottom: '1px solid var(--neutral-stroke2)',
        background: 'var(--neutral-background2, #fafafa)',
      }}>
        {language && (
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--neutral-foreground3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {language}
          </span>
        )}
        <CopyButton text={code} label={copyLabel} />
      </div>
      <pre style={{
        margin: 0,
        padding: '10px 12px',
        fontSize: 12,
        lineHeight: 1.5,
        fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", Consolas, monospace',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        color: 'var(--neutral-foreground1)',
        overflow: 'auto',
      }}>
        {code}
      </pre>
    </div>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: 'var(--brand-foreground-link, #0078d4)',
      color: '#fff',
      fontSize: 13,
      fontWeight: 600,
      flexShrink: 0,
    }}>
      {n}
    </span>
  );
}

export default function GettingStartedPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(0,0,0,.35)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 520,
          maxWidth: '90vw',
          height: '100vh',
          background: 'var(--neutral-background1, #fff)',
          borderLeft: '1px solid var(--neutral-stroke1)',
          boxShadow: '-8px 0 24px rgba(0,0,0,.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideIn .2s ease-out',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid var(--neutral-stroke2)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.927 6.21a1.673 1.673 0 0 0-.737-.737l-6.083-3.26a2.327 2.327 0 0 0-2.214 0L2.81 5.473a1.673 1.673 0 0 0-.737.737L10 10.5l7.927-4.29Z" fill="var(--brand-foreground-link, #0078d4)" opacity=".8"/>
              <path d="M10 10.5v8.74c.38 0 .76-.098 1.107-.293l6.083-3.26c.457-.245.737-.718.737-1.233V5.473L10 10.5Z" fill="var(--brand-foreground-link, #0078d4)"/>
              <path d="M10 10.5v8.74a2.32 2.32 0 0 1-1.107-.293l-6.083-3.26A1.424 1.424 0 0 1 2.073 14.454V5.473L10 10.5Z" fill="var(--brand-foreground-link, #0078d4)" opacity=".6"/>
            </svg>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Getting Started</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', fontSize: 18, cursor: 'pointer',
              color: 'var(--neutral-foreground3)', padding: '4px 6px', lineHeight: 1,
              borderRadius: 4,
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 20px 40px' }}>
          <p style={{
            margin: '0 0 24px',
            fontSize: 13,
            color: 'var(--neutral-foreground2)',
            lineHeight: 1.6,
          }}>
            Set up a local prototyping workspace in minutes. You'll get an AI-powered environment
            with Coherence components, ready for designing Azure portal pages with Copilot.
          </p>

          {/* Prerequisites */}
          <div style={{
            padding: '12px 16px',
            borderRadius: 6,
            background: 'var(--brand-background2, #e8f0fe)',
            border: '1px solid var(--brand-stroke1, #b4d6fa)',
            marginBottom: 24,
            fontSize: 13,
            lineHeight: 1.5,
          }}>
            <strong>Prerequisites:</strong> Node.js 18+, VS Code Insiders, and GitHub Copilot extension.
          </div>

          {/* Step 1 */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <StepNumber n={1} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Initialize workspace</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '0 0 10px', lineHeight: 1.5 }}>
              Run the CLI to scaffold a new prototyping workspace with all necessary config files:
            </p>
            <CodeBlock
              language="terminal"
              code="npx @unthinkmedia/coherence-prototyper-mcp@latest init ~/my-prototype"
              copyLabel="Copy command"
            />
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '10px 0 10px', lineHeight: 1.5 }}>
              Then open it in VS Code Insiders:
            </p>
            <CodeBlock
              language="terminal"
              code="code-insiders ~/my-prototype"
              copyLabel="Copy command"
            />
          </div>

          {/* Step 2 */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <StepNumber n={2} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Add the package feed token</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '0 0 10px', lineHeight: 1.5 }}>
              The workspace includes an <code style={{ fontSize: 12, background: 'var(--neutral-background3)', padding: '1px 5px', borderRadius: 3 }}>.npmrc</code> file that
              points to the internal Coherence npm feed.
              During <code style={{ fontSize: 12, background: 'var(--neutral-background3)', padding: '1px 5px', borderRadius: 3 }}>init</code>,
              you'll be prompted for a token. Copy the token below and paste it when asked:
            </p>
            <div style={{
              borderRadius: 6,
              border: '1px solid var(--neutral-stroke2)',
              background: 'var(--neutral-background3, #f5f5f5)',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 8px 4px 12px',
                borderBottom: '1px solid var(--neutral-stroke2)',
                background: 'var(--neutral-background2, #fafafa)',
              }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--neutral-foreground3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Feed Token
                </span>
                <CopyButton text={FEED_TOKEN} label="Copy token" />
              </div>
              <div style={{
                padding: '10px 12px',
                fontSize: 11,
                lineHeight: 1.5,
                fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", Consolas, monospace',
                wordBreak: 'break-all',
                color: 'var(--neutral-foreground2)',
                userSelect: 'all',
              }}>
                {FEED_TOKEN}
              </div>
            </div>
            <p style={{
              fontSize: 11,
              color: 'var(--neutral-foreground3)',
              margin: '8px 0 0',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}>
              This token grants read-only access to the @charm-ux package feed (Microsoft internal).
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <StepNumber n={3} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Activate the MCP server</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '0 0 10px', lineHeight: 1.5 }}>
              When VS Code opens the workspace, you'll see a notification about the
              {' '}<strong>coherence-prototyper</strong> MCP server.
              Click <strong>"Start"</strong> to activate it. This gives Copilot access to Coherence design
              tokens, component APIs, and pattern references.
            </p>
            <div style={{
              padding: '12px 16px',
              borderRadius: 6,
              background: 'var(--neutral-background3, #f5f5f5)',
              border: '1px solid var(--neutral-stroke2)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="var(--brand-foreground-link, #0078d4)" strokeWidth="1.5" fill="none"/>
                <path d="M10 6v5M10 13v1" stroke="var(--brand-foreground-link, #0078d4)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 13, color: 'var(--neutral-foreground2)' }}>
                Look for the notification bell or the MCP icon in the status bar.
              </span>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <StepNumber n={4} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Send a prompt in Copilot</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '0 0 10px', lineHeight: 1.5 }}>
              Open Copilot Chat (<code style={{ fontSize: 12, background: 'var(--neutral-background3)', padding: '1px 5px', borderRadius: 3 }}>⌘⇧I</code>)
              and switch to <strong>Agent mode</strong>. Then describe the Azure page you want to prototype.
              Here's an example:
            </p>
            <CodeBlock
              language="prompt"
              code={EXAMPLE_PROMPT}
              copyLabel="Copy prompt"
            />
          </div>

          {/* Step 5 */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <StepNumber n={5} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Preview locally</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '0 0 10px', lineHeight: 1.5 }}>
              Start the dev server to see your prototype with hot reload:
            </p>
            <CodeBlock
              language="terminal"
              code="npm run dev"
              copyLabel="Copy command"
            />
          </div>

          {/* Step 6 */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <StepNumber n={6} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Iterate</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '0 0 0', lineHeight: 1.5 }}>
              Refine your prototype by sending follow-up prompts to Copilot or editing the generated
              files directly. The dev server hot-reloads instantly on every save.
            </p>
          </div>

          {/* Step 7 */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <StepNumber n={7} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Share</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '0 0 10px', lineHeight: 1.5 }}>
              When you're ready to share your prototype with others, tell Copilot:
            </p>
            <CodeBlock
              language="prompt"
              code="Deploy it"
              copyLabel="Copy prompt"
            />
            <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '10px 0 0', lineHeight: 1.5 }}>
              This creates a pull request that deploys to Azure Static Web Apps, giving you
              a shareable preview URL.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
