import { GET_ERRORS, CLEAR_ERRORS } from "../action/types";

const initState = {};

export default function errorReducer(state = initState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
