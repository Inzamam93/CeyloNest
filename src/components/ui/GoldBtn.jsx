import styles from './GoldBtn.module.css'

export default function GoldBtn({ children, onClick, style, small = false, disabled = false, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${small ? styles.small : styles.regular} ${disabled ? styles.disabled : ''}`}
      style={style}
    >
      {children}
    </button>
  )
}
