import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

// Iconos de tecnologías, lenguajes de programación y frameworks: https://devicon.dev/

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Proyects" />
      <h1>Proyects!</h1>
      <p>You can <a href="malito:franciscoarocash@gmail.com">contact me</a> our check out <a href="https://github.com/franciscoarocas">my github</a>.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
