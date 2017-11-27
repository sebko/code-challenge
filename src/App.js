import 'sanitize.css/sanitize.css'

import './globalStyles'

import { Provider } from 'rebass'
import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { IncidentList, IncidentListContainer } from './components/IncidentList'
import Flex from './components/Flex'
import IncidentListItem from './components/IncidentListItem'
import Map from './Map'
import Spinner from './Spinner'
import ToggleIncidentListButton from './components/ToggleIncidentListButton'
import localData from './data'

const Container = styled(Flex)`
  height: 100%;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}em) {
    flex-direction: row;
  }
`
const MapContainer = styled(Flex)`
  flex: 1;
`

class App extends React.Component {
  state = {
    incidents: [],
    incidentsWithinBounds: [],
    isListOpen: false,
    isFetching: undefined,
  }
  componentDidMount() {
    const proxyurl = 'https://crossorigin.me/'
    const url = 'https://victraffic-api.wd.com.au/api/v3/incidents'
    const config = {
      method: 'get',
      url: proxyurl + url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    this.setState({ isFetching: true }, () => {
      axios(config).then(
        ({ data }) => {
          const { incidents } = data
          this.setState({ incidents, isFetching: false })
          this.handleOnBoundsChanged()
        },
        () => {
          const { incidents } = localData
          alert('using local data')
          this.setState({ incidents, isFetching: false })
          this.handleOnBoundsChanged()
        }
      )
    })
  }
  handleOnBoundsChanged = () => {
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
    this.setState({ incidentsWithinBounds })
  }
  toggleIncidentList = () => {
    this.setState(({ isListOpen }) => ({
      isListOpen: !isListOpen,
    }))
  }
  render() {
    const { incidentsWithinBounds, isListOpen, isFetching } = this.state
    return (
      <Provider>
        <Container>
          <IncidentListContainer column isListOpen={isListOpen}>
            {isFetching && (
              <Flex mt={4}>
                <Spinner />
              </Flex>
            )}
            <IncidentList isListOpen={isListOpen}>
              {incidentsWithinBounds.map(incident => (
                <IncidentListItem incident={incident} key={incident.id} />
              ))}
            </IncidentList>
          </IncidentListContainer>
          <MapContainer w={['100%', 8 / 10]}>
            <Map
              onBoundsChanged={this.handleOnBoundsChanged}
              incidentsWithinBounds={incidentsWithinBounds}
              mapRef={el => (this.map = el)}
            />
          </MapContainer>
          <ToggleIncidentListButton
            onClick={this.toggleIncidentList}
            px={2}
            py={3}
          >
            {isFetching === false ? (
              <div>
                {isListOpen ? 'Hide' : 'Show'} incident list&nbsp;
                {incidentsWithinBounds.length}
              </div>
            ) : (
              <Spinner />
            )}
          </ToggleIncidentListButton>
        </Container>
      </Provider>
    )
  }
}

export default App
