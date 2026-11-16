import * as React from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"
import PixelIcon from "../components/os/PixelIcon"
import { useLang } from "../components/os/useLang"
import { t } from "../data/strings"

const NotFoundPage = () => {
  const [lang] = useLang()
  const s = t(lang).notFound
  return (
    <main className="nf-page">
      <section className="win active nf-dialog" role="alertdialog" aria-labelledby="nf-title" aria-describedby="nf-msg">
        <div className="titlebar">
          <span className="t" id="nf-title">
            {s.title} 404
          </span>
          <span className="stripes" />
        </div>
        <div className="nf-body">
          <PixelIcon name="warn" className="nf-icon" />
          <p id="nf-msg">{s.msg}</p>
        </div>
        <div className="nf-actions">
          <Link className="btn" to="/">
            {s.ok}
          </Link>
        </div>
      </section>
    </main>
  )
}

export const Head = () => <Seo title="404" />

export default NotFoundPage
