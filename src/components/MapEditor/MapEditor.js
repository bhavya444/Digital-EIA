import React, {useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const LayerType = {
  RECTANGLE: 'rectangle',
  MARKER: 'marker',
  POLYGON: 'polygon'
}

export default function MapEditor() {

  const [CompleteData,setCompleteData] = useState({})
  const editorRef = useRef(null);
  const fgRef = useRef(null);

  const downloadObjectAsJson = (exportObj, exportName) => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const saveData = () => {
    if (editorRef.current) {
      const info = String(editorRef.current.getContent())
      console.log(info);
      setCompleteData({...CompleteData,editorData:String(info)})
    }
  };
  
  const onCreated = e => {
    console.log(e);
    //fgRef.current._map._layers = {}
    const drawnItems = fgRef.current._map._layers;
    console.log(drawnItems);
    
    if (Object.keys(drawnItems).length > 0) {
        Object.keys(drawnItems).forEach((layerid, index) => {
          if (index > 2) {
            const layer = drawnItems[layerid];
            fgRef.current._map.removeLayer(layer);
          }
        });
    }

    if (e.layerType === LayerType.MARKER) {
        setCompleteData({...CompleteData, lat: e.layer._latlng.lat, long: e.layer._latlng.lng })
    }
  };
  const getGeoJSON = e => {
    var jsonData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "data": CompleteData.editorData,
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              CompleteData.lat,
              CompleteData.long
            ]
          }
        }
      ]
    }

    //const dataEle = document.getElementById("geojson-data");
    //dataEle.innerHTML = JSON.stringify(jsonData);

    console.log(JSON.stringify(jsonData));
    downloadObjectAsJson(jsonData,'demo');
  };

  var demo = '<h1><span style="background-color: #ced4d9;">hello world. &nbsp;<img src="https://dlsdatapfusprd.blob.core.windows.net/fulcrum-files/002a92f3-b4b1-45ce-a48f-329d747db48e/02b3c3e9-5d4f-439b-8ff8-a0a89d97e778-thumb" alt="" width="118" height="118" /></span></h1>'
  return (
    <div className='map-editor'>
      <div className='editor'>
        <Editor
        apiKey="aevf4ad5215od998s8cf4aw8mlmd3s8eqlhkk2wy4pix1ad8"
        cloudChannel="5-dev"
        onInit={(evt, editor) => {
            editorRef.current = editor
        }}
        initialValue={demo}
        init={{
          height: 300,
          menubar: true,
          /* enable title field in the Image dialog*/
          image_title: true,
          plugins: [
            "advlist autolink lists link image code charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste image code help wordcount template",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "link image |" +
            "template |" +
            "removeformat | help",
            templates: [
              {title: 'Some title 1', description: 'Some desc 1', content: 'My content'},
              {title: 'Some title 2', description: 'Some desc 2', url: 'development.html'}
            ],
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
      <button class='margin-15' onClick={saveData}>Save data</button>
      <div style={{display: 'block'}} class='margin-15'>
      <div style={{display: 'inline-block'}}>
        <MapContainer
            center={[37.8189, -122.4786]}
            zoom={13}
            style={{ height: '50vh', width: '80vw', display: 'inline-block'}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup ref={featureGroupRef => { fgRef.current = featureGroupRef}}>
                <EditControl position="topright" onCreated={onCreated} draw={
                      { polyline: false,
                        polygon: false,
                        rectangle: false,
                        circle: false,
                        circlemarker: false,
                      }}
                />
            </FeatureGroup>
            {/* {this.state.customMarkers.map(ele => {
                return <Marker position={[ele.lat, ele.long]} draggable={true} animate={true}>
                    <Popup> Test Popup </Popup>
                </Marker>
            })} */}
            {
              CompleteData.lat && CompleteData.long && 
              <Marker position={[CompleteData.lat, CompleteData.long]} draggable={true} animate={true}>
                    <Popup> Test Popup </Popup>
                </Marker>
            }
        </MapContainer>
        <div id='geojson-data' class='geo-json'></div>
      </div>
      </div>
      <button class='margin-15' onClick={getGeoJSON}>Get GeoJSON</button>
    </div>
  );
}