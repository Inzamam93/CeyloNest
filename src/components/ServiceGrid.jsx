import { Phone, ChefHat, Sparkles, Leaf, Wrench, Car, Navigation, ChevronRight } from 'lucide-react'
import { HOTEL, LANGS, getServices } from '../data/config'

const ICON_MAP = { reception: Phone, roomservice: ChefHat, housekeeping: Sparkles, spa: Leaf, maintenance: Wrench, transport: Car }

export default function ServiceGrid({ lang, onRequest }) {
  const t = LANGS[lang]
  const services = getServices(t)

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {services.map((s, i) => {
          const Icon = ICON_MAP[s.id]
          return (
            <div
              key={s.id}
              className="slide-up"
              onClick={() => onRequest({ ...s, icon: Icon })}
              style={{
                animationDelay: `${i * 0.05}s`,
                background: 'var(--white)',
                borderRadius: 14,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                cursor: 'pointer',
                boxShadow: '0 1px 8px rgba(15,36,25,0.07)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,36,25,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 8px rgba(15,36,25,0.07)' }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={s.color} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--dark)' }}>{s.label}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.call ? t.tapToCall : 'Request →'}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Emergency + Directions */}
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href={`tel:${HOTEL.phone}`} style={{ textDecoration: 'none' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--terra), #d4724e)', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>Emergency / Direct Line</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>{HOTEL.phone}</p>
            </div>
            <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
          </div>
        </a>

        <div
          style={{ background: 'var(--teal)', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => window.open(`https://maps.google.com?q=${encodeURIComponent(HOTEL.name)}`, '_blank')}
        >
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Navigation size={18} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>Find Your Way Back</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Get directions to hotel</p>
          </div>
          <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
        </div>
      </div>
    </div>
  )
}
