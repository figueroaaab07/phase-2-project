import React from "react";

function Photo({ id, src }) {
  return (
    <div className="column">
      <img id={id} alt="Mars" src={src} width="100%"/> 
    </div>
  )
}

export default Photo;
