import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

function LoadingScreen() {
  return (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  )
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default LoadingScreen