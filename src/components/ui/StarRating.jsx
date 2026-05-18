import { useState } from 'react'
import { Star } from 'lucide-react'

export default function StarRating({ value = 0, onChange, size = 28, readonly = false }) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => !readonly && onChange?.(n)}
          onMouseEnter={() => !readonly && setHovered(n)}
          onMouseLeave={() => !readonly && setHovered(0)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          style={{
            background: 'none',
            border: 'none',
            cursor: readonly ? 'default' : 'pointer',
            padding: 2,
          }}
        >
          <Star
            size={size}
            fill={active >= n ? '#f59e0b' : 'none'}
            color={active >= n ? '#f59e0b' : '#d1d5db'}
            style={{ transition: 'all 0.15s' }}
          />
        </button>
      ))}
    </div>
  )
}
