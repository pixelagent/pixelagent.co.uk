/**
 * BEATS/ACT3.JS — Preaching to Nineveh
 * Input type: quick-decision
 * Dialogue: data/dialogue/act3_nineveh.ink (compiled to .json before use)
 */

const Act3Beats = (function () {

    async function loadDialogue() {
        return DialogueEngine.load('act3_nineveh');
    }

    function walkTheCity(daysRemainingWhenSolved) {
        Compass.setAct3Days(daysRemainingWhenSolved);
        Compass.recordBeat('act3_gates');
    }

    function preachSermon() {
        // Triggers the spreading-repentance wave animation — visual only.
        Compass.recordBeat('act3_sermon');
    }

    // choiceIndex must match the Ink choice order in jonah_watches:
    // 0 = Watch, 1 = Turn away
    function watchOrTurnAway(choiceIndex) {
        const choseToWatch = choiceIndex === 0;
        if (choseToWatch) {
            Compass.nudge('mercy', 10);
        } else {
            Compass.nudge('justice', 10);
        }
        Compass.recordBeat('act3_watch');
        return DialogueEngine.choose(choiceIndex);
    }

    return { loadDialogue, walkTheCity, preachSermon, watchOrTurnAway };
})();
