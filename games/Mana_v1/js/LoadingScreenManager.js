export class LoadingScreenManager {
  constructor(minDisplayMs) {
    this.el = document.getElementById('loadingScreen');
    this.fill = document.getElementById('loadingBarFill');
    this.character = document.getElementById('loadingCharacter');
    this.manaLayer = document.getElementById('loadingManaLayer');
    this.percentEl = document.getElementById('loadingPercent');

    this.manaPositions = [12, 28, 46, 64, 82];
    this.manaEls = [];
    this.charPos = 6;
    this.direction = 1;
    this.speed = 0.55;
    this.currentProgress = 0;
    this.targetProgress = 5;
    this.startTime = Date.now();
    this.minDisplayMs = minDisplayMs;
    this.hidden = false;
    this.rafId = null;

    this.spawnMana();
    this.loop();
  }

  spawnMana() {
    this.manaLayer.innerHTML = '';
    this.manaEls = this.manaPositions.map((pos) => {
      const d = document.createElement('div');
      d.className = 'loading-mana';
      d.style.left = pos + '%';
      this.manaLayer.appendChild(d);
      return { el: d, pos, collected: false, respawnAt: 0 };
    });
  }

  setProgress(pct) {
    this.targetProgress = Math.min(100, Math.max(0, pct));
  }

  loop() {
    this.currentProgress += (this.targetProgress - this.currentProgress) * 0.08;
    this.fill.style.width = this.currentProgress + '%';
    this.percentEl.textContent = Math.round(this.currentProgress) + '%';

    this.charPos += this.speed * this.direction;
    if (this.charPos >= 94) { this.charPos = 94; this.direction = -1; }
    if (this.charPos <= 6) { this.charPos = 6; this.direction = 1; }
    this.character.style.left = this.charPos + '%';
    this.character.style.transform = `scaleX(${this.direction})`;

    const now = Date.now();
    this.manaEls.forEach((m) => {
      if (!m.collected && Math.abs(m.pos - this.charPos) < 3.5) {
        m.collected = true;
        m.el.classList.add('collected');
        m.respawnAt = now + 900 + Math.random() * 900;
      } else if (m.collected && now >= m.respawnAt) {
        m.collected = false;
        m.pos = 8 + Math.random() * 84;
        m.el.style.left = m.pos + '%';
        m.el.classList.remove('collected');
      }
    });

    if (!this.hidden) {
      this.rafId = requestAnimationFrame(() => this.loop());
    }
  }

  hide() {
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.minDisplayMs - elapsed);
    this.setProgress(100);
    setTimeout(() => {
      this.hidden = true;
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.el.classList.add('loading-hidden');
      setTimeout(() => { this.el.style.display = 'none'; }, 650);
    }, remaining);
  }
}