import { createSlice } from '@reduxjs/toolkit';

const transferSlice = createSlice({
  name: 'transfer',
  initialState: {
    receiver: {},
    transferDetails: {},
  },
  reducers: {
    getReceiver(state, actions) {
      return {
        ...state,
        receiver: actions.payload,
      };
    },

    getTransferDetails(state, actions) {
      return {
        ...state,
        transferDetails: actions.payload,
      };
    },
  },
});

export const { getReceiver, getTransferDetails } = transferSlice.actions;
export default transferSlice.reducer;
