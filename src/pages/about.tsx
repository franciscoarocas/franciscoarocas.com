// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"

import { FormattedMessage } from 'react-intl';

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
      <h1>📝 <FormattedMessage id="about_title"/></h1>
      <p><FormattedMessage id="about_text1"/></p>
      <p><FormattedMessage id="about_text2"/></p>
      <p><FormattedMessage id="about_text3"/></p>
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
