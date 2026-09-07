(function(){
  'use strict';
  const header=document.querySelector('[data-header]');
  function setHeader(){if(header)header.classList.toggle('is-scrolled',window.scrollY>30)}
  setHeader();
  window.addEventListener('scroll',setHeader,{passive:true});
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelectors=[
    '.mbr-section-head',
    '.item',
    '.features-image',
    '.features25 .card',
    '.pricing-card',
    '.card-wrapper',
    '.content7 .row',
    '.image1 .row',
    '.features12 .row',
    '.footer4 .row > div',
    '.es-text'
  ];
  const items=[];
  revealSelectors.forEach(function(selector){
    document.querySelectorAll(selector).forEach(function(element){
      if(element.closest('.menu')||items.indexOf(element)!==-1)return;
      element.classList.add('pa-reveal');
      items.push(element);
    });
  });
  if(reduced||!('IntersectionObserver' in window)){
    items.forEach(function(item){item.classList.add('pa-visible')});
  }else{
    const observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){entry.target.classList.add('pa-visible');observer.unobserve(entry.target)}
      });
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    items.forEach(function(item){observer.observe(item)});
  }

  const images=Array.from(document.querySelectorAll('.item-img img, .image-wrapper img, .mbr-figure img'));
  let ticking=false;
  function updateParallax(){
    if(reduced){ticking=false;return}
    const viewport=window.innerHeight;
    images.forEach(function(image){
      const rect=image.getBoundingClientRect();
      if(rect.bottom<0||rect.top>viewport)return;
      const progress=(rect.top+rect.height/2-viewport/2)/viewport;
      image.classList.add('pa-parallax-image');
      image.style.setProperty('--pa-image-y',(progress*-24).toFixed(2)+'px');
    });
    ticking=false;
  }
  function requestUpdate(){if(!ticking){requestAnimationFrame(updateParallax);ticking=true}}
  requestUpdate();
  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate);

  const logoCanvas=document.getElementById('storyLogoCanvas');
  if(logoCanvas&&window.THREE&&!reduced){
    const renderer=new THREE.WebGLRenderer({canvas:logoCanvas,antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(52,52,false);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(50,1,.1,100);
    camera.position.z=4.4;
    scene.add(new THREE.AmbientLight(0xffffff,.65));
    const light=new THREE.DirectionalLight(0x58b9e8,2.2);
    light.position.set(3,3,5);
    scene.add(light);
    const group=new THREE.Group();
    const geometry=new THREE.BoxGeometry(.55,.55,.55);
    const material=new THREE.MeshPhongMaterial({color:0x3399cc,emissive:0x061720,shininess:90,specular:0x8bcff0});
    scene.add(group);
    [[0,0],[0,4],[1,1],[1,3],[2,2],[3,1],[3,3],[4,0],[4,4]].forEach(function(pos){
      const block=new THREE.Mesh(geometry,material);
      block.position.set((pos[0]-2)*.55,(2-pos[1])*.55,0);
      group.add(block);
    });
    function animateLogo(time){
      group.rotation.x=Math.sin(time*.0008)*.85;
      group.rotation.y=time*.00065;
      group.rotation.z=Math.cos(time*.00045)*.2;
      renderer.render(scene,camera);
      requestAnimationFrame(animateLogo);
    }
    requestAnimationFrame(animateLogo);
  }

  function initPageCore(pageCanvas){
    const holder=pageCanvas.closest('.inner-hero')||pageCanvas.parentElement;
    const renderer=new THREE.WebGLRenderer({canvas:pageCanvas,alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));
    const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,100);
    camera.position.set(0,0,10.5);
    const group=new THREE.Group();scene.add(group);
    const blue=new THREE.MeshStandardMaterial({color:0x3399cc,emissive:0x062d43,roughness:.28,metalness:.5});
    const dark=new THREE.MeshStandardMaterial({color:0x11161c,emissive:0x020406,roughness:.4,metalness:.7});
    const geo=new THREE.BoxGeometry(.62,.62,.62);
    for(let x=0;x<4;x++){for(let y=0;y<4;y++){for(let z=0;z<4;z++){
      if(Math.random()>.5)continue;
      const cube=new THREE.Mesh(geo,Math.random()>.4?blue:dark);
      cube.position.set((x-1.5)*.86,(y-1.5)*.86,(z-1.5)*.86);
      cube.userData.origin=cube.position.clone();
      cube.userData.phase=Math.random()*Math.PI*2;
      group.add(cube);
    }}}
    const wire=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.7,3.7,3.7)),new THREE.LineBasicMaterial({color:0x50c8ff,transparent:true,opacity:.16}));
    group.add(wire);
    scene.add(new THREE.AmbientLight(0x6f8da1,.8));
    const key=new THREE.PointLight(0x50c8ff,2.6,24);key.position.set(4,4,6);scene.add(key);
    const rim=new THREE.PointLight(0xa879ff,1.6,20);rim.position.set(-3,-2,3);scene.add(rim);
    let pointerX=0,pointerY=0;
    window.addEventListener('pointermove',function(event){pointerX=(event.clientX/window.innerWidth-.5)*2;pointerY=(event.clientY/window.innerHeight-.5)*2},{passive:true});
    function resize(){const width=holder.clientWidth,height=holder.clientHeight;if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix()}
    resize();window.addEventListener('resize',resize);
    const clock=new THREE.Clock();
    function animatePage(){
      const time=clock.getElapsedTime();
      group.rotation.x+=((pointerY*.12)+time*.045-group.rotation.x)*.025;
      group.rotation.y+=((pointerX*.16)+time*.075-group.rotation.y)*.025;
      group.children.forEach(function(child){if(!child.userData.origin)return;const pulse=Math.sin(time*1.1+child.userData.phase)*.04;child.position.copy(child.userData.origin).multiplyScalar(1+pulse)});
      renderer.render(scene,camera);
      requestAnimationFrame(animatePage)
    }
    requestAnimationFrame(animatePage)
  }
  document.querySelectorAll('.page-canvas').forEach(initPageCore);
})();
