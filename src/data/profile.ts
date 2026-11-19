// Única fuente de datos del sitio: contacto, formación, experiencia y proyectos (CV de noviembre de 2026).

export type Lang = "es" | "en"
export type L = Record<Lang, string>

export const NAME = "Francisco Arocas"
export const EMAIL = "hola@franciscoarocas.com"
export const LINKS = {
  linkedin: "https://www.linkedin.com/in/francisco-arocas/",
  github: "https://github.com/franciscoarocas/",
  medium: "https://medium.com/@franciscoarocash",
}

// Primer puesto: noviembre de 2021
const CAREER_START = { year: 2021, month: 10 }
export function yearsOfExperience(now: Date = new Date()): number {
  let years = now.getFullYear() - CAREER_START.year
  if (now.getMonth() < CAREER_START.month) years--
  return years
}

export type LogoKey = "f360" | "gtc" | "fredolsen" | "ull" | "cabildo"

export interface Degree {
  kind: L
  title: L
  detail: L
}
export const degrees: Degree[] = [
  {
    kind: { es: "Grado", en: "Degree" },
    title: { es: "Ingeniería Informática", en: "Computer Engineering" },
    detail: { es: "Mención en Computación · Universidad de La Laguna · 2016–2022", en: "Computing specialisation · University of La Laguna · 2016–2022" },
  },
  {
    kind: { es: "Máster", en: "Master's" },
    title: { es: "Máster Universitario en Inteligencia Artificial", en: "Master's Degree in Artificial Intelligence" },
    detail: { es: "Universidad Internacional de Valencia · 2024–2026", en: "Valencian International University · 2024–2026" },
  },
]

export const certificates = [
  "AWS Certified Cloud Practitioner",
  "IBM Data Engineering",
  "Google IT Automation with Python",
  "Meta Front-End Developer",
]

export const stack = ["Python", "Django REST", "FastAPI", "PostgreSQL", "Pandas", "React", "Docker", "AWS"]

// Proyectos (portada) y puestos (CV), del más reciente al más antiguo
export interface Job {
  id: string
  logo: LogoKey
  org: L
  sector: L
  period: L
  role: L
  // portada
  title: L
  text: L
  result: L
  resultNote: L
  tags: string[]
  // página /cv
  bullets: L[]
}

export const jobs: Job[] = [
  {
    id: "f360",
    logo: "f360",
    org: { es: "360 Fund Insight", en: "360 Fund Insight" },
    sector: { es: "Finanzas", en: "Finance" },
    period: { es: "2023–hoy", en: "2023–now" },
    role: { es: "Ingeniero de software", en: "Software Engineer" },
    title: { es: "Datos y herramientas para invertir en fondos", en: "Data and tools for fund investors" },
    text: {
      es: "Diseño y mantengo las aplicaciones de análisis de fondos de inversión: APIs con Django REST, procesos ETL sobre PostgreSQL, herramientas que comparan fondos según las preferencias de cada inversor, scraping de datos e informes automáticos en Excel, CSV y PDF. Todo en AWS, con Docker y tests automáticos.",
      en: "I design and maintain fund analysis applications: Django REST APIs, ETL processes on PostgreSQL, tools that compare funds against each investor's preferences, data scraping and automatic Excel, CSV and PDF reports. All on AWS, with Docker and automated tests.",
    },
    result: { es: "Informes solos", en: "Self-running reports" },
    resultNote: { es: "en Excel, CSV y PDF, con tests y despliegue en AWS", en: "in Excel, CSV and PDF, with tests and AWS deployment" },
    tags: ["Django REST", "PostgreSQL", "Pandas", "AWS", "Docker"],
    bullets: [
      { es: "Obtención, análisis y tratamiento de datos con Python, Pandas y NumPy.", en: "Data collection, analysis and processing with Python, Pandas and NumPy." },
      { es: "Herramientas para comparar fondos y encontrar los mejores según las preferencias del inversor.", en: "Tools to compare funds and find the best ones for each investor's preferences." },
      { es: "Informes automáticos en Excel, CSV y PDF con PDFKit, Matplotlib y Pandas.", en: "Automatic Excel, CSV and PDF reports with PDFKit, Matplotlib and Pandas." },
      { es: "Backend con Django REST Framework y testing automático.", en: "Backend with Django REST Framework and automated testing." },
      { es: "Diseño y automatización de procesos ETL con Python y PostgreSQL.", en: "Design and automation of ETL processes with Python and PostgreSQL." },
      { es: "AWS (EC2, RDS y Route 53), Docker y web scraping con BeautifulSoup.", en: "AWS (EC2, RDS and Route 53), Docker and web scraping with BeautifulSoup." },
    ],
  },
  {
    id: "gtc",
    logo: "gtc",
    org: { es: "GRANTECAN", en: "GRANTECAN" },
    sector: { es: "Astronomía", en: "Astronomy" },
    period: { es: "2022–2023", en: "2022–2023" },
    role: { es: "Ingeniero de software", en: "Software Engineer" },
    title: { es: "De imagen en bruto a dato científico", en: "From raw image to scientific data" },
    text: {
      es: "Diseñé, desarrollé y mantuve la aplicación que analiza los datos y las imágenes del Gran Telescopio de Canarias: pipelines de reducción con Numina, algoritmos en C/C++ y Python, y despliegue en Docker junto al equipo de astrofísicos.",
      en: "I designed, built and maintained the application that analyses the data and images of the Gran Telescopio Canarias: reduction pipelines with Numina, algorithms in C/C++ and Python, and Docker deployment alongside the astrophysics team.",
    },
    result: { es: "De principio a fin", en: "End to end" },
    resultNote: { es: "del diseño al mantenimiento de la aplicación", en: "from design to maintenance of the application" },
    tags: ["C/C++", "Python", "Numina", "Astropy", "Docker"],
    bullets: [
      { es: "Diseño, creación y mantenimiento de la aplicación de análisis de datos e imágenes del telescopio.", en: "Design, development and maintenance of the telescope's data and image analysis application." },
      { es: "Pipelines de reducción de datos con Numina.", en: "Data reduction pipelines with Numina." },
      { es: "C/C++ y Python con NumPy, Pandas, SciPy y Astropy.", en: "C/C++ and Python with NumPy, Pandas, SciPy and Astropy." },
      { es: "Contenedores Docker, GitHub y GitLab.", en: "Docker containers, GitHub and GitLab." },
    ],
  },
  {
    id: "fred",
    logo: "fredolsen",
    org: { es: "Fred. Olsen Express", en: "Fred. Olsen Express" },
    sector: { es: "Transporte marítimo", en: "Maritime transport" },
    period: { es: "2022", en: "2022" },
    role: { es: "Ingeniero de datos", en: "Data Engineer" },
    title: { es: "Toda la flota, en un mapa", en: "The whole fleet, on a map" },
    text: {
      es: "Como ingeniero de datos, procesé y analicé la telemetría de los barcos con Python y construí una API con FastAPI y una aplicación web en React para ver sus rutas y métricas sobre un mapa.",
      en: "As a data engineer, I processed and analysed ship telemetry with Python, and built a FastAPI backend and a React web app to see routes and metrics on a map.",
    },
    result: { es: "Flota en el mapa", en: "Fleet on a map" },
    resultNote: { es: "rutas y métricas de cada barco en una aplicación web", en: "routes and metrics for every ship in a web app" },
    tags: ["Python", "FastAPI", "React", "Leaflet", "Pandas"],
    bullets: [
      { es: "Monitorización y análisis de los datos obtenidos de los barcos.", en: "Monitoring and analysis of the data collected from the ships." },
      { es: "Instalación y administración de máquinas virtuales Linux.", en: "Installation and administration of Linux virtual machines." },
      { es: "Análisis de datos con Python, Pandas, NumPy y Folium.", en: "Data analysis with Python, Pandas, NumPy and Folium." },
      { es: "Aplicación de visualización con FastAPI, React, Bootstrap y Leaflet.", en: "Visualisation app with FastAPI, React, Bootstrap and Leaflet." },
      { es: "Beca de la Fundación General de la Universidad de La Laguna.", en: "Scholarship from the General Foundation of the University of La Laguna." },
    ],
  },
  {
    id: "ull",
    logo: "ull",
    org: { es: "Universidad de La Laguna", en: "University of La Laguna" },
    sector: { es: "Investigación", en: "Research" },
    period: { es: "2022", en: "2022" },
    role: { es: "Ingeniero de software · investigación", en: "Software Engineer · research" },
    title: { es: "Sensores para los puertos de Canarias", en: "Sensors for the Canary Islands ports" },
    text: {
      es: "En el proyecto de investigación sobre puertos inteligentes, desarrollé la red LoRaWAN para medir el tráfico interno y apoyé el desarrollo de un magnetómetro con Raspberry Pi: datos en tiempo real por MQTT, InfluxDB, Grafana y paneles en React y Next.js.",
      en: "On the smart ports research project, I built the LoRaWAN network to measure internal traffic and helped develop a Raspberry Pi magnetometer: real-time data over MQTT, InfluxDB, Grafana and dashboards in React and Next.js.",
    },
    result: { es: "Tiempo real", en: "Real time" },
    resultNote: { es: "del sensor al panel, con LoRaWAN y MQTT", en: "from sensor to dashboard, with LoRaWAN and MQTT" },
    tags: ["LoRaWAN", "MQTT", "Raspberry Pi", "InfluxDB", "Grafana"],
    bullets: [
      { es: "Proyecto «Puertos inteligentes y electrificación del tráfico interior en los puertos canarios».", en: "Project “Smart ports and electrification of internal traffic in the Canary Islands ports”." },
      { es: "Red LoRaWAN con gateway RAK2245 y MQTT (Python Paho y C++).", en: "LoRaWAN network with a RAK2245 gateway and MQTT (Python Paho and C++)." },
      { es: "Magnetómetro con Raspberry Pi y sensores.", en: "Magnetometer with Raspberry Pi and sensors." },
      { es: "InfluxDB, MySQL, Grafana, Docker y frontends con React y Next.js.", en: "InfluxDB, MySQL, Grafana, Docker and React/Next.js frontends." },
    ],
  },
  {
    id: "cab",
    logo: "cabildo",
    org: { es: "Cabildo de Tenerife", en: "Cabildo of Tenerife" },
    sector: { es: "Administración pública", en: "Public administration" },
    period: { es: "2021–2022", en: "2021–2022" },
    role: { es: "Ingeniero de software · prácticas", en: "Software Engineer · internship" },
    title: { es: "Big data de tráfico para planificar la isla", en: "Traffic big data to plan the island" },
    text: {
      es: "Diseñé y desarrollé una aplicación full stack para tratar y visualizar los datos de aforos de vehículos de la isla, desde el backend en Django hasta los paneles en React.",
      en: "I designed and built a full stack application to process and visualise the island's vehicle count data, from the Django backend to the React dashboards.",
    },
    result: { es: "Full stack", en: "Full stack" },
    resultNote: { es: "de la base de datos a los paneles, hasta pre-producción", en: "from database to dashboards, up to pre-production" },
    tags: ["Django", "Pandas", "React", "Bootstrap"],
    bullets: [
      { es: "Diseño, desarrollo y puesta en pre-producción de una aplicación full stack de aforos de vehículos.", en: "Design, development and pre-production release of a full stack vehicle count application." },
      { es: "Backend en Python con Django, NumPy y Pandas.", en: "Python backend with Django, NumPy and Pandas." },
      { es: "Frontend con React, JavaScript y Bootstrap.", en: "Frontend with React, JavaScript and Bootstrap." },
    ],
  },
]


// Recomendaciones publicadas en LinkedIn (se muestran tal cual, en su idioma original)
export interface Review {
  name: string
  role: string
  relation: L
  quote: string
}
export const reviews: Review[] = [
  {
    name: "Raúl D. Martín",
    role: "CEO & Founder en Sun-Rose Foods",
    relation: { es: "Cliente · 2023", en: "Client · 2023" },
    quote:
      "Francisco nos ayudó a crear nuestra página web corporativa, desde cero. Gracias a sus conocimientos y su talento tanto en código como en diversos formatos de web (WordPress, Woocommerce..) tenemos hoy en día una de las páginas más punteras de nuestro sector. Además, siempre ha estado al tanto de las actualizaciones, y ha mantenido un seguimiento en el tiempo de la misma. Fue todo un acierto y volvería a trabajar con él nuevamente.",
  },
  {
    name: "Daniel Antonio Fernández Pérez",
    role: "Generative AI Lead Iberia & LATAM · CTO",
    relation: { es: "Compañero de proyecto · 2022", en: "Project colleague · 2022" },
    quote:
      "Trabajé con Francisco en el proyecto Family Community S.L, él haciendo el FrontEnd. Cabe destacar su profesionalidad y ejemplaridad a la hora de cumplir los objetivos, así como el cuidado y atención de los requerimientos que iba diciendo el cliente final.",
  },
]
