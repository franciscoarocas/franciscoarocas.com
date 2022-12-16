import * as React from "react"
import { Link } from "gatsby"

import TopNav from '../components/topNav';

const Layout = ({ location, title, children }) => {
  
  //const rootPath = `${__PATH_PREFIX__}/`
  //const isRootPath = location.pathname === rootPath


  return (
    <div className="global">
      <header className="global-header">
        <h1 className="main-heading">
          <Link to="/">Francisco Arocas</Link>
        </h1>
        <TopNav/>
      </header>
      <main className="global-wrapper">{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
