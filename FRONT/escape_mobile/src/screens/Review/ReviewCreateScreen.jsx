import React, { useEffect,useState, useRef, useCallback } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import {Image,StyleSheet,FlatList,useWindowDimensions, ImageBackground, Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import StarRating from 'react-native-star-rating-widget';
import { launchImageLibrary } from 'react-native-image-picker';
import {TextArea, Box, Center, NativeBaseProvider,Select } from "native-base";
import { useQuery } from '@tanstack/react-query';
import { getActiveLog,postReview } from '../../apis/MyPage';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
import { RNS3 } from 'react-native-s3-upload';
import { useNavigation } from '@react-navigation/native';
import {Slider} from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import _ from 'lodash';
// import axios from 'axios';
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

// book id
// themename
// donedate
// themeid
export default function ReviewCreateScreen({ route }) {
  const navigation = useNavigation();
  const { themeId, bookId, themeName, doneDate } = route.params
  // const { data: activeData } = useQuery(['myActive'], getActiveLog)
  // console.log('activeDate',activeData)
  // const activeData = [
  //   {
  //     'themeName': '킹스맨',
  //     'doneDate': '2022-11-16'      
  //   }
  // ]
  //별 rating -- 별 반개가 1점이게 보내야함
  const [rating, setRating] = useState(0);
  //활동성 feelActivity
  const [active, setActive] = useState(0);
  //난이도 feelDifficulty
  const [different, setDifferent] = useState(0);
  //공포도 feelHorror
  const [horror, setHorror] = useState(0);
  //인테리어 feelInterrior
  const [interrior, setInterrior] = useState(0);
  //스토리 feelStory
  const [story, setStory] = useState(0);
  //잠금장치 locker
  const [locker, setLocker] = useState(0);
  //내용 작성
  const [textAreaValue, setTextAreaValue] = useState("");
  //이미지
  const [reviewImg, setReviewImg] = useState("");
  console.log('리뷰이미지',reviewImg)
  const { data, refetch } = useQuery(
    ["ReviewResult", {themeId,bookId,rating,active,different,horror,interrior,story,locker,reviewImg,textAreaValue}],
    postReview,
    { enabled: false }
  );

  // console.log(rating, different, textAreaValue)
  // const lockImg = require('../../assets/images/lockerImg.png')


  //리뷰 이미지 받아오기 - image picker
  const [filePath, setFilePath] = useState({});
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
  const UploadImage = () => {
    launchImageLibrary({}, (response) => {
      console.log('Response = ', response);
      setUploadSuccessMessage('');
      if (response.didCancel) {
        // alert('');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('카메라를 이용할 수 없습니다');
        return;
      } else if (response.errorCode == 'permission') {
        alert('허가되지 않은 오류입니다');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response);
    });
  };

  useEffect(() => {
    try { setReviewImg(filePath.assets[0].fileName) }
    catch {}
  },[filePath])

  //image s3 서버 전송
  const uploadFile = () => {
    if (Object.keys(filePath).length == 0) {
      alert('이미지를 먼저 선택해주세요!');
      return;
    }
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: filePath.assets[0].uri,
        name: filePath.assets[0].fileName,
        type: filePath.assets[0].type,
      },
      {
        // keyPrefix: '**Your Key Prefix**', // Ex. myuploads/
        bucket: 'pureblood3-image-for-user', // Ex. aboutreact
        region: 'ap-northeast-2', // Ex. ap-south-1
        accessKey: 'AKIAQGFLFS7E3FGAA23P',
        secretKey: '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',
        successActionStatus: 201,
      },
    )
      .progress((progress) =>
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`,
        ),
      )
      .then((response) => {
        if (response.status !== 201)
          alert('업로드 실패!');
        console.log(response.body);
        setFilePath('');
        let {
          bucket,
          etag,
          key,
          location
        } = response.body.postResponse;
        setUploadSuccessMessage(
          '업로드 완료!'
          // `Uploaded Successfully: 
          // \n1. bucket => ${bucket}
          // \n2. etag => ${etag}
          // \n3. key => ${key}
          // \n4. location => ${location}`,
        );
      });
  }
  return (
    <KeyboardAwareScrollView>
    <Container>
      <ThemeTitleView>
        <ThemeTitleTxt>{themeName}</ThemeTitleTxt>
        <DateTxt>{doneDate[0]}년 {doneDate[1]}월 {doneDate[2]}일</DateTxt>
      {/* 평점 - ”star” 별 반개가 1점!!*/}
      <StarView>
        <StarRating
        rating={rating}
        onChange={(rating)=>setRating(rating)}
        />
          
      </StarView>
      {/* 리뷰사진 - ”reviewImg”*/}
          <ReviewView>
          {reviewImg == '' ? 
          <CameraBtn onPress={UploadImage} >
            <Ionicons name="camera" size={24} color="white" />
            <CameraTxt >사진 불러오기</CameraTxt>
          </CameraBtn>
              :
          <UploadBtn onPress={uploadFile}>
              <Ionicons name="md-cloud-upload-outline" size={24} color="white" />
              <CameraTxt >사진 업로드하기</CameraTxt>
          </UploadBtn>}
            {uploadSuccessMessage ? (<EvalTxt>{filePath.assets[0].fileName} {uploadSuccessMessage} </EvalTxt>) : <></>}
        </ReviewView>
      </ThemeTitleView>

        <EvalView>
          <EvalTxt>활동성 {active} / 10</EvalTxt>
          <Slider
            value={active}
            minimumValue={0}
            maximumValue={10}
            onValueChange={(val) => setActive(val)}
            step={1}
            thumbTintColor='#619509'
            minimumTrackTintColor='#3e5616'
          />
          <EvalTxt>난이도 {different} / 10</EvalTxt>
          <Slider
            value={different}
            minimumValue={0}
            maximumValue={10}
            onValueChange={(val) => setDifferent(val)}
            step={1}
            thumbTintColor='#619509'
            minimumTrackTintColor='#3e5616'
          />
          <EvalTxt>공포도 {horror} / 10</EvalTxt>
          <Slider
            value={horror}
            minimumValue={0}
            maximumValue={10}
            onValueChange={(val) => setHorror(val)}
            step={1}
            thumbTintColor='#619509'
            minimumTrackTintColor='#3e5616'
          />
          <EvalTxt>인테리어 {interrior} / 10</EvalTxt>
          <Slider
            value={interrior}
            minimumValue={0}
            maximumValue={10}
            onValueChange={(val) => setInterrior(val)}
            step={1}
            thumbTintColor='#619509'
            minimumTrackTintColor='#3e5616'
          />
          <EvalTxt>스토리 {story} / 10</EvalTxt>
          <Slider
            value={story}
            minimumValue={0}
            maximumValue={10}
            onValueChange={(val) => setStory(val)}
            step={1}
            thumbTintColor='#619509'
            minimumTrackTintColor='#3e5616'
          />
          <EvalTxt>잠금장치 {locker}% / 100%</EvalTxt>
          <Slider
            value={locker}
            minimumValue={0}
            maximumValue={100}
            onValueChange={(val) => setLocker(val)}
            step={10}
            thumbTintColor='#619509'
            minimumTrackTintColor='#3e5616'
          />
      {/* 내용 작성 - ”content” */}
          <Box alignItems="center" w="100%">
            {/* <TextInput
              onChange={text => setTextAreaValue(text)}
              value={textAreaValue}
              style={{width:SCREEN_WIDTH, height:100}}
            /> */}
        <TextArea
          value={textAreaValue}
          placeholder="리뷰를 작성해주세요!"
          onChangeText={text => setTextAreaValue(text)}
          color="white"
          w="100%"
          fontSize={15}
          fontFamily="SUIT-Medium"
          margin={5}
          />
      </Box> 
      <EnrollView>
        <EnrollBtn onPress={() => {
          refetch().then(navigation.navigate('MypageMoreScreen'))
        }}>
          <EnrollTxt>등록</EnrollTxt>
        </EnrollBtn>
      </EnrollView>
      </EvalView>


      </Container>
    </KeyboardAwareScrollView>
  )
}

const Container = styled.KeyboardAvoidingView`
  /* flex: 1; */
  padding: 80px 20px 30px 20px;
  height: auto;
  /* justify-content: center;
  align-items: center; */
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
  justify-content: center;
  align-items: center;
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
  margin: 20px;
`

const EvalTxtView = styled.View`

  /* margin: 10px 5px 5px 0px;
  justify-content: space-around; */
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
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
`
const SelectBox = styled.View`
  flex-direction: row;
  /* margin: 0px 5px 5px 15px; */
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

const UploadBtn = styled(CameraBtn)`
  
`
const styles = StyleSheet.create({
  tinyImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
})




    //   <EvalCntView>
    //       {/* 난이도 */}
    //     <SelectBox>
    //       <EvalTxt>난이도</EvalTxt>
    //       <Select color="amber.100" selectedValue={different} minWidth="75" accessibilityLabel="난이도" placeholder="0" _selectedItem={{
    //         bg: "teal.600",
    //         endIcon: <Ionicons name="checkmark-circle" size={10} color="white" />
    //         }} mt={1} onValueChange={itemValue => setDifferent(itemValue)}>
    //         <Select.Item label="1" value="1" />
    //         <Select.Item label="2" value="2" />
    //         <Select.Item label="3" value="3" />
    //         <Select.Item label="4" value="4" />
    //         <Select.Item label="5" value="5" />
    //         <Select.Item label="6" value="6" />
    //         <Select.Item label="7" value="7" />
    //         <Select.Item label="8" value="8" />
    //         <Select.Item label="9" value="9" />
    //         <Select.Item label="10" value="10" />
    //       </Select>
    //     </SelectBox>
    //       {/* 활동성 */}
    // <SelectBox>
    //       <EvalTxt>활동성</EvalTxt>    
    //       <Select color="amber.100" selectedValue={active} minWidth="75" accessibilityLabel="난이도" placeholder="0" _selectedItem={{
    //         bg: "teal.600",
    //         endIcon: <Ionicons name="checkmark-circle" size={10} color="white" />
    //         }} mt={1} onValueChange={itemValue => setActive(itemValue)}>
    //         <Select.Item label="1" value="1" />
    //         <Select.Item label="2" value="2" />
    //         <Select.Item label="3" value="3" />
    //         <Select.Item label="4" value="4" />
    //         <Select.Item label="5" value="5" />
    //         <Select.Item label="6" value="6" />
    //         <Select.Item label="7" value="7" />
    //         <Select.Item label="8" value="8" />
    //         <Select.Item label="9" value="9" />
    //         <Select.Item label="10" value="10" />
    //       </Select>
    //     </SelectBox> 
    //       {/* 공포도 */}
    //         <SelectBox>
    //               <EvalTxt>공포도</EvalTxt>
    //       <Select color="amber.100" selectedValue={horror} minWidth="75" accessibilityLabel="난이도" placeholder="0" _selectedItem={{
    //         bg: "teal.600",
    //         endIcon: <Ionicons name="checkmark-circle" size={10} color="white" />
    //         }} mt={1} onValueChange={itemValue => setHorror(itemValue)}>
    //         <Select.Item label="1" value="1" />
    //         <Select.Item label="2" value="2" />
    //         <Select.Item label="3" value="3" />
    //         <Select.Item label="4" value="4" />
    //         <Select.Item label="5" value="5" />
    //         <Select.Item label="6" value="6" />
    //         <Select.Item label="7" value="7" />
    //         <Select.Item label="8" value="8" />
    //         <Select.Item label="9" value="9" />
    //         <Select.Item label="10" value="10" />
    //       </Select>
    //     </SelectBox>
    //       {/* 잠금장치 */}
    //   <SelectBox>
    //     <EvalTxt>잠금장치</EvalTxt>
    //       <Select color="amber.100" selectedValue={locker} minWidth="75" accessibilityLabel="난이도" placeholder="0" _selectedItem={{
    //         bg: "teal.600",
    //         endIcon: <Ionicons name="checkmark-circle" size={10} color="white" />
    //         }} mt={1} onValueChange={itemValue => setLocker(itemValue)}>
    //         <Select.Item label="10" value="10" />
    //         <Select.Item label="20" value="20" />
    //         <Select.Item label="30" value="30" />
    //         <Select.Item label="40" value="40" />
    //         <Select.Item label="50" value="50" />
    //         <Select.Item label="60" value="60" />
    //         <Select.Item label="70" value="70" />
    //         <Select.Item label="80" value="80" />
    //         <Select.Item label="90" value="90" />
    //         <Select.Item label="100" value="100" />
    //       </Select>
    //     </SelectBox>
    //   </EvalCntView>

        // {/* <AirbnbRating
        //     starImage={lockImg}
        //     count={10}
        //     size={30}
        //     reviews={['']}
        //     selectedColor='#619509'
        // /> */}
        //   {/* <Rating
        //     type='custom'
        //     ratingImage={lockImg}
        //     ratingColor='#619509'
        //     ratingBackgroundColor='#000000'
        //     ratingCount={5}
        //     imageSize={30}
        //   /> */}

          //         {/* <Text>9</Text>
          // <Incubator.WheelPicker
          //   initialValue={'February'}
          //   activeTextColor={Colors.$textPrimary}
          //   inactiveTextColor={Colors.$textNeutralHeavy}
          //   items={diffItems}
          //   textStyle={Typography.text60R}
          //   numberOfVisibleRows={3} 
          // /> */}
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


  //2022.11.16==============================
  //   const UploadImage = async () => {
  //   const image = {
  //     uri: '',
  //     type: '',
  //     name: '',
  //   };
  //   await launchImageLibrary({}, (res) => {
  //     if (res.didCancel) {
  //       console.log('User cancelled image picker');
  //     }
  //     else if (res.errorCode) {
  //       console.log('ImagePicker Error: ', res.errorCode);
  //     }
  //     else if (res.assets) { //정상적으로 사진을 반환 받았을 때
  //       console.log('ImagePicker data: ', res.assets);
  //       image.name = res.assets[0].fileName;
  //       image.type = res.assets[0].type;
  //       image.uri = Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', '');
  //     }
  //     console.log(image)
  //   })

  // const options = {
  //   bucket: "pureblood3-image-for-user",
  //   region: "ap-northeast-2",
  //   accessKey: "AKIAQGFLFS7ERZZCFDOO",
  //   secretKey: "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",
  //   successActionStatus: 201,
  //   method:"POST"
  // }
 
  // RNS3.put(image, options).then(response => {
  //   if (response.status !== 201)
  //     throw new Error("Failed to upload image to S3");
  //   console.log(response.body);
    
  // })
  // .catch(error => {
  // if (error.response) {
  //   // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
  //   console.log(error.response.data)
  //   console.log(error.response.status)
  //   console.log(error.response.headers)
  // } else if (error.request) {
  //   // 요청이 이루어 졌으나 응답을 받지 못했습니다.
  //   // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
  //   // Node.js의 http.ClientRequest 인스턴스입니다.
  //   console.log(error.request)
  // } else {
  //   // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
  //   console.log('Error', error.message)
  // }
  // console.log(error.config)
  // })
    
    
  //   // const formdata = new FormData();
  //   // formdata.append('pureblood3-image-for-user', image); //key(=fieldname)이 곧 사진이 업로드 될 S3의 폴더 이름임

  //   // console.log(formdata)
  //   // const requestOptions = {
  //   //   method: 'POST',
  //   //   body: formdata,
  //   //   redirect: 'follow',

  //   //   headers: {
  //   //       'Content-Type': 'application/json' 
  //   //     // 'Content-Type': 'multipart/form-data; ',
  //   //   },
  //   //   // headers :{'Content-Type': 'multipart/form-data'} 헤더를 지정해줄거면 multipart/form-data로 지정해주어야함
  //   //   // headers를 위처럼 따로 지정해 주지 않아도 되긴 함
  //   // };
    

  //   // await fetch("https://pureblood3-image-for-user.s3.ap-northeast-2.amazonaws.com", requestOptions)
  //   //   .then(response => response.text())
  //   //   .then(result => console.log(result))
  //   //   .catch(error => console.log('error', error));
  // }
  
  
  
  //const chooseImage = async () => {
  //   let options = {
  //     title: 'upload prescription',
  //     takePhotoButtonTitle: 'take a photo',
  //     chooseFromLibraryButtonTitle: 'select from gallery',
  //     storageOption: {
  //       skipBackup: true,
  //       path:'images',
  //     },
  //   }
  // }

  // ImagePicker.showImagePicker(options, async (response) => {
  //   if (response.didCancle) {
  //     console.log('user cancelled image picker')
  //   } else if (response.error) {
  //     console.log('imagepicker error:', response.error)
  //   } else if (response.customButton) {
  //     console.log('user tapped custom button:', response.customButton)
  //     alert(response.customButton)
  //   } else {
  //     const file = {
  //       uri: response.uri,
  //       name: response.fileName,
  //       type: 'image/jpeg',
  //     }
  //     uploadImageOnS3(file)
  //   }
  // })

  // const uploadImageOnS3 = async (file) => {
  //   const s3bucket = new S3({
  //     accessKeyId: 'AKIAQGFLFS7E3FGAA23P',
  //     secretAccessKey: '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',
  //     Bucket:'pureblood3-image-for-user',
  //   })

  //   let contentType = 'image/jpeg'
  //   let contentDeposition = 'inline;filename"' + file.name + '"'
  //   const base64 = await fs.readFile(file.uri, 'base64')
  //   const arrayBuffer = decode(base64)

  //   s3bucket.createBucket(() => {
  //     const params = {
  //       Bucket: 'pureblood3-image-for-user',
  //       Key: file.name,
  //       Body: arrayBuffer,
  //       ContentDisposition: contentDeposition,
  //       ContentType:contentType,
  //     }
  //     s3bucket.upload(params, (err, data) => {
  //       if (err) {
  //       console.log('err in callback')
  //       }
  //       console.log('success')
  //   })
  //   })
  // }
  
  
//   const UploadImage = async () => {
//   const image = {
//     uri: '',
//     type: '',
//     name: '',
//   };
//   await launchImageLibrary({}, (res) => {
//     if (res.didCancel) {
//       console.log('User cancelled image picker');
//     }
//     else if (res.errorCode) {
//       console.log('ImagePicker Error: ', res.errorCode);
//     }
//     else if (res.assets) { //정상적으로 사진을 반환 받았을 때
//       console.log('ImagePicker data: ', res.assets);
//       image.name = res.assets[0].fileName;
//       image.type = res.assets[0].type;
//       image.uri = Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', '');
//     }
//     uploadFileToS3(image)
//     console.log(image)
//   }) 
//   }

  
//   const uploadFileToS3 = async (file) => {
//     const BUCKET_NAME = 'pureblood3-image-for-user';
//     const IAM_USER_KEY = 'AKIAQGFLFS7E3FGAA23P';
//     const IAM_USER_SECRET = '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';

//     const s3bucket = new AWS.S3({
//       accessKeyId: IAM_USER_KEY,
//       secretAccessKey: IAM_USER_SECRET,
//       Bucket: BUCKET_NAME,
//       signatureVersion: 'v4',
//     });

//     const contentType = file.type;
//     const contentDeposition = `inline;filename="${file.name}"`;
//     const fPath = file.uri;
//     const base64 = await fs.readFile(fPath, 'base64');
//     const arrayBuffer = decode(base64);

//     return new Promise((resolve, reject) => {
//       s3bucket.createBucket(() => {
//         const params = {
//           Bucket: BUCKET_NAME,
//           Key: file.name,
//           Body: arrayBuffer,
//           ContentDisposition: contentDeposition,
//           ContentType: contentType,
//         };
//         s3bucket.upload(params, (error, data) => {
//           utils.stopLoader();
//           if (error) {
//             reject(getApiError(error));
//           } else {
//             console.log(JSON.stringify(data));
//             resolve(data);
//           }
//         });
//       });
//     });
// };
  
  


// const options = {
//   bucket: "pureblood3-image-for-user",
//   region: "ap-northeast-2",
//   accessKey: "AKIAQGFLFS7ERZZCFDOO",
//   secretKey: "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",
//   successActionStatus: 201,
//   method:"POST"
// }

// RNS3.put(image, options).then(response => {
//   if (response.status !== 201)
//     throw new Error("Failed to upload image to S3");
//   console.log(response.body);
  
// })
// .catch(error => {
// if (error.response) {
//   // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
//   console.log(error.response.data)
//   console.log(error.response.status)
//   console.log(error.response.headers)
// } else if (error.request) {
//   // 요청이 이루어 졌으나 응답을 받지 못했습니다.
//   // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
//   // Node.js의 http.ClientRequest 인스턴스입니다.
//   console.log(error.request)
// } else {
//   // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
//   console.log('Error', error.message)
// }
// console.log(error.config)
// })
  
  
  // const formdata = new FormData();
  // formdata.append('pureblood3-image-for-user', image); //key(=fieldname)이 곧 사진이 업로드 될 S3의 폴더 이름임

  // console.log(formdata)
  // const requestOptions = {
  //   method: 'POST',
  //   body: formdata,
  //   redirect: 'follow',

  //   headers: {
  //       'Content-Type': 'application/json' 
  //     // 'Content-Type': 'multipart/form-data; ',
  //   },
  //   // headers :{'Content-Type': 'multipart/form-data'} 헤더를 지정해줄거면 multipart/form-data로 지정해주어야함
  //   // headers를 위처럼 따로 지정해 주지 않아도 되긴 함
  // };
  

  // await fetch("https://pureblood3-image-for-user.s3.ap-northeast-2.amazonaws.com", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));