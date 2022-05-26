import RichTextEditor from './components/tinymce/RichTextEditor'
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import {LeafletMap} from './components/leaflet-map/LeafletMap';
import MapEditor from './components/MapEditor/MapEditor';
import Base from './Base';
function App() {
  console.log("process=>",process.env.REACT_APP_BASE_URL)
  return (
    <>
    <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/editor" element={<RichTextEditor />} />
      <Route path="/leaflet-map" element={<LeafletMap />} />
      <Route path="/map-with-editor" element={<MapEditor/>}/>
      </Routes>
    </>
  );
}

export default App;
