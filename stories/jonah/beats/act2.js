/**
 * BEATS/ACT2.JS — In the Whale
 * Input type: hold / patience
 */

const Act2Beats = (function () {

    function descend() {
        // Flavor/transition only, no compass effect.
        Compass.recordBeat('act2_descent');
    }

    function collectFragment(fragmentId) {
        // Codex completion only — no compass effect.
        Compass.recordBeat(`act2_fragment_${fragmentId}`);
    }

    function prayer(holdDurationMs) {
        if (holdDurationMs >= CONFIG.beats.act2.prayerFullHoldMs) {
            Compass.nudge('trust', 20);
            Compass.nudge('mercy', 5);
        } else {
            Compass.nudge('fear', 10);
        }
        Compass.recordBeat('act2_prayer');
    }

    return { descend, collectFragment, prayer };
})();
