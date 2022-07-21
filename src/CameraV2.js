import React from "react";

function Camera({ camera, handleRadioChange, cameraSelected }) {
  return (
    <div className="column">
      <input type="radio" id={camera} name={camera} value={camera} checked={cameraSelected === camera} onChange={handleRadioChange}/>
      <label htmlFor={camera}>{camera}</label>
    </div>
  )
}

export default Camera;
