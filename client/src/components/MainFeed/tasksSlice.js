import { createSlice } from '@reduxjs/toolkit';
import { testTasks } from '../../../testData/testData';

const tasksSlice = createSlice({
  name: 'tasks',
  intitialState: 'potato',
  reducers: {
    setTasks(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
