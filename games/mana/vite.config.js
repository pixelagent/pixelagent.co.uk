import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { cpSync, mkdirSync } from 'node:fs';
export default defineConfig({
  base: './',
  cacheDir: '.vite-cache',
  resolve: { alias: { 'three/examples/jsm/shaders/VignetteShader.js': fileURLToPath(new URL('./js/libs/shaders/VignetteShader.js', import.meta.url)) } },
  plugins: [{ name: 'copy-game-assets', closeBundle() {
    for (const path of ['assets/audio', 'fonts', 'js/tribes.json', 'js/electricBorder.js', 'plugins/howler.min.js', 'plugins/localforage.min.js', 'plugins/gsap.min.js', 'favicon.ico']) {
      mkdirSync('dist/' + path.substring(0, path.lastIndexOf('/') + 1), { recursive: true });
      cpSync(path, 'dist/' + path, { recursive: true });
    }
  } }],
  build: { rollupOptions: { external: id => id.startsWith('https://') } }
});
