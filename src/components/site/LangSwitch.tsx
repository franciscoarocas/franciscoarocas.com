import * as React from "react"
import type { Lang } from "../../data/profile"

import esFlag from "../../images/flags/es.png"
import gbFlag from "../../images/flags/gb.png"

// Selector de idioma con las banderas famfamfam de la web original.
const OPTIONS: { lang: Lang; flag: string; label: string; name: string }[] = [
  { lang: "es", flag: esFlag, label: "ES", name: "Español" },
  { lang: "en", flag: gbFlag, label: "EN", name: "English" },
]

const LangSwitch: React.FC<{ lang: Lang; setLang: (l: Lang) => void; label: string }> = ({ lang, setLang, label }) => (
  <div className="langs" role="group" aria-label={label}>
    {OPTIONS.map(o => (
      <button key={o.lang} type="button" className={o.lang === lang ? "on" : ""} aria-pressed={o.lang === lang} title={o.name} onClick={() => setLang(o.lang)}>
        <img src={o.flag} alt="" width={16} height={11} />
        {o.label}
      </button>
    ))}
  </div>
)

export default LangSwitch
