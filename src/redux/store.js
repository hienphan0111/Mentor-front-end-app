import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import mentorReducer from './mentor/mentorReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    mentor: mentorReducer,
  },
});
