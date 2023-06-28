import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/reservations';
const initialState = {
  reserves: [],
  status: 'idle',
};

export const fetchreservation = createAsyncThunk(
  'reserves/fetchreserves',
  async (arg, { getState }) => {
    const accesstoken = getState().user.user.token;
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${accesstoken}` },
    });
    const reserves = res.data.data;
    return reserves;
  },
);

export const addreserve = createAsyncThunk(
  'reserves/addreserve',
  async (reserve, { getState }) => {
    const accesstoken = getState().user.user.token;
    const res = await axios.post(url, reserve, {
      headers: { Authorization: `Bearer ${accesstoken}` },
    });
    const reserves = res.data.data;
    return reserves;
  },
);

export const removereservation = createAsyncThunk(
  'books/removebook',
  async (id, { getState }) => {
    const accesstoken = getState().user.user.token;
    const res = await axios.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${accesstoken}` },
    });
    const reserves = res.data.data;
    return reserves;
  },
);

export const reserveSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchreservation.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.reserves = action.payload;
      return newState;
    });

    builder.addCase(addreserve.fulfilled, (state, action) => ({
      ...state,
      reserves: action.payload,
    }));
    builder.addCase(removereservation.fulfilled, (state, action) => {
      const newState = {
        ...state,
        reserves: action.payload,
      };

      return newState;
    });
  },
});

export default reserveSlice.reducer;
