import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps'
import { Text } from 'rebass'
import { compose, withProps } from 'recompose'
import React from 'react'
import axios from 'axios'

class MyMapComponent extends React.Component {
  state = {
    incidents: [],
    incidentsWithinBounds: [],
    selectedIncidentId: undefined,
  }
  componentDidMount() {
    const proxyurl = 'https://crossorigin.me/'
    const url = 'https://victraffic-api.wd.com.au/api/v3/incidents'
    axios.get(proxyurl + url).then(({ data }) => {
      const { incidents } = data
      this.setState({ incidents })
      this.handleOnBoundsChanged()
    })
  }
  setSelectedIncidentId = incidentId => () => {
    this.setState({ selectedIncidentId: incidentId })
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
    const { incidents, incidentsWithinBounds, selectedIncidentId } = this.state
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -37.813603, lng: 144.962559 }}
        ref={map => (this.map = map)}
        onBoundsChanged={this.handleOnBoundsChanged}
      >
        {incidents.map(({ id, lat, long, title, alert_type }) => (
          <Marker
            key={id}
            position={{
              lat: Number(lat),
              lng: Number(long),
            }}
            onClick={this.setSelectedIncidentId(id)}
          >
            <div>
              {selectedIncidentId === id && (
                <InfoWindow
                  onCloseClick={this.setSelectedIncidentId(undefined)}
                >
                  <div>
                    <div>
                      <Text is="span" bold>
                        Title:
                      </Text>{' '}
                      <Text is="span">{title}</Text>
                    </div>
                    <div>
                      <Text is="span" bold>
                        Alert type:
                      </Text>{' '}
                      <Text is="span">{alert_type}</Text>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </div>
          </Marker>
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
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(MyMapComponent)
