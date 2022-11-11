import React from 'react';

import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import MyTimer from '../TimerComponent';

export default function ReservationComponent({
  reservationId,
  themeName,
  storeName,
  date,
  reserveTime
}) {
  const navigation = useNavigation()
    
    const Timer = () => {
      // 시간 나면 캐싱
      // 한국 시간
      var now = new Date();
      const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값
      const koreaTimeDiff = 5 * 60 * 60 * 1000 + 385000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
      const koreaNow = new Date(utcNow - koreaTimeDiff);
    
      // 현재시간 
      var year = koreaNow.getFullYear();     // 연도
      var month = koreaNow.getMonth();     // 월                             
      var day = koreaNow.getDate();          // 일
      var hours = koreaNow.getHours();       // 현재 시간
      var minutes = koreaNow.getMinutes();   // 현재 분
      var seconds = koreaNow.getSeconds();   // 현재 초
      
      // 비교시간    
      var sttDt = date.split("-");
      var sttTime = reserveTime.split(":");
      var sttYear = sttDt[0];
      var sttMonth = sttDt[1] - 1;
      var sttDay = sttDt[2];
      var sttHours = sttTime[0] - 8;
      var sttMinutes = sttTime[1];

      var date1 = new Date(year, month, day, hours, minutes, seconds);                    // 현재 
      var date2 = new Date(sttYear, sttMonth, sttDay, sttHours, sttMinutes);              // 파라미터
      var elapsedSec = (date2.getTime() - date1.getTime()) / 1000; 
      return elapsedSec
    }
    const time = new Date();
    time.setSeconds(time.getSeconds() + Timer())

  return (
    <ReservationContainer 
      style={{elevation: 10}}
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
        <MyTimer expiryTimestamp={time} />
      </TimeContainer>
    </ReservationContainer>
  )
}

const ReservationContainer = styled.TouchableOpacity`
  ${({ theme }) => theme.common.flexCenterRow}
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;

  border-width: 1px;
  border-style: solid;
  border-color: #00000010;
`


const TextContainer = styled.View`
`

const TimeContainer = styled.View`
  margin-left: auto;
`

const ThemeTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
  margin-bottom: 4px;
  letter-spacing: -0.5px;
`
const CafeTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  color: #9b989b;
`
const TimeText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
`;
