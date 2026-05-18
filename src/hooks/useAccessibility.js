import { useState, useEffect } from 'react'

const MODE_CLASS = {
  standard:     null,
  highContrast: 'a11y-high-contrast',
  large:        'a11y-large',
  simple:       'a11y-simple',
}

const STORAGE_KEY = 'butler_a11y_mode'

export function useAccessibility() {
  const [mode, setModeState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'standard'
  )

  // Apply body class whenever mode changes
  useEffect(() => {
    // Remove all a11y classes first
    document.body.classList.remove(...Object.values(MODE_CLASS).filter(Boolean))
    // Apply the new one (if any)
    const cls = MODE_CLASS[mode]
    if (cls) document.body.classList.add(cls)
  }, [mode])

  function setMode(newMode) {
    localStorage.setItem(STORAGE_KEY, newMode)
    setModeState(newMode)
  }

  return { mode, setMode }
}
