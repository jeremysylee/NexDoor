/* global google */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, LoadScript, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';
import RequestCardTiny from '../Request/RequestCardTiny';
// import { Anchor } from '../../components/App.styles';
import LocationPin from '../../static/LocationPin';

const Anchor = styled.div`
  position: absolute;
`;
const google = window.google;

const Map = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI',
  });

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
  };

  // return (
  //   <GoogleMapReact
  //     bootstrapURLKeys={{ key: 'AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI' }}
  //     defaultCenter={center}
  //     defaultZoom={13}
  //   >
  //     {tasks.map((task) => {
  //       const coord = task.location.coordinate;
  //       const splitCoord = coord.substring(1, coord.length - 1).split(',');
  //       const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
  //       console.log(coordinate)
  //       return (
  //         <>
  //           <div
  //             key={task.task_id}
  //             position={coordinate}
  //             lat={coordinate.lat}
  //             lng={coordinate.lng}
  //             onClick={() => selectTaskHandler(task)}
  //           >sejkf;aj;elkjf
  //             </div>
  //           {/* <RequestCardTiny
  //             position={coordinate}
  //           /> */}
  //         </>
  //       );
  //     })}
  //   </GoogleMapReact>
  // );

  const onLoad = (infoWindow) => {
    console.log(infoWindow);
  };

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={center}
    >
      {/* <Marker /> */}
      {tasks.map((task) => {
        const coord = task.location.coordinate;
        const splitCoord = coord.substring(1, coord.length - 1).split(',');
        const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
        console.log(coordinate)
        return (
          <>
            <Marker
              key={task.task_id}
              position={coordinate}
              onClick={() => selectTaskHandler(task)}
            />
            <InfoWindow
              onLoad={onLoad}
              position={coordinate}
            />
            {/* <InfoBox
              // key={task.task_id}
              position={coordinate}
              onClick={() => selectTaskHandler(task)}
            /> */}
            <RequestCardTiny
              lat={100}
              lng={132}
              position={{ lat: 35, lng: -112 }}
            />
          </>
        );
      })}
    </GoogleMap>
  );

  if (loadError) {
    return <div>Map cannot be loaded right now.</div>;
  }

  return isLoaded ? renderMap() : <></>;
};

export default Map;
