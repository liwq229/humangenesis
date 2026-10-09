# CAL project page

Project website for **Collaborative Real2Sim–Sim2Real Agential Learning for Geometric and Generative Human Dynamics**.

- Website: https://liwq229.github.io/cal/
- Paper links: https://liwq229.github.io/cal/
- Entry point: `index.html`
- Styling and interactions: `static/css/index.css`, `static/js/index.js`

## Preview

From this directory, run `python3 -m http.server 8000` and open http://localhost:8000. No build step, package installation, or external JavaScript libraries are required.

## Content provenance

The content and numerical results follow the supplied `CAL_IJCV` manuscript. The website does not distribute the manuscript PDF; paper links point to the project homepage. Website figures are WebP renderings of the active manuscript figures, using each PDF's CropBox and retaining every panel:

| Website image | Manuscript asset |
| --- | --- |
| `teaser.webp` | `figures/first_page/intro.pdf` |
| `framework.webp` | `figures/framework/human_framework_s2m.pdf` |
| `comparison.webp` | `figures/main2.pdf` |
| `critique.webp` | `figures/spatial_fine_grained_reconstruciton.pdf` |
| `reconstruction.webp` | `figures/comp_sfg.pdf` |
| `temporal.webp` | `figures/VDM/vdm1.pdf` |
| `back-to-4d.webp` | `figures/ablation/ablation_idr.pdf` |
| `novel-motion.webp` | `figures/suppl_v2_fonts.pdf` |
| `cross-video.webp` | `figures/cross_video-v2_fonts.pdf` |
| `reenactment.webp` | `figures/suppl_novel_scene_v2.pdf` |

Benchmark data are reproduced from the manuscript's `main`, `3d`, `ablation`, `ablation_agents`, and `ablation_1` tables. The HumanVid comparison protocol is stated alongside the results. The manuscript citation deliberately does not assert journal acceptance or a DOI.

The five existing files under `humanGenesis/videos/` are preserved byte-for-byte. Video controls and accessibility labels are part of the page. Switching video tabs pauses the hidden videos; nothing autoplays. All tab content remains visible without JavaScript. Figure links work as direct image links without JavaScript.

The original page used the [Nerfies website template](https://github.com/nerfies/nerfies.github.io). The CAL redesign uses local assets, native browser APIs, and system fonts.
