import { Flex } from 'rebass'
import styled from 'styled-components'

export const IncidentList = styled.div`
  display: ${({ isListOpen }) => (isListOpen ? 'flex' : 'none')};

  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}em) {
    display: flex;
  }
`
export const IncidentListContainer = styled(Flex)`
  z-index: 1;
  background: white;
  overflow-y: scroll;
  position: absolute;
  width: 100vw;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 0.5rem hsl(0, 0%, 0%);
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}em) {
    width: 25rem;
    max-height: 100vh;
    position: static;
  }
  ${({ isListOpen }) => isListOpen && 'max-height: 20rem'};
`
