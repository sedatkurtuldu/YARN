import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getYarnOffers } from "../services/api";

const intialState = {
  yarnOffers: [],
  status: "idle",
  error: null,
};

export const getYarnOffer = createAsyncThunk(
  "yarnOffers/getYarnOffers",
  async () => {
    const data = await getYarnOffers();
    return data;
  }
);

const yarnOffersSlice = createSlice({
    name: "yarnOffers",
    initialState: intialState,
    reducers: {
      setYarnOffers: (state, action) => {
        state.yarnOffers = action.payload;
      },
    },
    extraReducers(builder) {
        builder
          .addCase(getYarnOffer.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getYarnOffer.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(getYarnOffer.fulfilled, (state, action) => {
            state.status = "idle";
            state.yarnOffers = action.payload;
          });
      },
  });
  

export const selectYarnOffers = (state) => state.yarnOffer.yarnOffers;


export const { setYarnOffers } = yarnOffersSlice.actions;
export default yarnOffersSlice;
