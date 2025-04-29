import * as React from "react";
import { Link } from "gatsby";
import { IntlProvider, FormattedMessage } from "react-intl";

import TopNav from "../components/topNav";
import CookiesMessage from "./cookiesMessage";

import { AiFillLinkedin, AiFillGithub, AiOutlineMail, AiFillMediumSquare } from "react-icons/ai";

import messages_es from "../../lang/es.json";
import messages_en from "../../lang/en.json";

const messages = {
  es: messages_es,
  en: messages_en,
};

const Layout = ({ location, title, children }) => {
  const [lang, setLang] = React.useState("en");
  const [setCookie, setSetCookie] = React.useState(() => () => {});
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Solo en cliente: importar y usar useCookies
    const { useCookies } = require("react-cookie");
    const [cookies, actualSetCookie] = useCookies(["lang"]);

    const savedLang = cookies["lang"] || "en";
    setLang(savedLang);
    setSetCookie(() => actualSetCookie);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const changeLang = () => {
    const newLang = lang === "es" ? "en" : "es";
    setLang(newLang);
    setCookie("lang", newLang, { path: "/" });
  };

  return (
    <IntlProvider locale={lang} messages={messages[lang]} defaultLocale="en">
      <div className="global">
        <header className="global-header">
          <h1 className="main-heading">
            <Link to="/">Francisco Arocas</Link>
          </h1>
          <TopNav currentPage={location.pathname} changeLang={changeLang} currentLang={lang} />
        </header>
        <main className="global-wrapper">{children}</main>
        <footer>
          <div className="credits">
            © {new Date().getFullYear()}, <FormattedMessage id="footer" />{" "}
            <a href="https://www.gatsbyjs.com">Gatsby</a> <FormattedMessage id="and" />{" "}
            <a href="https://reactjs.org/">ReactJS</a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/francisco-arocas/" target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin size={24} />
            </a>
            <a href="https://github.com/franciscoarocas/" target="_blank" rel="noopener noreferrer">
              <AiFillGithub size={24} />
            </a>
            <a href="https://blog.franciscoarocas.com" target="_blank" rel="noopener noreferrer">
              <AiFillMediumSquare size={24} />
            </a>
            <a href="mailto:hola@franciscoarocas.com">
              <AiOutlineMail size={24} />
            </a>
          </div>
        </footer>
        <CookiesMessage />
      </div>
    </IntlProvider>
  );
};

export default Layout;
