import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {},
  },
  reducers: {
    getProfile(state, actions) {
      return {
        ...state,
        profile: actions.payload,
      };
    },
  },
});

export const { getProfile } = profileSlice.actions;
export default profileSlice.reducer;
