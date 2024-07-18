// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers';
import App from './App';
import './index.css';
import './styles/_global.scss';
import './styles/Comment.scss';
import './styles/CommentForm.scss';
import './styles/CommentList.scss';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
