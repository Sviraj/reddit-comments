// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducers";
import App from "./App";
import "./index.css";
import "./styles/_global.scss";
import "./styles/Comment.scss";
import "./styles/CommentForm.scss";
import "./styles/CommentList.scss";
import { State } from "./store/types";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state : State) => {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }catch{

  }
};

// Create the Redux store
const store = createStore(reducer, loadState());

// Subscribe to store updates to save state changes to local storage
store.subscribe(() =>{
  saveState(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
