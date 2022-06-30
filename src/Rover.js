import React from "react";
import { useParams } from "react-router-dom";

function Rover({ opportunityData, spiritData, curiosityData, manifests, handleDateChange, handleDateSubmit, date, isValidDate, dateData }) {
  let params = useParams();
  const roverManifest = manifests.filter(rover => rover.name.toLowerCase() === params.roverId);
  let cameras = dateData[0]?.cameras;
  console.log(roverManifest[0]?.name);
  console.log(dateData[0]?.cameras);
  console.log(isValidDate);
  return (
    <>
      <h3>{roverManifest[0]?.name}</h3>
      <p>{`Input Date between ${roverManifest[0]?.landing_date} and ${roverManifest[0]?.max_date} in format YYYY-MM-DD`}</p>
      {/* <form className="datebar" onSubmit={handleDateSubmit}> */}
        <input
          type="text"
          id="date"
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={handleDateChange}
        /><br></br>
        {isValidDate && (cameras.map(camera => <input key={camera} id={camera} type="radio" name={camera} value={camera} />))}
        {/* (cameras.map(camera => {<><input key={camera} id={camera} type="radio" name={camera} value={camera} /> <label htmlFor={camera}>{camera}</label></>}
          ))} */}
        {/* <button type="submit">🔍</button> */}
      {/* </form> */}
    </>
  );
}

export default Rover;