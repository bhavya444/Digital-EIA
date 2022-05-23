import React from 'react'
import RichTextEditor from './tinymce/RichTextEditor'
import {
  Routes,
  Route,
} from "react-router-dom";
import LeafletMap from './leaflet-map/LeafletMap';
import Base from './Base';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/editor" element={<RichTextEditor />} />
        <Route path="/leaflet-map" element={<LeafletMap />} />
      </Routes>
    </>
  )
}

export default App