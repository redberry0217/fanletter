import fakeData from "fakeData.json";

export const ADD_LETTER = "updateLetter/ADD_LETTER";
export const DELETE_LETTER = "updateLetter/DELETE_LETTER";
export const MODIFY_LETTER = "updateLetter/MODIFY_LETTER";

export const addLetter = (payload) => ({
  type: ADD_LETTER,
  payload,
});

export const deleteLetter = (payload) => ({
  type: DELETE_LETTER,
  payload,
});

export const modifyLetter = (letterId, editedContent) => ({
  type: MODIFY_LETTER,
  payload: {
    letterId,
    editedContent,
  },
});

const initialState = {
  letters: fakeData,
};

const updateLetter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LETTER:
      const newLetter = action.payload;
      return {
        letters: [newLetter, ...state.letters],
      };

    case DELETE_LETTER:
      return {
        letters: state.letters.filter((letter) => letter.id !== action.payload),
      };

    case MODIFY_LETTER:
      const { letterId, editedContent } = action.payload;
      return {
        letters: state.letters.map((letter) =>
          letter.id === letterId
            ? { ...letter, content: editedContent }
            : letter
        ),
      };

    default:
      return state;
  }
};

export default updateLetter;
