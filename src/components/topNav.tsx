
import * as React from "react"

const TopNav = () => {

  return (
    <nav className="topNav">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About Me</a></li>
      <li><a href="/timeline">TimeLine</a></li>
      <li>Hard Skills</li>
      {/*<li>Blog</li>*/}
      <li>Contact</li>
    </nav>
  )

};

export default TopNav;