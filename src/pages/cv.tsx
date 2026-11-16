import * as React from "react"
import { Link } from "gatsby"
import type { HeadFC } from "gatsby"

import Seo from "../components/seo"
import { CvContent } from "../components/os/apps"
import { useLang } from "../components/os/useLang"
import { t } from "../data/strings"

// Versión en texto plano del CV: para reclutadores con prisa y para buscadores.
const CvPage: React.FC = () => {
  const [lang, setLang] = useLang()
  const s = t(lang)
  return (
    <main className="cv-page">
      <nav className="cv-nav">
        <Link to="/">{s.cv.back}</Link>
        <button type="button" className="btn" onClick={() => setLang(lang === "es" ? "en" : "es")}>
          {lang === "es" ? "English" : "Español"}
        </button>
      </nav>
      <article className="doc">
        <CvContent lang={lang} s={s} />
      </article>
    </main>
  )
}

export const Head: HeadFC = () => <Seo title="CV" />

export default CvPage
