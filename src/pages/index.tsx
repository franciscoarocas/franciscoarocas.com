// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { FormattedMessage } from 'react-intl';

import { AiFillLinkedin, AiFillGithub, AiOutlineMail, AiFillMediumSquare  } from 'react-icons/ai'

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
      <h1>💻 Software Engineer</h1>
      <p><FormattedMessage id="index_text"/></p>
      <div className="homeSocialIcons">
        <a href="https://www.linkedin.com/in/francisco-arocas/" target="_blank"><div className="socialButton"><AiFillLinkedin size={24}/> Linkedin</div></a>
        <a href="https://github.com/franciscoarocas/" target="_blank"><div className="socialButton"><AiFillGithub size={24}/> GitHub</div></a>
        <a href="https://blog.franciscoarocas.com" target="_blank"><div className="socialButton"><AiFillMediumSquare size={24}/> Medium</div></a>
        <a href="mailto:hola@franciscoarocas.com"><div className="socialButton"><AiOutlineMail size={24}/> Email</div></a>
      </div>
    </Layout>
  )

}

export const Head: HeadFC<DataProps> = () => <Seo title="Home" />

export default Index
