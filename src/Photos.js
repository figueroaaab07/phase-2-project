import React from "react";
import Photo from "./Photo";

function Photos({ photos }) {
  return (
    <div className="row">
      {(photos.photos?.map(photo => <Photo key={photo.id} id={photo.id} src={photo.img_src} />))}
    </div>
  )
}

export default Photos;
