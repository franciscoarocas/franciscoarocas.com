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
    <Layout title="Index" location={location}>
      <h1>Francisco Arocas</h1>
      <h2>Software Engineer</h2>
      <p>Hola, soy Francisco Arocas, un Ingeniero de Software viviendo y trabajando en Tenerife.</p>
      <div>
        <button>Linkedin</button>
        <button>GitHub</button>
        <button>Email</button>
      </div>
    </Layout>
  )

}

export const Head: HeadFC<DataProps> = () => <Seo title="Sobre mi" />

export default Index
