// Fondo de escritorio: el Teide visto desde Tacoronte, dibujado en pixel art en un canvas.
// Mirando al suroeste: Teide y Pico Viejo al fondo, mar de nubes en la ladera, pinar,
// mar a la derecha y, en primer plano, viñedos, casas, la iglesia, palmeras y la TF-5.

const W = 384
const HZ = 96

type Palette = Record<string, string> & { sky: string[] }

const PAL: { day: any; night: any } = {
  day: { sky: ["#5FAEE6", "#76BAEB", "#8EC7EF", "#A9D5F3", "#C6E4F7"], tei: "#8A6A55", teiL: "#A27D63", tei2: "#6E5546", snow: "#F4F7FB", c1: "#FFFFFF", c2: "#EEF3F8", c3: "#D3DDE8", pine: "#2E5A36", pineL: "#3F7346", sea: "#2F7FC1", seaD: "#286FAD", spark: "#BFE3FA", grass: "#7DA24F", grassD: "#6A8F41", vine: "#4F7A2E", soil: "#8C6A43", road: "#4A4E57", wall: "#F2EEE6", roof: "#B8472E", stone: "#CFC6B4", win: "#5B6B7A", palm: "#3E7A3A", trunk: "#6B4E2E" },
  night: { sky: ["#03050D", "#060B1C", "#0A1229", "#0F1A37", "#162345"], tei: "#2B2A45", teiL: "#35345A", tei2: "#23223A", snow: "#AEB9D6", c1: "#8E9BBA", c2: "#76839F", c3: "#5D6884", pine: "#0F2119", pineL: "#162E23", sea: "#0D1C38", seaD: "#0A162D", spark: "#5C78A8", grass: "#1B2E20", grassD: "#16261B", vine: "#0F1D14", soil: "#2A2220", road: "#24272E", wall: "#3A4052", roof: "#4A2A26", stone: "#454A5A", win: "#FFD86B", palm: "#13291A", trunk: "#2B2119" },
}

function rng(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function peak(x: number, cx: number, top: number, hw: number, base: number) {
  const d = Math.abs(x - cx) / hw
  return d >= 1 ? base : top + (base - top) * Math.pow(d, 0.8)
}

// Geometría fija, calculada una sola vez
const R = rng(7)
const teide: number[] = []
const ridge: number[] = []
const fg: number[] = []
const road: number[] = []
for (let x = 0; x < W; x++) {
  const n = (R() < 0.3 ? 1 : 0) - (R() < 0.2 ? 1 : 0)
  teide[x] = Math.round(Math.min(peak(x, 172, 14, 125, 104), peak(x, 232, 42, 62, 104), peak(x, 136, 52, 34, 104)) + n)
  ridge[x] = Math.round(76 + x * 0.05 + 3 * Math.sin(x / 17) + 2 * Math.sin(x / 7) + (x > 270 ? (x - 270) * 0.32 : 0))
  fg[x] = Math.round(110 + 3 * Math.sin(x / 29) + 2 * Math.sin(x / 11) + (x > 310 ? (x - 310) * 0.25 : 0))
  road[x] = Math.round(131 + 4 * Math.sin(x / 55 + 0.8))
}
const ridgeLights = Array.from({ length: 46 }, () => {
  const lx = Math.floor(R() * W)
  return { x: lx, y: ridge[lx] + 2 + Math.floor(R() * 8), s: R() }
})
const sparks = Array.from({ length: 40 }, () => ({ x: 250 + Math.floor(R() * 134), y: HZ + 1 + Math.floor(R() * 30), ph: R() * 6.3 }))
const cirrus = Array.from({ length: 3 }, () => ({ x0: R() * W, y: 8 + Math.floor(R() * 30), sp: 1 + R() * 1.5, w: 14 + Math.floor(R() * 12) }))
const winSeed = Array.from({ length: 600 }, () => R())
const houses = [[146, 8, 6], [156, 6, 5], [164, 9, 7], [176, 7, 5], [215, 8, 6], [225, 10, 7], [237, 7, 5], [247, 9, 6], [258, 6, 5], [267, 8, 6], [278, 7, 5], [288, 9, 6]]
const cars = [
  { o: 0, sp: 9, lane: 0, c: "#D9534F" },
  { o: 170, sp: 7, lane: 0, c: "#F4F6F8" },
  { o: 60, sp: 11, lane: 2, c: "#2E86C1" },
  { o: 260, sp: 8, lane: 2, c: "#F4C430" },
]

export interface SceneHandle {
  redraw: () => void
  stop: () => void
}

export function startScene(cv: HTMLCanvasElement, isNight: () => boolean, reduced: boolean): SceneHandle {
  const ctx = cv.getContext("2d")!
  let HB = 150
  let OY = 0
  let stars: { x: number; y: number; ph: number; sp: number; b: boolean }[] = []
  let raf = 0
  let lastT = 10

  function size() {
    const cw = cv.clientWidth || window.innerWidth
    const ch = cv.clientHeight || window.innerHeight
    HB = Math.max(150, Math.round((W * ch) / cw))
    OY = HB - 150
    cv.width = W
    cv.height = HB
    const r2 = rng(11)
    const cnt = Math.round((70 * (OY + 70)) / 70)
    stars = Array.from({ length: cnt }, () => ({ x: Math.floor(r2() * W), y: Math.floor(r2() * (OY + 90)), ph: r2() * 6.3, sp: 0.6 + r2() * 2, b: r2() < 0.2 }))
  }
  function r(x: number, y: number, w: number, h: number, c: string) {
    ctx.fillStyle = c
    ctx.fillRect(x | 0, (y + OY) | 0, w | 0, h | 0)
  }
  function disc(cx: number, cy: number, rad: number, c: string) {
    for (let y = -rad; y <= rad; y++) for (let x = -rad; x <= rad; x++) if (x * x + y * y <= rad * rad + 1) r(cx + x, cy + y, 1, 1, c)
  }

  function draw(t: number) {
    const night = isNight()
    const P = night ? PAL.night : PAL.day
    const tt = reduced ? 0 : t
    let x: number, y: number, k: number

    // cielo en bandas con tramado
    const skyH = OY + HZ + 4
    const bh = Math.ceil(skyH / 5)
    for (let b = 0; b < 5; b++) {
      ctx.fillStyle = P.sky[b]
      ctx.fillRect(0, b * bh, W, bh)
      if (b < 4) {
        ctx.fillStyle = P.sky[b + 1]
        for (let dx = 0; dx < W; dx += 2) {
          ctx.fillRect(dx + ((b * bh + bh - 2) % 2), b * bh + bh - 2, 1, 1)
          ctx.fillRect(dx + ((b * bh + bh - 1) % 2), b * bh + bh - 1, 1, 1)
        }
      }
    }
    if (night) {
      for (const s of stars) {
        const v = Math.sin(t * s.sp + s.ph)
        if (reduced || v > -0.3) {
          ctx.fillStyle = v > 0.7 || s.b ? "#FFFFFF" : "#8C9AC8"
          ctx.fillRect(s.x, s.y, 1, 1)
        }
      }
      disc(62, 24, 6, "#F2F0DC")
      r(60, 22, 2, 2, "#D6D3B8")
      r(64, 26, 1, 1, "#D6D3B8")
    } else {
      for (y = -10; y <= 10; y++)
        for (x = -10; x <= 10; x++) {
          const d = x * x + y * y
          if (d <= 64) r(62 + x, 26 + y, 1, 1, "#FFD45C")
          else if (d <= 100 && (x + y) % 2 === 0) r(62 + x, 26 + y, 1, 1, "#FFE69A")
        }
      for (const c of cirrus) {
        const cx = ((c.x0 + tt * c.sp) % (W + 50)) - 30
        r(cx, c.y, c.w, 1, "#FFFFFF")
        r(cx + 3, c.y - 1, c.w - 8, 1, "#F1F7FC")
        r(cx + 5, c.y + 1, c.w - 6, 1, "#E2EEF8")
      }
    }

    // Teide y Pico Viejo, con nieve en la cumbre
    for (x = 40; x < 300; x++) {
      const top = teide[x]
      if (top >= 104) continue
      for (y = top; y < 104; y++) {
        let c = x < 172 ? P.tei : P.teiL
        if (x > 205 && y > teide[x] + 2 && x < 250) c = P.tei2
        if (y < 27 || (y < 36 && (x + y) % 3 === 0) || (y < 46 && (x * 5 + y) % 13 === 0)) c = P.snow
        r(x, y, 1, 1, c)
      }
    }

    // mar al norte, con destellos
    r(240, HZ, W - 240, 150 - HZ, P.sea)
    r(240, HZ + 14, W - 240, 150 - HZ - 14, P.seaD)
    for (const s of sparks) if (reduced || Math.sin(t * 1.7 + s.ph) > 0.4) r(s.x, s.y, 2, 1, P.spark)

    // mar de nubes, moviéndose despacio por la ladera
    for (x = 0; x < W; x++) {
      const ct = Math.round(66 + 3 * Math.sin(x / 11 + tt * 0.12) + 2 * Math.sin(x / 5 - tt * 0.25) + 1.5 * Math.sin(x / 2.7 + tt * 0.4) + (x > 290 ? (x - 290) * 0.18 : 0))
      const cb = 84
      if (ct >= cb) continue
      r(x, ct, 1, 1, P.c1)
      r(x, ct + 1, 1, Math.max(0, cb - ct - 4), P.c2)
      r(x, cb - 3, 1, 3, P.c3)
    }

    // pinar de la ladera norte con los pueblos
    for (x = 0; x < W; x++) {
      if (x % 3 === 0) r(x, ridge[x] - 1, 1, 1, P.pine)
      for (y = ridge[x]; y < 150; y++) r(x, y, 1, 1, (x * 7 + y * 3) % 11 === 0 ? P.pineL : P.pine)
    }
    for (const l of ridgeLights) {
      if (night) {
        if (reduced || l.s + 0.1 * Math.sin(t * 0.5 + l.s * 30) < 0.8) r(l.x, l.y, 1, 1, "#FFD86B")
      } else if (l.s < 0.5) r(l.x, l.y, 1, 1, "#E8E4DA")
    }

    // primer plano: Tacoronte, con viñedos
    for (x = 0; x < W; x++) {
      for (y = fg[x]; y < 150; y++) {
        let g = P.grass
        const dy = y - fg[x]
        if ((x < 140 || x > 300) && dy > 2 && y < road[x] - 2) {
          const m = dy % 3
          g = m === 0 ? ((x + y) % 2 === 0 ? P.vine : P.grassD) : m === 1 ? P.soil : P.grass
        } else if (y > road[x] + 2 && (x * 3 + y) % 9 === 0) g = P.grassD
        r(x, y, 1, 1, g)
      }
    }

    // casas blancas con tejas
    houses.forEach((h, hi) => {
      const [hx, hw, hh] = h
      const by = fg[hx + (hw >> 1)] + 2
      r(hx, by - hh, hw, hh, P.wall)
      r(hx - 1, by - hh - 2, hw + 2, 2, P.roof)
      r(hx + 1, by - hh - 3, hw - 2, 1, P.roof)
      for (let wx = hx + 1; wx < hx + hw - 1; wx += 3) {
        const s = winSeed[(wx * 7 + hi * 13) % 600]
        if (!night || s < 0.6) r(wx, by - hh + 2, 1, 2, P.win)
      }
    })

    // iglesia de Santa Catalina
    const cy = fg[199] + 2
    r(189, cy - 9, 18, 9, P.wall)
    r(188, cy - 11, 20, 2, P.roof)
    r(195, cy - 5, 3, 5, night ? "#FFD86B" : "#6B4E2E")
    r(200, cy - 24, 6, 24, P.stone)
    r(202, cy - 20, 2, 3, night ? "#FFD86B" : "#2B2A2A")
    r(199, cy - 25, 8, 1, P.stone)
    r(201, cy - 27, 4, 2, P.stone)
    r(202, cy - 30, 1, 3, P.stone)
    r(201, cy - 29, 3, 1, P.stone)

    // palmeras que se mecen
    for (const [px, ph] of [[126, 0], [304, 1]]) {
      const base = fg[px] + 1
      const sw = reduced ? 0 : Math.round(Math.sin(t * 1.1 + ph * 2))
      for (k = 0; k < 14; k++) r(px + Math.round(k * 0.18), base - k, 1, 1, P.trunk)
      const tx = px + 2
      const ty = base - 14
      r(tx - 5 + sw, ty + 1, 5, 1, P.palm)
      r(tx - 7 + sw, ty + 2, 3, 1, P.palm)
      r(tx + 1 + sw, ty + 1, 5, 1, P.palm)
      r(tx + 5 + sw, ty + 2, 3, 1, P.palm)
      r(tx - 2, ty - 1, 5, 1, P.palm)
      r(tx - 1, ty, 3, 1, P.palm)
      r(tx - 3 + sw, ty - 2, 2, 1, P.palm)
      r(tx + 2 + sw, ty - 2, 2, 1, P.palm)
    }

    // autopista del norte con coches y farolas
    for (x = 0; x < W; x++) {
      r(x, road[x], 1, 3, P.road)
      if (x % 6 < 3) r(x, road[x] + 1, 1, 1, night ? "#5A5E66" : "#D8D8D0")
    }
    for (x = 12; x < W; x += 32) {
      r(x, road[x] - 5, 1, 5, "#7A808C")
      r(x, road[x] - 6, 2, 1, night ? "#FFE08A" : "#9AA3B2")
    }
    for (const c of cars) {
      let cx = c.lane === 0 ? ((c.o + tt * c.sp) % (W + 20)) - 10 : W + 10 - ((c.o + tt * c.sp) % (W + 20))
      cx = Math.round(cx)
      const ry = road[Math.max(0, Math.min(W - 1, cx))] + c.lane
      r(cx, ry, 4, 1, night ? "#3A3F4B" : c.c)
      if (night) {
        const front = c.lane === 0 ? cx + 4 : cx - 1
        const back = c.lane === 0 ? cx - 1 : cx + 4
        r(front, ry, 1, 1, "#FFF6C8")
        r(back, ry, 1, 1, "#FF4040")
      }
    }
  }

  function loop(now: number) {
    lastT = now / 1000
    if (!document.hidden) draw(lastT)
    raf = requestAnimationFrame(loop)
  }
  const onResize = () => {
    size()
    draw(lastT)
  }

  size()
  window.addEventListener("resize", onResize)
  if (reduced) draw(lastT)
  else raf = requestAnimationFrame(loop)

  return {
    redraw: () => draw(lastT),
    stop: () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    },
  }
}
