import { Border } from 'rebass'
import styled from 'styled-components'

export default styled(Border)`
  display: flex;
  background: white;
  z-index: 2;
  position: relative;
  min-height: 3.5rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}em) {
    display: none;
  }
`
