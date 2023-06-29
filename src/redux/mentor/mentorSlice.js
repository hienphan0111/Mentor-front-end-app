import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createMentor = createAsyncThunk(
  'mentor/create',
  async (mentor, { getState }) => {
    const { token } = getState().user.user;
    const res = await axios.post(`${API_URL}/api/v1/mentors`, mentor, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
);

export const fetchMentors = createAsyncThunk(
  'mentor/get',
  async (arg, { getState }) => {
    const { token } = getState().user.user;
    const res = await axios.get(`${API_URL}/api/v1/mentors`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
);

export const deleteMentor = createAsyncThunk(
  'mentor/get',
  async (id, { getState }) => {
    const { token } = getState().user.user;
    const res = await axios.delete(`${API_URL}/api/v1/mentors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
);
const mentorInit = {
  status: 'idle',
  mentors: [],
  errors: '',
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState: mentorInit,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMentors.fulfilled, (state, action) => ({
        status: 'idle',
        mentors: action.payload,
        errors: '',
      }))
      .addCase(createMentor.fulfilled, (state, action) => ({
        ...state,
        mentors: action.payload,
      }));
  },
});

export default mentorSlice.reducer;
