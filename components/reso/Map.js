"use client";

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ResoCard from './ResoCard';


const Map = ({latitude, longitude}) => {

    
  return (
    <MapContainer center={[latitude, longitude]} zoom={17} style={{ height: '500px', width: '100%' }}attributionControl={false}>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     <Marker position={[latitude, longitude]} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}>
    
      </Marker>
    </MapContainer>
  );
};

export default Map;

