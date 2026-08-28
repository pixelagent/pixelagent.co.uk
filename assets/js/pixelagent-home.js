(function(){'use strict';const header=document.querySelector('[data-header]'),toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.site-nav'),reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;function setHeader(){if(header)header.classList.toggle('is-scrolled',window.scrollY>30)}setHeader();window.addEventListener('scroll',setHeader,{passive:true});let lockedScrollY=0;
function lockScroll(){lockedScrollY=window.scrollY||window.pageYOffset||0;document.body.style.position='fixed';document.body.style.top=(-lockedScrollY)+'px';document.body.style.left='0';document.body.style.right='0';document.body.style.width='100%'}
function unlockScroll(){document.body.style.position='';document.body.style.top='';document.body.style.left='';document.body.style.right='';document.body.style.width='';window.scrollTo(0,lockedScrollY)}
function closeNav(){if(!toggle||!nav)return;toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');unlockScroll()}if(toggle&&nav){toggle.addEventListener('click',function(){const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);if(open)unlockScroll();else lockScroll()});nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeNav)});document.addEventListener('keydown',function(event){if(event.key==='Escape')closeNav()})}

(function markActiveNav(){
  const links=document.querySelectorAll('.site-nav a');
  const current=(location.pathname.split('/').pop()||'index.html');
  links.forEach(function(link){
    const file=(link.getAttribute('href')||'').split('#')[0].split('/').pop();
    if(file&&file===current)link.classList.add('is-active');
  });
})();

const revealGroups=[['.manifesto-heading','reveal-left'],['.manifesto-copy','reveal-right'],['.discipline',''],['.work-head > *',''],['.project',''],['.process-intro > *',''],['.process-steps li',''],['.contact > .eyebrow, .contact > h2, .contact > p, .contact > .button',''],['.case',''],['.studio-intro > *',''],['.tool-section-head',''],['.tool-card',''],['.principles > .eyebrow, .principles > h2, .principle',''],['.client-wall > .eyebrow, .client-wall > h2, .client-wall > p, .client-list','']];revealGroups.forEach(function(group){document.querySelectorAll(group[0]).forEach(function(element){element.classList.add('scroll-reveal');if(group[1])element.classList.add(group[1])})});document.querySelectorAll('.project-media').forEach(function(media){media.classList.add('parallax-media')});const revealItems=document.querySelectorAll('.scroll-reveal');if(reduceMotion||!('IntersectionObserver' in window)){revealItems.forEach(function(item){item.classList.add('is-visible')})}else{const observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.16,rootMargin:'0px 0px -7% 0px'});revealItems.forEach(function(item){observer.observe(item)})}

const parallaxItems=document.querySelectorAll('[data-parallax], .scroll-reveal, .parallax-media img');let parallaxTick=false;function updateParallax(){if(reduceMotion){parallaxTick=false;return}const viewport=window.innerHeight;parallaxItems.forEach(function(element){const rect=element.getBoundingClientRect();if(rect.bottom<0||rect.top>viewport)return;const progress=(rect.top+rect.height*.5-viewport*.5)/viewport;if(element.matches('.parallax-media img'))element.style.setProperty('--media-y',(progress*-34).toFixed(2)+'px');else{const speed=parseFloat(element.dataset.parallax||'.035');element.style.setProperty('--parallax-y',(progress*viewport*speed).toFixed(2)+'px')}});parallaxTick=false}function requestParallax(){if(!parallaxTick){requestAnimationFrame(updateParallax);parallaxTick=true}}requestParallax();window.addEventListener('scroll',requestParallax,{passive:true});window.addEventListener('resize',requestParallax);if(!window.THREE||reduceMotion)return;

const logoCanvas=document.getElementById('logo-canvas');if(logoCanvas){const logoRenderer=new THREE.WebGLRenderer({canvas:logoCanvas,antialias:true,alpha:true});logoRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2));logoRenderer.setSize(52,52,false);const logoScene=new THREE.Scene(),logoCamera=new THREE.PerspectiveCamera(50,1,.1,100);logoCamera.position.z=4.4;logoScene.add(new THREE.AmbientLight(0xffffff,.65));const logoLight=new THREE.DirectionalLight(0x58b9e8,2.2);logoLight.position.set(3,3,5);logoScene.add(logoLight);const logoGroup=new THREE.Group(),logoGeo=new THREE.BoxGeometry(.55,.55,.55),logoMat=new THREE.MeshPhongMaterial({color:0x3399cc,emissive:0x061720,shininess:90,specular:0x8bcff0});logoScene.add(logoGroup);[[0,0],[0,4],[1,1],[1,3],[2,2],[3,1],[3,3],[4,0],[4,4]].forEach(function(pos){const block=new THREE.Mesh(logoGeo,logoMat);block.position.set((pos[0]-2)*.55,(2-pos[1])*.55,0);logoGroup.add(block)});function animateLogo(time){logoGroup.rotation.x=Math.sin(time*.0008)*.85;logoGroup.rotation.y=time*.00065;logoGroup.rotation.z=Math.cos(time*.00045)*.2;logoRenderer.render(logoScene,logoCamera);requestAnimationFrame(animateLogo)}requestAnimationFrame(animateLogo)}

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
function initBackgroundField(){
  const bgCanvas=document.getElementById('bg-canvas');
  if(!bgCanvas)return;
  const renderer=new THREE.WebGLRenderer({canvas:bgCanvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  const scene=new THREE.Scene();
  scene.fog=new THREE.Fog(0x05070a,16,42);
  const camera=new THREE.PerspectiveCamera(52,window.innerWidth/window.innerHeight,.1,120);
  camera.position.set(0,0,19);
  const blue=new THREE.MeshBasicMaterial({color:0x3399cc,transparent:true,opacity:.35});
  const cyan=new THREE.MeshBasicMaterial({color:0x50c8ff,transparent:true,opacity:.3});
  const violet=new THREE.MeshBasicMaterial({color:0xa879ff,transparent:true,opacity:.25});
  const wire=new THREE.MeshBasicMaterial({color:0x8fe0ff,wireframe:true,transparent:true,opacity:.2});
  const materials=[blue,cyan,cyan,violet,wire];
  const group=new THREE.Group();scene.add(group);
  const RANGE=26,cubes=[];
  for(let i=0;i<56;i++){
    const size=.3+Math.random()*.75;
    const cube=new THREE.Mesh(new THREE.BoxGeometry(size,size,size),materials[Math.floor(Math.random()*materials.length)]);
    cube.position.set((Math.random()-.5)*20,(Math.random()-.5)*RANGE,(Math.random()-.5)*14-3);
    cube.userData.baseY=cube.position.y;
    cube.userData.spin=[(Math.random()-.5)*.05,(Math.random()-.5)*.05,(Math.random()-.5)*.035];
    group.add(cube);cubes.push(cube);
  }
  let pointerX=0,pointerY=0,scrollOffset=0,eased=0;
  window.addEventListener('pointermove',function(event){pointerX=(event.clientX/window.innerWidth-.5)*2;pointerY=(event.clientY/window.innerHeight-.5)*2},{passive:true});
  window.addEventListener('scroll',function(){scrollOffset=window.scrollY*.045},{passive:true});
  function resize(){renderer.setSize(window.innerWidth,window.innerHeight,false);camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix()}
  resize();window.addEventListener('resize',resize);
  const clock=new THREE.Clock();
  function animateField(){
    const time=clock.getElapsedTime();
    eased+=(scrollOffset-eased)*.05;
    group.rotation.y=time*.015;
    camera.position.x=pointerX*.6;
    camera.position.y=-pointerY*.4;
    cubes.forEach(function(cube){
      let y=(cube.userData.baseY+eased)%RANGE;
      if(y>RANGE/2)y-=RANGE;if(y<-RANGE/2)y+=RANGE;
      cube.position.y=y;
      cube.rotation.x+=cube.userData.spin[0];
      cube.rotation.y+=cube.userData.spin[1];
      cube.rotation.z+=cube.userData.spin[2];
    });
    renderer.render(scene,camera);
    requestAnimationFrame(animateField)
  }
  requestAnimationFrame(animateField)
}
function initTimelineVisual(){
  const timelineCanvas=document.querySelector('.timeline-canvas');
  const phases=document.querySelectorAll('.phase[data-phase]');
  if(!timelineCanvas||!phases.length)return;
  const holder=timelineCanvas.parentElement;
  const renderer=new THREE.WebGLRenderer({canvas:timelineCanvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(42,1,.1,100);
  camera.position.set(0,0,8.5);
  const count=phases.length;
  const group=new THREE.Group();scene.add(group);
  const track=new THREE.Mesh(new THREE.TorusGeometry(2.4,.015,8,64),new THREE.MeshBasicMaterial({color:0x50c8ff,transparent:true,opacity:.25}));
  group.add(track);
  const nodes=[];
  function baseMat(){return new THREE.MeshStandardMaterial({color:0x11161c,emissive:0x020406,roughness:.4,metalness:.6})}
  function activeMat(){return new THREE.MeshStandardMaterial({color:0x3399cc,emissive:0x0d5b86,roughness:.22,metalness:.5})}
  for(let i=0;i<count;i++){
    const angle=(i/count)*Math.PI*2-Math.PI/2;
    const cube=new THREE.Mesh(new THREE.BoxGeometry(.8,.8,.8),baseMat());
    cube.position.set(Math.cos(angle)*2.4,Math.sin(angle)*2.4,0);
    group.add(cube);nodes.push(cube);
  }
  scene.add(new THREE.AmbientLight(0x6f8da1,.8));
  const key=new THREE.PointLight(0x50c8ff,2.6,20);key.position.set(4,4,6);scene.add(key);
  const rim=new THREE.PointLight(0xa879ff,1.4,18);rim.position.set(-4,-3,4);scene.add(rim);
  function resize(){const width=holder.clientWidth,height=holder.clientHeight;if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix()}
  resize();window.addEventListener('resize',resize);
  const progressLabel=document.querySelector('.timeline-progress');
  let activeIndex=0;
  const observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting)return;
      const idx=Number(entry.target.dataset.phase);
      activeIndex=idx;
      phases.forEach(function(phase){phase.classList.toggle('is-active',Number(phase.dataset.phase)===idx)});
      nodes.forEach(function(node,i){node.material=i===idx?activeMat():baseMat()});
      if(progressLabel)progressLabel.textContent='0'+(idx+1)+' / 0'+count;
    });
  },{threshold:.5,rootMargin:'-35% 0px -35% 0px'});
  phases.forEach(function(phase){observer.observe(phase)});
  const clock=new THREE.Clock();
  function animateTimeline(){
    const time=clock.getElapsedTime();
    const targetRotation=-(activeIndex/count)*Math.PI*2;
    group.rotation.z+=(targetRotation-group.rotation.z)*.05;
    group.rotation.y=Math.sin(time*.2)*.12;
    nodes.forEach(function(node,i){const target=i===activeIndex?1.3:1;node.scale.x+=(target-node.scale.x)*.08;node.scale.y=node.scale.z=node.scale.x});
    renderer.render(scene,camera);
    requestAnimationFrame(animateTimeline)
  }
  requestAnimationFrame(animateTimeline)
}
initTimelineVisual();

initBackgroundField();

document.querySelectorAll('.page-canvas').forEach(initPageCore);

const canvas=document.getElementById('world-canvas'),hero=document.querySelector('.hero');if(!canvas||!hero)return;const renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.outputEncoding=THREE.sRGBEncoding;const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,100);camera.position.set(0,0,12);const core=new THREE.Group();core.position.x=3.25;scene.add(core);const blue=new THREE.MeshStandardMaterial({color:0x3399cc,emissive:0x062d43,roughness:.28,metalness:.48}),dark=new THREE.MeshStandardMaterial({color:0x111923,emissive:0x020406,roughness:.4,metalness:.75}),cyan=new THREE.MeshBasicMaterial({color:0x00f0ff}),violet=new THREE.MeshBasicMaterial({color:0xa879ff}),acid=new THREE.MeshBasicMaterial({color:0xc6ff00}),cubeGeometry=new THREE.BoxGeometry(.72,.72,.72);for(let x=0;x<5;x++){for(let y=0;y<5;y++){for(let z=0;z<5;z++){if(Math.random()>.58||(x>0&&x<4&&y>0&&y<4&&z>0&&z<4))continue;const cube=new THREE.Mesh(cubeGeometry,Math.random()>.38?blue:dark);cube.position.set((x-2)*.78,(y-2)*.78,(z-2)*.78);cube.userData.origin=cube.position.clone();cube.userData.phase=Math.random()*Math.PI*2;core.add(cube)}}}const nodes=new THREE.Group();core.add(nodes);[cyan,violet,acid].forEach(function(material,i){const node=new THREE.Mesh(new THREE.BoxGeometry(.24,.24,.24),material);node.position.set(i===0?3.3:-2.8,i===1?2.5:-1.9,i===2?1.8:-.5);nodes.add(node)});const wire=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(5.2,5.2,5.2)),new THREE.LineBasicMaterial({color:0x50c8ff,transparent:true,opacity:.18}));core.add(wire);scene.add(new THREE.AmbientLight(0x6f8da1,.75));const key=new THREE.PointLight(0x50c8ff,3.4,30);key.position.set(5,5,7);scene.add(key);const rim=new THREE.PointLight(0xa879ff,2.2,26);rim.position.set(-4,-3,3);scene.add(rim);let pointerX=0,pointerY=0;window.addEventListener('pointermove',function(event){pointerX=(event.clientX/window.innerWidth-.5)*2;pointerY=(event.clientY/window.innerHeight-.5)*2},{passive:true});function resize(){const width=hero.clientWidth,height=hero.clientHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();core.position.x=width<760?1.4:3.25}resize();window.addEventListener('resize',resize);const clock=new THREE.Clock();function animate(){const time=clock.getElapsedTime(),scroll=Math.min(window.scrollY/Math.max(hero.offsetHeight,1),1);core.rotation.x+=((pointerY*.14)+time*.035-core.rotation.x)*.025;core.rotation.y+=((pointerX*.18)+time*.09-core.rotation.y)*.025;core.rotation.z=scroll*.35;core.position.y=scroll*-2;core.children.forEach(function(child){if(!child.userData.origin)return;const pulse=Math.sin(time*1.2+child.userData.phase)*.035;child.position.copy(child.userData.origin).multiplyScalar(1+pulse)});nodes.rotation.y=-time*.35;nodes.rotation.x=time*.2;renderer.render(scene,camera);requestAnimationFrame(animate)}animate()})();
