import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../redux/actions'
import { withRouter } from 'react-router-dom'

import LocationMarker from './LocationMarker.jsx'
import DrawState from './DrawState.jsx'

const mapStateToProps = (state) => ({
  markers: state.markers,
  USStates: state.USStates,
  swarmData: state.swarmData
})

class USAMap extends Component {

  render() {
    console.log(this.props.markers);

    var states = [];

    if (this.props.USStates.features) {
      for (var state in this.props.USStates.features) {
        states.push(<DrawState 
                      state={this.props.USStates.features[state]}
                      index={state}
                      key={"state" + state}/>);
      }
    }
    
    return (
      <svg width={ 960 } height={ 600 } viewBox="0 0 960 600">
        <g>{this.props.USStates.features.map((stateData, index) => (
            <DrawState 
              state={stateData}
              key={"state" + index}/>
          ))}
        </g>
        <g>{this.props.swarmData.features.map((checkin, index) => (
          <LocationMarker 
            rawData={checkin}
            coordinates={checkin.geometry.coordinates}
            name={checkin.properties.Name}
            key={checkin.properties.Name + index}/>
        ))}
        </g>
      </svg>
    )
  }
}


var mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(USAMap))