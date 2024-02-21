import { createSlice } from '@reduxjs/toolkit';
import defaultIcon from '../../assets/user_icon.png';

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  userId: '',
  nickname: '',
  avatar: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const response = action.payload;
      state.isLoggedIn = true;
      state.accessToken = response.accessToken;
      state.userId = response.userId;
      state.nickname = response.nickname;
      state.avatar = response.avatar !== null ? response.avatar : defaultIcon;
      console.log(`로그인성공! 아이디는 ${state.userId}`);
      console.log(`로그인성공! accessToken ${state.accessToken}`);
      console.log(`로그인성공! 닉네임은 ${state.nickname}`);
      console.log(`로그인성공! 아바타는 ${state.avatar}`);
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.userId = '';
      state.nickname = '';
      state.avatar = '';
      localStorage.removeItem('response');
    },
    userInfoEdit: (state, action) => {
      const response = action.payload;
      state.nickname = response.nickname;
      state.avatar = response.avatar;
    }
  }
});

export default authSlice.reducer;
export const { userLogin, userLogout, userInfoEdit } = authSlice.actions;
