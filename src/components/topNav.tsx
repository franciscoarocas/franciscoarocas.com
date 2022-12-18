
import * as React from "react"

import { useCookies } from 'react-cookie';

import { FormattedMessage } from 'react-intl';

import ESIcon from '../images/es.png'
import ENIcon from '../images/gb.png'

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

const TopNav = ({currentPage, changeLang, currentLang}) => {

  const currentPageURL = currentPage.length > 1 ? currentPage.substring(0, currentPage.length - 1) : currentPage;


  const generateLangIcon = () => {

    if (currentLang === 'es') {
      return (
        <>
          <img src={ENIcon}/> English
        </>
      )
    } else {
      return (
        <>
          <img src={ESIcon}/> Español
        </>
      );
    }
  }


  return (
    <nav className="topNav">
      {
        links.map((link, index) => {
          return <li className={currentPageURL === link.link ? "active" : ""}><a href={link.link} key={index}><FormattedMessage id={`menu_${link.name}`}/></a></li>
        })
      }
      {/*<li>Blog</li>*/}
      {<li onClick={changeLang} className="langButton" key={links.length}>{generateLangIcon()}</li>}
    </nav>
  )

};

export default TopNav;