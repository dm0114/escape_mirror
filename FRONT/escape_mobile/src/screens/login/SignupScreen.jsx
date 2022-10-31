import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert,TouchableOpacity } from 'react-native';

export default function SignupScreen() { 

  return (
    <Container
      behavior={Platform.select({ios: 'padding', android: undefined})}>
      <SignUpView>
        {/* 프로필 이미지 */}
        <ProfileImg></ProfileImg>
        {/* 이름 */}
        <NameText>이름</NameText>
        <NameTextInput/>
        {/* 닉네임 */}
        <NickText>닉네임</NickText>
        <NickTextInput/>
        <NickCertBtn />
        {/* 닉네임 유효성 검사 */}

        {/* 이메일 */}
        <EmailText>이메일</EmailText>
        <EmailTextInput/>
        <EmailCertBtn />
        {/* 이메일 유효성 검사 */}
        
        {/* 비밀번호 */}
        <PwText>비밀번호</PwText>
        <PwTextInput />
        
        {/* 비밀번호 유효성 검사 */}

        {/* 핸드폰 번호 */}
        <PhoneText>핸드폰 번호</PhoneText>
        <PhoneTextInput/>
        {/* 핸드폰 번호 유효성 검사 */}

        {/* 핸드폰 인증 */}
        <PhoneCertBtn>
          <PhoneCertText>
            핸드폰 인증
          </PhoneCertText>
        </PhoneCertBtn>
        {/* 가입하기 버튼 */}
        <SignUpBtn>
          <SignUpText>
            가입 완료
          </SignUpText>
        </SignUpBtn>
      </SignUpView>

    </Container>
  )
}

const Container = styled.KeyboardAvoidingView `
  flex: 1;
  ${({ theme }) => theme.common.flexCenterColumn};
`
const SignUpView = styled.View`
  
`
const ProfileImg = styled.TouchableOpacity`
  background-color: white;
  width: 150px;
  height: 150px;
  border-radius: 150px;
`
const PhoneCertBtn = styled.TouchableOpacity`
  align-items: center;
  padding: 15px 0;
  margin: 5px 0;
  background-color: #DDDDDD;
  border-radius: 10px;
`
const SignUpBtn = styled(PhoneCertBtn)`
`

const NameText = styled.Text`
  font-family: "SUIT-Regular";
  color: white;
`
const NickText = styled(NameText)`
`
const EmailText = styled(NameText)`
`
const PwText = styled(NameText)`
`
const PhoneText = styled(NameText)`
`

const NameTextInput = styled.TextInput`
  border-radius: 10px;
  background-color: white;
  color: black;
  margin: 10px 0;
  padding: 10px 0;
`
const NickTextInput = styled(NameTextInput)`
`
const EmailTextInput = styled(NameTextInput)`
`
const PwTextInput = styled(NameTextInput)`
`
const PhoneTextInput = styled(NameTextInput)`
`

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