// Figma Plugin: Azure DevOps Pipeline Dashboard
// Generates the full dashboard as editable Figma nodes.

const C = {
  header:     { r: 0.004, g: 0.106, b: 0.212 }, // #011B36 — Azure nav dark
  bg1:        { r: 1,     g: 1,     b: 1     }, // #FFFFFF
  bg2:        { r: 0.957, g: 0.957, b: 0.957 }, // #F4F4F4
  bg5:        { r: 0.914, g: 0.914, b: 0.914 }, // #E9E9E9
  stroke:     { r: 0.843, g: 0.843, b: 0.843 }, // #D7D7D7
  fg1:        { r: 0.098, g: 0.098, b: 0.098 }, // #191919
  fg2:        { r: 0.259, g: 0.259, b: 0.259 }, // #424242
  fg3:        { r: 0.435, g: 0.435, b: 0.435 }, // #6F6F6F
  white:      { r: 1,     g: 1,     b: 1     },
  successFg:  { r: 0.063, g: 0.486, b: 0.063 }, // #107C10
  successBg:  { r: 0.875, g: 0.965, b: 0.871 }, // #DFF6DD
  dangerFg:   { r: 0.773, g: 0.059, b: 0.122 }, // #C50F1F
  dangerBg:   { r: 0.992, g: 0.906, b: 0.914 }, // #FDE7E9
  brandFg:    { r: 0,     g: 0.471, b: 0.831 }, // #0078D4
  brandBg:    { r: 0.929, g: 0.961, b: 0.988 }, // #EDF5FC
  warnFg:     { r: 0.514, g: 0.349, b: 0     }, // #835900
  warnBg:     { r: 1,     g: 0.976, b: 0.882 }, // #FFF9E1
  warnBorder: { r: 0.996, g: 0.820, b: 0.369 }, // #FED15E
};

const FONT_REG    = { family: 'Inter', style: 'Regular' };
const FONT_MED    = { family: 'Inter', style: 'Medium' };
const FONT_SEMI   = { family: 'Inter', style: 'SemiBold' };
const FONT_BOLD   = { family: 'Inter', style: 'Bold' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function frame(name, w, h, fill) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.fills = fill ? [{ type: 'SOLID', color: fill }] : [];
  f.clipsContent = false;
  return f;
}

function text(str, size, color, font) {
  const t = figma.createText();
  t.fontName = font || FONT_REG;
  t.characters = str;
  t.fontSize = size;
  t.fills = [{ type: 'SOLID', color: color || C.fg1 }];
  return t;
}

function rect(w, h, color, radius) {
  const r = figma.createRectangle();
  r.resize(w, h);
  r.fills = color ? [{ type: 'SOLID', color }] : [];
  if (radius) r.cornerRadius = radius;
  return r;
}

function hline(w, color) {
  const r = figma.createRectangle();
  r.resize(w, 1);
  r.fills = [{ type: 'SOLID', color: color || C.stroke }];
  return r;
}

function addBorder(node, color) {
  node.strokes = [{ type: 'SOLID', color: color || C.stroke }];
  node.strokeWeight = 1;
  node.strokeAlign = 'INSIDE';
}

function pill(label, fg, bg) {
  const p = frame('Pill/' + label, 0, 20, bg);
  p.cornerRadius = 10;
  const t2 = text(label, 11, fg, FONT_SEMI);
  t2.x = 8; t2.y = 4;
  p.appendChild(t2);
  p.resize(t2.width + 16, 20);
  return p;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const runs = [
  { name: 'web-frontend-deploy',     status: 'failed',     id: 'run-9281', branch: 'main',                  ago: '4 min ago',  dur: 19, commit: 'Fix auth callback route for federated sign-in' },
  { name: 'payments-api-ci',         status: 'succeeded',  id: 'run-9279', branch: 'release/2026.02',        ago: '11 min ago', dur: 14, commit: 'Improve retry jitter for charge settlement worker' },
  { name: 'infra-network-validate',  status: 'inProgress', id: 'run-9278', branch: 'main',                  ago: '18 min ago', dur: 32, commit: 'Tighten NSG rules for build subnet egress' },
  { name: 'mobile-app-ci',           status: 'succeeded',  id: 'run-9276', branch: 'feature/offline-cache', ago: '24 min ago', dur: 9,  commit: 'Add telemetry for sync conflict resolution' },
  { name: 'data-platform-nightly',   status: 'failed',     id: 'run-9275', branch: 'main',                  ago: '38 min ago', dur: 47, commit: 'Upgrade spark image to patch CVE-2026-1412' },
  { name: 'shared-services-smoke',   status: 'succeeded',  id: 'run-9274', branch: 'main',                  ago: '52 min ago', dur: 7,  commit: 'Refresh synthetic probes for API gateway edge' },
];

const stages = [
  { stage: 'Integration tests',       avg: 18.6, p95: 27.8, count: 12 },
  { stage: 'Container security scan', avg: 15.3, p95: 24.1, count: 10 },
  { stage: 'E2E browser suite',       avg: 13.1, p95: 21.4, count:  8 },
  { stage: 'Terraform plan',          avg: 11.9, p95: 17.2, count:  7 },
  { stage: 'Artifact publish',        avg:  9.4, p95: 13.8, count: 19 },
];

const pools = [
  { name: 'Hosted Ubuntu 22',    online: 42, busy: 33, offline: 2 },
  { name: 'Hosted Windows 2022', online: 28, busy: 21, offline: 3 },
  { name: 'Self-hosted Linux',   online: 16, busy: 14, offline: 1 },
  { name: 'GPU Build Pool',      online:  6, busy:  5, offline: 2 },
];

// ─── Build sections ───────────────────────────────────────────────────────────

function buildHeader(w) {
  const h = frame('Header', w, 56, C.header);

  // Hamburger lines
  const hb = frame('Hamburger', 48, 56);
  hb.x = 0;
  [10, 16, 22].forEach(yy => {
    const bar = rect(16, 2, C.white); bar.x = 16; bar.y = yy; hb.appendChild(bar);
  });
  h.appendChild(hb);

  const logo = text('Microsoft Azure', 14, C.white, FONT_SEMI);
  logo.x = 52; logo.y = 18; h.appendChild(logo);

  // Search bar
  const sb = frame('Search', 360, 32, { r: 0.08, g: 0.18, b: 0.31 });
  sb.cornerRadius = 4; sb.x = 220; sb.y = 12;
  const sp = text('Search resources, services, and docs (G+/)', 12, { r: 0.6, g: 0.75, b: 0.9 });
  sp.x = 10; sp.y = 7; sb.appendChild(sp);
  h.appendChild(sb);

  // Copilot button
  const cb = frame('CopilotBtn', 96, 28, C.white);
  cb.cornerRadius = 14; cb.x = 610; cb.y = 14;
  const ct = text('✦ Copilot', 12, C.header, FONT_SEMI);
  ct.x = 18; ct.y = 6; cb.appendChild(ct);
  h.appendChild(cb);

  // Avatar
  const av = frame('Avatar', 28, 28, { r: 0.22, g: 0.44, b: 0.78 });
  av.cornerRadius = 14; av.x = w - 44; av.y = 14;
  const at = text('AB', 11, C.white, FONT_BOLD);
  at.x = 6; at.y = 7; av.appendChild(at);
  h.appendChild(av);

  return h;
}

function buildSidebar(h) {
  const sb = frame('Sidebar', 220, h, C.bg1);
  addBorder(sb, C.stroke);

  const navData = [
    { heading: null, items: ['Dashboard', 'Pipelines', 'Runs', 'Agents'] },
    { heading: 'Insights', items: ['Flaky Tests', 'Stage Analytics', 'Failure Trends'] },
    { heading: 'Manage', items: ['Agent Pools', 'Service Connections', 'Settings'] },
  ];

  let y = 8;
  navData.forEach(section => {
    if (section.heading) {
      const ht = text(section.heading.toUpperCase(), 10, C.fg3, FONT_SEMI);
      ht.x = 16; ht.y = y + 6; sb.appendChild(ht);
      y += 28;
    }
    section.items.forEach(label => {
      const selected = label === 'Dashboard';
      const item = frame('Nav/' + label, 204, 32, selected ? C.brandBg : null);
      item.cornerRadius = 4; item.x = 8; item.y = y;
      if (selected) {
        const bar = rect(3, 20, C.brandFg, 2); bar.x = 0; bar.y = 6; item.appendChild(bar);
      }
      const dot = rect(6, 6, selected ? C.brandFg : C.fg3, 3);
      dot.x = 10; dot.y = 13; item.appendChild(dot);
      const lt = text(label, 13, selected ? C.brandFg : C.fg1, selected ? FONT_SEMI : FONT_REG);
      lt.x = 24; lt.y = 8; item.appendChild(lt);
      sb.appendChild(item);
      y += 36;
    });
    y += 8;
  });

  return sb;
}

function buildBreadcrumb(w) {
  const bc = frame('Breadcrumb', w, 32, C.bg1);
  const t2 = text('Home  ›  Azure DevOps Pipeline', 12, C.fg3);
  t2.x = 16; t2.y = 8; bc.appendChild(t2);
  const bl = hline(w, C.stroke); bl.y = 31; bc.appendChild(bl);
  return bc;
}

function buildTitleBar(w) {
  const tb = frame('TitleBar', w, 88, C.bg1);

  const icon = rect(32, 32, C.brandFg, 6);
  icon.x = 16; icon.y = 28; tb.appendChild(icon);

  const pt = text('Azure DevOps Pipeline  |  Dashboard', 22, C.fg1, FONT_SEMI);
  pt.x = 58; pt.y = 22; tb.appendChild(pt);

  const ps = text('Contoso Engineering (Project: Falcon) · 42 active pipelines', 12, C.fg3);
  ps.x = 58; ps.y = 50; tb.appendChild(ps);

  // Copilot suggestion pills
  const pills = [
    'Why did the last deploy pipeline fail?',
    'Which pipelines have the most flaky tests?',
    'What changed in the longest-running stage this week?',
  ];
  let px = 16;
  const copilotDot = rect(18, 18, { r: 0.58, g: 0.29, b: 0.94 }, 9);
  copilotDot.x = px; copilotDot.y = 66; tb.appendChild(copilotDot); px += 26;
  pills.forEach((p, i) => {
    const pl = pill(p, C.fg2, C.bg1);
    addBorder(pl, C.stroke); pl.x = px; pl.y = 64; tb.appendChild(pl);
    px += pl.width + 8;
  });

  const bl = hline(w, C.stroke); bl.y = 87; tb.appendChild(bl);
  return tb;
}

function buildAlert(w) {
  const a = frame('Alert/LongFailure', w, 44, C.warnBg);
  a.cornerRadius = 4;
  addBorder(a, C.warnBorder);
  const at = text(
    '⚠  web-frontend-deploy failing 31h (Playwright smoke tests timing out) · data-platform-nightly failing 27h (Spark dependency conflict)',
    12, C.warnFg, FONT_MED
  );
  at.x = 12; at.y = 14; a.appendChild(at);
  return a;
}

function buildMetricCard(label, value, subtext, accentFg, accentBg) {
  const w = 158, h = 110;
  const c = frame('MetricCard/' + label, w, h, C.bg1);
  c.cornerRadius = 8; addBorder(c, C.stroke);

  const ic = rect(28, 28, accentBg, 14);
  ic.x = 12; ic.y = 14; c.appendChild(ic);

  const vt = text(String(value), 28, accentFg, FONT_BOLD);
  vt.x = 12; vt.y = 48; c.appendChild(vt);

  const lt = text(label, 12, C.fg3, FONT_SEMI);
  lt.x = 12; lt.y = 82; c.appendChild(lt);

  const st = text(subtext, 10, C.fg3);
  st.x = 12; st.y = 96; c.appendChild(st);

  return c;
}

function buildDonutCard() {
  const c = frame('DonutCard/SuccessRate', 360, 130, C.bg1);
  c.cornerRadius = 8; addBorder(c, C.stroke);

  const hl = text('Overall success rate', 11, C.fg3, FONT_SEMI);
  hl.x = 12; hl.y = 12; c.appendChild(hl);

  // Background ring
  const bgRing = figma.createEllipse();
  bgRing.name = 'DonutBg'; bgRing.resize(88, 88);
  bgRing.x = 232; bgRing.y = 20;
  bgRing.fills = [];
  bgRing.strokes = [{ type: 'SOLID', color: C.bg5 }];
  bgRing.strokeWeight = 12;
  bgRing.arcData = { startingAngle: 0, endingAngle: 2 * Math.PI, innerRadius: 0 };
  c.appendChild(bgRing);

  // 86% success arc
  const arc = figma.createEllipse();
  arc.name = 'DonutArc86%'; arc.resize(88, 88);
  arc.x = 232; arc.y = 20;
  arc.fills = [];
  arc.strokes = [{ type: 'SOLID', color: C.successFg }];
  arc.strokeWeight = 12;
  arc.arcData = {
    startingAngle: -Math.PI / 2,
    endingAngle: -Math.PI / 2 + (2 * Math.PI * 0.86),
    innerRadius: 0,
  };
  c.appendChild(arc);

  const pct = text('86%', 20, C.successFg, FONT_BOLD);
  pct.x = 242; pct.y = 48; c.appendChild(pct);

  const lbl = text('Successful', 10, C.fg3);
  lbl.x = 240; lbl.y = 72; c.appendChild(lbl);

  return c;
}

function buildHealthSection(w) {
  const s = frame('Section/HealthSummary', w, 0, null);

  const h2 = text('Pipeline health summary', 15, C.fg1, FONT_SEMI);
  h2.x = 0; h2.y = 0; s.appendChild(h2);

  const desc = text('Pass/fail/in-progress counts with an overall success rate for the last 24 hours.', 12, C.fg3);
  desc.x = 0; desc.y = 22; s.appendChild(desc);

  // 3 metric cards
  const metrics = [
    { label: 'Passed',      value: 148, subtext: 'Last 24 hours',     fg: C.successFg, bg: C.successBg },
    { label: 'Failed',      value:  23, subtext: 'Last 24 hours',     fg: C.dangerFg,  bg: C.dangerBg  },
    { label: 'In progress', value:  11, subtext: 'Currently running',  fg: C.brandFg,   bg: C.brandBg   },
  ];
  metrics.forEach((m, i) => {
    const card = buildMetricCard(m.label, m.value, m.subtext, m.fg, m.bg);
    card.x = i * 170; card.y = 46;
    s.appendChild(card);
  });

  // Donut
  const donut = buildDonutCard();
  donut.x = w - 360; donut.y = 46;
  s.appendChild(donut);

  s.resize(w, 46 + 130);
  return s;
}

function buildRunRow(run, w, isLast, maxDur) {
  const ROW_H = 76;
  const r = frame('Run/' + run.name, w, ROW_H);

  // Status color
  const fg = run.status === 'failed' ? C.dangerFg : run.status === 'succeeded' ? C.successFg : C.brandFg;
  const bg = run.status === 'failed' ? C.dangerBg : run.status === 'succeeded' ? C.successBg : C.brandBg;
  const statusText = run.status === 'inProgress' ? 'In progress' : run.status.charAt(0).toUpperCase() + run.status.slice(1);

  const name = text(run.name, 13, C.fg1, FONT_SEMI);
  name.x = 12; name.y = 10; r.appendChild(name);

  const p = pill(statusText, fg, bg);
  p.x = name.x + name.width + 8; p.y = 10; r.appendChild(p);

  const meta = text(`${run.id} · ${run.branch} · ${run.ago}`, 11, C.fg3);
  meta.x = 12; meta.y = 30; r.appendChild(meta);

  const commit = text(run.commit, 11, C.fg2);
  commit.x = 12; commit.y = 46; r.appendChild(commit);

  // Duration (right side)
  const durW = 160;
  const durX = w - durW - 12;
  const dt = text(run.dur + ' min', 11, C.fg3);
  dt.x = durX; dt.y = 10; r.appendChild(dt);

  const track = rect(durW, 6, C.bg5, 3);
  track.x = durX; track.y = 30; r.appendChild(track);

  const fillPct = Math.max(0.08, run.dur / maxDur);
  const fill = rect(Math.round(durW * fillPct), 6, fg, 3);
  fill.x = durX; fill.y = 30; r.appendChild(fill);

  if (!isLast) {
    const div = hline(w, C.stroke); div.y = ROW_H - 1; r.appendChild(div);
  }

  return r;
}

function buildTimelineSection(w) {
  const s = frame('Section/Timeline', w, 0, null);

  const h2 = text('Recent pipeline timeline', 15, C.fg1, FONT_SEMI);
  h2.x = 0; h2.y = 0; s.appendChild(h2);

  const desc = text('Recent runs with duration bars, status indicators, and commit context.', 12, C.fg3);
  desc.x = 0; desc.y = 22; s.appendChild(desc);

  const ROW_H = 76;
  const cardH = runs.length * ROW_H + 1;
  const card = frame('TimelineCard', w, cardH, C.bg1);
  card.cornerRadius = 8; addBorder(card, C.stroke);
  card.x = 0; card.y = 46;

  const maxDur = Math.max(...runs.map(r => r.dur));
  runs.forEach((run, i) => {
    const row = buildRunRow(run, w, i === runs.length - 1, maxDur);
    row.y = i * ROW_H;
    card.appendChild(row);
  });

  s.appendChild(card);
  s.resize(w, 46 + cardH);
  return s;
}

function buildStagesSection(w) {
  const s = frame('Section/SlowestStages', w, 0, null);

  const h2 = text('Slowest stages', 15, C.fg1, FONT_SEMI);
  h2.x = 0; h2.y = 0; s.appendChild(h2);

  const desc = text('Longest-running stages by average duration across active pipelines.', 12, C.fg3);
  desc.x = 0; desc.y = 22; s.appendChild(desc);

  const ROW_H = 48;
  const HEADER_H = 36;
  const cardH = HEADER_H + stages.length * ROW_H;
  const card = frame('StagesCard', w, cardH, C.bg1);
  card.cornerRadius = 8; addBorder(card, C.stroke);
  card.x = 0; card.y = 46;

  // Table header
  const th = frame('TableHeader', w, HEADER_H, C.bg2);
  th.cornerRadius = 8;
  const cols = [{ label: 'Stage', x: 12 }, { label: 'Avg', x: 188 }, { label: 'P95', x: 260 }, { label: 'Pipelines', x: 322 }];
  cols.forEach(col => {
    const ct = text(col.label, 11, C.fg3, FONT_SEMI);
    ct.x = col.x; ct.y = 11; th.appendChild(ct);
  });
  const thl = hline(w, C.stroke); thl.y = HEADER_H - 1; th.appendChild(thl);
  card.appendChild(th);

  const maxAvg = Math.max(...stages.map(s2 => s2.avg));
  stages.forEach((stage, i) => {
    const row = frame('StageRow/' + i, w, ROW_H);
    row.y = HEADER_H + i * ROW_H;

    const nt = text(stage.stage, 12, C.fg1);
    nt.x = 12; nt.y = 8; row.appendChild(nt);

    const barW = 60;
    const barTrack = rect(barW, 4, C.bg5, 2);
    barTrack.x = 12; barTrack.y = 28; row.appendChild(barTrack);
    const barFill = rect(Math.round(barW * stage.avg / maxAvg), 4, C.brandFg, 2);
    barFill.x = 12; barFill.y = 28; row.appendChild(barFill);

    const at = text(stage.avg.toFixed(1) + ' min', 12, C.fg2);
    at.x = 188; at.y = 16; row.appendChild(at);

    const pt = text(stage.p95.toFixed(1) + ' min', 12, C.fg2);
    pt.x = 260; pt.y = 16; row.appendChild(pt);

    const ct2 = text(String(stage.count), 12, C.fg2);
    ct2.x = 322; ct2.y = 16; row.appendChild(ct2);

    if (i < stages.length - 1) {
      const div = hline(w, C.stroke); div.y = ROW_H - 1; row.appendChild(div);
    }

    card.appendChild(row);
  });

  s.appendChild(card);
  s.resize(w, 46 + cardH);
  return s;
}

function buildAgentsSection(w) {
  const s = frame('Section/AgentPools', w, 0, null);

  const h2 = text('Build agent pool utilization', 15, C.fg1, FONT_SEMI);
  h2.x = 0; h2.y = 0; s.appendChild(h2);

  const desc = text('Online, busy, and offline agent availability by pool.', 12, C.fg3);
  desc.x = 0; desc.y = 22; s.appendChild(desc);

  const ROW_H = 64;
  const cardH = pools.length * ROW_H;
  const card = frame('AgentsCard', w, cardH, C.bg1);
  card.cornerRadius = 8; addBorder(card, C.stroke);
  card.x = 0; card.y = 46;

  pools.forEach((pool, i) => {
    const utilization = pool.online > 0 ? Math.round((pool.busy / pool.online) * 100) : 0;
    const row = frame('PoolRow/' + pool.name, w, ROW_H);
    row.y = i * ROW_H;

    const nt = text(pool.name, 13, C.fg1, FONT_SEMI);
    nt.x = 12; nt.y = 10; row.appendChild(nt);

    const mt = text(`Online ${pool.online} · Busy ${pool.busy} · Offline ${pool.offline}`, 11, C.fg3);
    mt.x = 12; mt.y = 28; row.appendChild(mt);

    const barW = w - 120;
    const track = rect(barW, 8, C.bg5, 4);
    track.x = 12; track.y = 46; row.appendChild(track);

    const fillColor = utilization >= 85 ? C.dangerFg : utilization >= 70 ? { r: 0.796, g: 0.510, b: 0.008 } : C.successFg;
    const fill = rect(Math.round(barW * utilization / 100), 8, fillColor, 4);
    fill.x = 12; fill.y = 46; row.appendChild(fill);

    const ut = text(utilization + '% busy', 12, fillColor, FONT_SEMI);
    ut.x = w - 100; ut.y = 22; row.appendChild(ut);

    if (i < pools.length - 1) {
      const div = hline(w, C.stroke); div.y = ROW_H - 1; row.appendChild(div);
    }

    card.appendChild(row);
  });

  s.appendChild(card);
  s.resize(w, 46 + cardH);
  return s;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await figma.loadFontAsync(FONT_REG);
  await figma.loadFontAsync(FONT_MED);
  await figma.loadFontAsync(FONT_SEMI);
  await figma.loadFontAsync(FONT_BOLD);

  const PAGE_W = 1440;
  const SIDEBAR_W = 220;
  const CONTENT_PAD = 24;
  const RIGHT_COL_W = 380;
  const HEADER_H = 56;
  const BREADCRUMB_H = 32;
  const TITLE_BAR_H = 96; // includes suggestion pills

  // Root frame
  const root = frame('Azure DevOps Pipeline Dashboard', PAGE_W, 1024, C.bg2);
  figma.currentPage.appendChild(root);

  // Header
  const header = buildHeader(PAGE_W);
  header.x = 0; header.y = 0;
  root.appendChild(header);

  // Sidebar
  const BODY_H = 1024 - HEADER_H;
  const sidebar = buildSidebar(BODY_H);
  sidebar.x = 0; sidebar.y = HEADER_H;
  root.appendChild(sidebar);

  // Content area
  const CONTENT_X = SIDEBAR_W;
  const CONTENT_W = PAGE_W - SIDEBAR_W;
  const INNER_W = CONTENT_W - CONTENT_PAD * 2;
  const LEFT_COL_W = INNER_W - RIGHT_COL_W - 20;

  let y = HEADER_H;

  // Breadcrumb
  const bc = buildBreadcrumb(CONTENT_W);
  bc.x = CONTENT_X; bc.y = y;
  root.appendChild(bc);
  y += BREADCRUMB_H;

  // Title bar
  const tb = buildTitleBar(CONTENT_W);
  tb.x = CONTENT_X; tb.y = y;
  root.appendChild(tb);
  y += TITLE_BAR_H;

  // Inner content start (with padding)
  const innerY_start = y + CONTENT_PAD;

  // Alert bar (full inner width)
  const alert = buildAlert(INNER_W);
  alert.x = CONTENT_X + CONTENT_PAD; alert.y = innerY_start;
  root.appendChild(alert);
  let leftY = innerY_start + alert.height + 20;
  let rightY = innerY_start + alert.height + 20;

  // ─── Left column ───
  const health = buildHealthSection(LEFT_COL_W);
  health.x = CONTENT_X + CONTENT_PAD; health.y = leftY;
  root.appendChild(health);
  leftY += health.height + 20;

  const timeline = buildTimelineSection(LEFT_COL_W);
  timeline.x = CONTENT_X + CONTENT_PAD; timeline.y = leftY;
  root.appendChild(timeline);
  leftY += timeline.height + 24;

  // ─── Right column ───
  const rightX = CONTENT_X + CONTENT_PAD + LEFT_COL_W + 20;

  const stagesSection = buildStagesSection(RIGHT_COL_W);
  stagesSection.x = rightX; stagesSection.y = rightY;
  root.appendChild(stagesSection);
  rightY += stagesSection.height + 20;

  const agentsSection = buildAgentsSection(RIGHT_COL_W);
  agentsSection.x = rightX; agentsSection.y = rightY;
  root.appendChild(agentsSection);
  rightY += agentsSection.height + 24;

  // Resize root to fit content
  const totalH = Math.max(leftY, rightY);
  root.resize(PAGE_W, Math.max(1024, totalH));

  // Select and zoom
  figma.currentPage.selection = [root];
  figma.viewport.scrollAndZoomIntoView([root]);
  figma.closePlugin('✅ Dashboard created with ' + (figma.currentPage.children.length) + ' top-level nodes');
}

main().catch(err => {
  figma.notify('Plugin error: ' + err.message, { error: true });
  figma.closePlugin();
});
