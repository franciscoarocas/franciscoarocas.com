import * as React from "react"

// Rejilla de puntos del fondo de la portada: ondula despacio y se aparta del ratón.
const GAP = 28

const DotField: React.FC = () => {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const hero = cv.parentElement as HTMLElement
    const ctx = cv.getContext("2d")!
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const root = document.documentElement
    let pts: { x: number; y: number }[] = []
    let W = 0
    let H = 0
    let mx = -999
    let my = -999
    let visible = true
    let raf = 0

    const css = (n: string) => getComputedStyle(root).getPropertyValue(n).trim()
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = hero.clientWidth
      H = hero.clientHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      pts = []
      for (let y = GAP / 2; y < H; y += GAP) for (let x = GAP / 2; x < W; x += GAP) pts.push({ x, y })
    }
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      const dot = css("--dot")
      const acc = css("--accent")
      for (const p of pts) {
        const dx = p.x - mx
        const dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        let ox = 0
        let oy = reduced ? 0 : Math.sin(t / 1400 + p.x / 90 + p.y / 140) * 1.6
        let r = 1.2
        let near = 0
        if (d < 140) {
          near = 1 - d / 140
          const push = near * near * 14
          ox = (dx / (d || 1)) * push
          oy += (dy / (d || 1)) * push
          r = 1.2 + near * 1.6
        }
        ctx.fillStyle = near > 0.15 ? acc : dot
        ctx.globalAlpha = near > 0.15 ? 0.35 + near * 0.6 : 1
        ctx.beginPath()
        ctx.arc(p.x + ox, p.y + oy, r, 0, 6.283)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    const loop = (t: number) => {
      if (visible) draw(t)
      raf = requestAnimationFrame(loop)
    }
    const onResize = () => {
      size()
      draw(performance.now())
    }
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
      if (reduced) draw(0)
    }
    const onLeave = () => {
      mx = my = -999
      if (reduced) draw(0)
    }

    size()
    draw(0)
    window.addEventListener("resize", onResize)
    hero.addEventListener("pointermove", onMove)
    hero.addEventListener("pointerleave", onLeave)
    const io = new IntersectionObserver(es => (visible = es[0].isIntersecting))
    io.observe(hero)
    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("resize", onResize)
      hero.removeEventListener("pointermove", onMove)
      hero.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return <canvas ref={ref} className="dotfield" aria-hidden="true" />
}

export default DotField
