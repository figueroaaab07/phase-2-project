import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Rovers from "./Rovers";
import Rover from "./Rover";
import About from "./About";
import NoMatch from "./NoMatch";
// import Photo from "./Photo";
// import { findAllByAltText } from "@testing-library/react";

function App() {
  // const [rovers, setRovers] = useState([
  //   { id: '1', name: 'Opportunity' },
  //   { id: '2', name: 'Spirit' },
  //   { id: '3', name: 'Curiosity'}
  // ]);
  const [curiosityData, setCuriosityData] = useState([]);
  const [opportunityData, setOpportunityData] = useState([]);
  const [spiritData, setSpiritData] = useState([]);
  const [manifests, setManifests] = useState([]);
  const [date, setDate] = useState("");
  const [dateData, setDateData] = useState([]);
  // const [cameras, setCameras] = useState([]);
  const [isValidDate, setIsValidDate] = useState(false);
  const [cameraSelected, setCameraSelected] = useState("");
  const [roverSelected, setRoverSelected] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:6001/manifests")
      .then((r) => r.json())
      .then((data) => {
        setManifests(data);
      })
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:6001/curiosity")
      .then((r) => r.json())
      .then((data) => {
        setCuriosityData(data);
      })
  }, []);

  useEffect(() => {
    fetch("http://localhost:6001/opportunity")
      .then((r) => r.json())
      .then((data) => {
        setOpportunityData(data);
      })
  }, []);

  useEffect(() => {
    fetch("http://localhost:6001/spirit")
      .then((r) => r.json())
      .then((data) => {
        setSpiritData(data);
      })
  }, []);

  // useEffect(() => {
  //   console.log(date);
  //   console.log(dateData);
  //   console.log(isValidDate);
  // }, [date, dateData, isValidDate]);

  function handleDateChange(event) {
    const dateInput = event.target.value;
    let cameras;
    setCameraSelected("");
    setIsValidDate(false);
    if (dateInput.length === 10) {
      const rover = event.target.parentElement.parentElement.querySelector('h3').innerText.toLowerCase() || "";
      setRoverSelected(rover);
      // const dateData = (eval(`${rover}Data`)).filter(rover => rover.earth_date === dateInput);
      setDateData((eval(`${rover}Data`)).filter(rover => rover.earth_date === dateInput));
      setDateData((state) => {
        cameras = state[0]?.cameras;
        if (!(cameras === undefined)) {
          (cameras.length) ? setIsValidDate(true) : setIsValidDate(false);
        } else {
          setIsValidDate(false);
          cameras = [];
        }      
        return state;
      });
      console.log(cameras);
      // let cameras = dateData[0]?.cameras;
      // if (!(cameras === undefined)) {
      //   (cameras.length) ? setIsValidDate(true) : setIsValidDate(false);
      // }
      console.log(dateData);
    }
    setDate(dateInput);
  }

  function handleDateSubmit(e) {
    e.preventDefault();
    setDate(date);
  }

  function handleRadioChange(e) {
    setCameraSelected(e.target.value);
    setIsLoading(true);
    console.log(e.target.value);
    console.log(roverSelected);
    console.log(date);
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverSelected}/photos?earth_date=${date}&camera=${e.target.value}&page=1&api_key=ousVxXPBdjpMGLhVTASFubjk0WQNgZ8OpKuBMzkg`)
      .then((r) => r.json())
      .then((data) => setPhotos(data))
      // .then(console.log(photos))
      .then(setIsLoading(false))
      // .then(console.log(photos));
  }

  return (
    <>
      <h1>The Mars Exploration Rovers: with the Opportunity, the Spirit and the Curiosity</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rovers" element={<Rovers opportunityData={opportunityData} spiritData={spiritData} curiosityData={curiosityData} manifests={manifests} handleDateChange={handleDateChange} handleDateSubmit={handleDateSubmit} date={date} setDate={setDate} isValidDate={isValidDate} setIsValidDate={setIsValidDate} dateData={dateData} handleRadioChange={handleRadioChange} cameraSelected={cameraSelected} photos={photos} isLoading={isLoading} />} >
          <Route path=":roverId" element={<Rover opportunityData={opportunityData} spiritData={spiritData} curiosityData={curiosityData} manifests={manifests} handleDateChange={handleDateChange} handleDateSubmit={handleDateSubmit} date={date} isValidDate={isValidDate} setIsValidDate={setIsValidDate} setDate={setDate} dateData={dateData} handleRadioChange={handleRadioChange} cameraSelected={cameraSelected} photos={photos} isLoading={isLoading} />} />
            {/* <Route path="photos" element={<Photos date={date} roverSelected={roverSelected} cameraSelected={cameraSelected} photos={photos} setPhotos={setPhotos} />} />
          </Route> */}
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App;
