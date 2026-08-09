/**
 * COMPASS.JS
 * Two-axis narrative meter: Fear <-> Trust, and Justice <-> Mercy.
 * Settings pulled from config.js. Epilogue text loaded from data/epilogues.json.
 * No inline styles — only classList/CSS custom property updates.
 */

const Compass = (function () {

    const state = {
        fearTrust: 0,
        justiceMercy: 0,
        beatsCompleted: new Set(),
        act3DaysRemaining: null
    };

    let epilogues = null;

    const CLAMP = (v) => Math.max(CONFIG.compass.axisMin, Math.min(CONFIG.compass.axisMax, v));

    async function init() {
        const res = await fetch(CONFIG.paths.epilogues);
        epilogues = await res.json();
        renderIndicator();
    }

    function renderIndicator() {
        const el = document.querySelector(CONFIG.compass.indicatorSelector);
        if (!el) return;

        const tilt = (state.fearTrust / CONFIG.compass.axisMax) * 45;
        el.style.transform = `rotate(${tilt}deg)`;

        const mercyRatio = (state.justiceMercy - CONFIG.compass.axisMin) /
            (CONFIG.compass.axisMax - CONFIG.compass.axisMin);
        const r = Math.round(70 + mercyRatio * 180);
        const g = Math.round(90 + mercyRatio * 130);
        const b = Math.round(180 - mercyRatio * 120);
        el.style.setProperty('--compass-color', `rgb(${r},${g},${b})`);
    }

    function nudge(axis, amount) {
        if (axis === 'trust') state.fearTrust = CLAMP(state.fearTrust + amount);
        else if (axis === 'fear') state.fearTrust = CLAMP(state.fearTrust - amount);
        else if (axis === 'mercy') state.justiceMercy = CLAMP(state.justiceMercy + amount);
        else if (axis === 'justice') state.justiceMercy = CLAMP(state.justiceMercy - amount);
        renderIndicator();
    }

    function recordBeat(beatId) {
        state.beatsCompleted.add(beatId);
    }

    function setAct3Days(days) {
        state.act3DaysRemaining = days;
    }

    function getCodexCompletion() {
        return Math.round((state.beatsCompleted.size / CONFIG.compass.totalBeats) * 100);
    }

    function getEpilogue() {
        const ft = state.fearTrust;
        const jm = state.justiceMercy;
        const NEUTRAL = CONFIG.compass.neutralThreshold;

        if (Math.abs(ft) < NEUTRAL && Math.abs(jm) < NEUTRAL) {
            return epilogues.conflicted;
        }

        const axis1 = ft >= 0 ? 'trust' : 'fear';
        const axis2 = jm >= 0 ? 'mercy' : 'justice';
        return epilogues[`${axis1}_${axis2}`];
    }

    function getSummary() {
        return {
            epilogue: getEpilogue(),
            codexCompletion: getCodexCompletion(),
            act3DaysRemaining: state.act3DaysRemaining,
            axes: { fearTrust: state.fearTrust, justiceMercy: state.justiceMercy }
        };
    }

    function reset() {
        state.fearTrust = 0;
        state.justiceMercy = 0;
        state.beatsCompleted.clear();
        state.act3DaysRemaining = null;
        renderIndicator();
    }

    return { init, nudge, recordBeat, setAct3Days, getCodexCompletion, getEpilogue, getSummary, reset };
})();
