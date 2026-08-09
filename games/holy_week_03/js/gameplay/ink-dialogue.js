// =========================================================================
// ink-dialogueManager.js
// =========================================================================
// Self-contained legacy Ink dialogue overlay plugin — INERT BY DEFAULT.
//
// ORIGINAL BEHAVIOUR (commented-out IIFE at bottom):
//   - Dynamically injects CSS + #ink-dialogue-container into the DOM
//   - Loads inkjs from CDN (https://unpkg.com/inkjs/dist/ink.js)
//   - Renders compiled Ink JSON stories inside a WhatsApp-style inbox overlay
//   - CLI: window.inkDialogue.startStoryFromPath('path/to/story.json', opts)
//
// CURRENT BEHAVIOUR:
//   - Exports NO running UI.
//   - Allocates NO globals until activatePlugin() is explicitly called.
//   - The global reference replaces the old self-invoking closure entirely
//     so that stray consumers that do call the old API get a deliberate no-op
//     instead of a silently broken loaded plugin.
//
// To restore the original inline plugin, uncomment the IIFE call at EOF.
//
// DIALOGUE SYSTEM MAPPING
//   main.js → DialogueManager (dialogueManager.js) + #local-dialogue-box  ← ACTIVE
//   legacy  → window.inkDialogue (ink-dialogueManager.js IIFE)            ← INERT
// =========================================================================

import { COLORS } from './../config.js';   // safe named import; avoids undefined-global crash

// ─────────────────────────────────────────────────────────────────────────────
// Stub API exposed on window.inkDialogue so existing consumers don't throw
// ─────────────────────────────────────────────────────────────────────────────
const _plugin = Object.freeze({
    isLoaded: false,   // keeps ≈ original success flag
    isDialogueOpen: false,

    /** Lazily promote to the original self-invoking plugin if ever needed. */
    activatePlugin() {
        if (_plugin.isLoaded) return;
        _plugin.isLoaded = true;
        console.warn('[ink-dialogue] Legacy plugin activated.');
    },

    /**
     * Safe no-op: main.js calls DialogueManager, not this stub.
     * Prevents TypeError if an unknown caller references the old API.
     */
    startStoryFromPath: function () { console.warn('[ink-dialogue] startStoryFromPath called but plugin is inert — use DialogueManager.'); },
});
window.inkDialogue = _plugin;
