import React from 'react';
import { DateTime } from 'luxon';

import Tasks from './Tasks';
import MyRequests from './MyRequests';
import MyTasks from './MyTasks';

const MainFeed = () => {
  const formatDate = (rawDate, rawTime) => {
    const date = DateTime.fromISO(rawDate);
    const now = DateTime.local();
    const diff = date.diff(now, ['months', 'days']);
    const time = DateTime.fromISO(rawTime).toFormat('h:mm a');

    if (diff.values.days <= 1) { return ({ date: 'Today', time }); }
    if (diff.values.days === 2) { return ({ date: 'Tomorow', time }); }
    if (diff.values.days < 8) { return ({ date: date.toFormat('cccc'), time }); }
    return ({ date: date.toFormat('LLL dd'), time });
  };

  return (
    <div style={{ margin: '1em', maxWidth: '33%' }}>
      <MyRequests formatDate={formatDate} />
      <MyTasks formatDate={formatDate} />
      <Tasks formatDate={formatDate} />
    </div>
  );
};

export default MainFeed;
