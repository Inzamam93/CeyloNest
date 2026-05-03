import { HOTEL, LANGS, ACCESS_MODES, MOBILITY_OPTIONS, SENSORY_OPTIONS } from '../data/config'
import styles from './AccessibilityView.module.css'

// ─── SUB-COMPONENT: Toggle ────────────────────────────────────────────────────
function Toggle({ checked, onChange, label }) {
  return (
    <label className={styles.toggle} aria-label={label}>
      <input
        type="checkbox"
        className={styles.toggleInput}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={`${styles.toggleTrack} ${checked ? styles.toggleTrackOn : ''}`}>
        <span className={`${styles.toggleThumb} ${checked ? styles.toggleThumbOn : ''}`} />
      </span>
    </label>
  )
}

// ─── GUEST NEED FLAGS ─────────────────────────────────────────────────────────
const GUEST_NEEDS = [
  { id: 'visual',       icon: '👁️',  label: 'Visual' },
  { id: 'deaf',         icon: '🦻',  label: 'Deaf / HoH' },
  { id: 'mobility',     icon: '🦽',  label: 'Mobility' },
  { id: 'neurodivergent', icon: '🧠', label: 'Neurodivergent' },
  { id: 'elderly',      icon: '👴',  label: 'Elderly' },
  { id: 'family',       icon: '👶',  label: 'Family / Carer' },
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AccessibilityView({
  lang,
  accessMode,
  setAccessMode,
  guestNeeds,
  setGuestNeeds,
  sensoryPrefs,
  setSensoryPrefs,
  mobilityPref,
  setMobilityPref,
  dndPlus,
  setDndPlus,
  textFirst,
  setTextFirst,
  medReminder,
  setMedReminder,
}) {
  const t = LANGS[lang]

  // ── need flag toggle ────────────────────────────────────────────────────────
  function toggleNeed(id) {
    setGuestNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    )
  }

  // ── sensory pref toggle ─────────────────────────────────────────────────────
  function toggleSensory(pref) {
    setSensoryPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    )
  }

  return (
    <div className={styles.container} role="main" aria-label="Accessibility settings">

      {/* ── WCAG badge ─────────────────────────────────────────────────────── */}
      <div className={styles.wcagBadge} role="note" aria-label="WCAG 2.2 AA compliant">
        <span className={styles.wcagBadgeIcon} aria-hidden="true">♿</span>
        <p className={styles.wcagBadgeText}>
          Butler meets <strong>WCAG 2.2 AA</strong> — all touch targets ≥ 44×44 px,
          screen-reader optimised, no time-limited interactions.
        </p>
      </div>

      {/* ── DISPLAY MODE ───────────────────────────────────────────────────── */}
      <p className={styles.sectionTitle} id="display-mode-label">Display Mode</p>
      <div
        className={styles.modeGrid}
        role="radiogroup"
        aria-labelledby="display-mode-label"
      >
        {Object.entries(ACCESS_MODES).map(([key, mode]) => {
          const isActive = accessMode === key
          return (
            <button
              key={key}
              className={`${styles.modeCard} ${isActive ? styles.modeCardActive : ''}`}
              onClick={() => setAccessMode(key)}
              role="radio"
              aria-checked={isActive}
              aria-label={`${mode.label}: ${mode.desc}`}
            >
              {isActive
                ? <span className={styles.modeCheck} aria-hidden="true" />
                : <p className={styles.modeIcon} aria-hidden="true">{mode.icon}</p>
              }
              <span className={styles.modeLabel}>{mode.label}</span>
              <p className={styles.modeDesc}>{mode.desc}</p>
            </button>
          )
        })}
      </div>

      {/* ── GUEST NEEDS ────────────────────────────────────────────────────── */}
      <p className={styles.sectionTitle} id="guest-needs-label">My Accessibility Needs</p>
      <div
        className={styles.needsRow}
        role="group"
        aria-labelledby="guest-needs-label"
      >
        {GUEST_NEEDS.map((need) => {
          const active = guestNeeds.includes(need.id)
          return (
            <button
              key={need.id}
              className={`${styles.needChip} ${active ? styles.needChipActive : ''}`}
              onClick={() => toggleNeed(need.id)}
              aria-pressed={active}
              aria-label={need.label}
            >
              <span aria-hidden="true">{need.icon}</span>
              {need.label}
            </button>
          )
        })}
      </div>
      <p className={styles.infoBox} role="note">
        These flags are shared with your butler so they can adapt their approach — e.g. text-first communication, room orientation on arrival, minimal surprises.
      </p>

      {/* ── COMMUNICATION PREFERENCES ──────────────────────────────────────── */}
      <p className={styles.sectionTitle}>Communication</p>

      {/* DND+ */}
      <div className={`${styles.dndBanner} ${dndPlus ? styles.dndBannerActive : ''}`}>
        <div className={styles.dndIconWrap} aria-hidden="true">
          {dndPlus ? '🔕' : '🔔'}
        </div>
        <div className={styles.dndTextCol}>
          <p className={styles.dndTitle}>Do Not Disturb+</p>
          <p className={styles.dndDesc}>
            {dndPlus
              ? 'Active — no knocking, no calls. Butler checks in via app once each morning.'
              : 'Enable for text-only contact. All staff alerted: no knocks, no calls.'}
          </p>
        </div>
        <Toggle
          checked={dndPlus}
          onChange={setDndPlus}
          label="Do Not Disturb Plus toggle"
        />
      </div>

      {/* Text-first & other comms */}
      <div className={styles.prefList} style={{ marginTop: 10 }} role="group" aria-label="Communication preferences">
        <div className={styles.prefItem}>
          <div>
            <p className={styles.prefItemLabel}>Text-First Communication</p>
            <p className={styles.prefItemSub}>Butler messages before any room visit</p>
          </div>
          <Toggle
            checked={textFirst}
            onChange={setTextFirst}
            label="Text-first communication toggle"
          />
        </div>
        <div className={styles.prefItem}>
          <div>
            <p className={styles.prefItemLabel}>Visual Alerts Only</p>
            <p className={styles.prefItemSub}>Push notifications — no audio alerts</p>
          </div>
          <Toggle
            checked={guestNeeds.includes('deaf')}
            onChange={() => toggleNeed('deaf')}
            label="Visual alerts only toggle"
          />
        </div>
      </div>

      {/* ── SENSORY PREFERENCES ────────────────────────────────────────────── */}
      <p className={styles.sectionTitle} id="sensory-label">Sensory Preferences</p>
      <div className={styles.prefList} role="group" aria-labelledby="sensory-label">
        {SENSORY_OPTIONS.map((pref) => {
          const active = sensoryPrefs.includes(pref)
          return (
            <div
              key={pref}
              className={styles.prefItem}
              onClick={() => toggleSensory(pref)}
              role="checkbox"
              aria-checked={active}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleSensory(pref)}
            >
              <p className={styles.prefItemLabel}>{pref}</p>
              <Toggle
                checked={active}
                onChange={() => toggleSensory(pref)}
                label={pref}
              />
            </div>
          )
        })}
      </div>

      {/* ── MOBILITY / PHYSICAL ────────────────────────────────────────────── */}
      <p className={styles.sectionTitle} id="mobility-label">Mobility & Physical Needs</p>
      <div className={styles.radioRow} role="radiogroup" aria-labelledby="mobility-label">
        {MOBILITY_OPTIONS.map((opt) => {
          const active = mobilityPref === opt
          return (
            <div
              key={opt}
              className={styles.radioItem}
              onClick={() => setMobilityPref(opt)}
              role="radio"
              aria-checked={active}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setMobilityPref(opt)}
            >
              <span className={`${styles.radioDot} ${active ? styles.radioDotActive : ''}`} aria-hidden="true" />
              <span className={styles.radioLabel}>{opt}</span>
            </div>
          )
        })}
      </div>
      {mobilityPref && mobilityPref !== 'None' && (
        <p className={styles.infoBox} style={{ marginTop: 8 }} role="note">
          Your butler will pre-confirm accessible routes, arrange roll-in shower setup, and ensure all paths are clear on arrival.
        </p>
      )}

      {/* ── WELLBEING ──────────────────────────────────────────────────────── */}
      <p className={styles.sectionTitle}>Wellbeing</p>

      {/* Medication reminder */}
      <div className={styles.medCard}>
        <div className={styles.medIcon} aria-hidden="true">💊</div>
        <div className={styles.medContent}>
          <p className={styles.medLabel}>Medication Reminder</p>
          <input
            type="time"
            className={styles.medInput}
            value={medReminder}
            onChange={(e) => setMedReminder(e.target.value)}
            aria-label="Set medication reminder time"
          />
          {medReminder && (
            <p style={{ fontSize: 11, color: 'var(--teal)', marginTop: 4 }}>
              ✓ Reminder set for {medReminder} daily
            </p>
          )}
        </div>
      </div>

      {/* ── EMERGENCY ──────────────────────────────────────────────────────── */}
      <p className={styles.sectionTitle}>Emergency</p>
      <a
        href={`tel:${HOTEL.phone}`}
        className={styles.emergencyCard}
        aria-label={`Emergency call to hotel reception at ${HOTEL.phone}`}
      >
        <div className={styles.emergencyIconWrap} aria-hidden="true">🆘</div>
        <div>
          <p className={styles.emergencyTitle}>Emergency / Reception</p>
          <p className={styles.emergencySubtitle}>{HOTEL.phone} — tap to call immediately</p>
        </div>
      </a>

    </div>
  )
}
