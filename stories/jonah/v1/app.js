
/**
 * JONAH AND THE WHALE - MODULAR STORY ENGINE
 * Uses Anime.js for transitions and Three.js placeholders for 3D logic.
 */

const SCENES = [
    {
        chapter: "Chapter 1",
        title: "The Great Storm",
        bible: '"But the Lord sent out a great wind into the sea, and there was a mighty tempest..." - Jonah 1:4',
        palette: "sea",
        model: "Placeholder: 3D Boat (boat.obj / boat.glb)",
        effect: "rain",
        prophecy: false,
        anim: { direction: 'normal', easing: 'easeInOutQuad', duration: 1500 }
    },
    {
        chapter: "Chapter 1",
        title: "The Deep",
        bible: '"Now the Lord had prepared a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights." - Jonah 1:17',
        palette: "sea",
        model: "Placeholder: Inside the Whale (ribs.obj / whale_body.glb)",
        effect: "bubbles",
        prophecy: true,
        anim: { direction: 'alternate', easing: 'easeOutElastic(1, .6)', duration: 2000 }
    },
    {
        chapter: "Chapter 3",
        title: "The City of Nineveh",
        bible: '"So Jonah arose, and went unto Nineveh... and he cried, and said, Yet forty days, and Nineveh shall be overthrown." - Jonah 3:3-4',
        palette: "desert",
        model: "Placeholder: Nineveh Gates (city.obj / gates.glb)",
        effect: "sand",
        prophecy: false,
        anim: { direction: 'normal', easing: 'easeOutExpo', duration: 1200 }
    },
    {
        chapter: "Chapter 4",
        title: "The Tree and the Heat",
        bible: '"And the Lord God prepared a gourd... that it might be a shadow over his head... But God prepared a worm when the morning rose... and it smote the gourd that it withered." - Jonah 4:6-7',
        palette: "desert",
        model: "Placeholder: Wilted Tree (tree.obj / gourd.glb)",
        effect: "heat-rays",
        prophecy: false,
        anim: { direction: 'normal', easing: 'linear', duration: 3000 }
    }
];

let currentIndex = 0;

const StoryEngine = {
    init: function() {
        this.renderScene(SCENES[0]);
    },

    next: function() {
        if (currentIndex < SCENES.length - 1) {
            currentIndex++;
            this.renderScene(SCENES[currentIndex]);
        }
    },

    prev: function() {
        if (currentIndex > 0) {
            currentIndex--;
            this.renderScene(SCENES[currentIndex]);
        }
    },

    renderScene: function(scene) {
        // 1. ANIME.JS TRANSITIONS
        // Fade out current text
        anime({
            targets: '#text-box',
            opacity: [1, 0],
            translateY: [0, 20],
            duration: 400,
            easing: 'easeInQuad',
            complete: () => {
                // Update text content
                document.getElementById('scene-title').innerText = scene.title;
                document.getElementById('bible-text').innerText = scene.bible;
                document.getElementById('chapter-indicator').innerText = scene.chapter;
                
                // Toggle Prophecy
                const pZone = document.getElementById('prophecy-zone');
                scene.prophecy ? pZone.classList.remove('hidden') : pZone.classList.add('hidden');

                // Fade back in with modular settings
                anime({
                    targets: '#text-box',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    ...scene.anim
                });
            }
        });

        // 2. PALETTE SWAP
        if (scene.palette === "desert") {
            document.body.classList.add('desert-theme');
        } else {
            document.body.classList.remove('desert-theme');
        }

        // 3. PARTICLE EFFECTS & 3D PLACEHOLDERS
        this.updateEffects(scene.effect);
        console.log("3D Loading: " + scene.model);
    },

    updateEffects: function(type) {
        console.log("Particle System Switching to: " + type);
        // Implementation for library like tsparticles would go here
        // rain for storm, light rays for heat, etc.
    }
};

window.onload = () => StoryEngine.init();
