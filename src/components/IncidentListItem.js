import { Border, Text } from 'rebass'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled(Border)`
  min-height: 5rem;
  &:last-child {
    margin-bottom: 3.5rem;
  }
`

export default ({ incident }) => {
  const { alert_type, title } = incident
  return (
    <Wrapper px={2} py={3}>
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
    </Wrapper>
  )
}
