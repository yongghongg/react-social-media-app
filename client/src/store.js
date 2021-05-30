import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // this is actually calling the index.js in reducer file

const initState = {};

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initState,
  // applyMiddleware(...middleWare)
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
