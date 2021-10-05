import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import LocationPin from './Pin';

const Map = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  // const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const defaultCenter = {
    lat: 34.0522,
    lng: -118.2437,
  };
  const [center] = useState(defaultCenter);

  // useEffect(() => {
  //   const coord = selectedTask.location.coordinate;
  //   const splitCoord = coord.substring(1, coord.length - 1).split(',');
  //   const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
  //   setCenter(coordinate);
  // }, [selectedTask]);

  const options = {
    scrollwheel: true,
    clickableIcons: false,
  };

  const handleApiLoaded = (map) => map;

  const Markers = tasks.map((task) => {
    const coord = task.location.coordinate;
    const splitCoord = coord.substring(1, coord.length - 1).split(',');
    const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
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
      bootstrapURLKeys={{ key: 'AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI' }}
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
      {Markers}
    </GoogleMapReact>
  );
};

export default Map;
