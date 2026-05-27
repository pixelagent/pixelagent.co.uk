/**
 * MODULAR STORY CONFIGURATION
 * Edit this to change movement, easing, and bible verses.
 */
const storyData = [
    {
        title: "Part I: The Flood",
        verse: "Genesis 7:17 - For forty days the flood kept coming on the earth...",
        palette: "sea",
        imgDesc: "Placeholder: Cinematic 3D Ark tossing on giant green-tinted waves.",
        prophecy: "Matthew 24:37 - Just as it was in the days of Noah, so it will be at the coming of the Son of Man.",
        link: "https://www.biblegateway.com/passage/?search=Matthew+24%3A37-39&version=NIV",
        // Animation params: control direction (x/y/z) and speed/easing
        move: { x: 0, y: -1, z: 0, duration: 4000, easing: 'easeInOutQuad' }
    },
    {
        title: "Part II: The Covenant",
        verse: "Genesis 9:13 - I have set my rainbow in the clouds...",
        palette: "desert",
        imgDesc: "Placeholder: The Ark rested on Ararat, warm desert sun, 7-color rainbow light rays.",
        prophecy: "Hebrews 11:7 - By faith Noah, when warned about things not yet seen...",
        link: "https://www.biblegateway.com/passage/?search=Hebrews+11%3A7&version=NIV",
        move: { x: 2, y: 0.5, z: -2, duration: 3000, easing: 'easeOutElastic(1, .6)' }
    }
];

let currentSceneIndex = 0;

// --- THREE.JS SETUP ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Placeholder Objects (Ark/Noah/Animals)
const arkGeom = new THREE.BoxGeometry(2, 0.8, 4);
const arkMat = new THREE.MeshLambertMaterial({ color: 0x4d2a15 });
const ark = new THREE.Mesh(arkGeom, arkMat);
scene.add(ark);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 8;

// --- RAIN PARTICLES ---
const rainCount = 5000;
const rainGeom = new THREE.BufferGeometry();
const rainCoords = new Float32Array(rainCount * 3);
for(let i=0; i<rainCount*3; i++) rainCoords[i] = (Math.random() - 0.5) * 20;
rainGeom.setAttribute('position', new THREE.BufferAttribute(rainCoords, 3));
const rainMat = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.05 });
const rain = new THREE.Points(rainGeom, rainMat);
scene.add(rain);

// --- SCENE LOGIC ---
function updateScene() {
    const data = storyData[currentSceneIndex];
    
    // Update Text
    document.getElementById('chapter-title').innerText = data.title;
    document.getElementById('verse-text').innerText = data.verse;
    document.getElementById('img-desc').innerText = data.imgDesc;
    document.getElementById('prophecy-link').href = data.link;
    document.getElementById('scene-indicator').innerText = `${currentSceneIndex + 1} / ${storyData.length}`;
    document.getElementById('prophecy-zone').classList.remove('hidden');

    // Switch Palettes
    const bgColor = data.palette === 'sea' ? '#0e2f2f' : '#edc9af';
    document.getElementById('ui-layer').style.background = `radial-gradient(circle at center, transparent, ${bgColor})`;

    // Particle control
    rain.visible = (data.palette === 'sea');

    // MODULAR ANIME.JS ANIMATION
    // Animate the 'Ark' based on config settings
    anime({
        targets: ark.position,
        x: data.move.x,
        y: data.move.y,
        z: data.move.z,
        duration: data.move.duration,
        easing: data.move.easing
    });
}

function changeScene(dir) {
    currentSceneIndex = Math.max(0, Math.min(storyData.length - 1, currentSceneIndex + dir));
    updateScene();
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    if(rain.visible) {
        rain.rotation.y += 0.002;
        rain.position.y -= 0.1;
        if(rain.position.y < -5) rain.position.y = 5;
    }
    renderer.render(scene, camera);
}

updateScene();
animate();