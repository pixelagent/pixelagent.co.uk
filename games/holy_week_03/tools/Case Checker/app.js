// ============================================================
// Miracle Maker 3D — Cheat Sheet engine
// Loads the REAL case data files (no copies/JSON dumps) and
// builds an unlock graph: NPC -> Evidence -> Prophecy -> Accused
// ============================================================

import * as act1 from '../../js/act1_case.js';
import * as act2 from '../../js/act2_case.js';
import * as act3 from '../../js/act3_case.js';
import * as act4 from '../../js/act4_case.js';

const ACT_FILES = [
  { label: 'Act I — The Triumphal Entry', keys: Object.keys(act1), mod: act1 },
  { label: 'Act II — Authority Challenged', keys: Object.keys(act2), mod: act2 },
  { label: 'Act III — The Passion', keys: Object.keys(act3), mod: act3 },
  { label: 'Act IV — Resurrection', keys: Object.keys(act4), mod: act4 },
];

const norm = s => (s || '').toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, '');

function nk(type, id) { return `${type}:${id}`; }

// A couple of evidence entries in the source data link to more than one
// prophecy (relatedProphecy as an array instead of a single id) — handle
// both shapes everywhere a "related prophecy" is read.
function toIdArray(v) { return Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []); }

function normalizeCase(raw, exportName, actLabel) {
  const npcs = (raw.npcs || []).filter(Boolean);
  const evidence = (raw.evidencePool || []).filter(Boolean);
  const suspects = (raw.suspects || []).filter(Boolean);
  const prophecies = (raw.prophecies || []).filter(Boolean);
  const deductions = raw.deductions || {};
  const lab = raw.lab || [];
  const truth = raw.truth || {};

  const evidenceById = Object.fromEntries(evidence.map(e => [e.id, e]));
  const npcById = Object.fromEntries(npcs.map(n => [n.id, n]));
  const suspectById = Object.fromEntries(suspects.map(s => [s.id, s]));
  const prophecyById = Object.fromEntries(prophecies.map(p => [p.id, p]));

  const evidenceGivers = {};   // evidenceId -> [npcId]
  const suspectGivers = {};    // suspectId -> {npcs:[], evidence:[]}
  const prophecyGivers = {};   // prophecyId -> {npcs:[], evidence:[], deductions:[{pairKey,type,isKey}]}
  const edges = [];

  function addSuspectGiver(sid, kind, id) {
    if (!sid || sid === 'none') return;
    (suspectGivers[sid] ??= { npcs: [], evidence: [] })[kind].push(id);
  }
  function addProphecyGiver(pid, kind, val) {
    if (!pid) return;
    (prophecyGivers[pid] ??= { npcs: [], evidence: [], deductions: [] })[kind].push(val);
  }

  // NPCs: talking unlocks evidence / suspects / (sometimes) a prophecy directly.
  npcs.forEach(n => {
    n._chains = [];
    (n.unlocksEvidence || []).forEach(eid => {
      (evidenceGivers[eid] ??= []).push(n.id);
      edges.push({ from: nk('npc', n.id), to: nk('evidence', eid), kind: 'npc-evidence' });
    });
    (n.unlocksSuspects || []).forEach(sid => {
      addSuspectGiver(sid, 'npcs', n.id);
      edges.push({ from: nk('npc', n.id), to: nk('suspect', sid), kind: 'npc-suspect' });
    });
    if (n.revealsProphecy) {
      addProphecyGiver(n.revealsProphecy, 'npcs', n.id);
      edges.push({ from: nk('npc', n.id), to: nk('prophecy', n.revealsProphecy), kind: 'npc-prophecy' });
    }
    // Reaction chains: showing NPC evidence X can unlock further evidence Y.
    Object.entries(n.reactions || {}).forEach(([shownId, reaction]) => {
      if (!reaction || typeof reaction !== 'object') return;
      const rc = reaction.revealedClue;
      if (!rc) return;
      let revealedIds = [];
      if (typeof rc === 'string') revealedIds = [rc];
      else if (typeof rc === 'object') revealedIds = Object.values(rc).filter(v => typeof v === 'string' && evidenceById[v]);
      revealedIds.forEach(rid => {
        if (!evidenceById[rid]) return;
        n._chains.push({ show: shownId, reveals: rid });
        edges.push({ from: nk('evidence', shownId), to: nk('evidence', rid), kind: 'chain', via: n.id });
      });
    });
  });

  // Evidence: can directly reveal a suspect, and/or relate to a prophecy.
  evidence.forEach(e => {
    if (e.revealsSuspect && e.revealsSuspect !== 'none') {
      addSuspectGiver(e.revealsSuspect, 'evidence', e.id);
      edges.push({ from: nk('evidence', e.id), to: nk('suspect', e.revealsSuspect), kind: 'evidence-suspect' });
    }
    toIdArray(e.relatedProphecy).forEach(pid => {
      addProphecyGiver(pid, 'evidence', e.id);
      edges.push({ from: nk('evidence', e.id), to: nk('prophecy', pid), kind: 'evidence-prophecy' });
    });
  });

  // Deductions: combining two evidence items in the lab can unlock a prophecy.
  Object.entries(deductions).forEach(([pairKey, types]) => {
    const [a, b] = pairKey.split('+');
    edges.push({ from: nk('evidence', a), to: nk('evidence', b), kind: 'deduction', pairKey });
    Object.entries(types || {}).forEach(([ttype, tval]) => {
      if (tval && tval.revealsProphecy) {
        addProphecyGiver(tval.revealsProphecy, 'deductions', { pairKey, type: ttype, isKey: !!tval.isKey });
        [a, b].forEach(eid => {
          edges.push({ from: nk('evidence', eid), to: nk('prophecy', tval.revealsProphecy), kind: 'deduction-prophecy', isKey: !!tval.isKey, pairKey, ttype });
        });
      }
    });
  });

  // Lab: presenting evidence to a suspect produces a result (clears / clarifies).
  lab.forEach(l => {
    if (l.evidence && l.suspect) {
      edges.push({ from: nk('evidence', l.evidence), to: nk('suspect', l.suspect), kind: 'lab', result: l.result });
    }
  });

  // Truth: which prophecies (by reference text) are the ones that fulfil the case,
  // and which suspect is the true, final "accused" (culprit).
  const fulfilledIds = (truth.prophesyFulfilled || []).map(ref => {
    const p = prophecies.find(pp => norm(pp.reference) === norm(ref));
    return p ? p.id : null;
  }).filter(Boolean);
  let culpritId = truth.culprit || null;
  if (culpritId && culpritId !== 'none' && !suspectById[culpritId]) {
    // A couple of cases record the culprit by name ("caiaphas") rather than
    // the suspect id used in that case's suspects list ("chief_priest").
    const match = suspects.find(s => norm(s.name) === norm(culpritId) || norm(s.id) === norm(culpritId));
    if (match) culpritId = match.id;
  }
  if (culpritId) {
    fulfilledIds.forEach(pid => {
      edges.push({ from: nk('prophecy', pid), to: nk('suspect', culpritId), kind: 'verdict' });
    });
  }

  return {
    exportName, actLabel,
    id: raw.id, title: raw.title, subtitle: raw.subtitle, eventLocation: raw.eventLocation,
    difficulty: raw.difficulty, requires: raw.requires,
    npcs, evidence, suspects, prophecies, deductions, lab,
    truth: { ...truth, culprit: culpritId },
    evidenceById, npcById, suspectById, prophecyById,
    evidenceGivers, suspectGivers, prophecyGivers, fulfilledIds, edges,
  };
}

const CASES = [];
ACT_FILES.forEach(act => {
  act.keys.forEach(k => {
    const raw = act.mod[k];
    if (raw && raw.id) CASES.push(normalizeCase(raw, k, act.label));
  });
});
const caseById = Object.fromEntries(CASES.map(c => [c.id, c]));

// ------------------------------------------------------------
// Rendering
// ------------------------------------------------------------

const $sidebar = document.getElementById('sidebar');
const $stageWrap = document.getElementById('case-view');
let currentCase = null;
let selection = null; // { keys: Set<string>, edges: Edge[] }

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function difficultyDots(n) {
  const total = 5;
  let out = '';
  for (let i = 0; i < total; i++) out += `<span class="dot ${i < n ? 'on' : ''}"></span>`;
  return `<span class="difficulty" title="Difficulty ${n}/5">${out}</span>`;
}

function buildSidebar() {
  $sidebar.innerHTML = '';
  ACT_FILES.forEach(act => {
    const section = document.createElement('div');
    section.className = 'act-section';
    const h = document.createElement('h2');
    h.textContent = act.label;
    section.appendChild(h);
    const list = document.createElement('div');
    list.className = 'case-list';
    CASES.filter(c => c.actLabel === act.label).forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'case-btn';
      btn.dataset.caseId = c.id;
      const reqCase = c.requires ? caseById[c.requires] : null;
      btn.innerHTML = `
        <span class="case-btn-title">${esc(c.title)}</span>
        <span class="case-btn-meta">${difficultyDots(c.difficulty || 1)}</span>
        ${reqCase ? `<span class="case-btn-req">after: ${esc(reqCase.title)}</span>` : `<span class="case-btn-req first">opening case</span>`}
      `;
      btn.addEventListener('click', () => selectCase(c.id));
      list.appendChild(btn);
    });
    section.appendChild(list);
    $sidebar.appendChild(section);
  });
}

function selectCase(id) {
  currentCase = caseById[id];
  selection = null;
  document.querySelectorAll('.case-btn').forEach(b => b.classList.toggle('active', b.dataset.caseId === id));
  renderCase();
}

function chip(label, opts = {}) {
  // Chips are secondary references to a node (e.g. an NPC card listing the
  // evidence it unlocks). They use data-noderef (not data-node) so click/
  // highlight logic can treat them as pointers to the *real* card, while
  // edge-drawing only ever measures the one true card per node.
  const cls = ['chip'];
  if (opts.cls) cls.push(opts.cls);
  const ref = opts.node ? ` data-noderef="${esc(opts.node)}"` : '';
  return `<span class="${cls.join(' ')}"${ref}>${esc(label)}</span>`;
}

function nameFor(c, type, id) {
  if (type === 'npc') return c.npcById[id]?.name || id;
  if (type === 'evidence') return c.evidenceById[id]?.name || id;
  if (type === 'prophecy') return c.prophecyById[id]?.reference || id;
  if (type === 'suspect') return c.suspectById[id]?.name || id;
  return id;
}

function renderCase() {
  if (!currentCase) {
    $stageWrap.innerHTML = `<div class="empty-state">
      <h1>Miracle Maker 3D — Case Unlock Cheat Sheet</h1>
      <p>Pick a case on the left. Click any pinned card to see what it unlocks (and what unlocked it) — the strings light up across the board. Click a Deduction or Lab row to see exactly which prophecy or verdict that combination unlocks.</p>
      <div class="legend">
        <div><i class="str npc-evidence"></i> Talking to an NPC unlocks Evidence</div>
        <div><i class="str npc-suspect"></i> Talking to an NPC unlocks a Suspect (accused option)</div>
        <div><i class="str chain"></i> Showing an NPC one clue unlocks another</div>
        <div><i class="str evidence-prophecy"></i> Evidence relates to a Prophecy</div>
        <div><i class="str evidence-suspect"></i> Evidence directly unlocks a Suspect</div>
        <div><i class="str deduction"></i> Two Evidence combine in the Lab</div>
        <div><i class="str deduction-prophecy key"></i> ★ Key deduction — unlocks a Prophecy</div>
        <div><i class="str lab"></i> Evidence + Suspect in the Lab → a result</div>
        <div><i class="str verdict"></i> Prophecy confirmed → feeds the true Verdict</div>
      </div>
    </div>`;
    return;
  }
  const c = currentCase;
  const reqCase = c.requires ? caseById[c.requires] : null;

  const npcCards = c.npcs.map(n => {
    const reveals = n.revealsProphecy ? `<div class="row"><span class="row-label">Reveals prophecy</span>${chip(nameFor(c, 'prophecy', n.revealsProphecy), { node: nk('prophecy', n.revealsProphecy), cls: 'prophecy' })}</div>` : '';
    const evChips = (n.unlocksEvidence || []).map(eid => chip(nameFor(c, 'evidence', eid), { node: nk('evidence', eid), cls: 'evidence' })).join(' ');
    const suspChips = (n.unlocksSuspects || []).map(sid => chip(nameFor(c, 'suspect', sid), { node: nk('suspect', sid), cls: 'suspect' })).join(' ');
    const chains = (n._chains || []).map(ch => `<li>Show <b>${esc(nameFor(c, 'evidence', ch.show))}</b> → unlocks <b>${esc(nameFor(c, 'evidence', ch.reveals))}</b></li>`).join('');
    return `<article class="card npc-card" data-node="${nk('npc', n.id)}">
      <div class="pin"></div>
      <header><span class="card-name">${esc(n.name)}</span>${n.role ? `<span class="card-role">${esc(n.role)}</span>` : ''}</header>
      ${n.bibleRef ? `<div class="bibleref">${esc(n.bibleRef)}</div>` : ''}
      ${evChips ? `<div class="row"><span class="row-label">Talk → unlocks evidence</span>${evChips}</div>` : ''}
      ${suspChips ? `<div class="row"><span class="row-label">Talk → unlocks suspect</span>${suspChips}</div>` : ''}
      ${reveals}
      ${chains ? `<details class="chains"><summary>Chained reveals (${(n._chains || []).length})</summary><ul>${chains}</ul></details>` : ''}
    </article>`;
  }).join('');

  const evidenceCards = c.evidence.map(e => {
    const givers = (c.evidenceGivers[e.id] || []).map(nid => chip(nameFor(c, 'npc', nid), { node: nk('npc', nid), cls: 'npc' })).join(' ');
    const propChips = toIdArray(e.relatedProphecy).map(pid => chip(nameFor(c, 'prophecy', pid), { node: nk('prophecy', pid), cls: 'prophecy' })).join(' ');
    const suspChip = (e.revealsSuspect && e.revealsSuspect !== 'none') ? chip(nameFor(c, 'suspect', e.revealsSuspect), { node: nk('suspect', e.revealsSuspect), cls: 'suspect' }) : '';
    return `<article class="card evidence-card" data-node="${nk('evidence', e.id)}">
      <div class="pin"></div>
      <header><span class="card-name">${esc(e.name)}</span>${e.type ? `<span class="card-role">${esc(e.type)}</span>` : ''}</header>
      ${e.location ? `<div class="bibleref">${esc(e.location)}</div>` : ''}
      ${givers ? `<div class="row"><span class="row-label">Given by</span>${givers}</div>` : ''}
      ${propChips ? `<div class="row"><span class="row-label">Relates to prophecy</span>${propChips}</div>` : ''}
      ${suspChip ? `<div class="row"><span class="row-label">Directly reveals</span>${suspChip}</div>` : ''}
    </article>`;
  }).join('');

  const prophecyCards = c.prophecies.map(p => {
    const givers = c.prophecyGivers[p.id] || { npcs: [], evidence: [], deductions: [] };
    const npcChips = givers.npcs.map(nid => chip(nameFor(c, 'npc', nid), { node: nk('npc', nid), cls: 'npc' })).join(' ');
    const evChips = givers.evidence.map(eid => chip(nameFor(c, 'evidence', eid), { node: nk('evidence', eid), cls: 'evidence' })).join(' ');
    const dedChips = givers.deductions.map(d => `<span class="chip deduction ${d.isKey ? 'key' : ''}" data-dedkey="${esc(d.pairKey)}">${d.isKey ? '★ ' : ''}${esc(nameFor(c, 'evidence', d.pairKey.split('+')[0]))} + ${esc(nameFor(c, 'evidence', d.pairKey.split('+')[1]))}</span>`).join(' ');
    const fulfilled = c.fulfilledIds.includes(p.id);
    return `<article class="card prophecy-card ${fulfilled ? 'fulfilled' : ''}" data-node="${nk('prophecy', p.id)}">
      <div class="pin gold"></div>
      ${fulfilled ? '<div class="ribbon">Used in verdict</div>' : ''}
      <header><span class="card-name">${esc(p.reference)}</span></header>
      <blockquote>${esc(p.text || '').slice(0, 160)}${(p.text || '').length > 160 ? '…' : ''}</blockquote>
      ${npcChips ? `<div class="row"><span class="row-label">Direct from NPC</span>${npcChips}</div>` : ''}
      ${evChips ? `<div class="row"><span class="row-label">Related evidence</span>${evChips}</div>` : ''}
      ${dedChips ? `<div class="row"><span class="row-label">Unlocked by lab combo</span>${dedChips}</div>` : ''}
    </article>`;
  }).join('');

  const suspectCards = c.suspects.map(s => {
    const givers = c.suspectGivers[s.id] || { npcs: [], evidence: [] };
    const npcChips = givers.npcs.map(nid => chip(nameFor(c, 'npc', nid), { node: nk('npc', nid), cls: 'npc' })).join(' ');
    const evChips = givers.evidence.map(eid => chip(nameFor(c, 'evidence', eid), { node: nk('evidence', eid), cls: 'evidence' })).join(' ');
    const isTrue = c.truth.culprit === s.id;
    const isNone = s.id === 'none';
    const labRows = c.lab.filter(l => l.suspect === s.id).map(l => `<li data-labkey="${esc(l.evidence)}|${esc(l.suspect)}"><b>${esc(nameFor(c, 'evidence', l.evidence))}</b> → ${l.result || ''}</li>`).join('');
    return `<article class="card suspect-card ${isTrue ? 'true-culprit' : ''} ${isNone ? 'no-crime' : ''}" data-node="${nk('suspect', s.id)}">
      <div class="pin red"></div>
      ${isTrue ? '<div class="ribbon verdict-ribbon">True verdict</div>' : ''}
      <header><span class="card-name">${esc(s.name)}</span>${s.role ? `<span class="card-role">${esc(s.role)}</span>` : ''}</header>
      ${(npcChips || evChips) ? `<div class="row"><span class="row-label">Other ways unlocked</span>${npcChips} ${evChips}</div>` : `<div class="row muted">No direct NPC/evidence unlock recorded — only reachable via the prophecy/verdict chain.</div>`}
      ${labRows ? `<details class="chains" open><summary>Lab results (${c.lab.filter(l => l.suspect === s.id).length})</summary><ul>${labRows}</ul></details>` : ''}
    </article>`;
  }).join('');

  const dedRows = Object.entries(c.deductions).map(([pairKey, types]) => {
    const [a, b] = pairKey.split('+');
    const badges = Object.entries(types || {}).map(([ttype, tval]) => {
      const key = tval && tval.isKey;
      const proph = tval && tval.revealsProphecy ? ` → ${esc(nameFor(c, 'prophecy', tval.revealsProphecy))}` : '';
      return `<span class="tbadge ${key ? 'key' : ''}">${esc(ttype)}${key ? ' ★' : ''}${proph}</span>`;
    }).join(' ');
    return `<tr data-dedrow="${esc(pairKey)}"><td>${esc(nameFor(c, 'evidence', a))} + ${esc(nameFor(c, 'evidence', b))}</td><td>${badges}</td></tr>`;
  }).join('');

  const labRowsAll = c.lab.map(l => `<tr data-labrow="${esc(l.evidence)}|${esc(l.suspect)}"><td>${esc(nameFor(c, 'evidence', l.evidence))}</td><td>${esc(nameFor(c, 'suspect', l.suspect))}</td><td>${(l.result || '').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}</td></tr>`).join('');

  const readingList = (c.truth.furtherReading || []).map(r => `<li>${esc(r)}</li>`).join('');
  const fulfilledChips = c.fulfilledIds.map(pid => chip(nameFor(c, 'prophecy', pid), { node: nk('prophecy', pid), cls: 'prophecy fulfilled' })).join(' ');

  $stageWrap.innerHTML = `
    <div class="case-header">
      <div>
        <div class="case-act-label">${esc(c.actLabel)}</div>
        <h1>${esc(c.title)}</h1>
        <p class="subtitle">${esc(c.subtitle || '')}</p>
      </div>
      <div class="case-meta">
        ${difficultyDots(c.difficulty || 1)}
        ${c.eventLocation ? `<div class="loc">📍 ${esc(c.eventLocation)}</div>` : ''}
        ${reqCase ? `<div class="loc">Requires: <button class="link-btn" data-jump="${esc(reqCase.id)}">${esc(reqCase.title)}</button></div>` : '<div class="loc">Opening case</div>'}
      </div>
    </div>

    <div class="board-toolbar">
      <button id="clear-selection" class="btn">Clear selection</button>
      <span class="hint">Click any card to trace its unlocks. Click again, or Clear, to reset.</span>
    </div>

    <div class="cork-stage" id="cork-stage">
      <svg id="edge-svg"></svg>
      <div class="board">
        <div class="board-col"><h3>NPCs <span class="count">${c.npcs.length}</span></h3><div class="col-scroll">${npcCards || '<p class="muted">None</p>'}</div></div>
        <div class="board-col"><h3>Evidence <span class="count">${c.evidence.length}</span></h3><div class="col-scroll">${evidenceCards || '<p class="muted">None</p>'}</div></div>
        <div class="board-col"><h3>Prophecies <span class="count">${c.prophecies.length}</span></h3><div class="col-scroll">${prophecyCards || '<p class="muted">None</p>'}</div></div>
        <div class="board-col"><h3>Accused <span class="count">${c.suspects.length}</span></h3><div class="col-scroll">${suspectCards || '<p class="muted">None</p>'}</div></div>
      </div>
    </div>

    <div class="lower-grid">
      <section class="panel">
        <h3>Lab Deductions <span class="muted-sm">(combine 2 evidence)</span></h3>
        <table class="data-table"><thead><tr><th>Evidence pair</th><th>Comparison types</th></tr></thead><tbody>${dedRows || '<tr><td colspan="2" class="muted">None recorded</td></tr>'}</tbody></table>
      </section>
      <section class="panel">
        <h3>Lab Results <span class="muted-sm">(evidence shown to suspect)</span></h3>
        <table class="data-table"><thead><tr><th>Evidence</th><th>Suspect</th><th>Result</th></tr></thead><tbody>${labRowsAll || '<tr><td colspan="3" class="muted">None recorded</td></tr>'}</tbody></table>
      </section>
    </div>

    <section class="verdict-panel ${c.truth.culprit ? '' : ''}">
      <h3>Verdict — how the prophecies unlock the accused</h3>
      <p class="muted-sm">Once the prophecies below are confirmed (via the evidence/deductions that reveal them), the case resolves to this verdict — drawn directly from this case's <code>truth</code> data.</p>
      <div class="verdict-body">
        <div class="verdict-prophecies"><span class="row-label">Prophecies required</span>${fulfilledChips || '<span class="muted">None listed</span>'}</div>
        <div class="verdict-accused">
          <span class="row-label">True verdict</span>
          <div class="chip suspect fulfilled" data-node="${nk('suspect', c.truth.culprit)}">${esc(nameFor(c, 'suspect', c.truth.culprit))}</div>
        </div>
      </div>
      ${c.truth.motive ? `<p><b>Motive:</b> ${esc(c.truth.motive)}</p>` : ''}
      ${c.truth.method ? `<p><b>Method:</b> ${esc(c.truth.method)}</p>` : ''}
      ${c.truth.lesson ? `<p><b>Lesson:</b> ${esc(c.truth.lesson)}</p>` : ''}
      ${readingList ? `<p><b>Further reading:</b></p><ul class="reading">${readingList}</ul>` : ''}
    </section>
  `;

  wireInteractions();
}

function wireInteractions() {
  const stage = document.getElementById('cork-stage');
  const svg = document.getElementById('edge-svg');

  document.getElementById('clear-selection')?.addEventListener('click', () => applySelection(null));
  document.querySelectorAll('[data-jump]').forEach(btn => btn.addEventListener('click', () => selectCase(btn.dataset.jump)));

  stage.querySelectorAll('[data-node], [data-noderef]').forEach(el => {
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const key = el.getAttribute('data-node') || el.getAttribute('data-noderef');
      if (!key) return;
      if (selection && selection.focus === key) { applySelection(null); return; }
      selectByNode(key);
    });
  });

  document.querySelectorAll('[data-dedrow], [data-dedkey]').forEach(el => {
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const pairKey = el.getAttribute('data-dedrow') || el.getAttribute('data-dedkey');
      selectByDeduction(pairKey);
    });
  });

  document.querySelectorAll('[data-labrow], [data-labkey]').forEach(el => {
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const raw = el.getAttribute('data-labrow') || el.getAttribute('data-labkey');
      const [eid, sid] = raw.split('|');
      selectByLab(eid, sid);
    });
  });

  applySelection(selection); // repaint if a selection persisted (e.g. window resize)
  window.addEventListener('resize', () => drawEdges(), { passive: true });
}

function selectByNode(key) {
  const c = currentCase;
  const related = new Set([key]);
  const edgesHere = c.edges.filter(e => e.from === key || e.to === key);
  edgesHere.forEach(e => { related.add(e.from); related.add(e.to); });
  applySelection({ focus: key, keys: related, edges: edgesHere });
}

function selectByDeduction(pairKey) {
  const c = currentCase;
  const [a, b] = pairKey.split('+');
  const keys = new Set([nk('evidence', a), nk('evidence', b)]);
  const edgesHere = c.edges.filter(e => e.pairKey === pairKey);
  edgesHere.forEach(e => { keys.add(e.from); keys.add(e.to); });
  applySelection({ focus: null, keys, edges: edgesHere });
}

function selectByLab(eid, sid) {
  const c = currentCase;
  const keys = new Set([nk('evidence', eid), nk('suspect', sid)]);
  const edgesHere = c.edges.filter(e => e.kind === 'lab' && e.from === nk('evidence', eid) && e.to === nk('suspect', sid));
  applySelection({ focus: null, keys, edges: edgesHere });
}

function applySelection(sel) {
  selection = sel;
  const stage = document.getElementById('cork-stage');
  if (!stage) return;
  const active = sel ? sel.keys : null;
  stage.querySelectorAll('[data-node], [data-noderef]').forEach(el => {
    const key = el.getAttribute('data-node') || el.getAttribute('data-noderef');
    const isPrimary = el.hasAttribute('data-node');
    el.classList.toggle('selected', !!active && isPrimary && key === sel.focus);
    el.classList.toggle('lit', !!active && active.has(key));
    el.classList.toggle('dimmed', !!active && !active.has(key));
  });
  drawEdges();
}

function drawEdges() {
  const stage = document.getElementById('cork-stage');
  const svg = document.getElementById('edge-svg');
  if (!stage || !svg) return;
  const stageRect = stage.getBoundingClientRect();
  svg.setAttribute('width', stageRect.width);
  svg.setAttribute('height', stageRect.height);
  svg.innerHTML = '';
  if (!selection) return;

  const rects = {};
  stage.querySelectorAll('[data-node]').forEach(el => {
    const key = el.getAttribute('data-node');
    if (selection.keys.has(key)) rects[key] = el.getBoundingClientRect();
  });

  selection.edges.forEach(edge => {
    const r1 = rects[edge.from], r2 = rects[edge.to];
    if (!r1 || !r2) return;
    const p1 = { x: r1.left - stageRect.left, y: r1.top - stageRect.top + r1.height / 2 };
    const p2 = { x: r2.left - stageRect.left, y: r2.top - stageRect.top + r2.height / 2 };
    const rightward = r2.left >= r1.left;
    const x1 = rightward ? r1.right - stageRect.left : r1.left - stageRect.left;
    const x2 = rightward ? r2.left - stageRect.left : r2.right - stageRect.left;
    const y1 = p1.y, y2 = p2.y;
    const sameCol = Math.abs(x1 - x2) < 4 || Math.abs(r1.left - r2.left) < 4;
    let d;
    if (sameCol) {
      const bulge = 46;
      const midY = (y1 + y2) / 2;
      d = `M ${x1} ${y1} C ${x1 + bulge} ${y1} ${x1 + bulge} ${y2} ${x2} ${y2}`;
    } else {
      const dx = (x2 - x1) * 0.5;
      d = `M ${x1} ${y1} C ${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
    }
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', `str ${edge.kind}${edge.isKey ? ' key' : ''}`);
    if (edge.result || edge.ttype) {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      t.textContent = edge.result || edge.ttype;
      path.appendChild(t);
    }
    svg.appendChild(path);
  });
}

buildSidebar();
renderCase();
