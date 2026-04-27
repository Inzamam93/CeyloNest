// ─── HOTEL CONFIG ─────────────────────────────────────────────────────────────
// Edit this file to configure CeyloNest for your property.

export const HOTEL = {
  name:     'Villa Serenity Galle',
  room:     '205',
  checkOut: 'Dec 15, 11:00 AM',
  wifi:     'VillaSerenity_Guest',
  wifiPass: 'Ceylon2024*',
  tagline:  'A sanctuary in the heart of Galle Fort',
  phone:    '+94 91 222 4567',
}

// ─── LANGUAGES ────────────────────────────────────────────────────────────────
export const LANGS = {
  EN: {
    welcome:       'Welcome',
    goodMorning:   'Good morning',
    goodEvening:   'Good evening',
    room:          'Room',
    checkOut:      'Check-out',
    services:      'Services',
    callReception: 'Reception',
    roomService:   'Room Service',
    housekeeping:  'Housekeeping',
    spa:           'Spa & Wellness',
    maintenance:   'Maintenance',
    transport:     'Transport',
    chat:          'Concierge',
    local:         'Explore',
    requests:      'Requests',
    typeMsg:       'Ask me anything…',
    send:          'Send',
    tapToCall:     'Tap to call',
    wifiPass:      'WiFi Password',
    localTitle:    'Discover Sri Lanka',
  },
  'සිං': {
    welcome:       'සාදරයෙන් පිළිගනිමු',
    goodMorning:   'සුභ උදෑසනක්',
    goodEvening:   'සුභ සන්ධ්‍යාවක්',
    room:          'කාමරය',
    checkOut:      'පිටවීම',
    services:      'සේවාවන්',
    callReception: 'ශාලාව',
    roomService:   'කාමර සේවාව',
    housekeeping:  'ගෙදර වැඩ',
    spa:           'ස්පා',
    maintenance:   'නඩත්තු',
    transport:     'ප්‍රවාහනය',
    chat:          'AI සේවය',
    local:         'ශ්‍රී ලංකා',
    requests:      'ඉල්ලීම්',
    typeMsg:       'ඔබගේ ප්‍රශ්නය…',
    send:          'යවන්න',
    tapToCall:     'අමතන්න',
    wifiPass:      'WiFi මුරපදය',
    localTitle:    'ශ්‍රී ලංකාව සොයන්න',
  },
  'தமிழ்': {
    welcome:       'வரவேற்கிறோம்',
    goodMorning:   'காலை வணக்கம்',
    goodEvening:   'மாலை வணக்கம்',
    room:          'அறை',
    checkOut:      'செக்-அவுட்',
    services:      'சேவைகள்',
    callReception: 'வரவேற்பு',
    roomService:   'அறை சேவை',
    housekeeping:  'வீட்டு பராமரிப்பு',
    spa:           'ஸ்பா',
    maintenance:   'பராமரிப்பு',
    transport:     'போக்குவரத்து',
    chat:          'AI மேலாளர்',
    local:         'உள்ளூர்',
    requests:      'கோரிக்கைகள்',
    typeMsg:       'எதுவும் கேளுங்கள்…',
    send:          'அனுப்பு',
    tapToCall:     'அழைக்க',
    wifiPass:      'WiFi கடவுச்சொல்',
    localTitle:    'இலங்கையை கண்டறியுங்கள்',
  },
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
export const getServices = (t) => [
  { id: 'reception',   label: t.callReception, color: '#1a3d2b', bg: '#e8f5ee', call: true,  ext: '0' },
  { id: 'roomservice', label: t.roomService,   color: '#b85c3a', bg: '#fbeee9', call: false, ext: '1' },
  { id: 'housekeeping',label: t.housekeeping,  color: '#2a6b6b', bg: '#e5f3f3', call: false, ext: '2' },
  { id: 'spa',         label: t.spa,           color: '#7a5c9a', bg: '#f0ebf7', call: true,  ext: '3' },
  { id: 'maintenance', label: t.maintenance,   color: '#5a6a7a', bg: '#eef1f4', call: false, ext: '4' },
  { id: 'transport',   label: t.transport,     color: '#c9a84c', bg: '#faf5e4', call: false, ext: '5' },
]

// ─── LOCAL EXPERIENCES ────────────────────────────────────────────────────────
export const LOCAL_SERVICES = [
  { id: 1, name: 'Tuk-Tuk to Galle Fort',    icon: '🛺', price: 'LKR 300',   eta: '5 min',       rating: 4.9, tag: 'Popular'   },
  { id: 2, name: 'Whale Watching Tour',       icon: '🐋', price: 'LKR 4,500', eta: 'Tomorrow 6am',rating: 4.8, tag: 'Must Do'   },
  { id: 3, name: 'Ayurveda Massage',          icon: '🌿', price: 'LKR 3,200', eta: 'Today',        rating: 5.0, tag: 'Wellness'  },
  { id: 4, name: 'Surf Lesson – Unawatuna',   icon: '🏄', price: 'LKR 2,800', eta: '8am / 3pm',   rating: 4.7, tag: 'Adventure' },
  { id: 5, name: 'SIM Card (Dialog 5G)',      icon: '📱', price: 'LKR 800',   eta: 'In 30 min',   rating: 4.9, tag: 'Essential' },
  { id: 6, name: 'Temple of the Tooth Tour',  icon: '🏛️', price: 'LKR 5,000', eta: 'Day Trip',    rating: 4.8, tag: 'Culture'   },
]

// ─── INITIAL STAFF REQUESTS (demo data) ───────────────────────────────────────
export const INITIAL_REQUESTS = [
  { id: 1, room: '205', service: 'Housekeeping', desc: 'Need extra towels please',         status: 'pending',     time: '2 min ago',  priority: 'normal' },
  { id: 2, room: '312', service: 'Room Service', desc: 'Breakfast for 2 — eggs & toast',  status: 'in-progress', time: '8 min ago',  priority: 'high'   },
  { id: 3, room: '118', service: 'Maintenance',  desc: 'AC remote not working',            status: 'pending',     time: '15 min ago', priority: 'normal' },
  { id: 4, room: '401', service: 'Transport',    desc: 'Tuk-tuk to Galle bus stand, 9am', status: 'done',        time: '22 min ago', priority: 'normal' },
  { id: 5, room: '207', service: 'Spa',          desc: 'Book Ayurveda session for 4pm',   status: 'in-progress', time: '31 min ago', priority: 'normal' },
]

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
export const STATUS_CONFIG = {
  pending:       { color: '#f59e0b', label: 'Pending',     borderColor: '#fbbf24' },
  'in-progress': { color: '#3b82f6', label: 'In Progress', borderColor: '#60a5fa' },
  done:          { color: '#10b981', label: 'Done',        borderColor: '#34d399' },
}
