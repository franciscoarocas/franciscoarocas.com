
import * as React from "react"

import { Link } from "gatsby"

import {IntlProvider, FormattedMessage } from 'react-intl';
import { useCookies } from 'react-cookie';

import TopNav from '../components/topNav';
import CookiesMessage from "./cookiesMessage";

import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from 'react-icons/ai'

import messages_es from '../../lang/es.json';
import messages_en from '../../lang/en.json';

const messages = {
  'es' : messages_es,
  'en' : messages_en
}

const Layout = ({ location, title, children }) => {
  
  const browserLanguage = navigator.language.split(/[-_]/)[0] === 'es' ? 'es' : 'en';

  const [cookies, setCookie] = useCookies(['lang']);

  const [lang, setLang] = React.useState(cookies['lang'] ? cookies['lang'] : browserLanguage);

  const changeLang = () => {
    if (lang === 'es') {
      setLang('en');
      setCookie('lang', 'en', { path : '/' });
    } else {
      setLang('es');
      setCookie('lang', 'es', { path : '/' });
    }
  }

  return (
    <IntlProvider locale={lang} messages={messages[lang]} defaultLocale="en">
      <div className="global">
        <header className="global-header">
          <h1 className="main-heading">
            <Link to="/">Francisco Arocas</Link>
          </h1>
          <TopNav currentPage={location.pathname} changeLang={changeLang} currentLang={lang}/>
        </header>
        <main className="global-wrapper">{children}</main>
        <footer>
          <div>
            © {new Date().getFullYear()}, {<FormattedMessage id="footer"/>}
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a> {<FormattedMessage id="and"/>} <a href="https://reactjs.org/">ReactJS</a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/francisco-arocas/" target="_blank"><AiFillLinkedin size={24}/></a>
            <a href="https://github.com/franciscoarocas/" target="_blank"><AiFillGithub size={24}/></a>
            <a href="mailto:hola@franciscoarocas.com"><AiOutlineMail size={24}/></a>
          </div>
        </footer>
        <CookiesMessage/>
      </div>
    </IntlProvider>
  )
}

export default Layout
