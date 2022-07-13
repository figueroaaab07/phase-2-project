import React, { useEffect } from "react";

function Photo({ id, src, log, setLog }) {

  async function logData(newLog) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog)
    };
    const response = await fetch('http://localhost:6001/log', requestOptions);
    const json = await response.json();
    setLog([...log, json]);
  }
  
  useEffect(() => {
    logData({id, src})
  }, []);

  return (
    <div className="column">
      <img id={id} alt="Mars" src={src} width="100%"/> 
    </div>
  )
}

export default Photo;
