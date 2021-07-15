const initialState = { date: '', time: '' };

const taskDataFormatted = (state = initialState, action) => {
  switch (action.type) {
    case 'FORMAT_DATA':
      return { date: action.date, time: action.time };
    default:
      return state;
  }
};

export default taskDataFormatted;
