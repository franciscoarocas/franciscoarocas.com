import * as React from "react"

import { RxCross2 } from 'react-icons/rx';

const SkillSearch = ({showDeleteIcon, setSkillInputValue}) => {

  return (
    <div className="hardSkillSearch">
      <input placeholder="Filtrar" onChange={(e : React.ChangeEvent<HTMLInputElement>) => { setSkillInputValue(e.target.value.toLowerCase()) }}/>
      {showDeleteIcon && <div className="hardSkillIcon" onClick={(_ : React.MouseEvent<HTMLInputElement>) => { setSkillInputValue("") }}><RxCross2 size={24}/></div>}
    </div>
  );

};

export default SkillSearch;