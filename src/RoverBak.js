import React from "react";
import { useParams } from "react-router-dom";

function Rover() {
  let { roverId } = useParams();
  return (
    <div>
      <h3>{roverId}</h3>
    </div>
  );
}

export default Rover;