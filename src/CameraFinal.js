import React from "react";

function Camera({ camera, handleRadioChange, cameraSelected }) {
  return (
    <>
      <input type="radio" id={camera} name={camera} value={camera} checked={cameraSelected === camera} onChange={handleRadioChange}/>
      <label htmlFor={camera}>{camera}</label>
    </>
  )
}

export default Camera;
