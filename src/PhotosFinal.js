import React from "react";
import Photo from "./Photo";

function Photos({ photos, log, setLog }) {
  return (
    <div className="row">
      {(photos.photos?.map(photo => <Photo key={photo.id} id={photo.id} src={photo.img_src} log={log} setLog={setLog} />))}
    </div>
  )
}

export default Photos;
