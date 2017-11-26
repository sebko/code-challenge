import 'sanitize.css/sanitize.css'

import './globalStyles'

import { Provider } from 'rebass'
import React from 'react'
import styled from 'styled-components'

import Map from './Map'

import { IncidentList, IncidentListContainer } from './components/IncidentList'
import Flex from './components/Flex'
import IncidentListItem from './components/IncidentListItem'
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
    incidentsWithinBounds: [],
    isListOpen: false,
  }
  handleUpdatedIncidentsWithinBounds = incidentsWithinBounds => {
    this.setState({ incidentsWithinBounds })
  }
  toggleIncidentList = () => {
    this.setState(({ isListOpen }) => ({
      isListOpen: !isListOpen,
    }))
  }
  render() {
    const { incidentsWithinBounds, isListOpen } = this.state
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
            />
          </MapContainer>
          <ToggleIncidentListButton
            onClick={this.toggleIncidentList}
            px={2}
            py={3}
          >
            {isListOpen ? 'Hide' : 'Show'} incident list&nbsp;
            {incidentsWithinBounds.length}
          </ToggleIncidentListButton>
        </Container>
      </Provider>
    )
  }
}

export default App
