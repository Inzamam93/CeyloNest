import { useState } from 'react'
import Header from './components/Header'
import ServiceGrid from './components/ServiceGrid'
import ChatView from './components/ChatView'
import LocalView from './components/LocalView'
import { RequestsView, StaffDashboard } from './components/RequestViews'
import RequestModal from './components/RequestModal'
import { INITIAL_REQUESTS, HOTEL } from './data/config'

export default function App() {
  const [lang, setLang]       = useState('EN')
  const [view, setView]       = useState('home')
  const [isStaff, setIsStaff] = useState(false)
  const [requests, setRequests] = useState(INITIAL_REQUESTS)
  const [modal, setModal]     = useState(null)

  function handleRequest(service) { setModal(service) }
  function submitRequest(req) {
    setRequests((prev) => [{ ...req, id: Date.now() }, ...prev])
  }

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <Header
        lang={lang} setLang={setLang}
        view={view} setView={setView}
        isStaff={isStaff} setIsStaff={setIsStaff}
      />

      <div style={{ overflowY: 'auto', height: isStaff ? 'calc(100vh - 155px)' : 'calc(100vh - 200px)', WebkitOverflowScrolling: 'touch' }}>
        {isStaff ? (
          <StaffDashboard requests={requests} setRequests={setRequests} />
        ) : (
          <>
            {view === 'home'     && <ServiceGrid   lang={lang} onRequest={handleRequest} />}
            {view === 'chat'     && <ChatView      lang={lang} />}
            {view === 'local'    && <LocalView     lang={lang} />}
            {view === 'requests' && <RequestsView  lang={lang} requests={requests} />}
          </>
        )}
      </div>

      {/* Branding footer (guest only) */}
      {!isStaff && (
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 430, background: 'rgba(255,254,249,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(15,36,25,0.07)', padding: '10px 20px 28px', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <p style={{ fontSize: 10, color: 'rgba(107,124,110,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
            Powered by CeyX ✦ {HOTEL.name}
          </p>
        </div>
      )}

      {/* Request modal */}
      {modal && (
        <RequestModal
          service={modal}
          lang={lang}
          onClose={() => setModal(null)}
          onSubmit={submitRequest}
        />
      )}
    </div>
  )
}
