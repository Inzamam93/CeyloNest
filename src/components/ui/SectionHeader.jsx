export default function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2
        className="serif"
        style={{ fontSize: 22, fontWeight: 400, color: 'var(--jungle)', lineHeight: 1.2 }}
      >
        {title}
      </h2>
      {sub && (
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{sub}</p>
      )}
    </div>
  )
}
