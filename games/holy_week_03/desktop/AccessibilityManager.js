// AccessibilityManager.js — Unified accessibility layer

export class AccessibilityManager {
  constructor({ chatUI, onTTSChange, app } = {}) {
    this.chatUI = chatUI;
    this.onTTSChange = onTTSChange || (() => { });
    this.app = app; // Optional delegate for mobile announcements
    this.ttsEnabled = false;
    this.highContrast = false;
    this.simpleMode = false;
    this.largeText = false;
    this.soundEnabled = true;
    this.slowSpeech = false;
    this.reduceMotion = false;
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

    const urgent = document.createElement('div');
    urgent.id = 'sr-urgent';
    urgent.setAttribute('role', 'alert');
    urgent.setAttribute('aria-live', 'assertive');
    urgent.setAttribute('aria-atomic', 'true');
    urgent.className = 'sr-only';
    document.body.appendChild(urgent);
  }

  announce(text, urgent = false) {
    if (this.app?.announce) {
      this.app.announce(text);
    } else {
      const id = urgent ? 'sr-urgent' : 'sr-announce';
      const region = document.getElementById(id);
      if (region) {
        region.textContent = '';
        setTimeout(() => { region.textContent = text; }, 50);
      }
    }
    if (this.ttsEnabled) this._speak(text);
  }

  speak(text, urgent = false) {
    if (this.ttsEnabled) this._speak(text);
    this.announce(text, urgent === true || urgent === "assertive");
  }

  // ── TEXT-TO-SPEECH ────────────────────────────────────
  _speak(text, rate) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = rate ?? (this.slowSpeech ? 0.5 : 0.9);
    utt.lang = 'en-GB';
    window.speechSynthesis.speak(utt);
  }

  enableTTS(enabled) {
    this.ttsEnabled = enabled;
    if (!enabled) window.speechSynthesis?.cancel();
    if (this.chatUI?.setTTS) this.chatUI.setTTS(enabled);
    this.onTTSChange(enabled);
    this._updateBtn('btn-tts', enabled);
    this.announce(enabled ? 'Text to speech on' : 'Text to speech off');
  }

  toggleTTS() { this.enableTTS(!this.ttsEnabled); }

  enableHighContrast(enabled) {
    this.highContrast = enabled;
    document.body.classList.toggle('high-contrast', enabled);
    this._updateBtn('btn-contrast', enabled);
    localStorage.setItem('a11y-contrast', String(enabled));
  }

  toggleHighContrast() { this.enableHighContrast(!this.highContrast); }

  enableSimpleMode(enabled) {
    this.simpleMode = enabled;
    document.body.classList.toggle('simple-mode', enabled);
    this._updateBtn('btn-simple', enabled);
    localStorage.setItem('a11y-simple', String(enabled));
  }

  toggleSimpleMode() { this.enableSimpleMode(!this.simpleMode); }

  enableLargeText(enabled) {
    this.largeText = enabled;
    document.documentElement.style.fontSize = enabled ? '120%' : '';
    this._updateBtn('btn-large', enabled);
    localStorage.setItem('a11y-large', String(enabled));
  }

  toggleLargeText() { this.enableLargeText(!this.largeText); }

  enableSound(enabled) {
    this.soundEnabled = enabled;
    this.announce(enabled ? 'Sound effects on' : 'Sound effects off');
    localStorage.setItem('a11y-sound', String(enabled));
  }

  toggleSound() { this.enableSound(!this.soundEnabled); }

  enableSlowSpeech(enabled) {
    this.slowSpeech = enabled;
    this._updateBtn('btn-slow-speech', enabled);
    localStorage.setItem('a11y-slow-speech', String(enabled));
    this.announce(enabled ? 'Slow speech on' : 'Slow speech off');
  }

  toggleSlowSpeech() { this.enableSlowSpeech(!this.slowSpeech); }

  enableReduceMotion(enabled) {
    this.reduceMotion = enabled;
    document.body.classList.toggle('reduce-motion', enabled);
    this._updateBtn('btn-reduce-motion', enabled);
    localStorage.setItem('a11y-reduce-motion', String(enabled));
    this.announce(enabled ? 'Reduce motion on' : 'Reduce motion off');
  }

  toggleReduceMotion() { this.enableReduceMotion(!this.reduceMotion); }

  // ── KEYBOARD NAVIGATION ───────────────────────────────
  _bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      switch (e.key) {
        case '1': window.__switchTab?.('evidence'); break;
        case '2': (window.__switchTab?.('npcs') || window.__switchTab?.('people')); break;
        case '3': window.__switchTab?.('lab'); break;
        case '4': (window.__switchTab?.('codex') || window.__switchTab?.('chat')); break;
        case '5': window.__switchTab?.('accuse'); break;
        case 'Escape': this._handleEscape(); break;
        case 'Tab': this._manageFocus(e); break;
      }
    });
  }

  _handleEscape() {
    const modalD = document.querySelector('#modal-overlay.active');
    if (modalD) { modalD.classList.remove('active'); return; }
    const modalM = document.querySelector('.modal-overlay.open');
    if (modalM) { modalM.classList.remove('open'); return; }
    window.App?.showScreen('screen-map');
  }

  _manageFocus(e) {
    const modal = document.querySelector('.modal-overlay.open, #modal-overlay.active');
    if (!modal) return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  restorePreferences() {
    if (localStorage.getItem('a11y-contrast') === 'true') this.enableHighContrast(true);
    if (localStorage.getItem('a11y-simple') === 'true') this.enableSimpleMode(true);
    if (localStorage.getItem('a11y-large') === 'true') this.enableLargeText(true);
    const soundSaved = localStorage.getItem('a11y-sound');
    if (soundSaved !== null) this.enableSound(soundSaved === 'true');
    if (localStorage.getItem('a11y-slow-speech') === 'true') this.enableSlowSpeech(true);
    if (localStorage.getItem('a11y-reduce-motion') === 'true') this.enableReduceMotion(true);
  }

  _updateBtn(id, pressed) {
    const btn = document.getElementById(id);
    if (btn) btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  }

  simplify(text) {
    if (!this.simpleMode || !text) return text;
    const replacements = [
      [/investigate/gi, 'look into'], [/investigation/gi, 'looking into'], [/suspect/gi, 'person to check'],
      [/mysteriously/gi, 'strangely'], [/perpetrator/gi, 'doer'], [/anonymous/gi, 'unknown'],
      [/surveillance/gi, 'watching'], [/significant/gi, 'big'], [/subsequently/gi, 'after'],
      [/individual/gi, 'person'], [/apparently/gi, 'seems like'], [/approximately/gi, 'about'],
    ];
    let result = text;
    for (const [pattern, replacement] of replacements) result = result.replace(pattern, replacement);
    return result;
  }

  getAll() {
    return {
      high_contrast: this.highContrast, large_text: this.largeText, tts: this.ttsEnabled,
      sound: this.soundEnabled, slow_speech: this.slowSpeech, simple_mode: this.simpleMode,
      reduce_motion: this.reduceMotion
    };
  }

  toggle(feature) {
    const toggles = {
      high_contrast: () => this.toggleHighContrast(), large_text: () => this.toggleLargeText(),
      tts: () => this.toggleTTS(), sound: () => this.toggleSound(), slow_speech: () => this.toggleSlowSpeech(),
      simple_mode: () => this.toggleSimpleMode(), reduce_motion: () => this.toggleReduceMotion()
    };
    if (toggles[feature]) toggles[feature]();
    return this.getAll()[feature];
  }
}