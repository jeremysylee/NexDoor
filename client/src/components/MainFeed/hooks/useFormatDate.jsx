import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const useFormatDate = (rawDate, rawTime) => {
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(0);

  const formatDate = () => {
    const date = DateTime.fromISO(rawDate);
    const now = DateTime.local();
    const diff = date.diff(now, ['months', 'days']);
    const timeParsed = DateTime.fromISO(rawTime).toFormat('h:mm a');

    if (diff.values.days <= 1) { setDay('Today'); }
    if (diff.values.days === 2) { setDay('Tomorow'); }
    if (diff.values.days < 8) { setDay(date.toFormat('cccc')); }
    setTime(timeParsed);
  };

  useEffect(() => {
    formatDate(rawDate, rawTime);
  });

  return { day, time }
};

export default useFormatDate;
