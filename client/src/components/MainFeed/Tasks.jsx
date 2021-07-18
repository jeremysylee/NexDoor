import React from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';

import { CardHeaders, SectionCard } from './styles-MainFeed';

const Tasks = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);

  return (
    <div>
      <SectionCard>
        <CardHeaders>Others Requesting Help</CardHeaders>
      </SectionCard>
      {tasks.map((task) => (
        <Task task={task} key={task.task_id} />
      ))}
    </div>
  );
};

export default Tasks;
