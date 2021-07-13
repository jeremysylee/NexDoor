import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const mapStyles = {
    height: '50vh',
    width: '%100',
  };

  const defaultCenter = {
    lat: 34.0522,
    lng: -118.2437,
  };

  return (
    <LoadScript
    googleMapsApiKey='AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI'>
     <GoogleMap
       mapContainerStyle={mapStyles}
       zoom={10.5}
       center={defaultCenter}
     />
  </LoadScript>
    // <div>hi</div>
  );
};

export default Map;
