import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import logger from 'redux-logger'

import thunk from "redux-thunk"

import 'bootstrap/dist/css/bootstrap.css';
import App from './App'
import reducers from "./reducers"
import registerServiceWorker from './registerServiceWorker';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  enhancers(applyMiddleware(logger, thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
