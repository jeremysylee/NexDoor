import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Map = () => {
  const [addresses, setAddresses] = useState(['6616 Cleon Ave North Hollywood CA']);
  const [coordinates, setCoordinates] = useState([]);

  let coordinateContainer = [];

  const mapStyles = {
    height: '50vh',
    width: '%100',
  };

  const defaultCenter = {
    lat: 34.0522,
    lng: -118.2437,
  };

  const getCoordinates = async (address) => {
    const addressArr = address.split(' ');
    const urlFormattedAddress = addressArr.join('+');
    const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlFormattedAddress}
    &key=AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI`)
      .then((res) => {
        return res.data.results[0].geometry.location;
      });
      return result;
  };

  let iterateAddressesAsync = async () => {
    for (let address of addresses) {
      let coordinate = await getCoordinates(address);
      coordinateContainer.push(coordinate);
      // console.log('coordinate: ', coordinate);
    }
  };

  useEffect(() => {
    // addresses.forEach(address => {
    //   getCoordinates(address)
    //     .then(res => {
    //       console.log(res);
    //     });
    // });
    iterateAddressesAsync()
      .then(() => {
        // console.log(coordinateContainer);
        setCoordinates(coordinateContainer);
      });
  }, []);

  //get addresses
  //put those addresses into addresses array
  //iterate through addresses array
    //convert addresses to lat lon object literal
    //return marker with object literal in position value
  return (
    <LoadScript
      googleMapsApiKey='AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10.5}
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
