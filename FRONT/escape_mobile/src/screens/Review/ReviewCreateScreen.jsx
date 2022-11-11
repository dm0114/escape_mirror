import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import {Image,StyleSheet,FlatList,useWindowDimensions, ImageBackground, Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons'; 
import StarRating from 'react-native-star-rating-widget';
import { Incubator,Colors,Typography } from 'react-native-ui-lib';
//카메라, 앨범 접근 라이브러리
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TextArea, Box, Center, NativeBaseProvider,Select } from "native-base";
import _ from 'lodash';
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
//별 반개가 1점!

// const numberItems = _.map([
//   10,9,8,7,6,5,4,3,2,1,0
//   // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// ],
//   item => ({ label: item, value: item, align: Incubator.WheelPickerAlign.RIGHT }));

// const diffItems = _.times(11, i => i)
//   .reverse()
//   .map(item => ({ label: `${item}`, value: item }))

// const activeItems = _.times(10, i => i)
//   .reverse()
//   .map(item => ({ label: `${item}`, value: item }))
  
// const horrorItems = _.times(10, i => i)
//   .reverse()
//   .map(item => ({ label: `${item}`, value: item }))
// const lockerItems = _.times(10, i => i)
//   .reverse()
//   .map(item => ({ label: `${item}`, value: item }))
  
export default function ReviewCreateScreen() {
  const [isImage, setImage] = useState(false);
  //별 rating -- 별 반개가 1점이게 보내야함
  const [rating, setRating] = useState(0);
  //난이도 diff
  const [different, setDifferent] = useState(0);
  //활동성 activ
  const [active, setActive] = useState(0);
  //공포도 horror
  const [horror, setHorror] = useState(0);
  //잠금장치 locker
  const [locker, setLocker] = useState(0);
  //내용 작성
  const [textAreaValue, setTextAreaValue] = useState("");

  console.log(rating,different,textAreaValue)

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
      {/* 평점 - ”star” 별 반개가 1점!!*/}
      <StarView>
        <StarRating
        rating={rating}
        onChange={(rating)=>setRating(rating)}
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

      <EvalView>
      {/* 난이도 - ”feelDifficulty”
          활동성 -”feelActivity”  
          공포도 - ”feelHorror” 
          잠금장치 - ”locker”
      */}

      <EvalTxtView>
        <EvalTxt>난이도</EvalTxt>
        <EvalTxt>활동성</EvalTxt>
        <EvalTxt>공포도</EvalTxt>
        <EvalTxt>잠금장치</EvalTxt>
      </EvalTxtView>
        
      <EvalCntView>
          {/* <Text>9</Text>
          <Incubator.WheelPicker
            initialValue={'February'}
            activeTextColor={Colors.$textPrimary}
            inactiveTextColor={Colors.$textNeutralHeavy}
            items={diffItems}
            textStyle={Typography.text60R}
            numberOfVisibleRows={3} 
          /> */}
          {/* 난이도 */}
        <SelectBox>
          <Select color="amber.100" selectedValue={different} minWidth="75" accessibilityLabel="난이도" placeholder="0" _selectedItem={{
            bg: "teal.600",
            endIcon: <Ionicons name="checkmark-circle" size={10} color="white" />
            }} mt={1} onValueChange={itemValue => setDifferent(itemValue)}>
            <Select.Item label="1" value="1" />
            <Select.Item label="2" value="2" />
            <Select.Item label="3" value="3" />
            <Select.Item label="4" value="4" />
            <Select.Item label="5" value="5" />
            <Select.Item label="6" value="6" />
            <Select.Item label="7" value="7" />
            <Select.Item label="8" value="8" />
            <Select.Item label="9" value="9" />
            <Select.Item label="10" value="10" />
          </Select>
        </SelectBox>
          {/* 활동성 */}
        <SelectBox> 
          <Select color="amber.100" selectedValue={active} minWidth="75" accessibilityLabel="난이도" placeholder="0" _selectedItem={{
            bg: "teal.600",
            endIcon: <Ionicons name="checkmark-circle" size={10} color="white" />
            }} mt={1} onValueChange={itemValue => setActive(itemValue)}>
            <Select.Item label="1" value="1" />
            <Select.Item label="2" value="2" />
            <Select.Item label="3" value="3" />
            <Select.Item label="4" value="4" />
            <Select.Item label="5" value="5" />
            <Select.Item label="6" value="6" />
            <Select.Item label="7" value="7" />
            <Select.Item label="8" value="8" />
            <Select.Item label="9" value="9" />
            <Select.Item label="10" value="10" />
          </Select>
        </SelectBox> 
          {/* 공포도 */}
        <SelectBox>
          <Select color="amber.100" selectedValue={horror} minWidth="75" accessibilityLabel="난이도" placeholder="0" _selectedItem={{
            bg: "teal.600",
            endIcon: <Ionicons name="checkmark-circle" size={10} color="white" />
            }} mt={1} onValueChange={itemValue => setHorror(itemValue)}>
            <Select.Item label="1" value="1" />
            <Select.Item label="2" value="2" />
            <Select.Item label="3" value="3" />
            <Select.Item label="4" value="4" />
            <Select.Item label="5" value="5" />
            <Select.Item label="6" value="6" />
            <Select.Item label="7" value="7" />
            <Select.Item label="8" value="8" />
            <Select.Item label="9" value="9" />
            <Select.Item label="10" value="10" />
          </Select>
        </SelectBox>
          {/* 잠금장치 */}
        <SelectBox>
          <Select color="amber.100" selectedValue={locker} minWidth="75" accessibilityLabel="난이도" placeholder="0" _selectedItem={{
            bg: "teal.600",
            endIcon: <Ionicons name="checkmark-circle" size={10} color="white" />
            }} mt={1} onValueChange={itemValue => setLocker(itemValue)}>
            <Select.Item label="10" value="10" />
            <Select.Item label="20" value="20" />
            <Select.Item label="30" value="30" />
            <Select.Item label="40" value="40" />
            <Select.Item label="50" value="50" />
            <Select.Item label="60" value="60" />
            <Select.Item label="70" value="70" />
            <Select.Item label="80" value="80" />
            <Select.Item label="90" value="90" />
            <Select.Item label="100" value="100" />
          </Select>
        </SelectBox>
      </EvalCntView>
      </EvalView>

      {/* 내용 작성 - ”content” */}
      <Box alignItems="center" w="100%">
        <TextArea
          value={textAreaValue}
          placeholder="리뷰를 작성해주세요!"
          onChangeText={text => setTextAreaValue(text)}
          color="white"
          w="90%"
          fontSize={15}
          fontFamily="SUIT-Medium"
          margin={5}
        />
      </Box>
      
      <EnrollView>
        <EnrollBtn>
          <EnrollTxt>등록</EnrollTxt>
        </EnrollBtn>
      </EnrollView>


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

const EvalView = styled.View`

`

const EvalTxtView = styled.View`
  flex-direction: row;
  margin: 10px 5px 5px 0px;
  justify-content: space-around;
`

const EvalTxt = styled.Text`
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.body};
  line-height:  ${({ theme }) => theme.fontHeight.body};
  color: white;
  margin-top: 25px;
`

const EvalCntView = styled(EvalTxtView)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const SelectBox = styled.View`
  margin: 0px 5px 5px 15px;
`

const EvalDiff = styled.Text`
`
const EnrollView = styled.View`
  align-items: flex-end;
`
const EnrollBtn = styled.TouchableOpacity`
  background-color: tomato;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`
const EnrollTxt = styled.Text`
  color: white;
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.body};
  padding: 10px;
`
const styles = StyleSheet.create({
  tinyImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
})

