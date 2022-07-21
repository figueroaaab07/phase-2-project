import React, { useEffect } from "react";
import { useParams, useLocation, Outlet } from "react-router-dom";
import Camera from "./Camera";
import Photos from "./Photos";
import { v4 as uuid } from "uuid";

function Rover({ manifests, handleDateChange, date, setDate, isValidDate, setIsValidDate, dateData, handleRadioChange, cameraSelected, photos, setPhotos, isLoading, log, setLog }) {
  let params = useParams();
  // console.log(params);
  const location = useLocation();
  const roverManifest = manifests.filter(rover => rover.name.toLowerCase() === params.roverId);
  // console.log(roverManifest);
  let cameras = dateData[0]?.cameras;
  // console.log(cameras);
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
      <h4>{`Input Date (YYYY-MM-DD) between ${roverManifest[0]?.landing_date} and ${roverManifest[0]?.max_date}`}</h4>
      <input
        type="text"
        id="date"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={handleDateChange}
      /><br></br>
      {isValidDate && (
        <>
          <h4>Select Camera</h4>
          <h5>Important Note: If the date is invalid, out of range or the Rover did no take photos on that date, no selection will be displayed</h5>
        </>)}
      {isValidDate && (
        <div className="row">
          {cameras.map(camera => <Camera key={uuid()} camera={camera} handleRadioChange={handleRadioChange} cameraSelected={cameraSelected} />)}
        </div>
      )}<br></br>

      {isValidDate && (cameras.length) && !(isLoading) && <Photos photos={photos} log={log} setLog={setLog} />}
      <Outlet />
    </>
  );
}

export default Rover;