import { useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:3500';

// export const useGetTasks = (userId, dispatch) => {
//   const getMyTasks = () => {
//     axios.get(`${url}/api/tasks/help/${userId}`)
//       .then(({ data }) => dispatch({ type: 'SET_MY_TASKS', myTasks: data }));
//   };

//   useEffect(() => {
//     getMyTasks();
//   });
// };

// export const useGetRequests = (userId, dispatch) => {
//   const getRequests = () => {
//     setInterval(() => {
//       axios.get(`${url}/api/tasks/req/${userId}`)
//         .then(({ data }) => dispatch({ type: 'SET_REQUESTS', requests: data }));
//     }, 500);
//   };
//   useEffect(() => {
//     getRequests();
//   });
// };

// export default useGetTasks;
