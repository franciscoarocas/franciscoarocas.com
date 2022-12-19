import * as React from "react"

import { BiCookie } from 'react-icons/bi';

import { RxCross2 } from 'react-icons/rx';

const CookiesMessage = () => {

  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <div className="cookieMessageDiv">
      <div className={`cookieMessage ${showMessage ? "" : "hide"}`}>
        <p>En esta web solo utilizamos cookies para el cambio de idiomas.</p>
        <p>Al cambiar el idioma, se almacena este en una cookie.</p>
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