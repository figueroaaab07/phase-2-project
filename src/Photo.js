import React from "react";

function Photo({ id, src }) {
  return (
    <>
      <img id={id} src={src} /> 
    </>
  )
}

export default Photo;
