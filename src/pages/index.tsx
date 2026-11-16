import * as React from "react"
import type { HeadFC } from "gatsby"

import Desktop from "../components/os/Desktop"
import Seo from "../components/seo"

const Index: React.FC = () => <Desktop />

export const Head: HeadFC = () => (
  <Seo title="Backend Engineer">
    {/* Sin JavaScript no hay arranque: se oculta la pantalla negra */}
    <noscript dangerouslySetInnerHTML={{ __html: "<style>.overlay.boot{display:none}</style>" }} />
  </Seo>
)

export default Index
