import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000';

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
    const res = await axios.post(`${API_URL}/api/v1/users`, data);
    return {
      id: res.data.user.id,
      name: res.data.user.name,
      email: res.data.user.email,
      token: res.data.user.access_token,
    };
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
  const res = await axios.post(`${API_URL}/oauth/token`, data);

  const token = res.data.access_token;

  const resUser = await axios.get(
    `${API_URL}/api/v1/users/user`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const userInfo = {
    id: resUser.data.user.id,
    name: resUser.data.user.name,
    email: resUser.data.user.email,
    token,
  };
  return userInfo;
});

export const logout = createAsyncThunk('user/logout', async (arg, { getState }) => {
  const data = {
    token: getState().user.token,
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
  };

  const res = await axios.post(`${API_URL}/oauth/revoke`, data);
  return res;
});

const userLocal = (user) => localStorage.setItem('user', JSON.stringify(user));
const initUser = JSON.stringify(localStorage.getItem('user')) || {
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
        const newState = {
          isLogin: true,
          user: action.payload,
          errors: '',
        };
        userLocal(newState);
        return newState;
      })
      .addCase(register.rejected, (state, action) => ({
        ...state,
        errors: action.error.message,
      }))
      .addCase(login.fulfilled, (state, action) => {
        const newState = {
          isLogin: true,
          user: action.payload,
          errors: '',
        };
        userLocal(newState);
        return newState;
      })
      .addCase(login.rejected, (state, action) => ({
        ...state,
        errors: action.error.message,
      }))
      .addCase(logout.fulfilled, () => {
        const newState = {
          isLogin: false,
          user: '',
          error: '',
        };
        userLocal(newState);
        return newState;
      });
  },
});

export default userSlice.reducer;
