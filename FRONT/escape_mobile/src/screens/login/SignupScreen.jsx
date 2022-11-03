import React, { useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import theme from '../../../theme';
import { Pressable,Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert,TouchableOpacity } from 'react-native';
import InputFormCompo from '../../components/InputFormCompo';
import TelCertifyCompo from '../../components/TelCertifyCompo';
import LoginBtnCompo from '../../components/LoginBtnCompo';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {


  return (
    //<KeyboardAwareScrollView>
    //Focus된 InputForm을 키보드가 가리지 않게 함
    //아래있는 InputForm을 Focus시 인식하여 키보드 위로 이동하게 함!
    <KeyboardAwareScrollView>
    {/* <Container
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    > */}
      
      <SignUpView>
      <TitleText>회원 가입</TitleText>
        {/* 프로필 이미지 */}
        <ProfileView>
          <ProfileImg>
            <Ionicons name="camera-outline" size={60} color="black" /> 
          </ProfileImg>
        </ProfileView>


        {/* 이름 */}
        <NameText>이름</NameText>
        <InputFormCompo/>


        {/* 닉네임  - 중복검사*/}
        <NickText>닉네임</NickText>
        <InputFormCompo/>
        <NickCertBtn />

        {/* 생일 - 유효성 검사 1995-09-07 */}
        <InputFormCompo/>

        {/* 이메일  - 중복검사, 유효성검사*/}
        <EmailText>이메일</EmailText>
        <InputFormCompo/>
        <EmailCertBtn />

        
        {/* 비밀번호 - ****형태로 */}
        <PwText>비밀번호</PwText>
        <InputFormCompo/>


        {/* 핸드폰 번호 - 유효성 검사 010-2424-0624 */}
        <PhoneText>핸드폰 번호</PhoneText>
        {/* 핸드폰 인증 & 인증번호창 */}
        <TelCertifyCompo/>
        {/* <PhoneCertBtn>
          <PhoneCertText>
            핸드폰 인증
          </PhoneCertText>
        </PhoneCertBtn> */}


        {/* 가입하기 버튼 */}
        <LoginBtnCompo props={'가입 완료 하기'}/>
        {/* <SignUpBtn>
          <SignUpText>
            가입 완료
          </SignUpText>
        </SignUpBtn> */}
      </SignUpView>

      {/* </Container> */}
    </KeyboardAwareScrollView>
  )
}

// const Container = styled.KeyboardAvoidingView `
//   flex: 1;
//   /* ${({ theme }) => theme.common.flexCenterColumn}; */
// `


const SignUpView = styled.View`
  flex: 1;
  padding:80px 20px 0px 20px;
`

const TitleText = styled.Text`
  color: white;
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  margin: ${({ theme }) => theme.screenMargin.titleLeftMargin};
`
const ProfileView = styled.View`
  justify-content: center;
  align-items: center;
`

const ProfileImg = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 150px;
  height: 150px;
  border-radius: 150px;
`
const PhoneCertBtn = styled.TouchableOpacity`
  align-items: center;
  padding: 8px 0;
  margin: 5px 0;
  background-color: #DDDDDD;
  border-radius: 10px;
`
const SignUpBtn = styled(PhoneCertBtn)`
`

const NameText = styled.Text`
  font-family: "SUIT-Regular";
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.fontHeight.body};
`
const NickText = styled(NameText)`
`
const EmailText = styled(NameText)`
`
const PwText = styled(NameText)`
`
const PhoneText = styled(NameText)`
`

// const NameTextInput = styled.TextInput`
//   border-radius: 10px;
//   background-color: white;
//   color: black;
//   margin: 10px 0;
//   padding: 10px 0;
// `
// const NickTextInput = styled(NameTextInput)`
// `
// const EmailTextInput = styled(NameTextInput)`
// `
// const PwTextInput = styled(NameTextInput)`
// `
// const PhoneTextInput = styled(NameTextInput)`
// `

const NickCertBtn = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: white;
  color: black;
`
const EmailCertBtn = styled(NickCertBtn)`
`

const PhoneCertText = styled.Text`
  color: black;
`
const SignUpText = styled(PhoneCertText)`
  
`