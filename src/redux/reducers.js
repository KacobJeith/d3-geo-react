import { combineReducers } from 'redux'
import Immutable from 'immutable'
// import 'babel-polyfill'
import { initialState } from '../index'
import {geoAlbersUsa, geoMercator, geoOrthographic} from "d3-geo"

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SPIN_PROJECTION' :

      	return Immutable.Map(state).set('projection', state.projection.rotate(action.rotation)).set('update', !state.update).toJS()

    default:
      return state
  }
}
