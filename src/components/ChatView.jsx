import { useState, useRef, useEffect } from 'react'
import { Leaf, Send } from 'lucide-react'
import { LANGS, HOTEL } from '../data/config'
import { askClaude } from '../utils/claude'

const QUICK_PROMPTS = [
  'WiFi password?',
  'Check-out time?',
  'Best beach nearby?',
  'Book a tuk-tuk?',
]

export default function ChatView({ lang }) {
  const t = LANGS[lang]
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Ayubowan! 🙏 Welcome to ${HOTEL.name}. I'm your AI concierge — ask me about hotel services, local attractions, Sri Lankan cuisine, or anything you need for a perfect stay!`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const updated = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setLoading(true)
    try {
      const reply = await askClaude(updated.map(({ role, content }) => ({ role, content })))
      setMessages([...updated, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...updated, { role: 'assistant', content: `I'm having trouble connecting. Please call reception at ${HOTEL.phone}.` }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 220px)' }}>
      {/* Message list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} className="fade-in" style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'assistant' && (
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--jungle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, flexShrink: 0, marginTop: 2 }}>
                <Leaf size={14} color="var(--gold)" />
              </div>
            )}
            <div style={m.role === 'user' ? {
              background: 'linear-gradient(135deg, var(--jungle), var(--forest))',
              color: 'var(--cream)', borderRadius: '18px 18px 4px 18px',
              padding: '12px 16px', maxWidth: '80%', fontSize: 14, lineHeight: 1.5,
            } : {
              background: 'var(--white)', color: 'var(--dark)',
              borderRadius: '18px 18px 18px 4px',
              padding: '12px 16px', maxWidth: '85%', fontSize: 14, lineHeight: 1.5,
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--jungle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={14} color="var(--gold)" />
            </div>
            <div style={{ background: 'var(--white)', borderRadius: '18px 18px 18px 4px', padding: '14px 16px', display: 'flex', gap: 4, alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--muted)', display: 'inline-block', animation: `bounce 1.2s ${d}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 2 && (
        <div style={{ padding: '0 16px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {QUICK_PROMPTS.map((q) => (
            <button key={q}
              onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50) }}
              style={{ background: 'var(--white)', border: '1px solid var(--sand)', borderRadius: 20, padding: '6px 12px', fontSize: 12, color: 'var(--forest)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div style={{ padding: '10px 16px 100px', display: 'flex', gap: 10, background: 'var(--cream)', borderTop: '1px solid rgba(15,36,25,0.08)' }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={t.typeMsg}
          style={{ flex: 1, background: 'var(--white)', border: '1px solid var(--sand)', borderRadius: 24, padding: '12px 16px', fontSize: 14, color: 'var(--dark)', outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
        />
        <button onClick={send}
          style={{ width: 46, height: 46, borderRadius: 23, background: 'linear-gradient(135deg, var(--gold), var(--gold-lt))', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Send size={16} color="var(--dark)" />
        </button>
      </div>
    </div>
  )
}
