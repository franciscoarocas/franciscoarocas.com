import * as React from "react"

import { BiCookie } from 'react-icons/bi';

import { RxCross2 } from 'react-icons/rx';

import { FormattedMessage } from 'react-intl';

const CookiesMessage = () => {

  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <div className="cookieMessageDiv">
      <div className={`cookieMessage ${showMessage ? "" : "hide"}`}>
        <p><FormattedMessage id="cookie_p1"/></p>
        <p><FormattedMessage id="cookie_p2"/></p>
      </div>
      <div className="cookieMessageIcon" onClick={() => { setShowMessage(!showMessage) }}>
        {
          !showMessage ?
          <BiCookie fill="white" size={48}/> : 
          <RxCross2 color="white" size={48}/>
        }
      </div>
    </div>
  );

};

export default CookiesMessage;