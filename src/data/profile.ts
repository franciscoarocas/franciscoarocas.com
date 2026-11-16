// Única fuente de datos del sitio: experiencia, habilidades y enlaces.
// Las habilidades y los años de experiencia se calculan a partir de aquí.

export type Lang = "es" | "en"
export type L = Record<Lang, string>

export const NAME = "Francisco Arocas"
export const EMAIL = "hola@franciscoarocas.com"
export const LINKS = {
  linkedin: "https://www.linkedin.com/in/francisco-arocas/",
  github: "https://github.com/franciscoarocas/",
  blog: "https://blog.franciscoarocas.com",
}
export const LOCATION: L = {
  es: "Tacoronte, Tenerife",
  en: "Tacoronte, Tenerife",
}
export const COORDS: L = { es: "28.48°N 16.41°O", en: "28.48°N 16.41°W" }

// Primer puesto: noviembre de 2021
const CAREER_START = { year: 2021, month: 10 }

export function yearsOfExperience(now: Date = new Date()): number {
  let years = now.getFullYear() - CAREER_START.year
  if (now.getMonth() < CAREER_START.month) years--
  return years
}

export interface Job {
  id: string
  file: string
  current?: boolean
  period: L
  role: L
  org: L
  summary: L
  bullets: L[]
  stack: string[]
}

export const jobs: Job[] = [
  {
    id: "f360",
    file: "360-fund-insight.txt",
    current: true,
    period: { es: "AGO 2023 – HOY", en: "AUG 2023 – NOW" },
    role: { es: "Backend Engineer", en: "Backend Engineer" },
    org: { es: "360 Fund Insight · analítica financiera", en: "360 Fund Insight · financial analytics" },
    summary: {
      es: "APIs y pipelines de datos para una plataforma de analítica financiera.",
      en: "APIs and data pipelines for a financial analytics platform.",
    },
    bullets: [
      { es: "APIs REST con Django REST Framework para cálculos de NAV, rendimiento de carteras y reporting.", en: "Django REST APIs for NAV calculations, portfolio performance and reporting." },
      { es: "Despliegue en AWS con EC2, Docker, RDS y Route 53.", en: "Deployed on AWS with EC2, Docker, RDS and Route 53." },
      { es: "CI/CD con GitHub Actions: tests, imágenes Docker y despliegue automático.", en: "CI/CD with GitHub Actions: tests, Docker images and automatic deploys." },
      { es: "Orquestación con Celery y procesamiento con Pandas, NumPy y Polars.", en: "Orchestration with Celery and processing with Pandas, NumPy and Polars." },
      { es: "Optimización de rendimiento e informes en Excel y PDF con WeasyPrint.", en: "Performance tuning and Excel and PDF reports with WeasyPrint." },
    ],
    stack: ["Python", "Django REST", "Celery", "Pandas", "NumPy", "Polars", "AWS", "Docker", "GitHub Actions"],
  },
  {
    id: "gtc",
    file: "grantecan.txt",
    period: { es: "AGO 2022 – AGO 2023", en: "AUG 2022 – AUG 2023" },
    role: { es: "Software Engineer", en: "Software Engineer" },
    org: { es: "Gran Telescopio de Canarias (GRANTECAN)", en: "Gran Telescopio Canarias (GRANTECAN)" },
    summary: {
      es: "Pipeline completo de reducción de datos para procesar cientos de GB de imágenes astronómicas del telescopio.",
      en: "A full data reduction pipeline to process hundreds of GB of astronomical images from the telescope.",
    },
    bullets: [
      { es: "Algoritmos en C/C++ y Python para bias/dark subtraction, flat-fielding y calibración astrométrica.", en: "C/C++ and Python algorithms for bias/dark subtraction, flat-fielding and astrometric calibration." },
      { es: "Procesamiento científico con NumPy, Pandas y Astropy.", en: "Scientific processing with NumPy, Pandas and Astropy." },
      { es: "Empaquetado y despliegue con Docker en servidores Linux.", en: "Packaging and deployment with Docker on Linux servers." },
      { es: "Colaboración con el equipo de astrofísicos para mejorar la calidad de los resultados.", en: "Worked with the astrophysics team to improve the quality of the results." },
    ],
    stack: ["C/C++", "Python", "NumPy", "Pandas", "Astropy", "Docker", "Linux"],
  },
  {
    id: "ull",
    file: "puertos-iot.txt",
    period: { es: "MAR – SEP 2022", en: "MAR – SEP 2022" },
    role: { es: "Investigador · IoT", en: "Researcher · IoT" },
    org: { es: "Universidad de La Laguna", en: "University of La Laguna" },
    summary: {
      es: "Proyecto «Puertos inteligentes y electrificación del tráfico interno en los puertos de Canarias».",
      en: "Research project “Smart ports and electrification of internal traffic in the Canary Islands ports”.",
    },
    bullets: [
      { es: "Infraestructura IoT basada en LoRaWAN para monitorizar el tráfico.", en: "LoRaWAN-based IoT infrastructure to monitor traffic." },
      { es: "Raspberry Pi, Python y C++; pipelines en tiempo real con MQTT.", en: "Raspberry Pi, Python and C++; real-time pipelines with MQTT." },
      { es: "Almacenamiento y monitorización con InfluxDB, MySQL y Grafana.", en: "Storage and monitoring with InfluxDB, MySQL and Grafana." },
      { es: "Interfaces web con React y Next.js, desplegadas con Docker en Linux.", en: "Web interfaces with React and Next.js, deployed with Docker on Linux." },
    ],
    stack: ["Python", "C/C++", "Raspberry Pi", "LoRaWAN", "MQTT", "InfluxDB", "MySQL", "Grafana", "React", "Next.js", "Docker", "Linux"],
  },
  {
    id: "fred",
    file: "fred-olsen.txt",
    period: { es: "JUN – AGO 2022", en: "JUN – AUG 2022" },
    role: { es: "Software Engineer", en: "Software Engineer" },
    org: { es: "Fred Olsen Express · beca FGULL", en: "Fred Olsen Express · FGULL scholarship" },
    summary: {
      es: "Tratamiento y visualización de la telemetría de más de 10 barcos y cientos de miles de posiciones.",
      en: "Processing and visualising telemetry from more than 10 vessels and hundreds of thousands of positions.",
    },
    bullets: [
      { es: "Limpieza y procesamiento con Python, Pandas, NumPy y Folium.", en: "Data cleaning and processing with Python, Pandas, NumPy and Folium." },
      { es: "API con FastAPI e interfaz en React para visualización geoespacial y métricas.", en: "FastAPI backend and React frontend for geospatial visualisation and metrics." },
      { es: "Mapas interactivos con Leaflet y diseño responsive con Bootstrap.", en: "Interactive maps with Leaflet and responsive design with Bootstrap." },
    ],
    stack: ["Python", "Pandas", "NumPy", "FastAPI", "React", "Leaflet", "Bootstrap"],
  },
  {
    id: "cab",
    file: "cabildo.txt",
    period: { es: "NOV 2021 – ENE 2022", en: "NOV 2021 – JAN 2022" },
    role: { es: "Desarrollador full stack", en: "Full stack developer" },
    org: { es: "Cabildo de Tenerife", en: "Cabildo of Tenerife" },
    summary: {
      es: "Aplicación full stack para tratar y visualizar datos de tráfico de vehículos, usada por personal municipal.",
      en: "Full stack application to process and visualise vehicle traffic data, used internally by council staff.",
    },
    bullets: [
      { es: "Backend en Django para procesar, transformar y almacenar grandes volúmenes de datos.", en: "Django backend to process, transform and store large volumes of data." },
      { es: "Dashboards responsive con React, JavaScript y Bootstrap.", en: "Responsive dashboards with React, JavaScript and Bootstrap." },
      { es: "Apoyo al análisis del tráfico y la planificación urbana.", en: "Supported traffic analysis and urban planning." },
    ],
    stack: ["Python", "Django", "React", "Bootstrap"],
  },
]

interface SkillDef {
  name: string
  area: L
  match: string[]
}

const skillDefs: SkillDef[] = [
  { name: "Python", area: { es: "Backend", en: "Backend" }, match: ["Python"] },
  { name: "Django · DRF", area: { es: "Backend", en: "Backend" }, match: ["Django", "Django REST"] },
  { name: "FastAPI", area: { es: "Backend", en: "Backend" }, match: ["FastAPI"] },
  { name: "Celery", area: { es: "Backend", en: "Backend" }, match: ["Celery"] },
  { name: "Pandas · NumPy", area: { es: "Datos", en: "Data" }, match: ["Pandas", "NumPy"] },
  { name: "Polars", area: { es: "Datos", en: "Data" }, match: ["Polars"] },
  { name: "Astropy", area: { es: "Datos", en: "Data" }, match: ["Astropy"] },
  { name: "InfluxDB · MySQL", area: { es: "Datos", en: "Data" }, match: ["InfluxDB", "MySQL"] },
  { name: "Docker", area: { es: "Infra", en: "Infra" }, match: ["Docker"] },
  { name: "Linux", area: { es: "Infra", en: "Infra" }, match: ["Linux"] },
  { name: "AWS", area: { es: "Infra", en: "Infra" }, match: ["AWS"] },
  { name: "GitHub Actions", area: { es: "Infra", en: "Infra" }, match: ["GitHub Actions"] },
  { name: "React · Next.js", area: { es: "Frontend", en: "Frontend" }, match: ["React", "Next.js"] },
  { name: "Bootstrap", area: { es: "Frontend", en: "Frontend" }, match: ["Bootstrap"] },
  { name: "Leaflet", area: { es: "Frontend", en: "Frontend" }, match: ["Leaflet"] },
  { name: "C / C++", area: { es: "Sistemas", en: "Systems" }, match: ["C/C++"] },
  { name: "LoRaWAN · MQTT", area: { es: "IoT", en: "IoT" }, match: ["LoRaWAN", "MQTT"] },
  { name: "Raspberry Pi", area: { es: "IoT", en: "IoT" }, match: ["Raspberry Pi"] },
]

export interface Skill {
  name: string
  area: L
  count: number
}

// Cuántos puestos usaron cada tecnología, ordenadas de más a menos.
export const skills: Skill[] = skillDefs
  .map(s => ({
    name: s.name,
    area: s.area,
    count: jobs.filter(j => j.stack.some(t => s.match.includes(t))).length,
  }))
  .sort((a, b) => b.count - a.count)

export const MAX_SKILL = jobs.length
