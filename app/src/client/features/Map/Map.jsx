import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import LocationPin from './Pin';
import { googleApi } from '../../../../config';

const Map = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  const user = useSelector((store) => store.currentUserReducer.userData);

  const getCoordinates = (coord) => {
    const splitCoord = coord.substring(1, coord.length - 1).split(',');
    return { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
  };

  const defaultCenter = {
    lat: getCoordinates(user.address.coordinate).lat,
    lng: getCoordinates(user.address.coordinate).lng,
  };
  const [center] = useState(defaultCenter);

  const options = {
    scrollwheel: true,
    clickableIcons: false,
  };

  // const handleApiLoaded = (map, maps) => {
  //   console.log(map, maps);
  // };

  const Markers = tasks.map((task) => {
    const coordinate = getCoordinates(task.location.coordinate);
    return (
      <LocationPin
        key={task.task_id}
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
      options={options}
      zoom={16}
      center={center}
      yesIWantToUseGoogleMapApiInternals={false}
      bootstrapURLKeys={{ key: googleApi }}
      // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
      {Markers}
    </GoogleMapReact>
  );
};

export default Map;
