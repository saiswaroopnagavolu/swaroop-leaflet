import { Icon } from 'leaflet';
import './App.css'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

function App() {

  const markers = [
    { position: [28.6139, 77.209], label: "New Delhi" },
    { position: [19.076, 72.8777], label: "Mumbai" },
    { position: [13.0827, 80.2707], label: "Chennai" },
    { position: [22.5726, 88.3639], label: "Kolkata" },
    { position: [12.9716, 77.5946], label: "Bangalore" },
  ];
  
  return (
   <MapContainer center={[28.6139, 77.209]} zoom={5} >
    <TileLayer 
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    { markers.map((marker, index) => (
      <Marker key={index} position={marker.position}>
        <Popup>{marker.label}</Popup>
      </Marker>
    ))}

    <TiltOnClick />
   </MapContainer>
  )
}

function TiltOnClick() {
  const map = useMapEvents({
    click(e) {
      const currentCenter = map.getCenter();
      const offsetLat = (e.latlng.lat - currentCenter.lat) * 0.5;
      const offsetLng = (e.latlng.lng - currentCenter.lng) * 0.5;
      const newCenter = [
        currentCenter.lat + offsetLat,
        currentCenter.lng + offsetLng
      ];
      map.panTo(newCenter);
    }
  });

  return null;
}

export default App;
