/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // vus: 100,
  // duration: '60s',
  stages: [
    { duration: '30s', target: 10000 },
    { duration: '180s', target: 10000 },
    { duration: '20s', target: 0 },
  ],
};

export default () => {
  http.get('http://localhost:3500/api/announcements/10');
  http.get('http://localhost:3500/api/messages/964494');
  http.get('http://localhost:3500/api/tasks/?userId=964494&range=1500&quantity=10&offset=0');
  http.get('http://localhost:3500/api/tasks/964494');
  http.get('http://localhost:3500/api/users/964494');
  http.get('http://localhost:3500/api/users/?sortBy=rating&quantity=10&userId=964494&range=100');
  sleep(1);
};
