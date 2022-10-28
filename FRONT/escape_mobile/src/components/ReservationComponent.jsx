import React from 'react';

import styled from 'styled-components/native';
import theme from '../../theme';

export default function ReservationComponent() {
  return (
    <ReservationContainer>
      <TextContainer>
        <ThemeTitle>테마이름</ThemeTitle>
        <CafeTitle>카페이름</CafeTitle>
      </TextContainer>
      <TimeContainer>
        <TimeText>22:22:22</TimeText>
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