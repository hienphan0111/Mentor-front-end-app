import { configureStore } from '@reduxjs/toolkit';
import reserveReducer from './reservation/reservationSlice';

const store = configureStore({
  reducer: {
    reservation: reserveReducer,
  },
});

export default store;
