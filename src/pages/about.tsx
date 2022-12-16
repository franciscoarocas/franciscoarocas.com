// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

type DataProps = {
  site: {
    buildTime: string
  }
}

const Index: React.FC<PageProps<DataProps>> = ({
  data,
  path,
  location,
}) => {

  return (
    <Layout title="Using TypeScript" location={location}>
      <h1>Sobre mi</h1>
      <p>Hola, soy Francisco Arocas, Ingeniero de Software por la Universidad de La Laguna, actualmente trabajando y viviendo en Santa Cruz de Tenerife, Islas Canarias, España.</p>
      <p>Actualmente trabajo principalmente con Python (Ingeniería de datos), pero también he realizado aplicaciones web utilizando Javascript, HTML y CSS.</p>
      <p>Además de librerías y Frameworks como ReactJS, Bootstrap y NextJS.</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )

}

export const Head: HeadFC<DataProps> = () => <Seo title="Using TypeScript" />

export default Index

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
