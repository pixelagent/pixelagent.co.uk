import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.js';
import { config } from './config.js';

// Toon Shader for the world (earth)
const toonVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const toonFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  uniform vec3 uLightDirection;
  uniform vec3 uBaseColor;
  uniform vec3 uShadowColor;
  uniform vec3 uHighlightColor;
  uniform float uRampLevels;
  
  void main() {
    // Calculate diffuse lighting
    float diffuse = dot(vNormal, normalize(uLightDirection));
    
    // Toon ramp (quantize lighting)
    float ramp = floor((diffuse * 0.5 + 0.5) * uRampLevels) / (uRampLevels - 1.0);
    
    // Blend colors based on lighting
    vec3 color = mix(uShadowColor, uBaseColor, ramp);
    color = mix(color, uHighlightColor, smoothstep(0.8, 1.0, diffuse));
    
    // Simple atmospheric falloff (darker at poles)
    float poleFalloff = abs(vNormal.y);
    color = mix(color * 0.85, color, poleFalloff);
    
    // Specular highlight (cel-style)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 reflectDir = reflect(-uLightDirection, vNormal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    spec = floor(spec * 2.0) / 2.0; // Quantize specular
    color += spec * vec3(0.3, 0.3, 0.35);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

let world;
let worldToonMaterial;

export function initWorld(scene) {
  // Create toon shader material for the earth
  worldToonMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uLightDirection: { value: new THREE.Vector3(5, 10, 5).normalize() },
      uBaseColor: { value: new THREE.Color(config.toon.baseColor || 0x4a86e8) }, // Blue base
      uShadowColor: { value: new THREE.Color(config.toon.shadowColor || 0x2d5a9e) }, // Dark blue shadow
      uHighlightColor: { value: new THREE.Color(config.toon.highlightColor || 0x6ba3f2) }, // Light blue highlight
      uRampLevels: { value: config.toon.rampLevels }
    },
    vertexShader: toonVertexShader,
    fragmentShader: toonFragmentShader,
    side: THREE.DoubleSide
  });
  // Create stylized gradient sky (dome)
  const skyRadius = config.world.planetRadius * 80; // Much larger than earth
  const skyGeometry = new THREE.SphereGeometry(skyRadius, 64, 32);
  const skyMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uHorizonColor: { value: new THREE.Color(0x87ceeb) }, // Sky blue
      uZenithColor: { value: new THREE.Color(0x2d5a9e) }, // Deep blue
      uSunDirection: { value: new THREE.Vector3(5, 10, 5).normalize() }
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      void main() {
        vPosition = position;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      uniform vec3 uHorizonColor;
      uniform vec3 uZenithColor;
      uniform vec3 uSunDirection;
      
      void main() {
        // Normalized vertical position (-1 to 1)
        float y = normalize(vWorldPosition).y;
        
        // Gradient from horizon to zenith
        float gradient = y * 0.5 + 0.5;
        gradient = pow(gradient, 1.5);
        
        vec3 color = mix(uHorizonColor, uZenithColor, gradient);
        
        // Stylized sun glow
        float sunDot = dot(normalize(vWorldPosition), normalize(uSunDirection));
        float sunGlow = pow(max(sunDot, 0.0), 8.0);
        color += vec3(1.0, 0.9, 0.7) * sunGlow * 0.5;
        
        // Add subtle banding/cel effect to sky
        float bands = floor(gradient * 4.0) / 4.0;
        color = mix(color, mix(uHorizonColor, uZenithColor, bands), 0.3);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false
  });
  const skyDome = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(skyDome);

  // Create stylized sun/moon directional indicator (decorative)
  const sunRadius = config.world.planetRadius * 0.4;
  const sunGeometry = new THREE.SphereGeometry(sunRadius, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffdd88
  });
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  const sunDistance = config.world.planetRadius * 12;
  sunMesh.position.set(sunDistance, sunDistance * 0.8, sunDistance);
  scene.add(sunMesh);

  // Create simple star points for atmosphere
  const starCount = 200;
  const starRadius = config.world.planetRadius * 15; // Relative to planet size
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const radius = config.world.planetRadius * 40 + Math.random() * config.world.planetRadius * 30;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = radius * Math.cos(phi);
    starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    
    const brightness = 0.5 + Math.random() * 0.5;
    starColors[i * 3] = brightness;
    starColors[i * 3 + 1] = brightness;
    starColors[i * 3 + 2] = brightness + 0.2;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  const starMaterial = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.6
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Load the earth model - try GLTF first, then fallback to procedural sphere with toon shader
  const worldLoader = new GLTFLoader();
  worldLoader.load(config.world.earth, (gltf) => {
    world = gltf.scene;
    
    // Apply toon shader to all earth mesh children
    const toonMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uLightDirection: { value: new THREE.Vector3(5, 10, 5).normalize() },
        uBaseColor: { value: new THREE.Color(config.toon.baseColor || 0x3a8fc4) },
        uShadowColor: { value: new THREE.Color(config.toon.shadowColor || 0x1e5a7d) },
        uHighlightColor: { value: new THREE.Color(config.toon.highlightColor || 0x5ab3d9) },
        uRampLevels: { value: config.toon.rampLevels }
      },
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      side: THREE.DoubleSide
    });
    
    world.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.geometry.computeVertexNormals();
        // Replace material with toon shader
        child.material = toonMaterial;
      }
    });
    
    const box = new THREE.Box3().setFromObject(world);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = (config.world.planetRadius * config.world.earthScale) / maxDim;
    world.scale.setScalar(scale);
    // Add outline effect to earth
    const outlineGeometry = world.geometry.clone();
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: config.toon.outlineColor,
      side: THREE.BackSide
    });
    const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);
    outlineMesh.scale.setScalar(config.toon.outlineWidth);
    outlineMesh.userData.isOutline = true;
    world.add(outlineMesh);
    
    scene.add(world);

    // Add some objects on the earth
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const boxMat = new THREE.MeshToonMaterial({ 
      color: 0xff4444,
      gradientMap: createToonGradient()
    });
    const testBox = new THREE.Mesh(boxGeo, boxMat);
    testBox.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    const boxOrigin = new THREE.Vector3(10, 100, 0);
    const raycaster = new THREE.Raycaster();
    const down = new THREE.Vector3(0, -1, 0);
    raycaster.set(boxOrigin, down);
    const boxHits = raycaster.intersectObject(world, true);
    if (boxHits.length > 0) {
      testBox.position.copy(boxHits[0].point);
      const normal = boxHits[0].face.normal.clone();
      normal.transformDirection(boxHits[0].object.matrixWorld);
      testBox.up.copy(normal);
      testBox.lookAt(testBox.position.clone().add(normal));
    } else {
      testBox.position.set(10, 20, 0);
    }
    testBox.userData.isOutline = true; // Mark as outlined object
    scene.add(testBox);
  }, undefined, (error) => {
    console.log('GLTF load failed, using procedural sphere with toon shader:', error);
    // Fallback: create a procedural sphere with toon shader
    createProceduralToonEarth(scene);
  });
}

export function stickPlayerToTerrain(player) {
  if (!world || !player) return;
  const origin = player.position.clone();
  origin.y += config.physics.raycastOffset;
  const raycaster = new THREE.Raycaster();
  const down = new THREE.Vector3(0, -1, 0);
  raycaster.set(origin, down);
  const hits = raycaster.intersectObject(world, true);
  // Filter out outline meshes from raycast results
  const validHits = hits.filter(hit => !hit.object.userData.isOutline);
  if (validHits.length > 0) {
    const hitPoint = validHits[0].point;
    player.position.copy(hitPoint);
    const normal = validHits[0].face.normal.clone();
    normal.transformDirection(validHits[0].object.matrixWorld);
    const targetQuat = new THREE.Quaternion().setFromUnitVectors(
      player.up,
      normal
    );
    player.quaternion.premultiply(targetQuat);
    player.up.copy(normal);
  }
}

// Helper: Create toon gradient map for MeshToonMaterial
function createToonGradient() {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 4, 0);
  gradient.addColorStop(0, '#000000');
  gradient.addColorStop(0.5, '#444444');
  gradient.addColorStop(1, '#ffffff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 4, 1);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Fallback: Create procedural toon earth sphere
function createProceduralToonEarth(scene) {
  const geometry = new THREE.SphereGeometry(config.world.planetRadius, 64, 64);
  
  // Rotate to match typical globe orientation
  geometry.rotateY(Math.PI);
  geometry.rotateX(0.2);
  
  const material = worldToonMaterial;
  const earthMesh = new THREE.Mesh(geometry, material);
  earthMesh.castShadow = true;
  earthMesh.receiveShadow = true;
  
  // Add outline effect
  const outlineGeometry = geometry.clone();
  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: config.toon.outlineColor,
    side: THREE.BackSide
  });
  const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);
  outlineMesh.scale.setScalar(config.toon.outlineWidth);
  outlineMesh.userData.isOutline = true;
  earthMesh.add(outlineMesh);
  
  scene.add(earthMesh);
  world = earthMesh;
  
  // Add test objects
  const boxGeo = new THREE.BoxGeometry(2, 2, 2);
  const boxMat = new THREE.MeshToonMaterial({ 
    color: 0xff4444,
    gradientMap: createToonGradient()
  });
  const testBox = new THREE.Mesh(boxGeo, boxMat);
    testBox.position.set(10, 100, 0);
    testBox.userData.isOutline = true;
    testBox.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(testBox);
}
