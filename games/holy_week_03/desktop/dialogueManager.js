/* 
NPCs in levels.js use dialogueId instead of storyFile / hasDialogue.
This map bridges that gap so loadStoryForNPC can normalise the path.
 */
import { DIALOGUE_ID_MAP } from '../js/gameplay/dialogueMaps.js';

/**       .chat-hdr
 *         #npc-name-display   ← NPC name
 *         .st                 ← "● ONLINE" status line
 *       #bub-scroll           ← scrollable message list
 *       #bar-choices          ← choice pill buttons (.hide when empty)
 */
export class DialogueManager {
    constructor(audio) {
        this.inkStory = null;
        this.isDialogueOpen = false;
        this.npcStories = {};
        this.inkLib = null;
        this.activeNpc = null;
        this.audio = audio;

        // Cache DOM refs once
        this._bubScroll = null;
        this._barChoices = null;
    }

    // ── Public init helpers ──────────────────────────────────────────────────

    setInkLib(lib) { this.inkLib = lib; }
    setActiveNPC(npc) { this.activeNpc = npc; }
    setDialogueOpen(state) { this.isDialogueOpen = state; }

    // ── Story loading ────────────────────────────────────────────────────────

    loadStoryForNPC(npc) {
        // NPCs from config.js use storyFile / hasDialogue directly.
        // NPCs from levels.js use dialogueId plus this DIALOGUE_ID_MAP.
        // We now allow storyFile to be an ID reference.
        const storyFile = DIALOGUE_ID_MAP[npc.storyFile || npc.dialogueId || npc.id];

        if (!storyFile) return Promise.resolve();
        return fetch(storyFile)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(data => { this.npcStories[npc.id] = data; })
            .catch(e => console.error(`[DialogueManager] Failed to load story for ${npc.name}:`, e));
    }

    createStory(npcId) {
        if (!this.inkLib) throw new Error('Ink runtime not loaded');
        const data = this.npcStories[npcId];
        if (!data || typeof data !== 'object' || !data.inkVersion) {
            return null;
        }
        try {
            return new this.inkLib.Story(data);
        } catch (err) {
            // If inkjs fails but it has a 'start' node, it might be our Simple JSON format
            if (data.start || data.root) {
                return null; // openDialogue will handle Simple JSON as a fallback
            }
            console.error(`[DialogueManager] inkjs failed to parse story for ${npcId}:`, err);
            return null;
        }
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
        let displayStr = text;
        if (typeof text === 'object' && text !== null) displayStr = text.text || JSON.stringify(text);
        el.textContent = displayStr;
        bubScroll.appendChild(el);
        bubScroll.scrollTop = bubScroll.scrollHeight;
    }

    /**
     * Show an animated typing indicator, then call cb() after ~600–800 ms.
     * @param {Function} cb
     * @param {string} [npcName]
     */
    addTyping(cb, npcName) {
        const { bubScroll } = this._getEls();
        const displayName = npcName ?? this.activeNpc?.name ?? 'NPC';
        const row = document.createElement('div');
        row.className = 'typing-row';
        row.innerHTML =
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            `<span class="typing-lbl">${displayName} is typing…</span>`;
        bubScroll.appendChild(row);
        bubScroll.scrollTop = bubScroll.scrollHeight;
        setTimeout(() => {
            row.remove();
            cb();
        }, 600 + Math.random() * 200);
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
            b.onclick = () => onPick(c);
            barChoices.appendChild(b);
        });
    }

    // ── Open / close ─────────────────────────────────────────────────────────

    /**
     * Open the dialogue box for an NPC and start the Ink story from the top.
     *
     * Also closes any open sidebar panels (mirrors vn.html startDialogue behaviour).
     *
     * @param {object}   npc       — NPC config object with .name and .id
     * @param {object|null} inkStory — Active inkjs Story instance
     * @param {Function} onClose   — Called when the player ends the conversation
     * @param {Function} onTag     — Called when a tag (e.g., reveal:id) is encountered
     */
    openDialogue(npc, inkStory, onClose, onTag) {
        const storyData = this.npcStories[npc.id];
        const isSimple = storyData && !!storyData.start;

        if (!inkStory && !isSimple) {
            console.warn(`[DialogueManager] Aborting dialogue for ${npc.name}: No valid story found (Ink or Simple JSON).`);
            return;
        }

        // Close sidebar panels
        ['panel-quest', 'panel-inv', 'panel-actions'].forEach(id => {
            document.getElementById(id)?.classList.remove('open');
        });
        ['btn-quest-toggle', 'btn-inv-toggle', 'btn-actions-toggle'].forEach(id => {
            document.getElementById(id)?.classList.remove('active');
        });

        this.setActiveNPC(npc);
        this.setDialogueOpen(true);

        // Populate header
        const avatarEl = document.getElementById('vn-avatar');
        if (avatarEl) avatarEl.innerHTML = (npc.avatar || '?').endsWith('.svg') ? `<img src="../assets/characters/${npc.avatar}" class="icon-svg" loading='lazy'>` : (npc.avatar ?? '?');
        const statusEl = document.getElementById('vn-status');
        if (statusEl) statusEl.textContent = '● ONLINE';

        // Populate header
        const nameEl = document.getElementById('vn-speaker-name') || document.getElementById('npc-name-display');
        if (nameEl) nameEl.innerText = npc.name ?? npc.id;

        // Clear previous messages
        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });

        // Bind close button if present
        document.querySelectorAll('.dialogue-close-btn, #vn-close-btn').forEach(btn => btn.onclick = () => this.closeDialogue(onClose));

        // Show the box
        document.getElementById('vn-overlay').classList.add('active');

        const closeBtn = document.getElementById('vn-close-btn');
        if (closeBtn) closeBtn.onclick = () => this.closeDialogue(onClose);

        if (this.audio) this.audio.playTalk();

        // System handshake message, then start story
        this.addMsg('SECURE CONNECTION ESTABLISHED.', 'system');
        if (inkStory) {
            this._stepStory(inkStory, onClose, onTag);
        } else {
            this._stepSimpleJson(storyData, 'start', onClose, onTag);
        }
    }

    closeDialogue(onClose) {
        const box = document.getElementById('vn-overlay') || document.getElementById('local-dialogue-box');
        if (box) {
            box.classList.remove('active');
            box.style.display = '';
        }
        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });
        this.setDialogueOpen(false);
        if (typeof onClose === 'function') onClose();
    }

    // ── Story stepping ───────────────────────────────────────────────────────

    /**
     * Advance the Ink story one beat:
     *   1. Collect all pending text lines.
     *   2. Show typing indicator → display NPC bubble(s).
     *   3. Show ambient filler lines.
     *   4. Render choice buttons (or a [CLOSE] button at story end).
     *
     * @param {object}   inkStory
     * @param {Function} onClose
     * @param {Function} onTag
     */
    _stepStory(inkStory, onClose, onTag) {
        // Ensure the choices bar is hidden while text lines are still arriving
        this.showChoices(null, () => { });

        if (inkStory.canContinue) {
            this.addTyping(() => {
                // ink-js runtime: story.Continue() handles the JSON traversal and returns plain text.
                // This avoids manual JSON parsing or flattening.
                const rawLine = inkStory.Continue();
                const line = (rawLine || '').trim();

                if (line) {
                    this.addMsg(line, 'npc');

                    // process line tags immediately (e.g. # reveal:evidence_id)
                    if (inkStory.currentTags && typeof onTag === 'function') {
                        inkStory.currentTags.forEach(tag => onTag(tag));
                    }
                }

                // Recurse to handle the next line, or move to choices if finished
                setTimeout(() => this._stepStory(inkStory, onClose, onTag), line ? 450 : 0);
            });
        } else {
            // No more lines. Retrieve choices from the runtime state.
            const choices = inkStory.currentChoices;

            if (choices && choices.length > 0) {
                this.showChoices(choices, (choice) => {
                    this.addMsg(choice.text, 'player');
                    // ink-js: story.ChooseChoiceIndex(index) updates the internal state machine
                    inkStory.ChooseChoiceIndex(choice.index);
                    setTimeout(() => this._stepStory(inkStory, onClose, onTag), 300);
                });
            } else {
                // Terminal node (-> END or -> DONE)
                this.showChoices(
                    [{ text: '🔄 [ CLOSE CONNECTION ]', index: -1 }],
                    () => this.closeDialogue(onClose)
                );
            }
        }
    }

    /**
     * Interpreter for non-Ink simple JSON branching dialogue.
     */
    _stepSimpleJson(data, nodeId, onClose, onTag) {
        const node = data[nodeId];
        if (!node) {
            this.closeDialogue(onClose);
            return;
        }

        this.showChoices(null, () => { });

        this.addTyping(() => {
            const text = node.content || node.text || '';
            if (text) {
                this.addMsg(text, 'npc');
            }

            // Handle reveal: tags in text (common in custom JSON format)
            if (text.includes('# reveal:')) {
                const tag = text.split('# reveal:')[1]?.trim();
                if (tag && typeof onTag === 'function') onTag('reveal:' + tag);
            }

            // Process manual tags array
            if (node.tags && Array.isArray(node.tags)) {
                node.tags.forEach(t => onTag(t));
            }

            setTimeout(() => {
                const choices = node.choices || [];
                if (choices.length > 0) {
                    this.showChoices(choices, (choice) => {
                        this.addMsg(choice.text, 'player');
                        // Recursively move to the destination node
                        setTimeout(() => this._stepSimpleJson(data, choice.destination, onClose, onTag), 300);
                    });
                } else {
                    // End of simple story
                    this.showChoices(
                        [{ text: '🔄 [ CLOSE CONNECTION ]', destination: null }],
                        () => this.closeDialogue(onClose)
                    );
                }
            }, 600);
        });
    }

    continueStory(inkStory, onClose, onTag) {
        this._stepStory(inkStory, onClose, onTag);
    }
}
