import { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { HOTEL } from '../data/config'

export default function RequestModal({ service, lang, onClose, onSubmit }) {
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  function submit() {
    onSubmit({
      service: service.label,
      desc: note || `${service.label} requested`,
      status: 'pending',
      time: 'just now',
      priority: 'normal',
      room: HOTEL.room,
    })
    setSent(true)
    setTimeout(onClose, 2000)
  }

  const Icon = service.icon

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,36,25,0.55)', zIndex: 100, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: 'var(--white)', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 430, maxHeight: '85vh', overflowY: 'auto', padding: 24 }}
        className="slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircle size={48} color="var(--teal)" style={{ margin: '0 auto 12px' }} />
            <h3 className="serif" style={{ fontSize: 22, color: 'var(--jungle)', marginBottom: 6 }}>Request Sent!</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>Our team will be with you shortly.</p>
          </div>
        ) : (
          <>
            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: service.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={service.color} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--dark)' }}>{service.label}</h3>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>Room {HOTEL.room}</p>
                </div>
              </div>
              <button onClick={onClose}
                style={{ background: 'var(--sand)', border: 'none', borderRadius: 10, width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} color="var(--dark)" />
              </button>
            </div>

            {/* Direct call (if applicable) */}
            {service.call && (
              <>
                <a href={`tel:${HOTEL.phone},${service.ext}`} style={{ textDecoration: 'none' }}>
                  <button style={{ width: '100%', padding: 16, fontSize: 15, fontWeight: 600, background: 'linear-gradient(135deg, var(--gold), var(--gold-lt))', color: 'var(--dark)', border: 'none', borderRadius: 50, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', marginBottom: 10 }}>
                    📞 Call {service.label} Now
                  </button>
                </a>
                <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginBottom: 14 }}>or send a message below</p>
              </>
            )}

            {/* Notes textarea */}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`Any special notes for ${service.label.toLowerCase()}?`}
              style={{ width: '100%', background: 'var(--cream)', border: '1px solid var(--sand)', borderRadius: 12, padding: '12px 14px', fontSize: 13, minHeight: 80, resize: 'none', color: 'var(--dark)', outline: 'none', fontFamily: 'DM Sans, sans-serif', marginBottom: 14 }}
            />

            <button onClick={submit}
              style={{ width: '100%', padding: 15, fontSize: 14, fontWeight: 600, background: 'linear-gradient(135deg, var(--gold), var(--gold-lt))', color: 'var(--dark)', border: 'none', borderRadius: 50, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              Send Request →
            </button>
          </>
        )}
      </div>
    </div>
  )
}
