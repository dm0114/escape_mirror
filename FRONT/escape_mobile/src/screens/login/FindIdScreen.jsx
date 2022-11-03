import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import TelCertifyCompo from '../../components/TelCertifyCompo';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert,TouchableOpacity } from 'react-native';
// import { useForm, Controller, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
const { width: SCREEN_WIDTH } = Dimensions.get('window');



export default function FindIdScreen() {
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const onSubmit = data => {
  //   console.log(data);
  // };
  return (
    <Container>
      <TitleText>아이디 찾기</TitleText>

      {/* 핸드폰 인증하기 - 핸드폰 번호 + 인증 버튼 */}
      <SubTitleText>핸드폰 인증</SubTitleText>
      <TelCertifyCompo />
      <TelCertifyView>
        <TelTextInput />
      </TelCertifyView>

      {/* 아이디 찾기 버튼 + 사용자 인증이 되면 Alert으로 아이디 알려주기! */}
      <FindIdBtn
        onPress={() => Alert.alert('클릭되었어용')}>
        <BtnText>아이디 찾기</BtnText>
      </FindIdBtn>

    </Container>
  )
}

const Container = styled.KeyboardAvoidingView `
  flex: 1;
  padding: 80px 20px 0px 20px;
  /* ${({ theme }) => theme.common.flexCenterColumn}; */
`

const TitleText = styled.Text`
  color: white;
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  margin: ${({ theme }) => theme.screenMargin.titleLeftMargin};
`

const SubTitleText = styled.Text`
  color: white;
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  line-height: ${({ theme }) => theme.fontHeight.title2};
  /* margin: 10px 0; */
`
const CertifyBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 15px 15px;
  margin: 5px 0;
  margin-left: 10px;
  background-color: #DDDDDD;
  border-radius: 10px;
`
const BtnText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body};

`

const FindIdBtn = styled(CertifyBtn)`
  margin:5px 0;
`

const CertifyView = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`

const TelCertifyView = styled.View`
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`

const TelTextInput = styled.TextInput`
  align-items: center;
  padding: 15px 0;
  margin: 5px 0;
  background-color: #ffffff;
  border-radius: 10px;
  /* text-align: center; */
`



// const LoginContainer = styled.View`
//   flex: 1;
//   justify-content: center;
//   // paddingTop: Constants.statusBarHeight,
//   /* padding: 8; */
// `

// const LoginTxt = styled.Text`
//   color: white;
//   /* margin: 20; */
//   margin-left: 0;
// ` 

// const LoginTxtInput = styled.TextInput`
//   background-color: white;
//   border-color: none;
//   /* height: 40; */
//   /* padding: 10; */
//   border-radius: 10px;
//   padding: 15px 0;
//   margin: 5px 0;
// `