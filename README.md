# BrandPulse — We Build Brands People Can't Ignore.
 
Live site: [https://nexus-one-rust-71.vercel.app](https://nexus-one-rust-71.vercel.app)

High-performance digital products, brand engineering, and autonomous systems website built with modern engineering discipline.

---

## ⚡ Stack & Architecture

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **3D & WebGL**: React Three Fiber + Three.js + Postprocessing (`UnrealBloomPass`)
- **Motion & Smooth Scroll**: GSAP + ScrollTrigger + Lenis (`lerp: 0.06`) + Framer Motion
- **Routing**: React Router v6 (Full `/services/[slug]` sub-pages with 3D exploded anatomy)
- **Design Language**: Neon Noir — `#050505` bg, `#CAFF00` electric lime accent, Space Grotesk + JetBrains Mono + Inter
- **Backend**: FastAPI (Python 3) with Chatbot endpoint (`POST /api/chat`) and inquiry lead pipeline (`POST /api/contact`)
- **Telemetry**: Vercel Analytics + PostHog integration

---

## 🏛️ Section Flow & Structure

0. **Loading Screen**: BrandPulse types out, lime progress bar, wipes up.
1. **Hero**: 3D interpenetrating Torus Knot & Octahedron in dark glass with 6 orbiting spheres, text on left, dual CTAs: `[ BOOK A CALL ]` + `[ SEE OUR WORK ]`.
2. **Problem Statement**: 3 lines reveal on scroll: *"Most businesses have great ideas. / Few have tools to act on them. / We build those tools."*
3. **Anatomy Service Cards**: 6 core capabilities with 3D technical anatomy renders:
   - `AI Solutions` (`/services/ai-solutions`)
   - `Digital Marketing` (`/services/digital-marketing`)
   - `Product Building` (`/services/product-building`)
   - `ERP Systems` (`/services/erp-systems`)
   - `CRM Systems` (`/services/crm-systems`)
   - `Strategic Consulting` (`/services/strategic-consulting`)
4. **Why Us**: 3 commercial outcome stats + 3 differentiators in business language.
5. **Process**: 4-step horizontal pinned scroll (`Discover` / `Plan` / `Build` / `Grow`) with instanced 3D shard scene.
6. **Team**: 4 shattered glass cards (Varad, Abhijeet, Atharva, Yash with updated business roles).
7. **CTA Section**: "Ready to grow your business?" + Book a Call.
8. **Footer + Floating Chatbot**: Integrated AI assistant answering inquiries in simple business language.

---

## 🚀 Development & Commands

Please Check The System Configs.

```bash
# Frontend
cd frontend
npm install
npm run dev          # Start local dev server
npm run type-check   # Run TypeScript validation
npm run build        # Build production bundle

# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
