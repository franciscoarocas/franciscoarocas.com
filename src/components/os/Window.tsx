import * as React from "react"
import PixelIcon, { IconName } from "./PixelIcon"
import type { Strings } from "../../data/strings"

export interface WinState {
  id: string
  x: number
  y: number
  w: number
  h: number
  z: number
  min: boolean
  max: boolean
  arg?: string
}

interface Props {
  win: WinState
  title: string
  icon: IconName
  active: boolean
  mobile: boolean
  menu?: boolean
  dialog?: boolean
  status?: React.ReactNode
  s: Strings
  bounds: () => { w: number; h: number }
  onFocus: () => void
  onClose: () => void
  onMin: () => void
  onToggleMax: () => void
  onMove: (x: number, y: number) => void
  children: React.ReactNode
}

const Window: React.FC<Props> = ({ win, title, icon, active, mobile, menu, dialog, status, s, bounds, onFocus, onClose, onMin, onToggleMax, onMove, children }) => {
  const drag = React.useRef<{ x: number; y: number; l: number; t: number } | null>(null)
  const ref = React.useRef<HTMLElement>(null)
  const maximized = !dialog && (win.max || mobile)

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".tb-btn") || maximized) return
    drag.current = { x: e.clientX, y: e.clientY, l: win.x, t: win.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const b = bounds()
    const width = ref.current?.offsetWidth ?? win.w
    const x = Math.max(-width + 90, Math.min(b.w - 90, d.l + e.clientX - d.x))
    const y = Math.max(0, Math.min(b.h - 30, d.t + e.clientY - d.y))
    onMove(x, y)
  }
  const endDrag = () => {
    drag.current = null
  }

  return (
    <section
      ref={ref}
      className={`win${active ? " active" : ""}${maximized ? " max" : ""}${dialog ? " dialog" : ""}`}
      aria-label={title}
      hidden={win.min}
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
      onPointerDownCapture={onFocus}
    >
      <div
        className="titlebar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={e => {
          if (!(e.target as HTMLElement).closest(".tb-btn") && !mobile && !dialog) onToggleMax()
        }}
      >
        <PixelIcon name={icon} />
        <span className="t">{title}</span>
        <span className="stripes" />
        {!dialog && (
          <button type="button" className="tb-btn" aria-label={s.minimize} onClick={onMin}>
            _
          </button>
        )}
        {!mobile && !dialog && (
          <button type="button" className="tb-btn" aria-label={s.maximize} onClick={onToggleMax}>
            □
          </button>
        )}
        <button type="button" className="tb-btn" aria-label={s.close} onClick={onClose}>
          ×
        </button>
      </div>
      {menu && (
        <div className="menubar" aria-hidden="true">
          {s.menu.map(m => (
            <span key={m}>{m}</span>
          ))}
        </div>
      )}
      <div className="win-body sunken">{children}</div>
      {status && (
        <div className="statusbar">
          <span>{status}</span>
          <span>ArocasOS</span>
        </div>
      )}
    </section>
  )
}

export default Window
