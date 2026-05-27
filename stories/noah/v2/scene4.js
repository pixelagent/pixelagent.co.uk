window.initScene4 = function(group) {
    const matWood = new THREE.MeshPhongMaterial({ color: 0x8a4c1e, transparent: true, opacity: 0 });
    
    // Ark resting
    const hull = new THREE.Mesh(new THREE.BoxGeometry(18, 4, 5), matWood);
    hull.position.y = 2;
    group.add(hull);
    
    // Mountain Rock
    const matRock = new THREE.MeshPhongMaterial({ color: 0x555555, flatShading: true, transparent: true, opacity: 0 });
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(8), matRock);
    rock.position.y = -6;
    group.add(rock);
    
    // Rainbow (Using Torus)
    const colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x9400d3];
    const bowMaterials = [];
    for(let i=0; i<7; i++) {
        const matBow = new THREE.MeshBasicMaterial({ color: colors[i], transparent: true, opacity: 0, side: THREE.DoubleSide });
        bowMaterials.push(matBow);
        const bow = new THREE.Mesh(new THREE.TorusGeometry(12 - (i*0.3), 0.2, 16, 100, Math.PI), matBow);
        bow.position.y = 2;
        group.add(bow);
    }
    
    // Fade-in and rotation animation
    const startTime = Date.now();
    const fadeDuration = 3000; // 3 seconds
    
    function animate() {
        requestAnimationFrame(animate);
        
        if (!group.visible) return;
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        const easeInProgress = progress * progress; // Quadratic ease-in
        
        // Apply fade-in to all meshes in the group
        group.traverse((child) => {
            if (child.isMesh) {
                child.material.opacity = easeInProgress;
            }
        });
        
        // Slow rotation around Y-axis
        group.rotation.y = elapsed * 0.0005; // Adjust speed as needed
    }
    
    animate();
};