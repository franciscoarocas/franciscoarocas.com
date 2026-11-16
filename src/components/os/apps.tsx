import * as React from "react"
import { Link } from "gatsby"
import PixelIcon from "./PixelIcon"
import { COORDS, EMAIL, jobs, LINKS, MAX_SKILL, NAME, skills, yearsOfExperience } from "../../data/profile"
import type { Lang } from "../../data/profile"
import type { Strings } from "../../data/strings"

export interface AppCtx {
  lang: Lang
  s: Strings
  arg?: string
  openApp: (id: string, arg?: string) => void
  closeApp: (id: string) => void
  setLang: (l: Lang) => void
}

/* ---------- Idioma ---------- */
const FlagES: React.FC = () => (
  <svg viewBox="0 0 30 20" className="flag" aria-hidden="true" shapeRendering="crispEdges">
    <rect width="30" height="20" fill="#AA151B" />
    <rect y="5" width="30" height="10" fill="#F1BF00" />
  </svg>
)

const FlagGB: React.FC = () => (
  <svg viewBox="0 0 60 30" className="flag" aria-hidden="true">
    <clipPath id="gb-clip">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <g clipPath="url(#gb-clip)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
)

export const LangApp: React.FC<AppCtx> = ({ lang, setLang, closeApp }) => {
  const pick = (l: Lang) => {
    setLang(l)
    closeApp("lang")
  }
  return (
    <div className="lang-pick">
      <p>
        Elige tu idioma
        <br />
        <span className="dim">Choose your language</span>
      </p>
      <div className="lang-options">
        <button type="button" className={`lang-opt${lang === "es" ? " on" : ""}`} aria-pressed={lang === "es"} onClick={() => pick("es")}>
          <FlagES />
          <span>Español</span>
        </button>
        <button type="button" className={`lang-opt${lang === "en" ? " on" : ""}`} aria-pressed={lang === "en"} onClick={() => pick("en")}>
          <FlagGB />
          <span>English</span>
        </button>
      </div>
    </div>
  )
}

/* ---------- LEEME ---------- */
export const ReadmeApp: React.FC<AppCtx> = ({ s }) => (
  <div className="doc">
    <h1>{s.readme.title}</h1>
    <p className="dim">{s.readme.intro}</p>
    <h2>{s.readme.howTitle}</h2>
    <ul>
      {s.readme.how.map(x => (
        <li key={x}>{x}</li>
      ))}
    </ul>
    <h2>{s.readme.tryTitle}</h2>
    <ul>
      {s.readme.try.map(x => (
        <li key={x}>{x}</li>
      ))}
    </ul>
    <h2>{s.readme.hurryTitle}</h2>
    <p>
      {s.readme.hurry} <Link to="/cv/">franciscoarocas.com/cv</Link>
    </p>
  </div>
)

/* ---------- Sobre mí ---------- */
export const AboutApp: React.FC<AppCtx> = ({ lang, s, openApp }) => {
  const y = yearsOfExperience()
  const open = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    openApp(id)
  }
  return (
    <div className="doc">
      <h1>{NAME}</h1>
      <p className="dim">
        {jobs[0].role[lang]} · Tacoronte, Tenerife
      </p>
      <p>{s.about.p1(y)}</p>
      <p>{s.about.p2}</p>
      <p>{s.about.p3}</p>
      <p className="dim">
        → {s.about.see}{" "}
        <a href="#exp" onClick={open("exp")}>
          {s.apps.exp}
        </a>{" "}
        {s.about.or}{" "}
        <a href="#mail" onClick={open("mail")}>
          {s.apps.mail}
        </a>
        .
      </p>
    </div>
  )
}

/* ---------- Experiencia ---------- */
export const ExperienceApp: React.FC<AppCtx> = ({ lang, s, arg }) => {
  const [sel, setSel] = React.useState(arg || jobs[0].id)
  React.useEffect(() => {
    if (arg) setSel(arg)
  }, [arg])
  const j = jobs.find(x => x.id === sel) || jobs[0]
  return (
    <div className="explorer-wrap">
      <div className="addr">
        <span>{s.address}</span>
        <div className="field sunken">~/francisco/{lang === "es" ? "experiencia" : "experience"}</div>
      </div>
      <div className="explorer">
        <div className="files" role="listbox" aria-label={s.roles}>
          {jobs.map(job => (
            <button key={job.id} type="button" role="option" aria-selected={job.id === j.id} className={`file${job.id === j.id ? " sel" : ""}`} onClick={() => setSel(job.id)}>
              <PixelIcon name="doc" />
              <span>
                {job.file}
                <small>{job.period[lang]}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="detail" aria-live="polite">
          <div className="period">{j.period[lang]}</div>
          <h3>
            {j.role[lang]}
            {j.current && <span className="now">{s.current}</span>}
          </h3>
          <div className="org">{j.org[lang]}</div>
          <p>{j.summary[lang]}</p>
          <ul>
            {j.bullets.map(b => (
              <li key={b.es}>{b[lang]}</li>
            ))}
          </ul>
          <div className="chips">
            {j.stack.map(t => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Habilidades ---------- */
export const SkillsApp: React.FC<AppCtx> = ({ lang }) => (
  <div className="skills">
    {skills.map(sk => (
      <div key={sk.name} className="slot">
        <span className="k">{sk.area[lang]}</span>
        <b>{sk.name}</b>
        <div className="bar" role="img" aria-label={`${sk.count} / ${MAX_SKILL}`}>
          {Array.from({ length: MAX_SKILL }, (_, i) => (
            <i key={i} className={i < sk.count ? "f" : ""} />
          ))}
        </div>
      </div>
    ))}
  </div>
)

/* ---------- Contacto ---------- */
export const ContactApp: React.FC<AppCtx> = ({ s }) => {
  const [subject, setSubject] = React.useState(s.mail.subjectDefault)
  const [body, setBody] = React.useState(s.mail.bodyDefault)
  const [note, setNote] = React.useState("")
  const toRef = React.useRef<HTMLInputElement>(null)
  const su = encodeURIComponent(subject)
  const bo = encodeURIComponent(body)
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${su}&body=${bo}`
  const mailto = `mailto:${EMAIL}?subject=${su}&body=${bo}`

  const copy = () => {
    const fallback = () => {
      toRef.current?.focus()
      toRef.current?.select()
      setNote(s.mail.selected)
    }
    try {
      navigator.clipboard.writeText(EMAIL).then(() => setNote(s.mail.copied), fallback)
    } catch (e) {
      fallback()
    }
  }

  return (
    <div className="mail">
      <div className="mrow">
        <label htmlFor="m-to">{s.mail.to}</label>
        <input ref={toRef} className="sunken" id="m-to" value={EMAIL} readOnly />
      </div>
      <div className="mrow">
        <label htmlFor="m-sub">{s.mail.subject}</label>
        <input className="sunken" id="m-sub" value={subject} onChange={e => setSubject(e.target.value)} />
      </div>
      <textarea className="sunken" id="m-body" aria-label={s.mail.message} value={body} onChange={e => setBody(e.target.value)} />
      <div className="mbtns">
        <a className="btn primary" href={gmail} target="_blank" rel="noopener noreferrer">
          {s.mail.send}
        </a>
        <button className="btn" type="button" onClick={copy}>
          {s.mail.copy}
        </button>
        <span className="note" aria-live="polite">
          {note}
        </span>
      </div>
      <p className="note">
        {s.mail.help} <a href={mailto}>{s.mail.other}</a>.
      </p>
      <div className="mbtns">
        <a className="btn" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <a className="btn" href={LINKS.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </div>
    </div>
  )
}

/* ---------- CV en texto (ventana y página /cv) ---------- */
export const CvContent: React.FC<{ lang: Lang; s: Strings }> = ({ lang, s }) => (
  <>
    <h1>{NAME}</h1>
    <p className="dim">
      {jobs[0].role[lang]} · Tacoronte, Tenerife · {s.cv.years(yearsOfExperience())}
    </p>
    <p className="dim">
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={LINKS.linkedin}>LinkedIn</a> · <a href={LINKS.github}>GitHub</a> · <a href={LINKS.blog}>Blog</a>
    </p>
    <h2>{s.cv.experience}</h2>
    {jobs.map(j => (
      <section key={j.id} className="cv-job">
        <h3>
          {j.role[lang]} · {j.org[lang]}
        </h3>
        <p className="dim">{j.period[lang]}</p>
        <p>{j.summary[lang]}</p>
        <ul>
          {j.bullets.map(b => (
            <li key={b.es}>{b[lang]}</li>
          ))}
        </ul>
      </section>
    ))}
    <h2>{s.cv.skills}</h2>
    <p>{skills.map(sk => sk.name).join(" · ")}</p>
  </>
)

export const CvApp: React.FC<AppCtx> = ({ lang, s }) => (
  <div className="doc">
    <CvContent lang={lang} s={s} />
  </div>
)

/* ---------- Terminal ---------- */
type Line = { k: number; node: React.ReactNode }

function pad(str: string, n: number) {
  return (str + " ".repeat(n)).slice(0, n)
}

export const TerminalApp: React.FC<AppCtx> = ({ lang, s, openApp, closeApp, setLang }) => {
  const counter = React.useRef(0)
  const mk = (node: React.ReactNode): Line => ({ k: counter.current++, node })
  const welcome = () => {
    const [a, b] = s.term.welcome.split("<hl>help</hl>")
    return mk(
      <>
        {a}
        <span className="hl">help</span>
        {b}
        {"\n\n"}
      </>
    )
  }
  const [lines, setLines] = React.useState<Line[]>(() => [welcome()])
  const [value, setValue] = React.useState("")
  const hist = React.useRef<string[]>([])
  const hi = React.useRef(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 30)
    return () => window.clearTimeout(id)
  }, [])
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" })
  }, [lines])

  const run = (raw: string) => {
    const v = raw.trim()
    const prompt = mk(
      <>
        <span className="ps">francisco@tacoronte:~$</span> {v}
        {"\n"}
      </>
    )
    if (!v) {
      setLines(l => [...l, prompt])
      return
    }
    const parts = v.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const a = parts.slice(1).join(" ").toLowerCase()
    const y = yearsOfExperience()
    let out: React.ReactNode = null

    switch (cmd) {
      case "help":
        out = (
          <>
            {s.term.commands}
            {"\n"}
            {s.term.help.map(([c, d]) => (
              <React.Fragment key={c}>
                {"  "}
                <span className="hl">{pad(c, 14)}</span>
                {d}
                {"\n"}
              </React.Fragment>
            ))}
          </>
        )
        break
      case "whoami":
        out = s.term.whoami(jobs[0].role[lang] + (lang === "es" ? " en " : " at ") + "360 Fund Insight", y) + "\n"
        break
      case "experiencia":
      case "experience":
        out = jobs.map(j => "  " + pad(j.period[lang], 22) + j.role[lang] + " · " + j.org[lang].split(" · ")[0]).join("\n") + "\n"
        break
      case "habilidades":
      case "skills":
      case "stack":
        out = skills.map(sk => "  " + pad(sk.name, 20) + "■".repeat(sk.count) + "□".repeat(MAX_SKILL - sk.count)).join("\n") + "\n"
        break
      case "contacto":
      case "contact":
        out = `  email    ${EMAIL}\n  linkedin linkedin.com/in/francisco-arocas\n  github   github.com/franciscoarocas\n`
        break
      case "neofetch": {
        const art = ["        /\\        ", "       /**\\       ", "      /    \\      ", "     /  /\\  \\     ", "    /  /  \\  \\    ", "  ~~~~~~~~~~~~~~  ", "   ~~~~~~~~~~~~   "]
        const info: React.ReactNode[] = [
          <>
            <span className="ps">francisco</span>@<span className="ps">tacoronte</span>
          </>,
          "------------------",
          "OS: ArocasOS 5.0",
          `${s.term.location}: Tacoronte ${COORDS[lang]}`,
          s.term.uptime(y),
          `${s.term.role}: ${jobs[0].role[lang]}`,
          "Shell: Python 3",
        ]
        out = art.map((l, i) => (
          <React.Fragment key={i}>
            <span className={i < 5 ? "hl" : "ps"}>{l}</span>
            {"  "}
            {info[i]}
            {"\n"}
          </React.Fragment>
        ))
        break
      }
      case "date":
        out = "  " + new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", { dateStyle: "full", timeStyle: "short" }).format(new Date()) + ` (${s.term.yourClock})\n`
        break
      case "ls":
        out = `  ${s.apps.readme}  ${s.apps.about}  ${lang === "es" ? "experiencia/" : "experience/"}  ${s.apps.skills}  cv.txt\n`
        break
      case "sudo":
        out = <span className="err">{s.term.sudo + "\n"}</span>
        break
      case "lang":
        if (a === "es" || a === "en") {
          setLang(a)
          out = `  lang = ${a}\n`
        } else out = <span className="err">lang es | lang en{"\n"}</span>
        break
      case "open": {
        const map: Record<string, string> = { exp: "exp", experiencia: "exp", experience: "exp", habilidades: "skills", skills: "skills", mail: "mail", contacto: "mail", contact: "mail", cv: "cv", leeme: "readme", readme: "readme", about: "about", lang: "lang", idioma: "lang", language: "lang" }
        if (map[a]) {
          openApp(map[a])
          out = "  " + s.term.opening(a) + "\n"
        } else out = <span className="err">{s.term.openUnknown(a) + "\n"}</span>
        break
      }
      case "exit":
        window.setTimeout(() => closeApp("term"), 150)
        out = "  " + s.term.bye + "\n"
        break
      case "clear":
        setLines([])
        return
      default:
        out = <span className="err">{s.term.notFound(cmd) + "\n"}</span>
    }
    setLines(l => [...l, prompt, mk(out), mk("\n")])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = value
      setValue("")
      if (v.trim()) {
        hist.current.push(v)
        hi.current = hist.current.length
      }
      run(v)
    } else if (e.key === "ArrowUp") {
      if (hi.current > 0) {
        hi.current--
        setValue(hist.current[hi.current])
      }
      e.preventDefault()
    } else if (e.key === "ArrowDown") {
      if (hi.current < hist.current.length) {
        hi.current++
        setValue(hist.current[hi.current] || "")
      }
      e.preventDefault()
    }
  }

  return (
    <div
      className="term"
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus()
      }}
    >
      <pre>
        {lines.map(l => (
          <React.Fragment key={l.k}>{l.node}</React.Fragment>
        ))}
      </pre>
      <div className="line" ref={endRef}>
        <span className="ps">francisco@tacoronte:~$</span>
        <input ref={inputRef} aria-label="Terminal" autoComplete="off" spellCheck={false} value={value} onChange={e => setValue(e.target.value)} onKeyDown={onKeyDown} />
      </div>
    </div>
  )
}
