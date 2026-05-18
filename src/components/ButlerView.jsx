import { useState, useRef, useEffect } from 'react'
import { Leaf, Send } from 'lucide-react'
import { BUTLER, LANGS, HOTEL } from '../data/config'
import { askClaude } from '../utils/claude'
import { Avatar, Card, SectionHeader } from './ui'
import styles from './ButlerView.module.css'

const QUICK_PROMPTS = ['WiFi password?', 'Best beach?', 'Check-out time?', 'Book Ayurveda?']

export default function ButlerView({ lang, prefs = {} }) {
  const t = LANGS[lang]
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Ayubowan! 🙏 Welcome to ${HOTEL.name}. I'm your AI concierge. ${BUTLER.name}, your personal butler, is ${BUTLER.online ? 'online and ready to help' : 'currently off-duty — I\'ll pass your messages along'}. Ask me anything!`,
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [butlerMsg, setButlerMsg] = useState('')
  const [butlerSent, setButlerSent] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  async function sendAI() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const updated = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setLoading(true)
    try {
      const reply = await askClaude(updated.map(({ role, content }) => ({ role, content })), prefs)
      setMessages([...updated, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...updated, { role: 'assistant', content: `Sorry, I'm having trouble. Please contact ${BUTLER.name} directly or call ${HOTEL.phone}.` }])
    }
    setLoading(false)
  }

  function sendButlerMessage() {
    if (!butlerMsg.trim()) return
    setButlerSent(true)
    setButlerMsg('')
    setTimeout(() => setButlerSent(false), 3000)
  }

  return (
    <div style={{ padding: '16px 16px 100px' }}>
      {/* Butler profile card */}
      <Card className={styles.butlerCard}>
        <div className={styles.butlerTop}>
          <Avatar initials={BUTLER.avatar} size={52} online={BUTLER.online} />
          <div style={{ flex: 1 }}>
            <div className={styles.nameRow}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)' }}>{BUTLER.name}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{BUTLER.role} · Since {BUTLER.since}</p>
              </div>
              <span className={`${styles.statusBadge} ${BUTLER.online ? styles.online : styles.offline}`}>
                {BUTLER.online ? '● Online' : '○ Off duty'}
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>{BUTLER.bio}</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {BUTLER.langs.map((l) => <span key={l} className={styles.langChip}>{l}</span>)}
            </div>
          </div>
        </div>

        {/* Direct message to butler */}
        <div className={styles.divider}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--dark)', marginBottom: 8 }}>Message {BUTLER.name} directly</p>
          {butlerSent ? (
            <div className={styles.sentBox}>
              <span style={{ color: '#059669', fontSize: 16 }}>✓</span>
              <p style={{ fontSize: 13, color: '#065f46', fontWeight: 600 }}>{BUTLER.name} will respond shortly!</p>
            </div>
          ) : (
            <div className={styles.messageRow}>
              <input
                className={styles.msgInput}
                value={butlerMsg}
                onChange={(e) => setButlerMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendButlerMessage()}
                placeholder={`Message ${BUTLER.name}…`}
              />
              <button className={styles.sendIconBtn} onClick={sendButlerMessage}>
                <Send size={15} color="var(--dark)" />
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* AI Concierge */}
      <div className={styles.aiHeader}>
        <div className={styles.aiIconWrap}><Leaf size={14} color="var(--gold)" /></div>
        <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--dark)' }}>
          AI Concierge <span style={{ color: 'var(--muted)', fontWeight: 400 }}>— 24/7 instant answers</span>
        </p>
      </div>

      <Card>
        <div style={{ height: 280, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} className="fade-in" style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 8 }}>
              {m.role === 'assistant' && (
                <div className={styles.aiIconWrap} style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, marginTop: 2 }}>
                  <Leaf size={12} color="var(--gold)" />
                </div>
              )}
              <div style={m.role === 'user' ? {
                background: 'linear-gradient(135deg,var(--jungle),var(--forest))', color: 'var(--cream)',
                borderRadius: '16px 16px 4px 16px', padding: '10px 14px', maxWidth: '80%', fontSize: 13, lineHeight: 1.5,
              } : {
                background: 'var(--cream)', color: 'var(--dark)',
                borderRadius: '16px 16px 16px 4px', padding: '10px 14px', maxWidth: '85%', fontSize: 13, lineHeight: 1.5,
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div className={styles.aiIconWrap} style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0 }}>
                <Leaf size={12} color="var(--gold)" />
              </div>
              <div style={{ background: 'var(--cream)', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', display: 'flex', gap: 4 }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--muted)', display: 'inline-block', animation: `bounce 1.2s ${d}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 2 && (
          <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {QUICK_PROMPTS.map((q) => (
              <button key={q} onClick={() => setInput(q)}
                style={{ background: 'var(--sand)', border: 'none', borderRadius: 20, padding: '5px 11px', fontSize: 11, color: 'var(--jungle)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                {q}
              </button>
            ))}
          </div>
        )}

        <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 8, borderTop: '1px solid var(--sand)' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendAI()}
            placeholder={t.typeMsg}
            style={{ flex: 1, background: 'var(--cream)', border: '1px solid var(--sand)', borderRadius: 24, padding: '10px 14px', fontSize: 13, color: 'var(--dark)', outline: 'none', fontFamily: 'var(--font-sans)' }}
          />
          <button className={styles.sendIconBtn} onClick={sendAI} disabled={!input.trim() || loading}>
            <Send size={14} color="var(--dark)" />
          </button>
        </div>
      </Card>
    </div>
  )
}
