import axios from "axios";
// import setAuthToken from "../util/setAuthToken";
// import jwt_decode from "jwt-decode";

import { ADD_POST, GET_POSTS, GET_ERRORS, POST_LOADING } from "./types";

// Add Post
export const addPost = (postData) => (dispatch) => {
  axios
    .post("/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};