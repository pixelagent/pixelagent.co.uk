import * as THREE from 'three';

export class iVFXSystem {
  constructor(scene, planetR = 500) {
    this.scene = scene;
    this.planetR = planetR;
    this.trailParticles = [];
    this.sparkParticles = [];
    this.ambientParticles = null;
    this.fog = null;
    this._isNight = false;

    this._initAmbientParticles();
    this._initFog();
  }

  _initAmbientParticles() {
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1500; i++) {
      vertices.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.ambientParticles = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.4,
        transparent: true,
        opacity: 0.3,
      })
    );
    this.scene.add(this.ambientParticles);
  }

  _initFog() {
    this.fog = new THREE.FogExp2(0xadd8e6, 0.004);
    this.scene.fog = this.fog;
  }

  setFogColor(color, density = 0.004) {
    if (this.fog) {
      this.fog.color.set(color);
      this.fog.density = density;
    }
  }

  setFogDensity(density) {
    if (this.fog) {
      this.fog.density = density;
    }
  }

  spawnTrail(pos, up = null) {
    const color = this._isNight ? 0x00f2ff : 0x443322;
    const geo = new THREE.SphereGeometry(0.15, 4, 4);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.5,
    });
    const p = new THREE.Mesh(geo, mat);
    p.position.copy(pos);
    if (up) p.position.add(up.clone().multiplyScalar(-0.8));
    this.scene.add(p);
    this.trailParticles.push({ mesh: p, life: 1.0, maxLife: 1.0 });
  }

  spawnSpark(pos, color = 0x00f2ff) {
    const geo = new THREE.SphereGeometry(0.08, 4, 4);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.9,
    });
    const p = new THREE.Mesh(geo, mat);
    p.position.copy(pos);
    this.scene.add(p);
    this.sparkParticles.push({
      mesh: p,
      life: 0.6,
      maxLife: 0.6,
      vel: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(2),
    });
  }

  emitTrail(pos, up) {
    if (Math.random() > 0.7) return;
    this.spawnTrail(pos, up);
  }

  emitSparks(pos, count = 8) {
    for (let i = 0; i < count; i++) {
      this.spawnSpark(pos);
    }
  }

  update(dt, playerPos, playerVel, isGrounded) {
    if (this.ambientParticles) {
      this.ambientParticles.position.copy(playerPos);
    }

    if (playerPos && playerVel && isGrounded && playerVel.lengthSq() > 10) {
      const up = playerPos.clone().normalize();
      this.emitTrail(playerPos, up);
    }

    for (let i = this.trailParticles.length - 1; i >= 0; i--) {
      const t = this.trailParticles[i];
      t.life -= dt * 1.5;
      const scale = Math.max(0.1, t.life);
      t.mesh.scale.setScalar(scale);
      t.mesh.material.opacity = Math.max(0, t.life / t.maxLife);
      if (t.life <= 0) {
        this.scene.remove(t.mesh);
        t.mesh.geometry.dispose();
        t.mesh.material.dispose();
        this.trailParticles.splice(i, 1);
      }
    }

    for (let i = this.sparkParticles.length - 1; i >= 0; i--) {
      const s = this.sparkParticles[i];
      s.life -= dt;
      s.vel.y += -9.8 * dt;
      s.mesh.position.add(s.vel.clone().multiplyScalar(dt));
      s.mesh.material.opacity = Math.max(0, s.life / s.maxLife);
      const scale = Math.max(0.1, s.life / s.maxLife);
      s.mesh.scale.setScalar(scale);
      if (s.life <= 0) {
        this.scene.remove(s.mesh);
        s.mesh.geometry.dispose();
        s.mesh.material.dispose();
        this.sparkParticles.splice(i, 1);
      }
    }
  }

  setNightMode(isNight) {
    this._isNight = isNight;
    if (isNight) {
      this.setFogColor(0x1a233a, 0.0055);
    } else {
      this.setFogColor(0xadd8e6, 0.004);
    }
  }

  dispose() {
    this.trailParticles.forEach(t => {
      this.scene.remove(t.mesh);
      t.mesh.geometry.dispose();
      t.mesh.material.dispose();
    });
    this.sparkParticles.forEach(s => {
      this.scene.remove(s.mesh);
      s.mesh.geometry.dispose();
      s.mesh.material.dispose();
    });
    if (this.ambientParticles) {
      this.scene.remove(this.ambientParticles);
      this.ambientParticles.geometry.dispose();
      this.ambientParticles.material.dispose();
    }
  }
}
