/**
 * POSTPRODUCTION.JS
 * Wraps Three.js EffectComposer for scene-wide visual post-processing
 * (bloom, vignette, color grading). Settings pulled from config.js —
 * no magic numbers here.
 *
 * Requires additional Three.js addon scripts in index.html:
 *   examples/jsm/postprocessing/EffectComposer.js
 *   examples/jsm/postprocessing/RenderPass.js
 *   examples/jsm/postprocessing/UnrealBloomPass.js
 *   examples/jsm/shaders/VignetteShader.js (or a custom ShaderPass)
 */

const PostProduction = (function () {
    let composer = null;
    let bloomPass = null;
    let vignettePass = null;

    function init(renderer, scene, camera) {
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(new THREE.RenderPass(scene, camera));

        bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            CONFIG.postProduction.bloom.strength,
            CONFIG.postProduction.bloom.radius,
            CONFIG.postProduction.bloom.threshold
        );
        composer.addPass(bloomPass);

        if (THREE.ShaderPass && THREE.VignetteShader) {
            vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
            vignettePass.uniforms['darkness'].value = CONFIG.postProduction.vignette.darkness;
            composer.addPass(vignettePass);
        }
    }

    // Swap the bloom/vignette intensity per-act palette rather than
    // hardcoding a look — called by storyEngine.js on scene change.
    function applyPaletteProfile(paletteName) {
        const profile = CONFIG.postProduction.palettes[paletteName];
        if (!profile || !bloomPass) return;

        bloomPass.strength = profile.bloomStrength;
        bloomPass.radius = profile.bloomRadius;
        if (vignettePass) {
            vignettePass.uniforms['darkness'].value = profile.vignetteDarkness;
        }
    }

    function render() {
        if (composer) composer.render();
    }

    function onResize(width, height) {
        if (composer) composer.setSize(width, height);
    }

    return { init, applyPaletteProfile, render, onResize };
})();
