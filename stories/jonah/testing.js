/**
 * TESTING.JS
 * Lightweight in-browser test harness — no external framework, since this
 * project stays dependency-light. Runs assertion-based checks against
 * Compass, beats, and StoryEngine. Open index.html?test=true to auto-run.
 *
 * Add new suites via Testing.suite(name, fn); each fn receives `t` with
 * t.assert / t.assertEqual / t.assertRange.
 */

const Testing = (function () {
    const suites = [];
    const results = [];

    function suite(name, fn) {
        suites.push({ name, fn });
    }

    function makeAsserter(suiteName) {
        return {
            assert(condition, message) {
                results.push({ suite: suiteName, pass: !!condition, message });
            },
            assertEqual(actual, expected, message) {
                const pass = actual === expected;
                results.push({
                    suite: suiteName,
                    pass,
                    message: `${message} (expected ${expected}, got ${actual})`
                });
            },
            assertRange(value, min, max, message) {
                const pass = value >= min && value <= max;
                results.push({
                    suite: suiteName,
                    pass,
                    message: `${message} (expected ${min}-${max}, got ${value})`
                });
            }
        };
    }

    function run() {
        results.length = 0;
        suites.forEach(({ name, fn }) => fn(makeAsserter(name)));
        report();
        return results;
    }

    function report() {
        const failed = results.filter(r => !r.pass);
        console.groupCollapsed(
            `%cTest run: ${results.length - failed.length}/${results.length} passed`,
            failed.length ? 'color: #e74c3c' : 'color: #2ecc71'
        );
        results.forEach(r => {
            const style = r.pass ? 'color: #2ecc71' : 'color: #e74c3c';
            console.log(`%c[${r.pass ? 'PASS' : 'FAIL'}] ${r.suite}: ${r.message}`, style);
        });
        console.groupEnd();
    }

    // -----------------------------
    // BUILT-IN SUITES — Compass logic
    // -----------------------------
    suite('Compass axis clamping', (t) => {
        Compass.reset();
        Compass.nudge('trust', 500); // way over max
        const summary = Compass.getSummary();
        t.assertRange(summary.axes.fearTrust, -100, 100, 'fearTrust stays within clamp bounds');
        Compass.reset();
    });

    suite('Compass epilogue resolution', (t) => {
        Compass.reset();
        Compass.nudge('trust', 50);
        Compass.nudge('mercy', 50);
        t.assertEqual(
            Compass.getEpilogue().title,
            'The Reluctant Servant, Made Willing',
            'high trust + high mercy resolves to the expected epilogue'
        );
        Compass.reset();
    });

    suite('Compass neutral/conflicted epilogue', (t) => {
        Compass.reset();
        // both axes stay within the neutral threshold
        t.assertEqual(
            Compass.getEpilogue().title,
            'The Man Wrestling Both Ways',
            'near-zero axes resolve to the conflicted epilogue'
        );
    });

    suite('Codex completion tracking', (t) => {
        Compass.reset();
        Compass.recordBeat('act1_brace');
        Compass.recordBeat('act1_board');
        const pct = Compass.getCodexCompletion();
        t.assert(pct > 0 && pct <= 100, `codex completion reports a sane percentage (${pct}%)`);
        Compass.reset();
    });

    return { suite, run, results };
})();

// Auto-run when ?test=true is present in the URL, after other modules load.
if (new URLSearchParams(window.location.search).get('test') === 'true') {
    window.addEventListener('load', () => setTimeout(Testing.run, 500));
}
