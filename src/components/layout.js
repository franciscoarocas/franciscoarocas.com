import React from "react"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

import { Githubicon, Linkedinicon, Mailicon } from "../utils/icons"

const pageNames = ['About', 'Proyects', 'Contact']; // 'Blog',

const menuItems = pageNames.map((page) => 
	<li key={page} style ={{
			display: `inline-block`,
		}}>
			<Link style={{
				color: `inherit`,
				marginRight: `1rem`,
			}} to={page === 'About' ? '/' : '/' + page.toLowerCase()}>{page}
			</Link>
	</li>
);

const Layout = ({ location, title, children }) => {
  let header, menu

    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
		  float: `left`,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
	
	menu = (
		<ul style={{
			float: `right`,
		}}>{menuItems}</ul>
  )

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
	  {menu}
      <main style={{clear: `both`}}>{children}</main>
      <footer>
        <div style={{float: `left`}} className="bottomIcons">
          <Link style={{color: `inherit`, boxShadow: `none`}} href="https://github.com/franciscoarocas" target="_blank" rel="noreferrer">
            <Githubicon />
          </Link>
          <Link style={{color: `inherit`, boxShadow: `none`}} href="https://www.linkedin.com/in/francisco-arocas/" target="_blank" rel="noreferrer">
            <Linkedinicon />
          </Link>
          <Link style={{color: `inherit`, boxShadow: `none`}} href="malito:franciscoarocash@gmail.com">
            <Mailicon />
          </Link>
        </div>
        <div style={{float: `right`}}>
          {new Date().getFullYear()}
          &nbsp;-&nbsp;
          <a href="https://franciscoarocas.com" style={{color: `inherit`}}>Francisco Arocas</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
