import { SET_CURRENT_USER } from "../action/types";
import isEmpty from "../validation/is-empty";

const initState = {
  isAuthenticated: false,
  user: {},
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // if payload is not empty, then the user is authenticated
        user: action.payload,
      };
    default:
      return state;
  }
}
