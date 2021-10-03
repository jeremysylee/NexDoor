import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import LocationPin from './Pin';

import RequestCardTiny from '../Request/RequestCardTiny';

const Map = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  const defaultCenter = {
    lat: 34.0522,
    lng: -118.2437,
  };

  // const options = {
  //   styles: {
  //     height: '200px',
  //     width: '200px',
  //     '& div:first-child': {
  //       height: '100%',
  //       width: '100%',
  //     },
  //   }
  // }

  const [center] = useState(defaultCenter);

  const handleApiLoaded = (map) => {
    console.log(map);
  };

  const Markers = tasks.map((task) => {
    const coord = task.location.coordinate;
    const splitCoord = coord.substring(1, coord.length - 1).split(',');
    const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
    return (
      <LocationPin
        task={task}
        lat={coordinate.lat}
        lng={coordinate.lng}
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -100%)',
        }}
      />
    );
  });

  return (
    <GoogleMapReact
      styles={{
        height: '200px',
        width: '200px',
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
      }}
      zoom={16}
      defaultCenter={center}
      yesIWantToUseGoogleMapApiInternals
      bootstrapURLKeys={{ key: 'AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI' }}
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
      {Markers}
    </GoogleMapReact>
  );
};

export default Map;
