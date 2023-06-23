import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import reserveReducer from './reservation/reservationSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    reservation: reserveReducer,
  },
});
