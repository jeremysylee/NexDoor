import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RequestInput from './RequestInput';
import OpenTask from './OpenTask';
import MyRequest from './MyRequest';
import MyTask from './MyTask';
import {
  CardHeaders,
  SectionCard,
} from './styles-MainFeed';

const MainFeed = () => {
  const openTasks = useSelector((store) => store.tasksReducer.tasks);
  const myTasks = useSelector((store) => store.myTasksReducer.myTasks);
  const myRequests = useSelector((store) => store.requestsReducer.requests);

  return (
    <div style={{ margin: '1em', maxWidth: '33%', minWidth: '400px' }}>
      <RequestInput />
      <BrowserRouter>
        <Switch>
          <Route exact path="/myrequests">
            <>
              <SectionCard>
                <CardHeaders>People Helping Me</CardHeaders>
              </SectionCard>
              {myRequests.map((request) => (
                <MyRequest request={request} key={request.task_id} />
              ))}
            </>
          </Route>
          <Route exact path={['/mytasks']}>
            <>
              <SectionCard>
                <CardHeaders>People I Am Helping</CardHeaders>
              </SectionCard>
              {myTasks.map((task) => (
                <MyTask task={task} key={task.task_id} />
              ))}
            </>
          </Route>
          <Route path={['/', '/Tasks']}>
            <>
              <SectionCard>
                <CardHeaders>Others Requesting Help</CardHeaders>
              </SectionCard>
              {openTasks.map((task) => (
                <OpenTask task={task} key={task.task_id} />
              ))}
            </>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default MainFeed;
