import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  accessToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload;
      console.log(`로그인성공! ${state.isLoggedIn}`);
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export default authSlice.reducer;
export const { userLogin, userLogout } = authSlice.actions;
