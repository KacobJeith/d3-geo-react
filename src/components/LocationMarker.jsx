// src/components/WorldMap.js
import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { geoAlbersUsa } from "d3-geo"

const mapStateToProps = (state, ownProps) => ({
  city: ownProps.city,
  projection: ownProps.projection,
  index: ownProps.index
})

class LocationMarker extends Component {
  constructor() {
    super()
    this.state = {
      hover: false,
      position: [0,0]
    }
  }

  componentDidMount() {

    var reversedCoordinates = this.props.city.coordinates.reverse();
    var projectedLocation = this.projection()(reversedCoordinates);

    this.setState({position: projectedLocation})

  }

  handleMarkerClick() {
    console.log("Clicked a Location! ", this.props.city.name);
  }

  projection() {
    return geoAlbersUsa()
      .translate([ 960 / 2, 600 / 2 ])
  }

  render() {

    if (this.state.position == null) {
      console.log("null location...")
      return (<g/>)
    }

    var inputs = {
      marker: {
        style: {
          cursor: "pointer"
        },
        cx: this.state.position[0],
        cy: this.state.position[1],
        r: this.props.city.games, 
        fill: this.state.hover ? "#ff0fd3" : "#f9a7ea",
        stroke: "#FFFFFF",
        onClick: () => this.handleMarkerClick(), 
        onMouseEnter: () => this.setState({hover: true}),
        onMouseLeave: () => this.setState({hover: false}),
      }
    }

    return (<circle {...inputs.marker}/> )
  }
}

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationMarker))