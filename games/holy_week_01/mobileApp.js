// mobileApp.js — tab navigation, view routing, accessibility toolbar

export class MobileApp {
  constructor({ tabs, views, onTabChange }) {
    this.tabs = tabs;      // [{ id, label, icon }]
    this.views = views;    // [id, ...]
    this.onTabChange = onTabChange || (() => {});
    this.activeTab = tabs[0]?.id || null;
    this.simpleMode = false;
    this.highContrast = false;
    this.ttsEnabled = false;
  }

  renderTabs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = this.tabs.map(t => `
      <button
        class="tab ${t.id === this.activeTab ? 'active' : ''}"
        id="tab-${t.id}"
        role="tab"
        aria-selected="${t.id === this.activeTab}"
        aria-controls="view-${t.id}"
        onclick="window.__switchTab('${t.id}')"
      >${t.icon} <span class="tab-label">${t.label}</span></button>
    `).join('');

    window.__switchTab = (id) => this.switchTab(id);
  }

  switchTab(id) {
    this.activeTab = id;

    document.querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('active', t.id === `tab-${id}`);
      t.setAttribute('aria-selected', t.id === `tab-${id}`);
    });

    this.views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        el.classList.toggle('active', v === id);
        el.setAttribute('aria-hidden', v !== id);
      }
    });

    this.onTabChange(id);
  }

  renderAccessibilityBar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="a11y-bar" role="toolbar" aria-label="Accessibility Options">
        <button id="btn-tts" aria-pressed="false" onclick="window.__toggleTTS()" title="Text to Speech">🔊</button>
        <button id="btn-contrast" aria-pressed="false" onclick="window.__toggleContrast()" title="High Contrast">🌓</button>
        <button id="btn-simple" aria-pressed="false" onclick="window.__toggleSimple()" title="Simple Mode">🅰</button>
        <button id="btn-reset" onclick="window.__resetProgress()" title="Reset Progress">↺</button>
      </div>
    `;
    window.__toggleTTS     = () => this._toggleTTS();
    window.__toggleContrast = () => this._toggleContrast();
    window.__toggleSimple  = () => this._toggleSimple();
  }

  _toggleTTS() {
    this.ttsEnabled = !this.ttsEnabled;
    document.getElementById('btn-tts')?.setAttribute('aria-pressed', this.ttsEnabled);
    document.body.classList.toggle('tts-on', this.ttsEnabled);
    if (this.onTTSChange) this.onTTSChange(this.ttsEnabled);
  }

  _toggleContrast() {
    this.highContrast = !this.highContrast;
    document.getElementById('btn-contrast')?.setAttribute('aria-pressed', this.highContrast);
    document.body.classList.toggle('high-contrast', this.highContrast);
  }

  _toggleSimple() {
    this.simpleMode = !this.simpleMode;
    document.getElementById('btn-simple')?.setAttribute('aria-pressed', this.simpleMode);
    document.body.classList.toggle('simple-mode', this.simpleMode);
  }

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.toggle('active', s.id === id);
      s.setAttribute('aria-hidden', s.id !== id);
    });
  }

  announce(text) {
    // Screen reader live region
    let region = document.getElementById('sr-announce');
    if (!region) {
      region = document.createElement('div');
      region.id = 'sr-announce';
      region.setAttribute('aria-live', 'assertive');
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      document.body.appendChild(region);
    }
    region.textContent = '';
    setTimeout(() => { region.textContent = text; }, 50);
  }
}
