import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import RequestCardSmall from '../../features/Request/RequestCardSmall';
import Chat from '../../features/Chat/Chat';
import {
  Anchor,
  Body,
  PageHeader,
  RowCentered,
} from '../../components/App.styles';

const Request = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Body>
      <Header />
      <RowCentered style={{ marginTop: '5em' }}>
        <Sidebar />
        <Anchor>
          <PageHeader>Task Dashboard</PageHeader>
        </Anchor>
        <RequestCardSmall />
        <Chat />
      </RowCentered>
    </Body>
  );
}
export default Request;
