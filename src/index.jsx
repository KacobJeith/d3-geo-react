// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {HashRouter as Router, Route} from 'react-router-dom'

import USAMap from './components/USAMap.jsx'
import reducers from './redux/reducers.js'
import mapSource from './assets/us-features.json'
import {locations} from './assets/locations.js'


const startState = {
	USStates: mapSource,
	markers: locations
}

console.log(startState);

export const initialState = Immutable.Map(startState)
export const store = createStore(reducers, startState, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router >
		<Route path="/" component={USAMap}/>
	</Router>
  </Provider>,

  document.getElementById('root')
);



