import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasksReducer.tasks);

  const mapStyles = {
    height: '100%',
    width: '100%',
    borderRadius: '10px',
  };

  const defaultCenter = {
    lat: 34.0522,
    lng: -118.2437,
  };

  const [center] = useState(defaultCenter);

  const selectTaskHandler = (task) => {
    dispatch({ type: 'SET_TASK', task });
    return <></>;
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      >
        {tasks.map((task) => {
          const coord = task.location.coordinate;
          const splitCoord = coord.substring(1, coord.length - 1).split(',');
          const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
          return (
            <Marker
              key={task.task_id}
              position={coordinate}
              onClick={() => selectTaskHandler(task)}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
