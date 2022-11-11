import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { ImageBackground,Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { Input, Stack, Center, NativeBaseProvider } from "native-base";
//카메라, 앨범 접근 라이브러리
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


// 마이페이지
//프로필 사진, 등급명, 닉네임명, 후기|내가찜한테마|예약확인
//등급명 클릭시 등급 안내 모달창

//우측 상단에 톱니바퀴 누르면 수정 페이지로
//수정할 것 : 프로필 사진, 닉네임 명
//이 상태에 회원탈퇴와 로그아웃까지
export default function MypageScreen() {
  const navigation = useNavigation();

  //edit가 False일 때 : 마이페이지 뷰 
  //edit가 True일 때 : 수정페이지 뷰
  const [edit, setEdit] = useState(false);
  // console.log('버튼 클릭 ', edit)


  function MyPageScreen() {
    const [isGradeModalVisible, setGradeModalVisible] = useState(false);
    const gradeModal = () => {
      setGradeModalVisible(!isGradeModalVisible);
    };
    return (
      <MypageContainer>
         {/* 프로필 이미지 */}
        <ProfileView>
          <ProfileImg></ProfileImg>
        </ProfileView>

        {/* 톱니 바퀴 - 설정 */}
        <SettingsView>
          <SettingsTouch>
            <Ionicons onPress={() => setEdit(true)} name="settings-outline" size={30} color="white" />
          </SettingsTouch>
        </SettingsView>

        {/* 등급명 및 닉네임 */}
        <MypageTxtView >
          <GradeTxt onPress={gradeModal}>집주인</GradeTxt>
          <NickNameTxt>명탐정 셜록</NickNameTxt>
        </MypageTxtView>

        {/* 찜테마 | 후기 | 내 예약 */}
        <UserView>
          <MorePageTxt onPress={() => {navigation.navigate('MypageMoreScreen')}}>나의 스토리</MorePageTxt>
        </UserView>

        
        {/* 등급 Modal */}
        <Modal isVisible={isGradeModalVisible}>
          <View>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={gradeModal} />
          </View>
        </Modal>
      </MypageContainer>
    )
  }


  function EditScreen() {
    const [nick, setNick] = useState('명탐정 셜록');
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

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
      <MypageContainer>
        {/* edit가 TRUE일 때, 수정 뷰 */}
        {/* 프로필 사진 수정 */}
        <ProfileEditView onPress={ShowPicker}>
          <ProfileEditImg>
            <Ionicons name="camera-outline" size={60} color="white" /> 
          </ProfileEditImg>
        </ProfileEditView>


        {/* 확인 버튼 */}
        <SettingsCheckView>
          <SettingsCheckTouch onPress={() => setEdit(false)}>
            <Ionicons name="checkmark" size={30} color="color" />
          </SettingsCheckTouch>
        </SettingsCheckView>

        {/* input창 클릭 시 focusing되면서 키보드 가려지지 않게  KeyboardAwareScrollView 적용 */}
        <View>
          {/* 업적명 & 닉네임명 */}
          <EditTxtView>
            <GradeTxt >집주인</GradeTxt>
            <NickNameEdit placeholder={nick} textAlign='center' />
          </EditTxtView>
        </View>  

        <UserView>
          {/* 회원 탈퇴하기 */}
          <EscapeTxt onPress={toggleModal}>회원 탈퇴</EscapeTxt>
          <EscapeTxt>|</EscapeTxt>
          {/* 로그아웃 */}
          <LogOutTxt>로그아웃</LogOutTxt>
        </UserView>

        {/* 회원탈퇴 Modal */}
        <Modal isVisible={isModalVisible}>
          <View>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>

        
      </MypageContainer>
    )
  }

  return (
    <Container>
    <ImageBackground source={{uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_mypage.gif'}} style={{flex:1}}>
      {/* 상단 이미지 */}
      <MypageView>
        
      {/*Edit가 True일 때 ? EditScreen , False일 때 MypageScreen*/}
        {edit ? <EditScreen /> : <MyPageScreen />}
      </MypageView>

      <CatView>
        <View flex={1}></View>
        <CatTxtView flex={1}>
          <CatText>내 조각들을 보고 싶다면</CatText>
          <CatText>나의 스토리를 눌러봐!</CatText>
        </CatTxtView>
      </CatView>

      </ImageBackground>
      </Container>
  )
}


const Container = styled.View `
  flex: 1;
  
  /* background-color: tomato; */
  /* width:SCREEN_WIDTH, */
`

const MypageContainer = styled.View`
  /* flex:1; */
  margin: 80px 30px 80px 30px;
  /* background-color: brown; */
`
const MypageView = styled.View`
  /* flex: 1; */
  height: auto;
`
const CatView = styled.View`
  /* flex: 0.5; */
  height: auto;
  flex-direction: row;
`
const ProfileView = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`
const ProfileEditView = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`
const ProfileImg = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: bisque;
  top: 50px;
  width: 150px;
  height: 150px;
  border-radius: 150px;
  z-index: 9999999999;
`
const ProfileEditImg = styled(ProfileImg)`

`
const SettingsView = styled.View`
  align-items: flex-end;
`
const SettingsCheckView = styled(SettingsView)`
  
`
const SettingsTouch = styled.TouchableOpacity`
  margin: 10px 50px;
  width: 30px;
`
const SettingsCheckTouch = styled(SettingsTouch)`
  /* background-color: tomato; */
  border-radius: 150px;
`

const MypageTxtView = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.screenMargin.marginBottom};
`
const EditTxtView = styled(MypageTxtView)`
`

const GradeTxt = styled.Text`
  font-family: "SUIT-Medium";
  font-size:  ${({ theme }) => theme.fontSizes.title2};
  line-height:  ${({ theme }) => theme.fontHeight.title2};
  color: white;
`
const NickNameTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size:  ${({ theme }) => theme.fontSizes.title1};
  line-height:  ${({ theme }) => theme.fontHeight.title1};
  color: white;
`
const NickNameEdit = styled.TextInput`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  border-radius: 10px;
  padding: 5px 10px;
  /* max-width: fit-content; */
  border: none;
  background-color: white;
`


const UserView = styled.View`
  flex-direction: row;
  justify-content: center;
  /* border: 1px solid white;
  padding: 5px; */
`
const LogOutTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size:${({ theme }) => theme.fontSizes.caption1};
  color: white;
  margin: 20px;
`
const MorePageTxt = styled(LogOutTxt)`
  font-size:${({ theme }) => theme.fontSizes.body};
  color: tomato;
  
`
const EscapeTxt = styled(LogOutTxt)`
`
const CatText = styled.Text`
  color: white;
  font-family: "SUIT-Bold";
  font-size:${({ theme }) => theme.fontSizes.body};
  line-height:  ${({ theme }) => theme.fontHeight.title2};
 `
const CatTxtView = styled.View`
  justify-content: center;
  align-items: center;
  padding: 100px 50px;
  /* background-color: blueviolet; */
`

//===================================================
// 마이페이지
//프로필 사진, 등급명, 닉네임명, 후기|내가찜한테마|작성한글|예약확인
//등급명 클릭시 등급 안내 모달창

//우측 상단에 톱니바퀴 누르면 수정 페이지로
//수정할 것 : 프로필 사진, 닉네임 명, 비밀번호
//이 상태에 회원탈퇴와 로그아웃까지
// export default function MypageScreen() {
//   const navigation = useNavigation();

//   //edit가 False일 때 : 마이페이지 뷰
//   //edit가 True일 때 : 수정페이지 뷰
//   const [edit, setEdit] = useState(false);
//   // console.log('버튼 클릭 ', edit)


//   function MyPageScreen() {
//     return (
//       <>
//          {/* 프로필 이미지 */}
//         <ProfileView>
//           <ProfileImg></ProfileImg>
//         </ProfileView>

//         {/* 톱니 바퀴 - 설정 */}
//         <SettingsView>
//           <SettingsTouch>
//             <Ionicons onPress={() => setEdit(true)} name="settings-outline" size={30} color="grey" />
//           </SettingsTouch>
//         </SettingsView>

//         {/* 등급명 및 닉네임 */}
//         <MypageTxtView >
//           <GradeTxt>집주인</GradeTxt>
//           <NickNameTxt>명탐정 셜록</NickNameTxt>
//         </MypageTxtView>

//         {/* 후기 | 찜한 테마 | 작성한 글 | 예약 확인 */}
//         <FunctionView>
//           {/* 찜한 테마 | 예약 확인 */}
//           <FunctionRow1>
//             <LikeTheme flex={1}>
//               <Ionicons name="heart-outline" size={50} color="black" />
//               <LikeTxt>찜한 테마</LikeTxt>
//               <LikeNum>24</LikeNum>
//             </LikeTheme>
//             <Reserve flex={1} onPress={() => {navigation.navigate('ReservationScreen')}}>
//               <Ionicons name="calendar-sharp" size={45} color="black" />
//               <ReserveTxt>예약 확인</ReserveTxt>
//               <ReserveNum>24</ReserveNum>
//             </Reserve>
//           </FunctionRow1>
//           {/* 후기 | 작성한 글 */}
//           <FunctionRow2>
//             <Review>
//               <Ionicons name="md-pencil" size={40} color="black" />
//               <ReviewTxt>후기</ReviewTxt>
//               <ReviewNum>24</ReviewNum>
//             </Review>
//             <Article>
//               <Ionicons name="chatbox-ellipses-outline" size={50} color="black" />
//               <ArticleTxt>작성한 글</ArticleTxt>
//               <ArticleNum>24</ArticleNum>
//             </Article>
//           </FunctionRow2>
//         </FunctionView>
//       </>
//     )
//   }


//   function EditScreen() {
//     const [nick, setNick] = useState('명탐정 셜록');
//     const [isModalVisible, setModalVisible] = useState(false);
//     const toggleModal = () => {
//       setModalVisible(!isModalVisible);
//     };
//     return (
//       <>
//         {/* edit가 TRUE일 때, 수정 뷰 */}
//         {/* 프로필 사진 수정 */}
//         <ProfileEditView>
//           <ProfileEditImg>
//             <Ionicons name="camera-outline" size={60} color="black" />
//           </ProfileEditImg>
//         </ProfileEditView>


//         {/* 확인 버튼 */}
//         <SettingsCheckView>
//           <SettingsCheckTouch onPress={() => setEdit(false)}>
//             <Ionicons name="checkmark" size={30} color="black" />
//           </SettingsCheckTouch>
//         </SettingsCheckView>

//         {/* input창 클릭 시 focusing되면서 키보드 가려지지 않게  KeyboardAwareScrollView 적용 */}
//         <KeyboardAwareScrollView>
//           {/* 업적명 & 닉네임명 */}
//           <EditTxtView>
//             <GradeTxt>집주인</GradeTxt>
//               <NickNameEdit placeholder={nick} textAlign='center' />
//           </EditTxtView>

//           {/* 기존 비밀번호 & 새로운 비밀번호 & 비밀번호 확인 */}
//           <PasswordView>
//             <PasswordTxt>기존 비밀번호</PasswordTxt>
//             <PasswordInputForm></PasswordInputForm>
//             <PasswordTxt>새로운 비밀번호</PasswordTxt>
//             <PasswordInputForm></PasswordInputForm>
//             <PasswordTxt>비밀번호 확인</PasswordTxt>
//             <PasswordInputForm></PasswordInputForm>
//             <PasswordBtn>
//               <PasswordBtnTxt>변경</PasswordBtnTxt>
//             </PasswordBtn>
//           </PasswordView>
//         </KeyboardAwareScrollView>

//         <UserView>
//           {/* 회원 탈퇴하기 */}
//           <EscapeTxt onPress={toggleModal}>회원 탈퇴</EscapeTxt>
//           <EscapeTxt>|</EscapeTxt>
//           {/* 로그아웃 */}
//           <LogOutTxt>로그아웃</LogOutTxt>
//         </UserView>

//         {/* 회원탈퇴 Modal */}
//         <Modal isVisible={isModalVisible}>
//           <View>
//             <Text>Hello!</Text>
//             <Button title="Hide modal" onPress={toggleModal} />
//           </View>
//         </Modal>

        
//       </>
//     )
//   }

//   return (
//     <Container>
//       {/* 상단 이미지 */}
//       <View flex={1.2} style={{ backgroundColor: "tomato" }}>
//       </View>

//       {/*Edit가 True일 때 ? EditScreen , False일 때 MypageScreen*/}
//       <MypageView flex={3} style={{ backgroundColor: "#FBFBFB" }}>
//         {edit ? <EditScreen /> : <MyPageScreen />}
//       </MypageView>

//     </Container>
//   )
// }


// const Container = styled.KeyboardAvoidingView `
//   flex: 1;
//   background-color: tomato;
//   /* width:SCREEN_WIDTH, */
// `
// const MypageView = styled.View`
//   border-top-left-radius: 40px;
//   border-top-right-radius: 40px;
// `
// const ProfileView = styled.View`
//   justify-content: center;
//   align-items: center;
//   margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
// `
// const ProfileEditView = styled.TouchableOpacity`
//   justify-content: center;
//   align-items: center;
//   margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
// `
// const ProfileImg = styled.View`
//   position: absolute;
//   justify-content: center;
//   align-items: center;
//   background-color: bisque;
//   top: -80px;
//   width: 150px;
//   height: 150px;
//   border-radius: 150px;
//   z-index: 9999999999;
// `
// const ProfileEditImg=styled(ProfileImg)`
// `
// const SettingsView = styled.View`
//   align-items: flex-end;
// `
// const SettingsCheckView = styled(SettingsView)`
  
// `
// const SettingsTouch = styled.TouchableOpacity`
//   margin: 10px 30px;
//   width: 30px;
// `
// const SettingsCheckTouch = styled(SettingsTouch)`
//   background-color: tomato;
//   border-radius: 150px;
// `

// const MypageTxtView = styled.View`
//   justify-content: center;
//   align-items: center;
//   margin-top: ${({ theme }) => theme.screenMargin.marginBottom};
// `
// const EditTxtView = styled(MypageTxtView)`
// `

// const GradeTxt = styled.Text`
//   font-family: "SUIT-Medium";
//   font-size:  ${({ theme }) => theme.fontSizes.title2};
//   line-height:  ${({ theme }) => theme.fontHeight.title2};
// `
// const NickNameTxt = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size:  ${({ theme }) => theme.fontSizes.title1};
//   line-height:  ${({ theme }) => theme.fontHeight.title1};
// `
// const NickNameEdit = styled.TextInput`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.title2};
//   border-radius: 10px;
//   padding: 5px 10px;
//   /* max-width: fit-content; */
//   border: 1px solid black;
// `

// const FunctionView = styled.View`
//   margin-top: 20px;
//   /* 할까말까 */
//   margin-left: 25px;
//   margin-right: 25px;
// `

// const FunctionRow1 = styled.View`
//   flex-direction: row;
//   margin: 0 10px;
// `

// const FunctionRow2 = styled(FunctionRow1)`
// `

// const LikeTheme = styled.TouchableOpacity`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: beige;
//   border-radius: 10px;
//   height: 170px;
//   margin: 10px;
// `
// const Reserve = styled(LikeTheme)`
// `
// const Review = styled(LikeTheme)`
// `
// const Article = styled(LikeTheme)`
// `
// const LikeTxt = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size :${({ theme }) => theme.fontSizes.body} ;
//   line-height:  ${({ theme }) => theme.fontHeight.body};
// `
// const LikeNum = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.title2};
//   /* line-height:  ${({ theme }) => theme.fontHeight.title2}; */
// `
// const ReserveTxt = styled(LikeTxt)`
// `
// const ReserveNum = styled(LikeNum)`
// `
// const ReviewTxt = styled(LikeTxt)`
// `
// const ReviewNum = styled(LikeNum)`
// `

// const ArticleTxt = styled(LikeTxt)`
// `
// const ArticleNum = styled(LikeNum)`
// `
// const PasswordView = styled.View`
//   margin: 40px 20px 0px 20px;
// `
// const PasswordTxt = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.body} ;
//   line-height:  ${({ theme }) => theme.fontHeight.body};
// `
// const PasswordInputForm = styled.TextInput`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.title2};
//   border-radius: 10px;
//   padding: 5px 10px;
//   /* max-width: fit-content; */
//   border: 1px solid black;
//   margin: 10px 0;
// `

// const PasswordBtn = styled.TouchableOpacity`
//   justify-content: center;
//   align-items: flex-end;
// `

// const PasswordBtnTxt = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.body};
//   padding: 10px 15px;
//   margin-top: 20px;
//   border-radius: 10px;
//   background-color: tomato;
// `
// const UserView = styled.View`
//   flex-direction: row;
//   justify-content: center;
// `
// const LogOutTxt = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size:${({ theme }) => theme.fontSizes.caption1};
//   color: grey;
//   margin: 20px;
// `
// const EscapeTxt = styled(LogOutTxt)`
// `

//============================================================
// const testUnity = 'https://user-images.githubusercontent.com/97578425/199651092-ce04c889-71c8-431f-bfae-1732e4c72f8c.png'
// const testBook = 'https://www.shutterstock.com/image-vector/gold-ornament-on-black-background-600w-1632932308.jpg'
// //마이페이지 -New
// //프로필 사진 , 등급명, 닉네임, 내정보 수정 버튼, 내정보 더 보러가기 버튼(찜한테마,후기,예약확인)
// //내정보 수정 - 프로필 사진,닉네임 수정, 등급명 제시, 로그아웃, 회원탈퇴

// export default function MypageScreen() {
//   //edit 버튼 누르면(True) EditScreen | check 버튼 누르면 (Flase) MypageScreen 
//   const [edit, setEdit] = useState(false);


//   function MypageScreen() {
//     <>
//       {/* 프로필 이미지 */}
//       <ProfileView>
//         <ProfileImg></ProfileImg>
//       </ProfileView>

//       {/* 톱니 바퀴 - 설정 */}
//       <SettingsView>
//         <SettingsTouch>
//           <Ionicons onPress={() => setEdit(true)} name="settings-outline" size={30} color="grey" />
//         </SettingsTouch>
//       </SettingsView>

//       {/* 등급명 및 닉네임 */}
//       <MypageTxtView >
//         <GradeTxt>집주인</GradeTxt>
//         <NickNameTxt>명탐정 셜록</NickNameTxt>
//       </MypageTxtView>
      
//     </>
//   }

//   function EditScreen() {
    
//   }
//   return (
//     //유니티 배경
//     //위엔 Mypage 이미지 위에 프사, 등급명, 닉네임, 내정보수정, 내정보 더 보기
//     //아래엔 고양이(CatView)>설명(DescriptionView)
//     // <ImageBackground source={{ uri: testUnity }} style={{ flex: 1 }}>
//       <Container>
//         <MypageView flex={3}>
//           {edit? <EditScreen/>:<MypageScreen/>}
//         </MypageView>
//         <CatView flex={1.5}>
//           <DescriptionView></DescriptionView>
//         </CatView>
//       </Container>
//     // </ImageBackground>
//   )
// }

// const Container = styled.View`
//   flex: 1;
//   padding:80px 20px 0px 20px;
// `
// const MypageView = styled.View`
//   flex: ${props => props.flex};
//   /* background-color: brown; */

// `
// const CatView = styled.View`
//   flex: ${props=> props.flex};
//   background-color: yellow;
// `
// const DescriptionView = styled.View`
  
// `
// // const MyScreenBack = styled.ImageBackground`
// //   height:250px;
// // `

// const ProfileView = styled.View`
//   justify-content: center;
//   align-items: center;
//   /* margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom}; */
// `
// const ProfileEditView = styled.TouchableOpacity`
//   justify-content: center;
//   align-items: center;
//   margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
// `
// const ProfileImg = styled.View`
//   position: absolute;
//   justify-content: center;
//   align-items: center;
//   background-color: bisque;
//   top: -80px;
//   width: 150px;
//   height: 150px;
//   border-radius: 150px;
//   z-index: 9999999999;
// `
// const ProfileEditImg=styled(ProfileImg)`
// `
// const SettingsView = styled.View`
//   align-items: flex-end;
// `
// const SettingsCheckView = styled(SettingsView)`
  
// `
// const SettingsTouch = styled.TouchableOpacity`
//   margin: 10px 30px;
//   width: 30px;
// `
// const SettingsCheckTouch = styled(SettingsTouch)`
//   background-color: tomato;
//   border-radius: 150px;
// `

// const MypageTxtView = styled.View`
//   justify-content: center;
//   align-items: center;
//   margin-top: ${({ theme }) => theme.screenMargin.marginBottom};
// `
// const EditTxtView = styled(MypageTxtView)`
// `

// const GradeTxt = styled.Text`
//   font-family: "SUIT-Medium";
//   font-size:  ${({ theme }) => theme.fontSizes.title2};
//   line-height:  ${({ theme }) => theme.fontHeight.title2};
//   color: white;
// `
// const NickNameTxt = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size:  ${({ theme }) => theme.fontSizes.title1};
//   line-height:  ${({ theme }) => theme.fontHeight.title1};
// `
// const NickNameEdit = styled.TextInput`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.title2};
//   border-radius: 10px;
//   padding: 5px 10px;
//   /* max-width: fit-content; */
//   border: 1px solid black;
// `

// //======================================================================