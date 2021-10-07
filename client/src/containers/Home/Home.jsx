import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import RequestFeed from '../../features/Request/RequestFeed';
import Sidebar from '../../components/Sidebar';
import Map from '../../features/Map/Map';
import { Body, Row } from '../../components/App.styles';

const MapContainer = styled.div`
  position: sticky;
  top: 0;
  min-width: 300px;
  max-width: 650px;
  height: 95vh;
  border-radius: 20px;
  // box-shadow: 0 8px 16px 0 #BDC9D7;
  margin-top: 2em;
  flex-grow: 4;
  flex-shrink: 2;
  overflow: hidden;
`;

const HomePageContainer = styled(Row)`
  justify-content: center;
  width: 100%;
  align-items: flex-start;
`;

const Home = () => (
  <Body>
    <Header />
    <HomePageContainer>
      <Sidebar />
      <RequestFeed />
      <MapContainer>
        <Map />
      </MapContainer>
    </HomePageContainer>
  </Body>
);

export default Home;
