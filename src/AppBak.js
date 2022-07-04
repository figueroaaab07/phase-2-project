import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Rovers from "./Rovers";
import Rover from "./Rover";
import About from "./About";
import NoMatch from "./NoMatch";

function App() {
  const [manifests, setManifests] = useState([]);
  // eslint-disable-next-line
  const [curiosityData, setCuriosityData] = useState([]);
  // eslint-disable-next-line
  const [opportunityData, setOpportunityData] = useState([]);
  // eslint-disable-next-line
  const [spiritData, setSpiritData] = useState([]);
  const [date, setDate] = useState("");
  const [dateData, setDateData] = useState([]);
  const [isValidDate, setIsValidDate] = useState(false);
  const [cameraSelected, setCameraSelected] = useState("");
  const [roverSelected, setRoverSelected] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getManifests() {
    let response = await fetch(
      "http://localhost:6001/manifests"
    );
    const json = await response.json();
    setManifests(json);
  }

  useEffect(() => {
    getManifests();
  }, []);

  async function getCuriosityData() {
    let response = await fetch(
      "http://localhost:6001/curiosity"
    );
    const json = await response.json();
    setCuriosityData(json);
  }

  useEffect(() => {
    getCuriosityData();
  }, []);

  async function getOpportunityData() {
    let response = await fetch(
      "http://localhost:6001/opportunity"
    );
    const json = await response.json();
    setOpportunityData(json);
  }

  useEffect(() => {
    getOpportunityData();
  }, []);

  async function getSpiritData() {
    let response = await fetch(
      "http://localhost:6001/spirit"
    );
    const json = await response.json();
    setSpiritData(json);
  }

  useEffect(() => {
    getSpiritData();
  }, []);


  function handleDateChange(event) {
    const dateInput = event.target.value;
    let cameras;
    setCameraSelected("");
    setIsValidDate(false);
    setPhotos([]);
    if (dateInput.length === 10) {
      const rover = event.target.parentElement.parentElement.querySelector('h3').innerText.toLowerCase() || "";
      setRoverSelected(rover);
      // eslint-disable-next-line
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
    }
    setDate(dateInput);
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
      .then(setIsLoading(false))
  }

  return (
    <>
      <h1 className="header">The Mars Exploration Rovers</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rovers" element={<Rovers manifests={manifests} />} >
          <Route path=":roverId" element={<Rover manifests={manifests} handleDateChange={handleDateChange} date={date} setDate={setDate} isValidDate={isValidDate} setIsValidDate={setIsValidDate} dateData={dateData} handleRadioChange={handleRadioChange} cameraSelected={cameraSelected} photos={photos} setPhotos={setPhotos} isLoading={isLoading} />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App;
