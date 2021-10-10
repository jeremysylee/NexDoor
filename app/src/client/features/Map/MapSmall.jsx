import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import LocationPin from './Pin';

const MapContainer = styled.div`
  min-width: 300px;
  max-width: 650px;
  height: 25vh;
  border-radius: 20px;
  box-shadow: 2px 2px 3px #cccccc, -3px -3px 5px #ededed;
  margin-top: 1.5em;
  flex-grow: 4;
  flex-shrink: 2;
  overflow: hidden;
`;

const Map = () => {
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const coord = selectedTask.location.coordinate;
  const splitCoord = coord.substring(1, coord.length - 1).split(',');
  const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };

  const defaultCenter = {
    lat: coordinate.lat,
    lng: coordinate.lng,
  };

  const [center] = useState(defaultCenter);

  const options = {
    scrollwheel: true,
    clickableIcons: false,
  };

  const handleApiLoaded = (map, maps) => {
    console.log(map, maps);
  };

  return (
    <MapContainer>
      <GoogleMapReact
        options={options}
        zoom={16}
        center={center}
        yesIWantToUseGoogleMapApiInternals={false}
        bootstrapURLKeys={{ key: 'AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI' }}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <LocationPin
          key={selectedTask.task_id}
          task={selectedTask}
          lat={coordinate.lat}
          lng={coordinate.lng}
          showCard={false}
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
          }}
        />
      </GoogleMapReact>
    </MapContainer>
  );
};

export default Map;
