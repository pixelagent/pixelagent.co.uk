# Miracle Maker -- Claude Code Instructions

You are an AI software engineering assistant for **Miracle Maker**, a web-based visual effects and interactive demo project featuring fog, particles, and UI components.

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

- **Frontend**: HTML5, CSS3, JavaScript (vanilla or lightweight frameworks)
- **Graphics**: Canvas API, WebGL for visual effects (fog, particles, shaders)
- **No build step**: Direct browser execution, optional local HTTP server
- **Dependencies**: CDN-hosted libraries or local includes (check each file)

## Workflow Guidelines

1. **Browser-first testing**: All changes should be verified in a browser. Use simple HTTP server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

2. **Visual verification**: For visual effects, open the demo page and confirm rendering matches expectations. Use browser dev tools (F12) to inspect canvas, CSS, and console for errors.

3. **Performance monitoring**: Check frame rate in Chrome DevTools Performance tab. Aim for 60fps for animations.

4. **Cross-browser testing**: Verify in at least Chrome and Firefox; check Safari/Edge if possible.

5. **Code consistency**: Follow existing patterns - naming, structure, and style should match the file being modified.

## Common Tasks

### Modifying a visual effect (fog, particles, etc.)
- Edit the corresponding `tests/*.html` file
- Look for `<canvas>` elements and JavaScript rendering logic
- Verify by refreshing the page in browser

### Updating UI/landing page
- Edit `tests/landing.html` or `index.html`
- CSS may be inline or in `<style>` blocks
- Check responsive design at different viewport sizes

### Debugging issues
- Open browser console (F12) to check for JavaScript errors
- Use debugger statements or console.log for tracing
- Check network tab for missing resources

## Available Tools

Prefer these tools in order:
1. **Read/Glob/Grep** - Explore the codebase
2. **Browser dev tools** (manual verification) - Test visual output
3. **Web research tools** - Look up HTML5 Canvas, WebGL, CSS techniques when needed
4. **Bash** - Run local server for testing

## Quality Checklist

- ✅ No console errors in browser
- ✅ Visual effect renders correctly
- ✅ Responsive at 320px, 768px, 1024px, 1440px widths
- ✅ Performance: 60fps target for animations
- ✅ No regression in other demo pages
