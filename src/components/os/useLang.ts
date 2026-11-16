import * as React from "react"
import type { Lang } from "../../data/profile"

const KEY = "arocasos-lang"

// Idioma guardado en el navegador (sin cookies). Por defecto, el del navegador.
// `chosen` indica si el visitante ya eligió idioma alguna vez (null mientras no se sabe).
export function useLang(): [Lang, (l: Lang) => void, boolean | null] {
  const [lang, setLangState] = React.useState<Lang>("es")
  const [chosen, setChosen] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    let saved: string | null = null
    try {
      saved = window.localStorage.getItem(KEY)
    } catch (e) {}
    const valid = saved === "es" || saved === "en"
    setLangState(valid ? (saved as Lang) : navigator.language?.toLowerCase().startsWith("es") ? "es" : "en")
    setChosen(valid)
  }, [])

  React.useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l)
    setChosen(true)
    try {
      window.localStorage.setItem(KEY, l)
    } catch (e) {}
  }, [])

  return [lang, setLang, chosen]
}
