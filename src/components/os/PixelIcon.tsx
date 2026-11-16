import * as React from "react"

// Iconos pixel de 12×12. Cada letra es un color; "." es transparente.
const PC: Record<string, string> = {
  k: "#121A2B", w: "#FFFFFF", g: "#B9C4D3", b: "#0A5FB4", l: "#6CB4FF", y: "#F4C430",
  Y: "#D9A21B", C: "#D9A35B", c: "#4A2E1A", o: "#E0582A", n: "#8A5A3C", s: "#8A94A6", G: "#27AE60", r: "#D9534F",
}

const SPR: Record<string, string[]> = {
  doc: ["..kkkkkkk...", "..kwwwwwkk..", "..kwggggwkk.", "..kwwwwwwwk.", "..kwgggggwk.", "..kwwwwwwwk.", "..kwgggggwk.", "..kwwwwwwwk.", "..kwggggwwk.", "..kwwwwwwwk.", "..kkkkkkkkk.", "............"],
  readme: ["..kkkkkkk...", "..kwwwwwkk..", "..kwoooowkk.", "..kwwwwwwwk.", "..kwooooowk.", "..kwwwwwwwk.", "..kwooooowk.", "..kwwwwwwwk.", "..kwoooowwk.", "..kwwwwwwwk.", "..kkkkkkkkk.", "............"],
  folder: ["............", ".kkkk.......", "kYYYYkkkkkk.", "kYYYYYYYYYYk", "kkkkkkkkkkkk", "kyyyyyyyyyyk", "kyyyyyyyyyyk", "kyyyyyyyyyyk", "kyyyyyyyyyyk", "kyyyyyyyyyyk", "kkkkkkkkkkkk", "............"],
  chest: ["............", "..kkkkkkkk..", ".knnnnnnnnk.", "knnnnnnnnnnk", "kkkkkyykkkkk", "knnnnkynnnnk", "knnnnnnnnnnk", "knnnnnnnnnnk", "knnnnnnnnnnk", "kkkkkkkkkkkk", "............", "............"],
  mail: ["............", "............", "kkkkkkkkkkkk", "kwkwwwwwwkwk", "kwwkwwwwkwwk", "kwwwkwwkwwwk", "kwwwwkkwwwwk", "kwwwwwwwwwwk", "kwwwwwwwwwwk", "kkkkkkkkkkkk", "............", "............"],
  term: ["ssssssssssss", "skkkkkkkkkks", "skGkkkkkkkks", "skkGkkkkkkks", "skGkkkkkkkks", "skkkkGGGkkks", "skkkkkkkkkks", "ssssssssssss", "....ssss....", "..ssssssss..", "............", "............"],
  globe: ["....kkkk....", "..kkbllbkk..", ".kbllbbllbk.", ".kblGGbllbk.", "kbbGGGGbbbbk", "kblbGGbbllbk", "kbllbbbGGlbk", "kbbllbGGGbbk", ".kbllbbGGbk.", ".kbbllbbbbk.", "..kkbbbbkk..", "....kkkk...."],
  teide: ["............", "............", ".....ww.....", "....wwww....", "....nnnn....", "...nnnnnn...", "..nnnnnnnn..", ".nnnnnnnnnn.", "nnnnnnnnnnnn", "bbbbbbbbbbbb", "llbbllbbllbb", "............"],
  power: ["....kkkk....", "..kk.rr.kk..", ".k...rr...k.", "k....rr....k", "k....rr....k", "k..........k", "k..........k", "k..........k", ".k........k.", "..kk....kk..", "....kkkk....", "............"],
  cookie: ["...kkkkkk...", "..kCCCCCCk..", ".kCCcCCCCCk.", "kCCCCCCcCCCk", "kCcCCCCCCCCk", "kCCCCcCCCCCk", "kCCCCCCCCcCk", "kCcCCCCCCCCk", ".kCCCCcCCCk.", "..kCCCCCCk..", "...kkkkkk...", "............"],
  flags: ["kkkkkkk.....", "krrrrrk.....", "kyyyyyk.....", "kyyyyyk.....", "krrrrrk.....", "kkkkkkk.....", ".....kkkkkkk", ".....kbwrwbk", ".....krrrrrk", ".....kbwrwbk", ".....kkkkkkk", "............"],
  warn: [".....kk.....", "....kyyk....", "....kyyk....", "...kyyyyk...", "...kykkyk...", "..kyykkyyk..", "..kyykkyyk..", ".kyyyyyyyyk.", ".kyyykkyyyk.", "kyyyyyyyyyyk", "kkkkkkkkkkkk", "............"],
}

export type IconName = keyof typeof SPR

const PixelIcon: React.FC<{ name: IconName; className?: string }> = ({ name, className }) => {
  const rows = SPR[name]
  const rects: React.ReactNode[] = []
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = row[x]
      if (c !== ".") rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PC[c]} />)
    }
  })
  return (
    <svg viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true" className={className}>
      {rects}
    </svg>
  )
}

export default PixelIcon
