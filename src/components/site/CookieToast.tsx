import * as React from "react"
import type { Strings } from "../../data/strings"

const KEY = "fa-cookies"

// Aviso discreto abajo a la derecha: la web no usa cookies. Se muestra hasta que se cierra.
const CookieToast: React.FC<{ s: Strings }> = ({ s }) => {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    let seen: string | null = "1"
    try {
      seen = window.localStorage.getItem(KEY)
    } catch (e) {}
    if (!seen) {
      const id = window.setTimeout(() => setShow(true), 1200)
      return () => window.clearTimeout(id)
    }
  }, [])

  const close = () => {
    setShow(false)
    try {
      window.localStorage.setItem(KEY, "1")
    } catch (e) {}
  }

  if (!show) return null
  return (
    <div className="toast" role="status">
      <div className="toast-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3-3 3 3 0 0 1-3-3 3 3 0 0 1-3-3Z" />
          <path d="m4 4 16 16" />
        </svg>
      </div>
      <div>
        <b>{s.cookies.title}</b>
        <p>{s.cookies.text}</p>
      </div>
      <button type="button" className="btn ghost" onClick={close}>
        {s.cookies.ok}
      </button>
    </div>
  )
}

export default CookieToast
