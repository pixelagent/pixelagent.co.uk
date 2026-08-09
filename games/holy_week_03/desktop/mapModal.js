// mapModal.js
import * as THREE from 'three';
import { MODELS } from '../js/config.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class OrbitalSelectMatrixModal {
    constructor(caseManager, locationSystem, audio, loadCaseCallback, globeScale = 11) {
        this.cm = caseManager;
        this.ls = locationSystem;
        this.audio = audio;
        this.loadCase = loadCaseCallback;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.core = null;
        this.overlay = document.getElementById('modal-overlay');
        this.wrapper = document.getElementById('modal-canvas-wrap');
        this.theta = 0;
        this.phi = Math.PI / 3;
        this.dragging = false;
        this.prev = { x: 0, y: 0 };
        this.treeEl = null;
        this.activeAct = null;
        this.actGroups = {};
        this.markers = [];
        this.labels = [];
        this.globeScale = globeScale;

        this.init();
        this.bind();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x05070b);

        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.wrapper.appendChild(this.renderer.domElement);
        // yellow 
        const sun = new THREE.DirectionalLight(0xffff00, 0.2);
        sun.position.set(5, 3, 5);
        this.scene.add(sun);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));

        this.scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.4));

        // Initialize core group (this will hold the earth and markers)
        this.core = new THREE.Group();
        this.scene.add(this.core);

        // Load Earth Model
        const loader = new GLTFLoader();
        loader.load(MODELS.planet, (gltf) => {
            const model = gltf.scene;

            // Auto-scale normalization to ensure earth is solid and visible
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = this.globeScale / maxDim;
            model.scale.set(scale, scale, scale);

            // Sync material properties with in-game engine to ensure correct color and reduced reflections
            model.traverse((node) => {
                if (node.isMesh && node.material) {
                    const materials = Array.isArray(node.material) ? node.material : [node.material];
                    materials.forEach(mat => {
                        if (mat.color) {
                            mat.color.set(0xffd700);
                        }
                        mat.roughness = 0.9;
                        mat.metalness = 0.0;
                    });
                }
            });

            // Ensure the city layer is visible for the map modal
            const cityLayer = model.getObjectByName('cities');
            if (cityLayer) {
                cityLayer.visible = true;
            }

            this.core.add(model);
        }, undefined, (error) => {
            console.error("Error loading earth.glb, falling back to wireframe.", error);
            const fallback = new THREE.Mesh(
                new THREE.SphereGeometry(6.5, 32, 32),
                new THREE.MeshStandardMaterial({ color: 0x00a884, wireframe: true, transparent: true, opacity: 0.2 })
            );
            this.core.add(fallback);
        });

        // Group cases by act
        this.cm.getAllCases().forEach(c => {
            const act = c.actLabel || 'Act I - The Triumphal Entry';
            if (!this.actGroups[act]) this.actGroups[act] = [];
            this.actGroups[act].push(c);
        });

        this.renderActTree();
    }

    _renderMarkerForCase(c, index, total) {
        // Distribute markers somewhat realistically around the sphere
        // This logic can be refined for more precise geographical placement if needed.
        const p = (index / total) * Math.PI * 2; // Angle around the equator
        const t = (index % 2 === 0 ? 0.3 : -0.3) + Math.PI / 2; // Angle from the pole (latitude-like)

        // Create the 3D marker (sphere)
        const marker = new THREE.Mesh(
            new THREE.SphereGeometry(0.45, 16, 16),
            new THREE.MeshStandardMaterial({
                color: c.color || 0x00ffaa,
                emissive: c.color,
                emissiveIntensity: 2.0
            })
        );
        marker.position.setFromSphericalCoords(7.2, t, p); // Position on the globe
        marker.userData.caseId = c.id; // Store caseId for raycasting

        this.core.add(marker);
        this.markers.push(marker);

        // --- Create HTML Label and Dot ---
        const dot = document.createElement('div');
        dot.className = 'map-node-dot';
        dot.classList.add('pulse');
        dot.style.backgroundColor = c.color ? `#${c.color.toString(16).padStart(6, '0')}` : '#60a5fa';
        dot.style.left = '0';
        dot.style.top = '0';

        const locked = c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved);
        if (locked) {
            dot.classList.add('locked');
            dot.innerHTML = '<i class="fa-solid fa-lock" style="font-size: 8px; display: block;"></i>';
            dot.style.display = 'flex';
            dot.style.alignItems = 'center';
            dot.style.justifyContent = 'center';
        }

        const label = document.createElement('div');
        label.className = 'map-node-label';
        label.style.left = '0';
        label.style.top = '0';

        // Lookup location metadata from the system for a cleaner display name
        const loc = this.ls ? this.ls.getLocation(c.location) : null;

        label.innerHTML = `
            <div class="map-node-loc">${loc.name}</div>
            <div class="map-node-title">${c.title}</div>
        `;

        this.wrapper.appendChild(dot); // Add HTML dot to the wrapper
        this.wrapper.appendChild(label); // Add HTML label to the wrapper
        this.labels.push({ dot, label, marker }); // Store references for positioning in loop

        const select = () => {
            this.updateSidebarDetails(c);
        };

        dot.onclick = select; // Make the HTML dot clickable
        marker.callback = select; // Attach callback to 3D marker for raycasting
    }

    renderActTree() {
        // Clear existing tree
        if (this.treeEl) this.treeEl.remove();

        const tree = document.createElement('div');
        tree.id = 'lsm-tree';
        tree.className = 'lsm-tree';
        const panel = this.overlay.querySelector('.modal-panel');
        if (panel) {
            panel.appendChild(tree);
        } else {
            this.overlay.appendChild(tree);
        }
        this.treeEl = tree;

        const hdr = document.createElement('div');
        hdr.className = 'lsm-tree-header';
        hdr.textContent = 'INVESTIGATION ACTS';
        this.treeEl.appendChild(hdr);

        Object.entries(this.actGroups).forEach(([actLabel, cases]) => {
            const actContainer = document.createElement('div');
            actContainer.className = 'act-container';

            const actHeader = document.createElement('div');
            actHeader.className = 'act-tree-header';
            actHeader.dataset.act = actLabel;

            const actIcon = document.createElement('span');
            actIcon.className = 'act-tree-icon';

            const actName = document.createElement('span');
            actName.className = 'act-tree-name';
            actName.textContent = actLabel;

            const actChevron = document.createElement('span');
            actChevron.className = 'act-tree-chevron';
            actChevron.textContent = '▶';

            actHeader.appendChild(actIcon);
            actHeader.appendChild(actName);
            actHeader.appendChild(actChevron);
            actContainer.appendChild(actHeader);

            // Cases list (hidden initially)
            const caseList = document.createElement('div');
            caseList.className = 'act-cases-list';
            caseList.style.display = 'none';

            cases.forEach((c, i) => {
                const progress = this.cm.getCaseProgress(c.id);
                const solved = progress?.solved;
                const locked = c.isLocked || c.requires && !this.cm.getCaseProgress(c.requires)?.solved;

                const item = document.createElement('div');
                item.className = 'tree-item';
                item.dataset.case = c.id;
                if (locked) {
                    item.classList.add('locked');
                } else {
                    item.classList.add('available');
                }

                const dot = document.createElement('div');
                dot.className = `tree-dot ${locked ? 'locked' : solved ? 'solved' : 'available'}`;

                if (locked) {
                    dot.innerHTML = '<i class="fa-solid fa-lock" style="font-size: 5px; display: block;"></i>';
                    dot.style.display = 'flex';
                    dot.style.alignItems = 'center';
                    dot.style.justifyContent = 'center';
                }

                const info = document.createElement('div');
                info.className = 'tree-info';

                const title = document.createElement('div');
                title.className = 'tree-title';
                if (locked) {
                    const lock = document.createElement('i');
                    lock.className = 'fa-solid fa-lock';
                    lock.style.marginRight = '6px';
                    lock.style.color = '#e2b13c';
                    title.appendChild(lock);
                }
                const titleText = document.createElement('span');
                titleText.textContent = c.title;
                title.appendChild(titleText);

                info.appendChild(title);
                item.appendChild(dot);
                item.appendChild(info);

                if (!locked) {
                    item.onclick = () => this.selectCase(c.id);
                }
                caseList.appendChild(item);
            });

            actContainer.appendChild(caseList);
            this.treeEl.appendChild(actContainer);
        });

        // Bind act header clicks
        this.treeEl.querySelectorAll('.act-tree-header').forEach(header => {
            header.onclick = (e) => {
                const act = header.dataset.act;
                const list = header.nextElementSibling;
                const chevron = header.querySelector('.act-tree-chevron');

                if (this.activeAct === act) {
                    this.activeAct = null;
                    list.style.display = 'none';
                    chevron.textContent = '▶';
                } else {
                    this.activeAct = act;
                    list.style.display = 'block';
                    chevron.textContent = '▼';
                    // We no longer call showActCasesOnGlobe(act) here so nodes don't disappear
                }
            };
        });
    }

    hideAllMarkers() {
        this.markers.forEach(m => this.core.remove(m));
        this.labels.forEach(l => {
            if (l.dot.parentNode) l.dot.remove();
            if (l.label.parentNode) l.label.remove();
        });
        this.markers = [];
        this.labels = [];
    }

    showAllCasesOnGlobe() {
        this.hideAllMarkers();
        const allCases = this.cm.getAllCases();
        allCases.forEach((c, index) => {
            const locked = c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved);
            if (!locked) {
                this._renderMarkerForCase(c, index, allCases.length);
            }
        });
    }

    showActCasesOnGlobe(actLabel) {
        this.hideAllMarkers();
        const actCases = this.actGroups[actLabel] || [];
        actCases.forEach((c, index) => {
            const locked = c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved);
            if (!locked) {
                this._renderMarkerForCase(c, index, actCases.length);
            }
        });
    }

    updateSidebarDetails(c) {
        const title = document.getElementById('map-node-title');
        const emoji = document.getElementById('map-node-emoji');
        const desc = document.getElementById('map-node-description');
        const loc = document.getElementById('map-node-location');
        const actDesc = document.getElementById('map-act-description');
        const actionContainer = document.getElementById('map-node-action-container');
        const loadBtn = document.getElementById('btn-load-node-scene');

        if (title) title.textContent = c.title;
        if (emoji) emoji.innerHTML = c.emoji || "<img src='../assets/gfx/map-pin-duotone.svg' class='icon-svg' loading='lazy' /> </div>";

        if (desc) desc.textContent = c.description || 'No detailed intel available for this sector.';
        if (loc) loc.textContent = c.location || 'Unknown Coordinates';
        if (actDesc) actDesc.textContent = `ACT_OBJECTIVE: ${c.actLabel || 'Phase I'} - investigation parameters synchronized.`;

        if (actionContainer && loadBtn) {
            const locked = c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved);
            if (!locked) {
                actionContainer.style.display = 'block';
                loadBtn.onclick = () => {
                    if (this.audio) this.audio.playUI();
                    this.selectCase(c.id);
                };
            } else {
                actionContainer.style.display = 'none';
            }
        }
    }

    updateResolvedArchives() {
        const list = document.getElementById('completed-cases-list');
        if (!list) return;

        const solved = this.cm.getAllCases().filter(c => this.cm.getCaseProgress(c.id)?.solved);
        if (solved.length === 0) {
            list.innerHTML = `<span style="opacity: 0.4; font-style: italic;">NO_RESOLVED_DATA</span>`;
            return;
        }
        list.innerHTML = solved.map(c => `<div><i class="fa-solid fa-circle-check"></i> ${c.title}</div>`).join('');
    }

    selectCase(caseId) {
        this.close();
        this.loadCase(caseId);
    }

    bind() {
        document.getElementById('btn-close-map').onclick = () => this.close();

        let moveThreshold = 5;
        let startPos = { x: 0, y: 0 };

        this.wrapper.addEventListener('mousedown', (e) => {
            this.dragging = true;
            this.prev = { x: e.clientX, y: e.clientY };
            startPos = { x: e.clientX, y: e.clientY };
        });

        this.wrapper.addEventListener('mousemove', (e) => {
            if (!this.dragging) return;
            const dx = e.clientX - this.prev.x;
            const dy = e.clientY - this.prev.y;
            this.theta -= dx * 0.006;
            this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi - dy * 0.006));
            this.prev = { x: e.clientX, y: e.clientY };
        });

        this.wrapper.addEventListener('mouseup', (e) => {
            this.dragging = false;

            const dist = Math.sqrt(Math.pow(e.clientX - startPos.x, 2) + Math.pow(e.clientY - startPos.y, 2));
            if (dist < moveThreshold) {
                this._handleRaycast(e);
            }
        });

        this.wrapper.addEventListener('mouseleave', () => this.dragging = false);
    }

    _handleRaycast(e) {
        const rect = this.wrapper.getBoundingClientRect();
        const mouse = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.markers);

        if (intersects.length > 0) {
            const m = intersects[0].object;
            if (m.callback) m.callback();
            if (this.audio) this.audio.playUI();
        }
    }

    open() {
        this.overlay.classList.add('active');

        const loadBtn = document.getElementById('btn-load-node-scene');
        if (loadBtn) {
            loadBtn.onclick = () => {
                const cases = this.cm.getAllCases();
                const first = cases.find(c => !(c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved)));
                if (first) {
                    if (this.audio) this.audio.playUI();
                    this.selectCase(first.id);
                }
            };
        }

        // Small delay to ensure the DOM has rendered the modal dimensions
        setTimeout(() => {
            const width = this.wrapper.clientWidth;
            const height = this.wrapper.clientHeight;
            if (width > 0 && height > 0) {
                this.renderer.setSize(width, height);
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
            }
        }, 50);

        const panel = this.overlay.querySelector('.modal-panel');
        if (this.treeEl && panel) {
            panel.appendChild(this.treeEl);
        }

        this.hideAllMarkers(); // Start with a clean globe
        this.showAllCasesOnGlobe(); // Automatically show cases on open
        this.updateResolvedArchives();
        this.loop();
    }

    close() {
        this.overlay.classList.remove('active');
        this.hideAllMarkers();
        cancelAnimationFrame(this.raf);
        this.activeAct = null;
    }

    loop() {
        this.raf = requestAnimationFrame(() => this.loop());
        this.camera.position.setFromSphericalCoords(21, this.phi, this.theta);
        this.camera.lookAt(0, 0, 0);

        // Significantly slowed rotation for cinematic effect
        if (!this.dragging && this.core) this.core.rotation.y += 0.0005;

        this.renderer.render(this.scene, this.camera);

        const w = this.wrapper.clientWidth;
        const h = this.wrapper.clientHeight;

        this.labels.forEach((item) => {
            // Get world position of the marker
            const worldPos = new THREE.Vector3();
            item.marker.getWorldPosition(worldPos);

            // Project world position to screen space
            const vector = worldPos.clone().project(this.camera);

            // Determine occlusion: Node is behind the globe if it faces away from the camera
            // Since globe is at origin, worldPos is the normal from center to node.
            const isBehind = worldPos.dot(this.camera.position) < 0;

            const x = (vector.x * 0.5 + 0.5) * w;
            const y = (vector.y * -0.5 + 0.5) * h; // Invert Y for screen coordinates

            // Use left/top for base position so CSS transform is free for animations/hover
            item.dot.style.left = `${x}px`;
            item.dot.style.top = `${y}px`;

            item.label.style.left = `${x}px`;
            item.label.style.top = `${y - 25}px`;

            item.dot.style.opacity = isBehind ? '0' : '1';
            item.label.style.opacity = isBehind ? '0' : '1';
            item.dot.style.pointerEvents = isBehind ? 'none' : 'auto';
        });
    }
}