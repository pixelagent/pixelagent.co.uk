import * as THREE from 'three';

// Helper to get CSS variables
const getCssVar = (name) => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    // Ensure the value is a valid hex string before parsing
    const hexMatch = val.match(/^#?([0-9a-fA-F]{6})$/);
    if (hexMatch) {
        return parseInt(hexMatch[1], 16);
    }
    // Fallback for non-hex values or errors, e.g., return black
    return 0x000000;
};

// Palette (ensure these CSS variables are defined in your main CSS)
const PALETTE = {
    white: getCssVar('--white'),
    black: getCssVar('--black'),
    pureRed: getCssVar('--pure-red'),
    blueSlate: getCssVar('--blue-slate'),
    platinum: getCssVar('--platinum'),
    inkBlack: getCssVar('--ink-black'),
    royalGold: getCssVar('--royal-gold'),
    blueBell: getCssVar('--blue-bell'),
    cyan: getCssVar('--cyan'),
    darkSpruce: getCssVar('--dark-spruce'),
    tropicalMint: getCssVar('--tropical-mint')
};

// --- 3D Globe Scene Setup ---
let scene, camera, renderer, ambientLight, sunLight, globe;
let shockwaveLocations = [];
let smokeGroup, smokeClouds = [];
let floraGroup;
let clock = new THREE.Clock();

// --- Globe Waypoints and Camera Interpolation ---
let cameraWaypoints = [];
let numSections = 0;

export function initGlobeEffects(containerId, sectionsCount, waypoints) {
    numSections = sectionsCount;
    cameraWaypoints = waypoints;

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(PALETTE.black, 0.05);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 14);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    ambientLight = new THREE.AmbientLight(PALETTE.blueSlate, 0.4);
    scene.add(ambientLight);

    sunLight = new THREE.DirectionalLight(PALETTE.royalGold, 1.2);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const globeRadius = 4.5;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
        color: PALETTE.darkSpruce,
        emissive: PALETTE.darkSpruce,
        emissiveIntensity: 0.15,
        roughness: 0.7,
        metalness: 0.1
    });
    globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.receiveShadow = true;
    scene.add(globe);

    // --- World Coastlines ---
    function latLonToVector3(lat, lon, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));
        return new THREE.Vector3(x, y, z);
    }

    fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
        .then(res => res.json())
        .then(geoJson => {
            const lineMaterial = new THREE.LineBasicMaterial({ color: PALETTE.blueBell, transparent: true, opacity: 0.6 });
            geoJson.features.forEach(feature => {
                const polygons = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
                polygons.forEach(polygon => {
                    polygon.forEach(ring => {
                        const points = ring.map(coord => latLonToVector3(coord[1], coord[0], globeRadius * 1.005));
                        const geometry = new THREE.BufferGeometry().setFromPoints(points);
                        const line = new THREE.Line(geometry, lineMaterial);
                        globe.add(line);
                    });
                });
            });
        });

    // --- Shockwave Locations ---
    const locationGroup = new THREE.Group();
    globe.add(locationGroup);

    const locationCoords = [
        { phi: 1.2, theta: 0.5, color: PALETTE.pureRed, innerR: 0.06, outerR: 0.14, coreRadius: 0.12, maxScale: 12, speed: 0.9 },
        { phi: 2.1, theta: 2.2, color: PALETTE.royalGold, innerR: 0.03, outerR: 0.07, coreRadius: 0.06, maxScale: 6, speed: 0.5 },
        { phi: 0.8, theta: 4.1, color: PALETTE.cyan, innerR: 0.08, outerR: 0.18, coreRadius: 0.15, maxScale: 15, speed: 1.1 },
        { phi: 1.8, theta: 5.2, color: PALETTE.tropicalMint, innerR: 0.04, outerR: 0.09, coreRadius: 0.07, maxScale: 8, speed: 0.6 },
        { phi: 2.5, theta: 1.1, color: PALETTE.blueBell, innerR: 0.05, outerR: 0.11, coreRadius: 0.09, maxScale: 10, speed: 0.8 }
    ];

    locationCoords.forEach(loc => {
        const pos = new THREE.Vector3().setFromSphericalCoords(globeRadius + 0.02, loc.phi, loc.theta);
        const targetGroup = new THREE.Group();
        targetGroup.position.copy(pos);
        targetGroup.lookAt(pos.clone().multiplyScalar(2));

        const coreGeo = new THREE.SphereGeometry(loc.coreRadius, 16, 16);
        const coreMat = new THREE.MeshBasicMaterial({ color: loc.color });
        const core = new THREE.Mesh(coreGeo, coreMat);
        targetGroup.add(core);

        const ringGeo = new THREE.RingGeometry(loc.innerR, loc.outerR, 32);
        const rings = [];
        for (let r = 0; r < 3; r++) {
            const ringMat = new THREE.MeshBasicMaterial({
                color: loc.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.9,
                depthWrite: false
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            targetGroup.add(ring);
            rings.push({ mesh: ring, delay: r * 0.33 });
        }

        locationGroup.add(targetGroup);
        shockwaveLocations.push({ rings, speed: loc.speed, maxScale: loc.maxScale });
    });

    // --- Procedural Smoke Clouds ---
    function createSmokeTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, '#01f8bb');
        gradient.addColorStop(0.4, '#356176');
        gradient.addColorStop(1, 'rgba(1, 2, 5, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(canvas);
    }

    const smokeTexture = createSmokeTexture();
    smokeGroup = new THREE.Group();
    scene.add(smokeGroup);

    const smokeCount = 60;
    const smokeGeo = new THREE.PlaneGeometry(6.0, 6.0);
    const smokeMat = new THREE.MeshBasicMaterial({
        map: smokeTexture,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < smokeCount; i++) {
        const cloud = new THREE.Mesh(smokeGeo, smokeMat);
        const phi = Math.acos(-1 + (2 * i) / smokeCount);
        const theta = Math.sqrt(smokeCount * Math.PI) * phi;
        const dist = globeRadius + 0.5 + Math.random() * 2.5;

        cloud.position.set(
            dist * Math.sin(phi) * Math.cos(theta),
            dist * Math.sin(phi) * Math.sin(theta),
            dist * Math.cos(phi)
        );

        cloud.rotation.z = Math.random() * Math.PI * 2;
        smokeGroup.add(cloud);
        smokeClouds.push({
            mesh: cloud,
            rotSpeed: (Math.random() - 0.5) * 0.18
        });
    }

    // --- Low-Poly Flora ---
    floraGroup = new THREE.Group();
    globe.add(floraGroup);

    const treeGeo = new THREE.ConeGeometry(0.25, 0.7, 5);
    const trunkGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 4);
    const bushGeo = new THREE.DodecahedronGeometry(0.18, 1);
    const flowerGeo = new THREE.SphereGeometry(0.08, 4, 4);

    const treeMat = new THREE.MeshBasicMaterial({ color: PALETTE.tropicalMint });
    const trunkMat = new THREE.MeshBasicMaterial({ color: PALETTE.inkBlack });
    const bushMat = new THREE.MeshBasicMaterial({ color: PALETTE.blueSlate });
    const flowerMats = [
        new THREE.MeshBasicMaterial({ color: PALETTE.pureRed }),
        new THREE.MeshBasicMaterial({ color: PALETTE.royalGold }),
        new THREE.MeshBasicMaterial({ color: PALETTE.cyan })
    ];

    const floraCount = 180;
    for (let i = 0; i < floraCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / floraCount);
        const theta = Math.sqrt(floraCount * Math.PI) * phi;

        const x = globeRadius * Math.sin(phi) * Math.cos(theta);
        const y = globeRadius * Math.sin(phi) * Math.sin(theta);
        const z = globeRadius * Math.cos(phi);

        const elementGroup = new THREE.Group();
        elementGroup.position.set(x, y, z);
        elementGroup.lookAt(0, 0, 0);
        elementGroup.rotateX(Math.PI / 2);

        const rType = Math.random();
        if (rType < 0.45) {
            const trunk = new THREE.Mesh(trunkGeo, trunkMat);
            trunk.position.y = 0.15;
            const foliage = new THREE.Mesh(treeGeo, treeMat);
            foliage.position.y = 0.5;
            elementGroup.add(trunk, foliage);
        } else if (rType < 0.8) {
            const bush = new THREE.Mesh(bushGeo, bushMat);
            bush.position.y = 0.12;
            elementGroup.add(bush);
        } else {
            const flower = new THREE.Mesh(flowerGeo, flowerMats[Math.floor(Math.random() * flowerMats.length)]);
            flower.position.y = 0.08;
            elementGroup.add(flower);
        }
        floraGroup.add(elementGroup);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- Camera Waypoint Interpolation Function ---
function lerpCameraWaypoints(scrollProgress) {
    if (cameraWaypoints.length === 0) {
        return { targetAngle: 0, targetY: 0 };
    }

    let a = cameraWaypoints[0];
    let b = cameraWaypoints[cameraWaypoints.length - 1];

    for (let i = 0; i < cameraWaypoints.length - 1; i++) {
        if (scrollProgress >= cameraWaypoints[i].scrollProgress && scrollProgress <= cameraWaypoints[i + 1].scrollProgress) {
            a = cameraWaypoints[i];
            b = cameraWaypoints[i + 1];
            break;
        }
    }

    const span = b.scrollProgress - a.scrollProgress;
    const localProgress = span === 0 ? 0 : (scrollProgress - a.scrollProgress) / span;
    const easedProgress = localProgress < 0.5 ? 2 * localProgress * localProgress : -1 + (4 - 2 * localProgress) * localProgress; // Ease-in-out

    return {
        targetAngle: a.targetAngle + (b.targetAngle - a.targetAngle) * easedProgress,
        targetY: a.targetY + (b.targetY - a.targetY) * easedProgress,
    };
}

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Scroll Tracking
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;

    // Update active section for text cards
    const sections = document.querySelectorAll('.scroll-section');
    const activeIndex = Math.min(sections.length - 1, Math.floor(scrollProgress * numSections + 0.2));
    sections.forEach((sec, idx) => {
        if (idx === activeIndex) sec.classList.add('active');
        else sec.classList.remove('active');
    });

    // Interpolate camera position based on scrollProgress and waypoints
    const interpolatedWaypoint = lerpCameraWaypoints(scrollProgress);
    const targetCamAngle = interpolatedWaypoint.targetAngle;
    const targetCamY = interpolatedWaypoint.targetY;

    const camDist = 13 - Math.sin(scrollProgress * Math.PI) * 3; // Keep original camDist logic for zoom effect

    const targetCamX = Math.cos(targetCamAngle) * camDist;
    const targetCamZ = Math.sin(targetCamAngle) * camDist;
    // targetCamY is now directly from waypoint interpolation

    camera.position.x += (targetCamX - camera.position.x) * 0.05;
    camera.position.z += (targetCamZ - camera.position.z) * 0.05;
    camera.position.y += (targetCamY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    globe.rotation.y += 0.0015; // Subtle auto-spin

    shockwaveLocations.forEach(loc => { // Shockwave animation
        loc.rings.forEach(r => {
            let progress = ((time * loc.speed + r.delay) % 1);
            r.mesh.scale.setScalar(1 + progress * loc.maxScale);
            r.mesh.material.opacity = (1 - progress) * 0.9;
        });
    });

    smokeGroup.rotation.y = time * 0.012; // Smoke rotation
    smokeClouds.forEach(c => {
        c.mesh.rotation.z += c.rotSpeed * delta;
        c.mesh.lookAt(camera.position);
    });

    const sunAngle = time * 0.1 + sectionScrollProgress * Math.PI * 2; // Sun/moon cycle based on section scroll
    sunLight.position.set(Math.cos(sunAngle) * 20, 8, Math.sin(sunAngle) * 20);

    const lightVal = (Math.sin(sunAngle) + 1) / 2;
    const nightBg = new THREE.Color(PALETTE.black);
    const dayBg = new THREE.Color(PALETTE.inkBlack);
    scene.background = nightBg.clone().lerp(dayBg, lightVal);
    scene.fog.color = scene.background;

    renderer.render(scene, camera);
}