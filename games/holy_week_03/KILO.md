# Miracle Maker -- Kilo Instructions

You are Kilo, a skilled software engineering assistant for **Miracle Maker**, a web-based visual effects and interactive demo project.

## Project Overview

Miracle Maker is a collection of interactive web-based visual effects and UI demos, including:
- 🌫️ Fog Effect - Real-time atmospheric fog rendering
- ✨ VFX Demo - Visual effects and particle systems
- 🛬 Landing Page - Example UI and layout components
- 🛬 WhatsApp Page - Chat interface demonstration

## Project Structure

```
/ (project root)
├── index.html              # Main landing page
├── README.md              # Project documentation
├── *.md                   # Agent instruction files
├── css/                   # Stylesheets and CSS modules
├── js/                    # JavaScript files and modules
├── assets/                # Images, fonts, and static resources
├── artwork/               # Design assets, concept art, graphics
├── info/                  # Documentation and metadata
├── .kilo/                 # Kilo CLI configuration
└── tests/                 # Interactive demo pages
    ├── fog.html          # Fog effect demo
    ├── dust.html         # Dust particle demo
    ├── day_night.html    # Day/night cycle demo
    ├── landing.html      # Landing page demo
    ├── whatsapp.html     # WhatsApp-style UI demo
    └── test.html         # Test/development page
```
/ (project root)
├── index.html              # Main entry point
├── README.md              # Project documentation
├── *.md                   # Agent instruction files
└── tests/                 # Interactive demo pages
    ├── fog.html          # Fog effect demo
    ├── dust.html         # Dust particle demo
    ├── day_night.html    # Day/night cycle demo
    ├── landing.html      # Landing page demo
    ├── whatsapp.html     # WhatsApp-style UI demo
    └── test.html         # Test/development page
```

## Technology Stack

- HTML5, CSS3, JavaScript (vanilla or with frameworks as seen in codebase)
- Canvas/WebGL for visual effects (fog, particles, etc.)
- Responsive design principles
- No build step required - direct browser execution

## Workflow Guidelines

1. **Browser-based testing**: All demos run directly in the browser. Test changes by opening the HTML files locally or via a simple HTTP server.
2. **Visual verification**: For visual effects, verify in browser with dev tools open. Check console for errors.
3. **Cross-browser compatibility**: Ensure effects work in modern browsers (Chrome, Firefox, Safari, Edge).
4. **Performance**: Visual effects should maintain 60fps on modern hardware. Use requestAnimationFrame for animations.
5. **Code conventions**: Follow existing patterns in the codebase. Match naming conventions and structure.

## Available Tools & Priorities

1. **Read/Glob/Grep** for local codebase exploration (primary tools)
2. **Browser dev tools** for debugging visual effects
3. **Web research tools** (Context7, Web Search, Web Fetch) for library documentation when needed
4. **Visual analysis tools** only when analyzing screenshots of rendered output

## Quality Checklist

Before considering changes complete:
- ✅ All demos load without console errors
- ✅ Visual effects render correctly
- ✅ Responsive layout works at common viewport sizes
- ✅ No performance regressions (check FPS in dev tools)
- ✅ Code follows existing style in the file being modified

## Common Tasks

### Updating a visual effect
1. Locate the relevant HTML/JS file in `tests/`
2. Make changes to canvas rendering or CSS
3. Open file in browser to verify visual output
4. Check browser console for errors

### Adding a new demo page
1. Create new HTML file in `tests/` directory
2. Follow existing pattern from similar demos
3. Link from README.md if it should be featured
4. Test in multiple browsers

### Styling updates
1. Check if styles are inline or external CSS
2. Maintain consistency with existing design system
3. Test responsive breakpoints

## Notes

- This is a client-side only project - no server-side code
- Dependencies (if any) should be loaded via CDN or local files
- Keep changes focused and minimal - these are standalone demo pages
