import { Phone, ChefHat, Sparkles, Leaf, Wrench, Car, Navigation, ChevronRight } from 'lucide-react'
import { HOTEL, LANGS, getServices } from '../data/config'
import styles from './ServiceGrid.module.css'

const ICON_MAP = {
  reception: Phone, roomservice: ChefHat, housekeeping: Sparkles,
  spa: Leaf, maintenance: Wrench, transport: Car,
}

export default function ServiceGrid({ lang, onRequest }) {
  const t = LANGS[lang]
  const services = getServices(t)

  return (
    <div style={{ padding: '16px 16px 100px' }}>
      <div className={styles.grid}>
        {services.map((s, i) => {
          const Icon = ICON_MAP[s.id]
          return (
            <div
              key={s.id}
              className={`slide-up ${styles.serviceCard}`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => onRequest({ ...s, icon: Icon })}
            >
              <div className={styles.iconWrap} style={{ background: s.bg }}>
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

      <div className={styles.actionRow}>
        <a href={`tel:${HOTEL.phone}`} className={styles.emergencyBtn}>
          <div className={styles.actionIcon}><Phone size={18} color="white" /></div>
          <div style={{ flex: 1 }}>
            <p className={styles.actionLabel}>Emergency / Direct Line</p>
            <p className={styles.actionSub}>{HOTEL.phone}</p>
          </div>
          <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
        </a>

        <div
          className={styles.directionsBtn}
          onClick={() => window.open(`https://maps.google.com?q=${encodeURIComponent(HOTEL.name)}`, '_blank')}
        >
          <div className={styles.actionIcon}><Navigation size={18} color="white" /></div>
          <div style={{ flex: 1 }}>
            <p className={styles.actionLabel}>Find Your Way Back</p>
            <p className={styles.actionSub}>GPS directions to hotel</p>
          </div>
          <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
        </div>

        <div className={styles.ecoCard}>
          <span style={{ fontSize: 22 }}>🌱</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: 13, color: '#166534' }}>Skip today's housekeeping?</p>
            <p style={{ fontSize: 11, color: '#166534', opacity: 0.8, marginTop: 2 }}>
              Save water & energy — we'll donate LKR 200 to a local reef project
            </p>
          </div>
          <button
            onClick={() => alert('Thank you! Your room will not be serviced today. 🌿')}
            style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}
          >
            Skip 🌿
          </button>
        </div>
      </div>
    </div>
  )
}
