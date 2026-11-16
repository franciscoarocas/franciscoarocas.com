import * as React from "react"
import { navigate } from "gatsby"

// Las páginas antiguas (/about, /timeline, /hardskills) llevan a su ventana en el escritorio.
const Redirect: React.FC<{ to: string }> = ({ to }) => {
  React.useEffect(() => {
    navigate(to, { replace: true })
  }, [to])
  return (
    <p style={{ padding: 24, fontFamily: "monospace" }}>
      <a href={to}>franciscoarocas.com{to}</a>
    </p>
  )
}

export const RedirectHead: React.FC<{ to: string }> = ({ to }) => (
  <>
    <meta httpEquiv="refresh" content={`0; url=${to}`} />
    <meta name="robots" content="noindex" />
    <link rel="canonical" href={`https://franciscoarocas.com${to.split("?")[0]}`} />
  </>
)

export default Redirect
