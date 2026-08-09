import os

html_path = 'prototypes/labs5.html'
gfx_dir = 'assets/gfx'

with open(html_path, 'r') as f:
    html = f.read()

print('Read', len(html), 'bytes')

svg_entries = []
for fname in sorted(os.listdir(gfx_dir)):
    if fname.endswith('.svg'):
        with open(os.path.join(gfx_dir, fname), 'r') as f:
            content = f.read()
        escaped = content.replace('\\', '\\\\').replace('`', '\\`')
        svg_entries.append(f'  "{fname}": `{escaped}`')

svg_map_js = 'const ICON_SVGS = {\n' + ',\n'.join(svg_entries) + '\n};'

inline_fn = '''function inlineIcon(icon) {
  if (!icon || typeof icon !== 'string') return icon || '';
  let result = icon.replace(/<img[^>]*src=["']\\.\\.\\/assets\\/gfx\\/([^"']+\\.svg)["'][^>]*>/g, (match, fileName) => {
    return ICON_SVGS[fileName] || match;
  });
  if (result === icon) {
    const m = result.match(/\\.\\.\\/assets\\/gfx\\/([^"']+\\.svg)$/);
    if (m) result = ICON_SVGS[m[1]] || result;
  }
  return result;
}'''

old_css = '''    .ev-icon {
      font-size: 1.2rem;
    }'''
new_css = '''    .ev-icon {
      font-size: 1.2rem;
    }

    .ev-icon svg, .icon-svg {
      width: 1.2rem;
      height: 1.2rem;
      display: inline-block;
      vertical-align: middle;
    }

'''
html = html.replace(old_css, new_css)

old_script = '''<script type="module">
  import { NavigationMenu } from './menu.js';

  // Default initial evidence bank (fallback)'''
new_script = f'''<script type="module">
  import {{ NavigationMenu }} from './menu.js';

  {svg_map_js}

  {inline_fn}

  // Default initial evidence bank (fallback)'''
html = html.replace(old_script, new_script)

old_load = '''    } else {
      evidence = [];
    }

    // Reset workspace state'''
new_load = '''    } else {
      evidence = [];
    }

    // Inline SVG icons for self-contained rendering
    evidence = evidence.map(e => {
      if (e && e.icon) e = {...e, icon: inlineIcon(e.icon)};
      return e;
    });

    // Reset workspace state'''
html = html.replace(old_load, new_load)

with open(html_path, 'w') as f:
    f.write(html)

print('Wrote', len(html), 'bytes')
