import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { HOTEL, LANGS, STATUS_CONFIG } from '../data/config'

// ─── GUEST: My Requests ───────────────────────────────────────────────────────
export function RequestsView({ lang, requests }) {
  const t = LANGS[lang]
  const myRequests = requests.filter((r) => r.room === HOTEL.room)

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      <h2 className="serif" style={{ fontSize: 22, fontWeight: 300, color: 'var(--jungle)', marginBottom: 16 }}>
        Your Requests
      </h2>
      {myRequests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <CheckCircle size={40} color="var(--teal)" style={{ margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>No active requests</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {myRequests.map((r) => {
            const cfg = STATUS_CONFIG[r.status]
            return (
              <div key={r.id} style={{ borderLeft: `3px solid ${cfg.borderColor}`, borderRadius: 12, padding: 14, background: 'var(--white)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--dark)' }}>{r.service}</p>
                    <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{r.desc}</p>
                  </div>
                  <span style={{ background: cfg.color + '20', color: cfg.color, fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, flexShrink: 0 }}>
                    {cfg.label}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>⏱ {r.time}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── STAFF: Dashboard ─────────────────────────────────────────────────────────
export function StaffDashboard({ requests, setRequests }) {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter)
  const counts = {
    pending:       requests.filter((r) => r.status === 'pending').length,
    'in-progress': requests.filter((r) => r.status === 'in-progress').length,
    done:          requests.filter((r) => r.status === 'done').length,
  }

  function advance(id) {
    setRequests((prev) => prev.map((r) => {
      if (r.id !== id) return r
      return { ...r, status: r.status === 'pending' ? 'in-progress' : 'done' }
    }))
  }

  return (
    <div style={{ padding: '20px 16px 80px' }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="serif" style={{ fontSize: 22, fontWeight: 400, color: 'var(--jungle)' }}>Staff Dashboard</h2>
        <span style={{ background: 'var(--sand)', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: 'var(--muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
          Live <span className="pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
        </span>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'Pending',  count: counts.pending,         color: '#f59e0b', bg: '#fef3c7' },
          { label: 'Active',   count: counts['in-progress'],  color: '#3b82f6', bg: '#dbeafe' },
          { label: 'Done',     count: counts.done,            color: '#10b981', bg: '#d1fae5' },
        ].map((s) => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: '14px 12px', textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.count}</p>
            <p style={{ fontSize: 11, color: s.color, fontWeight: 500, marginTop: 3 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 }}>
        {['all', 'pending', 'in-progress', 'done'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', background: filter === f ? 'var(--jungle)' : 'var(--sand)', color: filter === f ? 'var(--cream)' : 'var(--dark)', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s', flexShrink: 0 }}>
            {f === 'all' ? 'All' : STATUS_CONFIG[f]?.label}
          </button>
        ))}
      </div>

      {/* Request list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((r, i) => {
          const cfg = STATUS_CONFIG[r.status]
          return (
            <div key={r.id} className="slide-up"
              style={{ animationDelay: `${i * 0.04}s`, borderLeft: `3px solid ${cfg.borderColor}`, borderRadius: 12, padding: 14, background: 'var(--white)', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ background: 'var(--jungle)', color: 'var(--gold)', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 8 }}>R{r.room}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark)' }}>{r.service}</span>
                  {r.priority === 'high' && <span style={{ background: '#fecaca', color: '#dc2626', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 6, textTransform: 'uppercase' }}>Urgent</span>}
                </div>
                <span style={{ background: cfg.color + '20', color: cfg.color, fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 12 }}>{cfg.label}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>{r.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>⏱ {r.time}</span>
                {r.status !== 'done' && (
                  <button onClick={() => advance(r.id)}
                    style={{ background: r.status === 'pending' ? 'var(--teal)' : 'var(--jungle)', color: 'white', border: 'none', borderRadius: 10, padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                    {r.status === 'pending' ? '▶ Start' : '✓ Mark Done'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


