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
// import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AWS from 'aws-sdk';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getActiveLog } from '../../apis/MyPage';
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


export default function ReviewCreateScreen() {
  const { data: activeData } = useQuery(['myActive'], getActiveLog)
  console.log(activeData)
  
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

  // console.log(rating, different, textAreaValue)

  const UploadImage = async () => {
    const image = {
      uri: '',
      type: '',
      name: '',
    };
    await launchImageLibrary({}, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorCode);
      }
      else if (res.assets) { //정상적으로 사진을 반환 받았을 때
        console.log('ImagePicker data: ', res.assets);
        image.name = res.assets[0].fileName;
        image.type = res.assets[0].type;
        image.uri = Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', '');
      }
    })

    const formdata = new FormData();
    formdata.append('pureblood3-image-for-user', image); //key(=fieldname)이 곧 사진이 업로드 될 S3의 폴더 이름임

    console.log(formdata)
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      // field: 'file',
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
      // headers :{'Content-Type': 'multipart/form-data'} 헤더를 지정해줄거면 multipart/form-data로 지정해주어야함
      // headers를 위처럼 따로 지정해 주지 않아도 되긴 함
    };

    await fetch("https://pureblood3-image-for-user.s3.ap-northeast-2.amazonaws.com", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  

  return (
    <KeyboardAwareScrollView>
    <Container>

      <ThemeTitleView>
        {/*GET 테마 이름*/}
        {/* <ThemeTitleTxt>{activeData[0]?.themeName}</ThemeTitleTxt> */}
        {/*GET 방문 일시 */}
        {/* <DateTxt>{activeData[0]?.doneDate}</DateTxt> */}
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
        <CameraBtn onPress={UploadImage} >
          <Ionicons name="camera" size={24} color="white" />
          <CameraTxt >사진 첨부하기</CameraTxt>
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
    </KeyboardAwareScrollView>
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
  /* margin: 2; */
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


// function onFileUpload(e) {
  //   const ACCESS_KEY = 'AKIAQGFLFS7ERZZCFDOO';
  //   const SECRET_ACCESS_KEY = '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';
  //   const REGION = "ap-northeast-2";
  //   const S3_BUCKET = 'pureblood3-image-for-user';

    
    

  //   // AWS ACCESS KEY를 세팅합니다.
  //   AWS.config.update({
  //     accessKeyId: ACCESS_KEY,
  //     secretAccessKey: SECRET_ACCESS_KEY
  //   });

  //   // 버킷에 맞는 이름과 리전을 설정합니다.
  //   const myBucket = new AWS.S3({
  //     params: { Bucket: S3_BUCKET},
  //     region: REGION,
  //   });

  //   const file = e.target.files[0];

  //   // 파일과 파일이름을 넘겨주면 됩니다.
  //   const params = {
  //     ACL: 'public-read',
  //     Body: file,
  //     Bucket: S3_BUCKET,
  //     Key: file.name
  //   };
    
  //   myBucket.putObject(params)
  //     .on('httpUploadProgress', (evt) => {
  //       alert("SUCCESS")
  //     })
  //     .send((err) => {
  //       if (err) console.log(err)
  //     })
  // }


  //++++++++++++++++++++++++++++++
      // formdata.append('fileImg', {
    //   uri: image.uri.includes(':')
    //     ? image.uri
    //     : 'file://' + image.uri,
    //   type: image.type,
    //   name: image.name,
    // });
    // console.log(formdata)
    // const result = await axios.put(`${BASE_URL}`, formdata, {
    //   redirect: 'follow',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   transformRequest: (data, headers) => {
    //     return data;
    //   },
    // })
    
    // const headers = {
    //   'Content-Type': image.type,
    // };
    // console.log('image',image);
    // console.log('formdata',formdata);

//     axios.post("https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/", formdata, {headers: headers})
//     // axios.post("https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/", formdata)
//     .then(response => {
//       if(response){
//         console.log('ok',response.data)
//       }
//     })
//     .catch((error)=> {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log('err',error.response.data);
//       console.log('err',error.response.status);
//       console.log('err',error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log('err',error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//  })

    // //launchImageLibrary : 사용자 앨범 접근
    // launchImageLibrary({}, (res) => {
    //   alert(res.assets[0].uri)
    // const formdata = new FormData()
    // formdata.append('file', res.assets[0].uri);
    // console.log(res);
    // })
    
    //======================================
      // const UploadImage = async()=> {
  //   // const image = {
  //   //   uri: '',
  //   //   type: '',
  //   //   name: '',
  //   // }

  //   const formdata = new FormData();

  //   await launchImageLibrary({}, (res) => {
  //   if(res.didCancel){
  //     console.log('User cancelled image picker');
  //   }
  //   else if(res.errorCode){
  //     console.log('ImagePicker Error: ', res.errorCode);
  //   }
  //   else if(res.assets){ //정상적으로 사진을 반환 받았을 때
  //     console.log('ImagePicker res', res);
  //     // image.name = res.assets[0].fileName;
  //     // image.type = res.assets[0].type;
  //     // image.uri = Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', '');
  //     formdata.append(res.assets[0])
  //   }
  //   })
  //   // const formdata = new FormData();
  //   // formdata.append('photoImg', image)
  //   // console.log('image',image);
  //   // console.log('data',formdata);
  
  //   const ACCESS_KEY = 'AKIAQGFLFS7ERZZCFDOO';
  //   const SECRET_ACCESS_KEY = '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';
  //   const REGION = "ap-northeast-2";
  //   const S3_BUCKET = 'pureblood3-image-for-user';

  //   // AWS ACCESS KEY를 세팅합니다.
  //   AWS.config.update({
  //     accessKeyId: ACCESS_KEY,
  //     secretAccessKey: SECRET_ACCESS_KEY
  //   });

  //   // 버킷에 맞는 이름과 리전을 설정합니다.
  //   const myBucket = new AWS.S3({
  //     params: { Bucket: S3_BUCKET},
  //     region: REGION,
  //   });

  //   // const file = e.target.files[0];
  //   console.log(formdata)
  //   const file = formdata
  //   console.log('file',file)

  //   // 파일과 파일이름을 넘겨주면 됩니다.
  //   const params = {
  //     ACL: 'public-read',
  //     Body: file,
  //     Bucket: S3_BUCKET,
  //     Key: file.fileName
  //   };
    
  //   myBucket.putObject(params)
  //     .on('httpUploadProgress', (evt) => {
  //       alert("SUCCESS")
  //     })
  //     .send((err) => {
  //       if (err) console.log(err)
  //     })
  // }
