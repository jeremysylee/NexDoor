import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import RequestCardTiny from '../Request/RequestCardTiny';
// import { Anchor } from '../../components/App.styles';
import LocationPin from '../../static/LocationPin';

const Anchor = styled.div`
  position: absolute;
`;

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
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI' }}
      defaultCenter={center}
      defaultZoom={13}
    >
      {tasks.map((task) => {
        const coord = task.location.coordinate;
        const splitCoord = coord.substring(1, coord.length - 1).split(',');
        const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
        return (
          <>
            <LocationPin
              key={task.task_id}
              position={coordinate}
              onClick={() => selectTaskHandler(task)}
            />
            {/* <RequestCardTiny
              position={coordinate}
            /> */}
          </>
        );
      })}
    </GoogleMapReact>
  );
  // return (
  //   <LoadScript
  //     googleMapsApiKey="AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI"
  //   >
  //     <GoogleMap
  //       mapContainerStyle={mapStyles}
  //       zoom={13}
  //       center={center}
  //     >
  //       {tasks.map((task) => {
  //         const coord = task.location.coordinate;
  //         const splitCoord = coord.substring(1, coord.length - 1).split(',');
  //         const coordinate = { lat: Number(splitCoord[1]), lng: Number(splitCoord[0]) };
  //         console.log(coordinate)
  //         return (
  //           <>
  //             <Marker
  //               key={task.task_id}
  //               position={coordinate}
  //               onClick={() => selectTaskHandler(task)}
  //             />
  //             <div
  //               style={{
  //                 height: '100px',
  //                 width: '100px',
  //                 position: 'absolute',
  //                 backgroundColor: 'blue',
  //               }}
  //               lat={35}
  //               lng={-112}
  //             />
  //             {/* <RequestCardTiny
  //               lat={100}
  //               lng={132}
  //               position={{ lat: 35, lng: -112 }}
  //             /> */}
  //           </>
  //         );
  //       })}
  //     </GoogleMap>
  //   </LoadScript>
  // );
};

export default Map;
