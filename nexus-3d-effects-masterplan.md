# NEXUS — 3D Effects Master Plan
## 3 Sections · Image Gen Prompts · Master Dev Prompt

*Based on: images 1–3 (visual direction), screenshots 4–5 (current site), skill zip (R3F / GLSL / Anatomy / Instancing / ScrollTrigger / Particle), Anatomy_skill.md*

---

## SECTION 01 — HERO: RAYMARCHED SDF OBJECT
*The glowing mathematical sculpture that rotates live in the right panel*

### What You Saw / What You Liked
Image 1 shows "NEXUS" on the left, a rotating icosahedron-torus-knot hybrid on the right — glowing lime-green wireframe lines, inner energy, dark glass body. You want this as a **live WebGL raymarched SDF** — not a static render, not a 3D model — pure math, pure fragment shader, rotating in real time, responding to cursor and scroll.

---

### UPGRADED HERO VARIANTS (pick one or combine)

**Variant A — MORPHING TRIPLE SDF (closest to Image 1)**
The hero object shifts between three mathematical forms over a 12-second loop:
- State 1: **Icosahedron SDF** → sharp angular vertices, edges catch lime glow
- State 2: **Smooth union with torus knot SDF** → the forms melt into each other, inner energy builds
- State 3: **Gyroid surface** → infinitely repeating saddle-point structure, feels alien and organic

Transition is a GLSL `smin()` smooth union blending between the SDFs driven by a `uMorph` uniform on a sine wave. No jump cuts — pure continuous mutation.

**Variant B — THE LIVING LATTICE**
An SDF lattice structure — an infinite gyroid inside a sphere clipping mask — where lime energy pulses radially outward from the center. The lattice breathes slowly (scale pulsing). Cursor = camera orbit. Scroll down = lattice collapses inward and the services section rises.

**Variant C — CHARGED VOID (most premium)**
A dark sphere with raymarched subsurface scattering — like a black planet with green lava veins that respond to cursor position. The veins are procedural noise in the SDF normal displacement. Feels like holding a living artifact.

---

### IMAGE GENERATION PROMPT — Hero (Variant A, matching Image 1)

```
Ultra-premium dark agency website hero section. Black background #050505.
Left 40%: the word "NEXUS" in massive 110px white bold sans-serif (Neue Haas Grotesk 
weight), left-aligned. Below it: thin lime green #CAFF00 horizontal rule 48px wide, 
then "AI. Data. Web. Built to scale." in 14px monospace. Bottom left: small circle 
with dot and "SCROLL" label in lime.

Right 60%: a large glowing 3D mathematical SDF object mid-morph between an 
icosahedron and a torus knot. The object is dark glass-black in body with thin 
electric lime-green #CAFF00 wireframe-like edge lines following the surface topology. 
Inside the object: pulsing lime inner glow radiating from the center like a reactor 
core. Around the object: thin orbit lines/rings at 30° and 60° angles in very dim 
lime. Several small dark glass sphere satellites around it.

Art style: GLSL raymarched SDF render aesthetic. Cinematic depth of field. UnrealBloom 
postprocessing on all lime elements. The object casts no harsh shadows — it glows 
from within. Pure black background, no gradients, no vignette. 16:9 ratio. 
Photorealistic rendering quality. This is a live WebGL scene, not a 3D model.
```

---

### SKILLS TO BUILD THIS

| Skill File | Why You Need It |
|---|---|
| `06-threejs-webgl/glsl-raymarching.md` | Core: SDF construction, smooth union morphing, `smin()`, camera ray construction |
| `07-glsl-shaders/fragment-shader-patterns.md` | `uMouse` uniform → camera orbit; `uTime` → morph sine wave; `uScroll` → collapse |
| `07-glsl-shaders/perlin-simplex-noise.md` | Procedural displacement on SDF normals → gives the veiny organic surface |
| `06-threejs-webgl/r3f-setup.md` | R3F canvas setup, ShaderMaterial on a fullscreen plane mesh |
| `06-threejs-webgl/postprocessing-presets.md` | UnrealBloom pass on the lime emissive surface |
| `07-glsl-shaders/vertex-shader-patterns.md` | Fullscreen triangle trick for maximum performance |

**Key Uniforms to expose:**
```glsl
uniform float uTime;      // drives morph + rotation
uniform vec2 uMouse;      // normalized -1 to 1, drives camera yaw/pitch orbit
uniform float uScroll;    // 0→1 scroll progress, drives object scale collapse
uniform float uMorph;     // 0→1→2 state machine: ico → torus-knot → gyroid
```

---

---

## SECTION 02 — SERVICES: ANATOMY EXPLODED CARDS
*Each service = a different 3D anatomy diagram of what it IS*

### The Problem With Original Idea 2
The original was "show a brain for AI" — fine but singular. You have **5+ services** (AI Solutions, Website Creation, Data Engineering, Product Design, Cloud & DevOps). Each needs its own distinct anatomy object. The brain was used in Image 2 for AI, but we need fresh objects for every other service.

---

### SERVICE ANATOMY OBJECT LIBRARY — FULLY BRAINSTORMED

**01 — AI Solutions → EXPLODED NEURAL PROCESSOR**
Not a generic brain. A custom-built **neural processing chip** — flat square die with micro-columns of transistors, a heat spreader layer that lifts off, wiring substrates that fan outward, and labeled nodes: LLM Layer / RAG Pipeline / Vector Embeddings / Output Gate. Think: CPU teardown meets neuron diagram. Parts separated in isometric space, each floating with a thin connection line to its label.

*Why this works:* AI is silicon before it's biology. A chip is more precise and more NEXUS-brand than an organic brain. Also avoids the cliché.

---

**02 — Website Creation → EXPLODED BROWSER VIEWPORT**
A 3D isometric browser window deconstructed into stacked layers floating apart:
- Top panel: DNS + SSL certificate (security shield shape)
- Layer 2: CDN / hosting infrastructure (server rack slab)
- Layer 3: Backend API (circuit board with request/response arrows)
- Layer 4: React/Next.js component tree (nested box hierarchy)
- Layer 5: CSS layout system (grid lines, flexbox visualization)
- Front glass: The rendered pixel output (dim screen with the final UI)

Each layer is a flat dark slab with lime-green circuit traces on edges. Gap between layers reveals the stack.

---

**03 — Data Engineering → EXPLODED PIPELINE CORE**
A cylindrical data pipeline broken into its physical components — cross-section view:
- Outer ring: Raw ingestion layer (firehose nozzle shape)
- Second ring: Transformation/ETL core (gear-like cog cross-section)
- Inner cylinder: Warehouse storage (stacked disk platters in isometric)
- Center: Query engine (radiating output beams)
- Floating above: Dashboard glass panel (dim chart visualization)

Labels: "Ingestion", "Transform", "Store", "Serve", "Visualize"

---

**04 — Product Design → EXPLODED DESIGN SYSTEM STACK**
A smartphone form factor split into its design-system layers — not a real phone teardown, but a **design-abstraction teardown**:
- Screen glass: Final user-facing UI
- Layer: Typography system (floating letterforms at different scales)
- Layer: Color system (palette swatches arranged as panels)
- Layer: Component library (button, card, input rendered as 3D slabs)
- Layer: Design tokens (JSON-like key-value pairs as physical blocks)
- PCB base: Code → design handoff (Figma ↔ React arrows)

---

**05 — Cloud & DevOps → EXPLODED KUBERNETES CLUSTER**
A server rack broken into its logical layers in isometric space:
- Top: Cloud provider canopy (AWS/Azure-generic icon as a lid)
- Floating nodes: Pod instances (small capsule shapes in orbit)
- Middle ring: Load balancer (traffic routing lines between pods)
- Lower level: Database cluster (cylinder stack)
- Base: CI/CD pipeline ribbon (conveyor belt of build → test → deploy stages)
- Network lines between all layers in dim lime

---

### IMAGE GENERATION PROMPTS — Service Anatomy Cards

**AI Solutions (Neural Processor):**
```
Dark website service section split-screen. Left: service accordion list in near-black 
with lime #CAFF00 text — "AI Solutions" row active, expanded. Right half: an isometric 
exploded-view anatomy diagram of a silicon neural processor chip. Art style is 
precision technical illustration — dark matte slabs, warm lime-green #CAFF00 glowing 
edges, isometric 30° projection. Parts floating apart with gaps: a flat square die 
at center, micro-transistor columns lifting off the top surface, a heat spreader 
canopy above, wiring substrate panels fanning outward to the sides. Labels in white 
monospace: "LLM Layer", "RAG Pipeline", "Vector Embeddings", "Output Gate". Thin 
leader lines connecting labels to parts. Background pure black. Cinematic lighting 
from upper-left. Feels like an Apple silicon teardown meets neural network diagram. 
16:9.
```

**Website Creation (Browser Stack):**
```
Dark website service section. Right panel: an isometric exploded-view anatomy diagram 
of a web application stack. Five horizontal dark slab layers floating apart vertically 
in isometric space, each with glowing lime-green #CAFF00 circuit-trace edges. Top 
slab: DNS/SSL (security shield embossed). Second: CDN server rack. Third: API/backend 
circuit board with request arrows. Fourth: React component tree as nested isometric 
boxes. Fifth: rendered UI on a dark glass screen — a minimal web app interface visible 
behind the glass. Gaps between each layer reveal the depth. White monospace labels: 
"Hosting", "Backend", "Framework", "UI Layer". Background pure black. Isometric 
30° angle. Cinematic. 16:9.
```

**Data Engineering (Pipeline Core):**
```
Dark website service section. Right panel: an isometric exploded cross-section of a 
data pipeline cylinder. The cylinder is cut and layers float apart radially and 
vertically. Outer ring: funnel/ingestion nozzle in dark metal. Second ring: gear 
cross-section representing ETL transformation. Center: stacked disk platters for 
warehouse storage. Inner core: glowing lime radiating beams (query engine). Floating 
above: a glass dashboard panel showing dim chart lines. Lime green #CAFF00 glowing 
edges and trace lines between components. Labels: "Ingest", "Transform", "Warehouse", 
"Query", "Visualize". Black background. Isometric. Cinematic depth-of-field. 16:9.
```

**Product Design (Design System):**
```
Dark website service section. Right panel: an isometric exploded smartphone form, 
deconstructed into design-abstraction layers floating apart. Not a hardware teardown 
— a design-system teardown. Each layer is a dark slab: front glass with a minimal UI, 
floating typography letterforms at different scales, a color palette panel with lime 
#CAFF00 and neutral swatches, a component library layer showing button/card/input as 
3D raised blocks, a design-token layer with JSON-block shapes. Layers separated with 
visible gaps, connection lines in dim lime. Labels in white monospace. Background pure 
black. Warm isometric lighting. Cinematic. 16:9.
```

---

### SKILLS TO BUILD ANATOMY SERVICE CARDS

| Skill File | Why You Need It |
|---|---|
| `Anatomy_skill.md` | Core: `geometry.mjs` part-by-part convex hull construction, `apart` system, isometric projection, four-tone paper shading |
| `06-threejs-webgl/r3f-patterns.md` | R3F scene per service card, swap active scene on accordion click |
| `13-advanced-animation/animation-state-machine.md` | `assembled → exploding → exploded → collapsing → assembled` state machine per card |
| `3-animation-motion/gsap-core-SKILL.md` | Timeline for staged explosion: parts fly apart sequentially, not all at once |
| `06-threejs-webgl/threejs-lighting.md` | Isometric ambient + directional light setup, lime-tinted point light |
| `06-threejs-webgl/threejs-geometry.md` | ConvexGeometry for each anatomy part, BufferGeometry for flat slabs |

**Interaction model:**
```
User clicks service accordion row
→ state machine: current object "implodes" (0.4s)
→ new object's parts fly in from off-screen edges (0.8s stagger)
→ idle: objects breathe slowly (scale ±2% on 4s sine)
→ hover on a labeled part: that part glows brighter, label lifts up
```

---

---

## SECTION 03 — PROCESS: DISCOVER / PLAN / BUILD / SCALE
*The morphing shard process section — completely reimagined from Image 3*

### Why Image 3 Fell Short
Image 3 shows the magnifying glass shape made of polygon shards. The concept is right but the execution feels like a particle logo maker. Problems:
- Only the magnifying glass is recognizable — the other 3 states are just "scattered"
- No clear visual language connecting the 4 stages to their meaning
- The scatter-to-scatter transition isn't emotionally resonant

### NEW CONCEPT — "CONSTRUCTION METAPHOR" PROCESS
Each step uses a **construction/building metaphor in shard language** — the shards aren't just forming a shape, they're *physically enacting* the process step.

---

**01 / DISCOVER — RADAR PULSE SCAN**
Instead of a magnifying glass, the shards form a **radar/sonar dish** pointing outward — suggesting scanning the landscape, finding signals. A single lime pulse ring radiates outward from the dish center every 2 seconds. Shards at the outer edge of the ring scatter momentarily as the pulse passes through them.

*Why:* Discover = looking outward, scanning for opportunity. A radar is more precise and more tech than a magnifying glass.

---

**02 / PLAN — ISOMETRIC BLUEPRINT GRID**
Shards rearrange themselves into a **3D isometric wireframe grid** — the basis of architectural blueprints. Some shards are larger, forming the grid intersections; smaller shards form the connecting lines. The grid has depth — some shard-lines are closer, some farther. It slowly rotates in isometric space.

*Why:* Plan = structure, architecture, grid-thinking. The isometric grid is the visual language of all architectural planning.

---

**03 / BUILD — ASCENDING STRUCTURE**
The shard-grid starts from the bottom and shards **stack upward**, row by row, like construction floors going up. By the time all floors are placed, the structure is a 3D building/tower made of shards — visible floors, distinct levels. A lime construction beam slides across each completed level.

*Why:* Build = stacking, layering, constructing upward. The physical metaphor of construction is universal and emotionally satisfying to watch.

---

**04 / SCALE — FRACTAL MULTIPLICATION**
The complete shard tower **duplicates itself** — one copy becomes four, arranged in a 2×2 grid, then nine in a 3×3 grid — each copy slightly smaller, all identical. They multiply outward as the scroll reaches full progress. The multiplication continues beyond the screen edges, suggesting infinite scale.

*Why:* Scale = reproduction, multiplication, growth beyond the original. The fractal multiplication IS the concept, not a metaphor for it.

---

### IMAGE GENERATION PROMPTS — Process Section

**Full Section View:**
```
Dark website process section — horizontal four-panel layout. Black background. 
Each panel shows a different stage of shard-form construction, lit by lime-green 
#CAFF00 glow from the shards themselves.

Panel 1 (DISCOVER): 300 lime-green polygon glass shards assembled into a radar/sonar 
dish shape pointing left, slightly tilted in 3D. A circular lime pulse ring expands 
outward from the dish center. Some outer shards caught mid-scatter as the pulse passes. 
Label below: "01 / DISCOVER" in lime monospace, description in white small.

Panel 2 (PLAN): Shards arranged as a 3D isometric grid/blueprint — glowing 
intersection nodes at grid junctions, thinner shard-lines connecting them. The grid 
has depth/perspective. Some shards larger at structural points. Slowly rotating.
Label: "02 / PLAN".

Panel 3 (BUILD): A 3D tower structure built floor-by-floor from shards. Lower floors 
complete and bright, upper floors still assembling (shards converging from above). 
A horizontal lime construction line marks the current build level.
Label: "03 / BUILD".

Panel 4 (SCALE): One shard-tower is duplicating — now four identical towers arranged 
in 2×2, the outer ones partially off-screen. Multiplication lines connect the copies. 
Towers at different lime intensities (center brightest, outer dimmer).
Label: "04 / SCALE".

Below all panels: horizontal timeline connector with lime dots at each panel. 
Active dot (Panel 1) is filled lime, others are hollow circles.
Background: pure black. No texture. Cinematic depth of field. 16:9.
```

**Individual Panel — DISCOVER (high detail):**
```
A single large panel from a dark website. Black background. 400+ lime-green 
polygon glass shards assembled into a sonar/radar dish shape — a curved concave 
reflector facing left with a small focal point emitter at center. Each shard is 
a convex polygon 8–20px in apparent size, with glowing #CAFF00 lime edges and 
dark glass-black faces. A circular lime pulse ring (thin, glowing, expanding) 
radiates from the focal point — shards at the pulse frontier caught mid-scatter: 
some have just broken off and are millimeters away from their assembled positions. 
The dish structure is convincing — it reads as a radar dish immediately. 
Scattered orphan shards float in the black around the edges. 
Cinematic, GLSL shader aesthetic. No background. 9:16.
```

---

### SKILLS TO BUILD THE PROCESS SECTION

| Skill File | Why You Need It |
|---|---|
| `05-svg-canvas/canvas-particle-system.md` | Shard particle system: lifecycle, target positions per step, lerp to targets |
| `06-threejs-webgl/threejs-instancing.md` | InstancedMesh for 300+ shards — each shard is one instance |
| `3-animation-motion/gsap-scrolltrigger-SKILL.md` | Pin the section during scroll, scrub drives morph progress 0→1 per step |
| `3-animation-motion/lenis-setup-SKILL.md` | Smooth scroll velocity → silky scrub feel on the instanced shards |
| `13-advanced-animation/animation-state-machine.md` | Step 1 → Step 2 → Step 3 → Step 4 state machine, each with enter/exit animations |
| `04-js-browser-apis/raf-loop-patterns.md` | Per-frame lerp of shard positions toward their step-target positions |
| `07-glsl-shaders/perlin-simplex-noise.md` | Idle noise drift on shards between active animations — they never sit completely still |

**Shard morph architecture:**
```javascript
// Each shard has:
const shard = {
  id: i,
  currentPos: new THREE.Vector3(),  // where it is right now
  targetPositions: {
    discover: new THREE.Vector3(),  // position in radar dish form
    plan:     new THREE.Vector3(),  // position in isometric grid form
    build:    new THREE.Vector3(),  // position in tower form
    scale:    new THREE.Vector3(),  // position in multiplied form
  },
  noiseOffset: Math.random() * 100, // unique idle drift
}

// Per-frame lerp in RAF loop:
// currentPos.lerp(targetPositions[activeStep], 0.08)
// ScrollTrigger scrub controls which step is active
```

**ScrollTrigger pin setup:**
```javascript
ScrollTrigger.create({
  trigger: "#process-section",
  start: "top top",
  end: "+=400%",   // 4x viewport height = 4 steps
  pin: true,
  scrub: 0.5,      // smooth scrub via lenis
  onUpdate: (self) => {
    const step = Math.floor(self.progress * 4); // 0,1,2,3
    setActiveStep(['discover','plan','build','scale'][step]);
  }
})
```

---

---

## MASTER DEVELOPER PROMPT
*Copy-paste this to your dev team / Claude Code to build all 3 sections*

---

```
PROJECT: NEXUS website — https://nexus-one-rust-71.vercel.app/
TASK: Add 3 signature 3D sections using the skill library provided in the zip.

DESIGN LANGUAGE (do not deviate):
- Background: #050505 (near-pure black, NOT #111 or #0B0B0B)
- Accent: #CAFF00 (lime, used ONLY for glow, edges, and active states — never as fill)
- Text: #FFFFFF primary, #888888 secondary
- Font: existing site font family (check site CSS — likely monospace for labels, bold sans for display)
- NO gradients, NO card shadows, NO rounded corners on 3D elements
- All 3D scenes: R3F canvas, transparent background, z-index: 0, content z-index: 10

---

SECTION 01 — HERO: RAYMARCHED SDF OBJECT

Skills to read first (in order):
1. creative-claude-given-web-skills/01-Frontend/06-threejs-webgl/glsl-raymarching.md
2. creative-claude-given-web-skills/01-Frontend/07-glsl-shaders/fragment-shader-patterns.md
3. creative-claude-given-web-skills/01-Frontend/07-glsl-shaders/perlin-simplex-noise.md
4. creative-claude-given-web-skills/01-Frontend/06-threejs-webgl/r3f-setup.md
5. creative-claude-given-web-skills/01-Frontend/06-threejs-webgl/postprocessing-presets.md

What to build:
- R3F canvas placed on the RIGHT 55% of the hero viewport
- One ShaderMaterial on a fullscreen plane covering that region
- Fragment shader implements raymarched SDF scene:
  - Scene function = smooth union of: icosahedron SDF + torus knot SDF, blended by uMorph
  - uMorph oscillates: sin(uTime * 0.3) * 0.5 + 0.5 (slow morph loop)
  - Lighting: Phong shading with one lime point light at (2, 3, 2) and ambient at 0.05
  - Surface: dark glass material (reflection + fresnel glow at grazing angles)
  - Edges: thin lime emissive line where surface normal is near-perpendicular to ray
- Uniforms:
  - uTime: clock (drives morph + slow auto-rotation)
  - uMouse: normalized mouse position → offsets camera yaw/pitch by ±15 degrees
  - uScroll: 0→1 → multiplies object scale by (1 - uScroll * 0.6) as hero leaves view
- Postprocessing: UnrealBloom with threshold 0.6, strength 1.2, radius 0.4
- Performance cap: MAX_STEPS = 80, MAX_DISTANCE = 25.0, render at 0.75 DPR on mobile
- Fallback: if WebGL unavailable, show the hero image 1 as a static background

Layout (do not change the existing NEXUS hero text layout):
- Canvas is absolutely positioned, right: 0, top: 0, width: 55vw, height: 100vh
- pointer-events: none on the canvas (text stays interactive)

---

SECTION 02 — SERVICES: ANATOMY EXPLODED CARDS

Skills to read first (in order):
1. creative-claude-given-web-skills/Anatomy_skill.md (READ IN FULL)
2. creative-claude-given-web-skills/01-Frontend/06-threejs-webgl/r3f-patterns.md
3. creative-claude-given-web-skills/01-Frontend/13-advanced-animation/animation-state-machine.md
4. creative-claude-given-web-skills/01-Frontend/3-animation-motion/gsap-core-SKILL.md
5. creative-claude-given-web-skills/01-Frontend/06-threejs-webgl/threejs-geometry.md
6. creative-claude-given-web-skills/01-Frontend/06-threejs-webgl/threejs-lighting.md

What to build:
- RIGHT panel of the services accordion section = one persistent R3F canvas
- On page load: AI Solutions anatomy object is assembled and slowly breathing
- On accordion row click: 
  1. Current object "implodes" — all parts lerp toward center (0.35s, ease.in)
  2. New object's parts fly in from screen edges (0.7s stagger, ease.out)
  3. Idle: slow breathing (scale ±1.8%, 4s sine)

Service → Object mapping:
  "AI Solutions"        → Neural processor chip (see anatomy prompt above)
  "Website Creation"    → Browser/web stack layers (see anatomy prompt above)
  "Data Engineering"    → Pipeline core cylinder cross-section
  "Product Design"      → Design system stack (smartphone form)
  "Cloud & DevOps"      → Kubernetes cluster rack

Build each anatomy object using the Anatomy skill's geometry.mjs pattern:
- Every part is a ConvexGeometry (min 4 vertices, convex hull)
- Four-tone shading: light face, mid face, dark face, rim face (from Anatomy_skill.md look rules)
- Color palette: dark charcoal #1A1A1A parts, lime-green #CAFF00 edge glow (emissive)
- Each part has a label (HTML overlay, absolutely positioned, connected by a thin CSS line)
- Labels fade in after the object finishes assembling (0.3s delay after last part arrives)

Lighting:
- AmbientLight: 0x111111, intensity 0.8
- DirectionalLight: 0xffffff, intensity 1.2, position (3, 4, 2) — upper left
- PointLight: 0xCAFF00 (lime), intensity 0.4, position follows cursor

Interaction on anatomy parts:
- onPointerEnter: that part emissive.intensity goes to 0.6, scale to 1.08
- onPointerLeave: return to default
- Connected label lifts 8px on hover

Mobile: simplified — 2D SVG isometric illustration, no 3D, no hover interaction

---

SECTION 03 — PROCESS: SHARD MORPH

Skills to read first (in order):
1. creative-claude-given-web-skills/01-Frontend/05-svg-canvas/canvas-particle-system.md
2. creative-claude-given-web-skills/01-Frontend/06-threejs-webgl/threejs-instancing.md
3. creative-claude-given-web-skills/01-Frontend/3-animation-motion/gsap-scrolltrigger-SKILL.md
4. creative-claude-given-web-skills/01-Frontend/3-animation-motion/lenis-setup-SKILL.md
5. creative-claude-given-web-skills/01-Frontend/13-advanced-animation/animation-state-machine.md
6. creative-claude-given-web-skills/01-Frontend/04-js-browser-apis/raf-loop-patterns.md

What to build:
- Full-width process section, pinned for 4× viewport height scroll
- One R3F canvas covering the upper 65% of the section (the shard visualization)
- Lower 35%: step labels + descriptions (HTML, changes with active step)

Step definitions:
  Step 0 (DISCOVER): 300 shards form a radar dish pointing left
    - Dish is a curved concave paraboloid shape, approximated by shard target positions on a parametric surface
    - Every 2 seconds: a circular "pulse" animation — shards at radius r scatter ±15 units for 0.4s then snap back
    - r increases from 0 to dish_radius over 1.5s
    
  Step 1 (PLAN): 300 shards rearrange into a 3D isometric grid (6×6×3 grid of points)
    - Larger shards (scale 1.4×) at grid intersections, smaller at midpoints
    - Grid slowly rotates: yaw += 0.002 per frame
    - On transition-in: shards fly from dish positions to grid positions, stagger by distance
    
  Step 2 (BUILD): Shards stack from bottom to top forming a tower
    - Tower is defined as 8 floors, 35-40 shards per floor
    - On transition-in: floor 0 snaps first, then 1, 2... timed 0.1s per floor
    - A horizontal lime bar sweeps left-to-right each time a floor completes
    - Shards on incomplete floors still scatter above, converging downward
    
  Step 3 (SCALE): Tower duplicates into 4 copies (2×2 grid), then 9 (3×3)
    - At t=0: 1 tower, centered
    - At t=0.5 (within step): 4 towers at ±1 tower-width offset, outer ones slightly smaller (scale 0.8)
    - At t=1: 9 towers, outermost at scale 0.6, half outside viewport
    - Transition: originals "spawn" copies — new copies materialze from center of original

Shard geometry:
  - Each shard = a TetrahedronGeometry(size, 0) with random face dropped
  - OR: THREE.BufferGeometry with 4-6 random vertices per shard → ConvexHull
  - All 300 shards: ONE InstancedMesh
  - Per-instance data stored in instanceMatrix + custom instanceColor attribute
  - Color: #0D0D0D body, emissive: #CAFF00 at intensity 0.15 (idle) → 0.4 (active step transition)

Step transition trigger:
  ScrollTrigger pin: "#process-section", end: "+=400vh"
  scrub: true (connected to Lenis)
  progress 0.00–0.25 → step 0 (DISCOVER)
  progress 0.25–0.50 → step 1 (PLAN)
  progress 0.50–0.75 → step 2 (BUILD)
  progress 0.75–1.00 → step 3 (SCALE)

Step label transitions (HTML):
  - Active step number/name in lime, description in white
  - Inactive steps: dim white, smaller
  - Transition: 0.3s opacity + 4px y-lift on active label change
  - Below labels: a horizontal progress bar, lime fill tracks scroll within current step

Mobile (below 768px):
  - Disable pin, disable 3D canvas
  - Show static SVG illustration per step (export from the 3D scenes)
  - Auto-advance steps on 3s interval with CSS dot indicator

---

INTEGRATION NOTES (applies to all 3 sections):
- All R3F canvases: alpha: true, antialias: true, powerPreference: 'high-performance'
- All canvases have a prefers-reduced-motion check → if true, disable all animation, show static
- Performance budget: each scene must stay above 50fps on a 2019 MacBook Pro
- All scenes are lazy-loaded (IntersectionObserver, only initialize when in viewport)
- R3F canvas cleanup: useEffect return → gl.dispose(), geometry.dispose(), material.dispose()
- All cursor effects: attach to window mousemove, pass normalized (-1 to 1) coords as uniforms
- No npm packages other than: three, @react-three/fiber, @react-three/postprocessing, gsap, lenis

WHAT NOT TO DO:
- Do not import any pre-made 3D model (no .glb, no .gltf, no .obj) — everything is geometry + math
- Do not use Framer Motion for the 3D canvas content — RAF loop only
- Do not animate layout-triggering CSS properties (no width/height, use transform only)
- Do not pin sections on mobile (breaks scrolling on iOS)
- Do not use requestAnimationFrame inside React render cycles — use useFrame from R3F
```

---

## QUICK REFERENCE

| What | Files to read | Estimated dev time |
|---|---|---|
| Hero SDF object | glsl-raymarching + fragment-shader-patterns + r3f-setup + postprocessing-presets | 3–4 days |
| Anatomy service cards | Anatomy_skill.md + r3f-patterns + animation-state-machine + gsap-core | 5–7 days |
| Process shard morph | canvas-particle-system + threejs-instancing + gsap-scrolltrigger + lenis | 4–5 days |

**Start order:** Hero SDF (most impactful, fastest) → Process morphing → Anatomy cards (most complex)
