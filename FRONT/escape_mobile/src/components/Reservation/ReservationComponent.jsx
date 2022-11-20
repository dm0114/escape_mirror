import React, { useState } from 'react';
import styled from 'styled-components/native';
import MyTimer from '../TimerComponent';
import { useNavigation } from '@react-navigation/native';
import { Timer } from './KorTimeComponent';
import { Animated, Text, View } from 'react-native';
import { LayoutData } from '../../store/Atom';
import { useRecoilValue } from 'recoil';


export default function ReservationComponent({
  reservationId,
  themeName,
  storeName,
  date,
  reserveTime,
  transferStatus
}) {
  const layoutDatas = useRecoilValue(LayoutData)
  const {Width, Height} = layoutDatas

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
        {transferStatus ? 
          <View style={{backgroundColor: '#00000090', position:'absolute', top: 0, left: -1, padding: 20, borderRadius: 21, width: Width-38, height: 92, justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <TransferThemeTitle>양도중 ...</TransferThemeTitle>
          </View>
        : null}
        <TextContainer>
          <ThemeTitle>{themeName.length >= 12 ? `${themeName.slice(0, 12)}...` : themeName }</ThemeTitle>
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

  /* border-width: 1px;
  border-style: solid;
  border-color: #00000010; */
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
const TransferThemeTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  margin-bottom: 4px;
  letter-spacing: -0.5px;
  color: #fff;
`
const CafeTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  color: #9b989b;
`