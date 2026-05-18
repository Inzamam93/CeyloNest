import styles from './Avatar.module.css'

export default function Avatar({ initials, size = 36, online }) {
  const fontSize = Math.round(size * 0.35)
  const borderRadius = Math.round(size / 3)

  return (
    <div className={styles.wrapper} style={{ position: 'relative', display: 'inline-flex' }}>
      <div
        className={styles.avatar}
        style={{ width: size, height: size, borderRadius, fontSize }}
        aria-label={`Avatar for ${initials}`}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={`${styles.dot} ${online ? styles.online : styles.offline}`}
          aria-label={online ? 'Online' : 'Offline'}
        />
      )}
    </div>
  )
}
