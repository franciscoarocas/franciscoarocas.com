
import * as React from "react"

const TimeLineItem = ({name, period, description}) => {

  return (
    <div className="timeLineItem">
      <div style={{display : "flex", alignItems : 'center'}}>
      <div>
        <div className="timeLineTitle">
          <span className="ball"/>
          <h2>{name}</h2>
        </div>
      </div>
      </div>
      <div style={{borderLeft : '1px solid black', paddingLeft : '2rem', paddingBottom : '5px', marginBottom: '15px'}}>
        <h6 style={{display : 'inline-block', margin: "0", paddingBottom : '5px', textDecoration : 'underline'}}>{period}</h6>
        <div>{description}</div>
      </div>
    </div>
  );

};

export default TimeLineItem;