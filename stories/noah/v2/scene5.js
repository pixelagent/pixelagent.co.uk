window.initScene5 = function(group) {
    const matWood = new THREE.MeshPhongMaterial({ color: 0x8b5e2f, transparent: true, opacity: 0 });
    const matDark = new THREE.MeshPhongMaterial({ color: 0x5c3a1a, transparent: true, opacity: 0 });
    
    // Keel & Ribs (Under Construction)
    const keel = new THREE.Mesh(new THREE.BoxGeometry(18, 0.5, 0.5), matDark);
    group.add(keel);

    for(let i = -7; i <= 7; i += 2) {
        const ribLeft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4, 0.2), matDark);
        ribLeft.position.set(i, 2, -2); ribLeft.rotation.z = 0.2;
        const ribRight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4, 0.2), matDark);
        ribRight.position.set(i, 2, 2); ribRight.rotation.z = -0.2;
        group.add(ribLeft, ribRight);
    }
    
    // Few Planks
    const plank = new THREE.Mesh(new THREE.BoxGeometry(10, 0.3, 0.3), matWood);
    plank.position.set(-2, 1, 2.1);
    group.add(plank);
    
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