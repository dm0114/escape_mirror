import React, { useState } from 'react'

import styled from 'styled-components/native';
import theme from '../../theme';

import ReservationComponent from '../components/ReservationComponent';

export default function SearchScreen() {
  const [loading, SetLoading] = useState(false)

  return loading ? <LoadingScreen /> : (
    <Container>
      <SearchView flex={1}><Text>1</Text></SearchView>
      <SearchView flex={1}></SearchView>
      <SearchView flex={1}></SearchView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`
const SearchView = styled.View`
  flex: ${props=> props.flex};
  background-color: ${props => props.backgroundColor};
`

const MainTextView = styled.View`
  flex: ${props=> props.flex};
  ${({ theme }) => theme.common.flexCenterColumn}
`
const MainReservationView = styled.View`
  flex: ${props=> props.flex};
`

const MainText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.title2};
`