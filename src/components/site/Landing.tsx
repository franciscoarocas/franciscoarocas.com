import * as React from "react"
import { Link } from "gatsby"
import DotField from "./DotField"
import FlowDiagram from "./FlowDiagram"
import Logo from "./Logo"
import Contact from "./Contact"
import CookieToast from "./CookieToast"
import LangSwitch from "./LangSwitch"
import { useLang } from "../useLang"
import { certificates, degrees, jobs, stack, yearsOfExperience } from "../../data/profile"
import type { LogoKey } from "../../data/profile"
import { t } from "../../data/strings"

const ICONS: Record<string, React.ReactNode> = {
  ai: (
    <>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </>
  ),
  api: <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />,
  data: (
    <>
      <path d="M4 6h10M4 12h16M4 18h7" />
      <circle cx="17" cy="6" r="2" />
      <circle cx="14" cy="18" r="2" />
    </>
  ),
  dash: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 14v-3M11 14V9M15 14v-5M8 21h8" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7Z" />
      <path d="m10 14 2-2 2 2M12 12v6" />
    </>
  ),
}

// Logos de la cinta: alto de cada uno para que se vean con el mismo peso visual
const MARQUEE: { id: LogoKey; h: number; word?: string }[] = [
  { id: "gtc", h: 44, word: "GRANTECAN" },
  { id: "cabildo", h: 46 },
  { id: "ull", h: 34 },
  { id: "fredolsen", h: 40 },
  { id: "f360", h: 30 },
]
const CASE_LOGO_H: Record<LogoKey, number> = { f360: 26, gtc: 46, fredolsen: 34, ull: 30, cabildo: 44 }

/* ---------- efectos de la página (solo en el navegador) ---------- */
function usePageEffects() {
  React.useEffect(() => {
    const root = document.documentElement
    root.classList.add("js")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches
    const cleanups: (() => void)[] = []

    // cabecera compacta al hacer scroll
    const header = document.querySelector("header.top")
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    cleanups.push(() => window.removeEventListener("scroll", onScroll))

    // cifras que se cuentan
    const countUp = (el: Element) => {
      const end = parseInt(el.getAttribute("data-count") || "0", 10)
      if (reduced || !end) return
      let t0 = 0
      let done = false
      const step = (now: number) => {
        if (done) return
        if (!t0) t0 = now
        const k = Math.min(1, (now - t0) / 1100)
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))))
        if (k < 1) requestAnimationFrame(step)
        else done = true
      }
      requestAnimationFrame(step)
      window.setTimeout(() => {
        done = true
        el.textContent = String(end)
      }, 1300)
    }

    // aparición al hacer scroll
    const els = Array.from(document.querySelectorAll(".rv, .steps"))
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (!e.isIntersecting) return
          e.target.classList.add("in")
          e.target.querySelectorAll("[data-count]").forEach(countUp)
          io.unobserve(e.target)
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )
    els.forEach(el => io.observe(el))
    document.querySelectorAll(".proof [data-count]").forEach(countUp)
    cleanups.push(() => io.disconnect())

    // foco que sigue al ratón en los servicios
    document.querySelectorAll<HTMLElement>(".svc").forEach(card => {
      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect()
        card.style.setProperty("--mx", `${e.clientX - r.left}px`)
        card.style.setProperty("--my", `${e.clientY - r.top}px`)
      }
      card.addEventListener("pointermove", onMove)
      cleanups.push(() => card.removeEventListener("pointermove", onMove))
    })

    // botones magnéticos
    if (fine && !reduced)
      document.querySelectorAll<HTMLElement>(".mag").forEach(b => {
        const onMove = (e: PointerEvent) => {
          const r = b.getBoundingClientRect()
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`
        }
        const onLeave = () => (b.style.transform = "")
        b.addEventListener("pointermove", onMove)
        b.addEventListener("pointerleave", onLeave)
        cleanups.push(() => {
          b.removeEventListener("pointermove", onMove)
          b.removeEventListener("pointerleave", onLeave)
        })
      })

    return () => cleanups.forEach(f => f())
  }, [])
}

function useClock() {
  const [time, setTime] = React.useState("")
  React.useEffect(() => {
    const tick = () => {
      try {
        setTime(new Intl.DateTimeFormat("es-ES", { timeZone: "Atlantic/Canary", hour: "2-digit", minute: "2-digit" }).format(new Date()))
      } catch (e) {}
    }
    tick()
    const id = window.setInterval(tick, 20000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

function useRotator(count: number) {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setI(x => (x + 1) % count), 2800)
    return () => window.clearInterval(id)
  }, [count])
  return i
}

const Landing: React.FC = () => {
  const [lang, setLang] = useLang()
  const s = t(lang)
  const years = yearsOfExperience()
  const time = useClock()
  const word = useRotator(s.hero.rotating.length)
  usePageEffects()

  return (
    <>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#inicio">
            <span className="mono-mark" aria-hidden="true">
              FA
            </span>
            <b>Francisco Arocas</b>
          </a>
          <span className="clock" aria-label={s.nav.clock}>
            <i aria-hidden="true" />
            Tacoronte{time && ` · ${time}`}
          </span>
          <nav className="main" aria-label="Secciones">
            <a className="lnk" href="#servicios">
              {s.nav.services}
            </a>
            <a className="lnk" href="#proyectos">
              {s.nav.projects}
            </a>
            <a className="lnk hide-sm" href="#proceso">
              {s.nav.process}
            </a>
            <LangSwitch lang={lang} setLang={setLang} label={s.nav.lang} />
            <a className="btn primary mag" href="#contacto">
              {s.nav.quote} <span className="arr">→</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <DotField />
          <div className="glow" aria-hidden="true" />
          <div className="wrap">
            <div className="hero-copy">
              <span className="avail">
                <i aria-hidden="true" />
                {s.hero.available}
              </span>
              <h1>
                {s.hero.lead}
                <br />
                <span className="rot" aria-hidden="true">
                  {s.hero.rotating.map((w, i) => (
                    <span key={w} className={i === word ? "on" : i === (word + s.hero.rotating.length - 1) % s.hero.rotating.length ? "out" : ""}>
                      {w}
                    </span>
                  ))}
                </span>
                <span className="sr-only">{s.hero.rotating[0]}</span>
              </h1>
              <p className="sub">
                {s.hero.sub[0]}
                <strong>{s.hero.sub[1]}</strong>
                {s.hero.sub[2]}
              </p>
              <div className="ctas">
                <a className="btn primary mag" href="#contacto">
                  {s.hero.cta} <span className="arr">→</span>
                </a>
                <a className="btn ghost mag" href="#proyectos">
                  {s.hero.projects}
                </a>
              </div>
              <div className="proof">
                <div>
                  <b data-count={years}>{years}</b>
                  <span>{s.hero.proof[0][0]}</span>
                </div>
                {s.hero.proof.slice(1).map(([big, small]) => (
                  <div key={big}>
                    <b>{big}</b>
                    <span>{small}</span>
                  </div>
                ))}
              </div>
            </div>
            <FlowDiagram s={s} />
          </div>
        </section>

        <div className="marquee" aria-label={s.marquee}>
          <div className="row">
            <span className="label">{s.marquee}</span>
            <div className="mask">
              <div className="track">
                {[false, true].map(copy => (
                  <React.Fragment key={String(copy)}>
                    {MARQUEE.map(m => (
                      <span key={m.id + copy} className="item" aria-hidden={copy || undefined}>
                        {m.word ? (
                          <span className="combo">
                            <Logo id={m.id} height={m.h} decorative />
                            <span className="word">{m.word}</span>
                          </span>
                        ) : (
                          <Logo id={m.id} height={m.h} decorative={copy} />
                        )}
                      </span>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="band" id="servicios" aria-labelledby="s-t">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="label">{s.services.label}</span>
              <h2 id="s-t">{s.services.title}</h2>
              <p>{s.services.intro}</p>
            </div>
            <div className="services">
              {s.services.items.map(it => (
                <article key={it.title} className={`svc rv${it.featured ? " featured" : ""}`}>
                  {it.badge && <span className="badge">{it.badge}</span>}
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[it.icon]}
                    </svg>
                  </div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                  <ul>
                    {it.bullets.map(b => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {it.tags.map(tg => (
                      <span key={tg} className="tag">
                        {tg}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band alt" id="proyectos" aria-labelledby="p-t">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="label">{s.projects.label}</span>
              <h2 id="p-t">{s.projects.title}</h2>
              <p>{s.projects.intro}</p>
            </div>
            <div className="cases">
              {jobs.map(j => (
                <article key={j.id} className="case rv">
                  <div className="meta">
                    <Logo id={j.logo} height={CASE_LOGO_H[j.logo]} />
                    <b>{j.org[lang]}</b>
                    <span>
                      {j.sector[lang]} · {j.period[lang]}
                    </span>
                  </div>
                  <div>
                    <h3>{j.title[lang]}</h3>
                    <p>{j.text[lang]}</p>
                    <div className="tags">
                      {j.tags.map(tg => (
                        <span key={tg} className="tag">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="result">
                    <strong>{j.result[lang]}</strong>
                    <span>{j.resultNote[lang]}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="proceso" aria-labelledby="c-t">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="label">{s.process.label}</span>
              <h2 id="c-t">{s.process.title}</h2>
              <p>{s.process.intro}</p>
            </div>
            <ol className="steps">
              {s.process.steps.map(([title, text]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="band alt" id="sobre-mi" aria-labelledby="a-t">
          <div className="wrap about">
            <div className="about-copy rv">
              <span className="label">{s.about.label}</span>
              <h2 id="a-t">{s.about.title}</h2>
              <p>{s.about.p1}</p>
              <p className="muted">{s.about.p2}</p>
              <div className="degrees">
                {degrees.map(d => (
                  <div key={d.title.es} className="degree">
                    <span className="k">{d.kind[lang]}</span>
                    <b>{d.title[lang]}</b>
                    <span>{d.detail[lang]}</span>
                  </div>
                ))}
              </div>
              <Link className="cv-link" to="/cv/">
                {s.about.cv}
              </Link>
            </div>
            <div className="facts rv">
              <div className="fact">
                <span>{s.about.facts.experience}</span>
                <div>{s.about.facts.experienceValue(years)}</div>
              </div>
              <div className="fact">
                <span>{s.about.facts.certificates}</span>
                <div>
                  {certificates[0]}
                  <br />
                  {certificates.slice(1).join(" · ")}
                </div>
              </div>
              <div className="fact">
                <span>{s.about.facts.location}</span>
                <div>{s.about.facts.locationValue}</div>
              </div>
              <div className="fact">
                <span>{s.about.facts.languages}</span>
                <div>{s.about.facts.languagesValue}</div>
              </div>
              <div className="fact">
                <span>{s.about.facts.stack}</span>
                <div>{stack.join(", ")}</div>
              </div>
            </div>
          </div>
        </section>

        <Contact s={s} />
      </main>

      <footer className="end">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Francisco Arocas · Tacoronte, Tenerife</span>
          <span>
            {s.footer.noCookies} · <Link to="/cv/">{s.footer.cv}</Link>
          </span>
        </div>
      </footer>

      <CookieToast s={s} />
    </>
  )
}

export default Landing
