(function(){
  'use strict';
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
})();
