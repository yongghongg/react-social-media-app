import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
} from "../action/types";

const initState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts], // !! be careful with the SPELLING! postS!
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
