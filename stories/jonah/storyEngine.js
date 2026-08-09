/**
 * STORYENGINE.JS
 * Scene navigation and rendering. Evolved from the original monolithic app.js —
 * scene content now lives in data/scenes.json (see config.js for the path),
 * and beat logic lives in beats/act*.js.
 */

const StoryEngine = (function () {
    let scenes = [];
    let currentIndex = 0;
    let gameModeActive = false;

    async function init() {
        const res = await fetch(CONFIG.paths.scenes);
        scenes = await res.json();

        const isoContainer = document.getElementById('isometric-container');
        isoContainer.classList.remove('hidden');
        await IsometricEngine.init(isoContainer);

        // Listen for act completion from isometric engine
        window.addEventListener('isometric:actComplete', onActComplete);

        renderScene(scenes[0]);
    }

    function next() {
        if (currentIndex < scenes.length - 1) {
            currentIndex++;
            renderScene(scenes[currentIndex]);
        }
    }

    function prev() {
        if (currentIndex > 0) {
            currentIndex--;
            renderScene(scenes[currentIndex]);
        }
    }

    function skipGameScenes(direction) {
        // When navigating normally, skip game scenes
        if (gameModeActive) return;

        let newIndex = currentIndex;
        const maxIterations = scenes.length;
        let iterations = 0;

        do {
            iterations++;
            if (direction === 'next' && newIndex < scenes.length - 1) {
                newIndex++;
            } else if (direction === 'prev' && newIndex > 0) {
                newIndex--;
            } else {
                break;
            }
        } while (scenes[newIndex].gameMode && iterations < maxIterations);

        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            renderScene(scenes[currentIndex]);
        }
    }

    function renderScene(scene) {
        const actId = scene.id.split('_')[0]; // e.g., "act1" from "act1_storm"

        // 1. ANIME.JS TRANSITIONS — fade out current text
        anime({
            targets: '#text-box',
            opacity: [1, 0],
            translateY: [0, 20],
            duration: CONFIG.transitions.textFadeOutDuration,
            easing: CONFIG.transitions.textFadeOutEasing,
            complete: () => {
                document.getElementById('scene-title').innerText = scene.title;
                document.getElementById('bible-text').innerText = scene.bible;
                document.getElementById('chapter-indicator').innerText = scene.chapter;

                const pZone = document.getElementById('prophecy-zone');
                scene.prophecy ? pZone.classList.remove('hidden') : pZone.classList.add('hidden');

                anime({
                    targets: '#text-box',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    ...scene.anim
                });
            }
        });

        // 2. PALETTE SWAP — per-act theme classes
        document.body.classList.remove('theme-sea', 'desert-theme');
        document.body.classList.toggle('theme-act1', actId === 'act1');
        document.body.classList.toggle('theme-act2', actId === 'act2');
        document.body.classList.toggle('theme-act3', actId === 'act3');
        document.body.classList.toggle('theme-act4', actId === 'act4');
        if (typeof PostProduction !== 'undefined') {
            PostProduction.applyPaletteProfile(scene.palette);
        }

        // 3. PARTICLE EFFECTS & 3D PLACEHOLDERS
        updateEffects(scene.effect);
        console.log('3D Loading: ' + scene.model);

        // 4. ISOMETRIC SCENE LOADING
        const isoSceneId = `${actId}_${scene.isometric_id}`; // e.g., "act1_ship"
        IsometricEngine.goToScene(isoSceneId);

        // 5. Show game overlay for game scenes
        const gameOverlay = document.getElementById('game-overlay');
        const gameCompleteBtn = document.getElementById('game-complete-btn');
        const gameInstructions = document.getElementById('game-instructions');
        const gameHeader = document.getElementById('game-header');
        const gameProgress = document.getElementById('game-progress');

        if (scene.gameMode) {
            gameModeActive = true;
            gameOverlay.classList.add('active');
            gameCompleteBtn.classList.remove('show');
            gameHeader.textContent = scene.gameTitle || 'Explore the World';
            gameInstructions.textContent = scene.gameInstructions || 'Use WASD or Arrow keys to move. Find and interact with glowing hotspots to complete the scene.';
            gameProgress.textContent = 'Progress: 0 / ' + (scene.gameTotalHotspots || 0);
            document.getElementById('story-ui').style.opacity = '0.3';
            document.getElementById('isometric-container').style.opacity = '1';
        } else {
            gameModeActive = false;
            gameOverlay.classList.remove('active');
            document.getElementById('story-ui').style.opacity = '1';
        }
    }

    function onActComplete(e) {
        if (!gameModeActive) return;

        const gameCompleteBtn = document.getElementById('game-complete-btn');
        const gameProgress = document.getElementById('game-progress');
        const detail = e.detail;

        gameCompleteBtn.classList.add('show');
        gameProgress.textContent = 'Scene complete! All interactions discovered.';

        gameCompleteBtn.onclick = () => {
            gameModeActive = false;
            const gameOverlay = document.getElementById('game-overlay');
            gameOverlay.classList.remove('active');
            document.getElementById('story-ui').style.opacity = '1';
            next();
        };
    }

    function updateEffects(type) {
        console.log('Particle System Switching to: ' + type);
        // tsparticles config swap goes here
    }

    function getCurrentScene() {
        return scenes[currentIndex];
    }

    return { init, next, prev, getCurrentScene };
})();

window.onload = () => StoryEngine.init();
