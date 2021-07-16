import { useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:3500';

export const useGetTasks = (userId, dispatch) => {
  const getMyTasks = () => {
    axios.get(`${url}/api/tasks/help/${userId}`)
      .then(({ data }) => dispatch({ type: 'SET_MY_TASKS', myTasks: data }));
  };

  useEffect(() => {
    getMyTasks();
  });
};

export const useGetRequests = (userId, dispatch) => {
  const getRequests = () => {
    axios.get(`${url}/api/tasks/req/${userId}`)
      .then(({ data }) => dispatch({ type: 'SET_REQUESTS', requests: data }));
  };
  useEffect(() => {
    getRequests();
  });
};

export default useGetTasks;
