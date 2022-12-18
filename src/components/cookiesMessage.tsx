import * as React from "react"

import { BiCookie } from 'react-icons/bi';

const CookiesMessage = () => {

  return (
    <div className="cookieMessageDiv">
      <div className="cookieMessage">
        En esta web solo utilizamos cookies para el cambio de idiomas
      </div>
      <div className="cookieMessageIcon">
        <BiCookie fill="white" size={48}/>
      </div>
    </div>
  );

};

export default CookiesMessage;