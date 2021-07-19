import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Map = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  if (!tasks) {
    return <></>;
  }
  const [addresses, setAddresses] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const coordinateContainer = [];
  const url = 'http://localhost:3500';
  const mapStyles = {
    height: '50vh',
    width: '75vh',
  };

  const defaultCenter = {
    lat: 34.0522,
    lng: -118.2437,
  };

  const formatCoord = (coord) => {
    let formattedCoord = coord.substring(1, coord.length - 1);
    formattedCoord = formattedCoord.split(',');
    const coordinate = { lat: Number(formattedCoord[1]), lng: Number(formattedCoord[0]) };
    return coordinate;
  };

  useEffect(() => {
    setAddresses(tasks);
    // console.log(tasks);
  }, [tasks]);

  // const getCoordinates = async (address) => {
  //   const addressArr = address.split(' ');
  //   const urlFormattedAddress = addressArr.join('+');
  //   const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlFormattedAddress}
  //   &key=AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI`)
  //     .then((res) => res.data.results[0].geometry.location);
  //   return result;
  // };

  const iterateAddressesAsync = async () => {
    for (let address of addresses) {
      // let coordinate = await getCoordinates(address);
      let coor = address.location.coordinate;
      let coordinate = formatCoord(coor);
      // console.log(coordinate);
      coordinateContainer.push(coordinate);
      // console.log('coordinate: ', coordinate);
    }
  };

  const getAddresses = () => {
    axios.get(url + '/api/tasks/15')
      .then((res) => {
        // console.log(res.data);
        setAddresses(res.data);
      });
  };

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    iterateAddressesAsync()
      .then(() => {
        setCoordinates(coordinateContainer);
      });
  }, [addresses]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        {
          coordinates.map((coordinate, idx) => {
            // console.log('coordinate: ', coordinate);
            const position = {};
            position.lat = coordinate.lat;
            position.lng = coordinate.lng;
            if (!coordinate) {
              return;
            }
            return (
              <Marker key={idx} position={position} />
            );
          })
        }
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
