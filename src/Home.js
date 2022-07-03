import React from "react";
import image from "./images/Mars_fullscreen-fullhd.jpg"

function Home() {
  return (
    <>
      <div style={{ backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat", backgroundSize:"contain", maxWidth:"100%", height:720 }}>
        <h1 style={{ color:"white", paddingTop:200 }}>The Opportunity to see Mars, rejoices the Spirit and arouses the Curiosity</h1> 
      </div>
    </>
  );
}

export default Home;