import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Rovers from "./Rovers";
import Rover from "./Rover";
import About from "./About";
import Logger from "./Logger";
import NoMatch from "./NoMatch";

function App() {
  // const [curiosityActual, setCuriosityActual] = useState([]);
  // const [cALoading, setCALoading] = useState(true);
  // const [perseveranceActual, setPerseveranceActual] = useState([]);
  // const [pALoading, setPALoading] = useState(true);

  const [manifests, setManifests] = useState([]);
  // const [mLoading, setMLoading] = useState(true);
  // eslint-disable-next-line
  const [perseveranceData, setPerseveranceData] = useState([]);
  // const [pDLoading, setPDLoading] = useState(true);
  // eslint-disable-next-line
  const [curiosityData, setCuriosityData] = useState([]);
  // const [cDLoading, setCDLoading] = useState(true);
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
  // eslint-disable-next-line
  const [log, setLog] = useState([]);

  // async function getCuriosityActual() {
  //   const response = await fetch(
  //     "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=ousVxXPBdjpMGLhVTASFubjk0WQNgZ8OpKuBMzkg"
  //   );
  //   const json = await response.json();
  //   setCuriosityActual(json);
  //   setCALoading(false);
  // }

  // useEffect(() => {
  //   getCuriosityActual();
  // }, []);

  // async function getPerseveranceActual() {
  //   const response = await fetch(
  //     "https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance?api_key=ousVxXPBdjpMGLhVTASFubjk0WQNgZ8OpKuBMzkg"
  //   );
  //   const json = await response.json();
  //   setPerseveranceActual(json);
  //   setPALoading(false);
  // }

  // useEffect(() => {
  //   getPerseveranceActual();
  // }, []);

  async function getManifests() {
    let response = await fetch(
      "http://localhost:4001/manifests"
    );
    const json = await response.json();
    setManifests(json);
    // setMLoading(false);
  }

  useEffect(() => {
    getManifests();
  }, []);

  async function getPerseveranceData() {
    let response = await fetch(
      "http://localhost:4001/perseverance"
    );
    const json = await response.json();
    setPerseveranceData(json);
    // setPDLoading(false);
  }

  useEffect(() => {
    getPerseveranceData();
  }, []);

  async function getCuriosityData() {
    let response = await fetch(
      "http://localhost:4001/curiosity"
    );
    const json = await response.json();
    setCuriosityData(json);
    // setCDLoading(false);
  }

  useEffect(() => {
    getCuriosityData();
  }, []);
  
  async function getOpportunityData() {
    let response = await fetch(
      "http://localhost:4001/opportunity"
    );
    const json = await response.json();
    setOpportunityData(json);
  }

  useEffect(() => {
    getOpportunityData();
  }, []);

  async function getSpiritData() {
    let response = await fetch(
      "http://localhost:4001/spirit"
    );
    const json = await response.json();
    setSpiritData(json);
  }

  useEffect(() => {
    getSpiritData();
  }, []);

  async function getLogs() {
    let response = await fetch(
      "http://localhost:4001/log"
    );
    const json = await response.json();
    setLog(json);
  }

  useEffect(() => {
    getLogs();
  }, [isValidDate]);

  function handleDateChange(event) {
    const dateInput = event.target.value;
    let cameras;
    setCameraSelected("");
    setIsValidDate(false);
    setPhotos([]);
    if (dateInput.length === 10) {
      const rover = event.target.parentElement.parentElement.querySelector('h3').innerText.toLowerCase() || "";
      console.log(rover);
      setRoverSelected(rover);
      // eslint-disable-next-line
      setDateData((eval(`${rover}Data`)).filter(rover => rover.earth_date === dateInput));
      setDateData((state) => {
        cameras = state[0]?.cameras;
        console.log(state);
        if (!(cameras === undefined)) {
          (cameras.length) ? setIsValidDate(true) : setIsValidDate(false);
        } else {
          setIsValidDate(false);
          cameras = [];
        }
        console.log("Cameras:", cameras)
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

  // function updateRover(actual, data, setData, manifests, aLoading, dLoading, mLoading) {
  //   if(aLoading || dLoading || mLoading) {
  //     return <div>Loading...</div>
  //   } else {
  //     const newDates = actual.photo_manifest.photos.filter(photo => photo.sol > manifests[0].max_sol);
  //     console.log(newDates);

  //     newDates.forEach(newDate => console.log(JSON.stringify(newDate)))
  //   }
  // }

  // updateRover(curiosityActual, curiosityData, setCuriosityData, manifests, cALoading, cDLoading, mLoading);
  // updateRover(perseveranceActual, perseveranceData, setPerseveranceData, manifests, pALoading, pDLoading, mLoading);

  return (
    <>
      <h1 className="header">The Mars Exploration Rovers</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rovers" element={<Rovers manifests={manifests} />} >
          <Route path=":roverId" element={<Rover manifests={manifests} handleDateChange={handleDateChange} date={date} setDate={setDate} isValidDate={isValidDate} setIsValidDate={setIsValidDate} dateData={dateData} handleRadioChange={handleRadioChange} cameraSelected={cameraSelected} photos={photos} setPhotos={setPhotos} isLoading={isLoading} log={log} setLog={setLog} />} />
        </Route>
        <Route path="/logger" element={<Logger log={log} setLog={setLog} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App;
