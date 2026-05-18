import styles from './Toggle.module.css'

export default function Toggle({ on, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`${styles.track} ${on ? styles.on : ''}`}
    >
      <span className={styles.thumb} />
    </button>
  )
}
