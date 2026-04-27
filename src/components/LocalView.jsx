import { useState } from 'react'
import { LANGS, LOCAL_SERVICES } from '../data/config'

export default function LocalView({ lang }) {
  const t = LANGS[lang]
  const [booked, setBooked] = useState([])

  function toggle(id) {
    setBooked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      <h2 className="serif" style={{ fontSize: 24, fontWeight: 300, color: 'var(--jungle)', marginBottom: 4 }}>
        {t.localTitle}
      </h2>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 18 }}>Curated by our concierge team</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {LOCAL_SERVICES.map((s, i) => (
          <div key={s.id} className="slide-up"
            style={{ animationDelay: `${i * 0.06}s`, background: 'var(--white)', borderRadius: 16, padding: 16, boxShadow: '0 1px 8px rgba(15,36,25,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 1 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--dark)' }}>{s.name}</p>
                    <span style={{ background: 'var(--sand)', color: 'var(--forest)', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {s.tag}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>⏱ {s.eta}</span>
                    <span style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 600 }}>{s.price}</span>
                    <span style={{ fontSize: 11, color: 'var(--gold)' }}>★ {s.rating}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => toggle(s.id)}
                style={{ background: booked.includes(s.id) ? 'var(--jungle)' : 'var(--sand)', color: booked.includes(s.id) ? 'var(--cream)' : 'var(--jungle)', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0 }}>
                {booked.includes(s.id) ? '✓ Booked' : 'Book →'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
