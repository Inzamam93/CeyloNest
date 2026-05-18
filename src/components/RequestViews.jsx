import { useState } from 'react'
import { CheckCircle, ChevronRight, Star } from 'lucide-react'
import { HOTEL, LANGS, STATUS_CONFIG } from '../data/config'
import { SectionHeader } from './ui'
import LivePulseModal from './LivePulseModal'
import styles from './RequestViews.module.css'

export function RequestsView({ lang, requests, onReview }) {
  const t = LANGS[lang]
  const myRequests = requests.filter((r) => r.room === HOTEL.room)
  const [showReview, setShowReview] = useState(false)

  return (
    <div style={{ padding: '16px 16px 100px' }}>
      {/* LivePulse CTA */}
      <div className={styles.pulseCard} onClick={() => setShowReview(true)}>
        <div className={styles.pulseIcon}>
          <Star size={22} color="var(--gold-lt)" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: 'var(--gold-lt)', fontWeight: 700, fontSize: 14 }}>LivePulse — How is your stay?</p>
          <p style={{ color: 'rgba(247,240,227,0.7)', fontSize: 11, marginTop: 2 }}>
            Your feedback helps your butler improve your experience right now
          </p>
        </div>
        <ChevronRight size={16} color="rgba(247,240,227,0.6)" />
      </div>

      <SectionHeader title={t.myRequests} />

      {myRequests.length === 0 ? (
        <div className={styles.empty}>
          <CheckCircle size={40} color="var(--teal)" style={{ margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>No active requests</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {myRequests.map((r) => {
            const cfg = STATUS_CONFIG[r.status]
            return (
              <div key={r.id} className={styles.requestCard} style={{ borderLeftColor: cfg.border }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--dark)' }}>{r.service}</p>
                  <span className={styles.statusBadge} style={{ background: cfg.color + '20', color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{r.desc}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)' }}>⏱ {r.time}</p>
              </div>
            )
          })}
        </div>
      )}

      {showReview && (
        <LivePulseModal
          onClose={() => setShowReview(false)}
          onSubmit={(review) => { onReview(review); setShowReview(false) }}
        />
      )}
    </div>
  )
}
