
import * as React from "react"

const Skill = ({name, icon, experience}) => {

  return (
    <div className="technologyIcon">
      {icon}
      <h4>{name}</h4>
    </div>
  )

};

export default Skill;