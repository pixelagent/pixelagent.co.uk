/**
 * DIALOGUEENGINE.JS
 * Thin wrapper around inkjs. Loads compiled Ink JSON (authored as .ink,
 * compiled via inklecate — see data/dialogue/*.ink) and steps through it.
 *
 * Requires inkjs to be included in index.html:
 *   <script src="https://cdn.jsdelivr.net/npm/inkjs/dist/ink.min.js"></script>
 */

const DialogueEngine = (function () {
    let story = null;

    async function load(dialogueId) {
        const res = await fetch(`${CONFIG.paths.dialogueDir}${dialogueId}.json`);
        const inkJson = await res.json();
        story = new inkjs.Story(inkJson);
        return story;
    }

    function continueStory() {
        const lines = [];
        while (story.canContinue) {
            lines.push(story.Continue());
        }
        return { lines, choices: story.currentChoices };
    }

    function choose(index) {
        story.ChooseChoiceIndex(index);
        return continueStory();
    }

    function isEnded() {
        return story && !story.canContinue && story.currentChoices.length === 0;
    }

    return { load, continueStory, choose, isEnded };
})();
