import React from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
import { Image, ImageBackground, Button, Text, View, Dimensions, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity,StyleSheet, Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';


export default function BookComponent({
  bookId,
  themeName,
  storeName,
  isClear,
  isReview,
  doneDate,
  usedHint,
  clearTime,
  themeImg,
  themeId,
})
{const navigation = useNavigation();
  return (
    <>
      <OutCompoView>
        <CafeTitle>{doneDate[0]}년 {doneDate[1]}월 {doneDate[2]}일</CafeTitle>
        {isReview ? null : <ReviewTxt onPress={() => {
          navigation.navigate("ReviewCreateScreen", {
          themeName: themeName,
          themeId: themeId ,
          bookId: bookId ,
          doneDate: doneDate 
        })}}>후기쓰러가기</ReviewTxt>}
      </OutCompoView>
      <BookContainer>
        <Image source={{ uri: `https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${themeImg}` }} style={{ width:110, height:150, borderRadius:10}} />
        <TextContainer >
          <ThemeTitle>{themeName}</ThemeTitle>
          <StoreName>{storeName}</StoreName>
          <ClearTime>클리어 타임 : {clearTime}</ClearTime>
          <Hint>사용한 힌트 : {usedHint}</Hint>
        </TextContainer>
        <TimeContainer >
            {isClear === 1 ?
            <Image source={require('../assets/images/CLEAR.png')} style={{width:'70%', resizeMode:'contain'}}/> :
            <Image source={require('../assets/images/FAIL.png')} style={{width:'70%', resizeMode:'contain'}}/>}
        </TimeContainer>
      </BookContainer>
    </>
  )
}

const BookContainer = styled.View`
  /* position: relative; */
  /* width: SCREEN_WIDTH; */
  ${({ theme }) => theme.common.flexCenterRow}
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 20px;
  z-index: 1;
`


const TextContainer = styled.View`
  margin: 20px;
  flex:1;
`

const TimeContainer = styled.View`
  position: absolute;
  width: 100px;
  right: -5px;
  bottom: 0;
  z-index: 999;
`

// 추후 이미지 태그로 대체
const CafeImage = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 10px;
`

const ThemeTitle = styled.Text`
  font-family: "SUIT-ExtraBold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  line-height: ${({ theme }) => theme.fontHeight.title2};
  margin-bottom: 4px;
`

const StoreName = styled(ThemeTitle)`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.fontHeight.body};
  color: grey;
`

const ClearTime = styled(StoreName)`
  color: black;
`

const Hint = styled(StoreName)`
  color: black; 
`
const CafeTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: white;
  margin: 10px;
`

const ReviewTxt = styled(CafeTitle)`
  color: ${({ theme }) => theme.colors.point};
`
const ClearView = styled.View`
  /* justify-content: center;
  align-items: center; */
`

const OutCompoView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0px;
`