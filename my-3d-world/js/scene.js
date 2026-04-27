import * as THREE from '../lib/three.module.js';
import { config } from './config.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = null; // Sky dome provides background

// Add subtle atmospheric fog
scene.fog = new THREE.FogExp2(0x87ceeb, 0.0005);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 10000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Loading screen
const loadingDiv = document.createElement('div');
loadingDiv.style.position = 'fixed';
loadingDiv.style.top = '0';
loadingDiv.style.left = '0';
loadingDiv.style.width = '100%';
loadingDiv.style.height = '100%';
loadingDiv.style.backgroundColor = config.loading.background;
loadingDiv.style.display = 'flex';
loadingDiv.style.flexDirection = 'column';
loadingDiv.style.alignItems = 'center';
loadingDiv.style.justifyContent = 'center';
loadingDiv.style.zIndex = '1000';
loadingDiv.innerHTML = `
  <img src="${config.icons.loading}" alt="Loading" style="width: 100px; height: 100px;">
  <p class="luxurious-roman-regular" style="color: ${config.loading.color}; font-size: 24px; margin-top: 20px;">${config.loading.text}</p>
`;
document.body.appendChild(loadingDiv);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 5);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
scene.add(light);

// Ambient light (soft fill)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

export { scene, camera, renderer, loadingDiv, config, light, ambientLight };