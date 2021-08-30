import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // vus: 100,
  // duration: '60s',
  stages: [
    { duration: '30s', target: 1000 },
    { duration: '120s', target: 1000 },
    { duration: '20s', target: 0 },
  ],
};

export default () => {
  http.get('http://localhost:3500/api/users/rating/10/1/100');
  sleep(1);
};
