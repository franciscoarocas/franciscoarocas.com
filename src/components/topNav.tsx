
import * as React from "react"

import ESIcon from '../images/es.png'

const links = [
  {
    link : "/",
    name : "Contact"
  },
  {
    link : "/about",
    name : "About Me"
  },
  {
    link : "/timeline",
    name : "TimeLine"
  },
  {
    link : "/hardskills",
    name : "HardSkills"
  }
];

const TopNav = ({currentPage}) => {

  const currentPageURL = currentPage.length > 1 ? currentPage.substring(0, currentPage.length - 1) : currentPage;

  return (
    <nav className="topNav">
      {
        links.map((link, index) => {
          console.log(currentPageURL === link.link)
          return <li className={currentPageURL === link.link ? "active" : ""}><a href={link.link} key={index}>{link.name}</a></li>
        })
      }
      {/*<li>Blog</li>*/}
      {<li className="langButton" key={links.length}><img src={ESIcon}/> Español</li>}
    </nav>
  )

};

export default TopNav;