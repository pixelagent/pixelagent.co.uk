/**
 * BEATS/ACT4.JS — The Fig Tree
 * Input type: single deliberate tap. Deliberately untimed — see design doc.
 * Dialogue: data/dialogue/act4_figtree.ink (compiled to .json before use)
 */

const Act4Beats = (function () {

    async function loadDialogue() {
        return DialogueEngine.load('act4_figtree');
    }

    function plantTree() {
        Compass.recordBeat('act4_plant');
    }

    function revealWorm() {
        Compass.recordBeat('act4_worm');
    }

    // choiceIndex must match the Ink choice order in gods_question:
    // 0 = Silence, 1 = Anger, 2 = A real question
    function finalChoice(choiceIndex) {
        const choiceMap = ['silence', 'anger', 'question'];
        const choice = choiceMap[choiceIndex];

        if (choice === 'question') {
            Compass.nudge('trust', 15);
            Compass.nudge('mercy', 15);
        } else if (choice === 'anger') {
            Compass.nudge('justice', 15);
        } else if (choice === 'silence') {
            Compass.nudge('fear', 10);
        }
        Compass.recordBeat('act4_final');

        const dialogueResult = DialogueEngine.choose(choiceIndex);
        return { dialogueResult, summary: Compass.getSummary() };
    }

    return { loadDialogue, plantTree, revealWorm, finalChoice };
})();
