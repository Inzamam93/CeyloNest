import { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { HOTEL } from '../data/config'
import { StarRating, GoldBtn } from './ui'
import styles from './LivePulseModal.module.css'

const TOUCHPOINTS = ['Overall', 'Room', 'Butler', 'Food', 'Cleanliness', 'Atmosphere']

export default function LivePulseModal({ onClose, onSubmit }) {
  const [stars, setStars] = useState(0)
  const [comment, setComment] = useState('')
  const [touchpoint, setTouchpoint] = useState('Overall')
  const [submitted, setSubmitted] = useState(false)

  function submit() {
    if (!stars) return
    onSubmit({ stars, comment, touchpoint, guestName: 'You', room: HOTEL.room, time: 'just now', status: 'unread', responded: false })
    setSubmitted(true)
    setTimeout(onClose, 2500)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`slide-up ${styles.sheet}`} onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className={styles.successWrap}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{stars >= 4 ? '🌟' : stars >= 3 ? '🙏' : '💚'}</div>
            <h3 className="serif" style={{ fontSize: 22, color: 'var(--jungle)', marginBottom: 6 }}>Thank you!</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>
              {stars <= 2 ? 'Your butler has been alerted and will contact you shortly.' : 'Your feedback means the world to us.'}
            </p>
          </div>
        ) : (
          <>
            <div className={styles.titleRow}>
              <div>
                <h3 className="serif" style={{ fontSize: 20, color: 'var(--jungle)' }}>How is your stay?</h3>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>Your honest feedback helps us right now</p>
              </div>
              <button className={styles.closeBtn} onClick={onClose}><X size={15} color="var(--dark)" /></button>
            </div>

            <div className={styles.starsRow}>
              <StarRating value={stars} onChange={setStars} size={36} />
            </div>

            {stars > 0 && stars <= 3 && (
              <div className={`slide-up ${styles.warningBox}`}>
                <AlertTriangle size={14} color="#d97706" />
                <p style={{ fontSize: 12, color: '#92400e' }}>We'll personally follow up with you immediately.</p>
              </div>
            )}

            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--dark)', marginBottom: 8 }}>What are you rating?</p>
            <div className={styles.touchpoints}>
              {TOUCHPOINTS.map((tp) => (
                <button
                  key={tp}
                  className={`${styles.tpBtn} ${touchpoint === tp ? styles.tpActive : styles.tpDefault}`}
                  onClick={() => setTouchpoint(tp)}
                >
                  {tp}
                </button>
              ))}
            </div>

            <textarea
              className={styles.textarea}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Anything you'd like to share? (optional)"
            />

            <GoldBtn onClick={submit} disabled={!stars} style={{ width: '100%', justifyContent: 'center' }}>
              Submit Feedback
            </GoldBtn>
          </>
        )}
      </div>
    </div>
  )
}
