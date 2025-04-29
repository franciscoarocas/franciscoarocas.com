
import * as React from "react"

import { FormattedMessage } from 'react-intl';

import ESIcon from '../images/es.png'
import ENIcon from '../images/gb.png'

import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';

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

  const [show, setShow] = React.useState(false);

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
    <>
      <nav className={`topNav ${show ? "showMobile" : ""}`}>
        {
          links.map((link, index) => {
            return <li className={currentPageURL === link.link ? "active" : ""}><a href={link.link} key={index} ><FormattedMessage id={`menu_${link.name}`}/></a></li>
          })
        }
        {<li><a href="https://blog.franciscoarocas.com" key={links.length} target="_blank" rel="noopener noreferrer"><FormattedMessage id={'Blog'}/></a></li>}
        {<li onClick={changeLang} className="langButton" key={links.length}>{generateLangIcon()}</li>}
        {<li className="mobileClose" key={links.length + 1} onClick={() => setShow(false)}><RxCross2 size={24}/></li>}
      </nav>
      <div className="topMenuButton" onClick={() => setShow(true)}>
        <RxHamburgerMenu/>
      </div>
    </>
  )

};

export default TopNav;