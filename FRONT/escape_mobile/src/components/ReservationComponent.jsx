import React from 'react';

import styled from 'styled-components/native';
import theme from '../../theme';

import { useNavigation } from '@react-navigation/native';


export default function ReservationComponent({
  reservationId,
  themeName,
  storeName,
  date,
  reserveTime
}) {
  const navigation = useNavigation()

  return (
    <ReservationContainer 
      onPress={() => {navigation.navigate('ReservationDetailScreen', {
        reservationId: reservationId,
        themeName: themeName,
        storeName: storeName,
        date: date,
        reserveTime: reserveTime
      })}}
      >
      <TextContainer>
        <ThemeTitle>{themeName}</ThemeTitle>
        <CafeTitle>{storeName}</CafeTitle>
      </TextContainer>
      <TimeContainer>
        <TimeText>{date}</TimeText>
      </TimeContainer>
    </ReservationContainer>
  )
}

const ReservationContainer = styled.TouchableOpacity`
  ${({ theme }) => theme.common.flexCenterRow}
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 20px;
`


const TextContainer = styled.View`
  flex: 1;
`

const TimeContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`

const ThemeTitle = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  margin-bottom: 4px;
`
const CafeTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
`
const TimeText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
`