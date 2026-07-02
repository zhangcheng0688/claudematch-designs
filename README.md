# claudematch-designs

> UI/UX design source files and interactive prototypes for **linQ / ClaudeMatch**.

This repo holds the design-only source files (JSX prototypes, design tokens, components, icons, and sample data) that were originally created in `/Users/chenwanyi/designs/claude-match/`.

## Files

| File | Purpose |
|---|---|
| `index.html` | Standalone prototype shell with iOS-style design tokens, dark/light theme support, and React/Babel CDN loader |
| `app.jsx` | Main application screens and navigation flows |
| `components.jsx` | Reusable UI components (SearchBar, SegmentedControl, ModelCard, CompareTray, etc.) |
| `icons.jsx` | Icon components used across the prototype |
| `data.jsx` | Sample data: categories, models, tags, comparison matrix |
| `_d_meta.json` | Design metadata (versioning / review status) |

## How to preview

Open `index.html` directly in a browser. It loads React 18 from a CDN and compiles the JSX modules with Babel standalone, so no build step is required.

```bash
open index.html
```

Or serve it locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Relationship to product repos

- Production web app: [zhangcheng0688/claudematch](https://github.com/zhangcheng0688/claudematch)
- WeChat mini-program: [zhangcheng0688/claudematch-weapp](https://github.com/zhangcheng0688/claudematch-weapp)
- This repo: design exploration and UI/UX iteration archive

## Notes

- This is a **design prototype**, not production code.
- The visual direction here (iOS native light mode with SF-style tokens) may differ from the current production dark-themed web app.
- Future UI/UX iterations should be committed here first for review before being ported to the production repositories.
