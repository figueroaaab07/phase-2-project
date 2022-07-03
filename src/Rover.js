import React, { useEffect } from "react";
import { useParams, useLocation, Outlet } from "react-router-dom";
import Camera from "./Camera";
import Photos from "./Photos";
import { v4 as uuid } from "uuid";

function Rover({ manifests, handleDateChange, date, setDate, isValidDate, setIsValidDate, dateData, handleRadioChange, cameraSelected, photos, setPhotos, isLoading }) {
  let params = useParams();
  const location = useLocation();
  const roverManifest = manifests.filter(rover => rover.name.toLowerCase() === params.roverId);
  let cameras = dateData[0]?.cameras;
  useEffect(() => {
    console.log("Location changed", location);
    setDate("");
    setIsValidDate(false);
    setPhotos([]);
    // eslint-disable-next-line
  }, [location]);
  
  return (
    <>
      <h3>{roverManifest[0]?.name}</h3>
      <p>{`Input Date (YYYY-MM-DD) between ${roverManifest[0]?.landing_date} and ${roverManifest[0]?.max_date}`}</p>
      <input
        type="text"
        id="date"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={handleDateChange}
      /><br></br>
      {isValidDate && (cameras.map(camera => <Camera key={uuid()} camera={camera} handleRadioChange={handleRadioChange} cameraSelected={cameraSelected} />))}<br></br>
      {isValidDate && (cameras.length) && !(isLoading) && <Photos photos={photos} />}<br></br>
      {/* {isValidDate && (cameras.length) && !(isLoading) && (photos.photos?.map(photo => <Photo key={photo.id} id={photo.id} src={photo.img_src} />))}<br></br> */}
      <Outlet />
    </>
  );
}

export default Rover;