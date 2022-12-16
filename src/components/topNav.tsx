import * as React from "react"
import { Link } from "gatsby"

const TopNav = () => {

  return (
    <nav className="topNav">
      <li>Home</li>
      <li>About Me</li>
      <li>TimeLine</li>
      <li>Hard Skills</li>
      {/*<li>Blog</li>*/}
      <li>Contact</li>
    </nav>
  )

};

export default TopNav;