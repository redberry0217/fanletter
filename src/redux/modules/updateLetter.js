import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const __getLetter = createAsyncThunk('GET_LETTER', async (payload, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/letters?_sort=-createdAt');
    console.log('첨에 서버에서 가져온 팬레터', response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __addLetter = createAsyncThunk('ADD_LETTER', async (newLetter, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/letters', newLetter);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteLetter = createAsyncThunk('DELETE_LETTER', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`http://localhost:5000/letters/${id}`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __modifyLetter = createAsyncThunk('MODIFY_LETTER', async ({ letterId, editedContent }, thunkAPI) => {
  try {
    const response = await axios.patch(`http://localhost:5000/letters/${letterId}`, { content: editedContent });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  letters: [],
  isSuccess: false,
  isLoading: false,
  error: null
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getLetter.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(__getLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        state.letters = action.payload;
      })
      .addCase(__getLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(__addLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        state.letters.push(action.payload);
      })
      .addCase(__addLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(__deleteLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        state.letters = state.letters.filter((letter) => letter.id !== action.payload.id);
      })
      .addCase(__deleteLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(__modifyLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        state.letters = state.letters.map((letter) =>
          letter.id === action.payload.id ? { ...letter, content: action.payload.content } : letter
        );
      })
      .addCase(__modifyLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error.message;
      });
  }
});

export default updateLetterSlice.reducer;
export const { addLetter, deleteLetter, modifyLetter } = updateLetterSlice.actions;
