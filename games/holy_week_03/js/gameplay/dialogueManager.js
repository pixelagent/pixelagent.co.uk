/**
 * Maps dialogueId to their Ink JSON story file paths.
 * NPCs in levels.js use dialogueId instead of storyFile / hasDialogue.
 * This map bridges that gap so loadStoryForNPC can normalise the path.
 * Also includes case file NPCs with their respective story files.
 */
import { DIALOGUE_ID_MAP } from './dialogueMaps.js';
/**
 * DialogueManager
 *
 * Handles loading Ink story JSON files and driving the WhatsApp-style
 * chat-bubble dialogue UI (vn.html pattern).
 *
 * UI structure expected in index.html:
 *   #local-dialogue-box  (flex container, display:none → flex when open)
 *     #chat-panel
 *       .chat-hdr
 *         #npc-name-display   ← NPC name
 *         .st                 ← "● ONLINE" status line
 *       #bub-scroll           ← scrollable message list
 *       #bar-choices          ← choice pill buttons (.hide when empty)
 */
export class DialogueManager {
    constructor() {
        this.basePath = ''; 
        this.isDialogueOpen = false;
        this.npcStories = {};
        this.inkLib = null;
        this.activeNpc = null;
        this.onCloseCallback = null;
        this.onMessageCallback = null;

        // Cache DOM refs once
        this._bubScroll = null;
        this._barChoices = null;
    }

    // ── Public init helpers ──────────────────────────────────────────────────

    setBasePath(path) { this.basePath = path; }
    setInkLib(lib) { this.inkLib = lib; }
    setActiveNPC(npc) { this.activeNpc = npc; }
    setOnMessage(cb) { this.onMessageCallback = cb; }
    setDialogueOpen(state) { this.isDialogueOpen = state; }

    // ── Story loading ────────────────────────────────────────────────────────

/**
      * Preload all dialogue stories from the DIALOGUE_ID_MAP.
      * Called once at game initialization to ensure stories are cached.
      */
    async loadAllStories() {
        const promises = Object.entries(DIALOGUE_ID_MAP).map(([npcId, storyPath]) => {
            // storyPath is relative to the page directory, e.g., '../story/act1/...'
            // No further path adjustments needed here.

            return fetch(storyPath)
                .then(r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.json();
                })
                .then(data => {
                    this.npcStories[npcId] = data;
                    console.log(`[DialogueManager] Preloaded story for ${npcId}`);
                })
                .catch(e => {
                    console.warn(`[DialogueManager] Failed to preload story for ${npcId}:`, e.message);
                });
        });
        await Promise.all(promises);
        console.log(`[DialogueManager] Loaded ${Object.keys(this.npcStories).length} stories`);
    }

    loadStoryForNPC(npc) {
        // Resolve storyFile using DIALOGUE_ID_MAP, falling back to npc.id if storyFile/dialogueId are not direct paths
        const storyFile = DIALOGUE_ID_MAP[npc.storyFile || npc.dialogueId || npc.id];
        if (!storyFile) { // If no mapping found, and it's not a direct path
            return Promise.resolve();
        }

        if (!npc.hasDialogue || !storyFile) {
            console.log('[DialogueManager] NPC has no dialogue or storyFile:', npc.id, npc.name,
                '| hasDialogue:', npc.hasDialogue, '| storyFile:', npc.storyFile);
            return Promise.resolve();
        }
        console.log('[DialogueManager] Loading story for NPC', npc.id, npc.name, 'from', storyFile);
        return fetch(storyFile)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(data => {
                this.npcStories[npc.id] = data;
                console.log(`[DialogueManager] Loaded story for ${npc.name}`);
            })
            .catch(e => console.error(`[DialogueManager] Failed to load story for ${npc.name}:`, e));
    }

    createStory(npcId) {
        if (!this.inkLib) throw new Error('Ink runtime not loaded');
        const data = this.npcStories[npcId];
        if (!data) throw new Error('Story data not found for ' + npcId);

        // Detect if this is an Ink story or our simpler JSON format
        if (data.inkVersion) {
            return new this.inkLib.Story(data);
        }

        // If it's a simple JSON, wrap it in an adapter so the UI logic works identically
        return new SimpleStoryAdapter(data);
    }

    getStory(npcId) {
        const story = this.npcStories[npcId];
        if (!story) {
            console.warn('[DialogueManager] No story for npcId:', npcId,
                '| Available:', Object.keys(this.npcStories));
        }
        return story;
    }

    // ── DOM helpers ──────────────────────────────────────────────────────────

    /** Lazily cache #bub-scroll and #bar-choices. */
    _getEls() {
        if (!this._bubScroll) this._bubScroll = document.getElementById('bub-scroll');
        if (!this._barChoices) this._barChoices = document.getElementById('bar-choices');
        return { bubScroll: this._bubScroll, barChoices: this._barChoices };
    }

    /**
     * Append a message bubble to #bub-scroll.
     * @param {string} text
     * @param {'npc'|'player'|'system'|'npc-filler'} type
     */
    addMsg(text, type = 'npc') {
        const { bubScroll } = this._getEls();
        const el = document.createElement('div');
        el.className = 'msg ' + type;
        el.textContent = text;
        bubScroll.appendChild(el);
        const atBottom = bubScroll.scrollHeight - bubScroll.scrollTop - bubScroll.clientHeight < 120;
        if (atBottom) {
            bubScroll.scrollTop = bubScroll.scrollHeight;
        }
        if (this.onMessageCallback && (type === 'npc' || type === 'player')) {
            this.onMessageCallback(text, type);
        }
    }

    /**
      * Show an animated typing indicator, then call cb() after the delay.
      * @param {Function} cb
      */
    addTyping(cb) {
        const { bubScroll } = this._getEls();
        const npcName = this.activeNpc?.name ?? 'NPC';
        const row = document.createElement('div');
        row.className = 'typing-row';
        row.setAttribute('aria-label', `${npcName} is typing`);
        row.innerHTML =
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            `<span class="typing-lbl">${npcName} is typing</span>`;
        bubScroll.appendChild(row);
        const delay = 1200 + Math.random() * 600;
        setTimeout(() => {
            row.remove();
            cb();
        }, delay);
    }

    addTypingBubble(message) {
        const { bubScroll } = this._getEls();
        const bubble = document.createElement('div');
        bubble.className = 'msg npc typing-bubble';
        bubble.textContent = '...';
        bubScroll.appendChild(bubble);
        bubScroll.scrollTop = bubScroll.scrollHeight;
        return bubble;
    }

    replaceTypingBubble(bubble, message) {
        if (!bubble) return;
        bubble.textContent = message;
        bubble.classList.remove('typing-bubble');
        const { bubScroll } = this._getEls();
        bubScroll.scrollTop = bubScroll.scrollHeight;
    }

    /**
     * Render choice buttons inside #bar-choices.
     * Pass null / empty array to hide the bar.
     * @param {Array|null} choices  — inkjs choice objects { text, index }
     * @param {Function}   onPick  — called with the chosen choice object
     */
    showChoices(choices, onPick) {
        const { barChoices } = this._getEls();
        barChoices.classList.toggle('hide', !choices || choices.length === 0);
        barChoices.innerHTML = '';
        if (!choices || choices.length === 0) return;
        choices.forEach(c => {
            const b = document.createElement('button');
            b.className = 'choice-btn';
            b.textContent = '→ ' + c.text;
            b.onclick = () => {
                barChoices.classList.add('hide');
                setTimeout(() => onPick(c), 120);
            };
            barChoices.appendChild(b);
        });
    }

    // ── Open / close ─────────────────────────────────────────────────────────

    /**
     * Open the dialogue box for an NPC and start the Ink story from the top.
     *
     * @param {object}   npc       — NPC config object with .name, .id, .unlocksEvidence
     * @param {object}   inkStory  — Active inkjs Story instance
     * @param {Function} onClose   — Called when the player ends the conversation
     * @param {Function} onMessage — Optional callback for each message added
     */
    openDialogue(npc, inkStory, onClose, onMessage) {
        // Close sidebar panels
        ['panel-quest', 'panel-inv', 'panel-actions'].forEach(id => {
            document.getElementById(id)?.classList.remove('open');
        });
        ['btn-quest-toggle', 'btn-inv-toggle', 'btn-actions-toggle'].forEach(id => {
            document.getElementById(id)?.classList.remove('active');
        });

        console.log(`[DialogueManager] Initializing dialogue for ${npc.name} (${npc.id}). Reference: ${npc.storyFile || 'none'}`);

        this.setActiveNPC(npc);
        this.onCloseCallback = onClose;
        this.onMessageCallback = onMessage;
        this.setDialogueOpen(true);

        // Populate header
        const nameEl = document.getElementById('npc-name-display') || document.getElementById('vn-speaker-name');
        if (nameEl) nameEl.innerText = npc.name ?? npc.id;

        // Clear previous messages
        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });

        // Show the modal
        const box = document.getElementById('local-dialogue-box') || document.getElementById('vn-overlay');
        if (box) {
            box.classList.add('active');
            if (window.getComputedStyle(box).display === 'none') {
                box.style.display = 'flex';
            }
        }

        // System handshake message, then start story
        this.addMsg('SECURE CONNECTION ESTABLISHED.', 'system');
        this._stepStory(inkStory, onClose);
    }

    closeDialogue(onClose) {
        const box = document.getElementById('local-dialogue-box') || document.getElementById('vn-overlay');
        if (box) {
            box.classList.remove('active');
            box.style.display = 'none';
        }

        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });
        this.setDialogueOpen(false);

        const cb = this.onCloseCallback || onClose;
        this.onCloseCallback = null;
        this.onMessageCallback = null;
        if (typeof cb === 'function') cb();
    }

    // ── Story stepping ───────────────────────────────────────────────────────

    /**
      * Advance the Ink story one beat:
      *   1. Collect all pending text lines.
      *   2. Show typing indicator → display NPC bubble(s).
      *   3. Show ambient filler lines.
      *   4. Render choice buttons (or a [CLOSE] button at story end).
      *
      * @param {object}   story - inkjs.Story instance
      * @param {Function} onClose
      */
    _stepStory(story, onClose) {
        if (!story) return;

        this.addTyping(() => {
            let text = "";
            // Ink can have content that results in empty strings (tags/diverts).
            // We loop until we either hit actual text OR we have choices to present.
            let safety = 0;
            while (story.canContinue && safety < 20) {
                let chunk = story.Continue();
                text += chunk;
                // If we found text or choices, we have enough to show the user
                if (text.trim() || story.currentChoices.length > 0) break;
                safety++;
            }

            if (text.trim()) {
                this.addMsg(this.stripInkMarkers(text), 'npc');
            }

            if (story.currentChoices && story.currentChoices.length > 0) {
                this.showChoices(story.currentChoices, (choice) => {
                    if (choice.index !== -1) {
                        this.addMsg(choice.text, 'player');
                        story.ChooseChoiceIndex(choice.index);
                        setTimeout(() => this._stepStory(story, onClose), 400);
                    } else {
                        this.closeDialogue(onClose);
                    }
                });
            } else {
                this.showChoices(
                    [{ text: 'End Conversation', index: -1 }],
                    () => this.closeDialogue(onClose)
                );
            }
        });
    }

    /**
     * Legacy public entry-point kept for compatibility with existing callers.
     * Prefer openDialogue() for new code.
     *
     * @param {object}   inkStory
     * @param {Function} appendMessage  — ignored (addMsg used internally now)
     * @param {Function} showFiller     — ignored
     * @param {Element}  choiceEl       — ignored
     * @param {object}   uiSounds       — ignored
     * @param {Function} onClose
     */
    continueStory(inkStory, appendMessage, showFiller, choiceEl, uiSounds, onClose) {
        this._stepStory(inkStory, onClose);
    }

    // ── Ink text utilities ───────────────────────────────────────────────────

    stripInkMarkers(s) {
        if (!s) return '';
        return s.split(/\r?\n/)
            .map(line => {
                let l = (line || '').trim();
                if (l === '#' || l === '/#') return '';
                if (l.startsWith('^')) l = l.slice(1).trim();
                if (l.startsWith('#')) l = l.slice(1).trim();
                return l;
            })
            .filter(Boolean)
            .join('\n');
    }
}

/**
 * Adapter for non-Ink simple JSON dialogues (content/choices format).
 * Mimics the inkjs Story API so DialogueManager can use them interchangeably.
 */
class SimpleStoryAdapter {
    constructor(data) {
        this.data = data;
        // Standardize entry point
        this.currentNode = data.start || data.root || Object.values(data)[0];
        this.canContinue = !!this.currentNode;
        this.currentChoices = [];
    }

    Continue() {
        if (!this.currentNode) return "";
        const txt = this.currentNode.content || "";
        // Transform choices to match Ink format { text, index }
        this.currentChoices = (this.currentNode.choices || []).map((c, i) => ({
            text: c.text,
            index: i,
            destination: c.destination
        }));
        this.canContinue = false;
        return txt;
    }

    ChooseChoiceIndex(idx) {
        const choice = this.currentChoices[idx];
        if (choice && choice.destination && this.data[choice.destination]) {
            this.currentNode = this.data[choice.destination];
            this.canContinue = true;
            this.currentChoices = [];
        }
    }
}
