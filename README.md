# BrandPulse — We Build Brands People Can't Ignore.
 


Websites, software, AI, marketing, ERP and CRM for startups, business owners, students and individuals. Built by a four-founder team in Pune.

---

## ⚡ Stack & Architecture

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Smooth Scroll**: Lenis driven by the GSAP ticker
- **Routing**: React Router v6 (`/services/[slug]` sub-pages)
- **Design Language**: Modern editorial — warm off-white `#F7F5F0`, ink `#15181D`, deep green accent `#1F5C4A`, Fraunces headings + Inter body. Colors and fonts live in `frontend/tailwind.config.js`; shared button, card and label styles in `frontend/src/styles/index.css`.
- **Backend**: FastAPI (Python 3) with Chatbot endpoint (`POST /api/chat`) and inquiry lead pipeline (`POST /api/contact`)
- **Telemetry**: Vercel Analytics + PostHog integration

---

## 🏛️ Section Flow & Structure

1. **Hero**: headline, two CTAs (`Book a free call`, `Explore services`) and a list of the six services.
2. **Approach**: *"Most businesses have good ideas. Few have the tools to act on them. We build those tools."* plus who we work with.
3. **Services**: 6 service cards, each linking to its page:
   - `AI Solutions` (`/services/ai-solutions`)
   - `Digital Marketing` (`/services/digital-marketing`)
   - `Product Building` (`/services/product-building`)
   - `ERP Systems` (`/services/erp-systems`)
   - `CRM Systems` (`/services/crm-systems`)
   - `Strategic Consulting` (`/services/strategic-consulting`)
4. **Why Us**: team facts and three differentiators.
5. **Process**: four steps (`Understand` / `Plan and quote` / `Build` / `Launch and support`).
6. **Team**: the four founders with bios, skills and portfolio links.
7. **CTA Section**: book a free call or email us.
8. **Footer + Floating Chatbot**: assistant answering questions from `frontend/src/data/chatbot-faq.json`.

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
