// src/components/WorldMap.js
import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { geoAlbersUsa, geoMercator, geoOrthographic, geoDistance } from "d3-geo"

const mapStateToProps = (state, ownProps) => ({
  city: ownProps.rawData,
  coordinates: ownProps.coordinates,
  name: ownProps.name,
  shouldUpdate: state.update,
  projection: state.projection
})

class LocationMarker extends Component {
  constructor() {
    super()
    this.state = {
      hover: false,
      position: [0,0]
    }
  }

  handleMarkerClick() {
    console.log("Clicked a Location! ", this.props.name);
  }

  isVisible() {
    var geoangle = geoDistance(this.props.coordinates,
            [
                -this.props.projection.rotate()[0],
                this.props.projection.rotate()[1]
            ]);

    if (geoangle > 1.57079632679490)
    {
        return 0;
    } else {
        return 1;
    }
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
        cx: this.props.projection(this.props.coordinates)[0],//this.props.position[0],
        cy: this.props.projection(this.props.coordinates)[1],
        r: 3, 
        fill: this.state.hover ? "#ff0fd3" : "#f9a7ea",
        opacity: this.isVisible(),
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