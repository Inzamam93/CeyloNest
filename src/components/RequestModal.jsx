import { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { HOTEL } from '../data/config'
import { GoldBtn } from './ui'
import styles from './RequestModal.module.css'

export default function RequestModal({ service, lang, onClose, onSubmit }) {
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)
  const Icon = service.icon

  function submit() {
    onSubmit({ service: service.label, desc: note || `${service.label} requested`, status: 'pending', time: 'just now', priority: 'normal', room: HOTEL.room, guestName: 'You' })
    setSent(true)
    setTimeout(onClose, 2200)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`slide-up ${styles.sheet}`} onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div className={styles.successWrap}>
            <CheckCircle size={48} color="var(--teal)" style={{ margin: '0 auto 12px' }} />
            <h3 className="serif" style={{ fontSize: 22, color: 'var(--jungle)', marginBottom: 6 }}>Request Sent!</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>Your butler has been notified and will be with you shortly.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className={styles.iconWrap} style={{ background: service.bg }}>
                  <Icon size={22} color={service.color} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--dark)' }}>{service.label}</h3>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>Room {HOTEL.room}</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={15} color="var(--dark)" />
              </button>
            </div>

            {service.call && (
              <>
                <a href={`tel:${HOTEL.phone},${service.ext}`} className={styles.callLink}>
                  <GoldBtn style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {service.label} Now
                  </GoldBtn>
                </a>
                <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginBottom: 14 }}>or send a message</p>
              </>
            )}

            <textarea
              className={styles.textarea}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`Notes for ${service.label.toLowerCase()}…`}
            />
            <GoldBtn onClick={submit} style={{ width: '100%', justifyContent: 'center' }}>
              Send Request →
            </GoldBtn>
          </>
        )}
      </div>
    </div>
  )
}
