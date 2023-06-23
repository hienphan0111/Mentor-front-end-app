import { configureStore } from '@reduxjs/toolkit';
import reserveReducer from './reservation/reservationSlice';

const store = configureStore({
  reducer: {
    reserveReducer
  },
});

export default store;