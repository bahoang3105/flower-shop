import { createSlice } from '@reduxjs/toolkit';

type ntfHomePage = {
  signed: boolean;
};

const initialState: ntfHomePage = {
  signed: false,
};

export const ntfHomePageSlice = createSlice({
  name: 'nftHomePage',
  initialState,
  reducers: {
    isSigning: (state, action) => {
      state.signed = action.payload;
    },
  },
});

export const { isSigning } = ntfHomePageSlice.actions;

export const namespace = 'HomePage';
export default ntfHomePageSlice.reducer;
