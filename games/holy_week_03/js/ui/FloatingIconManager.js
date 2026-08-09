/**
 * Manages the creation and animation of floating icons for player actions.
 * When an action is performed, an icon appears and drifts up the screen, then fades out.
 */
export class FloatingIconManager {
    constructor(container = document.body) {
        this.container = container;
    }

    /**
     * Creates and animates a floating icon.
     * @param {string} icon - The emoji or icon character to display.
     */
    show(icon) {
        const iconEl = document.createElement('div');
        iconEl.className = 'floating-action-icon';

        const iconStr = String(icon);
        if (iconStr.endsWith('.svg')) {
            iconEl.innerHTML = `<img src="${iconStr}" class="icon-svg" loading="lazy">`;
        } else if (iconStr.startsWith('<')) {
            iconEl.innerHTML = iconStr;
        } else {
            iconEl.textContent = iconStr;
        }

        // Start at a random horizontal position at the bottom of the screen
        const startX = Math.random() * 80 + 10; // 10% to 90% of screen width
        iconEl.style.left = `${startX}vw`;
        iconEl.style.bottom = '5vh';
        iconEl.style.opacity = '1';
        iconEl.style.transform = 'scale(1)';

        this.container.appendChild(iconEl);

        // Animate upwards, fading and shrinking
        const duration = 3000 + Math.random() * 2000; // 3-5 seconds
        const travelDistance = window.innerHeight * (0.4 + Math.random() * 0.3); // 40-70% of screen height

        iconEl.animate([
            {
                bottom: '5vh',
                opacity: 1,
                transform: 'scale(1.5) translateX(0px)'
            },
            {
                bottom: `${travelDistance}px`,
                opacity: 0,
                transform: `scale(0.5) translateX(${(Math.random() - 0.5) * 100}px)`
            }
        ], {
            duration: duration,
            easing: 'ease-in-out'
        }).onfinish = () => {
            iconEl.remove();
        };
    }
}
