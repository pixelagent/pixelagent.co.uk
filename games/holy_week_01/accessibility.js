// accessibility.js — full accessibility layer: screen reader, keyboard nav, focus management

export class AccessibilityManager {
  constructor({ chatUI, onTTSChange } = {}) {
    this.chatUI = chatUI;
    this.onTTSChange = onTTSChange || (() => {});
    this.ttsEnabled = false;
    this.highContrast = false;
    this.simpleMode = false;
    this.largeText = false;
    this.soundEnabled = true; // default sound on
    this._ensureLiveRegion();
    this._bindKeyboard();
  }

  // ── LIVE REGION (screen readers) ──────────────────────
  _ensureLiveRegion() {
    if (document.getElementById('sr-announce')) return;
    const el = document.createElement('div');
    el.id = 'sr-announce';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.className = 'sr-only';
    document.body.appendChild(el);

    // Assertive region for urgent alerts
    const urgent = document.createElement('div');
    urgent.id = 'sr-urgent';
    urgent.setAttribute('role', 'alert');
    urgent.setAttribute('aria-live', 'assertive');
    urgent.setAttribute('aria-atomic', 'true');
    urgent.className = 'sr-only';
    document.body.appendChild(urgent);
  }

  announce(text, urgent = false) {
    const id = urgent ? 'sr-urgent' : 'sr-announce';
    const region = document.getElementById(id);
    if (!region) return;
    region.textContent = '';
    setTimeout(() => { region.textContent = text; }, 50);
    if (this.ttsEnabled) this._speak(text);
  }

  speak(text, urgent = false) {
    if (this.ttsEnabled) this._speak(text);
    this.announce(text, urgent === true || urgent === "assertive");
  }

  // ── TEXT-TO-SPEECH ────────────────────────────────────
  _speak(text, rate = 0.9) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = rate;
    utt.lang = 'en-GB';
    window.speechSynthesis.speak(utt);
  }

  enableTTS(enabled) {
    this.ttsEnabled = enabled;
    if (!enabled) window.speechSynthesis?.cancel();
    if (this.chatUI) this.chatUI.setTTS(enabled);
    this.onTTSChange(enabled);
    this._updateBtn('btn-tts', enabled);
    this.announce(enabled ? 'Text to speech on' : 'Text to speech off');
  }

  toggleTTS() { this.enableTTS(!this.ttsEnabled); }

  // ── HIGH CONTRAST ─────────────────────────────────────
  enableHighContrast(enabled) {
    this.highContrast = enabled;
    document.body.classList.toggle('high-contrast', enabled);
    this._updateBtn('btn-contrast', enabled);
    localStorage.setItem('a11y-contrast', enabled);
  }

  toggleHighContrast() { this.enableHighContrast(!this.highContrast); }

  // ── SIMPLE MODE (reduced text complexity) ─────────────
  enableSimpleMode(enabled) {
    this.simpleMode = enabled;
    document.body.classList.toggle('simple-mode', enabled);
    this._updateBtn('btn-simple', enabled);
    localStorage.setItem('a11y-simple', enabled);
  }

  toggleSimpleMode() { this.enableSimpleMode(!this.simpleMode); }

  // ── LARGE TEXT ────────────────────────────────────────
  enableLargeText(enabled) {
    this.largeText = enabled;
    document.documentElement.style.fontSize = enabled ? '120%' : '';
    this._updateBtn('btn-large', enabled);
    localStorage.setItem('a11y-large', enabled);
  }

  toggleLargeText() { this.enableLargeText(!this.largeText); }

  // ── SOUND EFFECTS ───────────────────────────────────────
  enableSound(enabled) {
    this.soundEnabled = enabled;
    this.announce(enabled ? 'Sound effects on' : 'Sound effects off');
    localStorage.setItem('a11y-sound', enabled);
  }

  toggleSound() { this.enableSound(!this.soundEnabled); }

  // ── KEYBOARD NAVIGATION ───────────────────────────────
  _bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Skip if typing in an input
      if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;

      switch (e.key) {
        case '1': window.__switchTab?.('evidence');  break;
        case '2': window.__switchTab?.('npcs');      break;
        case '3': window.__switchTab?.('lab');       break;
        case '4': window.__switchTab?.('chat');      break;
        case '5': window.__switchTab?.('accuse');    break;
        case 'Escape': this._handleEscape();         break;
        case 'Tab':    this._manageFocus(e);         break;
      }
    });
  }

  _handleEscape() {
    // Close any open modal
    const modal = document.querySelector('.modal-overlay.open');
    if (modal) { modal.classList.remove('open'); return; }
    // Otherwise go back to map
    window.App?.showScreen('screen-map');
  }

  _manageFocus(e) {
    // Trap focus inside open modals
    const modal = document.querySelector('.modal-overlay.open');
    if (!modal) return;
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  // ── FOCUS MANAGEMENT ─────────────────────────────────
  moveFocusTo(selector) {
    const el = document.querySelector(selector);
    if (el) { el.focus(); }
  }

  moveFocusToMain() {
    const main = document.querySelector('[role="main"].active, .screen.active h2, .screen.active h1');
    if (main) main.focus();
  }

  // ── RESTORE SAVED PREFERENCES ────────────────────────
  restorePreferences() {
    if (localStorage.getItem('a11y-contrast') === 'true') this.enableHighContrast(true);
    if (localStorage.getItem('a11y-simple')   === 'true') this.enableSimpleMode(true);
    if (localStorage.getItem('a11y-large')    === 'true') this.enableLargeText(true);
    const soundSaved = localStorage.getItem('a11y-sound');
    if (soundSaved !== null) {
      this.enableSound(soundSaved === 'true');
    }
  }

  // ── TOOLBAR RENDERER ─────────────────────────────────
  renderToolbar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tools = [
      { id: 'btn-tts',      icon: '🔊', label: 'Text to Speech',  action: () => this.toggleTTS() },
      { id: 'btn-contrast', icon: '🌓', label: 'High Contrast',   action: () => this.toggleHighContrast() },
      { id: 'btn-simple',   icon: '🅰',  label: 'Simple Text',    action: () => this.toggleSimpleMode() },
      { id: 'btn-large',    icon: '🔠', label: 'Large Text',      action: () => this.toggleLargeText() },
      { id: 'btn-reset',    icon: '↺',  label: 'Reset Progress',  action: () => window.__resetProgress?.() }
    ];

    container.innerHTML = `
      <div class="a11y-bar" role="toolbar" aria-label="Accessibility options">
        ${tools.map(t => `
          <button id="${t.id}" aria-label="${t.label}" aria-pressed="false"
                  title="${t.label}" onclick="window.__a11y_${t.id}()">
            ${t.icon}
          </button>`).join('')}
      </div>`;

    tools.forEach(t => {
      window[`__a11y_${t.id}`] = t.action;
    });
  }

  // ── SKIP LINK ─────────────────────────────────────────
  injectSkipLink() {
    if (document.getElementById('skip-link')) return;
    const link = document.createElement('a');
    link.id = 'skip-link';
    link.href = '#main-content';
    link.className = 'skip-link';
    link.textContent = 'Skip to main content';
    link.style.cssText = `
      position:absolute; top:-40px; left:0; background:var(--accent);
      color:#fff; padding:8px 16px; border-radius:0 0 8px 0;
      font-weight:700; z-index:9999; transition:top 0.2s;
    `;
    link.addEventListener('focus', () => { link.style.top = '0'; });
    link.addEventListener('blur',  () => { link.style.top = '-40px'; });
    document.body.prepend(link);
  }

  // ── HELPERS ───────────────────────────────────────────
  _updateBtn(id, pressed) {
    const btn = document.getElementById(id);
    if (btn) btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  }

  // ── SIMPLIFY TEXT (for simple mode) ─────────────────────
  simplify(text) {
    if (!this.simpleMode) return text;
    const replacements = [
      [/investigate/gi, 'look into'],
      [/investigation/gi, 'looking into'],
      [/suspect/gi, 'person to check'],
      [/mysteriously/gi, 'strangely'],
      [/perpetrator/gi, 'doer'],
      [/anonymous/gi, 'unknown'],
      [/surveillance/gi, 'watching'],
      [/surveillance/gi, 'watching'],
      [/significant/gi, 'big'],
      [/subsequently/gi, 'after'],
      [/individual/gi, 'person'],
      [/apparently/gi, 'seems like'],
      [/approximately/gi, 'about'],
      [/approximately/gi, 'about'],
    ];
    let result = text;
    for (const [pattern, replacement] of replacements) {
      result = result.replace(pattern, replacement);
    }
    return result;
  }

  evidenceTypeLabel(type) {
    const labels = {
      physical: 'Physical Evidence',
      witness: 'Witness Statement',
      digital: 'Digital Evidence',
      document: 'Document',
      trace: 'Trace Evidence'
    };
    return labels[type] || type;
  }

  getAll() {
    return {
      high_contrast: this.highContrast,
      large_text: this.largeText,
      tts: this.ttsEnabled,
      sound: this.soundEnabled,
      slow_speech: false,
      simple_mode: this.simpleMode,
      reduce_motion: false
    };
  }

  toggle(feature) {
    const toggles = {
      high_contrast: () => this.toggleHighContrast(),
      large_text: () => this.toggleLargeText(),
      tts: () => this.toggleTTS(),
      sound: () => this.toggleSound(),
      slow_speech: () => {},
      simple_mode: () => this.toggleSimpleMode(),
      reduce_motion: () => {}
    };
    const fn = toggles[feature];
    if (fn) fn();
    return this.getAll()[feature];
  }
}
