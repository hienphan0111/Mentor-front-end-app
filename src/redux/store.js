import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import mentorReducer from './mentor/mentorReducer';
import reserveReducer from './reservation/reservationSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    mentor: mentorReducer,
    reservation: reserveReducer,
  },
});
