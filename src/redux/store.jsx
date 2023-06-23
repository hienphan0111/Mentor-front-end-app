import { configureStore } from '@reduxjs/toolkit';
import reserveReducer from './reservation/reservationSlice';
import userReducer from './userSlice/userSlice';

const store = configureStore({
  reducer: {
    reserveReducer,
    user: userReducer,
  },
});

export default store;
