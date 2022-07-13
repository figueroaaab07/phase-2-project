import React from "react";

function About() {
  const sojourner = require('./images/sojourner.png'); // with require
  const spirit_opportunity = require('./images/spirit-opportunity.png'); // with require
  const curiosity = require('./images/curiosity.png'); // with require
  const perseverance = require('./images/perseverance.png'); // with require
  const cameras = require('./images/rover-cameras.png'); // with require
  const curiosity_cam = require('./images/curiositycameras2.jpg'); // with require
  const perseverance_cam = require('./images/mars_2020_cameras_labeled_web-full2.jpg'); // with require
  const landing_cam = require('./images/EDLCam2-web.jpg'); // with require

  return (
    <>
      <h2>Rover Cameras</h2>
      <h3>(Images credit: NASA)</h3>
      <div className="row">
        <div className="column-rover-cameras">
          <img id="rover-cameras" alt="Rover Cameras" src={cameras} width="100%"/> 
        </div>
        <div className="column-rover-cameras">
          <img id="curiosity-cameras" alt="Curiosity Cameras" src={curiosity_cam} width="100%"/> 
        </div>
        <div className="column-rover-cameras">
          <img id="perseverance-cameras" alt="Perseverance Cameras" src={perseverance_cam} width="100%"/> 
        </div>
        <div className="column-rover-cameras">
          <img id="landing-cameras" alt="Landing Cameras" src={landing_cam} width="100%"/> 
        </div>
      </div>
      <h2>Rover Misions</h2>
      <h3>(Images credit: NASA)</h3>
      <div className="row">
        <div className="column">
          <img id="sojourner" alt="Mars Rover" src={sojourner} width="100%"/> 
        </div>
        <div className="column">
          <img id="spirit-opportunity" alt="Mars Rover" src={spirit_opportunity} width="100%"/> 
        </div>
        <div className="column">
          <img id="curiosity" alt="Mars Rover" src={curiosity} width="100%"/> 
        </div>
        <div className="column">
          <img id="perseverance" alt="Mars Rover" src={perseverance} width="100%"/> 
        </div>
      </div>
    </>
  );
}

export default About;
