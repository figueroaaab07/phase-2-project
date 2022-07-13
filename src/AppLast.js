import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Rovers from "./RoversLast";
import Rover from "./Rover";
import About from "./About";
import NoMatch from "./NoMatch";
import UpdateCuriosity from "./UpdateCuriosity";

function App() {
  const [data, setData] = useState([]);
  const [curiosityActual, setCuriosityActual] = useState([]);
  const [cALoading, setCALoading] = useState(true);
  // const [opportunityActual, setOpportunityActual] = useState([]);
  // const [oALoading, setOALoading] = useState(true);
  // const [spiritActual, setSpiritActual] = useState([]);
  // const [sALoading, setSALoading] = useState(true);
  const [manifests, setManifests] = useState([]);
  const [mLoading, setMLoading] = useState(true);
  // eslint-disable-next-line
  const [curiosityData, setCuriosityData] = useState([]);
  const [cDLoading, setCDLoading] = useState(true);
  // eslint-disable-next-line
  const [opportunityData, setOpportunityData] = useState([]);
  const [oDLoading, setODLoading] = useState(true);
  // eslint-disable-next-line
  const [spiritData, setSpiritData] = useState([]);
  const [sDLoading, setSDLoading] = useState(true);
  const [date, setDate] = useState("");
  const [dateData, setDateData] = useState([]);
  const [isValidDate, setIsValidDate] = useState(false);
  const [cameraSelected, setCameraSelected] = useState("");
  const [roverSelected, setRoverSelected] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newDates, setNewDates] = useState([]);

  async function getCuriosityActual() {
    const response = await fetch(
      "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=ousVxXPBdjpMGLhVTASFubjk0WQNgZ8OpKuBMzkg"
    );
    const json = await response.json();
    setCuriosityActual(() => json);
    setCALoading(false);
    postCuriosityData(json.photo_manifest);
  }
  
  useEffect(() => {
    getCuriosityActual();
  }, []);
  

  async function postCuriosityData(newDates) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDates)
    };
    const response = await fetch('http://localhost:6001/manifests', requestOptions);
    const json = await response.json();
    const photos = await json[0].photos;
    setCuriosityData(photos);
    setCDLoading(false);
  }
  
  useEffect(() => {
    postCuriosityData()
  }, []);


// !(cALoading || oDLoading || sDLoading) ? <UpdateCuriosity curiosityActual={curiosityActual} setCuriosityData={setCuriosityData} setCDLoading={setCDLoading} /> : null;
  // async function getOpportunityActual() {
  //   let response = await fetch(
  //     "https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=ousVxXPBdjpMGLhVTASFubjk0WQNgZ8OpKuBMzkg"
  //   );
  //   const json = await response.json();
  //   setOpportunityActual(json);
  //   setOALoading(false);
  // }

  // useEffect(() => {
  //   getOpportunityActual();
  // }, []);

  // async function getSpiritActual() {
  //   let response = await fetch(
  //     "https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=ousVxXPBdjpMGLhVTASFubjk0WQNgZ8OpKuBMzkg"
  //   );
  //   const json = await response.json();
  //   setSpiritActual(json);
  //   setSALoading(false);
  // }

  // useEffect(() => {
  //   getSpiritActual();
  // }, []);

  async function getManifests() {
    let response = await fetch(
      "http://localhost:6001/manifests"
    );
    const json = await response.json();
    setManifests(json);
    setOpportunityData(() => json[0].name="Opportunity"&&json[0].photos);
    setODLoading(false);
    setSpiritData(() => json[0].name="Spirit"&&json[0].photos);
    setSDLoading(false);
    setMLoading(false);
  }

  useEffect(() => {
    getManifests();
  }, []);

  // async function getCuriosityData() {
  //   let response = await fetch(
  //     "http://localhost:6001/curiosity"
  //   );
  //   const json = await response.json();
  //   setCuriosityData(json);
  //   setCDLoading(false);
  // }

  // useEffect(() => {
  //   getCuriosityData();
  // }, []);

  // async function getOpportunityData() {
  //   let response = await fetch(
  //     "http://localhost:6001/manifests"
  //   );
  //   const json = await response.json();
  //   setOpportunityData(json);
  // }

  // useEffect(() => {
  //   getOpportunityData();
  // }, []);

  // async function getSpiritData() {
  //   let response = await fetch(
  //     "http://localhost:6001/manifests"
  //   );
  //   const json = await response.json();
  //   setSpiritData(json);
  // }

  // useEffect(() => {
  //   getSpiritData();
  // }, []);


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

  // function updateDb(curiosityData, cDLoading) {
  //   if(cDLoading) {
  //     return <div>Loading...</div>
  //   } else {
  //     curiosityData.forEach((item, index) => item.id = index);
  //     console.log(curiosityData);

  //     curiosityData.forEach(newDate => {
  //       fetch("http://localhost:6001/curiosityId", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newDate),
  //       })
  //       .then((r) => r.json())
  //       // .then((newItem) => setData([...data, newItem]));
  //     }
  //     )
  //   }
  // }

  // updateDb(curiosityData, cDLoading);

  // async function postCuriosityData(newDates) {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newDates)
  //   };
  //   const response = await fetch('http://localhost:6001/manifests', requestOptions);
  //   const json = await response.json();
  //   setCuriosityData(() => json[0].photos);
  //   setCDLoading(false);
  //   setMLoading(false);
  // }

  // function loadRoverManifests() {
  //   if(!(cDLoading)) {
  //     return <div></div>
  //   } else if(cALoading || oDLoading || sDLoading) {
  //     return <div>Loading...</div>
  //   } else {
  //     // setNewDates(curiosityActual.photo_manifest.photos.filter(photo => photo.sol > manifests[0].max_sol));
  //     postCuriosityData(curiosityActual.photo_manifest);
  //   }
  // }

  // loadRoverManifests()
  //     return (
  //       <>
  //         <UpdateCuriosity curiosityActual={curiosityActual} manifests={manifests} newDates={newDates} setNewDates={setNewDates} />
  //         <h1 className="header">The Mars Exploration Rovers</h1>
  //         <NavBar />
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/about" element={<About />} />
  //           <Route path="/rovers" element={<Rovers manifests={manifests} />} >
  //             <Route path=":roverId" element={<Rover manifests={manifests} handleDateChange={handleDateChange} date={date} setDate={setDate} isValidDate={isValidDate} setIsValidDate={setIsValidDate} dateData={dateData} handleRadioChange={handleRadioChange} cameraSelected={cameraSelected} photos={photos} setPhotos={setPhotos} isLoading={isLoading} />} />
  //           </Route>
  //           <Route path="*" element={<NoMatch />} />
  //         </Routes>
  //       </>
  //     )
  //   }
      // setNewDates(curiosityActual.photo_manifest.photos.filter(photo => photo.sol > manifests[0].max_sol));
      // const newDates = curiosityActual.photo_manifest.photos.filter(photo => photo.sol > manifests[0].max_sol);
      // newDates.forEach(newDate => console.log(JSON.stringify(newDate)));
      // newDates.forEach(newDate => {
      //   postCuriosityData(newDate);
      // })
      // postCuriosityData(newDates);
      // newDates.forEach(newDate => {
      //   fetch("http://localhost:6001/curiosity", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(newDate),
      //   })
      //   .then((r) => r.json())
      //   .then((newItem) => setData([...data, newItem]));
      // }
      // )
      // console.log(`Curiosity Actual: ${actual.photo_manifest.photos}`);
      // console.log(`Curiosity Data: ${manifests[0].max_sol}`);
    // }
    // useEffect(() => {
    //   postCuriosityData(newDates);
    // }, []);
// }
  // useEffect(() => {
    // updateCuriosity();
    // useEffect(() => {
    //   updateCuriosity();
    // }, []);

  // }, []);

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
