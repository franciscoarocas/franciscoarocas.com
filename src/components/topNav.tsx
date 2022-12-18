
import * as React from "react"

import { FormattedMessage } from 'react-intl';

import ESIcon from '../images/es.png'

const links = [
  {
    link : "/",
    name : "contact"
  },
  {
    link : "/about",
    name : "aboutMe"
  },
  {
    link : "/timeline",
    name : "timeLine"
  },
  {
    link : "/hardskills",
    name : "hardSkills"
  }
];

const TopNav = ({currentPage}) => {

  const currentPageURL = currentPage.length > 1 ? currentPage.substring(0, currentPage.length - 1) : currentPage;

  return (
    <nav className="topNav">
      {
        links.map((link, index) => {
          return <li className={currentPageURL === link.link ? "active" : ""}><a href={link.link} key={index}><FormattedMessage id={`menu_${link.name}`}/></a></li>
        })
      }
      {/*<li>Blog</li>*/}
      {<li className="langButton" key={links.length}><img src={ESIcon}/> Español</li>}
    </nav>
  )

};

export default TopNav;