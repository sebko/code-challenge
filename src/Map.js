import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps'
import { compose, withProps } from 'recompose'
import React from 'react'

import data from './data'

class MyMapComponent extends React.Component {
  state = {
    incidents: [],
    incidentsWithinBounds: [],
  }
  componentDidMount() {
    const proxyurl = 'https://crossorigin.me/'
    const url = 'https://victraffic-api.wd.com.au/api/v3/incidents'
    const { incidents } = data
    this.setState({ incidents })
    // axios.get(proxyurl + url).then(({ data }) => {
    //   const { incidents } = data
    //   this.setState({ incidents })
    //   this.handleOnBoundsChanged()
    // })
  }
  handleOnBoundsChanged = () => {
    const { handleUpdatedIncidentsWithinBounds } = this.props
    const { incidents } = this.state
    const bounds = this.map && this.map.getBounds()
    var southWest = bounds.getSouthWest()
    var northEast = bounds.getNorthEast()
    var Bounds = new window.google.maps.LatLngBounds(southWest, northEast)
    const incidentsWithinBounds = incidents.filter(incident =>
      Bounds.contains(
        new window.google.maps.LatLng(incident.lat, incident.long)
      )
    )
    handleUpdatedIncidentsWithinBounds(incidentsWithinBounds)
  }
  render() {
    const { incidents, incidentsWithinBounds } = this.state
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -37.813603, lng: 144.962559 }}
        ref={map => (this.map = map)}
        onBoundsChanged={this.handleOnBoundsChanged}
      >
        {incidents.map(incident => (
          <Marker
            key={incident.id}
            position={{
              lat: Number(incident.lat),
              lng: Number(incident.long),
            }}
          />
        ))}
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBU_UR_VVEPRMxbdbnx9SZTOKKc1CXcbzA&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(MyMapComponent)
