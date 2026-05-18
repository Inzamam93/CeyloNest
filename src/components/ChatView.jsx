import { useState, useRef, useEffect } from 'react'
import { Leaf, Send } from 'lucide-react'
import { LANGS, HOTEL } from '../data/config'
import { askClaude } from '../utils/claude'
import styles from './ChatView.module.css'

const QUICK_PROMPTS = ['WiFi password?', 'Check-out time?', 'Best beach nearby?', 'Book a tuk-tuk?']

export default function ChatView({ lang, prefs = {} }) {
  const t = LANGS[lang]
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Ayubowan! 🙏 Welcome to ${HOTEL.name}. I'm your AI concierge — ask me about hotel services, local attractions, Sri Lankan cuisine, or anything you need for a perfect stay!`,
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  async function send() {
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
      setMessages([...updated, { role: 'assistant', content: `I'm having trouble connecting. Please call reception at ${HOTEL.phone}.` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={`fade-in ${styles.row} ${m.role === 'user' ? styles.rowUser : styles.rowAssistant}`}>
            {m.role === 'assistant' && (
              <div className={styles.avatarIcon}><Leaf size={14} color="var(--gold)" /></div>
            )}
            <div className={m.role === 'user' ? styles.bubbleUser : styles.bubbleAI}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className={`${styles.row} ${styles.rowAssistant}`}>
            <div className={styles.avatarIcon}><Leaf size={14} color="var(--gold)" /></div>
            <div className={styles.bubbleAI} style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '14px 16px' }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <span key={i} className={styles.typingDot} style={{ animationDelay: `${d}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 2 && (
        <div className={styles.quickChips}>
          {QUICK_PROMPTS.map((q) => (
            <button key={q} className={styles.chip}
              onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50) }}>
              {q}
            </button>
          ))}
        </div>
      )}

      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder={t.typeMsg}
        />
        <button className={styles.sendBtn} onClick={send}>
          <Send size={16} color="var(--dark)" />
        </button>
      </div>
    </div>
  )
}
