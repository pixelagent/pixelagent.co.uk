/* =========================================================================
   NOAH — Interactive Comic Book
   Architecture: loads data/story.json + svg/*.svg at runtime.
   Engine mirrors Jonah-v1 pattern: CHARACTERS, renderLine, particles, nav.
   ========================================================================= */

/* =========================================================================
   CHARACTERS — inline SVG portrait icons
   ========================================================================= */
const CHARACTERS = {
  noah: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="38" r="22" fill="#D4956A" stroke="#0A0812" stroke-width="4"/>
    <path d="M28 42 Q20 70 30 90 Q50 100 70 90 Q80 70 72 42" fill="#EEE8DC" stroke="#0A0812" stroke-width="3"/>
    <circle cx="43" cy="36" r="3.5" fill="#0A0812"/><circle cx="57" cy="36" r="3.5" fill="#0A0812"/>
    <path d="M39 30 Q43 27 46 30" fill="none" stroke="#0A0812" stroke-width="3" stroke-linecap="round"/>
    <path d="M61 30 Q57 27 54 30" fill="none" stroke="#0A0812" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 50 Q50 54 56 50" fill="none" stroke="#0A0812" stroke-width="3" stroke-linecap="round"/>
    <path d="M22 78 Q50 70 78 78 L72 100 L28 100 Z" fill="#8B5E2F" stroke="#0A0812" stroke-width="4"/>
    <line x1="74" y1="78" x2="82" y2="100" stroke="#5C3A1A" stroke-width="5" stroke-linecap="round"/>
  </svg>`,
  god: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 52 Q8 32 32 30 Q44 10 62 26 Q80 18 84 40 Q98 46 90 62 Q86 80 68 76 Q50 92 34 76 Q12 76 18 52Z" fill="#E8B84B" stroke="#0A0812" stroke-width="4"/>
    <line x1="50" y1="8"  x2="50" y2="0"  stroke="#E8B84B" stroke-width="3"/>
    <line x1="80" y1="18" x2="86" y2="12" stroke="#E8B84B" stroke-width="3"/>
    <line x1="20" y1="18" x2="14" y2="12" stroke="#E8B84B" stroke-width="3"/>
    <circle cx="42" cy="50" r="3.5" fill="#0A0812"/><circle cx="58" cy="50" r="3.5" fill="#0A0812"/>
    <circle cx="43" cy="49" r="1" fill="#FFF"/><circle cx="59" cy="49" r="1" fill="#FFF"/>
    <path d="M38 62 Q50 72 62 62" fill="none" stroke="#0A0812" stroke-width="4" stroke-linecap="round"/>
  </svg>`,
  wife: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="36" r="20" fill="#C8855A" stroke="#0A0812" stroke-width="4"/>
    <path d="M30 30 Q50 10 70 30 Q72 24 50 18 Q28 24 30 30Z" fill="#7A4A2A" stroke="#0A0812" stroke-width="3"/>
    <rect x="28" y="28" width="44" height="6" rx="3" fill="#7A4A2A" stroke="#0A0812" stroke-width="2"/>
    <circle cx="44" cy="36" r="3" fill="#0A0812"/><circle cx="56" cy="36" r="3" fill="#0A0812"/>
    <path d="M43 48 Q50 52 57 48" fill="none" stroke="#0A0812" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M24 76 Q50 68 76 76 L70 100 L30 100 Z" fill="#5A7A3A" stroke="#0A0812" stroke-width="4"/>
  </svg>`,
  son: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="38" r="20" fill="#D4956A" stroke="#0A0812" stroke-width="4"/>
    <path d="M30 32 Q50 14 70 32 Q68 24 50 20 Q32 24 30 32Z" fill="#3A2010" stroke="#0A0812" stroke-width="2"/>
    <circle cx="44" cy="38" r="3.5" fill="#0A0812"/><circle cx="56" cy="38" r="3.5" fill="#0A0812"/>
    <path d="M44 50 Q50 46 56 50" fill="none" stroke="#0A0812" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M26 76 Q50 68 74 76 L68 100 L32 100 Z" fill="#4A6A2A" stroke="#0A0812" stroke-width="4"/>
  </svg>`,
  crowd: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(8,10)"><circle cx="20" cy="22" r="14" fill="#C87A50" stroke="#0A0812" stroke-width="3"/>
    <circle cx="16" cy="20" r="2.5" fill="#0A0812"/><circle cx="24" cy="20" r="2.5" fill="#0A0812"/>
    <path d="M15 30 Q20 26 25 30" fill="none" stroke="#0A0812" stroke-width="2.5"/>
    <path d="M8 60 Q20 54 32 60 L30 80 L10 80 Z" fill="#A05020" stroke="#0A0812" stroke-width="3"/></g>
    <g transform="translate(42,4)"><circle cx="20" cy="22" r="15" fill="#B87040" stroke="#0A0812" stroke-width="3"/>
    <circle cx="16" cy="20" r="2.5" fill="#0A0812"/><circle cx="24" cy="20" r="2.5" fill="#0A0812"/>
    <path d="M14 32 Q20 28 26 32" fill="none" stroke="#0A0812" stroke-width="2.5"/>
    <path d="M6 62 Q20 56 34 62 L32 82 L8 82 Z" fill="#6A3A1A" stroke="#0A0812" stroke-width="3"/></g>
    <g transform="translate(76,10)"><circle cx="20" cy="22" r="14" fill="#D49060" stroke="#0A0812" stroke-width="3"/>
    <circle cx="16" cy="20" r="2.5" fill="#0A0812"/><circle cx="24" cy="20" r="2.5" fill="#0A0812"/>
    <path d="M14 31 Q20 27 26 31" fill="none" stroke="#0A0812" stroke-width="2.5"/>
    <path d="M8 60 Q20 54 32 60 L30 80 L10 80 Z" fill="#8A5A2A" stroke="#0A0812" stroke-width="3"/></g>
  </svg>`,
  family: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="28" r="16" fill="#D4956A" stroke="#0A0812" stroke-width="3"/>
    <path d="M44 32 Q48 48 60 52 Q72 48 76 32" fill="#EEE8DC" stroke="#0A0812" stroke-width="2"/>
    <circle cx="55" cy="28" r="2.5" fill="#0A0812"/><circle cx="65" cy="28" r="2.5" fill="#0A0812"/>
    <path d="M38 72 Q60 62 82 72 L76 92 L44 92 Z" fill="#8B5E2F" stroke="#0A0812" stroke-width="3"/>
    <circle cx="20" cy="40" r="11" fill="#C8855A" stroke="#0A0812" stroke-width="2.5"/>
    <path d="M10 64 Q20 58 30 64 L28 80 L12 80 Z" fill="#5A7A3A" stroke="#0A0812" stroke-width="2.5"/>
    <circle cx="100" cy="40" r="11" fill="#C87A50" stroke="#0A0812" stroke-width="2.5"/>
    <path d="M90 64 Q100 58 110 64 L108 80 L92 80 Z" fill="#4A6A2A" stroke="#0A0812" stroke-width="2.5"/>
  </svg>`,
  narrator: null
};

/* =========================================================================
   STATE
   ========================================================================= */
let STORY = [];
let actIdx = 0, lineIdx = 0, transitioning = false, choicePending = false, nextLineTimeout = null;

const el         = s => document.querySelector(s);
const stage      = el('#stage');
const choicesBox = el('#choices');
const delayNote  = el('#delayNote');
const nextBtn    = el('#nextBtn');
const nextLineBtn= el('#nextLineBtn');
const portal     = el('#portal');
const bgGradient = el('#bgGradient');
const dotsBox    = el('#dots');

/* ── SVG cache ─────────────────────────────────── */
const svgCache = {};
async function loadSvg(key) {
  if (svgCache[key]) return svgCache[key];
  try {
    const res = await fetch(`svg/${key}.svg`);
    if (!res.ok) throw new Error();
    svgCache[key] = await res.text();
  } catch {
    svgCache[key] = svgCache['placeholder'] || '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#0c0604"/><line x1="0" y1="0" x2="400" y2="300" stroke="#E8B84B" stroke-width="2"/><line x1="400" y1="0" x2="0" y2="300" stroke="#E8B84B" stroke-width="2"/></svg>';
  }
  return svgCache[key];
}

function currentAct() { return STORY[actIdx]; }

/* ── Dot progress bar ─────────────────────────── */
function buildDots() {
  dotsBox.innerHTML = '';
  currentAct().lines.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i === lineIdx ? ' on' : '');
    dotsBox.appendChild(d);
  });
}

/* ── Chapter select dropdown ──────────────────── */
function populateChapterSelect() {
  const sel = el('#chapterSelect');
  sel.innerHTML = '';
  STORY.forEach((act, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = act.name;
    if (i === actIdx) opt.selected = true;
    sel.appendChild(opt);
  });
}

/* ── Word-by-word animation HTML builder ──────── */
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function buildLineHTML(text, fx) {
  if (fx === 'shake') return `<span class="line-inner">${escapeHtml(text)}</span>`;
  return text.split(' ').map((word, i) => {
    const delays = { bounce: 60, type: 120, wave: 10, fade: 18 };
    const d = (delays[fx] || 18) * i;
    return `<span class="word" style="animation-delay:${d}ms">${escapeHtml(word)}</span> `;
  }).join('');
}

/* ── Choices ──────────────────────────────────── */
function renderChoices(data) {
  choicesBox.innerHTML = '';
  delayNote.classList.remove('show');
  delayNote.textContent = '';
  if (data.choices && !choicePending) {
    choicePending = true;
    choicesBox.classList.add('show');
    data.choices.forEach(c => {
      const b = document.createElement('button');
      b.className = 'choiceBtn';
      b.textContent = c.label;
      b.onclick = () => {
        choicesBox.classList.remove('show');
        delayNote.className = 'show';
        delayNote.textContent = c.note;
        choicePending = false;
        updateNextBtn();
      };
      choicesBox.appendChild(b);
    });
  } else {
    choicesBox.classList.remove('show');
  }
}

/* ── Next / NextLine button state ─────────────── */
function updateNextBtn() {
  const atEnd    = lineIdx === currentAct().lines.length - 1 && !choicePending;
  const notAtEnd = lineIdx <  currentAct().lines.length - 1 && !choicePending;
  const pal = `palette-act-${actIdx + 1}`;
  nextBtn.className = pal;
  nextBtn.classList.toggle('show', atEnd);
  nextBtn.textContent = actIdx === STORY.length - 1 ? 'Read Again ↺' : 'Next Chapter ↴';
  nextBtn.classList.toggle('finale', actIdx === STORY.length - 1);
  nextLineBtn.className = pal;
  nextLineBtn.classList.toggle('show', notAtEnd);
  nextLineBtn.textContent = 'Next →';
}

/* ── Main render ──────────────────────────────── */
async function renderLine() {
  if (delayNote.parentNode) delayNote.parentNode.removeChild(delayNote);
  delayNote.className = '';
  delayNote.textContent = '';
  stage.innerHTML = '';
  if (nextLineTimeout) { clearTimeout(nextLineTimeout); nextLineTimeout = null; }

  const act  = currentAct();
  const data = act.lines[lineIdx];

  bgGradient.style.background = act.bg;
  document.body.className = `palette-act-${actIdx + 1}`;

  const isWet     = ['flood', 'door', 'waiting'].includes(act.id) || act.particle === 'storm' || act.particle === 'flood';
  const isRainbow = act.id === 'covenant';
  const isDawn    = act.id === 'dryground' || act.particle === 'dawn';
  el('#rainLayer').classList.toggle('active', isWet);
  el('#ambientLayer').classList.toggle('active', isRainbow || isDawn);
  el('#ambientLayer').classList.toggle('rainbow', isRainbow);

  const frame = document.createElement('div');
  frame.className = `comic-frame popIn palette-act-${actIdx + 1}`;

  const graphicContainer = document.createElement('div');
  graphicContainer.id = 'graphicContainer';
  const svgLayer = document.createElement('div');
  svgLayer.id = 'svgLayer';
  svgLayer.innerHTML = await loadSvg(data.svg || act.svg);
  graphicContainer.appendChild(svgLayer);
  frame.appendChild(graphicContainer);

  const overlay = document.createElement('div');
  overlay.className = 'content-overlay';
  frame.appendChild(overlay);
  stage.appendChild(frame);
  overlay.appendChild(delayNote);

  setParticleMode(act.particle || 'dusk');

  setTimeout(() => {
    if (data.speaker && CHARACTERS[data.speaker]) {
      const charBox = document.createElement('div');
      charBox.className = 'char-container';
      charBox.innerHTML = CHARACTERS[data.speaker];
      overlay.appendChild(charBox);
    }

    if (data.sfx) {
      const sfxDiv = document.createElement('div');
      sfxDiv.className = 'sfx fx-bounce';
      sfxDiv.innerHTML = buildLineHTML(data.sfx, 'sfx');
      overlay.appendChild(sfxDiv);
    }

    if (data.text) {
      if (data.speaker === 'narrator') {
        const cap = document.createElement('div');
        cap.className = `caption fx-${data.fx} caption-${data.align || 'center'}`;
        cap.innerHTML = buildLineHTML(data.text, data.fx);
        overlay.appendChild(cap);
      } else {
        const align = data.align || 'center';
        const wrap = document.createElement('div');
        wrap.className = `bubble-wrap align-${align}`;
        const bub = document.createElement('div');
        bub.className = `bubble ${data.speaker} fx-${data.fx} bubble-${align}`;
        bub.innerHTML = buildLineHTML(data.text, data.fx);
        wrap.appendChild(bub);
        overlay.appendChild(wrap);
      }
    }

    if (data.cite) {
      const cite = document.createElement('div');
      cite.style.cssText = 'font-family:"Space Mono",monospace;font-size:10px;color:rgba(255,255,255,.45);text-align:center;position:absolute;bottom:6px;left:0;right:0;z-index:5;';
      cite.textContent = '— ' + data.cite;
      frame.appendChild(cite);
    }

    const wordEls = overlay.querySelectorAll('.word');
    const delays = { bounce: 60, sfx: 60, type: 120, wave: 10, fade: 18 };
    const step = delays[data.fx] || 18;
    const dur  = (data.fx === 'bounce' || data.fx === 'sfx') ? 500 : (data.fx === 'type') ? 200 : 400;
    const totalMs = wordEls.length > 0 ? (wordEls.length - 1) * step + dur : 0;
    nextLineTimeout = setTimeout(() => updateNextBtn(), Math.max(totalMs, 900));
  }, 800);

  buildDots();
  renderChoices(data);
}

/* =========================================================================
   NAVIGATION
   ========================================================================= */
async function goLine(delta) {
  if (transitioning) return;
  if (choicePending) { choicePending = false; choicesBox.classList.remove('show'); }
  delayNote.className = '';
  nextBtn.classList.remove('show');
  nextLineBtn.classList.remove('show');
  const nl = lineIdx + delta;
  if (nl < 0 || nl >= currentAct().lines.length) return;
  transitioning = true;
  const currentFrame = stage.querySelector('.comic-frame');
  if (currentFrame) {
    currentFrame.classList.replace('popIn', 'popOut');
    await new Promise(r => setTimeout(r, 350));
  }
  lineIdx = nl;
  transitioning = false;
  renderLine();
}

function fallTransition(mid) {
  return new Promise(resolve => {
    portal.className = 'falling';
    setTimeout(() => { mid(); portal.className = 'rising'; }, 750);
    setTimeout(() => { portal.className = ''; resolve(); }, 1450);
  });
}

function goNextChapter() {
  if (transitioning) return;
  if (actIdx >= STORY.length - 1) {
    fallTransition(() => { actIdx = 0; lineIdx = 0; populateChapterSelect(); renderLine(); });
    return;
  }
  fallTransition(() => { actIdx++; lineIdx = 0; choicePending = false; populateChapterSelect(); renderLine(); });
}

function jumpToChapter(newIdx) {
  if (newIdx === actIdx || transitioning) return;
  fallTransition(() => { actIdx = newIdx; lineIdx = 0; choicePending = false; renderLine(); });
}

/* =========================================================================
   PARTICLE SYSTEM
   ========================================================================= */
const canvas = el('#particles');
const ctx    = canvas.getContext('2d');
let W, H, particles = [], pMode = 'dusk';

function resizeCanvas() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }

function newParticle(randomY) {
  const p = { x: Math.random() * W, y: randomY ? Math.random() * H : H + 10 };
  switch (pMode) {
    case 'storm': case 'flood':
      p.r = pMode === 'storm' ? 0.8 + Math.random() : 0.6 + Math.random() * 0.9;
      p.vx = -1 - Math.random() * (pMode === 'storm' ? 2 : 1);
      p.vy = (pMode === 'storm' ? 6 : 4) + Math.random() * 4;
      p.color = pMode === 'storm' ? `rgba(180,210,240,${0.3+Math.random()*0.4})` : `rgba(100,160,220,${0.2+Math.random()*0.3})`;
      p.type = 'rain'; p.y = randomY ? Math.random() * H : -10; break;
    case 'dawn':
      p.r = 1 + Math.random() * 2; p.vx = (Math.random()-0.5)*0.4; p.vy = -(0.3+Math.random()*0.6);
      p.color = `hsla(${30+Math.random()*40},80%,75%,${0.4+Math.random()*0.4})`; p.type = 'mote'; break;
    case 'rainbow':
      p.r = 1 + Math.random() * 2; p.vx = (Math.random()-0.5)*0.6; p.vy = -(0.5+Math.random()*0.8);
      p.color = `hsla(${Math.random()*360},90%,70%,${0.3+Math.random()*0.4})`; p.type = 'mote'; break;
    case 'ember':
      p.r = 0.5 + Math.random() * 2; p.vx = (Math.random()-0.5)*0.8; p.vy = -(0.8+Math.random()*1.5);
      p.color = `hsla(${20+Math.random()*30},95%,${55+Math.random()*20}%,${0.4+Math.random()*0.4})`; p.type = 'mote'; break;
    case 'constellation':
      p.r = 0.5 + Math.random()*1.5; p.vx = 0; p.vy = 0;
      p.twinkle = Math.random()*Math.PI*2; p.color = `rgba(255,255,255,${0.3+Math.random()*0.5})`; p.type = 'star'; break;
    default:
      p.r = 0.5 + Math.random()*1.8; p.vx = (Math.random()-0.5)*0.3; p.vy = -(0.2+Math.random()*0.4);
      p.color = `rgba(200,180,140,${0.15+Math.random()*0.25})`; p.type = 'mote';
  }
  return p;
}

function setParticleMode(m) { if (pMode === m) return; pMode = m; particles = Array.from({length: Math.min(Math.floor(W*H/6000),120)}, () => newParticle(true)); }

function tickParticles() {
  requestAnimationFrame(tickParticles);
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p, i) => {
    ctx.beginPath();
    if (p.type === 'rain') {
      ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 3, p.y + p.vy * 3);
      ctx.strokeStyle = p.color; ctx.lineWidth = p.r; ctx.stroke();
    } else if (p.type === 'star') {
      p.twinkle += 0.03;
      const a = 0.2 + 0.5 * (0.5 + 0.5 * Math.sin(p.twinkle));
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color.replace(/[\d.]+\)$/, a + ')'); ctx.fill();
    } else {
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fillStyle = p.color; ctx.fill();
    }
    p.x += p.vx; p.y += p.vy;
    const off = p.y < -20 || p.y > H+20 || p.x < -20 || p.x > W+20;
    if (off) particles[i] = newParticle(false);
  });
}

/* =========================================================================
   EVENT LISTENERS & INIT
   ========================================================================= */
window.addEventListener('resize', () => { resizeCanvas(); });
resizeCanvas();
tickParticles();

nextLineBtn.addEventListener('click', () => goLine(1));
nextBtn.addEventListener('click', () => {
  if (actIdx === STORY.length - 1) { jumpToChapter(0); }
  else goNextChapter();
});

el('#chapterSelect').addEventListener('change', e => jumpToChapter(parseInt(e.target.value)));

let touchStartX = 0;
window.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
window.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 60) { if (dx < 0) goLine(1); else goLine(-1); }
}, { passive: true });

window.addEventListener('keydown', e => {
  if (e.code === 'ArrowRight' || e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); goLine(1); }
  if (e.code === 'ArrowLeft') goLine(-1);
  if (e.code === 'ArrowDown') goNextChapter();
});

/* ── Start button ─────────────────────────────── */
el('#startBtn').addEventListener('click', async () => {
  const screen = el('#startScreen');
  screen.classList.add('hide');
  setTimeout(() => screen.remove(), 500);
});

/* ── Boot: fetch story.json then start ─────────── */
async function boot() {
  const res = await fetch('data/story.json');
  STORY = await res.json();
  // preload placeholder SVG
  await loadSvg('placeholder');
  populateChapterSelect();
  renderLine();
}

boot();
