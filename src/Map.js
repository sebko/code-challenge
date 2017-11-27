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

class Map extends React.Component {
  state = {
    selectedIncidentId: undefined,
  }
  setSelectedIncidentId = incidentId => () => {
    this.setState({ selectedIncidentId: incidentId })
  }
  render() {
    const { onBoundsChanged, mapRef, incidentsWithinBounds } = this.props
    const { selectedIncidentId } = this.state
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -37.813603, lng: 144.962559 }}
        ref={mapRef}
        onBoundsChanged={onBoundsChanged}
      >
        {incidentsWithinBounds.map(({ id, lat, long, title, alert_type }) => (
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
)(Map)
