window.initScene3 = function(group) {
    function box(w, h, d, mat, px, py, pz, rx=0, ry=0, rz=0) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(px, py, pz); m.rotation.set(rx, ry, rz); return m;
    }
    function mat(color, opacity=1) { 
        return new THREE.MeshPhongMaterial({ 
            color: color, flatShading: true, 
            transparent: opacity < 1, opacity: opacity 
        }); 
    }

    const M = {
        wood: mat(0x4a2e0e),
        plank: mat(0x5c3a1a),
        water: mat(0x0a2a4a, 0.85) // Transparent deep blue
    };

    // Store target opacities for fade-in
    const targetOpacities = {
        wood: 1,
        plank: 1,
        water: 0.85
    };

    // 1. The Ark
    const ark = new THREE.Group();
    ark.add(box(24, 4.5, 5.5, M.plank, 0, 2.25, 0)); 
    ark.add(box(16, 2.8, 4.0, M.wood, 0, 5.9, 0)); 
    group.add(ark);

    // 2. High-Resolution Water Plane for Waves
    const waterGeo = new THREE.PlaneGeometry(80, 80, 24, 24);
    const water = new THREE.Mesh(waterGeo, M.water);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 1.5;
    group.add(water);

    // Store original Z positions for wave math
    const initialZ = [];
    const pos = waterGeo.attributes.position;
    for(let i = 0; i < pos.count; i++) initialZ.push(pos.getZ(i));

    // 3. THE STORM (Rain Particles)
    const RAIN_COUNT = 6000;
    const rainGeo = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(RAIN_COUNT * 3);

    for (let i = 0; i < RAIN_COUNT * 3; i += 3) {
        rainPositions[i]     = (Math.random() - 0.5) * 60; // X spread
        rainPositions[i + 1] = Math.random() * 40;         // Y height
        rainPositions[i + 2] = (Math.random() - 0.5) * 60; // Z spread
    }

    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
        color: 0x88aaff,
        size: 0.15,
        transparent: true,
        opacity: 0.6
    });
    
    const rain = new THREE.Points(rainGeo, rainMat);
    group.add(rain);

    // Store target opacity for rain
    const rainTargetOpacity = 0.6;

    // Lightning light (starts dark/hidden)
    const lightning = new THREE.PointLight(0xccddff, 0, 100);
    lightning.position.set(0, 20, -10);
    group.add(lightning);

    // Fade-in and rotation animation
    const startTime = Date.now();
    const fadeDuration = 3000; // 3 seconds

    // 4. Local Animation Loop
    const t0 = Date.now();
    function animateStorm() {
        requestAnimationFrame(animateStorm);
        if (!group.visible) return; // Pause heavy math if scrolled away!
        
        const t = (Date.now() - t0) * 0.002;
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        const easeInProgress = progress * progress; // Quadratic ease-in
        
        // Apply fade-in to materials
        M.wood.opacity = targetOpacities.wood * easeInProgress;
        M.plank.opacity = targetOpacities.plank * easeInProgress;
        M.water.opacity = targetOpacities.water * easeInProgress;
        rainMat.opacity = rainTargetOpacity * easeInProgress;

        // Toss the Ark
        ark.position.y = Math.sin(t) * 0.8;
        ark.rotation.z = Math.sin(t * 1.3) * 0.1; // Roll
        ark.rotation.x = Math.sin(t * 0.9) * 0.05; // Pitch

        // Ripple the water vertices
        for(let i = 0; i < pos.count; i++) {
            const vx = pos.getX(i);
            const vy = pos.getY(i);
            pos.setZ(i, initialZ[i] + Math.sin(t * 2 + vx * 0.3 + vy * 0.4) * 0.5);
        }
        pos.needsUpdate = true;

        // Animate Rain
        const rainPosAttr = rainGeo.attributes.position;
        const positions = rainPosAttr.array;
        
        for (let i = 0; i < RAIN_COUNT * 3; i += 3) {
            positions[i]     += 0.05;  // Wind blowing right
            positions[i + 1] -= 0.8;   // Gravity falling down
            
            // If droplet hits the water, reset it back up to the sky
            if (positions[i + 1] < 1.5) {
                positions[i]     = (Math.random() - 0.5) * 60;
                positions[i + 1] = 30 + Math.random() * 10;
            }
        }
        rainPosAttr.needsUpdate = true;

        // Occasional Lightning Flashes
        if (Math.random() > 0.98) {
            lightning.intensity = 5 + Math.random() * 10;
            lightning.position.set((Math.random() - 0.5) * 40, 20 + Math.random() * 10, (Math.random() - 0.5) * 40);
        } else {
            // Fade out lightning
            lightning.intensity = Math.max(0, lightning.intensity - 0.5);
        }
    }
    
    // Start the loop
    animateStorm();
    
    // Add slow rotation to the group (outside animateStorm to avoid conflicts)
    function rotateGroup() {
        requestAnimationFrame(rotateGroup);
        if (!group.visible) return;
        group.rotation.y = Date.now() * 0.0005; // Slow rotation
    }
    rotateGroup();
};