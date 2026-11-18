import * as React from "react"
import type { Strings } from "../../data/strings"

// Diagrama de la portada: tus datos → Python + IA → resultados, con paquetes animados.
const WIRES = [
  "M118 55 C150 55 150 125 170 125",
  "M118 125 L170 125",
  "M118 195 C150 195 150 125 170 125",
  "M262 125 C280 125 280 55 300 55",
  "M262 125 L300 125",
  "M262 125 C280 125 280 195 300 195",
]
const TIMING = [
  ["2.6s", "0s"],
  ["2.6s", "0.9s"],
  ["2.6s", "1.7s"],
  ["2.2s", "0.4s"],
  ["2.2s", "1.2s"],
  ["2.2s", "2s"],
]

const FlowDiagram: React.FC<{ s: Strings }> = ({ s }) => {
  const f = s.flow
  const ref = React.useRef<HTMLElement>(null)
  const svgRef = React.useRef<SVGSVGElement>(null)
  const [hit, setHit] = React.useState(0)
  const [rows, setRows] = React.useState(128400)

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      svgRef.current?.pauseAnimations?.()
      return
    }
    const id = window.setInterval(() => {
      setHit(h => h + 1)
      setRows(r => r + 120 + Math.floor(Math.random() * 480))
    }, 900)
    // inclinación 3D según el ratón
    const el = ref.current
    const fine = window.matchMedia("(pointer: fine)").matches
    const onMove = (e: PointerEvent) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
    }
    const onLeave = () => {
      if (el) el.style.transform = ""
    }
    if (fine && el) {
      el.addEventListener("pointermove", onMove)
      el.addEventListener("pointerleave", onLeave)
    }
    return () => {
      window.clearInterval(id)
      el?.removeEventListener("pointermove", onMove)
      el?.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  const lit = (i: number) => i === hit % 6 || i === (hit + 3) % 6
  const node = (i: number, x: number, y: number, label: string) => (
    <React.Fragment key={i}>
      <rect className={`node${lit(i) ? " hit" : ""}`} x={x} y={y} width={x < 200 ? 108 : 110} height={38} rx={8} />
      <text x={x + 12} y={y + 23}>
        {label}
      </text>
    </React.Fragment>
  )

  return (
    <figure className="flow" ref={ref} aria-labelledby="flow-t">
      <div className="flow-head">
        <h2 id="flow-t">{f.title}</h2>
        <span className="live">
          <i aria-hidden="true" />
          {f.live}
        </span>
      </div>
      <svg ref={svgRef} viewBox="0 0 420 250" role="img" aria-label={f.aria}>
        <text className="cap" x="10" y="16">
          {f.caps[0]}
        </text>
        <text className="cap" x="172" y="16">
          {f.caps[1]}
        </text>
        <text className="cap" x="300" y="16">
          {f.caps[2]}
        </text>
        {WIRES.map((d, i) => (
          <path key={i} id={`w${i + 1}`} className="wire flowing" d={d} />
        ))}
        {f.inputs.map((label, i) => node(i, 10, 36 + i * 70, label))}
        <rect className="ring" x="170" y="96" width="92" height="58" rx="10" />
        <rect className="ring r2" x="170" y="96" width="92" height="58" rx="10" />
        <rect className="core" x="170" y="96" width="92" height="58" rx="10" />
        <text className="core-t" x="176" y="121">
          {f.core[0]}
        </text>
        <text className="core-t" x="176" y="138">
          {f.core[1]}
        </text>
        {f.outputs.map((label, i) => node(i + 3, 300, 36 + i * 70, label))}
        {TIMING.map(([dur, begin], i) => (
          <circle key={i} className="dot" r="3.5">
            <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
              <mpath href={`#w${i + 1}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
      <figcaption className="flow-foot">
        <span>{f.foot}</span>
        <span>
          {f.rows} <b>{rows.toLocaleString("es-ES")}</b>
        </span>
      </figcaption>
    </figure>
  )
}

export default FlowDiagram
