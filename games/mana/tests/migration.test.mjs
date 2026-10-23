import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import * as THREE from 'three';
globalThis.window = { THREE };
const { ParticleManager } = await import('../js/ParticleManager.js');
const { SceneManager } = await import('../js/SceneManager.js');

test('repeated bursts have independent emitters and the configured particle lifetime', () => {
 const scene = new THREE.Scene(); const manager = new ParticleManager(scene);
 const first = manager.createEmitter('manaPickup', new THREE.Vector3()); manager.update(.016);
 const second = manager.createEmitter('manaPickup', new THREE.Vector3()); manager.update(.016);
 assert.notEqual(first.options.system.emitters[0], second.options.system.emitters[0]);
 assert.ok(first.particlesCount > 0); assert.ok(second.particlesCount > 0);
 assert.equal(first.options.particles.ttl, .5);
 assert.equal(first.options.particles.blending, 'additive');
 assert.equal(manager.systemConfigs.manaPickup.system.emitters.age, 0);
 for (let i = 0; i < 120; i++) manager.update(1 / 60);
 assert.equal(manager.activeSystems.size, 0); assert.equal(scene.children.length, 0);
});
test('all useful effects construct, update and clear without leaving scene objects', () => {
 const scene = new THREE.Scene(); const manager = new ParticleManager(scene);
 for (const effect of ['dust','campfire','embers','smoke','sparkle','oasis','confetti','market']) manager.createEmitter(effect, new THREE.Vector3());
 manager.update(.016); assert.equal(manager.activeSystems.size, 8);
 manager.clear(); assert.equal(manager.activeSystems.size, 0); assert.equal(scene.children.length, 0);
});
test('tents and market stalls create visible scenery as well as colliders', () => {
 const game = { scene: new THREE.Scene(), scenery: [], obstacleColliders: [] };
 const manager = new SceneManager(game); manager.createTent(0,0,0,0); manager.createMarketStall(4,0,0,0);
 assert.equal(game.scenery.length, 2); assert.equal(game.obstacleColliders.length, 2);
 assert.ok(game.scenery.every(object => object.parent === game.scene && object.children.length > 0));
});
test('all local script, stylesheet and import-map references exist', () => {
 const root = new URL('../', import.meta.url);
 const html = readFileSync(new URL('index.html', root), 'utf8');
 const map = JSON.parse(html.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]);
 const references = [...Object.values(map.imports), ...[...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1])];
 for (const reference of references) {
  if (/^https?:/.test(reference)) continue;
  assert.ok(existsSync(new URL(reference, root)), `Missing reference: ${reference}`);
 }
});

test('daily forecasts are repeatable and the first day is clear', async () => {
 const { weatherForDay } = await import('../js/WeatherManager.js');
 assert.equal(weatherForDay(1).id, 'clear'); assert.equal(weatherForDay(2).id, 'heat');
 assert.equal(weatherForDay(3).id, 'wind'); assert.equal(weatherForDay(4).id, 'rain');
 assert.equal(weatherForDay(5), weatherForDay(1));
});
test('weather creates route choices, shelter protection and Sabbath rest', async () => {
 const { weatherExposure } = await import('../js/WeatherManager.js');
 assert.ok(weatherExposure(2,.1,false).thirst > weatherExposure(1,.1,false).thirst);
 assert.ok(weatherExposure(2,.1,true).thirst < weatherExposure(2,.1,false).thirst);
 assert.ok(weatherExposure(4,.5,false).thirst < weatherExposure(1,.5,false).thirst);
 assert.equal(weatherExposure(3,.1,false).effort, 1.35);
 assert.equal(weatherExposure(3,.1,true).effort, 1);
 assert.equal(weatherExposure(2,.5,false,true).thirst, 0);
});
test('weather particles are bounded, animate rain and hide outside gameplay', async () => {
 const { WeatherManager } = await import('../js/WeatherManager.js');
 const game = { mobileVisible: true, scene: new THREE.Scene(), player: new THREE.Object3D(), dayForWeather: () => 4 };
 const weather = new WeatherManager(game); assert.equal(weather.positions.length, 96 * 3);
 weather.update(.016); assert.ok(weather.points.visible); assert.equal(weather.current, 'rain');
 const before = weather.positions[1]; weather.update(.016); assert.notEqual(weather.positions[1], before);
 weather.hide(); assert.equal(weather.points.visible, false);
 game.dayForWeather = () => 1; weather.update(.016); assert.equal(weather.points.visible, false);
});
