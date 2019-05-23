import React from 'react';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './store/reducers'
import Routes from './routes'


const store = applyMiddleware(
  thunk, multi, promise)(
    createStore)(
      reducers, composeWithDevTools())


const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)
export default App