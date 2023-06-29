import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.API_URL;

export const fetchExpertises = createAsyncThunk(
  'expertises/get',
  async (arg, { getState }) => {
    const { token } = getState().user.user;
    const res = await axios.get(`${API_URL}/api/v1/expertises`,
      { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  },
);

export const createExpertise = createAsyncThunk(
  'expertises/create',
  async (expertise, { getState }) => {
    const { token } = getState().user.user;
    const res = await axios.post(`${API_URL}/api/v1/expertises`,
      expertise,
      { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  },
);

export const deleteExpertise = createAsyncThunk(
  'expertises/delete',
  async (id, { getState }) => {
    const { token } = getState().user.user;
    const res = await axios.delete(`${API_URL}/api/v1/expertises/${id}`,
      { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  },
);

const expertiseSlice = createSlice({
  name: 'expertise',
  initialState: {
    expertises: [{
      name: '',
      description: '',
      icon: '',
    }],
    status: 'idle',
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExpertises.fulfilled, (state, action) => ({
        ...state,
        expertises: action.payload,
      }))
      .addCase(createExpertise.fulfilled, (state, action) => ({
        ...state,
        expertises: action.payload,
      }))
      .addCase(deleteExpertise.fulfilled, (state, action) => ({
        ...state,
        expertises: action.payload,
      }));
  },
});

export default expertiseSlice.reducer;
