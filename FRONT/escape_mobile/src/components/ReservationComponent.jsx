import React from 'react';

import styled from 'styled-components/native';
import theme from '../../theme';

export default function ReservationComponent({
  reservationId,
  themeName,
  storeName,
  date,
  reserveTime
}) {
  return (
    <ReservationContainer>
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

const ReservationContainer = styled.View`
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