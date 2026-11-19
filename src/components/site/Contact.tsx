import * as React from "react"
import { EMAIL } from "../../data/profile"
import Social from "./Social"
import type { Strings } from "../../data/strings"

// Formulario de presupuesto sin servidor: monta el mensaje y lo abre en Gmail o en el programa de correo.
const Contact: React.FC<{ s: Strings }> = ({ s }) => {
  const c = s.contact
  const [name, setName] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [needs, setNeeds] = React.useState<string[]>([])
  const [when, setWhen] = React.useState(1)
  const [msg, setMsg] = React.useState("")
  const [error, setError] = React.useState(false)
  const [note, setNote] = React.useState("")
  const mailRef = React.useRef<HTMLSpanElement>(null)

  const subject = c.subject + (company ? " · " + company : "") + (needs.length ? " · " + needs[0] : "")
  const body = `${c.hello}\n\n${msg}\n\n— ${c.needLine}: ${needs.join(", ") || c.unspecified}\n— ${c.whenLine}: ${c.whens[when]}\n\n${name}${company ? "\n" + company : ""}`
  const enc = encodeURIComponent
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(EMAIL)}&su=${enc(subject)}&body=${enc(body)}`
  const mailto = `mailto:${EMAIL}?subject=${enc(subject)}&body=${enc(body)}`

  const toggle = (v: string) => setNeeds(n => (n.includes(v) ? n.filter(x => x !== v) : [...n, v]))
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = !!name.trim() && msg.trim().length > 10
    setError(!ok)
    if (ok) window.open(gmail, "_blank", "noopener")
  }
  const copy = () => {
    const fallback = () => {
      const r = document.createRange()
      if (mailRef.current) r.selectNodeContents(mailRef.current)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(r)
      setNote(c.selected)
    }
    try {
      navigator.clipboard.writeText(EMAIL).then(() => setNote(c.copied), fallback)
    } catch (err) {
      fallback()
    }
  }

  return (
    <section className="band" id="contacto" aria-labelledby="k-t">
      <div className="wrap contact">
        <div className="contact-side rv">
          <span className="label">{c.label}</span>
          <h2 id="k-t">{c.title}</h2>
          <p>{c.intro}</p>
          <div className="direct">
            <div className="row">
              <span className="mail" ref={mailRef}>
                {EMAIL}
              </span>
              <button className="btn ghost" type="button" onClick={copy}>
                {c.copy}
              </button>
            </div>
            <Social labeled className="contact-social" />
            <div className="row small">
              <span className="label" aria-live="polite">
                {note}
              </span>
            </div>
          </div>
        </div>

        <form className="brief rv" onSubmit={submit} noValidate>
          <div className="two">
            <div className="field">
              <label htmlFor="f-name">{c.name}</label>
              <input id="f-name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="f-company">{c.company}</label>
              <input id="f-company" autoComplete="organization" value={company} onChange={e => setCompany(e.target.value)} />
            </div>
          </div>
          <fieldset className="field">
            <legend>{c.need}</legend>
            <div className="chips">
              {c.needs.map((n, i) => (
                <label key={n}>
                  <input type="checkbox" id={`need-${i}`} checked={needs.includes(n)} onChange={() => toggle(n)} />
                  <span>{n}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="f-when">{c.when}</label>
            <select id="f-when" value={when} onChange={e => setWhen(Number(e.target.value))}>
              {c.whens.map((w, i) => (
                <option key={w} value={i}>
                  {w}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-msg">{c.message}</label>
            <textarea id="f-msg" placeholder={c.placeholder} value={msg} onChange={e => setMsg(e.target.value)} />
          </div>
          <div className="form-foot">
            <button className="btn primary mag" type="submit">
              {c.send} <span className="arr">↗</span>
            </button>
            <p>
              {c.help} <a href={mailto}>{c.other}</a>.
            </p>
          </div>
          {error && <p className="err">{c.error}</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact
