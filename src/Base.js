import React from 'react'
import {
    Link 
  } from "react-router-dom";
const Base = () => {
  return (
    <div>
      <h1>Leaflet and Editor</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/leaflet-map">Leaflet Map</Link> |{" "}
        <Link to="/editor">Editor</Link>|{" "}
        <Link to="/map-with-editor">Map - Editor</Link>
      </nav>
    </div>
  )
}

export default Base