import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import RequestStatusCard from '../../features/Request/RequestStatusCard';
import RequestInfoCard from '../../features/Request/RequestInfoCard';
import Chat from '../../features/Chat/Chat';
import MapSmall from '../../features/Map/MapSmall';
import LocationCard from '../../features/Request/components/LocationCard';

import {
  Anchor,
  Body,
  PageHeader,
  RowCentered,
  Col,
} from '../../components/App.styles';

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Body>
      <Header />
      <RowCentered style={{ marginTop: '3em', alignItems: 'flex-start' }}>
        <Sidebar />
        <Anchor>
          <PageHeader>Task Dashboard</PageHeader>
        </Anchor>
        <Col style={{ maxWidth: '300px' }}>
          <RequestStatusCard />
          <MapSmall />
          <LocationCard />
        </Col>
        <Col style={{ maxWidth: '45vw', flexGrow: 1 }}>
          <RequestInfoCard />
          <Chat />
        </Col>
      </RowCentered>
    </Body>
  );
};

export default Dashboard;
