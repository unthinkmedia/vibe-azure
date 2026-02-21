import { useState, useRef, useEffect } from 'react';
import {
  CuiButton,
  CuiDivider,
  CuiIcon,
  CuiInput,
  CuiMenu,
  CuiMenuItem,
  CuiToolbar,
} from '@charm-ux/cui/react';
import { workflowNodes, connectorCategories, type WorkflowNode } from './data';

// ─── Workflow Node Component ───
function WorkflowNodeCard({
  node,
  selected,
  onSelect,
}: {
  node: WorkflowNode;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(node.type === 'trigger');

  return (
    <div
      className={`workflow-node ${node.type} ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(node.id)}
    >
      <div className="node-header">
        <div className="node-icon">
          <CuiIcon url={node.icon} style={{ fontSize: '18px' }} />
        </div>
        <div className="node-title">
          <div className="node-title-text">{node.title}</div>
          <div className="node-subtitle">{node.subtitle}</div>
        </div>
        {node.status && <div className={`node-status ${node.status}`} title={node.status} />}
      </div>
      {expanded && node.config && (
        <div className="node-body">
          {Object.entries(node.config).map(([key, value]) => (
            <div className="node-config-row" key={key}>
              <span className="node-config-label">{key}:</span>
              <span className="node-config-value">{value}</span>
            </div>
          ))}
        </div>
      )}
      <button
        className="node-collapse-btn"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        <CuiIcon name={expanded ? 'chevron-up' : 'chevron-down'} style={{ fontSize: '12px' }} />
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
}

// ─── Connector Line with Add Button ───
function ConnectorLine({ onAdd }: { onAdd?: () => void }) {
  return (
    <div className="connector-line">
      <div className="line" />
      {onAdd && (
        <button className="connector-add-btn" onClick={onAdd} title="Add a step" aria-label="Add a step">
          +
        </button>
      )}
    </div>
  );
}

// ─── Condition Branch ───
function ConditionBranch({
  node,
  selectedId,
  onSelect,
  onAdd,
}: {
  node: WorkflowNode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}) {
  const trueChild = node.children?.[0];
  const falseChild = node.children?.[1];

  return (
    <div className="condition-branch-container">
      <WorkflowNodeCard node={node} selected={selectedId === node.id} onSelect={onSelect} />
      <ConnectorLine />
      <div className="branch-lanes">
        {/* True Branch */}
        <div className="branch-lane">
          <span className="branch-label true-branch">True</span>
          <ConnectorLine />
          {trueChild ? (
            <WorkflowNodeCard node={trueChild} selected={selectedId === trueChild.id} onSelect={onSelect} />
          ) : (
            <button className="connector-add-btn" style={{ position: 'relative' }} onClick={onAdd}>+</button>
          )}
          <ConnectorLine onAdd={onAdd} />
        </div>
        {/* False Branch */}
        <div className="branch-lane">
          <span className="branch-label false-branch">False</span>
          <ConnectorLine />
          {falseChild ? (
            <WorkflowNodeCard node={falseChild} selected={selectedId === falseChild.id} onSelect={onSelect} />
          ) : (
            <button className="connector-add-btn" style={{ position: 'relative' }} onClick={onAdd}>+</button>
          )}
          <ConnectorLine onAdd={onAdd} />
        </div>
      </div>
    </div>
  );
}

// ─── Mini Map ───
function MiniMap({ nodes }: { nodes: WorkflowNode[] }) {
  return (
    <div className="mini-map">
      <div className="mini-map-content" style={{ flexDirection: 'column', padding: '8px' }}>
        {nodes.map((node, i) => (
          <div key={node.id}>
            <div className={`mini-map-node ${node.type}`} />
            {i < nodes.length - 1 && <div className="mini-map-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Config Side Panel ───
function ConfigPanel({
  node,
  onClose,
}: {
  node: WorkflowNode;
  onClose: () => void;
}) {
  return (
    <div className="config-panel">
      <div className="config-panel-header">
        <CuiIcon url={node.icon} style={{ fontSize: '20px' }} />
        <span className="config-panel-title">{node.title}</span>
        <CuiButton appearance="subtle" iconOnly size="small" onClick={onClose}>
          <CuiIcon name="dismiss" />
        </CuiButton>
      </div>
      <div className="config-panel-body">
        {node.config &&
          Object.entries(node.config).map(([key, value]) => (
            <div className="config-field" key={key}>
              <label>{key}</label>
              <CuiInput value={value} style={{ width: '100%' } as any} />
            </div>
          ))}
        {node.type === 'trigger' && (
          <div className="config-field">
            <label>HTTP POST URL</label>
            <CuiInput
              value="https://prod-01.eastus.logic.azure.com:443/workflows/abc123..."
              style={{ width: '100%' } as any}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page Content ───
export function PageContent() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'designer' | 'code'>('designer');
  const [showAddPanel, setShowAddPanel] = useState(false);

  const selectedNode = [...workflowNodes, ...(workflowNodes.flatMap(n => n.children || []))]
    .find(n => n.id === selectedNodeId);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* ─── Designer Toolbar ─── */}
      <div className="designer-toolbar">
        <CuiToolbar size="small" label="Designer actions">
          <CuiMenu>
            <CuiButton slot="trigger" appearance="subtle" size="small">
              <CuiIcon slot="start" name="play" />
              Run
              <CuiIcon slot="end" name="chevron-down" />
            </CuiButton>
            <CuiMenuItem>Run with payload</CuiMenuItem>
            <CuiMenuItem>Run</CuiMenuItem>
          </CuiMenu>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small" disabled>
            <CuiIcon slot="start" name="save" />
            Save
          </CuiButton>
          <CuiButton appearance="subtle" size="small" disabled>
            <CuiIcon slot="start" name="dismiss" />
            Discard
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton
            appearance={viewMode === 'designer' ? 'subtle' : 'outline'}
            size="small"
            onClick={() => setViewMode('designer')}
          >
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:design-ideas-24-regular.svg" />
            Designer
          </CuiButton>
          <CuiButton
            appearance={viewMode === 'code' ? 'subtle' : 'outline'}
            size="small"
            onClick={() => setViewMode('code')}
          >
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:code-24-regular.svg" />
            Code view
          </CuiButton>
        </CuiToolbar>
      </div>

      {/* ─── Canvas + Config Panel ─── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {viewMode === 'designer' ? (
          <div className="canvas-container">
            <div className="canvas-grid">
              {workflowNodes.map((node, i) => (
                <div key={node.id}>
                  {node.type === 'condition' ? (
                    <ConditionBranch
                      node={node}
                      selectedId={selectedNodeId}
                      onSelect={setSelectedNodeId}
                      onAdd={() => setShowAddPanel(true)}
                    />
                  ) : (
                    <WorkflowNodeCard
                      node={node}
                      selected={selectedNodeId === node.id}
                      onSelect={setSelectedNodeId}
                    />
                  )}
                  {i < workflowNodes.length - 1 && (
                    <ConnectorLine onAdd={() => setShowAddPanel(true)} />
                  )}
                </div>
              ))}
            </div>

            {/* Canvas Tools (bottom-left) */}
            <div className="canvas-tools">
              <CuiButton appearance="subtle" iconOnly aria-label="Zoom in">
                <CuiIcon name="add" />
              </CuiButton>
              <div className="canvas-tools-divider" />
              <CuiButton appearance="subtle" iconOnly aria-label="Zoom out">
                <CuiIcon name="subtract" />
              </CuiButton>
              <div className="canvas-tools-divider" />
              <CuiButton appearance="subtle" iconOnly aria-label="Fit to screen">
                <CuiIcon url="https://api.iconify.design/fluent:full-screen-maximize-24-regular.svg" />
              </CuiButton>
              <div className="canvas-tools-divider" />
              <CuiButton appearance="subtle" iconOnly aria-label="Undo">
                <CuiIcon url="https://api.iconify.design/fluent:arrow-undo-24-regular.svg" />
              </CuiButton>
              <div className="canvas-tools-divider" />
              <CuiButton appearance="subtle" iconOnly aria-label="Redo">
                <CuiIcon url="https://api.iconify.design/fluent:arrow-redo-24-regular.svg" />
              </CuiButton>
            </div>
          </div>
        ) : (
          <div className="canvas-container" style={{ padding: '24px' }}>
            <pre style={{
              background: 'var(--neutral-background1)',
              border: '1px solid var(--neutral-stroke2)',
              borderRadius: 'var(--border-radius-md)',
              padding: '20px',
              fontSize: 'var(--font-size-base200)',
              color: 'var(--neutral-foreground1)',
              overflow: 'auto',
              margin: 0,
            }}>
{JSON.stringify({
  definition: {
    "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
    contentVersion: "1.0.0.0",
    triggers: {
      "When_a_HTTP_request_is_received": {
        type: "Request",
        kind: "Http",
        inputs: { method: "POST", relativePath: "/api/trigger" },
      },
    },
    actions: {
      Condition: {
        type: "If",
        expression: {
          and: [{ equals: ["@triggerBody()?['status']", "approved"] }],
        },
        actions: {
          "Send_an_email_(V2)": {
            type: "ApiConnection",
            inputs: { to: "user@contoso.com", subject: "Request Approved" },
          },
        },
        else: {
          actions: {
            Create_item: {
              type: "ApiConnection",
              inputs: { site: "https://contoso.sharepoint.com", list: "PendingRequests" },
            },
          },
        },
      },
      Response: {
        type: "Response",
        inputs: { statusCode: 200, body: { status: "complete" } },
        runAfter: { Condition: ["Succeeded"] },
      },
    },
  },
}, null, 2)}
            </pre>
          </div>
        )}

        {/* Config Side Panel */}
        {selectedNode && viewMode === 'designer' && (
          <ConfigPanel node={selectedNode} onClose={() => setSelectedNodeId(null)} />
        )}
      </div>
    </div>
  );
}
