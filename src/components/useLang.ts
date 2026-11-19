import * as React from "react"
import type { Lang } from "../data/profile"

const KEY = "fa-lang"

// Idioma guardado en el navegador (sin cookies). Por defecto, el del navegador.
export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = React.useState<Lang>("es")

  React.useEffect(() => {
    let saved: string | null = null
    try {
      saved = window.localStorage.getItem(KEY)
    } catch (e) {}
    const valid = saved === "es" || saved === "en"
    setLangState(valid ? (saved as Lang) : navigator.language?.toLowerCase().startsWith("es") ? "es" : "en")
  }, [])

  React.useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem(KEY, l)
    } catch (e) {}
  }, [])

  return [lang, setLang]
}
