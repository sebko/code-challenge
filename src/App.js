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
    const url = 'https://victraffic-api.wd.com.au/api/v3/incidents'
    this.setState({ isFetching: true }, () => {
      axios.get(url).then(({ data }) => {
        const { incidents } = data
        this.setState({ incidents, isFetching: false })
      })
    })
  }
  toggleIncidentList = () => {
    this.setState(({ isListOpen }) => ({
      isListOpen: !isListOpen,
    }))
  }
  render() {
    const {
      incidentsWithinBounds,
      isListOpen,
      incidents,
      isFetching,
    } = this.state
    return (
      <Provider>
        <Container>
          <IncidentListContainer column isListOpen={isListOpen}>
            <IncidentList isListOpen={isListOpen}>
              {incidentsWithinBounds.map(incident => (
                <IncidentListItem incident={incident} key={incident.id} />
              ))}
            </IncidentList>
          </IncidentListContainer>
          <MapContainer w={['100%', 8 / 10]}>
            <Map
              handleUpdatedIncidentsWithinBounds={
                this.handleUpdatedIncidentsWithinBounds
              }
              incidents={incidents}
            />
          </MapContainer>
          <ToggleIncidentListButton
            onClick={this.toggleIncidentList}
            px={2}
            py={3}
          >
            {isFetching ? (
              <Spinner />
            ) : (
              <div>
                {isListOpen ? 'Hide' : 'Show'} incident list&nbsp;
                {incidentsWithinBounds.length}
              </div>
            )}
          </ToggleIncidentListButton>
        </Container>
      </Provider>
    )
  }
}

export default App
