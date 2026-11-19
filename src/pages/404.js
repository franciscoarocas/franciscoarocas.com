import * as React from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"
import { useLang } from "../components/useLang"
import { t } from "../data/strings"

const NotFoundPage = () => {
  const [lang] = useLang()
  const s = t(lang).notFound
  return (
    <main className="nf">
      <span className="big" aria-hidden="true">
        404
      </span>
      <h1>{s.title}</h1>
      <p>{s.text}</p>
      <Link className="btn primary" to="/">
        {s.home} <span className="arr">→</span>
      </Link>
    </main>
  )
}

export const Head = () => <Seo title="404" />

export default NotFoundPage
