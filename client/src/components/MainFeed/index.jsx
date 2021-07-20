import React from 'react';
import { useSelector } from 'react-redux';
import RequestInput from './RequestInput';
import OpenTask from './OpenTask';
import MyRequest from './MyRequest';
import MyTask from './MyTask';
import {
  CardHeaders,
  SectionCard,
  SectionLine,
} from './styles-MainFeed';

const MainFeed = () => {
  const openTasks = useSelector((store) => store.tasksReducer.tasks) || [];
  const myTasks = useSelector((store) => store.myTasksReducer.myTasks) || [];
  const myRequests = useSelector((store) => store.requestsReducer.requests) || [];
  const page = useSelector((store) => store.currentPageReducer.page);

  console.log('mainfeed -->', openTasks);

  return (
    <div style={{ margin: '1em', maxWidth: '33%', minWidth: '400px' }}>
      <RequestInput />
      {page === '/' && (
        <>
          <SectionCard>
            <CardHeaders style={{ color: '#4F9CB8' }}>People Helping Me</CardHeaders>
          </SectionCard>
          {myRequests.map((request) => (
            <MyRequest request={request} key={request.task_id} />
          ))}
          <SectionLine />
          <SectionCard>
            <CardHeaders>People I Am Helping</CardHeaders>
          </SectionCard>
          {myTasks.map((task) => (
            <MyTask task={task} key={task.task_id} />
          ))}
          <SectionLine />
          <SectionCard>
            <CardHeaders>Others Requesting Help</CardHeaders>
          </SectionCard>
          {openTasks.map((task) => (
            <OpenTask task={task} key={task.task_id} />
          ))}
        </>
      )}
      {page === '/myrequests' && (
        <>
          <SectionCard>
            <CardHeaders>People Helping Me</CardHeaders>
          </SectionCard>
          {myRequests.map((request) => (
            <MyRequest request={request} key={request.task_id} />
          ))}
        </>
      )}
      {page === '/mytasks' && (
        <>
          <SectionCard>
            <CardHeaders>People I Am Helping</CardHeaders>
          </SectionCard>
          {myTasks.map((task) => (
            <MyTask task={task} key={task.task_id} />
          ))}
        </>
      )}
      {page === '/tasks' && (
        <>
          <SectionCard>
            <CardHeaders>Others Requesting Help</CardHeaders>
          </SectionCard>
          {openTasks.map((task) => (
            <OpenTask task={task} key={task.task_id} />
          ))}
        </>
      )}
    </div>
  );
};

export default MainFeed;
