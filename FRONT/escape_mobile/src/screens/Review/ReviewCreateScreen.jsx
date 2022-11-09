import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import {Image,StyleSheet,FlatList,useWindowDimensions, ImageBackground, Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons'; 
import StarRating from 'react-native-star-rating-widget';

// {
// ”themeId”: 5,
// ”reviewImg”:”리뷰 이미지 경로”,
// ”star”: 5,
// ”feelDifficulty”: 6,
// ”feelStory”: 3,
// ”feelInterrior”: 6,
// ”feelActivity”: 8,
// ”feelHorror”: 9,
// ”locker”: 60(퍼센트),
// ”content”: “리뷰 내용”
// }

export default function ReviewCreateScreen() {
  const [isImage, setImage] = useState(false)
  const [rating, setRating] = useState(0);
  
  function ShowPicker() {
      //launchImageLibrary : 사용자 앨범 접근
    launchImageLibrary({}, (res)=>{
    alert(res.assets[0].uri)
    const formdata = new FormData()
    formdata.append('file', res.assets[0].uri);
    console.log(res);
  })
  }
  return (
    <Container>

      <ThemeTitleView>
        {/*GET 테마 이름*/}
        <ThemeTitleTxt>킹스맨</ThemeTitleTxt>
        {/*GET 방문 일시 */}
        <DateTxt>2022.09.07</DateTxt>
      </ThemeTitleView>
      {/* 평점 - ”star”*/}
      <StarView>
        <StarRating
        rating={rating}
        onChange={setRating}
        />
      </StarView>
      {/* 리뷰사진 - ”reviewImg”*/}
      <ReviewView>
        <CameraBtn>
          <Ionicons name="camera" size={24} color="white" />
          <CameraTxt onPress={ShowPicker}>사진 첨부하기</CameraTxt>
        </CameraBtn>
        {isImage?<Image source={{ uri: 'https://pbs.twimg.com/media/E80HdMrUcAQv4hi.jpg' }} style={styles.tinyImage}></Image>:<></>}
      </ReviewView>

       
      {/* 난이도 - ”feelDifficulty”*/}

      {/* 활동성 -”feelActivity”  */}

      {/* 공포도 - ”feelHorror” */}

      {/* 잠금장치 - ”locker” */}

      {/* 내용 작성 - ”content” */}


    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 80px 20px 0px 20px;
  justify-content: center;
  align-items: center;
`

const ThemeTitleView = styled.View`
  justify-content: center;
  align-items: center;
`

const ThemeTitleTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size:  ${({ theme }) => theme.fontSizes.title1};
  line-height:  ${({ theme }) => theme.fontHeight.title1};
  color: white;
`

const DateTxt = styled.Text`
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.body};
  line-height:  ${({ theme }) => theme.fontHeight.body};
  color: white;
`

const ReviewView = styled.View`
  
`

const CameraBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  margin: 10px 0px;
  padding: 3px;
`

const CameraTxt = styled.Text`
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.caption1};
  line-height:  ${({ theme }) => theme.fontHeight.caption1};
  color: white;
  margin: 5px;
`
const StarView = styled.View`
  margin: 20px;
`
const styles = StyleSheet.create({
  tinyImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
});