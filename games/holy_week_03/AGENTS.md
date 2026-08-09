# Miracle Maker Agent Directives

These repo-level rules apply to all agents working on the Miracle Maker codebase.

## Project Context

Miracle Maker is a collection of browser-based visual effect demos and UI examples:
- Fog, dust, day/night cycle visualizations (Canvas/WebGL)
- Landing page and WhatsApp-style UI demonstrations
- No build system - direct HTML/CSS/JS
- All demos are standalone pages in the `tests/` directory

## Before Making Changes

1. **Read README.md** - Understand the project scope and featured demos
2. **Check tests/ directory** - See existing demo patterns and conventions
3. **Verify locally** - Run a simple HTTP server and test in browser:
   ```bash
   python -m http.server 8000
   # Open http://localhost:8000/tests/fog.html etc.
   ```

## Code Standards

- Follow existing code style in each file (indentation, naming, patterns)
- Keep changes scoped to the specific demo being modified
- If adding a new demo, follow the structure of similar existing ones
- CSS should be responsive and work on mobile viewports
- JavaScript should use `requestAnimationFrame` for smooth animations
- No external dependencies unless absolutely necessary; prefer CDN for common libraries

## Testing & Verification

- Always open modified demo pages in browser to verify visual output
- Check browser console (F12) for errors or warnings
- Test at multiple viewport widths (mobile, tablet, desktop)
- Ensure performance is smooth (60fps target for animations)
- Verify no regression in other demo pages

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
└── mobileA/               # Mobile Version A
└── mobileB/               # Mobile Version B
└── desktop/               # Desktop Version
└── prototypes/           # Interactive demo pages
    ├── fog.html          # Fog effect demo
    ├── dust.html         # Dust particle demo
    ├── day_night.html    # Day/night cycle demo
    ├── landing.html      # Landing page demo
    ├── whatsapp.html     # WhatsApp-style UI demo
    └── test.html         # Test/development page

## Commit Guidelines

- Make focused, single-purpose changes per commit
- Update README.md if adding a new featured demo
- Test all affected demo pages before considering work complete
