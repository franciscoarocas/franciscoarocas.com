// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from 'react-icons/ai'

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
      <p>Hola, soy Francisco Arocas, un Ingeniero de Software actualmente viviendo y trabajando en Tenerife.</p>
      <div>
        <div className="socialButton"><AiFillLinkedin size={24}/> Linkedin</div>
        <div className="socialButton"><AiFillGithub size={24}/> GitHub</div>
        <div className="socialButton"><AiOutlineMail size={24}/> Email</div>
      </div>
    </Layout>
  )

}

export const Head: HeadFC<DataProps> = () => <Seo title="Sobre mi" />

export default Index
