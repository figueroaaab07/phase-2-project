import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Rovers from "./Rovers";
import Rover from "./Rover";
import About from "./About";
import NoMatch from "./NoMatch";
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
    if (dateInput.length === 10) {
      const rover = event.target.parentElement.parentElement.querySelector('h3').innerText.toLowerCase() || "";
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

  return (
    <>
      <h1>The Mars Exploration Rovers: with the Opportunity, the Spirit and the Curiosity</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rovers" element={<Rovers opportunityData={opportunityData} spiritData={spiritData} curiosityData={curiosityData} manifests={manifests} handleDateChange={handleDateChange} handleDateSubmit={handleDateSubmit} date={date} isValidDate={isValidDate} dateData={dateData} />} >
          <Route
            path=":roverId"
            element={<Rover opportunityData={opportunityData} spiritData={spiritData} curiosityData={curiosityData} manifests={manifests} handleDateChange={handleDateChange} handleDateSubmit={handleDateSubmit} date={date} isValidDate={isValidDate} dateData={dateData} />}
            />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App;
