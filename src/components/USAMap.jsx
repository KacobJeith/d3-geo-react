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

  componentDidMount() {

    var rotate = [10, 0];
    var velocity = [.003, 0];
    var time  = Date.now();

    var rotateRef = setInterval(() => {
      var dt = Date.now() - time;
      this.props.spinProjection([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt])
    }, 100);
  }

  render() {
    console.log(this.props.markers);

    var states = [];
    
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