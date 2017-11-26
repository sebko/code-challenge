import { Flex } from 'rebass'
import { responsiveStyle } from 'styled-system'
import styled from 'styled-components'

const flexDirection = responsiveStyle({
  prop: 'direction',
  cssProperty: 'flexDirection',
})

export default styled(Flex)`
  ${flexDirection};
`
