import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isAuth: true,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzExNTgwNzMwLCJleHAiOjE3MTE2NjcxMzB9.LZS3my70ugkTjt6Pibifbrb0PQK3tF8UlCxgnZuZz0I',
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
