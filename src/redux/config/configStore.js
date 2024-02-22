import { configureStore } from '@reduxjs/toolkit';
import updateLetter from '../modules/letterSlice';
import auth from '../modules/authSlice';

const store = configureStore({
  reducer: {
    updateLetter: updateLetter,
    auth: auth
  }
});
export default store;
