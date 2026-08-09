# Miracle Maker -- Gemini (Jarvis) Instructions

You are an AI engineering assistant for **Miracle Maker**, a web-based visual effects showcase project with interactive Canvas/WebGL demos.

## Project Summary

Miracle Maker demonstrates browser-based visual effects including:
- Atmospheric fog rendering
- Particle systems (dust, etc.)
- Day/night lighting cycles
- UI component demos (landing page, WhatsApp chat interface)

All demos are plain HTML/CSS/JS files in the `tests/` directory. No build process - open directly in browser or via local HTTP server.

## Directory Layout

```
miracle-maker/
├── index.html              # Homepage with links to demos
├── README.md              # Project description & links
├── KILO.md                # Kilo-specific instructions
├── CLAUDE.md              # Claude-specific instructions
├── AGENTS.md              # Shared agent directives
├── GEMINI.md              # This file
├── css/                   # Stylesheets
├── js/                    # JavaScript modules
├── assets/                # Images, fonts, static resources
├── artwork/               # Design assets, concept art
├── info/                  # Documentation
└── tests/                 # Interactive demo pages
    ├── fog.html          # Fog effect demo
    ├── dust.html         # Dust particle demo
    ├── day_night.html    # Day/night cycle demo
    ├── landing.html      # Landing page demo
    ├── whatsapp.html     # WhatsApp-style UI demo
    └── test.html         # Test/development page
```
miracle-maker/
├── index.html              # Homepage with links to demos
├── README.md              # Project description & links
├── KILO.md                # Kilo-specific instructions
├── CLAUDE.md              # Claude-specific instructions
├── AGENTS.md              # Shared agent directives
├── GEMINI.md              # This file
└── tests/                 # Demo implementations
    ├── fog.html          # Fog effect (Canvas/WebGL)
    ├── dust.html         # Dust particles
    ├── day_night.html    # Day/night cycle
    ├── landing.html      # Landing page UI
    ├── whatsapp.html     # WhatsApp-style interface
    └── test.html         # Development sandbox
```

## Tech Stack

- **HTML5** - Structure and Canvas elements
- **CSS3** - Styling, animations, responsive design
- **JavaScript (ES6+)** - Rendering logic, event handling
- **Canvas 2D / WebGL** - Visual effects rendering
- Optional: lightweight libraries (GSAP, Three.js, etc.) - check existing code

## Development Workflow

1. **Start local server** (recommended):
   ```bash
   python -m http.server 8000
   # Access at http://localhost:8000/tests/
   ```

2. **Make changes** to the relevant HTML/CSS/JS file

3. **Verify in browser**:
   - Open the demo page
   - Check visual output matches expectations
   - Open DevTools (F12) → Console for errors
   - Check Performance tab for frame rate (aim 60fps)

4. **Test across**:
   - Viewport sizes (mobile 320px, tablet 768px, desktop 1024px+)
   - Browsers (Chrome, Firefox, Safari)
   - Different hardware if possible (integrated vs dedicated GPU)

## Common Patterns Observed

- Each demo is self-contained in a single HTML file
- Inline `<style>` blocks for CSS, inline `<script>` for JS
- Canvas setup with `requestAnimationFrame` loop
- Configuration objects for effect parameters
- Resize handlers for responsive canvas

## Tools to Use

- **Read/Glob/Grep** - Navigate and understand codebase
- **Browser DevTools** - Primary debugging (console, debugger, performance)
- **Web research** (Context7, Web Search) - For Canvas/WebGL API questions
- **Bash** - Run local server

## Quality Gates

Every change must pass:
- ✅ No JavaScript errors in console
- ✅ Visual effect renders correctly at multiple resolutions
- ✅ Smooth animation (≥55 fps on modern hardware)
- ✅ Mobile-responsive layout (no overflow, readable on small screens)
- ✅ No regression in other demo pages

## Adding a New Demo

1. Create `tests/new-effect.html` following pattern from `fog.html` or `dust.html`
2. Add link to `index.html` and `README.md` under appropriate section
3. Test thoroughly in browser
4. Ensure no external dependencies that could break (use reliable CDNs)

## Notes

- This is **not** a game engine or full application - these are isolated tech demos
- Keep modifications minimal and focused
- Performance matters - optimize canvas drawing and avoid layout thrashing
- Document complex algorithms with inline comments
