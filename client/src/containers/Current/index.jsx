import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import RequestStatusCard from '../../features/Request/RequestStatusCard';
import RequestInfoCard from '../../features/Request/RequestInfoCard';
import Chat from '../../features/Chat/Chat';

import {
  Anchor,
  Body,
  PageHeader,
  RowCentered,
  Col,
} from '../../components/App.styles';

const Request = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Body>
      <Header />
      <RowCentered style={{ marginTop: '5em', alignItems: 'flex-start' }}>
        <Sidebar />
        <Anchor>
          <PageHeader>Task Dashboard</PageHeader>
        </Anchor>
        <RequestStatusCard />
        <Col style={{ maxWidth: '45vw', flexGrow: 1 }}>
          <RequestInfoCard />
          <Chat />
        </Col>
      </RowCentered>
    </Body>
  );
};

export default Request;
