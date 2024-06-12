import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GoogleMapComponent = ({ locations }) => {
  const position = [locations[0].latitude, locations[0].longitude]; // Use the first location as the starting point
  const polyline = locations.map(location => [location.latitude, location.longitude]); // Map locations to polyline coordinates

  return (
    <div className="h-screen w-full">
      <MapContainer center={position} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          language="en" // Specify language as English
        />
        <Marker position={position} />
        <Polyline positions={polyline} color="blue" />
      </MapContainer>
    </div>
  );
};

export default GoogleMapComponent;
