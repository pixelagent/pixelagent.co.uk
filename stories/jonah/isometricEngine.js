/**
 * ISOMETRICENGINE.JS
 * Reusable isometric exploration engine. This engine builds worlds dynamically
 * from a tileset and a series of map files.
 * - `data/main_tileset.json` defines the appearance of each tile type.
 * - `data/maps/act*_map.json` defines the grid layout for each scene.
 */

const IsometricEngine = (function () {
    let tileset = null;
    let groundContainer = new THREE.Group(); // For instanced ground meshes
    let occlusionContainer = new THREE.Group(); // For individual occluding meshes
    let currentScene = null;
    let camera, sceneObj, renderer, playerMesh;
    let playerGridPos = { r: 0, c: 0 };
    let cameraOffset = new THREE.Vector3();
    let hotspotMeshes = [];
    let keysDown = {};
    let triggeredHotspots = new Set();
    let currentActId = null;

    async function init(containerEl) {
        const res = await fetch(CONFIG.paths.tileset);
        tileset = await res.json();

        setupRenderer(containerEl);
        setupCamera();
        setupInput();
        animate();
    }

    function setupRenderer(containerEl) {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
        containerEl.appendChild(renderer.domElement);

        if (typeof PostProduction !== 'undefined') {
            // sceneObj/camera not ready yet — PostProduction.init() is called
            // again inside loadScene() once both exist.
        }

        window.addEventListener('resize', () => {
            const w = containerEl.clientWidth, h = containerEl.clientHeight;
            renderer.setSize(w, h);
            if (camera) {
                const aspect = w / h;
                const s = CONFIG.isometric.camera.frustumSize;
                camera.left = -s * aspect / 2;
                camera.right = s * aspect / 2;
                camera.top = s / 2;
                camera.bottom = -s / 2;
                camera.updateProjectionMatrix();
            }
            if (typeof PostProduction !== 'undefined') PostProduction.onResize(w, h);
        });
    }

    function setupCamera() {
        const aspect = renderer.domElement.width / renderer.domElement.height;
        const s = CONFIG.isometric.camera.frustumSize;
        camera = new THREE.OrthographicCamera(-s * aspect / 2, s * aspect / 2, s / 2, -s / 2, 0.1, 1000);

        // True isometric angle: rotate around Y, then tilt down.
        const rot = THREE.MathUtils.degToRad(CONFIG.isometric.camera.rotationDeg);
        const tilt = THREE.MathUtils.degToRad(CONFIG.isometric.camera.angleDeg);
        const dist = 20;
        camera.position.set(
            dist * Math.sin(rot) * Math.cos(tilt),
            dist * Math.sin(tilt),
            dist * Math.cos(rot) * Math.cos(tilt)
        );
        camera.lookAt(0, 0, 0);
        cameraOffset.copy(camera.position);
    }

    function setupInput() {
        window.addEventListener('keydown', (e) => { keysDown[e.key.toLowerCase()] = true; });
        window.addEventListener('keyup', (e) => { keysDown[e.key.toLowerCase()] = false; });
    }

    async function loadScene(sceneId) {
        const loaderEl = document.getElementById('iso-loader');
        if (loaderEl) loaderEl.classList.remove('hidden');

        sceneObj = new THREE.Scene(); // Create a fresh scene
        sceneObj.add(groundContainer);
        sceneObj.add(occlusionContainer);
        hotspotMeshes = [];
        triggeredHotspots.clear();

        // Extract act ID from sceneId (e.g., "act1" from "act1_ship")
        const actId = sceneId.split('_')[0];
        currentActId = actId;

        const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
        sceneObj.add(light);

        // The sceneId from storyEngine is like "act1_ship". We need "act1_ship_map".
        const mapFileName = `${sceneId}_map`;
        const mapPath = `${CONFIG.paths.maps}${mapFileName}.json`;

        try {
            const res = await fetch(mapPath);
            if (!res.ok) throw new Error(`Map not found: ${mapPath}`);
            const mapData = await res.json();
            currentScene = mapData; // Store map data as the current scene context
            buildWorldFromMap(mapData);

            // TODO: Hotspots and player spawn need to be defined in map data
            spawnPlayer();
            spawnHotspots();

            if (typeof PostProduction !== 'undefined') {
                PostProduction.init(renderer, sceneObj, camera);
                // The palette is now on the storyEngine's scene, not the iso scene
                const storyScene = StoryEngine.getCurrentScene();
                PostProduction.applyPaletteProfile(storyScene.palette);
            }
        } catch (err) {
            console.error(`Failed to load or build scene: ${sceneId}`, err);
            if (loaderEl) loaderEl.innerText = 'Error loading world.';
            // Clear containers on failure
            while (groundContainer.children.length) {
                groundContainer.remove(groundContainer.children[0]);
            }
            while (occlusionContainer.children.length) {
                occlusionContainer.remove(occlusionContainer.children[0]);
            }
        } finally {
            if (loaderEl && !loaderEl.innerText.includes('Error')) loaderEl.classList.add('hidden');
        }
    }

    function buildWorldFromMap(mapData) {
        // Clear previous world containers
        while (groundContainer.children.length) {
            groundContainer.remove(groundContainer.children[0]);
        }
        while (occlusionContainer.children.length) {
            occlusionContainer.remove(occlusionContainer.children[0]);
        }

        const tileGeo = new THREE.BoxGeometry(tileset.tile_size.width, 1, tileset.tile_size.depth);
        const dummy = new THREE.Object3D(); // Dummy object for matrix updates

        // Group ground tiles by material for instancing
        const groundTilesByMaterial = {};

        for (let r = 0; r < mapData.size.height; r++) {
            for (let c = 0; c < mapData.size.width; c++) {
                const tileId = mapData.tiles[r][c];
                if (tileId === 0) continue; // Skip empty tiles

                const tileDef = tileset.tile_definitions[tileId];
                if (!tileDef) continue;

                const x = (c - mapData.size.width / 2) * tileset.tile_size.width;
                const z = (r - mapData.size.height / 2) * tileset.tile_size.depth;
                const y = tileDef.height;

                if (tileDef.isOccluding) {
                    // Create individual mesh for sorting
                    const material = createMaterialFromDefinition(tileDef.material);
                    const mesh = new THREE.Mesh(tileGeo, material);
                    mesh.position.set(x, y, z);
                    mesh.userData.gridPos = { r, c };
                    occlusionContainer.add(mesh);
                } else {
                    // Group for instancing
                    if (!groundTilesByMaterial[tileId]) {
                        groundTilesByMaterial[tileId] = [];
                    }
                    groundTilesByMaterial[tileId].push({ x, y, z });
                }
            }
        }

        // Create an InstancedMesh for each ground tile type
        for (const tileId in groundTilesByMaterial) {
            const tileDef = tileset.tile_definitions[tileId];
            const instances = groundTilesByMaterial[tileId];
            const material = createMaterialFromDefinition(tileDef.material);
            const mesh = new THREE.InstancedMesh(tileGeo, material, instances.length);

            for (let i = 0; i < instances.length; i++) {
                const { x, y, z } = instances[i];
                dummy.position.set(x, y, z);
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }
            groundContainer.add(mesh);
        }
    }

    function spawnPlayer() {
        if (!currentScene.spawn) return; // No spawn point defined
        
        // The visible cone mesh
        const geo = new THREE.ConeGeometry(0.3, 0.8, 8);
        const mat = new THREE.MeshStandardMaterial({ color: 0xf1c40f });
        const coneMesh = new THREE.Mesh(geo, mat);
        coneMesh.rotation.x = Math.PI / 2; // Point the cone forward (along parent's Z)

        // A group to act as the main player object for position and rotation
        playerMesh = new THREE.Group();
        playerMesh.add(coneMesh);

        const { x, y, z } = currentScene.spawn; // Assumes spawn is in world coords
        playerMesh.position.set(x, y + 0.4, z);
        playerMesh.renderOrder = 1; // Ensure player is part of the sorting context
        sceneObj.add(playerMesh);
    }

    function spawnHotspots() {
        (currentScene.hotspots || []).forEach(h => {
            const geo = new THREE.SphereGeometry(0.25, 12, 12);
            const mat = new THREE.MeshBasicMaterial({ color: 0x5dade2, transparent: true, opacity: 0.8 });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(h.position.x, h.position.y + 0.5, h.position.z);
            mesh.userData.hotspot = h;
            mesh.userData.triggered = false;
            sceneObj.add(mesh);
            hotspotMeshes.push(mesh);

            // gentle bob via anime.js so hotspots read as interactive
            anime({
                targets: mesh.position,
                y: [h.position.y + 0.5, h.position.y + 0.75],
                duration: 1200,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        });
    }

    function createMaterialFromDefinition(matDef) {
        const material = new THREE.MeshStandardMaterial({
            roughness: 0.6,
            metalness: 0.1,
        });

        // This is the magic part: we patch the material's shader
        // just like in the isometric-cube8.html tool.
        material.onBeforeCompile = (shader) => {
            shader.uniforms.baseColor = { value: new THREE.Color(matDef.baseColor) };
            shader.uniforms.colorA = { value: new THREE.Color(matDef.colorA) };
            shader.uniforms.colorB = { value: new THREE.Color(matDef.colorB) };
            shader.uniforms.splitY = { value: matDef.splitY };
            shader.uniforms.materialMode = { value: matDef.materialMode };
            shader.uniforms.tMode = { value: matDef.tMode };
            shader.uniforms.tInkMode = { value: matDef.tInkMode };
            shader.uniforms.tInkColor = { value: new THREE.Color(matDef.tInkColor) };
            shader.uniforms.tSpace = { value: matDef.tSpace };
            shader.uniforms.tThick = { value: matDef.tThick };
            shader.uniforms.tBright = { value: matDef.tBright };
            shader.uniforms.tAlpha = { value: matDef.tAlpha };
            shader.uniforms.bMode = { value: matDef.bMode };
            shader.uniforms.bInkMode = { value: matDef.bInkMode };
            shader.uniforms.bInkColor = { value: new THREE.Color(matDef.bInkColor) };
            shader.uniforms.bSpace = { value: matDef.bSpace };
            shader.uniforms.bThick = { value: matDef.bThick };
            shader.uniforms.bBright = { value: matDef.bBright };
            shader.uniforms.bAlpha = { value: matDef.bAlpha };

            // Inject vertex shader varyings
            shader.vertexShader = `varying float vLocalY; varying vec2 myUv;\n` + shader.vertexShader.replace(`#include <begin_vertex>`, `#include <begin_vertex>\nvLocalY=position.y;\nmyUv=uv;`);

            // Inject uniform declarations into the fragment shader
            const uniformDeclarations = `
                uniform vec3 baseColor; uniform vec3 colorA; uniform vec3 colorB; uniform float splitY; uniform int materialMode;
                uniform int tMode; uniform int tInkMode; uniform vec3 tInkColor; uniform float tSpace; uniform float tThick; uniform float tBright; uniform float tAlpha;
                uniform int bMode; uniform int bInkMode; uniform vec3 bInkColor; uniform float bSpace; uniform float bThick; uniform float bBright; uniform float bAlpha;
            `;

            // Inject fragment shader logic (simplified from the tool)
            const fs = document.getElementById('tile-shader-logic').textContent;
            shader.fragmentShader = `varying float vLocalY; varying vec2 myUv;\n${uniformDeclarations}` + shader.fragmentShader.replace(`vec4 diffuseColor = vec4( diffuse, opacity );`, fs);
        };

        return material;
    }


    function updateMovement(deltaSeconds) {
        if (!playerMesh) return;
        const speed = CONFIG.isometric.movement.speed * deltaSeconds;
        let dx = 0, dz = 0;
        const nextPos = playerMesh.position.clone();

        if (keysDown['w'] || keysDown['arrowup']) dz -= 1;
        if (keysDown['s'] || keysDown['arrowdown']) dz += 1;
        if (keysDown['a'] || keysDown['arrowleft']) dx -= 1;
        if (keysDown['d'] || keysDown['arrowright']) dx += 1;

        if (dx === 0 && dz === 0) return;

        const len = Math.hypot(dx, dz);
        const moveDirection = new THREE.Vector3(dx / len, 0, dz / len);

        // --- Player Rotation ---
        const targetQuaternion = new THREE.Quaternion();
        const lookAtPosition = playerMesh.position.clone().add(moveDirection);
        playerMesh.lookAt(lookAtPosition);

        nextPos.x += (dx / len) * speed;
        nextPos.z += (dz / len) * speed;

        // --- Collision Detection ---
        const halfW = currentScene.size.width / 2;
        const halfH = currentScene.size.height / 2;
        const targetC = Math.floor(nextPos.x + halfW);
        const targetR = Math.floor(nextPos.z + halfH);

        playerGridPos = { r: targetR, c: targetC }; // Update player's grid position

        if (currentScene.colliders && currentScene.colliders[targetR] && currentScene.colliders[targetR][targetC] !== undefined) {
            const colliderType = currentScene.colliders[targetR][targetC];
            if (colliderType === 1) { // Full tile collider
                return; // Block movement
            }
            // TODO: Implement edge-based colliders (types 2-5)
        }

        playerMesh.position.copy(nextPos);
        checkHotspots();
    }

    function updateRenderOrder() {
        if (!playerMesh) return;

        // The player's "depth" is determined by its grid row.
        // Higher row number means closer to the camera.
        const playerDepth = playerGridPos.r;

        // Set render order for occluding objects based on their row.
        // Objects in the same row or behind the player are drawn first (lower renderOrder).
        // Objects in front of the player are drawn last (higher renderOrder).
        occlusionContainer.children.forEach(child => {
            const childDepth = child.userData.gridPos.r;
            child.renderOrder = childDepth > playerDepth ? 2 : 0;
        });

        checkHotspots();
    }

    function updateCamera(deltaSeconds) {
        if (!playerMesh || !camera) return;

        // Calculate the target position for the camera
        const targetPosition = playerMesh.position.clone().add(cameraOffset);

        // Smoothly interpolate the camera's position (LERP)
        camera.position.lerp(targetPosition, CONFIG.isometric.camera.followSpeed * deltaSeconds);
    }

    function checkHotspots() {
        if (!playerMesh) return;
        hotspotMeshes.forEach(mesh => {
            const h = mesh.userData.hotspot;
            if (mesh.userData.triggered && h.triggerOnce) return;

            const dist = playerMesh.position.distanceTo(mesh.position);
            if (dist <= CONFIG.isometric.movement.hotspotRadius) {
                triggerHotspot(mesh, h);
            }
        });
    }

    function triggerHotspot(mesh, hotspot) {
        mesh.userData.triggered = true;
        triggeredHotspots.add(hotspot.id);

        if (hotspot.choiceHotspot) {
            renderChoicePrompt(hotspot);
            checkActCompletion();
            return;
        }

        if (hotspot.requiresHold) {
            invokeBeat(hotspot, [CONFIG.beats.act2.prayerFullHoldMs]);
            checkActCompletion();
            return;
        }

        invokeBeat(hotspot, hotspot.beatArgs || []);
        checkActCompletion();
    }

    function checkActCompletion() {
        if (!currentScene || !currentScene.hotspots) return;

        const totalRequired = currentScene.hotspots.filter(h => h.triggerOnce).length;
        const triggeredCount = currentScene.hotspots.filter(h => triggeredHotspots.has(h.id)).length;

        if (triggeredCount >= totalRequired && totalRequired > 0) {
            window.dispatchEvent(new CustomEvent('isometric:actComplete', {
                detail: {
                    actId: currentActId,
                    sceneId: currentScene.id
                }
            }));
        }
    }

    function invokeBeat(hotspot, extraArgs) {
        const module = window[hotspot.beatModule];
        if (module && typeof module[hotspot.beatFunction] === 'function') {
            module[hotspot.beatFunction](...extraArgs);
        } else {
            console.warn(`Beat not found: ${hotspot.beatModule}.${hotspot.beatFunction}`);
        }
    }

    function renderChoicePrompt(hotspot) {
        // Hook point for UI: dispatch a custom event so storyEngine/UI code
        // can render the actual choice buttons without this engine knowing
        // about DOM structure.
        window.dispatchEvent(new CustomEvent('isometric:choice', {
            detail: {
                hotspotId: hotspot.id,
                choices: hotspot.choices,
                onChoose: (choiceIndex) => invokeBeat(hotspot, [choiceIndex])
            }
        }));
    }

    let lastTime = performance.now();
    function animate() {
        requestAnimationFrame(animate);
        const now = performance.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        updateMovement(delta);
        updateRenderOrder();
        updateCamera(delta);

        if (typeof PostProduction !== 'undefined' && currentScene) {
            PostProduction.render();
        } else if (sceneObj && camera) {
            renderer.render(sceneObj, camera);
        }
    }

    function goToScene(sceneId) {
        loadScene(sceneId);
    }

    return { init, goToScene, getCurrentScene: () => currentScene };
})();
