import { configureStore } from '@reduxjs/toolkit';
import updateLetter from '../modules/updateLetter';

const store = configureStore({
  reducer: {
    updateLetter: updateLetter
  }
});
export default store;
