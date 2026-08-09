import * as act1 from './act1_case.js';
import * as act2 from './act2_case.js';
import * as act3 from './act3_case.js';
import * as act4 from './act4_case.js';

const ACT_FILES = [
  { label: 'Act I', keys: Object.keys(act1), mod: act1 },
  { label: 'Act II', keys: Object.keys(act2), mod: act2 },
  { label: 'Act III', keys: Object.keys(act3), mod: act3 },
  { label: 'Act IV', keys: Object.keys(act4), mod: act4 },
];

const norm = s => (s || '').toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, '');
const toIdArray = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);

function loadCases() {
  const cases = [];
  ACT_FILES.forEach(act => {
    act.keys.forEach(k => {
      const raw = act.mod[k];
      if (raw && raw.id) cases.push({ raw, exportName: k, actLabel: act.label });
    });
  });
  return cases;
}

function validateCase({ raw, exportName, actLabel }) {
  const issues = [];
  const warnings = [];

  const npcs = (raw.npcs || []).filter(Boolean);
  const evidence = (raw.evidencePool || []).filter(Boolean);
  const suspects = (raw.suspects || []).filter(Boolean);
  const prophecies = (raw.prophecies || []).filter(Boolean);
  const deductions = raw.deductions || {};
  const lab = raw.lab || [];
  const truth = raw.truth || {};

  const evidenceById = Object.fromEntries(evidence.map(e => [e.id, e]));
  const suspectById = Object.fromEntries(suspects.map(s => [s.id, s]));
  const prophecyById = Object.fromEntries(prophecies.map(p => [p.id, p]));

  function checkDupes(list, label) {
    const seen = new Map();
    list.forEach(item => {
      if (!item.id) { issues.push(`${label} entry missing an id`); return; }
      seen.set(item.id, (seen.get(item.id) || 0) + 1);
    });
    seen.forEach((count, id) => { if (count > 1) issues.push(`Duplicate ${label} id "${id}" (${count}x)`); });
  }
  checkDupes(evidence, 'evidence');
  checkDupes(npcs, 'npc');
  checkDupes(suspects, 'suspect');
  checkDupes(prophecies, 'prophecy');

  // ---- NPC evidence references -----------------------------------------
  npcs.forEach(n => (n.unlocksEvidence || []).forEach(eid => {
    if (!evidenceById[eid]) issues.push(`NPC "${n.id}" unlocksEvidence references unknown evidence "${eid}"`);
  }));

  // Chains — validate ids the same way app.js resolves them (object-form
  // revealedClue only counts values that ARE real evidence ids).
  npcs.forEach(n => {
    Object.entries(n.reactions || {}).forEach(([shownId, reaction]) => {
      if (!reaction || typeof reaction !== 'object') return;
      if (shownId !== 'default' && !evidenceById[shownId]) issues.push(`NPC "${n.id}" has a reaction keyed to unknown evidence "${shownId}"`);
      const rc = reaction.revealedClue;
      if (!rc) return;
      const revealedIds = typeof rc === 'string' ? [rc]
        : (typeof rc === 'object' ? Object.values(rc).filter(v => typeof v === 'string' && evidenceById[v]) : []);
      if (typeof rc === 'string' && !evidenceById[rc]) {
        issues.push(`NPC "${n.id}" reaction to "${shownId}" reveals unknown evidence id "${rc}"`);
      }
      if (typeof rc === 'object' && !revealedIds.length) {
        warnings.push(`NPC "${n.id}" reaction to "${shownId}" has a revealedClue object with no resolvable evidence id: ${JSON.stringify(rc)}`);
      }
    });
  });

  // ---- suspect references -----------------------------------------
  npcs.forEach(n => (n.unlocksSuspects || []).forEach(sid => {
    if (!suspectById[sid]) {
      const selfRef = sid === n.id;
      issues.push(`NPC "${n.id}" unlocksSuspects references "${sid}", which is not in this case's suspects list${selfRef ? ' (looks like a copy-paste of the NPC\'s own id)' : ''}.`);
    }
  }));
  evidence.forEach(e => {
    if (e.revealsSuspect && e.revealsSuspect !== 'none' && !suspectById[e.revealsSuspect]) {
      issues.push(`Evidence "${e.id}" revealsSuspect references unknown suspect "${e.revealsSuspect}"`);
    }
  });

  // ---- prophecy references + "orphan" check (zero connections anywhere) --
  const propConnections = {};
  function noteProphecy(pid, source) {
    if (!pid) return;
    if (!prophecyById[pid]) { issues.push(`${source} references unknown prophecy id "${pid}"`); return; }
    (propConnections[pid] ??= []).push(source);
  }
  npcs.forEach(n => { if (n.revealsProphecy) noteProphecy(n.revealsProphecy, `NPC "${n.id}"`); });
  evidence.forEach(e => {
    toIdArray(e.relatedProphecy).filter(pid => pid !== '-').forEach(pid => noteProphecy(pid, `Evidence "${e.id}"`));
  });
  Object.entries(deductions).forEach(([pairKey, types]) => {
    const [a, b] = pairKey.split('+');
    if (!evidenceById[a]) issues.push(`Deduction "${pairKey}" references unknown evidence "${a}"`);
    if (!evidenceById[b]) issues.push(`Deduction "${pairKey}" references unknown evidence "${b}"`);
    Object.entries(types || {}).forEach(([ttype, tval]) => {
      if (!tval || typeof tval !== 'object') { warnings.push(`Deduction "${pairKey}" type "${ttype}" has no content`); return; }
      if (!tval.text) warnings.push(`Deduction "${pairKey}" type "${ttype}" has no feedback text`);
      if (tval.revealsProphecy) noteProphecy(tval.revealsProphecy, `Deduction "${pairKey}" (${ttype})`);
    });
  });
  prophecies.forEach(p => {
    if (!propConnections[p.id]) {
      issues.push(`Prophecy "${p.id}" (${p.reference}) has NO connection anywhere — no NPC, evidence, or deduction links to it at all. It can never surface in play.`);
    }
  });

  // ---- lab correctness -----------------------------------------
  if (!lab.length) warnings.push(`No lab entries at all.`);
  const labPairsSeen = new Set();
  lab.forEach((l, i) => {
    const label = `Lab entry #${i + 1}`;
    if (!l.evidence) { issues.push(`${label} is missing an "evidence" id`); return; }
    if (!l.suspect) { issues.push(`${label} is missing a "suspect" id`); return; }
    if (!evidenceById[l.evidence]) issues.push(`${label} references unknown evidence "${l.evidence}"`);
    if (l.suspect !== 'none' && !suspectById[l.suspect]) {
      const byName = suspects.find(s => norm(s.name) === norm(l.suspect));
      issues.push(`${label} references unknown suspect "${l.suspect}"${byName ? ` (did you mean id "${byName.id}"?)` : ''}`);
    }
    if (!l.result || !String(l.result).trim()) issues.push(`${label} (${l.evidence} → ${l.suspect}) has no feedback "result" text.`);
    const pairKey = `${l.evidence}|${l.suspect}`;
    if (labPairsSeen.has(pairKey)) warnings.push(`${label}: duplicate lab pair "${pairKey}"`);
    labPairsSeen.add(pairKey);
  });
  suspects.forEach(s => {
    if (s.id === 'none') return;
    if (!lab.some(l => l.suspect === s.id)) warnings.push(`Suspect "${s.id}" (${s.name}) has no lab entries — no evidence can be presented to them.`);
  });

  // ---- solution / truth -----------------------------------------
  if (!raw.truth) {
    issues.push(`Case has no "truth" object at all — no solution defined.`);
  } else {
    if (truth.culprit === undefined || truth.culprit === null || truth.culprit === '') {
      issues.push(`truth.culprit is missing.`);
    } else if (truth.culprit !== 'none') {
      const direct = suspectById[truth.culprit];
      const byName = suspects.find(s => norm(s.name) === norm(truth.culprit) || norm(s.id) === norm(truth.culprit));
      if (!direct && !byName) issues.push(`truth.culprit "${truth.culprit}" does not match any suspect id or name.`);
      else if (!direct && byName) warnings.push(`truth.culprit "${truth.culprit}" matches suspect "${byName.id}" only by name, not id.`);
    }
    if (!truth.motive) warnings.push(`truth.motive is missing.`);
    if (!truth.method && truth.culprit !== 'none') warnings.push(`truth.method is missing.`);
    if (!truth.lesson) warnings.push(`truth.lesson is missing.`);

    const fulfilled = toIdArray(truth.prophesyFulfilled);
    if (!fulfilled.length) warnings.push(`truth.prophesyFulfilled is empty.`);
    else fulfilled.forEach(ref => {
      const p = prophecies.find(pp => norm(pp.reference) === norm(ref));
      if (!p) {
        const close = prophecies.find(pp => norm(pp.reference).slice(0, 8) === norm(ref).slice(0, 8));
        issues.push(`truth.prophesyFulfilled references "${ref}" — no prophecy in this case has that exact "reference" text${close ? ` (closest match: "${close.reference}")` : ''}.`);
      }
    });
  }

  return {
    id: raw.id, exportName, actLabel, title: raw.title, requires: raw.requires,
    counts: { npcs: npcs.length, evidence: evidence.length, suspects: suspects.length, prophecies: prophecies.length, lab: lab.length, deductions: Object.keys(deductions).length },
    issues, warnings,
  };
}

const cases = loadCases();
const results = cases.map(validateCase);
const idSet = new Set(results.map(r => r.id));
results.forEach(r => {
  if (r.requires && !idSet.has(r.requires)) r.issues.push(`requires "${r.requires}" does not match any case id.`);
});

let totalIssues = 0, totalWarnings = 0;
results.forEach(r => {
  totalIssues += r.issues.length;
  totalWarnings += r.warnings.length;
  const status = r.issues.length ? '❌ FAIL' : (r.warnings.length ? '⚠️  WARN' : '✅ OK');
  console.log(`\n${status}  [${r.actLabel}] ${r.exportName} — "${r.title}" (${r.id})`);
  r.issues.forEach(msg => console.log(`   ISSUE:   ${msg}`));
  r.warnings.forEach(msg => console.log(`   warning: ${msg}`));
});
console.log(`\n============================================================`);
console.log(`${results.length} cases checked. ${totalIssues} issues, ${totalWarnings} warnings.`);
console.log(`============================================================`);
