import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "./types";

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading()); // set loading to true while fetching data
  axios
    .get("/api/profile")
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) => dispatch({ type: GET_PROFILE, payload: {} })); // if there's no profile, we dont want an error because there's nothing with that, we just want to render dashboard differently when there's no profile
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
