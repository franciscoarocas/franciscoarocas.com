import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import "../styles/index.scss"

import Layout from "../components/layout"
import SEO from "../components/seo"

/*
  <p>You can <a href="malito:franciscoarocash@gmail.com">contact me</a> our check out <a href="https://github.com/franciscoarocas">my github</a>.</p>
*/

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
        <Layout id="flex" location={location} title={siteTitle}>
          <SEO title="Home" />
          <Helmet>
            <script src="index.js" defer/>
          </Helmet>
            <div id="about">
              <h2><em>Hello, </em></h2>
              <h1>I'am Francisco Arocas</h1>
              <h2><em>Computer Engineer</em> <span role="img" aria-label="computer">💻</span> </h2>
              <div className="square"></div>
            </div>
            <canvas id="indexBackground"></canvas>
        </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
