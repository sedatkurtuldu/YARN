import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../services/firebase";

const intialState = {
  paycardimage: '',
  status: "idle",
  error: null,
};

export const getPayCardImage = createAsyncThunk(
    "paycardImage/getPayCardImage",
    async () => {
      try {
        const storageRef = ref(storage, 'icons/yarncard.png');
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        throw error;
      }
    }
  );

const payCardImageSlice = createSlice({
  name: "paycardimage",
  initialState: intialState,
  reducers: {
    setPayCardImage: (state, action) => {
      state.paycardimage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPayCardImage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPayCardImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPayCardImage.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        state.paycardimage = action.payload;
      });
  },
});

export const selectPayCardImage = (state) => state.paycardimage.paycardimage;


export const { setPayCardImage } = payCardImageSlice.actions;
export default payCardImageSlice;
