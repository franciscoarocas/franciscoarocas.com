import * as React from "react"
import type { LogoKey } from "../../data/profile"

import cabildo from "../../images/logos/cabildo.png"
import ull from "../../images/logos/ull.png"
import fredolsen from "../../images/logos/fredolsen.png"
import f360 from "../../images/logos/f360.png"
import gtc from "../../images/logos/gtc.png"

// Logos oficiales convertidos en máscaras monocromas: se pintan con el color de tinta de la web.
// Ancho a 96 px de alto, para mantener la proporción.
const LOGOS: Record<LogoKey, { src: string; w: number; name: string }> = {
  cabildo: { src: cabildo, w: 75, name: "Cabildo de Tenerife" },
  ull: { src: ull, w: 392, name: "Universidad de La Laguna" },
  fredolsen: { src: fredolsen, w: 207, name: "Fred. Olsen Express" },
  f360: { src: f360, w: 336, name: "360 Fund Insight" },
  gtc: { src: gtc, w: 96, name: "GRANTECAN" },
}

const Logo: React.FC<{ id: LogoKey; height: number; decorative?: boolean }> = ({ id, height, decorative }) => {
  const l = LOGOS[id]
  const style = { "--src": `url(${l.src})`, width: Math.round((l.w * height) / 96), height } as React.CSSProperties
  return decorative ? <i className="logo" aria-hidden="true" style={style} /> : <i className="logo" role="img" aria-label={l.name} style={style} />
}

export default Logo
