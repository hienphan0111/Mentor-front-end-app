import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import mentorReducer from './mentor/mentorSlice';
import reserveReducer from './reservation/reservationSlice';
import expertiseReducer from './expertise/expertiseSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    mentor: mentorReducer,
    reservation: reserveReducer,
    expertise: expertiseReducer,
  },
});
