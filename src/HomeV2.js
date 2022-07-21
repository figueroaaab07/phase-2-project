import React from "react";
import image from "./images/Mars_fullscreen-fullhd.jpg"

function Home() {
  return (
    <>
      <div style={{ backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat", backgroundSize:"contain", maxWidth:"100%", height:720 }}>
        <h2 style={{ color:"white", paddingTop:100 }}>With Perseverance one obtains the Opportunity to see Mars, rejoices the Spirit and arouses Curiosity</h2> 
      </div>
    </>
  );
}

export default Home;