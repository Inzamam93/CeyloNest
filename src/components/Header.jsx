import { LayoutDashboard } from 'lucide-react'
import { HOTEL, LANGS } from '../data/config'
import styles from './Header.module.css'

const TABS = [
  { id: 'home',     label: (t) => t.services   },
  { id: 'chat',     label: (t) => t.chat        },
  { id: 'local',    label: (t) => t.local       },
  { id: 'requests', label: (t) => t.requests    },
]

export default function Header({ lang, setLang, view, setView, isStaff, setIsStaff }) {
  const t = LANGS[lang]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? t.goodMorning : t.goodEvening

  return (
    <div className={styles.heroBg}>
      <div className={styles.topRow}>
        {/* Left: greeting + lang chips */}
        <div>
          <div className={styles.langRow}>
            {Object.keys(LANGS).map((l) => (
              <button
                key={l}
                className={`${styles.langChip} ${lang === l ? styles.langChipActive : ''}`}
                onClick={() => setLang(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <p className={styles.greeting}>{greeting}</p>
          <h1 className={`serif ${styles.roomTitle}`}>
            {t.room} {HOTEL.room}
          </h1>
          <p className={styles.hotelName}>{HOTEL.name}</p>
        </div>

        {/* Right: view toggle + checkout */}
        <div className={styles.rightCol}>
          <button
            className={`${styles.viewToggle} ${isStaff ? styles.viewToggleActive : ''}`}
            onClick={() => setIsStaff(!isStaff)}
          >
            <LayoutDashboard size={12} />
            {isStaff ? 'Staff View' : 'Guest View'}
          </button>
          <div className={styles.checkoutBox}>
            <p className={styles.checkoutLabel}>Check-out</p>
            <p className={styles.checkoutValue}>{HOTEL.checkOut}</p>
          </div>
        </div>
      </div>

      {/* WiFi banner */}
      <div className={styles.wifiBanner}>
        <span className={styles.wifiLeft}>📶 {HOTEL.wifi}</span>
        <span className={styles.wifiPass}>{HOTEL.wifiPass}</span>
      </div>

      {/* Tab bar (guest only) */}
      {!isStaff && (
        <div className={styles.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${view === tab.id ? styles.tabBtnActive : ''}`}
              onClick={() => setView(tab.id)}
            >
              {tab.label(t)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
