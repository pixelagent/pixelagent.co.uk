/* =========================================================================
   ASSET LOADER
   ========================================================================= */
const svgCache = new Map();
async function getAsset(path) {
    if (svgCache.has(path)) {
        return svgCache.get(path);
    }
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to fetch: ${path}`);
        const text = await response.text();
        svgCache.set(path, text);
        return text;
    } catch (error) {
        console.error(error);
        return ''; // Return empty string on error
    }
}

/* =========================================================================
   CHARACTER & SCENE DATA
   ========================================================================= */
const CHARACTERS = {
    daniel: 'assets/svg/character_daniel.svg',
    nebuchadnezzar: 'assets/svg/character_nebuchadnezzar.svg',
    god: 'assets/svg/character_god.svg',
    friends: 'assets/svg/character_friends.svg',
    belshazzar: 'assets/svg/character_belshazzar.svg',
    darius: 'assets/svg/character_darius.svg',
    narrator: null
};

/* =========================================================================
   STORY DATA — 6 CHAPTERS
   ========================================================================= */
let STORY = [];

/* =========================================================================
   STATE MANAGEMENT & ENGINE
   ========================================================================= */
let actIdx = 0, lineIdx = 0, transitioning = false, choicePending = false, nextLineTimeout = null;

const el = s => document.querySelector(s);
const stage = el('#stage');
const choicesBox = el('#choices');
const delayNote = el('#delayNote');
const nextBtn = el('#nextBtn');
const nextLineBtn = el('#nextLineBtn');
const portal = el('#portal');
const bgGradient = el('#bgGradient');
const dotsBox = el('#dots');

function currentAct() { return STORY[actIdx]; }

function buildDots() {
    dotsBox.innerHTML = '';
    currentAct().lines.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === lineIdx ? ' on' : '');
        dotsBox.appendChild(d);
    });
}

function populateChapterSelect() {
    const select = el('#chapterSelect');
    select.innerHTML = '';
    STORY.forEach((act, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Ch ${index + 1}: ${act.name}`;
        select.appendChild(option);
    });
}

function buildLineHTML(text, fx) {
    if (fx === 'bounce' || fx === 'sfx') {
        return text.split(' ').map((w, i) => `<span class="word" style="animation-delay:${i * 60}ms">${escapeHtml(w)}</span>`).join(' ');
    }
    if (fx === 'shake' && text) {
        return `<span class="line-inner">${escapeHtml(text)}</span>`;
    }
    if (fx === 'type') {
        return text.split(' ').map((w, i) => `<span class="word" style="animation-delay:${i * 120}ms">${escapeHtml(w)}</span>`).join(' ');
    }
    return text.split(' ').map((w, i) => `<span class="word" style="animation-delay:${i * (fx === 'fade' ? 18 : 10)}ms">${escapeHtml(w)}</span>`).join(' ');
}
function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

async function renderLine() {
    if (delayNote.parentNode) delayNote.parentNode.removeChild(delayNote);
    delayNote.className = '';
    delayNote.textContent = '';
    stage.innerHTML = '';
    if (nextLineTimeout) { clearTimeout(nextLineTimeout); nextLineTimeout = null; }

    const data = currentAct().lines[lineIdx];

    const frame = document.createElement('div');
    frame.className = `comic-frame popIn palette-act-${actIdx + 1}`;

    const graphicContainer = document.createElement('div');
    graphicContainer.id = 'graphicContainer';

    const svgLayer = document.createElement('div');
    svgLayer.id = 'svgLayer';
    const targetSvgKey = data.svg || currentAct().svg;
    svgLayer.innerHTML = await getAsset(`assets/svg/scene_${targetSvgKey}.svg`);
    graphicContainer.appendChild(svgLayer);
    frame.appendChild(graphicContainer);

    // Set particle mode per act
    setParticleMode(currentAct().particle || 'dusk');

    const overlay = document.createElement('div');
    overlay.className = 'content-overlay';
    frame.appendChild(overlay);
    stage.appendChild(frame);
    overlay.appendChild(delayNote);

    setTimeout(async () => {
        if (data.speaker && CHARACTERS[data.speaker]) {
            const charBox = document.createElement('div');
            charBox.className = 'char-container';
            charBox.innerHTML = await getAsset(CHARACTERS[data.speaker]);
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
                const speechElement = document.createElement('div');
                speechElement.className = `caption fx-${data.fx} caption-${data.align || 'center'}`;
                speechElement.innerHTML = buildLineHTML(data.text, data.fx);
                overlay.appendChild(speechElement);
            } else {
                const align = data.align || 'center';
                const wrap = document.createElement('div');
                wrap.className = `bubble-wrap align-${align}`;
                const speechElement = document.createElement('div');
                speechElement.className = `bubble ${data.speaker} fx-${data.fx} bubble-${align}`;
                speechElement.innerHTML = buildLineHTML(data.text, data.fx);
                wrap.appendChild(speechElement);
                overlay.appendChild(wrap);
            }
        }

        const wordEls = overlay.querySelectorAll('.word');
        if (wordEls.length > 0) {
            let delayStep = 10, duration = 400;
            switch (data.fx) {
                case 'bounce': case 'sfx': delayStep = 60; duration = 500; break;
                case 'type': delayStep = 120; duration = 200; break;
                case 'wave': delayStep = 10; duration = 300; break;
                case 'fade': delayStep = 18; duration = 400; break;
            }
            const totalAnimTime = (wordEls.length - 1) * delayStep + duration;
            nextLineTimeout = setTimeout(() => updateNextBtn(), Math.max(totalAnimTime, 1000));
        } else {
            nextLineTimeout = setTimeout(() => updateNextBtn(), 1000);
        }
    }, 800);

    buildDots();
    renderChoices(data);
}

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
                delayNote.textContent = c.note;
                delayNote.classList.add('show');
                choicePending = false;
                updateNextBtn();
            };
            choicesBox.appendChild(b);
        });
    } else {
        choicesBox.classList.remove('show');
    }
}

function updateNextBtn() {
    const atEnd = lineIdx === currentAct().lines.length - 1 && !choicePending;
    nextBtn.className = `palette-act-${actIdx + 1}`;
    nextBtn.classList.toggle('show', atEnd);
    nextBtn.textContent = actIdx === STORY.length - 1 ? 'Read Again ↺' : 'Next Chapter ↴';

    const notAtEnd = lineIdx < currentAct().lines.length - 1 && !choicePending;
    nextLineBtn.className = `palette-act-${actIdx + 1}`;
    nextLineBtn.classList.toggle('show', notAtEnd);
    nextLineBtn.textContent = 'Next →';
}

async function goLine(delta) {
    if (transitioning) return;
    if (choicePending) { choicePending = false; choicesBox.classList.remove('show'); }
    delayNote.className = '';
    nextBtn.classList.remove('show');
    nextLineBtn.classList.remove('show');
    const lines = currentAct().lines;
    const nl = lineIdx + delta;
    if (nl < 0 || nl >= lines.length) return;

    const currentFrame = stage.querySelector('.comic-frame');
    if (currentFrame) {
        transitioning = true;
        currentFrame.classList.add('popOut');
        await new Promise(resolve => {
            const onEnd = () => { transitioning = false; resolve(); };
            currentFrame.addEventListener('animationend', onEnd, { once: true });
            setTimeout(onEnd, 500);
        });
    }
    lineIdx = nl;
    await renderLine();
}

function goNextChapter() {
    if (transitioning) return;
    if (actIdx === STORY.length - 1) { fallTransition(() => { actIdx = 0; lineIdx = 0; loadAct(); }); return; }
    fallTransition(() => { actIdx++; lineIdx = 0; loadAct(); });
}

function jumpToChapter(newActIdx) {
    if (transitioning || newActIdx < 0 || newActIdx >= STORY.length || newActIdx === actIdx) return;
    fallTransition(() => { actIdx = newActIdx; lineIdx = 0; loadAct(); });
}

function goPrevChapter() {
    if (transitioning || actIdx === 0) return;
    fallTransition(() => { actIdx--; lineIdx = STORY[actIdx].lines.length - 1; loadAct(); });
}

function fallTransition(mid) {
    transitioning = true;
    portal.classList.add('falling');
    setTimeout(() => {
        mid();
        portal.classList.remove('falling');
        portal.classList.add('rising');
        setTimeout(() => { portal.classList.remove('rising'); transitioning = false; }, 700);
    }, 750);
}

async function loadAct() {
    const act = currentAct();
    el('#chapterSelect').value = actIdx;
    bgGradient.style.background = act.bg;
    document.body.className = `palette-act-${actIdx + 1}`;
    choicePending = false;
    nextBtn.classList.remove('show');
    nextLineBtn.classList.remove('show');
    const currentFrame = stage.querySelector('.comic-frame');
    if (currentFrame) {
        transitioning = true;
        currentFrame.classList.add('popOut');
        await new Promise(resolve => {
            const onEnd = () => { transitioning = false; resolve(); };
            currentFrame.addEventListener('animationend', onEnd, { once: true });
            setTimeout(onEnd, 500);
        });
    }
    await renderLine();
}

/* =========================================================================
   PARTICLE ENGINE
   ========================================================================= */
const canvas = el('#particles');
const ctx = canvas.getContext('2d');
let particles = [];
let particleMode = 'dusk';
let animFrame;

const PARTICLE_CONFIGS = {
    dusk: { count: 38, colors: ['#FFD84D', '#FF6B5B', '#c8a45a'], minR: 1, maxR: 3, speed: 0.3, drift: 0.15 },
    dream: { count: 50, colors: ['#B98CFF', '#FFD84D', '#fff', '#4ECDC4'], minR: 1, maxR: 4, speed: 0.2, drift: 0.2 },
    fire: { count: 60, colors: ['#FF4500', '#FF6B5B', '#FFD84D', '#fff'], minR: 1, maxR: 5, speed: 0.6, drift: 0.4 },
    constellation: { count: 45, colors: ['#B98CFF', '#FFD84D', '#fff'], minR: 1, maxR: 2, speed: 0.1, drift: 0.05 },
    stars: { count: 55, colors: ['#4ECDC4', '#fff', '#B98CFF'], minR: 1, maxR: 3, speed: 0.15, drift: 0.08 }
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function spawnParticle(cfg) {
    const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: cfg.minR + Math.random() * (cfg.maxR - cfg.minR),
        vx: (Math.random() - 0.5) * cfg.drift,
        vy: -(cfg.speed * (0.5 + Math.random())),
        alpha: 0.2 + Math.random() * 0.7,
        color
    };
}

function setParticleMode(mode) {
    particleMode = mode;
    const cfg = PARTICLE_CONFIGS[mode] || PARTICLE_CONFIGS.dusk;
    particles = Array.from({ length: cfg.count }, () => spawnParticle(cfg));
}

function tickParticles() {
    const cfg = PARTICLE_CONFIGS[particleMode] || PARTICLE_CONFIGS.dusk;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.002;
        if (p.alpha <= 0 || p.y < -10) {
            Object.assign(p, spawnParticle(cfg));
            p.y = canvas.height + 5;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
    animFrame = requestAnimationFrame(tickParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
setParticleMode('dusk');
tickParticles();

/* =========================================================================
   KEYBOARD NAVIGATION
   ========================================================================= */
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goLine(1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goLine(-1);
});

/* =========================================================================
   SWIPE / TOUCH NAVIGATION
   ========================================================================= */
let touchStartX = 0, touchStartY = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        dx < 0 ? goLine(1) : goLine(-1);
    }
}, { passive: true });

/* =========================================================================
   SCROLL / WHEEL NAVIGATION
   ========================================================================= */
let wheelCooldown = false;
document.addEventListener('wheel', e => {
    if (wheelCooldown) return;
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 600);
    if (e.deltaY > 0) {
        const atEnd = lineIdx === currentAct().lines.length - 1;
        atEnd ? goNextChapter() : goLine(1);
    } else {
        goLine(-1);
    }
}, { passive: true });

/* =========================================================================
   CHAPTER SELECT
   ========================================================================= */
el('#chapterSelect').addEventListener('change', e => {
    jumpToChapter(Number(e.target.value));
});

/* =========================================================================
   NEXT / PREV BUTTONS
   ========================================================================= */
nextBtn.addEventListener('click', goNextChapter);
nextLineBtn.addEventListener('click', () => goLine(1));

/* =========================================================================
   BOOT
   ========================================================================= */
el('#startBtn').addEventListener('click', () => {
    el('#startScreen').classList.add('hide');
});

async function main() {
    try {
        const response = await fetch('daniel-story.json');
        STORY = await response.json();
        populateChapterSelect();
        loadAct();
    } catch (error) {
        console.error("Failed to load story data:", error);
        // You could display an error message to the user here
    }
}

main();