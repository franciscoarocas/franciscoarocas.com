import * as React from "react"
import { Link } from "gatsby"
import type { HeadFC } from "gatsby"

import Seo from "../components/seo"
import { useLang } from "../components/useLang"
import LangSwitch from "../components/site/LangSwitch"
import { certificates, degrees, EMAIL, jobs, LINKS, NAME, stack, yearsOfExperience } from "../data/profile"
import { t } from "../data/strings"

// CV en texto: para reclutadores con prisa, para imprimir y para buscadores.
const CvPage: React.FC = () => {
  const [lang, setLang] = useLang()
  const s = t(lang)
  return (
    <main className="page wrap">
      <nav className="topbar">
        <Link to="/">{s.cv.back}</Link>
        <LangSwitch lang={lang} setLang={setLang} label={s.nav.lang} />
      </nav>
      <article className="sheet">
        <h1>{NAME}</h1>
        <p className="muted">
          {lang === "es" ? "Ingeniero backend · datos e IA" : "Backend engineer · data and AI"} · Tacoronte, Tenerife · {s.cv.years(yearsOfExperience())}
        </p>
        <p className="muted">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={LINKS.linkedin}>LinkedIn</a> · <a href={LINKS.github}>GitHub</a> · <a href={LINKS.medium}>Medium</a>
        </p>

        <h2>{s.cv.education}</h2>
        {degrees.map(d => (
          <div key={d.title.es} className="job">
            <h3>{d.title[lang]}</h3>
            <p className="muted">{d.detail[lang]}</p>
          </div>
        ))}

        <h2>{s.cv.experience}</h2>
        {jobs.map(j => (
          <section key={j.id} className="job">
            <h3>
              {j.role[lang]} · {j.org[lang]}
            </h3>
            <p className="muted">
              {j.sector[lang]} · {j.period[lang]}
            </p>
            <ul>
              {j.bullets.map(b => (
                <li key={b.es}>{b[lang]}</li>
              ))}
            </ul>
          </section>
        ))}

        <h2>{s.cv.certificates}</h2>
        <p className="muted">{certificates.join(" · ")}</p>

        <h2>{s.cv.stack}</h2>
        <p className="muted">{stack.join(" · ")}</p>
      </article>
    </main>
  )
}

export const Head: HeadFC = () => <Seo title="CV" />

export default CvPage
