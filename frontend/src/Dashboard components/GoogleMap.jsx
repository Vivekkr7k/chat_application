import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const GoogleMapComponent = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="text-xl font-bold mb-4 text-gray-700">Google Map</div>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
