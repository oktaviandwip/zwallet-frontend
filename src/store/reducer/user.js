import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isAuth: false,
    token:
      '' ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzExNDkxMDE3LCJleHAiOjE3MTE1Nzc0MTd9.l8YLmwT5PVPWR7aRnkKaQsNb2Nq0OSjEbibJ954W0y8',
  },
  reducers: {
    login(state, actions) {
      return {
        ...state,
        isAuth: true,
        token: actions.payload,
      }
    },
    logout(state, actions) {
      return {
        ...state,
        isAuth: false,
        token: '',
      }
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
