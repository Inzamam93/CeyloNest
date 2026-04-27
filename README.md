# 🌿 CeyloNest

> AI-powered hotel guest communication platform — built for Sri Lankan hospitality.

CeyloNest replaces outdated in-room phones with a **zero-download Progressive Web App** (PWA). Guests scan a QR code, get a multilingual AI concierge, request hotel services, and book local experiences — all from their own device. Staff manage everything from a live dashboard.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Zero download** | PWA opens instantly in any mobile browser via QR code |
| **AI Concierge** | Claude-powered chatbot answers guest questions 24/7 |
| **Multilingual** | English, Sinhala (සිං), Tamil (தமிழ்) — easily extendable |
| **Service Requests** | Housekeeping, room service, spa, transport, maintenance |
| **Local Experiences** | Curated tuk-tuk, whale watching, Ayurveda, surf bookings |
| **Staff Dashboard** | Live request management with status tracking |
| **Emergency Line** | One-tap direct call to hotel reception |
| **GPS Directions** | "Find your way back" Google Maps link |
| **PWA Ready** | Installable on home screen, works offline for key features |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/ceylonest.git
cd ceylonest
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Configure your hotel

Edit `src/data/config.js` and update the `HOTEL` object:

```js
export const HOTEL = {
  name:     'Your Hotel Name',
  room:     '101',           // default room (override via URL param in production)
  checkOut: 'Dec 15, 11:00 AM',
  wifi:     'YourWifi_SSID',
  wifiPass: 'YourPassword',
  phone:    '+94 XX XXX XXXX',
}
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Project Structure

```
ceylonest/
├── public/                  # Static assets (favicon, PWA icons)
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Top nav, language switcher, tab bar
│   │   ├── Header.module.css
│   │   ├── ServiceGrid.jsx  # Hotel services grid + emergency buttons
│   │   ├── ChatView.jsx     # AI concierge chat interface
│   │   ├── LocalView.jsx    # Local experiences marketplace
│   │   ├── RequestViews.jsx # Guest request tracker + Staff dashboard
│   │   └── RequestModal.jsx # Service request bottom sheet
│   ├── data/
│   │   └── config.js        # ⚙️  Hotel config, languages, services, demo data
│   ├── utils/
│   │   └── claude.js        # Anthropic API helper
│   ├── App.jsx              # Root component, routing state
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles & CSS variables
├── index.html
├── vite.config.js           # Vite + PWA plugin config
├── .env.example             # Environment variable template
└── package.json
```

---

## 🔧 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| UI Framework | React 18 | Component model, hooks, fast updates |
| Build Tool | Vite 5 | Instant HMR, optimised production builds |
| PWA | vite-plugin-pwa | Service worker, manifest, offline support |
| Icons | lucide-react | Lightweight, consistent icon set |
| AI | Claude API (Anthropic) | Multilingual, context-aware concierge |
| Styling | CSS Modules + CSS Variables | Scoped styles, zero runtime overhead |
| Fonts | Google Fonts (CDN) | Cormorant Garamond + DM Sans |

---

## 🌐 Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Set your `VITE_ANTHROPIC_API_KEY` in Vercel's environment variable settings.

### Netlify

```bash
npm run build
# drag-and-drop /dist to netlify.com, or:
npx netlify deploy --prod --dir=dist
```

### Self-hosted

```bash
npm run build
# Serve /dist with any static host (nginx, Caddy, etc.)
```

> ⚠️ **Production note:** Move the Anthropic API call to a backend proxy (Edge Function, Express, etc.) before going live. Exposing API keys in client-side code is insecure.

---

## 🗺️ Roadmap

- [ ] Dynamic room config via URL query param (`?room=205`)
- [ ] WhatsApp Business API integration for staff notifications  
- [ ] PMS (Property Management System) webhook sync
- [ ] Admin panel for hotel managers to edit services & local experiences
- [ ] Push notifications for request status updates
- [ ] Offline-first mode with IndexedDB request queue
- [ ] Analytics dashboard (request volume, response times, popular services)
- [ ] Multi-property support

---

## 🔐 Security Notes

- Never commit `.env` to git (already in `.gitignore`)
- In production, proxy all Anthropic API calls through your own backend
- Use dynamic QR codes so each room's URL can be rotated

---

## 📄 License

MIT — free to use, modify, and deploy for your property.

---

*Built with 🌿 for Sri Lankan hospitality. Ayubowan!*
