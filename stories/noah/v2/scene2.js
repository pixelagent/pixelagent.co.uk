window.initScene2 = function(group) {
    const matWood = new THREE.MeshPhongMaterial({ color: 0x6a3c12, transparent: true, opacity: 0 });
    const matDark = new THREE.MeshPhongMaterial({ color: 0x3a2008, transparent: true, opacity: 0 });
    const matWhite = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    const matBrown = new THREE.MeshPhongMaterial({ color: 0x8b4513, transparent: true, opacity: 0 });
    
    // Solid Ark
    const hull = new THREE.Mesh(new THREE.BoxGeometry(18, 4, 5), matWood);
    hull.position.y = 2;
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(12, 2.5, 3.5), matWood);
    cabin.position.y = 5.25;
    const roof = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.5, 4), matDark);
    roof.position.y = 6.6;
    group.add(hull, cabin, roof);

    // Ramp
    const ramp = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 6), matWood);
    ramp.position.set(0, 0.5, 4);
    ramp.rotation.x = -0.4;
    group.add(ramp);

    // Simple Animal proxies (Pairs of spheres)
    for(let i=0; i<3; i++) {
        const a1 = new THREE.Mesh(new THREE.SphereGeometry(0.4), matWhite);
        a1.position.set(-0.5, 0.8 + (i*0.8), 2 + (i*1.5));
        const a2 = new THREE.Mesh(new THREE.SphereGeometry(0.4), matBrown);
        a2.position.set(0.5, 0.8 + (i*0.8), 2 + (i*1.5));
        group.add(a1, a2);
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