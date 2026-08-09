// controls.js
export class ControlsManager {
    constructor(gameEngine) {
        this.engine = gameEngine;
        this.keys = {};
        this.autoCycle = false;
        this.init();
    }

    init() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            const modalActive = document.querySelector('.overlay-mask.active, .modal-overlay.active');
            if (e.code === 'KeyE' && this.engine.nearestNPC && !this.engine.inDialogue) {
                this.engine.startDialogue(this.engine.nearestNPC.userData.config);
            }
            // Prevent opening the map if already in a menu or dialogue
            if (e.code === 'KeyM' && !this.engine.inDialogue && !modalActive) {
                if (this.engine.mapModal) this.engine.mapModal.open();
            }
            // Prevent toggling time-cycle while menus are open
            if (e.code === 'KeyR' && !this.engine.inDialogue) {
                if (modalActive) return;
                this.autoCycle = !this.autoCycle;
                this.displayAlert(this.autoCycle ? "Auto day/night enabled" : "Celestial timeline frozen");
            }

            // Menu navigation with Tab / Shift+Tab
            if (e.code === 'Tab') {
                e.preventDefault();
                const menuButtonIds = [
                    'btn-mobile-quest',
                    'btn-mobile-evidence',
                    'btn-mobile-actions',
                    'btn-mobile-codex',
                    'btn-mobile-keys',
                    'btn-mobile-analysis'
                ];
                
                let activeIndex = menuButtonIds.findIndex(id => {
                    const el = document.getElementById(id);
                    return el && el.classList.contains('active');
                });

                if (e.shiftKey) {
                    activeIndex = (activeIndex <= 0) ? menuButtonIds.length - 1 : activeIndex - 1;
                } else {
                    activeIndex = (activeIndex + 1) % menuButtonIds.length;
                }

                const targetBtn = document.getElementById(menuButtonIds[activeIndex]);
                if (targetBtn) targetBtn.click();
            }
        });

        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
    }

    displayAlert(msg) {
        const el = document.getElementById('screen-alert');
        el.innerHTML = msg;
        el.classList.toggle('case-title-alert', msg.startsWith('Case:'));
        el.style.display = 'block';
        setTimeout(() => {
            el.style.display = 'none';
            el.classList.remove('case-title-alert');
        }, msg.startsWith('Case:') ? 3000 : 3500);
    }
}