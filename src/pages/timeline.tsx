// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import TimeLineItem from "../components/timeLimeItem"

type DataProps = {
  site: {
    buildTime: string
  }
}

const TimeLine: React.FC<PageProps<DataProps>> = ({
  data,
  path,
  location,
}) => {

  return (
    <Layout title="Index" location={location}>
      <div style={{maxWidth : '600px'}}>
        <h1 style={{marginBottom : '3rem'}}>⏱ TimeLine</h1>
        <TimeLineItem
          name="Gran Telescopio de Canarias, S.A. (GRANTECAN)"
          period="Agosto 2022 - Actualidad"
          description={
            <>
              <p>Responsable del diseño, creación y mantenimiento de una aplicación para el análisis de los datos e imágenes obtenidas por el telescopio.</p>
              <p>Para el desarrollo del trabajo, he utilizado las siguientes tecnologías.</p>
              <ul>
                <li>Lenguajes de programación de bajo nivel (C/C++)</li>
                <li>Python para el análisis de las imagenes utilizando librerías como Numpy, Pandas, Scipy, AstroPy, etc</li>
                <li>Docker para la creación y despliegue de contenedores</li>
                <li>Github y GitLab (GIT) e Integración Continua (Continuos Integration)</li>
                <li>Creación de Pipelines para reducción de datos utilizando Numina</li>
              </ul>
            </>
          }
        />
        <TimeLineItem
          name="Fred Olsen Express"
          period="Junio 2022 - Agosto 2022"
          description={
            <>
              <p>Mi trabajo como Ingeniero de Datos fue la monitorización y análisis de los datos obtenidos de los barcos, utilizando las siguientes tecnologías:</p>
              <ul>
                <li><b>Apache AirFlow:</b> Instalación, mantenimiendo y administración. Además de la creación de diferentes DAGs.</li>
                <li><b>Python:</b> Programación utilizando librerías de análisis de datos: Pandas, Numpy, Folium, etc</li>
                <li><b>Creación de una aplicación para la visualización de datos: </b>Utilizando API REST, FastAPI, ReactJS, HTML, CSS, JavaScript y librerias como Bootstrap y Leaflet</li>
                <li>Instalación y administración de Máquinas Virtuales Linux</li>
              </ul>
              <p>A través de una beca obtenida por la Fundación General de la Universidad de La Laguna.</p>
            </>
          }
        />
        <TimeLineItem
          name="Cabildo de Tenerife"
          period="Noviembre 2021 - Enero 2022"
          description={<p>Prácticas externas de la universidad. Responsable de diseño, desarrollo y puesta en pre producción de aplicación Full Stack para tratamiento y visualización de datos (Big Data) de aforos de vehículos para el Cabildo de Tenerife utilizando Django (Python), React (JavaScript) y Bootstrap.</p>}
        />
      </div>
    </Layout>
  )

}

export const Head: HeadFC<DataProps> = () => <Seo title="TimeLine" />

export default TimeLine
