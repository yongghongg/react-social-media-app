import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
} from "./types";

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading()); // set loading to true while fetching data
  axios
    .get("/api/profile")
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) => dispatch({ type: GET_PROFILE, payload: {} })); // if there's no profile, we dont want an error because there's nothing with that, we just want to render dashboard differently when there's no profile
};

// Create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard")) // redirect to dashboard after creating profile
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading()); // set loading to true while fetching data
  axios
    .get("/api/profile/all")
    .then((res) => {
      dispatch({ type: GET_PROFILES, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_PROFILES, payload: null })); // if there's no profile, we dont want an error because there's nothing with that, we just want to render dashboard differently when there's no profile
};

// Get profile by handle
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading()); // set loading to true while fetching data
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) => dispatch({ type: GET_PROFILE, payload: null })); // if there's no profile, we dont want an error because there's nothing with that, we just want to render dashboard differently when there's no profile
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

// Add Experience
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post("/api/profile/experience", expData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Add Education
export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", eduData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Delete Experience
export const deleteExperience = (expID) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${expID}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data, // when we delete an exp, we get back the updated profile
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Delete Education
export const deleteEducation = (eduID) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${eduID}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data, // when we delete an exp, we get back the updated profile
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Delete account & profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? The action cannot be undone.")) {
    axios
      .delete("/api/profile")
      .then((res) => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch((err) =>
        dispatch({ type: GET_ERRORS, payload: err.response.data })
      );
  }
};
