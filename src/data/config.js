// ─── HOTEL CONFIG ─────────────────────────────────────────────────────────────
// Edit this object to configure Butler for your property.
export const HOTEL = {
  name:       'Villa Serenity Galle',
  shortName:  'Villa Serenity',
  room:       '205',
  checkOut:   'Dec 15, 11:00 AM',
  wifi:       'VillaSerenity_Guest',
  wifiPass:   'Ceylon2024*',
  tagline:    'A sanctuary in the heart of Galle Fort',
  phone:      '+94 91 222 4567',
  email:      'butler@villaserenity.lk',
}

// ─── BUTLER PROFILE ───────────────────────────────────────────────────────────
export const BUTLER = {
  name:    'Kavindu Perera',
  role:    'Personal Butler',
  since:   '2019',
  langs:   ['English', 'Sinhala'],
  avatar:  'KP',
  online:  true,
  bio:     'Kavindu has been welcoming guests at Villa Serenity for 6 years. His specialities include local cuisine recommendations, Ayurveda bookings, and ensuring every stay feels effortless.',
}

// ─── LANGUAGES ────────────────────────────────────────────────────────────────
export const LANGS = {
  EN: {
    welcome: 'Welcome', goodMorning: 'Good morning', goodEvening: 'Good evening',
    room: 'Room', checkOut: 'Check-out', services: 'Services',
    callReception: 'Reception', roomService: 'Room Service', housekeeping: 'Housekeeping',
    spa: 'Spa & Wellness', maintenance: 'Maintenance', transport: 'Transport',
    butler: 'Your Butler', explore: 'Explore', requests: 'Requests',
    profile: 'Profile', typeMsg: 'Message your butler…', send: 'Send',
    tapToCall: 'Tap to call', wifiPass: 'WiFi Password',
    localTitle: 'Discover Sri Lanka', myRequests: 'My Requests',
    accessibility: 'Accessibility', preferences: 'My Preferences',
    review: 'How is your stay?', reviewPrompt: 'We\'d love to know',
  },
  'සිං': {
    welcome: 'සාදරයෙන්', goodMorning: 'සුභ උදෑසනක්', goodEvening: 'සුභ සන්ධ්‍යාවක්',
    room: 'කාමරය', checkOut: 'පිටවීම', services: 'සේවාවන්',
    callReception: 'ශාලාව', roomService: 'කාමර සේවාව', housekeeping: 'ගෙදර වැඩ',
    spa: 'ස්පා', maintenance: 'නඩත්තු', transport: 'ප්‍රවාහනය',
    butler: 'ඔබේ බට්ලර්', explore: 'සොයන්න', requests: 'ඉල්ලීම්',
    profile: 'පෙනුම', typeMsg: 'ඔබේ පණිවිඩය…', send: 'යවන්න',
    tapToCall: 'අමතන්න', wifiPass: 'WiFi මුරපදය',
    localTitle: 'ශ්‍රී ලංකාව', myRequests: 'මගේ ඉල්ලීම්',
    accessibility: 'පහසුව', preferences: 'මනාපය',
    review: 'ඔබේ නවාතැන?', reviewPrompt: 'ඔබේ අදහස',
  },
  'தமிழ்': {
    welcome: 'வரவேற்கிறோம்', goodMorning: 'காலை வணக்கம்', goodEvening: 'மாலை வணக்கம்',
    room: 'அறை', checkOut: 'செக்-அவுட்', services: 'சேவைகள்',
    callReception: 'வரவேற்பு', roomService: 'அறை சேவை', housekeeping: 'பராமரிப்பு',
    spa: 'ஸ்பா', maintenance: 'பழுது', transport: 'போக்குவரத்து',
    butler: 'உங்கள் பட்லர்', explore: 'கண்டறியுங்கள்', requests: 'கோரிக்கைகள்',
    profile: 'சுயவிவரம்', typeMsg: 'செய்தி அனுப்பவும்…', send: 'அனுப்பு',
    tapToCall: 'அழைக்க', wifiPass: 'WiFi கடவுச்சொல்',
    localTitle: 'இலங்கை', myRequests: 'என் கோரிக்கைகள்',
    accessibility: 'அணுகல்', preferences: 'விருப்பங்கள்',
    review: 'தங்கல் எப்படி?', reviewPrompt: 'உங்கள் கருத்து',
  },
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
export const getServices = (t) => [
  { id: 'reception',    label: t.callReception, color: '#1a3d2b', bg: '#e8f5ee', call: true,  ext: '0' },
  { id: 'roomservice',  label: t.roomService,   color: '#b85c3a', bg: '#fbeee9', call: false, ext: '1' },
  { id: 'housekeeping', label: t.housekeeping,  color: '#2a6b6b', bg: '#e5f3f3', call: false, ext: '2' },
  { id: 'spa',          label: t.spa,           color: '#7a5c9a', bg: '#f0ebf7', call: true,  ext: '3' },
  { id: 'maintenance',  label: t.maintenance,   color: '#5a6a7a', bg: '#eef1f4', call: false, ext: '4' },
  { id: 'transport',    label: t.transport,     color: '#c9a84c', bg: '#faf5e4', call: false, ext: '5' },
]

// ─── LOCAL EXPERIENCES ────────────────────────────────────────────────────────
export const LOCAL_SERVICES = [
  { id: 1, name: 'Tuk-Tuk to Galle Fort',   icon: '🛺', price: 'LKR 300',   eta: '5 min',        rating: 4.9, tag: 'Popular',   desc: 'Hop on a classic tuk-tuk for a breezy ride to the UNESCO-listed fort.' },
  { id: 2, name: 'Whale Watching Tour',      icon: '🐋', price: 'LKR 4,500', eta: 'Tomorrow 6am', rating: 4.8, tag: 'Must Do',   desc: 'Blue whales spotted year-round off Mirissa — a 3-hour ocean adventure.' },
  { id: 3, name: 'Ayurveda Massage',         icon: '🌿', price: 'LKR 3,200', eta: 'Today',        rating: 5.0, tag: 'Wellness',  desc: 'Traditional 90-min treatment with certified Ayurvedic therapist on site.' },
  { id: 4, name: 'Surf Lesson – Unawatuna', icon: '🏄', price: 'LKR 2,800', eta: '8am / 3pm',    rating: 4.7, tag: 'Adventure', desc: 'Beginner-friendly lesson on one of Sri Lanka\'s calmest surf breaks.' },
  { id: 5, name: 'SIM Card (Dialog 5G)',     icon: '📱', price: 'LKR 800',   eta: 'In 30 min',    rating: 4.9, tag: 'Essential', desc: 'Delivered to your room — 15GB data, local & international calls.' },
  { id: 6, name: 'Temple of the Tooth',      icon: '🏛️', price: 'LKR 5,000', eta: 'Day Trip',     rating: 4.8, tag: 'Culture',   desc: 'Full-day guided trip to Kandy including the sacred relic temple.' },
]

// ─── UPSELL PROMPTS ───────────────────────────────────────────────────────────
export const UPSELLS = [
  { id: 'u1', trigger: 'checkin',   icon: '🌿', title: 'Unwind tonight?', desc: 'Our Ayurveda therapist has a 6pm slot available — only 1 left.', cta: 'Book for LKR 3,200', service: 'Spa & Wellness' },
  { id: 'u2', trigger: 'morning',   icon: '🌅', title: 'Sunrise whale watching', desc: 'Tomorrow\'s boat departs at 6am — 2 seats remaining.', cta: 'Reserve now', service: 'Whale Watching Tour' },
  { id: 'u3', trigger: 'explore',   icon: '🛺', title: 'Heading out?', desc: 'Your personal tuk-tuk can be ready in 5 minutes.', cta: 'Request tuk-tuk', service: 'Transport' },
  { id: 'u4', trigger: 'evening',   icon: '🍷', title: 'Private sunset dining', desc: 'Reserve the terrace for two tonight — includes candle & wine.', cta: 'Reserve terrace', service: 'Room Service' },
]

// ─── DEMO REQUESTS ────────────────────────────────────────────────────────────
export const INITIAL_REQUESTS = [
  { id: 1,  room: '205', guestName: 'Sarah M.', service: 'Housekeeping', desc: 'Need extra towels please', status: 'pending',     time: '2 min ago',  priority: 'normal', accessibility: null },
  { id: 2,  room: '312', guestName: 'Rahul V.', service: 'Room Service', desc: 'Breakfast for 2 — eggs & toast', status: 'in-progress', time: '8 min ago',  priority: 'high',   accessibility: 'mobility' },
  { id: 3,  room: '118', guestName: 'Wei L.',   service: 'Maintenance',  desc: 'AC remote not working', status: 'pending',     time: '15 min ago', priority: 'normal', accessibility: null },
  { id: 4,  room: '401', guestName: 'Anna K.',  service: 'Transport',    desc: 'Tuk-tuk to Galle bus stand, 9am', status: 'done',        time: '22 min ago', priority: 'normal', accessibility: null },
  { id: 5,  room: '207', guestName: 'James P.', service: 'Spa',          desc: 'Book Ayurveda session for 4pm', status: 'in-progress', time: '31 min ago', priority: 'normal', accessibility: 'visual' },
]

// ─── LIVE PULSE REVIEWS ───────────────────────────────────────────────────────
export const INITIAL_REVIEWS = [
  { id: 1, room: '312', guestName: 'Rahul V.', stars: 2, comment: 'Room was not ready when we arrived, waited 40 min', time: '18 min ago', status: 'unread',    touchpoint: 'Arrival',    responded: false },
  { id: 2, room: '401', guestName: 'Anna K.',  stars: 5, comment: 'Kavindu is absolutely wonderful, best butler ever!', time: '45 min ago', status: 'read',      touchpoint: 'Butler',     responded: true  },
  { id: 3, room: '118', guestName: 'Wei L.',   stars: 3, comment: 'Food was okay but took very long to arrive', time: '1 hr ago',   status: 'actioned',  touchpoint: 'Room Service', responded: true  },
  { id: 4, room: '503', guestName: 'Maria S.', stars: 1, comment: 'Pool area noisy at night, could not sleep', time: '2 hr ago',   status: 'resolved',  touchpoint: 'Room',       responded: true  },
  { id: 5, room: '205', guestName: 'You',      stars: 4, comment: 'Great location, butler is very attentive', time: '3 hr ago',   status: 'read',      touchpoint: 'Overall',    responded: false },
]

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
export const STATUS_CONFIG = {
  'pending':     { color: '#f59e0b', label: 'Pending',     border: '#fbbf24' },
  'in-progress': { color: '#3b82f6', label: 'In Progress', border: '#60a5fa' },
  'done':        { color: '#10b981', label: 'Done',        border: '#34d399' },
}

// ─── ACCESSIBILITY MODES ──────────────────────────────────────────────────────
export const ACCESS_MODES = {
  standard:     { label: 'Standard',       icon: '✦', desc: 'Default experience' },
  highContrast: { label: 'High Contrast',  icon: '◑', desc: 'Maximum contrast for visual clarity' },
  large:        { label: 'Large Text',     icon: 'A+', desc: 'Enlarged text and touch targets' },
  simple:       { label: 'Simple Mode',    icon: '◻', desc: 'Reduced animations and plain layout' },
}

// ─── SPECIAL OCCASIONS ────────────────────────────────────────────────────────
export const OCCASIONS = [
  { id: 'none',        label: 'Regular stay',   icon: '🏨' },
  { id: 'honeymoon',   label: 'Honeymoon',      icon: '💍' },
  { id: 'anniversary', label: 'Anniversary',    icon: '🥂' },
  { id: 'birthday',    label: 'Birthday',       icon: '🎂' },
  { id: 'business',    label: 'Business trip',  icon: '💼' },
  { id: 'wellness',    label: 'Wellness retreat',icon: '🌿' },
]

// ─── PILLOW / ROOM PREFS ──────────────────────────────────────────────────────
export const PILLOW_OPTIONS   = ['Soft', 'Medium', 'Firm', 'Hypoallergenic']
export const TEMP_OPTIONS     = ['18–20°C (cool)', '21–22°C (moderate)', '23–25°C (warm)']
export const DIETARY_OPTIONS  = ['None', 'Vegetarian', 'Vegan', 'Gluten-free', 'Halal', 'Lactose-free', 'Nut allergy']
export const MOBILITY_OPTIONS = ['None', 'Wheelchair user', 'Walking frame', 'Limited reach', 'Travelling with carer']
export const SENSORY_OPTIONS  = ['No scented products', 'Quiet room', 'Low lighting preferred', 'Minimal room visits']
