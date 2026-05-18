import { LayoutDashboard } from 'lucide-react'
import { HOTEL, LANGS } from '../data/config'
import styles from './Header.module.css'

const TABS = [
  { id: 'home',     label: (t) => t.services  },
  { id: 'butler',   label: (t) => t.butler    },
  { id: 'explore',  label: (t) => t.explore   },
  { id: 'requests', label: (t) => t.requests  },
  { id: 'profile',  label: (t) => t.profile   },
]

export default function Header({ lang, setLang, view, setView, isStaff, setIsStaff, pendingAlerts = 0 }) {
  const t = LANGS[lang]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? t.goodMorning : t.goodEvening

  return (
    <div className={styles.heroBg}>
      <div className={styles.topRow}>
        <div>
          <div className={styles.langRow}>
            {Object.keys(LANGS).map((l) => (
              <button key={l} className={`${styles.langChip} ${lang === l ? styles.langChipActive : ''}`} onClick={() => setLang(l)}>{l}</button>
            ))}
          </div>
          <p className={styles.greeting}>{greeting}</p>
          <h1 className={`serif ${styles.roomTitle}`}>
            {t.room} {HOTEL.room} · <span className={styles.hotelAccent}>{HOTEL.shortName}</span>
          </h1>
        </div>
        <div className={styles.rightCol}>
          <button className={`${styles.viewToggle} ${isStaff ? styles.viewToggleActive : ''}`} onClick={() => setIsStaff(!isStaff)}>
            <LayoutDashboard size={11} />
            {isStaff ? 'Staff' : 'Guest'}
            {pendingAlerts > 0 && <span className={styles.alertBadge}>{pendingAlerts}</span>}
          </button>
          <div className={styles.checkoutBox}>
            <p className={styles.checkoutLabel}>Check-out</p>
            <p className={styles.checkoutValue}>{HOTEL.checkOut}</p>
          </div>
        </div>
      </div>
      <div className={styles.wifiBanner}>
        <span className={styles.wifiLeft}>📶 {HOTEL.wifi}</span>
        <span className={styles.wifiPass}>{HOTEL.wifiPass}</span>
      </div>
      {!isStaff && (
        <div className={styles.tabBar}>
          {TABS.map((tab) => (
            <button key={tab.id} className={`${styles.tabBtn} ${view === tab.id ? styles.tabBtnActive : ''}`} onClick={() => setView(tab.id)}>
              {tab.label(t)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
