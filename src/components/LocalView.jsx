import { useState } from 'react'
import { LANGS, LOCAL_SERVICES } from '../data/config'
import { SectionHeader } from './ui'
import styles from './LocalView.module.css'

export default function LocalView({ lang }) {
  const t = LANGS[lang]
  const [booked, setBooked] = useState([])

  function toggle(id) {
    setBooked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  return (
    <div style={{ padding: '16px 16px 100px' }}>
      <SectionHeader title={t.localTitle} sub="Curated by your personal butler" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {LOCAL_SERVICES.map((s, i) => {
          const isBooked = booked.includes(s.id)
          return (
            <div key={s.id} className={`slide-up ${styles.card}`} style={{ animationDelay: `${i * 0.06}s` }}>
              <div className={styles.inner}>
                <span style={{ fontSize: 30 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--dark)' }}>{s.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, lineHeight: 1.4 }}>{s.desc}</p>
                    </div>
                    <span className={styles.tag}>{s.tag}</span>
                  </div>
                  <div className={styles.meta}>
                    <div style={{ display: 'flex', gap: 10, flex: 1 }}>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>⏱ {s.eta}</span>
                      <span style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 600 }}>{s.price}</span>
                      <span style={{ fontSize: 11, color: 'var(--gold)' }}>★ {s.rating}</span>
                    </div>
                    <button
                      className={`${styles.bookBtn} ${isBooked ? styles.bookBtnBooked : styles.bookBtnDefault}`}
                      onClick={() => toggle(s.id)}
                    >
                      {isBooked ? '✓ Booked' : 'Book →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
