import * as React from "react"
import { Link } from "gatsby"
import PixelIcon, { IconName } from "./PixelIcon"
import Window, { WinState } from "./Window"
import { startScene, SceneHandle } from "./scene"
import { useLang } from "./useLang"
import { AboutApp, AppCtx, ContactApp, CookiesApp, CvApp, ExperienceApp, LangApp, ReadmeApp, SkillsApp, STORAGE_KEYS, TerminalApp } from "./apps"
import { jobs, LINKS, NAME, yearsOfExperience } from "../../data/profile"
import { t } from "../../data/strings"
import type { Strings } from "../../data/strings"

type AppId = "readme" | "about" | "exp" | "skills" | "term" | "mail" | "cv" | "lang" | "cookies"

interface AppDef {
  icon: IconName
  w: number
  h: number
  menu?: boolean
  dialog?: boolean
  status?: (s: Strings) => string
  Comp: React.FC<AppCtx>
}

const APPS: Record<AppId, AppDef> = {
  readme: { icon: "readme", w: 540, h: 470, menu: true, Comp: ReadmeApp },
  about: { icon: "doc", w: 460, h: 380, menu: true, Comp: AboutApp },
  exp: { icon: "folder", w: 720, h: 480, status: s => s.objects(jobs.length), Comp: ExperienceApp },
  skills: { icon: "chest", w: 580, h: 440, status: s => s.skillsStatus, Comp: SkillsApp },
  term: { icon: "term", w: 620, h: 400, Comp: TerminalApp },
  mail: { icon: "mail", w: 500, h: 460, Comp: ContactApp },
  cv: { icon: "doc", w: 580, h: 500, menu: true, Comp: CvApp },
  lang: { icon: "flags", w: 400, h: 290, dialog: true, Comp: LangApp },
  cookies: { icon: "cookie", w: 520, h: 440, menu: true, Comp: CookiesApp },
}

const DESKTOP_ICONS: (AppId | "blog")[] = ["readme", "about", "exp", "skills", "term", "mail", "lang", "cookies", "blog"]
const START_ITEMS: AppId[] = ["exp", "skills", "term", "mail", "cv", "lang", "cookies"]
const TASKBAR_H = 42
const BOOT_KEY = "arocasos-booted"

function useNow(ms: number) {
  const [now, setNow] = React.useState<Date | null>(null)
  React.useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), ms)
    return () => window.clearInterval(id)
  }, [ms])
  return now
}

const Desktop: React.FC = () => {
  const [lang, setLang] = useLang()
  const s = t(lang)
  const [wins, setWins] = React.useState<WinState[]>([])
  const [active, setActive] = React.useState<string | null>(null)
  const [boot, setBoot] = React.useState<"pending" | "running" | "done">("pending")
  const [bootLines, setBootLines] = React.useState<string[]>([])
  const [off, setOff] = React.useState(false)
  const [startOpen, setStartOpen] = React.useState(false)
  const [mobile, setMobile] = React.useState(false)
  const [selected, setSelected] = React.useState<string | null>(null)
  const [nightOverride, setNightOverride] = React.useState<boolean | null>(null)
  const [cookieToast, setCookieToast] = React.useState(false)
  const zRef = React.useRef(10)
  const openedRef = React.useRef(0)
  const layerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const sceneRef = React.useRef<SceneHandle | null>(null)
  const lastPointer = React.useRef("mouse")
  const startBtnRef = React.useRef<HTMLButtonElement>(null)
  const startMenuRef = React.useRef<HTMLDivElement>(null)
  const now = useNow(15000)

  const autoNight = now ? now.getHours() < 7 || now.getHours() >= 20 : false
  const night = nightOverride ?? autoNight
  const nightRef = React.useRef(night)
  nightRef.current = night

  const bounds = React.useCallback(() => {
    const el = layerRef.current
    return { w: el?.clientWidth ?? window.innerWidth, h: el?.clientHeight ?? window.innerHeight - TASKBAR_H }
  }, [])

  /* ---------- ventanas ---------- */
  const focus = React.useCallback((id: string) => {
    setActive(id)
    setWins(ws => ws.map(w => (w.id === id ? { ...w, z: ++zRef.current, min: false } : w)))
  }, [])

  const openApp = React.useCallback(
    (id: string, arg?: string) => {
      if (!(id in APPS)) return
      const app = APPS[id as AppId]
      setWins(ws => {
        const existing = ws.find(w => w.id === id)
        if (existing) return ws.map(w => (w.id === id ? { ...w, min: false, z: ++zRef.current, arg: arg ?? w.arg } : w))
        const b = bounds()
        const n = openedRef.current++
        const w = Math.min(app.w, b.w - 20)
        const h = Math.min(app.h, b.h - 20)
        const x = app.dialog ? Math.max(0, Math.round((b.w - w) / 2)) : Math.max(10, Math.min(b.w - w - 10, (b.w > 900 ? 230 : 150) + (n % 6) * 34))
        const y = app.dialog ? Math.max(10, Math.round((b.h - h) / 3)) : Math.max(10, Math.min(b.h - h - 10, 26 + (n % 6) * 28))
        return [...ws, { id, x, y, w, h, z: ++zRef.current, min: false, max: false, arg }]
      })
      setActive(id)
    },
    [bounds]
  )

  const closeApp = React.useCallback((id: string) => {
    setWins(ws => {
      const rest = ws.filter(w => w.id !== id)
      const top = rest.filter(w => !w.min).sort((a, b) => b.z - a.z)[0]
      setActive(top ? top.id : null)
      return rest
    })
  }, [])

  const minimize = (id: string) => {
    setWins(ws => ws.map(w => (w.id === id ? { ...w, min: true } : w)))
    setActive(null)
  }

  /* ---------- arranque ---------- */
  const finishBoot = React.useCallback(() => {
    setBoot("done")
    try {
      window.sessionStorage.setItem(BOOT_KEY, "1")
    } catch (e) {}
    const isMobile = window.innerWidth < 700
    openApp("readme")
    const params = new URLSearchParams(window.location.search)
    const w = params.get("w")
    if (w && w in APPS && w !== "readme") openApp(w, params.get("job") || undefined)
    else if (!isMobile && window.innerWidth > 1100) {
      openApp("about")
      setWins(ws => ws.map(x => (x.id === "about" ? { ...x, x: Math.min(window.innerWidth - 500, 790), y: 70 } : x)))
      setActive("readme")
      setWins(ws => ws.map(x => (x.id === "readme" ? { ...x, z: ++zRef.current } : x)))
    }
    // Primera visita: pregunta el idioma encima de todo
    let saved: string | null = null
    try {
      saved = window.localStorage.getItem("arocasos-lang")
    } catch (e) {}
    if (!saved) openApp("lang")
    // Aviso de cookies hasta que se acepte
    let seen: string | null = null
    try {
      seen = window.localStorage.getItem(STORAGE_KEYS.cookies)
    } catch (e) {}
    if (!seen) setCookieToast(true)
  }, [openApp])

  const runBoot = React.useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let skip = false
    try {
      skip = window.sessionStorage.getItem(BOOT_KEY) === "1"
    } catch (e) {}
    if (reduced || skip) {
      finishBoot()
      return
    }
    setBoot("running")
    setBootLines([])
  }, [finishBoot])

  React.useEffect(() => {
    runBoot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Escribe las líneas del arranque una a una
  React.useEffect(() => {
    if (boot !== "running") return
    const y = yearsOfExperience()
    const all = [`AROCAS-BIOS v5.0 · Tacoronte, Tenerife`, "", ...s.boot.map(l => l.replace("{y}", String(y)) + " OK"), "", s.booting]
    if (bootLines.length >= all.length) {
      const id = window.setTimeout(finishBoot, 450)
      return () => window.clearTimeout(id)
    }
    const id = window.setTimeout(() => setBootLines(all.slice(0, bootLines.length + 1)), 120)
    return () => window.clearTimeout(id)
  }, [boot, bootLines, s, finishBoot])

  /* ---------- fondo ---------- */
  React.useEffect(() => {
    if (!canvasRef.current) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    sceneRef.current = startScene(canvasRef.current, () => nightRef.current, reduced)
    return () => sceneRef.current?.stop()
  }, [])
  React.useEffect(() => {
    sceneRef.current?.redraw()
  }, [night])

  /* ---------- móvil, teclado y menú ---------- */
  React.useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 700)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (startOpen) setStartOpen(false)
      else if (active) closeApp(active)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [startOpen, active, closeApp])

  React.useEffect(() => {
    if (!startOpen) return
    startMenuRef.current?.querySelector("button")?.focus()
    const onDown = (e: PointerEvent) => {
      const tgt = e.target as Node
      if (!startMenuRef.current?.contains(tgt) && !startBtnRef.current?.contains(tgt)) setStartOpen(false)
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [startOpen])

  const dismissCookies = () => {
    setCookieToast(false)
    try {
      window.localStorage.setItem(STORAGE_KEYS.cookies, "1")
    } catch (e) {}
  }

  const ctxFor = (w: WinState): AppCtx => ({ lang, s, arg: w.arg, openApp, closeApp, setLang })
  const title = (id: AppId) => (id === "lang" ? s.startMenu.lang : s.apps[id])
  const clock = now ? new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", { hour: "2-digit", minute: "2-digit" }).format(now) : "--:--"

  return (
    <div id="os">
      <canvas ref={canvasRef} id="wall" role="img" aria-label={lang === "es" ? "El Teide visto desde Tacoronte, en pixel art" : "The Teide seen from Tacoronte, in pixel art"} onClick={() => setSelected(null)} />

      {/* Texto para buscadores y lectores de pantalla */}
      <div className="sr-only">
        <h1>
          {NAME} · {jobs[0].role[lang]}
        </h1>
        <p>{s.about.p1(yearsOfExperience())}</p>
        <p>{s.about.p2}</p>
        <Link to="/cv/">CV</Link>
      </div>

      <nav id="icons" aria-label={s.desktop}>
        {DESKTOP_ICONS.map(id =>
          id === "blog" ? (
            <a key={id} className="dicon" href={LINKS.blog} target="_blank" rel="noopener noreferrer">
              <PixelIcon name="globe" />
              <span>{s.apps.blog}</span>
            </a>
          ) : (
            <button
              key={id}
              type="button"
              className={`dicon${selected === id ? " sel" : ""}`}
              onPointerDown={e => (lastPointer.current = e.pointerType)}
              onClick={e => {
                setSelected(id)
                if (e.detail === 0 || lastPointer.current !== "mouse") openApp(id)
              }}
              onDoubleClick={() => openApp(id)}
            >
              <PixelIcon name={APPS[id].icon} />
              <span>{title(id)}</span>
            </button>
          )
        )}
      </nav>

      <div id="windows" ref={layerRef}>
        {wins.map(w => {
          const app = APPS[w.id as AppId]
          const Comp = app.Comp
          return (
            <Window
              key={w.id}
              win={w}
              title={title(w.id as AppId)}
              icon={app.icon}
              active={active === w.id}
              mobile={mobile}
              menu={app.menu}
              dialog={app.dialog}
              status={app.status?.(s)}
              s={s}
              bounds={bounds}
              onFocus={() => {
                if (active !== w.id) focus(w.id)
              }}
              onClose={() => closeApp(w.id)}
              onMin={() => minimize(w.id)}
              onToggleMax={() => setWins(ws => ws.map(x => (x.id === w.id ? { ...x, max: !x.max } : x)))}
              onMove={(x, y) => setWins(ws => ws.map(o => (o.id === w.id ? { ...o, x, y } : o)))}
            >
              <Comp {...ctxFor(w)} />
            </Window>
          )
        })}
      </div>

      {startOpen && (
        <div id="startmenu" className="raised" ref={startMenuRef}>
          <div className="sm-side">
            <span>
              Arocas<b>OS</b> 5.0
            </span>
          </div>
          <div className="sm-items">
            {START_ITEMS.map(id => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setStartOpen(false)
                  openApp(id)
                }}
              >
                <PixelIcon name={APPS[id].icon} />
                <span>{s.startMenu[id as keyof Strings["startMenu"]]}</span>
              </button>
            ))}
            <hr />
            <button
              type="button"
              onClick={() => {
                setStartOpen(false)
                openApp("readme")
              }}
            >
              <PixelIcon name="readme" />
              <span>{s.startMenu.readme}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStartOpen(false)
                setOff(true)
              }}
            >
              <PixelIcon name="power" />
              <span>{s.shutdown}</span>
            </button>
          </div>
        </div>
      )}

      <div id="taskbar">
        <button ref={startBtnRef} type="button" id="start" className={`btn${startOpen ? " on" : ""}`} aria-haspopup="true" aria-expanded={startOpen} onClick={() => setStartOpen(o => !o)}>
          <PixelIcon name="teide" />
          {s.start}
        </button>
        <div id="tasks">
          {wins.map(w => (
            <button
              key={w.id}
              type="button"
              className={`btn${active === w.id && !w.min ? " on" : ""}`}
              aria-label={title(w.id as AppId)}
              onClick={() => {
                if (w.min || active !== w.id) focus(w.id)
                else minimize(w.id)
              }}
            >
              <PixelIcon name={APPS[w.id as AppId].icon} />
              <span>{title(w.id as AppId)}</span>
            </button>
          ))}
        </div>
        <div id="tray" className="sunken">
          <button type="button" className="tray-btn" aria-label={s.langLabel} title={s.langLabel} onClick={() => setLang(lang === "es" ? "en" : "es")}>
            {lang.toUpperCase()}
          </button>
          <button type="button" className="tray-btn" title={night ? s.nightOn : s.dayOn} aria-label={night ? s.nightOn : s.dayOn} onClick={() => setNightOverride(!night)}>
            {night ? "☾" : "☀"}
          </button>
          <span id="clock">{clock}</span>
        </div>
      </div>

      {cookieToast && (
        <div className="toast raised" role="status" aria-label={s.cookies.toastTitle}>
          <div className="toast-head">
            <span>ArocasOS</span>
            <button type="button" className="tb-btn" aria-label={s.close} onClick={dismissCookies}>
              ×
            </button>
          </div>
          <div className="toast-body">
            <PixelIcon name="cookie" className="toast-icon" />
            <div>
              <b>{s.cookies.toastTitle}</b>
              <p>{s.cookies.toastText}</p>
              <div className="toast-btns">
                <button type="button" className="btn primary" onClick={dismissCookies}>
                  {s.cookies.ok}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    dismissCookies()
                    openApp("cookies")
                  }}
                >
                  {s.cookies.more}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {boot !== "done" && (
        <div className="overlay boot" aria-hidden="true" onClick={() => boot === "running" && finishBoot()}>
          {bootLines.map((l, i) => (
            <div key={i}>{l ? l.replace(/ OK$/, "") : " "}{l.endsWith(" OK") && <span className="ok"> OK</span>}</div>
          ))}
          {boot === "running" && <div className="skip">{s.skipBoot}</div>}
        </div>
      )}

      {off && (
        <div className="overlay off">
          <p>{s.shutdownMsg}</p>
          <div>
            <button
              type="button"
              className="btn"
              autoFocus
              onClick={() => {
                setOff(false)
                setWins([])
                setActive(null)
                openedRef.current = 0
                try {
                  window.sessionStorage.removeItem(BOOT_KEY)
                } catch (e) {}
                runBoot()
              }}
            >
              {s.reboot}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Desktop
