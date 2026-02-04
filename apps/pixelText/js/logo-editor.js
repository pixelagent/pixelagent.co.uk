// Logo Editor module
// Wires the right-side logo editor controls to the preview canvas.

(function(){
  // Wait for DOM
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('previewCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Ensure a default size for preview canvas
    const PREVIEW_SIZE = 512;
    canvas.width = PREVIEW_SIZE;
    canvas.height = PREVIEW_SIZE;

    // Controls
    const textInput = document.getElementById('logoTextInput');
    const fontSize = document.getElementById('logoFontSize');
    const fillColor = document.getElementById('logoFillColor');
    const strokeColor = document.getElementById('logoStrokeColor');
    const strokeWidth = document.getElementById('logoStrokeWidth');
    const iconSelect = document.getElementById('logoIconSelect');
    const iconSize = document.getElementById('logoIconSize');
    const bgColor = document.getElementById('bgColor');
    const bgImageInput = document.getElementById('bgImageInput');
    const addFrameBtn = document.getElementById('addLogoFrame');
    const removeFrameBtn = document.getElementById('removeLogoFrame');
    const fpsControl = document.getElementById('logoFPS');

    // Simple frames array (each frame stores text/options snapshot)
    const frames = [];
    let currentFrame = 0;

    // Background image object
    let bgImage = null;

    function drawIcon(name, x, y, size){
      ctx.save();
      ctx.translate(x, y);
      // Draw a few built-in icons as simple shapes
      ctx.fillStyle = fillColor.value;
      ctx.strokeStyle = strokeColor.value;
      ctx.lineWidth = parseInt(strokeWidth.value, 10) || 0;
      if(name === 'star'){
        // draw a simple star
        const r = size/2;
        ctx.beginPath();
        for(let i=0;i<5;i++){
          ctx.lineTo(Math.cos((18+72*i)/180*Math.PI)*r, -Math.sin((18+72*i)/180*Math.PI)*r);
          ctx.lineTo(Math.cos((54+72*i)/180*Math.PI)*(r*0.5), -Math.sin((54+72*i)/180*Math.PI)*(r*0.5));
        }
        ctx.closePath();
        ctx.fill();
        if(ctx.lineWidth>0) ctx.stroke();
      } else if(name === 'bolt'){
        ctx.beginPath();
        ctx.moveTo(-size*0.2, -size*0.5);
        ctx.lineTo(size*0.2, -size*0.1);
        ctx.lineTo(-size*0.05, -size*0.1);
        ctx.lineTo(size*0.35, size*0.5);
        ctx.lineTo(-size*0.25, size*0.05);
        ctx.lineTo(size*0.05, size*0.05);
        ctx.closePath();
        ctx.fill();
        if(ctx.lineWidth>0) ctx.stroke();
      } else if(name === 'heart'){
        ctx.beginPath();
        const s = size/2;
        ctx.moveTo(0, s*0.6);
        ctx.bezierCurveTo(-s, s*0.1, -s*0.6, -s*0.6, 0, -s*0.2);
        ctx.bezierCurveTo(s*0.6, -s*0.6, s, s*0.1, 0, s*0.6);
        ctx.closePath();
        ctx.fill();
        if(ctx.lineWidth>0) ctx.stroke();
      }
      ctx.restore();
    }

    function render(){
      // Clear
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // Background
      ctx.fillStyle = bgColor.value || '#ffffff';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      if(bgImage){
        // draw background image fitted
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      }

      // Draw icon if present
      const icon = iconSelect ? iconSelect.value : 'none';
      if(icon && icon !== 'none'){
        drawIcon(icon, canvas.width/2 - 100, canvas.height/2, parseInt(iconSize.value,10)||64);
      }

      // Draw text
      const txt = textInput ? textInput.value : '';
      const size = fontSize ? parseInt(fontSize.value,10) : 72;
      ctx.font = `${size}px Inter, Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if(parseInt(strokeWidth.value,10) > 0){
        ctx.lineWidth = parseInt(strokeWidth.value,10);
        ctx.strokeStyle = strokeColor.value;
        ctx.strokeText(txt, canvas.width/2 + 50, canvas.height/2);
      }
      ctx.fillStyle = fillColor.value;
      ctx.fillText(txt, canvas.width/2 + 50, canvas.height/2);
    }

    // Input listeners
    [textInput, fontSize, fillColor, strokeColor, strokeWidth, iconSelect, iconSize, bgColor, fpsControl].forEach(el => {
      if(!el) return;
      el.addEventListener('input', render);
      el.addEventListener('change', render);
    });

    bgImageInput && bgImageInput.addEventListener('change', (e)=>{
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      const img = new Image();
      img.onload = ()=>{ bgImage = img; render(); };
      img.src = URL.createObjectURL(file);
    });

    // Frames
    function captureFrame(){
      frames.push({
        text: textInput.value,
        fontSize: fontSize.value,
        fill: fillColor.value,
        stroke: strokeColor.value,
        strokeWidth: strokeWidth.value,
        icon: iconSelect.value,
        iconSize: iconSize.value,
        bgColor: bgColor.value,
        bgImage: bgImage ? bgImage.src : null
      });
      currentFrame = frames.length-1;
    }

    addFrameBtn && addFrameBtn.addEventListener('click', ()=>{
      captureFrame();
    });
    removeFrameBtn && removeFrameBtn.addEventListener('click', ()=>{
      if(frames.length === 0) return;
      frames.pop();
      currentFrame = Math.max(0, frames.length-1);
    });

    // Initial render
    render();

    // Side tab switching (also keep local if not already wired)
    const sideTabs = document.querySelectorAll('#logoSideTabs .side-tab');
    const panels = document.querySelectorAll('#logoSideTabs .content-panel');
    sideTabs.forEach(tab => {
      tab.addEventListener('click', ()=>{
        const target = tab.getAttribute('data-target');
        sideTabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        panels.forEach(p=>{ if(p.id === target) p.classList.add('active'); else p.classList.remove('active'); });
      });
    });

  });
})();
