import * as THREE from 'three';
import { CaseManager } from './../js/gameplay/caseManager.js';
import { EvidenceSystem } from './../js/gameplay/evidenceSystem.js';
import { NPCSystem, PROFILE_ID_MAP } from "./NPCSystem.js";
import { DeductionEngine } from './../js/gameplay/deductionEngine.js';
import { LocationSystem } from './../js/gameplay/locationSystem.js';
import { AccessibilityManager } from "../js/ui/AccessibilityManager.js";
import { ChatUI } from "../js/ui/ChatUI.js";
import { AudioManager } from "./audioManager.js"; // Desktop uses its own AudioManager
import { DialogueManager } from "./dialogueManager.js";

import { ControlsManager } from "./controls.js";
import { EnvironmentManager } from "./environment.js";
import { OrbitalSelectMatrixModal } from "./mapModal.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MODELS } from '../js/config.js';
import { iVFXSystem } from "./iVFXSystem.js";

import { act1CaseA, act1CaseB, act1CaseC } from "./../js/act1_case.js";
import { act2CaseA, act2CaseB, act2CaseC, act2CaseD } from "./../js/act2_case.js";
import { act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE } from "./../js/act3_case.js";
import { act4CaseA, act4CaseB, act4CaseC } from "./../js/act4_case.js";

export class GameEngine {
  constructor(config = {}) {
    this.config = config; // Store the passed configuration immediately
    this.worldScale = this.config.worldScale || 1.01; // Scale multiplier for the terrain models
    // how much bigger the visual earth is than the walkable navmesh sphere.
    // 1.0 = flush with the ground, >1 = buildings/terrain poke through (e.g. 1.04 = 4% larger)
    this.earthVisibleScale = this.config.earthVisibleScale ?? 1.04;
    this.cm = new CaseManager();
    this.a11y = new AccessibilityManager();
    this.a11y.restorePreferences();
    this.es = new EvidenceSystem(this.cm, this.config);
    this.ns = new NPCSystem(this.cm, this.es, this.surfaceRadius);
    this.de = new DeductionEngine(this.cm, this.es);
    this.ls = new LocationSystem(this.cm);
    this.audio = new AudioManager();
    this.dm = new DialogueManager(this.audio);

    this.registerAllCases();

    this.activeCaseId = null;

    // --- WORLD DIMENSIONS ---
    this.planetRadius = 440;
    this.surfaceRadius = 500; // Sync with planet radius to prevent objects being buried

    this.pPos = new THREE.Vector3(0, this.surfaceRadius + 1.2, 0);
    this.pVelocity = new THREE.Vector3();
    this.camHeading = new THREE.Vector3(0, 0, -1); // Player looks towards the "north pole" where NPCs are clustered
    this.isGrounded = true;
    this.nearestNPC = null;
    this.inDialogue = false;
    this.collectedEvidence = [];
    this.npcMeshes = [];
    this.evidenceMeshes = [];
    this.audioActive = true;
    this.currentDisplayPreference = 'emojis';
    this.uiVisibility = { minimap: true, controls: true };
    this.lockedEvidence = {};
    this.gridSceneCache = {};
    this._lastTaggedNPC = null; // Track to prevent frame-rate click interference
    this.controls = new ControlsManager(this);
    this.worldEarth = null;
    // Effects & World Objects
    this.trailParticles = [];
    this.worldObjects = [];
    this.vfx = null;
  }

  registerAllCases() {
    const cases = [
      act1CaseA, act1CaseB, act1CaseC,
      act2CaseA, act2CaseB, act2CaseC, act2CaseD,
      act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE,
      act4CaseA, act4CaseB, act4CaseC
    ];
    cases.forEach(c => {
      if (this.config.unlockAllCases) c.requires = null;
      this.cm.registerCase(c);
    });
    if (typeof inkjs !== 'undefined') this.dm.setInkLib(inkjs);
  }

  // Finds a mesh named "Sphere" (case-insensitive) inside a loaded GLB and
  // returns its world-space radius and center, so we can align it to the navmesh.
  _getSphereMeshInfo(root) {
    let sphereMesh = null;
    root.traverse(n => {
      if (n.isMesh && !sphereMesh && /sphere/i.test(n.name)) sphereMesh = n;
    });
    if (!sphereMesh) return null;
    const box = new THREE.Box3().setFromObject(sphereMesh);
    const size = box.getSize(new THREE.Vector3());
    return {
      radius: Math.max(size.x, size.y, size.z) / 2,
      center: box.getCenter(new THREE.Vector3())
    };
  }

  // Converts a grid cell (row/col) from earth-grid.json into a world position
  // on the navmesh surface, using the same lat/lon math as the grid editor.
  _gridCellToSurface(r, c, numLat, numLon, yOffset = 1.1) {
    const phi = ((r + 0.5) / numLat) * Math.PI;
    const theta = ((c + 0.5) / numLon) * Math.PI * 2;
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );
    return dir.multiplyScalar(this.surfaceRadius + yOffset);
  }

  _mergeGridSceneData(caseData, data) {
    if (!data || data.objects) return;

    if (data.timeOfDay) caseData.timeOfDay = data.timeOfDay;

    const caseNpcs = new Map((caseData.npcs || []).map(npc => [npc.id, npc]));
    (data.npcs || []).forEach(gridNpc => {
      const npc = caseNpcs.get(gridNpc.id);
      if (!npc) return;
      if (Array.isArray(gridNpc.pos)) npc.pos = [...gridNpc.pos];
      if (gridNpc.color !== undefined) npc.color = gridNpc.color;
      if (gridNpc.description && !npc.description) npc.description = gridNpc.description;
      if (Array.isArray(gridNpc.unlocksEvidence)) npc.unlocksEvidence = gridNpc.unlocksEvidence;
    });

    const caseEvidence = new Map((caseData.evidencePool || []).map(evidence => [evidence.id, evidence]));
    (data.evidence || []).forEach(gridEvidence => {
      const evidence = caseEvidence.get(gridEvidence.id);
      if (!evidence) return;
      if (Array.isArray(gridEvidence.pos)) evidence.pos = [...gridEvidence.pos];
      if (gridEvidence.model && !evidence.model) evidence.model = gridEvidence.model;
    });
  }

  async _loadGridData(caseData) {
    const gridFile = caseData.gridFile || `../assets/grids/${caseData.id}.json`;
    const cacheKey = caseData.gridFile ? gridFile : caseData.id;

    if (this.gridSceneCache[cacheKey] !== undefined) {
      return this.gridSceneCache[cacheKey];
    }

    try {
      const res = await fetch(gridFile);
      if (!res.ok) {
        if (!caseData.gridFile) {
          const fallback = await fetch('../assets/grids/earth-grid.json');
          if (fallback.ok) {
            const data = await fallback.json();
            this.gridSceneCache[cacheKey] = data;
            return data;
          }
        }
        this.gridSceneCache[cacheKey] = null;
        return null;
      }

      const data = await res.json();
      this._mergeGridSceneData(caseData, data);
      this.gridSceneCache[cacheKey] = data;
      return data;
    } catch (e) {
      console.warn(`[Grid] Failed to load grid scene for ${caseData.id}:`, e);
      this.gridSceneCache[cacheKey] = null;
      return null;
    }
  }

  // Loads grid placements from the shared assets/grids source and spawns them
  // on the navmesh surface for the current case.
  async _loadGridObjects(caseData) {
    const data = await this._loadGridData(caseData);
    if (!data) return;

    if (!data.objects) return;

    try {
      const { numLat, numLon } = data.grid || {};
      if (!numLat || !numLon) return;
      let npcIndex = 0;

      data.objects.forEach(o => {
        switch (o.type) {
          case 'npc': {
            const pos = this._gridCellToSurface(o.r, o.c, numLat, numLon, 1.1);
            const npcDef = (caseData.npcs || [])[npcIndex] ||
              { id: `grid_npc_${npcIndex}`, name: 'Citizen', color: 0x00ffaa };
            this._loadNPCModel(npcDef, pos, npcIndex);
            npcIndex++;
            break;
          }
          case 'item': {
            const pos = this._gridCellToSurface(o.r, o.c, numLat, numLon, 1.2);
            const item = new THREE.Mesh(
              new THREE.OctahedronGeometry(0.7),
              new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffaa00, emissiveIntensity: 0.5 })
            );
            item.position.copy(pos);
            item.userData = { type: 'collectable' };
            this.scene.add(item);
            this.worldObjects.push(item);
            break;
          }
          default: { // prop, decoy, etc.
            const pos = this._gridCellToSurface(o.r, o.c, numLat, numLon, 0);
            let mesh;
            if (o.glb) {
              const gltfLoader = new GLTFLoader();
              gltfLoader.load(o.glb, (gltf) => {
                const m = gltf.scene;
                m.position.copy(pos);
                this._alignToSurface(m);
                m.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
                m.userData.collisionRadius = 1.5;
                this.worldObjects.push(m);
              });
              return;
            } else {
              mesh = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshStandardMaterial({ color: 0x886644 })
              );
            }
            mesh.position.copy(pos);
            this._alignToSurface(mesh);
            mesh.castShadow = true; mesh.receiveShadow = true;
            mesh.userData.collisionRadius = 1.2;
            this.worldObjects.push(mesh);
          }
        }
      });
    } catch (e) {
      console.warn('[Grid] Failed to load grid objects:', e);
    }
  }

  init() {
    const container = document.getElementById('canvas-container');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xADD8E6); // Light Blue
    this.scene.fog = new THREE.FogExp2(0xADD8E6, 0.0015);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.VSMShadowMap; // High-quality soft shadows with realistic filtering
    container.appendChild(this.renderer.domElement);

    this._initMobileUI();

    const ambient = new THREE.AmbientLight(0xffffff, 0.2); // Reduced to prevent washing out shadow depth
    this.scene.add(ambient);

    // HemisphereLight provides a natural sky/ground fill, essential for seeing detail on a spherical world
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.8); // Increased intensity
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.0); // Increased sun intensity
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.left = -50;
    this.sunLight.shadow.camera.right = 50;
    this.sunLight.shadow.camera.top = 50;
    this.sunLight.shadow.camera.bottom = -50;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 2500; // Optimized range for better depth precision
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.bias = -0.0001;
    this.sunLight.shadow.normalBias = 0.02; // Anchors shadows to feet (fixes "Peter Panning")
    this.sunLight.shadow.radius = 4;
    this.sunLight.shadow.blurSamples = 25; // Smooths edges for VSM
    this.scene.add(this.sunLight);

    this.moonLight = new THREE.DirectionalLight(0x5588ff, 0.8); // Increased moon intensity
    this.moonLight.castShadow = true;
    this.moonLight.shadow.camera.left = -50;
    this.moonLight.shadow.camera.right = 50;
    this.moonLight.shadow.camera.top = 50;
    this.moonLight.shadow.camera.bottom = -50;
    this.moonLight.shadow.camera.near = 10;
    this.moonLight.shadow.camera.far = 2500;
    this.moonLight.shadow.mapSize.set(1024, 1024);
    this.moonLight.shadow.bias = -0.0001;
    this.moonLight.shadow.normalBias = 0.02;
    this.moonLight.shadow.radius = 4;
    this.moonLight.shadow.blurSamples = 15;
    this.scene.add(this.moonLight);

    // Physical Ground Sphere (The surface the player "loads" on)
    const groundGeo = new THREE.SphereGeometry(this.surfaceRadius, 128, 128);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x8b7355, // Darker sand color
      roughness: 0.9,
      metalness: 0
    });
    this.groundSphere = new THREE.Mesh(groundGeo, groundMat);
    this.groundSphere.receiveShadow = true;
    this.scene.add(this.groundSphere);

    // Load Earth Model as a visual layer scaled to match the sphere
    const loader = new GLTFLoader();
    loader.load(MODELS.planet, (gltf) => {
      this.worldEarth = gltf.scene;
      const earthModel = this.worldEarth;

      const sphereInfo = this._getSphereMeshInfo(earthModel);
      let scaleFactor, center;
      if (sphereInfo) {
        scaleFactor = (this.surfaceRadius * this.earthVisibleScale) / sphereInfo.radius;
        center = sphereInfo.center;
      } else {
        const box = new THREE.Box3().setFromObject(earthModel);
        const size = box.getSize(new THREE.Vector3());
        scaleFactor = (this.surfaceRadius * 2 * this.worldScale) / Math.max(size.x, size.y, size.z);
        center = box.getCenter(new THREE.Vector3());
      }

      earthModel.traverse(node => { if (node.isMesh) node.position.sub(center); });
      earthModel.scale.setScalar(scaleFactor);
      earthModel.position.set(0, 0, 0);

      earthModel.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.roughness = 1.0;
            node.material.metalness = 0.0;
          }
        }
      });
      this.scene.add(earthModel);
    });

    this._loadPlayerModel();

    this.vfx = new iVFXSystem(this.scene, this.surfaceRadius);

    this.envManager = new EnvironmentManager(this.scene, this.sunLight, this.moonLight, this.torchLight, this.audio);

    // Sync audio state with a11y preferences
    const currentSound = this.a11y.soundEnabled;
    this.audio.setEnabled(currentSound);

    this.bindGlobalUIEvents();

    // Connect day/night system to VFX for proper fog coloring
    this.envManager.onModeChange = (isNight) => this.vfx.setNightMode(isNight);

    // Listen for landing events to trigger spark effects
    window.addEventListener('playerLand', (e) => {
      if (this.vfx) this.vfx.emitSparks(e.detail.position, 12);
    });


    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('click', (e) => {
      const link = e.target.closest('#evidence-alert-link');
      if (!link) return;
      e.preventDefault();
      const id = link.dataset.evidenceId;
      if (id && typeof this.openEvidenceDetail === 'function') {
        this.openEvidenceDetail(id);
      }
    });

    // Unified Mouse Listener: Left-click for Interaction/Selection, Right-click for Movement
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      const mouseCoords = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseCoords, this.camera);

      if (e.button === 0) { // Left-click: Node/Pin Selection
        // Check intersection with NPCs, Evidence, and World Markers (pins)
        const interactivePool = [...this.npcMeshes, ...this.evidenceMeshes, ...this.worldObjects];
        const hits = raycaster.intersectObjects(interactivePool, true);

        if (hits.length > 0) {
          const hitObject = hits[0].object;
          // Traverse up the parent tree to find an object with case data (common for GLB models)
          let target = hitObject;
          while (target && (!target.userData || !target.userData.caseId) && target.parent) {
            target = target.parent;
          }

          if (target && target.userData && target.userData.caseId) {
            this.audio.playUI();
            this.loadCase(target.userData.caseId);
          }
        }
      } else if (e.button === 2) { // Right-click: Point-and-Click Navigation
        const groundTargets = this.worldEarth ? [this.groundSphere, this.worldEarth] : [this.groundSphere];
        const hits = raycaster.intersectObjects(groundTargets, true);
        if (hits.length > 0) this.mouseTarget = hits[0].point;
      }
    });
  }

  _initMobileUI() {
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const sidebarPanels = document.querySelectorAll('aside .hud-panel');
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');

    const closeAllSidebars = () => {
      leftSidebar?.classList.remove('active');
      rightSidebar?.classList.remove('active');
      sidebarPanels.forEach(p => p.classList.add('mobile-hidden'));
      mobileNavBtns.forEach(b => b.classList.remove('active'));
    };

    const togglePanel = (sidebarId, panelClass, btnId) => {
      const sidebar = document.getElementById(sidebarId);
      const targetPanel = sidebar?.querySelector('.' + panelClass);
      if (!sidebar || !targetPanel) return;

      const wasActive = sidebar.classList.contains('active') && !targetPanel.classList.contains('mobile-hidden');

      closeAllSidebars();

      if (!wasActive) {
        sidebar.classList.add('active');
        targetPanel.classList.remove('mobile-hidden');
        document.getElementById(btnId)?.classList.add('active');
        // When a panel is open, the Scene button is no longer highlighted
        document.getElementById('btn-mobile-scene')?.classList.remove('active');
      } else {
        // If we toggled a panel off, return focus to the Scene tab
        document.getElementById('btn-mobile-scene')?.classList.add('active');
      }
    };

    // Navigation handler for the primary 3D Scene view
    document.getElementById('btn-mobile-scene').onclick = () => {
      closeAllSidebars();
      this.audio.playUI();
      document.getElementById('btn-mobile-scene')?.classList.add('active');
    };

    document.getElementById('btn-mobile-quest').onclick = () => { closeAllSidebars(); this.openPeopleModal(); };
    document.getElementById('btn-mobile-evidence').onclick = () => togglePanel('left-sidebar', 'evidence-panel', 'btn-mobile-evidence');
    document.getElementById('btn-mobile-actions').onclick = () => togglePanel('right-sidebar', 'actions-panel', 'btn-mobile-actions');
    document.getElementById('btn-mobile-keys').onclick = () => togglePanel('right-sidebar', 'prophecies-panel', 'btn-mobile-keys');

    document.getElementById('btn-mobile-codex').onclick = () => {
      closeAllSidebars();
      this.audio.playUI();
      this.showEvidenceCodex();
      document.getElementById('btn-mobile-codex')?.classList.add('active');
    };

    document.getElementById('btn-mobile-analysis').onclick = () => {
      closeAllSidebars();
      if (window.openAnalysis) window.openAnalysis();
      document.getElementById('btn-mobile-analysis')?.classList.add('active');
    };

    // Bind close buttons inside sidebars
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = () => {
        closeAllSidebars();
        // Returning to scene view highlights the Scene button
        document.getElementById('btn-mobile-scene')?.classList.add('active');
      };
    });

    const updateUIState = (prop, targetId, settingsBtnId) => {
      const isVisible = this.uiVisibility[prop];
      const target = document.getElementById(targetId);
      if (target) target.classList.toggle('ui-visibility-hidden', !isVisible);
      const sBtn = document.getElementById(settingsBtnId);
      if (sBtn) {
        sBtn.classList.toggle('active', isVisible);
        sBtn.setAttribute('aria-checked', isVisible);
      }
    };

    const bindToggle = (btnId, prop, targetId, settingsBtnId, title) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        if (title) btn.title = title;
        btn.onclick = () => {
          this.uiVisibility[prop] = !this.uiVisibility[prop];
          updateUIState(prop, targetId, settingsBtnId);
          this.audio.playUI();
        };
      }
    };

    // Bind settings menu switches
    bindToggle('toggle-ui-minimap', 'minimap', 'minimap', 'toggle-ui-minimap');
    bindToggle('toggle-ui-controls', 'controls', 'mobile-ctrl', 'toggle-ui-controls');
    // Bind chevron buttons
    bindToggle('toggle-left-btn', 'controls', 'mobile-ctrl', 'toggle-ui-controls', "Toggle Mobile Controls");
    bindToggle('toggle-right-btn', 'minimap', 'minimap', 'toggle-ui-minimap', "Toggle Minimap");

    // Initial sync
    updateUIState('minimap', 'minimap', 'toggle-ui-minimap');
    updateUIState('controls', 'mobile-ctrl', 'toggle-ui-controls');

    // D-Pad and Action Button Logic
    const bindControl = (id, key) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.oncontextmenu = (e) => e.preventDefault(); // Prevent long-press menu

      const press = (e) => { e.preventDefault(); this.controls.keys[key] = true; };
      const release = (e) => { if (e.cancelable) e.preventDefault(); this.controls.keys[key] = false; };

      btn.addEventListener('pointerdown', press, { passive: false });
      btn.addEventListener('pointerup', release, { passive: false });
      btn.addEventListener('pointercancel', release, { passive: false });
      btn.addEventListener('pointerleave', release, { passive: false });
    };

    bindControl('ctrl-up', 'KeyW');
    bindControl('ctrl-down', 'KeyS');
    bindControl('ctrl-left', 'KeyA');
    bindControl('ctrl-right', 'KeyD');
    bindControl('ctrl-jump', 'Space');

    const interactBtn = document.getElementById('ctrl-interact');
    if (interactBtn) {
      interactBtn.onclick = (e) => {
        e.preventDefault();
        if (this.nearestNPC) this.startDialogue(this.nearestNPC.userData.config);
      };
    }

    // Method to update interact button disabled state
    this.updateInteractButton = () => {
      if (interactBtn) {
        interactBtn.disabled = !this.nearestNPC;
        interactBtn.style.opacity = this.nearestNPC ? '1' : '0.5';
      }
    };
  }

  bindGlobalUIEvents() {
    document.getElementById('btn-open-map').onclick = () => {
      this.audio.playUI();
      this._openMapModal();
    };

    document.getElementById('btn-start').onclick = () => {
      this.audio.playUI();
      document.getElementById('wipe-overlay').classList.add('active');
      setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        this._openMapModal();
        this.animate();
      }, 1000);
    };
  }

  _openMapModal() {
    if (!this.mapModal) {
      // You can pass a custom globeScale value here (e.g., 15)
      this.mapModal = new OrbitalSelectMatrixModal(this.cm, this.ls, this.audio, (id) => this.loadCase(id), 13);
    }
    this.mapModal.open();
  }

  async loadCase(caseId) {
    const caseData = this.cm.cases[caseId];
    if (!caseData) return;
    await this._loadGridData(caseData);

    this.activeCaseId = caseId;
    this.audio.updateActMusic(caseData.actLabel);
    this.nearestNPC = null;
    this.inDialogue = false;

    // 1. Reset player and camera state for the new level
    this.pVelocity.set(0, 0, 0);
    this.pPos.set(0, this.surfaceRadius + 1.2, 0); // Player starts at the "north pole"
    this.camHeading.set(0, 0, -1);

    // 2. Map level time to environmental progress (as seen in mobile.html)
    const timeMap = { 'day': 0.25, 'morning': 0.18, 'afternoon': 0.35, 'night': 0.6, 'dawn': 0.15 };
    const startTime = timeMap[caseData.timeOfDay] || 0.25;

    if (this.envManager) {
      this.envManager.timeProgress = startTime;
      this.envManager.wasDay = null;
      this.envManager.update(false);
    }

    this.cm.startCase(caseId);
    this.es.loadCase(caseData);
    this.ns.loadCase(caseData);
    this.de.loadCase(caseData);

    // Pre-load Ink stories
    if (caseData.npcs) {
      (caseData.npcs || []).forEach(npc => {
        if (npc.hasDialogue || npc.dialogueId || npc.storyFile) this.dm.loadStoryForNPC(npc);
      });
    }

    // Clean and rebuild world meshes
    this.npcMeshes.forEach(m => {
      if (m.userData.halo) this.scene.remove(m.userData.halo);
      (m.parent ? m.parent.remove(m) : this.scene.remove(m));
    });
    this.npcMeshes = [];
    this.evidenceMeshes.forEach(m => (m.parent ? m.parent.remove(m) : this.scene.remove(m)));
    this.evidenceMeshes = [];
    this.worldObjects.forEach(m => (m.parent ? m.parent.remove(m) : this.scene.remove(m)));
    this.worldObjects = [];

    if (this.worldEarth) {
      this.scene.remove(this.worldEarth);
      // Memory cleanup for mobile performance optimization
      this.worldEarth.traverse(node => {
        if (node.isMesh) {
          node.geometry.dispose();
          if (node.material.map) node.material.map.dispose();
          node.material.dispose();
        }
      });
    }

    // 3. Load the specific environment model for this location
    const loader = new GLTFLoader();
    // Load the model specified in the case data.
    const modelPath = caseData.worldModel;

    // Transition UI for loading state
    const wipeOverlay = document.getElementById('wipe-overlay');
    if (wipeOverlay) wipeOverlay.classList.add('active');

    loader.load(modelPath, (gltf) => {
      this.worldEarth = gltf.scene;

      const sphereInfo = this._getSphereMeshInfo(this.worldEarth);
      let scaleFactor, center;
      if (sphereInfo) {
        scaleFactor = (this.surfaceRadius * this.earthVisibleScale) / sphereInfo.radius;
        center = sphereInfo.center;
      } else {
        const box = new THREE.Box3().setFromObject(this.worldEarth);
        const size = box.getSize(new THREE.Vector3());
        scaleFactor = (this.surfaceRadius * 2 * this.worldScale) / Math.max(size.x, size.y, size.z);
        center = box.getCenter(new THREE.Vector3());
      }

      this.worldEarth.traverse(node => { if (node.isMesh) node.position.sub(center); });
      this.worldEarth.scale.setScalar(scaleFactor);
      this.worldEarth.position.set(0, 0, 0);

      // Center the sphere at (0,0,0) for easier spherical gravity math
      this.worldEarth.position.set(0, 0, 0);

      this.worldEarth.traverse(node => {
        if (node.isMesh) {
          node.receiveShadow = true;
          if (node.material) {
            node.material.roughness = 0.8;
            node.material.metalness = 0.1;
          }
        }
      });

      // Add config to hide city layer for specific cases
      const showCityLayer = caseData.showCityLayer !== false; // Default to true if not specified
      const cityLayer = this.worldEarth.getObjectByName('cities'); // Assuming 'cities' is the name in the GLB
      if (cityLayer) {
        cityLayer.visible = showCityLayer;
      }
      this.scene.add(this.worldEarth);

      this.pPos.setLength(this.surfaceRadius + 1.1);

      // Populate level details ONLY after the terrain is ready to prevent occlusion
      this._populateWorldPrimitives();
      this._addLocationMarkers();
      this._placeNPCs(caseData);
      this._loadGridObjects(caseData);

      if (wipeOverlay) setTimeout(() => wipeOverlay.classList.remove('active'), 500);
    });

    this.collectedEvidence = [];
    this.lockedEvidence = {};

    caseData.evidencePool.forEach(item => {
      this.lockedEvidence[item.id] = item;
    });

    this.updateHUD(caseData);

    // Auto-open instructions for the case, then show the case-loaded alert after it closes
    setTimeout(() => { if (window.showInstructionsModal) window.showInstructionsModal(); }, 500);
  }

  _placeNPCs(caseData) {
    (caseData.npcs || []).forEach((npc, index) => {
      // Use provided pos or default to a random position near the pole if missing
      const npcCoords = (Array.isArray(npc.pos) && npc.pos.length === 3) ? npc.pos : [Math.random() * 40 - 20, 0, Math.random() * 40 - 20];
      // The y_offset in npcCoords is already the height above the surface.
      // Add a small constant offset (1.1) to ensure the NPC stands on the surface.
      const pos = this._projectToSurface(npcCoords[0], npcCoords[1] + 1.1, npcCoords[2]);
      this._loadNPCModel(npc, pos, index);
    });
  }

  _loadNPCModel(npc, pos, index) {
    const loader = new GLTFLoader();
    const modelFiles = ['npc_horizon.glb', 'npc_echo.glb', 'npc_keeper.glb', 'npc_spire.glb'];
    const modelFile = modelFiles[index % modelFiles.length];

    loader.load(`../assets/models/npcs/${modelFile}`, (gltf) => {
      const model = gltf.scene;
      model.position.copy(pos);
      this._alignToSurface(model);

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.2 / maxDim;
      model.scale.setScalar(scale);

      model.castShadow = true;
      model.receiveShadow = true;

      model.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      model.userData = { config: npc, type: 'npc', state: 'neutral' };
      this.npcMeshes.push(model);

      const up = pos.clone().normalize();
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.5, 32),
        new THREE.MeshBasicMaterial({ color: npc.color || 0x00ffaa, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
      );
      halo.position.set(0, 2.4, 0);
      halo.lookAt(0, 100, 0);
      model.add(halo);
      model.userData.halo = halo;
    }, undefined, (error) => {
      console.warn(`[NPC] Failed to load ${modelFile}, using fallback box:`, error);
      const npcGeo = new THREE.BoxGeometry(1.2, 2.2, 1.2);
      const npcMat = new THREE.MeshStandardMaterial({
        color: npc.color || 0x444444,
        emissive: npc.color,
        emissiveIntensity: 0.2
      });
      const box = new THREE.Mesh(npcGeo, npcMat);
      box.position.copy(pos);
      box.castShadow = true;
      box.receiveShadow = true;
      this._alignToSurface(box);
      box.userData = { config: npc, type: 'npc', state: 'neutral' };
      this.npcMeshes.push(box);

      const up = pos.clone().normalize();
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.5, 32),
        new THREE.MeshBasicMaterial({ color: npc.color || 0x00ffaa, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
      );
      halo.position.copy(pos);
      halo.position.add(up.clone().multiplyScalar(2.4));
      halo.lookAt(pos.clone().add(up.clone().multiplyScalar(100)));
      box.add(halo);
      box.userData.halo = halo;
    });
  }

  // Helper to project local case coordinates onto the global spherical surface
  // x, z are horizontal coordinates, y_offset_from_surface is height above the surface
  _projectToSurface(x, y_offset_from_surface, z) {
    // Create a vector using Y as the primary axis (up) so objects cluster near the starting pole
    let directionFromCenter = new THREE.Vector3(x, this.surfaceRadius, z);
    if (directionFromCenter.lengthSq() === 0) {
      directionFromCenter.set(0, 1, 0); // Default to straight up from the pole
    } else {
      directionFromCenter.normalize();
    }
    // Scale it to the planet radius, and then add the y_offset_from_surface along that normal
    const worldPos = directionFromCenter.multiplyScalar(this.surfaceRadius + y_offset_from_surface);
    return worldPos;
  }

  // Helper to orient an object vertically relative to the planet's center
  _alignToSurface(mesh) {
    // Get world-space direction for 'up'
    const up = mesh.position.clone().normalize();
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);

    // Add directly to the scene instead of the scaled world model. 
    // This ensures position/collision logic uses global world coordinates.
    this.scene.add(mesh);
  }

  _loadPlayerModel() {
    this.torchLight = new THREE.PointLight(0x00f2ff, 0, 25, 1.5);
    this.torchLight.castShadow = true;
    this.torchLight.shadow.mapSize.set(512, 512);
    this.torchLight.shadow.camera.near = 0.1;
    this.torchLight.shadow.camera.far = 30;
    this.torchLight.shadow.bias = -0.0001;

    const loader = new GLTFLoader();
    const fallbackGeo = (typeof THREE.CapsuleGeometry !== 'undefined') ? new THREE.CapsuleGeometry(0.5, 1.2, 4, 8) : new THREE.CylinderGeometry(0.5, 0.5, 2.2, 16);
    this.playerMesh = new THREE.Mesh(fallbackGeo, new THREE.MeshStandardMaterial({ color: 0x00a884, roughness: 0.5 }));
    this.playerMesh.castShadow = true;
    this.playerMesh.position.copy(this.pPos);
    this.scene.add(this.playerMesh);
    this.playerMesh.add(this.torchLight);

    loader.load('../assets/models/player.glb', (gltf) => {
      const model = gltf.scene;
      this.scene.remove(this.playerMesh);
      this.playerMesh.remove(this.torchLight);

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      model.scale.setScalar(scale);

      model.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      this.playerMesh = model;
      this.playerMesh.position.copy(this.pPos);
      this.playerMesh.add(this.torchLight);
      this.scene.add(model);
    }, undefined, (error) => {
      console.warn('[Player] Failed to load player.glb, using fallback:', error);
    });
  }

  _populateWorldPrimitives() {
    const gltfLoader = new GLTFLoader();

    // --- Custom GLB Models from assets folder ---
    // Assuming the 'assets' folder is at the same level as '_prototypeB'
    const customModels = [
      { path: '../assets/models/building_tall.glb', scale: 2, count: 5 },
      { path: '../assets/models/building_short.glb', scale: 2, count: 10 },
      { path: '../assets/models/tree_palm.glb', scale: 2, count: 15 },
      { path: '../assets/models/archway.glb', scale: 2, count: 3 }
    ];

    customModels.forEach(modelDef => {
      for (let i = 0; i < modelDef.count; i++) {
        const x = (Math.random() - 0.5) * 180; // Wider spread for models
        const z = (Math.random() - 0.5) * 180;
        // Ensure we don't spawn directly on the center
        if (Math.abs(x) < 10 && Math.abs(z) < 10) continue; // Avoid spawning too close to origin

        gltfLoader.load(modelDef.path, (gltf) => {
          const model = gltf.scene;
          // Calculate height offset based on model's bounding box
          const bbox = new THREE.Box3().setFromObject(model);
          const size = bbox.getSize(new THREE.Vector3()).multiplyScalar(modelDef.scale);
          // GLB origins are usually at the base, so offset is 0
          const pos = this._projectToSurface(x, 0, z); // x, y_offset=0, z
          model.position.copy(pos);
          this._alignToSurface(model);
          model.userData.collisionRadius = Math.max(size.x, size.z) * 0.5;

          model.traverse(node => {
            if (node.isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
            }
          });

          // Objects are added to the scene root, so we use their intended world scale directly
          model.scale.setScalar(modelDef.scale);
          this.worldObjects.push(model);
        }, undefined, (error) => {
          console.warn(`Failed to load custom model ${modelDef.path}:`, error);
          // Fallback to a primitive if GLB fails
          const fallbackGeo = new THREE.BoxGeometry(modelDef.scale, modelDef.scale * 2, modelDef.scale);
          const fallbackMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
          const fallbackMesh = new THREE.Mesh(fallbackGeo, fallbackMat);
          const fallbackPos = this._projectToSurface(x, modelDef.scale, z); // x, y_offset=modelDef.scale, z
          fallbackMesh.position.copy(fallbackPos);
          fallbackMesh.scale.setScalar(1.0);
          this._alignToSurface(fallbackMesh);
          fallbackMesh.castShadow = true;
          fallbackMesh.receiveShadow = true;
          this.worldObjects.push(fallbackMesh);
          fallbackMesh.userData.collisionRadius = modelDef.scale;
        });
      }
    });

    // --- Primitive Boxes/Cylinders for additional variety ---
    const mat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const cylGeo = new THREE.CylinderGeometry(1, 1, 4, 12);

    for (let i = 0; i < 30; i++) { // Fewer primitives now that custom models are added
      const h = 5 + Math.random() * 10;
      const w = 3 + Math.random() * 5;
      const m = new THREE.Mesh(Math.random() > 0.5 ? new THREE.BoxGeometry(w, h, w) : new THREE.CylinderGeometry(w / 2, w / 2, h, 12), mat);

      const x = (Math.random() - 0.5) * 200; // Wider spread
      const z = (Math.random() - 0.5) * 200;
      if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;

      const pos = this._projectToSurface(x, h / 2, z); // x, y_offset=h/2, z
      m.position.copy(pos);
      this._alignToSurface(m);
      m.castShadow = true; m.receiveShadow = true;
      m.userData.collisionRadius = w * 0.5;
      this.worldObjects.push(m);
    }

    // --- Global golden collectibles (unchanged) ---
    const collectGeo = new THREE.OctahedronGeometry(0.7);
    const collectMat = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffaa00, emissiveIntensity: 0.5 });
    for (let i = 0; i < 20; i++) {
      const item = new THREE.Mesh(collectGeo, collectMat);
      const pos = new THREE.Vector3().setFromSphericalCoords(this.surfaceRadius + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
      item.position.copy(pos);
      item.userData = { type: 'collectable' };
      this.scene.add(item);
      this.worldObjects.push(item);
    }
  }

  _addLocationMarkers() {
    this.ls.getAllLocations().forEach((loc, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128; canvas.height = 32;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, 128, 32);
      ctx.fillStyle = 'cyan'; ctx.font = '16px monospace'; ctx.textAlign = 'center';
      ctx.fillText(loc.id.toUpperCase(), 64, 22);

      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true }));
      sprite.scale.set(16, 4, 1);

      // Distribute markers in a circle around the North Pole area so they are visible from the start
      const angle = (index / this.ls.getAllLocations().length) * Math.PI * 2;
      const dist = 40 + (index * 5); // Spread them out radially
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      const pos = this._projectToSurface(x, 15, z); // Float 15 units above surface
      sprite.position.copy(pos);
      sprite.userData = { id: loc.id, type: 'case_node', caseId: loc.id };
      this.scene.add(sprite);
      this.worldObjects.push(sprite);
    });
  }

  _clearWorldObjects() {
    this.worldObjects.forEach(o => this.scene.remove(o));
    this.worldObjects = [];
  }

  _updateEffects() {
    if (this.vfx) {
      this.vfx.update(1 / 60, this.pPos, this.pVelocity, this.isGrounded);
    }

    this.worldObjects.forEach(obj => {
      if (obj.userData?.type === 'collectable') {
        obj.rotation.y += 0.03; obj.rotation.z += 0.01;
      }
    });

    // Collect primitives
    for (let i = this.worldObjects.length - 1; i >= 0; i--) {
      const obj = this.worldObjects[i];
      if (obj.userData?.type === 'collectable' && this.pPos.distanceTo(obj.position) < 2) {
        this.scene.remove(obj); this.worldObjects.splice(i, 1);
        this.audio.playCollect();
      }
    }
  }

  updateHUD(caseData) {
    document.getElementById('loc-name').innerText = caseData.location;
    document.getElementById('act-name').innerText = caseData.actLabel;
    const levelTitle = document.getElementById('level-title');
    levelTitle.innerText = caseData.title;

    const q = caseData.quest;
    document.getElementById('quest-title').innerText = q.name;
    document.getElementById('quest-task').innerText = `${q.task} (${q.cur}/${q.tar})`;
    document.getElementById('quest-progress').style.width = `${(q.cur / q.tar) * 100}%`;

    const propWrap = document.getElementById('prophecies-container');
    if (propWrap) {
      propWrap.innerHTML = '';

      caseData.prophecies.forEach(p => {
        const status = this.cm.getCodexStatus(p.id);
        if (status === 'unseen') return;

        const div = document.createElement('div');
        div.className = 'prophecy-item';
        
        let content = '';
        if (status === 'complete') {
          content = `<p>${p.text}</p>
            <div style="text-align: right; font-size: 0.8rem; opacity: 0.7; margin-top: 4px; font-family: var(--font-main);">
              — ${p.reference} <img src='../assets/gfx/check-circle-duotone.svg' class='icon-svg' loading='lazy' style='width:14px;height:14px;vertical-align:middle;'>
            </div>`;
        } else if (status === 'found_scripture') {
          content = `<p><em>${p.text}</em></p>
            <div style="text-align: right; font-size: 0.8rem; opacity: 0.7; margin-top: 4px; font-family: var(--font-main);">
              — ${p.reference} <img src='../assets/gfx/scroll-duotone.svg' class='icon-svg' loading='lazy' style='width:14px;height:14px;vertical-align:middle;'>
            </div>
            <p style='font-size:0.85rem;opacity:0.8;'>Fulfillment evidence not yet found.</p>`;
        } else if (status === 'rumor') {
          content = `<p><strong>${p.reference}</strong></p>
            <div style="font-size: 0.8rem; opacity: 0.7; font-family: var(--font-main);">
              Rumor — scripture fragment not yet located.
            </div>`;
        }
        
        div.innerHTML = content;

        // Add interactive buttons for each gospel link provided in the case data
        if (p.gospelLink && status === 'complete') {
          const links = p.gospelLink.split(';');
          links.forEach(link => {
            const btn = document.createElement('button');
            btn.className = 'read-more-btn';
            btn.style.marginTop = '8px';
            btn.style.width = '100%';
            btn.innerHTML = `<i class="fa-lg fa-solid fa-book-open"></i> Read ${link.trim()}`;
            btn.onclick = () => {
              this.audio.playUI();
              // Opens the passage-overlay via BibleReader2.js
              if (window.BibleReader) {
                window.BibleReader.displayPassage(link.trim());
              }
            };
            div.appendChild(btn);
          });
        }
        
        propWrap.appendChild(div);
      });
    }

    this.updateMetrics();
    this.updateActions(caseData);
    this.updateEvidenceGrid();
    this.updateChallengeButton();
  }

  _revealProphecy(prophecyId) {
    const currentStatus = this.cm.getCodexStatus(prophecyId);
    if (currentStatus === 'unseen') {
      this.cm.setCodexStatus(prophecyId, 'rumor');
      this.controls.displayAlert(`New Rumor: ${this.es.getProphecyById(prophecyId)?.reference}`, 3000, 'var(--gold)');
      this.updateHUD(this.cm.getActiveCase());
    }
  }

  updateMetrics() {
    const p = this.cm.getProgress();
    document.querySelectorAll('.val-reputation').forEach(el => el.innerText = p.reputation ?? 100);
    document.querySelectorAll('.val-doubt').forEach(el => el.innerText = p.doubt ?? 0);
    document.querySelectorAll('.val-score').forEach(el => el.innerText = p.totalScore ?? 0);
    const scholarLevel = this.cm.getScholarLevel?.() || "Novice";
    document.querySelectorAll('.val-scholar').forEach(el => el.innerText = scholarLevel);
    const propCounts = this.cm.getProphecyCounts?.();
    if (propCounts) {
      document.querySelectorAll('.val-prophecies').forEach(el => el.innerText = `${propCounts.discovered}/${propCounts.total}`);
    }
  }

  updateActions(caseData) {
    const actWrap = document.getElementById('actions-container');
    if (!actWrap) return;
    actWrap.innerHTML = '';

    const canChallenge = this.es.selectedA && this.es.selectedB;
    const challengeBtn = document.createElement('button');
    challengeBtn.className = 'action-btn challenge-action-btn';
    challengeBtn.innerHTML = `<span><i class="fa-lg fa-solid fa fa-bolt"></i> Challenge</span> <small>[${this.es.selectedA?.name || 'A'}+${this.es.selectedB?.name || 'B'}]</small>`;
    challengeBtn.disabled = !canChallenge;
    challengeBtn.onclick = () => {
      if (this.nearestNPC) this._playerChallengedNPC(this.nearestNPC.userData.config, this.es.selectedA?.id, this.es.selectedB?.id);
    };
    actWrap.appendChild(challengeBtn);

    const accuseBtn = document.createElement('button');
    accuseBtn.className = 'action-btn accuse-action-btn';
    accuseBtn.style.borderLeft = '3px solid var(--gold)';
    accuseBtn.style.background = 'rgba(255, 183, 77, 0.1)';
    accuseBtn.innerHTML = `<span><i class="fa-lg fa-solid fa-scale-balanced"></i> Accuse</span> <small>[Verdict]</small>`;
    accuseBtn.onclick = () => {
      this.audio.playUI();
      this.openAccuseModal();
    };
    actWrap.appendChild(accuseBtn);

    if (this.nearestNPC && !this.inDialogue) {
      const n = this.nearestNPC.userData.config;
      const talkBtn = document.createElement('button');
      talkBtn.className = 'action-btn talk-prompt-highlight';
      talkBtn.innerHTML = `<span><i class="fa-lg fa-solid fa-comments"></i> Talk to ${n.name}</span> <small>[E]</small>`;
      talkBtn.onclick = () => this.startDialogue(n);
      actWrap.appendChild(talkBtn);
    }
  }

  openAccuseModal() {
    const caseData = this.cm.getActiveCase();
    if (!caseData) return;
    this.cm.refreshUnlockedSuspects();

    const list = document.getElementById('accuse-suspect-list');
    list.innerHTML = '';

    const prog = this.cm.getCaseProgress(caseData.id);
    const unlockedSuspects = prog?.unlockedSuspects || [];

    caseData.suspects.forEach(s => {
      if (!unlockedSuspects.includes(s.id)) return;
      const status = this.cm.getSuspectStatus(s.id);
      const card = document.createElement('div');
      card.className = 'picker-card';
      card.innerHTML = `
        <span class="picker-icon">${(s.avatar || '').endsWith('.svg') ? `<img src="${s.avatar}" class="icon-svg" loading="lazy">` : (s.avatar || '<img src="assets/gfx/user-duotone.svg" class="icon-svg" loading="lazy">')}</span>
        <span class="picker-name">${s.name}</span>
        <small style="display:block; font-size:0.6rem; opacity:0.7; margin-bottom:4px;">${s.role}</small>
        <div style="font-size:0.65rem; margin-bottom:8px; opacity:0.85;">Status: <strong>${status.status}</strong></div>
        <div style="font-size:0.6rem; margin-bottom:8px; opacity:0.7; line-height:1.3;">${status.notes || ''}</div>
        <button class="terminal-btn" style="width:100%; margin:0;">Accuse</button>
      `;
      card.querySelector('button').onclick = () => {
        this.handleAccusation(s);
      };
      list.appendChild(card);
    });

    document.getElementById('accuse-modal').classList.add('active');
  }

  handleAccusation(suspect) {
    const result = this.cm.submitAccusation(suspect.id);
    document.getElementById('accuse-modal').classList.remove('active');

    if (result.correct) {
      this.audio.playComplete();
      this.controls.displayAlert(`CORRECT: ${suspect.name} identified.`, 5000);
      document.getElementById('end-screen').style.display = 'flex';
      setTimeout(() => document.getElementById('end-screen').style.opacity = '1', 10);
      this.checkChains?.();
      this.checkGameOver?.();
    } else {
      this.audio.playError();
      this.controls.displayAlert(`INCORRECT: ${suspect.name} was not the culprit. (+25 Doubt)`, 4000);
      this.updateHUD(this.cm.getActiveCase());
      this.checkGameOver?.();
    }
  }

  updateChallengeButton() {
    const challengeBtn = document.querySelector('.challenge-action-btn');
    if (challengeBtn) {
      challengeBtn.disabled = !(this.es.selectedA && this.es.selectedB);
      challengeBtn.querySelector('small').textContent = `[${this.es.selectedA?.name || 'A'}+${this.es.selectedB?.name || 'B'}]`;
    }
  }

  checkChains() {
    if (!this.chainManager) return;
    const completed = this.chainManager.checkAllChains();
    completed.forEach(chain => {
      this.showChainComplete(chain);
    });
  }

  checkGameOver() {
    const progress = this.cm.getProgress();
    if (!progress) return false;

    const doubt = progress.doubt || 0;
    if (doubt >= 50) {
      this._showGameOver('doubt');
      return true;
    }

    if (progress.reputations) {
      const reps = Object.values(progress.reputations);
      if (reps.some(r => r <= 0)) {
        this._showGameOver('reputation');
        return true;
      }
    }

    return false;
  }

  _showGameOver(reason) {
    const screen = document.getElementById('game-over-screen');
    const titleEl = document.getElementById('game-over-title');
    const reasonEl = document.getElementById('game-over-reason');
    const iconEl = document.getElementById('game-over-icon');
    
    if (reason === 'doubt') {
      titleEl.textContent = "⚠️ Investigation Failed";
      reasonEl.textContent = "Your doubt has overwhelmed the investigation. The people no longer trust your judgment.";
      if (iconEl) iconEl.innerHTML = "<img src='../assets/gfx/x-circle-duotone.svg' class='icon-svg' loading='lazy'>";
    } else if (reason === 'reputation') {
      titleEl.textContent = "⚠️ Reputation Lost";
      reasonEl.textContent = "Your standing with the community has collapsed. Without trust, you cannot continue.";
      if (iconEl) iconEl.innerHTML = "<img src='../assets/gfx/x-circle-duotone.svg' class='icon-svg' loading='lazy'>";
    } else {
      titleEl.textContent = "⚠️ Game Over";
      reasonEl.textContent = "The investigation has ended.";
    }
    
    screen.style.display = 'flex';
    setTimeout(() => screen.style.opacity = '1', 10);
    if (this.a11y) this.a11y.speak("Game over. The investigation has failed.", 'assertive');
  }

  showChainComplete(chain) {
    const modal = document.getElementById('chain-complete-modal');
    if (!modal) return;
    const title = modal.querySelector('.chain-complete-title');
    const body = modal.querySelector('.chain-complete-body');
    const reward = modal.querySelector('.chain-complete-reward');
    if (title) title.textContent = `Hidden Chain: ${chain.name}`;
    if (body) body.textContent = chain.description || '';
    if (reward) reward.textContent = `Reward: +${chain.bonusPoints} pts, +${chain.bonusFaith} faith — Codex: ${chain.codexEntry}`;
    modal.classList.add('active');
    if (this.a11y) this.a11y.speak(`Hidden detective chain completed: ${chain.name}.`, 'assertive');
  }

  _playerChallengedNPC(npcConfig, idA, idB) {
    const result = this.ns.challenge(npcConfig.id, idA, idB);
    if (result) {
      if (result.breakthrough) {
        this.cm.recordDeduction(result);
        if (result.revealsProphecy) {
          this._revealProphecy(result.revealsProphecy);
        }
        this.updateHUD(this.cm.getActiveCase());
        this.checkChains?.();
      }
      this.controls.displayAlert(result.breakthrough ? "Breakthrough!" : "No contradiction found.");
    }
  }

  updateEvidenceGrid() {
    const grid = document.getElementById('evidence-slots-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const ev = this.collectedEvidence[i];
      const slot = document.createElement('div');
      slot.className = 'evidence-slot-btn' + (ev ? ' filled' : '');
      if (ev) {
        slot.innerHTML = ev.emoji || '🛡️';
        if (this.es.selectedA?.id === ev.id) slot.classList.add('sel-a');
        if (this.es.selectedB?.id === ev.id) slot.classList.add('sel-b');
        slot.onclick = () => {
          this.openEvidenceDetail(ev.id);
          this.es.selectEvidence(ev.id);
          this.updateEvidenceGrid();
          this.updateChallengeButton();
        };
      } else {
        slot.innerHTML = '<i class="fa-lg fa-solid fa-folder"></i>';
      }
      grid.appendChild(slot);
    }
  }

  openPeopleModal() {
    const caseData = this.cm.getActiveCase();
    if (!caseData) return;

    const modal = document.getElementById('people-modal');
    const body = document.getElementById('people-modal-body');

    const npcs = caseData.npcs || [];

    body.innerHTML = `
        <div class="people-list-sidebar">
            ${npcs.map(n => `
                <button class="person-nav-btn" data-npc-id="${n.id}">
                    <span>${(n.avatar || '').endsWith('.svg') ? `<img src="../assets/characters/${n.avatar}" class="icon-svg" loading="lazy">` : (n.avatar || '<img src="assets/gfx/user-duotone.svg" class="icon-svg" loading="lazy">')}</span> ${n.name}
                </button>
            `).join('')}
        </div>
        <div class="person-detail-view" id="person-detail-content">
            <div class="picker-empty">Select a person to review testimony</div>
        </div>
    `;

    body.querySelectorAll('.person-nav-btn').forEach(btn => {
      btn.onclick = () => {
        body.querySelectorAll('.person-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._renderPersonDetailInModal(btn.dataset.npcId);
      };
    });

    this.audio.playUI();
    modal.classList.add('active');
  }

  _renderPersonDetailInModal(npcId) {
    const content = document.getElementById('person-detail-content');
    const npc = this.ns.getNPC(npcId);
    const state = this.ns.getState(npcId);

    if (!npc || !state) return;

    const relatedEvidence = this.collectedEvidence.filter(ev =>
      ev.revealsSuspect === npcId || (npc.unlocksEvidence && npc.unlocksEvidence.includes(ev.id))
    );

    content.innerHTML = `
        <h3 class="modal-title-settings">${(npc.avatar || '').endsWith('.svg') ? `<img src="../assets/characters/${npc.avatar}" class="icon-svg" loading="lazy">` : (npc.avatar || '<img src="assets/gfx/user-duotone.svg" class="icon-svg" loading="lazy">')} ${npc.name}</h3>
        <h4 class="modal-subtitle-custom">${npc.role}</h4>
        <div class="evidence-detail-label" style="margin-top:15px;">Related Evidence</div>
        <div class="picker-grid">
            ${relatedEvidence.map(ev => `<div class="picker-card"><span class="picker-icon">
              <img src="${ev.emoji}" class="icon-svg" loading="lazy">
            </span><span class="picker-name">${ev.name}</span></div>`).join('') || '<small>No evidence linked yet.</small>'}
        </div>
        <div class="evidence-detail-label" style="margin-top:20px;">Conversation Record</div>
        <div class="convo-history-feed">
            ${state.memory.filter(m => m.type === 'talk' || m.type === 'shown_evidence').map(m => `
                <div class="sidebar-chat-entry">
                    <small>${m.type === 'talk' ? (m.speaker || 'Dialog') : 'Clue Review'}</small>
                    <p>${m.reaction || (npc.dialogue[m.mood] || '...')}</p>
                </div>
            `).join('') || '<p class="picker-empty">No conversation recorded.</p>'}
        </div>
    `;
  }

  extractBibleReferences(text) {
    if (!text) return [];
    return Array.from(text.matchAll(/((?:\d\s)?[A-Za-z][^0-9]*\s\d+:\d+)/g)).map(m => m[1].trim());
  }

  openEvidenceDetail(evidenceId) {
    const ev = this.es.getById(evidenceId);
    if (!ev) return;

    const modal = document.getElementById('evidence-detail-modal');

    // Header & Basic Info
    const evIcon = ev.emoji || ev.icon || '';
    modal.querySelector('.evidence-detail-icon').innerHTML = evIcon.includes('<img') ? evIcon : (evIcon.endsWith('.svg') ? `<img src="${evIcon}" class="icon-svg" loading="lazy">` : evIcon || '<img src="assets/gfx/shield-duotone.svg" class="icon-svg" loading="lazy">');
    modal.querySelector('.evidence-detail-name').textContent = ev.name;
    modal.querySelector('.evidence-detail-type').textContent = ev.type || 'Physical';
    modal.querySelector('.evidence-detail-desc').textContent = ev.desc || ev.description || 'No description available.';

    const locationEl = modal.querySelector('.evidence-detail-location');
    const locationSection = locationEl?.closest('.evidence-detail-section');
    if (ev.location) {
      locationEl.textContent = ev.location;
      if (locationSection) locationSection.hidden = false;
    } else {
      if (locationSection) locationSection.hidden = true;
    }

    const noteEl = modal.querySelector('.evidence-detail-investigator-note');
    const noteSection = noteEl?.closest('.evidence-detail-section');
    if (ev.investigatorNote || ev.notes) {
      noteEl.textContent = ev.investigatorNote || ev.notes;
      if (noteSection) noteSection.hidden = false;
    } else {
      if (noteSection) noteSection.hidden = true;
    }

    // Prophecy Section
    const bibleRefArea = document.getElementById('detail-prophecy-area');
    const fulfillmentArea = document.getElementById('detail-fulfillment-area');
    const hasBible = !!ev.bibleRef;
    const hasProphecy = !!ev.propheticLink;

    if (hasBible || hasProphecy) {
      if (hasBible) {
        bibleRefArea.hidden = false;
        modal.querySelector('.evidence-detail-bible-ref').textContent = ev.bibleRef || '---';
        modal.querySelector('.prophecy-read-more-container').innerHTML = '';
        modal.querySelector('.verse-content[data-target="bible-verse-content"]').hidden = true;
        modal.querySelector('.verse-content[data-target="bible-verse-content"]').innerHTML = '';

        const bibleContainer = modal.querySelector('.bible-read-more-container');
        if (bibleContainer) {
          bibleContainer.innerHTML = '';
          const bibleRefs = (ev.bibleRefs && ev.bibleRefs.length > 0) ? ev.bibleRefs.map(r => r.ref) : this.extractBibleReferences(ev.bibleRef);
          const bibleVerseContent = modal.querySelector('.verse-content[data-target="bible-verse-content"]');
          bibleRefs.forEach(ref => {
            const btn = document.createElement('button');
            btn.className = 'read-more-btn';
            btn.innerHTML = `<img src="assets/gfx/book-open-duotone.svg" class="icon-svg" loading="lazy"> Read ${ref}`;
            btn.onclick = () => this.fetchVerseInline(ref, bibleVerseContent, btn);
            bibleContainer.appendChild(btn);
          });
        }
      } else {
        bibleRefArea.hidden = true;
      }

      if (hasProphecy) {
        fulfillmentArea.hidden = false;
        modal.querySelector('.evidence-detail-prophetic-link').textContent = ev.propheticLink || '---';
        modal.querySelector('.prophecy-read-more-container').innerHTML = '';
        modal.querySelector('.verse-content[data-target="prophecy-verse-content"]').hidden = true;
        modal.querySelector('.verse-content[data-target="prophecy-verse-content"]').innerHTML = '';

        const prophetContainer = modal.querySelector('.prophecy-read-more-container');
        if (prophetContainer) {
          prophetContainer.innerHTML = '';
          const propheticRefs = (ev.propheticRefs && ev.propheticRefs.length > 0) ? ev.propheticRefs.map(r => r.ref) : this.extractBibleReferences(ev.propheticLink);
          const prophetVerseContent = modal.querySelector('.verse-content[data-target="prophecy-verse-content"]');
          propheticRefs.forEach(ref => {
            const btn = document.createElement('button');
            btn.className = 'read-more-btn';
            btn.innerHTML = `<img src="assets/gfx/book-open-duotone.svg" class="icon-svg" loading="lazy"> Read ${ref}`;
            btn.onclick = () => this.fetchVerseInline(ref, prophetVerseContent, btn);
            prophetContainer.appendChild(btn);
          });
        }
      } else {
        fulfillmentArea.hidden = true;
      }
    } else {
      bibleRefArea.hidden = true;
      fulfillmentArea.hidden = true;
    }

    document.getElementById('btn-open-codex-from-detail').onclick = () => {
      modal.classList.remove('active');
      this.showEvidenceCodex(ev.id);
    };

    this.audio.playUI();
    modal.classList.add('active');
  }

  async fetchVerseInline(refString, targetEl, btnEl) {
    targetEl.innerHTML = `<span style="font-size:0.8rem; opacity:0.7;">Fetching verse...</span>`;
    targetEl.hidden = false;
    try {
      const parts = refString.match(/((?:\d\s)?[A-Za-z][^0-9]*)\s(\d+):(\d+)/);
      if (!parts) throw new Error('Could not parse reference');
      const apiRef = `${parts[1].toLowerCase().replace(/\s/g, '')}+${parts[2]}:${parts[3]}`;
      const r = await fetch(`https://bible-api.com/${apiRef}?translation=web`);
      const j = await r.json();
      targetEl.innerHTML = `<div style="margin-bottom:8px;">"${j.verses[0].text}"</div>
        <button class="read-more-btn" style="width:100%" onclick="window.BibleReader.displayPassage('${j.id}')"><img src="assets/gfx/book-open-duotone.svg" class="icon-svg" loading="lazy"> Read Full Passage</button>`;
      this.audio.playClue();
    } catch (err) {
      targetEl.innerHTML = `Could not load verse.`;
    }
  }

  showEvidenceCodex(evidenceId = null) {
    const modal = document.getElementById('codex-modal');
    if (evidenceId) this.es.selectedCodexEvidenceId = evidenceId;
    this.renderCodexMatcherContent();
    this.audio.playUI();
    modal.classList.add('active');
  }

  renderCodexMatcherContent() {
    this.renderCodexEvidenceGrid();
    this.renderCodexProphecyGrid();
    this.renderCodexDiscoveredGrid();
    this.updateCodexMatchUI();
    this.updateCodexFeedback();

    const matchBtn = document.getElementById('btn-match-prophecy');
    if (matchBtn) {
      matchBtn.onclick = () => {
        this.audio.playUI();
        const result = this.es.attemptProphecyMatch();
        if (result) {
          this.controls.displayAlert(result.message);
          if (result.success) {
            this.es.selectedCodexEvidenceId = null;
            this.es.selectedCodexProphecyId = null;
            this.renderCodexMatcherContent();
            this.checkChains?.();
          }
        }
      };
    }
  }

  renderCodexEvidenceGrid() {
    const grid = document.getElementById('codex-evidence-grid');
    const collected = this.es.getCollected();
    grid.innerHTML = collected.map(e => `
      <button class="picker-card ${this.es.selectedCodexEvidenceId === e.id ? 'selected-a' : ''}" 
              onclick="window.gameEngine.es.selectedCodexEvidenceId='${e.id}'; window.gameEngine.renderCodexMatcherContent();">
        <img src='${e.icon}' class='icon-svg' loading='lazy'> ${e.name}
      </button>`).join("");
  }

  renderCodexProphecyGrid() {
    const grid = document.getElementById('codex-prophecy-grid');
    if (!grid) return;
    const props = this.es.getPropheciesWithStatus();
    
    grid.innerHTML = props.map(p => {
      const status = p.status || 'unseen';
      const isComplete = status === 'complete';
      const isFound = status === 'found_scripture';
      const isRumor = status === 'rumor';
      
      let badge = '';
      let cardClass = 'picker-card';
      if (isComplete) {
        badge = '<i class=\"fa-lg fa-solid fa-circle-check\"></i>';
        cardClass += ' complete';
      } else if (isFound) {
        badge = '<i class=\"fa-lg fa-solid fa-scroll\"></i>';
        cardClass += ' found';
      } else if (isRumor) {
        badge = '<i class=\"fa-lg fa-solid fa-question\"></i>';
        cardClass += ' rumor';
      } else {
        badge = '<i class=\"fa-lg fa-solid fa-lock\"></i>';
        cardClass += ' unseen';
      }
      
      const displayRef = isComplete || isFound ? p.reference : '???';
      const displayText = isComplete ? (p.fulfilledBy || '').substring(0, 60) + '...' : 
                          isFound ? (p.text || '').substring(0, 60) + '...' :
                          isRumor ? 'A rumor heard in conversation...' : 'Not yet discovered';
      
      return `
        <button class=\"${cardClass} ${this.es.selectedCodexProphecyId === p.id ? 'selected-b' : ''}\" 
                ${isComplete ? 'disabled' : ''}
                onclick=\"window.gameEngine.es.selectedCodexProphecyId='${p.id}'; window.gameEngine.renderCodexMatcherContent();\">
          ${badge} ${displayRef}
        </button>
        <div class=\"prophecy-card-desc\">${displayText}</div>
      `;
    }).join('');
  }

  renderCodexDiscoveredGrid() {
    const grid = document.getElementById('codex-discovered-grid');
    if (!grid) return;
    const discovered = this.es.getPropheciesWithStatus().filter(p => p.status === 'complete');

    grid.innerHTML = discovered.length === 0
      ? `<p class=\"picker-empty\">No prophecies completed yet. Link scripture to fulfillment evidence in the Lab.</p>`
      : discovered.map(p => `
          <div class=\"prophecy-card complete\">
            <div class=\"prophecy-card-icon\"><img src=\"../assets/gfx/scroll-duotone.svg\" class=\"icon-svg\" loading=\"lazy\"/></div>
            <div class=\"prophecy-card-reference\">${p.reference}</div>
            <div class=\"prophecy-card-desc\">${(p.fulfilledBy || p.desc || '').substring(0, 60)}...</div>
          </div>
        `).join('');
  }

  updateCodexFeedback() {
    const fbEl = document.getElementById('codex-feedback');
    if (!fbEl) return;
    // If your EvidenceSystem supports match feedback, render it here
    if (this.es.lastMatchResult) {
      const fb = this.es.lastMatchResult;
      fbEl.innerHTML = `<div class="codex-feedback-msg ${fb.success ? 'success' : 'error'}">${fb.message}</div>`;
    } else {
      fbEl.innerHTML = '';
    }
  }

  updateCodexMatchUI() {
    const selectedEv = this.es.selectedCodexEvidenceId ? this.es.getById(this.es.selectedCodexEvidenceId) : null;
    const selectedProp = this.es.selectedCodexProphecyId ? this.es.getProphecyById(this.es.selectedCodexProphecyId) : null;

    const evSlot = document.getElementById('codex-evidence-slot');
    const propSlot = document.getElementById('codex-prophecy-slot');
    const matchBtn = document.getElementById('btn-match-prophecy');

    if (evSlot) {
      evSlot.className = 'selection-slot' + (selectedEv ? ' active' : '');
      evSlot.innerHTML = selectedEv ? `<span>${selectedEv.emoji || '🛡️'} ${selectedEv.name}</span>` : '<span>Select Evidence...</span>';
    }
    if (propSlot) {
      propSlot.className = 'selection-slot' + (selectedProp ? ' active' : '');
      propSlot.innerHTML = selectedProp ? `<span>📜 ${selectedProp.reference}</span>` : '<span>Select Prophecy...</span>';
    }
    if (matchBtn) {
      matchBtn.disabled = !(selectedEv && selectedProp);
    }

    const previewEl = document.getElementById('codex-evidence-preview');
    if (selectedEv) {
      previewEl.hidden = false;
      document.getElementById('codex-preview-name').textContent = `${selectedEv.emoji || '🛡️'} ${selectedEv.name}`;
      document.getElementById('codex-preview-desc').textContent = selectedEv.desc || selectedEv.description || 'No notes available.';
    } else {
      previewEl.hidden = true;
    }
  }

  startDialogue(npcConfig) {
    const storyData = this.dm.getStory(npcConfig.id);

    if (storyData) {
      const story = this.dm.createStory(npcConfig.id);
      if (!story && !storyData.start) {
        console.warn('[startDialogue] No valid story for NPC:', npcConfig.id);
        return;
      }
      this.inDialogue = true;
      this.pVelocity.set(0, 0, 0);

      // Capture dialogue into NPC memory for the people-modal instead of the sidebar
      const originalAddMsg = this.dm.addMsg.bind(this.dm);
      const self = this;
      this.dm.addMsg = function (text, type) {
        originalAddMsg(text, type);
        if (type === 'npc' || type === 'player') {
          self.ns._addMemory(npcConfig.id, {
            type: 'talk',
            reaction: text,
            speaker: type === 'npc' ? npcConfig.name : 'You'
          });
        }
      };

      this.dm.openDialogue(npcConfig, story, () => {
        // Restore original addMsg
        this.dm.addMsg = originalAddMsg;
        if (npcConfig.unlocksEvidence) npcConfig.unlocksEvidence.forEach(id => this._unlockEvidence(id));
        if (npcConfig.revealsProphecy) {
          this._revealProphecy(npcConfig.revealsProphecy);
        }
        this.inDialogue = false;
        this.updateActions(this.cm.getActiveCase());
      }, (tag) => {
        if (tag.startsWith('reveal:')) this._unlockEvidence(tag.split(':')[1]);
      });
    } else if (npcConfig.hasDialogue || npcConfig.dialogueId) {
      // Fallback to simple talk when no Ink story is available
      const result = this.ns.talk(npcConfig.id);
      if (result) {
        this.inDialogue = true;
        this.pVelocity.set(0, 0, 0);
        this.controls.displayAlert(result.text);
        if (result.unlocksEvidence) {
          result.unlocksEvidence.forEach(id => this._unlockEvidence(id));
        }
        this.inDialogue = false;
        this.updateActions(this.cm.getActiveCase());
      }
    }
  }

  _unlockEvidence(evidenceId) {
    const id = (typeof evidenceId === 'object') ? evidenceId.clueId : evidenceId;
    const ev = this.lockedEvidence[id];
    if (!ev || this.es.isCollected(id) || !ev.pos) return;

    delete this.lockedEvidence[id];
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x00ffaa, emissive: 0x00ffaa, emissiveIntensity: 0.8 })
    );
    // ev.pos is [x, y_offset, z]. Add 0.5 for the sphere's radius to sit on the surface.
    const finalYOffset = ev.pos[1] + 0.5;
    const pos = this._projectToSurface(ev.pos[0], finalYOffset, ev.pos[2]);
    sphere.position.copy(pos);
    this._alignToSurface(sphere);

    sphere.userData = { dataRef: ev, newlyUnlocked: true };
    this.evidenceMeshes.push(sphere);

    // Add a glowing halo to evidence items to match the NPC visual style
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(0.6, 0.8, 32),
      new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    );
    // Positioned slightly above the ground to be visible but distinct from NPC halos
    halo.position.set(0, 1.2, 0);
    halo.lookAt(0, 100, 0);
    sphere.add(halo);

    this.controls.displayAlert(`Evidence revealed: ${ev.name} <a href="#" id="evidence-alert-link" data-evidence-id="${ev.id}" style="color:#00f5d4;text-decoration:underline;margin-left:8px;">View details</a>`);
  }

  collectEvidence() {
    for (let i = this.evidenceMeshes.length - 1; i >= 0; i--) {
      const item = this.evidenceMeshes[i];
      // Must get World Position because items are parented to the scaled globe
      const itemWorldPos = new THREE.Vector3();
      item.getWorldPosition(itemWorldPos);

      if (this.pPos.distanceTo(itemWorldPos) < 2.5) {
        const data = item.userData.dataRef;
        const unlocked = this.es.unlock(data.id);
        if (unlocked) {
          this.collectedEvidence.push(unlocked);
          this.showEvidencePopup(unlocked.name, unlocked.desc || '', unlocked.emoji);
          this.advanceQuest(1);
          this.controls.displayAlert(`Evidence collected: ${unlocked.name} <a href="#" id="evidence-alert-link" data-evidence-id="${unlocked.id}" style="color:#00f5d4;text-decoration:underline;margin-left:8px;">View details</a>`);

          // Unlock suspect if associated with this evidence
          if (unlocked.revealsSuspect) {
            this.cm.unlockSuspect(unlocked.revealsSuspect);
          }
        }
        this.scene.remove(item);
        this.evidenceMeshes.splice(i, 1);
        this.audio.playCollect();
        this.updateEvidenceGrid();
      }
    }
  }

  advanceQuest(amount) {
    const caseData = this.cm.getActiveCase();
    caseData.quest.cur = Math.min(caseData.quest.tar, caseData.quest.cur + amount);
    this.updateHUD(caseData);
  }

  showEvidencePopup(title, desc, emoji) {
    document.getElementById('popup-evidence-title').innerHTML = `<i class="fa-lg fa-solid fa-file-shield"></i> ${emoji || ''} ${title}`;
    document.getElementById('popup-evidence-body').innerText = desc;
    document.getElementById('evidence-popup-card').style.display = 'block';
  }

  movePlayer() {
    // 1. Calculate the 'Up' vector (surface normal)
    const up = this.pPos.clone().normalize();

    const move = new THREE.Vector3();

    // 2. Calculate movement directions relative to the sphere's surface
    // Forward is the projection of camera forward onto the tangent plane
    const camFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const dot = camFwd.dot(up);
    const moveFwd = camFwd.clone().sub(up.clone().multiplyScalar(dot)).normalize();
    const moveRgt = new THREE.Vector3().crossVectors(up, moveFwd);

    const keys = this.controls.keys;
    // Fixed movement directions (swapped A/D) and reduced speeds
    if (keys['KeyW'] || keys['ArrowUp']) move.add(moveFwd);
    if (keys['KeyS'] || keys['ArrowDown']) move.sub(moveFwd);
    if (keys['KeyA'] || keys['ArrowLeft']) move.add(moveRgt);
    if (keys['KeyD'] || keys['ArrowRight']) move.sub(moveRgt);

    // Jump Logic: Triggered by Space or mapped Mobile Center Button
    if (keys['Space'] && this.isGrounded) {
      this.pVelocity.addScaledVector(up, 16);
      this.isGrounded = false;
      if (this.audio) this.audio.playUI(); // Play feedback sound
    }

    if (move.lengthSq() > 0) this.mouseTarget = null;
    if (this.mouseTarget) {
      const toTarget = this.mouseTarget.clone().sub(this.pPos).projectOnPlane(up);
      if (toTarget.length() > 1.5) {
        move.add(toTarget.normalize());
      } else {
        this.mouseTarget = null;
      }
    }

    if (move.length() > 0) {
      move.normalize();
      this.camHeading.lerp(move, 0.05).normalize();
      const speed = 12;
      // Preserve vertical (radial) velocity so jumping isn't cancelled by movement
      const verticalVel = this.pVelocity.dot(up);
      const targetVel = move.multiplyScalar(speed).addScaledVector(up, verticalVel);
      this.pVelocity.copy(targetVel);
    }
    else {
      // Apply friction damping when no keys are pressed
      const friction = this.isGrounded ? 0.75 : 0.98;
      this.pVelocity.multiplyScalar(friction);

      if (this.isGrounded) {
        // Kill tangential drift faster when standing
        const tangentVel = this.pVelocity.clone().sub(up.clone().multiplyScalar(this.pVelocity.dot(up)));
        if (tangentVel.length() < 0.5) {
          this.pVelocity.set(0, 0, 0);
        }
      }
    }

    // 3. Spherical Gravity & Grounding
    const gravityStrength = 42;
    // Apply gravity force towards center (0,0,0)
    this.pVelocity.addScaledVector(up, -gravityStrength * (1 / 60));

    // Integrator
    this.pPos.addScaledVector(this.pVelocity, 1 / 60);

    const currentDist = this.pPos.length();
    const groundThreshold = this.surfaceRadius + 1.1;
    if (currentDist <= groundThreshold) {
      if (!this.isGrounded) {
        // Dispatch landing event for VFXSystem to catch and show dirt.svg
        window.dispatchEvent(new CustomEvent('playerLand', {
          detail: { position: this.pPos.clone(), up: up.clone() }
        }));
      }
      this.pPos.setLength(this.surfaceRadius + 1.1);
      this.isGrounded = true;
      // Zero out velocity components pointing into the planet
      const normalVelocity = this.pVelocity.dot(up);
      if (normalVelocity < 0) this.pVelocity.sub(up.clone().multiplyScalar(normalVelocity));
    } else {
      this.isGrounded = false;
    }

    // World Collision (3D/Mesh Colliders)
    const playerRadius = 1.2;
    const handleCollision = (obj) => {
      if (!obj.userData || !obj.userData.collisionRadius) return;
      const objPos = new THREE.Vector3();
      obj.getWorldPosition(objPos);
      const dist = this.pPos.distanceTo(objPos);
      const minDist = obj.userData.collisionRadius + playerRadius;
      if (dist < minDist) {
        const pushDir = this.pPos.clone().sub(objPos).projectOnPlane(up).normalize();
        this.pPos.addScaledVector(pushDir, minDist - dist);
        this.pVelocity.projectOnPlane(pushDir); // Simple physics sliding
      }
    };
    this.worldObjects.forEach(handleCollision);
    this.npcMeshes.forEach(npc => {
      npc.userData.collisionRadius = 1.5;
      handleCollision(npc);
    });

    // 4. Update Mesh Orientation
    this.playerMesh.position.copy(this.pPos);
    this.playerMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);

    // 5. Update Camera
    const camOffset = up.clone().multiplyScalar(12).add(this.camHeading.clone().multiplyScalar(-25));
    const desiredCamPos = this.pPos.clone().add(camOffset);

    // Camera Raycast Collider
    const rayStart = this.pPos.clone().add(up.clone().multiplyScalar(1.5));
    const rayDir = desiredCamPos.clone().sub(rayStart).normalize();
    const rayDist = rayStart.distanceTo(desiredCamPos);

    const raycaster = new THREE.Raycaster(rayStart, rayDir, 0.1, rayDist);
    raycaster.camera = this.camera; // Required for raycasting against sprites in worldObjects
    const collidables = [...this.worldObjects, this.groundSphere];
    const hits = raycaster.intersectObjects(collidables, true);

    let finalCamPos = desiredCamPos;
    if (hits.length > 0) {
      // Move camera to the first hit point, pulled back slightly to avoid clipping
      finalCamPos = hits[0].point.clone().sub(rayDir.clone().multiplyScalar(1.0));
    }

    // Strict Planet Boundary Check
    const minSafeDist = this.surfaceRadius + 2.5;
    if (finalCamPos.length() < minSafeDist) {
      finalCamPos.setLength(minSafeDist);
    }

    this.camera.up.copy(up); // Crucial: camera stays upright relative to planet
    this.camera.position.lerp(finalCamPos, 0.08); // Slightly faster lerp for responsive collision
    this.camera.lookAt(this.pPos);
  }

  findNPC() {
    let closest = null, minDist = 25;
    const playerWorldPos = new THREE.Vector3();
    this.playerMesh.getWorldPosition(playerWorldPos);
    this.npcMeshes.forEach(npc => {
      const npcWorldPos = new THREE.Vector3();
      npc.getWorldPosition(npcWorldPos);
      const d = playerWorldPos.distanceTo(npcWorldPos);
      if (d < minDist) { minDist = d; closest = npc; }
    });
    if (closest !== this.nearestNPC) {
      this.nearestNPC = closest;
      this.updateActions(this.cm.getActiveCase());
      this.updateInteractButton();
    }
    if (this.nearestNPC && minDist < 2) this.pPos.addScaledVector(this.pVelocity, -2 / 60);
  }

  updateInWorldTags() {
    const npcPrompt = document.getElementById('inworld-npc-prompt');
    if (this.nearestNPC && !this.inDialogue) {
      // Only update DOM contents and handlers if the target NPC has changed
      if (this._lastTaggedNPC !== this.nearestNPC) {
        this._lastTaggedNPC = this.nearestNPC;
        const npcBtn = document.getElementById('inworld-npc-btn');
        const npcName = this.nearestNPC.userData.config?.name || 'NPC';
        npcBtn.innerHTML = `<i class="fa-solid fa-comments"></i> Talk to <strong>${npcName}</strong> <small>[E]</small>`;

        // Re-bind only once per target change to ensure click reliability
        npcBtn.onclick = (e) => {
          e.stopPropagation();
          this.startDialogue(this.nearestNPC.userData.config);
        };
      }

      // Use World Position because NPCs are children of the scaled globe
      const npcWorldPos = new THREE.Vector3();
      this.nearestNPC.getWorldPosition(npcWorldPos);
      const screenPos = npcWorldPos.project(this.camera);
      const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (screenPos.y * -0.5 + 0.5) * window.innerHeight;
      npcPrompt.style.left = `${x}px`;
      npcPrompt.style.top = `${y}px`;
      npcPrompt.style.display = 'flex';
    } else {
      this._lastTaggedNPC = null;
      npcPrompt.style.display = 'none';
    }

    const collPrompt = document.getElementById('inworld-collectable-prompt');
    let nearestItem = null;
    let minDist = 6.5;
    this.evidenceMeshes.forEach(item => {
      const itemWorldPos = new THREE.Vector3();
      item.getWorldPosition(itemWorldPos);
      const d = this.pPos.distanceTo(itemWorldPos);
      if (d < minDist) { minDist = d; nearestItem = item; }
    });

    if (nearestItem && minDist > 2) {
      const itemWorldPos = new THREE.Vector3();
      nearestItem.getWorldPosition(itemWorldPos);
      const screenPos = itemWorldPos.project(this.camera);
      const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (screenPos.y * -0.5 + 0.5) * window.innerHeight;
      collPrompt.style.left = `${x}px`;
      collPrompt.style.top = `${y}px`;
      collPrompt.style.display = 'flex';
      const data = nearestItem.userData.dataRef;
      document.getElementById('inworld-collectable-msg').innerHTML = (nearestItem.userData.newlyUnlocked ? '<img src="assets/gfx/sparkles-duotone.svg" class="icon-svg" loading="lazy"> NEW — ' : '') + (data.name || 'NEARBY COLLECTABLE');
    } else {
      collPrompt.style.display = 'none';
    }
  }

  updateMinimap() {
    const container = document.getElementById('minimap-blips-container');
    if (!container) return;
    container.innerHTML = '';
    const offset = 55, scale = 0.55;

    const up = this.pPos.clone().normalize();
    const fwd = this.camHeading.clone().normalize();
    const rgt = new THREE.Vector3().crossVectors(up, fwd);

    this.npcMeshes.forEach(npc => {
      // Use World Position because NPCs are parented to the scaled worldEarth
      const npcWorldPos = new THREE.Vector3();
      npc.getWorldPosition(npcWorldPos);
      const rel = npcWorldPos.sub(this.pPos);
      const dist = rel.length();
      if (dist > 100) return;

      const dx = rel.dot(rgt);
      const dz = -rel.dot(fwd);

      const blip = document.createElement('div');
      blip.className = 'minimap-blip npc';
      blip.style.left = (offset + dx * scale) + 'px';
      blip.style.top = (offset + dz * scale) + 'px';
      container.appendChild(blip);
    });

    // Add distinctive blips for uncollected evidence
    this.evidenceMeshes.forEach(item => {
      const itemWorldPos = new THREE.Vector3();
      item.getWorldPosition(itemWorldPos);
      const rel = itemWorldPos.clone().sub(this.pPos);
      if (rel.length() > 100) return;

      const dx = rel.dot(rgt);
      const dz = -rel.dot(fwd);

      const blip = document.createElement('div');
      blip.className = 'minimap-blip evidence';
      blip.style.left = (offset + dx * scale) + 'px';
      blip.style.top = (offset + dz * scale) + 'px';
      container.appendChild(blip);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (!this.inDialogue) {
      this.movePlayer();
      this.findNPC();
      this.collectEvidence();
      this.updateMinimap();
      this.updateInWorldTags();
      this._updateEffects();
      if (this.vfx) this.vfx.update(1 / 60, this.pPos, this.pVelocity, this.isGrounded);
    }
    if (this.envManager) this.envManager.update(this.controls.autoCycle, this.pPos);
    this.renderer.render(this.scene, this.camera);
  }
}