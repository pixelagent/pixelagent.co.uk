(function () {
  'use strict';

  var config = window.GLOBE_SCROLL_CONFIG;
  if (!config) {
    console.warn('[GlobeScroll] No config found on window.GLOBE_SCROLL_CONFIG');
    return;
  }

  /* ── Config shortcuts ── */
  var root       = document.getElementById(config.rootId);
  var canvas     = document.getElementById(config.canvasId);
  var textEls    = Array.from(root.querySelectorAll(config.textSelector));
  var NUM_SECTIONS = config.sections;
  var EXIT_MS    = config.exitMs || 900;
  var exitTimers = new Array(NUM_SECTIONS).fill(null);
  var scrollProgress = 0;
  var activeSection  = -1;

  /* ── Progress bar (optional) ── */
  var progBar    = config.progressBar ? document.getElementById(config.progressBar.id) : null;
  var progFill   = config.progressBar && config.progressBar.fillId ? document.getElementById(config.progressBar.fillId) : null;
  var scrollHint = config.progressBar && config.progressBar.hintId ? document.getElementById(config.progressBar.hintId) : null;

  /* ── Helpers ── */
  function getProgress() {
    var rect   = root.getBoundingClientRect();
    var travel = root.offsetHeight - window.innerHeight;
    return travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
  }

  function isRootInView() {
    var rect = root.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function showSection(idx) {
    if (idx === activeSection) return;
    var prev = activeSection;
    activeSection = idx;

    if (prev >= 0 && prev < NUM_SECTIONS) {
      var prevEl  = textEls[prev];
      var exitCls = 'exit-' + (prevEl.dataset.exit || 'fade');
      clearTimeout(exitTimers[prev]);
      prevEl.classList.add(exitCls);
      exitTimers[prev] = setTimeout(function () {
        prevEl.classList.remove('is-visible', exitCls);
      }, EXIT_MS);
    }

    if (idx >= 0 && idx < NUM_SECTIONS) {
      var el      = textEls[idx];
      var exitCls2 = 'exit-' + (el.dataset.exit || 'fade');
      clearTimeout(exitTimers[idx]);
      el.classList.remove(exitCls2);
      requestAnimationFrame(function () {
        el.classList.add('is-visible');
      });
    }
  }

  function updateText(p) {
    var rawIdx = Math.floor(p * NUM_SECTIONS);
    var idx    = Math.min(rawIdx, NUM_SECTIONS - 1);
    showSection(idx);
  }

  /* ── Scroll listener ── */
  window.addEventListener('scroll', function () {
    scrollProgress = getProgress();
    var inView = isRootInView();

    if (progBar)    progBar.classList.toggle(config.progressBar.activeClass || 'es-active', inView);
    if (progFill)   progFill.style.height       = (scrollProgress * 100) + '%';
    if (scrollHint) scrollHint.style.opacity    = scrollProgress > 0.02 ? '0' : '1';

    updateText(scrollProgress);
  }, { passive: true });

  /* Initial state */
  updateText(0);

  /* ════════════════════════════════════════════════════════════
     THREE.JS — Globe renderer
     ════════════════════════════════════════════════════════════ */

  function loadGLTFLoader(cb) {
    var urls = [
      'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
      'https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    ];
    var i = 0;
    function tryNext() {
      if (i >= urls.length) { cb(false); return; }
      var s = document.createElement('script');
      s.src     = urls[i++];
      s.onload  = function () { cb(true); };
      s.onerror = tryNext;
      document.head.appendChild(s);
    }
    tryNext();
  }

  loadGLTFLoader(function (loaderOk) {

    /* ── Effect toggles (default ON — override per-page via config.effects) ── */
    var fx             = config.effects || {};
    var useFog         = fx.fog !== false;
    var fogDensity     = fx.fogDensity || 0.045;
    var useToon        = fx.toonShading !== false;
    var useDayNight    = fx.dayNight !== false;
    var dayNightPeriod = fx.dayNightPeriod || 42; // seconds for one full sun/moon cycle

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding      = THREE.sRGBEncoding;
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = config.toneMappingExposure || 1.1;

    var scene = new THREE.Scene();
    var bgColorHex = config.colors && config.colors.background ? parseInt(config.colors.background.replace('#', '0x')) : 0x011512;
    scene.background = new THREE.Color(bgColorHex);

    /* Fog — softens the starfield/globe edge with distance, like fog.html's
       linear/exponential atmosphere. Built-in Three.js materials (points,
       toon, basic) pick this up automatically. */
    if (useFog) {
      scene.fog = new THREE.FogExp2(bgColorHex, fogDensity);
    }

    /* Day/night palette — background & fog drift slightly warmer while the
       sun orb is up, back to the base tone at night (see animate()). */
    var nightBg = new THREE.Color(bgColorHex);
    var dayBg   = nightBg.clone().lerp(new THREE.Color(0xffffff), 0.10);

    var camera = new THREE.PerspectiveCamera(
      config.camera.fov || 50,
      window.innerWidth / window.innerHeight,
      config.camera.near || 0.1,
      config.camera.far || 100
    );
    camera.position.set(0, 0, config.camera.z || 3.5);

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, config.lights.ambient || 0.4));

    var sunColor = config.colors && config.colors.sun ? parseInt(config.colors.sun.replace('#', '0x')) : 0xFFE060;
    var sunBaseIntensity = config.lights.sun || 1.5;
    var sun = new THREE.DirectionalLight(sunColor, sunBaseIntensity);
    sun.position.set(3, 2, 2);
    scene.add(sun);

    var rimColor = config.colors && config.colors.rim ? parseInt(config.colors.rim.replace('#', '0x')) : 0x3499CC;
    var moonBaseIntensity = config.lights.rim || 0.4;
    var rim = new THREE.DirectionalLight(rimColor, moonBaseIntensity);
    rim.position.set(-3, -1, -2);
    scene.add(rim);

    /* Small orbiting sun/moon markers — day_night.html's celestial-body
       trick, scaled down so it reads as a subtle glint rather than a scene. */
    var sunOrb = null, moonOrb = null;
    if (useDayNight) {
      sunOrb = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 12, 12),
        new THREE.MeshBasicMaterial({ color: sunColor })
      );
      scene.add(sunOrb);
      moonOrb = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 12),
        new THREE.MeshBasicMaterial({ color: rimColor })
      );
      scene.add(moonOrb);
    }

    /* Starfield */
    var starGeo = new THREE.BufferGeometry();
    var starPos = new Float32Array(2000 * 3);
    for (var i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 80;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    var starColor = config.colors && config.colors.stars ? parseInt(config.colors.stars.replace('#', '0x')) : 0xEEEEEE;
    scene.add(new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: starColor, size: 0.05, transparent: true, opacity: 0.7 })
    ));

    /* Earth rig */
    var rig = new THREE.Group();
    scene.add(rig);

    /* Globe */
    var GLOBE_RADIUS = config.globeRadius || 1.3;
    var sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    var globeColor = config.colors && config.colors.globe ? parseInt(config.colors.globe.replace('#', '0x')) : 0x014F29;
    var globeEmissive = config.colors && config.colors.globeEmissive ? parseInt(config.colors.globeEmissive.replace('#', '0x')) : 0x01F8BB;

    var sphereMat;
    if (useToon) {
      /* Cel-shaded material, same recipe as toonshader.html's createToonGroup:
         a 3-step gradient map instead of smooth Phong falloff. */
      var toonFormat = renderer.capabilities.isWebGL2 ? THREE.RedFormat : THREE.LuminanceFormat;
      var toonSteps   = new Uint8Array([55, 140, 255]);
      var gradientMap = new THREE.DataTexture(toonSteps, toonSteps.length, 1, toonFormat);
      gradientMap.needsUpdate = true;

      sphereMat = new THREE.MeshToonMaterial({
        color: globeColor,
        emissive: globeEmissive,
        emissiveIntensity: 0.1,
        gradientMap: gradientMap,
        transparent: true,
        opacity: 0.98
      });
    } else {
      sphereMat = new THREE.MeshPhongMaterial({
        color: globeColor,
        emissive: globeEmissive,
        emissiveIntensity: 0.08,
        shininess: 25,
        transparent: true,
        opacity: 0.96
      });
    }
    rig.add(new THREE.Mesh(sphereGeo, sphereMat));

    /* Black backside outline hull — the toonshader.html cartoon-rim trick */
    if (useToon) {
      var outlineMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.85
      });
      var outlineMesh = new THREE.Mesh(sphereGeo, outlineMat);
      outlineMesh.scale.multiplyScalar(1.022);
      rig.add(outlineMesh);
    }

    /* Wireframe */
    var wireColor = config.colors && config.colors.wireframe ? parseInt(config.colors.wireframe.replace('#', '0x')) : 0x356176;
    var wireframeMat = new THREE.MeshBasicMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    rig.add(new THREE.Mesh(sphereGeo, wireframeMat));

    /* Atmosphere glow (optional) */
    if (config.effects && config.effects.atmosphere) {
      var atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 64, 64);
      var atmosMat = new THREE.ShaderMaterial({
        vertexShader: [
          'varying vec3 vNormal;',
          'void main() {',
          '  vNormal = normalize(normalMatrix * normal);',
          '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
          '}'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vNormal;',
          'void main() {',
          '  float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);',
          '  gl_FragColor = vec4(0.01, 0.97, 0.73, 1.0) * intensity;',
          '}'
        ].join('\n'),
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
      });
      rig.add(new THREE.Mesh(atmosGeo, atmosMat));
    }

    /* Surface scanline effect (optional) */
    var scanMesh = null;
    if (config.effects && config.effects.scanlines) {
      var scanMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: [
          'varying vec2 vUv;',
          'void main() {',
          '  vUv = uv;',
          '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
          '}'
        ].join('\n'),
        fragmentShader: [
          'varying vec2 vUv;',
          'uniform float time;',
          'void main() {',
          '  float scan = sin(vUv.y * 120.0 + time * 0.5) * 0.5 + 0.5;',
          '  scan = smoothstep(0.4, 0.6, scan) * 0.15;',
          '  gl_FragColor = vec4(0.01, 0.97, 0.73, scan);',
          '}'
        ].join('\n'),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      scanMesh = new THREE.Mesh(sphereGeo, scanMat);
      scanMesh.renderOrder = 1;
      rig.add(scanMesh);
    }

    /* Coastlines */
    fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
      .then(function (res) { return res.json(); })
      .then(function (geoJson) {
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x02FFFF, transparent: true, opacity: 0.75 });
        geoJson.features.forEach(function (feature) {
          var polygons = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
          polygons.forEach(function (polygon) {
            polygon.forEach(function (ring) {
              var points = ring.map(function (coord) { return latLonToVector3(coord[1], coord[0], GLOBE_RADIUS * 1.003); });
              var geometry = new THREE.BufferGeometry().setFromPoints(points);
              rig.add(new THREE.Line(geometry, lineMaterial));
            });
          });
        });
      });

    function latLonToVector3(lat, lon, radius) {
      var phi = (90 - lat) * (Math.PI / 180);
      var theta = (lon + 180) * (Math.PI / 180);
      var x = -(radius * Math.sin(phi) * Math.cos(theta));
      var z = (radius * Math.sin(phi) * Math.sin(theta));
      var y = (radius * Math.cos(phi));
      return new THREE.Vector3(x, y, z);
    }

    /* Instanced globe markers — inspired by webgl_instancing_performance */
    if (config.instancing) {
      var instCount = config.instancing.count || 600;
      var instRadius = config.instancing.radius || (GLOBE_RADIUS * 1.15);
      var instSize = config.instancing.size || 0.04;
      var instGeo = new THREE.BoxGeometry(instSize, instSize, instSize);
      var instMat = new THREE.MeshPhongMaterial({
        color: config.colors && config.colors.instances ? parseInt(config.colors.instances.replace('#', '0x')) : 0x02FFFF,
        emissive: 0x000000,
        shininess: 60
      });
      var instMesh = new THREE.InstancedMesh(instGeo, instMat, instCount);
      var dummy = new THREE.Object3D();
      for (var i = 0; i < instCount; i++) {
        var lat = (Math.random() - 0.5) * 180;
        var lon = (Math.random() - 0.5) * 360;
        var pos = latLonToVector3(lat, lon, instRadius);
        dummy.position.copy(pos);
        dummy.lookAt(0, 0, 0);
        dummy.rotateX(Math.PI / 2);
        dummy.updateMatrix();
        instMesh.setMatrixAt(i, dummy.matrix);
      }
      instMesh.instanceMatrix.needsUpdate = true;
      rig.add(instMesh);
    }

    /* Load GLB */
    if (loaderOk && config.modelPath) {
      new THREE.GLTFLoader().load(
        config.modelPath,
        function (gltf) {
          var model = gltf.scene;
          var box   = new THREE.Box3().setFromObject(model);
          var size  = box.getSize(new THREE.Vector3());
          var scale = 1.3 / Math.max(size.x, size.y, size.z);
          model.scale.setScalar(scale);
          model.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(scale));
          rig.add(model);
          console.log('[GlobeScroll] GLB loaded ✓');
        },
        null,
        function (err) {
          console.warn('[GlobeScroll] GLB load failed — globe shown:', err.message);
        }
      );
    }

    /* Resize */
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* ── Waypoint interpolation (eased) ── */
    function lerpWaypoints(t) {
      var a = config.waypoints[0];
      var b = config.waypoints[config.waypoints.length - 1];
      for (var i = 0; i < config.waypoints.length - 1; i++) {
        if (t >= config.waypoints[i].p && t <= config.waypoints[i + 1].p) {
          a = config.waypoints[i];
          b = config.waypoints[i + 1];
          break;
        }
      }
      var span  = b.p - a.p;
      var local = span === 0 ? 0 : (t - a.p) / span;
      var e = local < 0.5
        ? 2 * local * local
        : -1 + (4 - 2 * local) * local;

      var ga = config.grid[a.pos] || { x: 0, y: 0 };
      var gb = config.grid[b.pos] || { x: 0, y: 0 };

      return {
        rx: a.rx + (b.rx - a.rx) * e,
        ry: a.ry + (b.ry - a.ry) * e,
        x:  ga.x + (gb.x - ga.x) * e,
        y:  ga.y + (gb.y - ga.y) * e,
        s:  a.s  + (b.s  - a.s)  * e,
        z:  a.z  + (b.z  - a.z)  * e,
      };
    }

    /* Smoothed current transforms */
    var curRX = 0, curRY = 0, curX = 0, curY = 0, curS = 1, curZ = 1;
    var clock  = new THREE.Clock();

    /* ── Render loop ── */
    function animate() {
      requestAnimationFrame(animate);

      var dt    = clock.getDelta();
      var time  = clock.getElapsedTime();
      var lerpK = Math.min(dt * 5, 1);
      var tgt   = lerpWaypoints(scrollProgress);

      curRX += (tgt.rx - curRX) * lerpK;
      curRY += (tgt.ry - curRY) * lerpK;
      curX  += (tgt.x  - curX)  * lerpK;
      curY  += (tgt.y  - curY)  * lerpK;
      curS  += (tgt.s  - curS)  * lerpK;
      curZ  += (tgt.z  - curZ)  * lerpK;

      rig.rotation.x = curRX;
      rig.rotation.y = curRY;
      rig.position.x = curX;
      rig.position.y = curY;
      rig.scale.setScalar(curS * curZ);

      if (scanMesh && scanMesh.material && scanMesh.material.uniforms) {
        scanMesh.material.uniforms.time.value = time;
      }

      if (Math.abs(tgt.ry - curRY) < 0.01) {
        rig.rotation.y += 0.001;
      }

      /* ── Day/night cycle — sun & moon orbit independently of the scroll
         rig, like day_night.html, so the globe keeps feeling alive even
         while the reader pauses on a section. ── */
      if (useDayNight) {
        var cycle = (time % dayNightPeriod) / dayNightPeriod;
        var angle = cycle * Math.PI * 2;
        var orbitR = GLOBE_RADIUS * 3.4;

        var sunPos = new THREE.Vector3(Math.cos(angle) * orbitR, Math.sin(angle) * orbitR * 0.55, 1.8);
        var moonPos = sunPos.clone().multiplyScalar(-1);

        sun.position.copy(sunPos);
        rim.position.copy(moonPos);
        if (sunOrb)  sunOrb.position.copy(sunPos);
        if (moonOrb) moonOrb.position.copy(moonPos);

        var dayAmount = Math.max(0, Math.sin(angle)); // 0 = night, 1 = midday
        sun.intensity = sunBaseIntensity * (0.25 + dayAmount * 0.9);
        rim.intensity = moonBaseIntensity * (0.4 + (1 - dayAmount) * 1.1);
        if (sunOrb)  sunOrb.visible  = dayAmount > 0.05;
        if (moonOrb) moonOrb.visible = dayAmount < 0.95;

        scene.background.copy(nightBg).lerp(dayBg, dayAmount * 0.5);
        if (scene.fog) scene.fog.color.copy(scene.background);
      }

      renderer.render(scene, camera);
    }

    animate();
  });

})();
