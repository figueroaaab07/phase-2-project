import React, { useEffect } from "react";

function UpdateCuriosity({ curiosityActual, setCuriosityData, setCDLoading }) {
  async function postCuriosityData() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(curiosityActual.photo_manifest)
    };
    const response = await fetch('http://localhost:6001/manifests', requestOptions);
    const json = await response.json();
    setCuriosityData(json[0].photos);
    setCDLoading(false);
  }

  useEffect(() => {
    postCuriosityData()
  }, []);

  return (
    <div></div>
  )
}

export default UpdateCuriosity;