import * as THREE from 'three';

// A predictable daily cycle makes forecasts useful and preserves weather across saves.
export const WEATHER_PROFILES = Object.freeze({
  clear: { id: 'clear', name: 'Clear skies', thirst: 1, effort: 1, heat: false,
    forecast: 'Cool morning; seek water or shade at midday.' },
  heat: { id: 'heat', name: 'Heatwave', thirst: 1.45, effort: 1, heat: true,
    forecast: 'Heat all day. Plan a route through water and shelter.' },
  wind: { id: 'wind', name: 'Desert wind', thirst: 1.15, effort: 1.35, heat: false,
    forecast: 'Wind makes exposed walking cost more wellbeing. Use shelter.' },
  rain: { id: 'rain', name: 'Light rain', thirst: 0.25, effort: 1, heat: false,
    forecast: 'A cool gathering day: thirst falls slowly, but rain does not refill water.' },
});
export function weatherForDay(day) {
  return WEATHER_PROFILES[['clear', 'heat', 'wind', 'rain'][(Math.max(1, Math.floor(day || 1)) - 1) % 4]];
}
export function weatherExposure(day, elapsedFraction, sheltered, sabbath = false) {
  const weather = weatherForDay(day);
  const heat = !sabbath && weather.id !== 'rain' && (weather.heat || (elapsedFraction > 0.3 && elapsedFraction < 0.75));
  return { weather, heat,
    thirst: sabbath ? 0 : sheltered ? 0.85 : (heat ? 2.3 : 0.85) * weather.thirst,
    effort: sheltered || sabbath ? 1 : weather.effort };
}

export class WeatherManager {
  constructor(game) {
    this.game = game;
    const count = game.mobileVisible ? 96 : 180;
    this.positions = new Float32Array(count * 3);
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.material = new THREE.PointsMaterial({ color: 0xb7d6ed, size: 0.12, transparent: true, opacity: 0.6, depthWrite: false });
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.points.visible = false;
    this.current = null;
    this.game.scene.add(this.points);
    this.reset();
  }
  reset() {
    for (let i = 0; i < this.positions.length; i += 3) {
      this.positions[i] = Math.random() * 30 - 15;
      this.positions[i + 1] = Math.random() * 18;
      this.positions[i + 2] = Math.random() * 30 - 15;
    }
  }
  update(dt) {
    const weather = weatherForDay(this.game.dayForWeather());
    if (this.current !== weather.id) {
      this.current = weather.id;
      this.reset();
      this.material.color.set(weather.id === 'rain' ? 0xb7d6ed : 0xd6bd88);
      this.material.size = weather.id === 'rain' ? 0.12 : 0.16;
      this.material.opacity = weather.id === 'rain' ? 0.6 : 0.25;
    }
    this.points.visible = weather.id === 'rain' || weather.id === 'wind';
    if (!this.points.visible) return;
    this.points.position.copy(this.game.player.position);
    for (let i = 0; i < this.positions.length; i += 3) {
      this.positions[i] += (weather.id === 'rain' ? 1.5 : 7) * dt;
      this.positions[i + 1] -= (weather.id === 'rain' ? 12 : 0.35) * dt;
      if (this.positions[i] > 15) this.positions[i] -= 30;
      if (this.positions[i + 1] < 0) this.positions[i + 1] += 18;
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
  hide() { this.points.visible = false; }
}
