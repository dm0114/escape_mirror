import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Shadow } from 'react-native-shadow-2';
import Modal from "react-native-modal";

// 마이페이지
//프로필 사진, 등급명, 닉네임명, 후기|내가찜한테마|작성한글|예약확인
//등급명 클릭시 등급 안내 모달창

//우측 상단에 톱니바퀴 누르면 수정 페이지로
//수정할 것 : 프로필 사진, 닉네임 명, 비밀번호
//이 상태에 회원탈퇴와 로그아웃까지
export default function MypageScreen() {
  //edit가 False일 때 : 마이페이지 뷰 
  //edit가 True일 때 : 수정페이지 뷰
  const [edit, setEdit] = useState(false);
  // console.log('버튼 클릭 ', edit)


  function MyPageScreen() {
    return (
      <>
         {/* 프로필 이미지 */}
        <ProfileView>
          <ProfileImg></ProfileImg>
        </ProfileView>

        {/* 톱니 바퀴 - 설정 */}
        <SettingsView>
          <SettingsTouch>
            <Ionicons onPress={() => setEdit(true)} name="settings-outline" size={30} color="grey" />
          </SettingsTouch>
        </SettingsView>

        {/* 등급명 및 닉네임 */}
        <MypageTxtView >
          <GradeTxt>집주인</GradeTxt>
          <NickNameTxt>명탐정 셜록</NickNameTxt>
        </MypageTxtView>

        {/* 후기 | 찜한 테마 | 작성한 글 | 예약 확인 */}
        <FunctionView>
          {/* 찜한 테마 | 예약 확인 */}
          <FunctionRow1>
            <LikeTheme flex={1}>
              <Ionicons name="heart-outline" size={50} color="black" />
              <LikeTxt>찜한 테마</LikeTxt>
              <LikeNum>24</LikeNum>
            </LikeTheme>
            <Reserve flex={1}>
              <Ionicons name="calendar-sharp" size={45} color="black" />
              <ReserveTxt>예약 확인</ReserveTxt>
              <ReserveNum>24</ReserveNum>
            </Reserve>
          </FunctionRow1>
          {/* 후기 | 작성한 글 */}
          <FunctionRow2>
            <Review>
              <Ionicons name="md-pencil" size={40} color="black" />
              <ReviewTxt>후기</ReviewTxt>
              <ReviewNum>24</ReviewNum>
            </Review>
            <Article>
              <Ionicons name="chatbox-ellipses-outline" size={50} color="black" />
              <ArticleTxt>작성한 글</ArticleTxt>
              <ArticleNum>24</ArticleNum>
            </Article>
          </FunctionRow2>
        </FunctionView>
      </>
    )
  }


  function EditScreen() {
    const [nick, setNick] = useState('명탐정 셜록');
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    return (
      <>
        {/* edit가 TRUE일 때, 수정 뷰 */}
        {/* 프로필 사진 수정 */}
        <ProfileEditView>
          <ProfileEditImg>
            <Ionicons name="camera-outline" size={60} color="black" /> 
          </ProfileEditImg>
        </ProfileEditView>


        {/* 확인 버튼 */}
        <SettingsCheckView>
          <SettingsCheckTouch onPress={() => setEdit(false)}>
            <Ionicons name="checkmark" size={30} color="black" />
          </SettingsCheckTouch>
        </SettingsCheckView>

        {/* input창 클릭 시 focusing되면서 키보드 가려지지 않게  KeyboardAwareScrollView 적용 */}
        <KeyboardAwareScrollView>
          {/* 업적명 & 닉네임명 */}
          <EditTxtView>
            <GradeTxt>집주인</GradeTxt>
              <NickNameEdit placeholder={nick} textAlign='center' />
          </EditTxtView>

          {/* 기존 비밀번호 & 새로운 비밀번호 & 비밀번호 확인 */}
          <PasswordView>
            <PasswordTxt>기존 비밀번호</PasswordTxt>
            <PasswordInputForm></PasswordInputForm>
            <PasswordTxt>새로운 비밀번호</PasswordTxt>
            <PasswordInputForm></PasswordInputForm>
            <PasswordTxt>비밀번호 확인</PasswordTxt>
            <PasswordInputForm></PasswordInputForm>
            <PasswordBtn>
              <PasswordBtnTxt>변경</PasswordBtnTxt>
            </PasswordBtn>  
          </PasswordView>
        </KeyboardAwareScrollView>  

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

        
      </>
    )
  }

  return (
    <Container>
      {/* 상단 이미지 */}
      <View flex={1.2} style={{ backgroundColor: "tomato" }}>
      </View>

      {/*Edit가 True일 때 ? EditScreen , False일 때 MypageScreen*/}
      <MypageView flex={3} style={{ backgroundColor: "#FBFBFB" }}>
        {edit ? <EditScreen /> : <MyPageScreen />}
      </MypageView>

    </Container>
  )
}


const Container = styled.KeyboardAvoidingView `
  flex: 1;
  background-color: tomato;
  /* width:SCREEN_WIDTH, */
`
const MypageView = styled.View`
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
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
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: bisque;
  top: -80px;
  width: 150px;
  height: 150px;
  border-radius: 150px;
  z-index: 9999999999;
`
const ProfileEditImg=styled(ProfileImg)`
`
const SettingsView = styled.View`
  align-items: flex-end;
`
const SettingsCheckView = styled(SettingsView)`
  
`
const SettingsTouch = styled.TouchableOpacity`
  margin: 10px 30px;
  width: 30px;
`
const SettingsCheckTouch = styled(SettingsTouch)`
  background-color: tomato;
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
`
const NickNameTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size:  ${({ theme }) => theme.fontSizes.title1};
  line-height:  ${({ theme }) => theme.fontHeight.title1};
`
const NickNameEdit = styled.TextInput`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  border-radius: 10px;
  padding: 5px 10px;
  /* max-width: fit-content; */
  border: 1px solid black;
`

const FunctionView = styled.View`
  margin-top: 20px;
  /* 할까말까 */
  margin-left: 25px;
  margin-right: 25px;
`

const FunctionRow1 = styled.View`
  flex-direction: row;
  margin: 0 10px;
`

const FunctionRow2 = styled(FunctionRow1)`
`

const LikeTheme = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: beige;
  border-radius: 10px;
  height: 170px;
  margin: 10px;
`
const Reserve = styled(LikeTheme)`
`
const Review = styled(LikeTheme)`
`
const Article = styled(LikeTheme)`
`
const LikeTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size :${({ theme }) => theme.fontSizes.body} ;
  line-height:  ${({ theme }) => theme.fontHeight.body};
`
const LikeNum = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  /* line-height:  ${({ theme }) => theme.fontHeight.title2}; */
`
const ReserveTxt = styled(LikeTxt)`
`
const ReserveNum = styled(LikeNum)`
`
const ReviewTxt = styled(LikeTxt)`
`
const ReviewNum = styled(LikeNum)`
`

const ArticleTxt = styled(LikeTxt)`
`
const ArticleNum = styled(LikeNum)`
`
const PasswordView = styled.View`
  margin: 40px 20px 0px 20px;
`
const PasswordTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body} ;
  line-height:  ${({ theme }) => theme.fontHeight.body};
`
const PasswordInputForm = styled.TextInput`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  border-radius: 10px;
  padding: 5px 10px;
  /* max-width: fit-content; */
  border: 1px solid black;
  margin: 10px 0;
`

const PasswordBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: flex-end;
`

const PasswordBtnTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: tomato;
`
const UserView = styled.View`
  flex-direction: row;
  justify-content: center;
`
const LogOutTxt = styled.Text`
  font-family: "SUIT-Bold";
  font-size:${({ theme }) => theme.fontSizes.caption1};
  color: grey;
  margin: 20px;
`
const EscapeTxt = styled(LogOutTxt)`
`