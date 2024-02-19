import { createSlice } from '@reduxjs/toolkit';
import fakeData from 'fakeData.json';

const initialState = {
  letters: fakeData
};

const updateLetterSlice = createSlice({
  name: 'updateLetter',
  initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetter = action.payload;
      return {
        letters: [newLetter, ...state.letters]
      };
    },
    deleteLetter: (state, action) => {
      return {
        letters: state.letters.filter((letter) => letter.id !== action.payload)
      };
    },
    modifyLetter: (state, action) => {
      const { letterId, editedContent } = action.payload;
      return {
        letters: state.letters.map((letter) =>
          letter.id === letterId ? { ...letter, content: editedContent } : letter
        )
      };
    }
  }
});

export default updateLetterSlice.reducer;
export const { addLetter, deleteLetter, modifyLetter } = updateLetterSlice.actions;
