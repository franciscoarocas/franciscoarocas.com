import * as React from "react"
import { Link } from "gatsby"

import TopNav from '../components/topNav';

import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from 'react-icons/ai'

const Layout = ({ location, title, children }) => {
  
  //const rootPath = `${__PATH_PREFIX__}/`
  //const isRootPath = location.pathname === rootPath

  return (
    <div className="global">
      <header className="global-header">
        <h1 className="main-heading">
          <Link to="/">Francisco Arocas</Link>
        </h1>
        <TopNav currentPage={location.pathname}/>
      </header>
      <main className="global-wrapper">{children}</main>
      <footer>
        <div>
          © {new Date().getFullYear()}, Built with ❤ using
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a> and <a href="https://reactjs.org/">ReactJS</a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/francisco-arocas/" target="_blank"><AiFillLinkedin size={24}/></a>
          <a href="https://github.com/franciscoarocas/" target="_blank"><AiFillGithub size={24}/></a>
          <a href="mailto:hola@franciscoarocas.com"><AiOutlineMail size={24}/></a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
