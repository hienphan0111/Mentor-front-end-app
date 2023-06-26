import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk(
  'user/register',

  async (user) => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.confirmPassword,
      client_id: import.meta.env.VITE_CLIENT_ID,
    };
    const res = await axios.post('http://localhost:3000/api/v1/users', data);
    return res.data;
  },
);

export const login = createAsyncThunk('user/login', async (user) => {
  const data = {
    grant_type: 'password',
    email: user.email,
    password: user.password,
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
  };
  const res = await axios.post('http://localhost:3000/oauth/token', data);

  return res.data;
});

const userLocal = (user) => localStorage.setItem('user', JSON.stringify(user));
<<<<<<< Updated upstream
const initUser = JSON.parse(localStorage.getItem('user')) || {
=======
const initUser = JSON.stringify(localStorage.getItem('user') || {}) || {
>>>>>>> Stashed changes
const initUser = JSON.parse(localStorage.getItem('user') || {}) || {
  isLogin: false,
  user: '',
  errors: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        userLocal(action.payload.user);
        return ({
          isLogin: true,
          user: action.payload.user,
          errors: '',
        });
      })
      .addCase(register.rejected, (state, action) => ({
        ...state,
        errors: action.error.message,
      }))
      .addCase(login.fulfilled, (state, action) => {
        userLocal(action.payload);
        return ({
          isLogin: true,
          user: action.payload,
          errors: '',
        });
      });
  },
});

export default userSlice.reducer;
