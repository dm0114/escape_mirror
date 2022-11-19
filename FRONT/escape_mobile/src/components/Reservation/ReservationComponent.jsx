import React, { useState } from 'react';
import styled from 'styled-components/native';
import MyTimer from '../TimerComponent';
import { useNavigation } from '@react-navigation/native';
import { Timer } from './KorTimeComponent';
import { Animated } from 'react-native';


export default function ReservationComponent({
  reservationId,
  themeName,
  storeName,
  date,
  reserveTime
}) {
  const [fadeAnim ] = useState(new Animated.Value(0));
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const navigation = useNavigation()

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <ReservationContainer 
        activeOpacity={0.6}
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
          <MyTimer expiryTimestamp={Timer(date, reserveTime)} />
        </TimeContainer>
      </ReservationContainer>
    </Animated.View>
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