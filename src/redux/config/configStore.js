import { createStore, combineReducers } from "redux";
import updateLetter from "../modules/updateLetter";

const rootReducer = combineReducers({
  updateLetter,
});
const store = createStore(rootReducer);

export default store;
