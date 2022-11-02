import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert,TouchableOpacity } from 'react-native';
import { useForm, Controller, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';



export default function FindIdScreen() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <Container>
      <TitleText>아이디 찾기</TitleText>

      {/* 핸드폰 인증하기 - 핸드폰 번호 + 인증 버튼 */}
      <FormProvider>
        <TextInput
          {...register("email", {
            required: "Email is required",
            pattern: {
            value: /^[A-Za-z0-9+-.%_]+@naver.com/,
            message: "Only naver.com emails allowed",
            },
            validate: {
              noEmail: (val) =>
                val.includes("@") ? "yes@":true,
            },
            minLength: 5,
          })}
          placeholder="이메일"
        >
        </TextInput>
        <Button></Button>
      </FormProvider>  


      <SubTitleText>핸드폰 인증</SubTitleText>
      <CertifyView>
        {/* 핸드폰 번호 입력 폼 */}


        {/* 인증하기 버튼 */}
        <CertifyBtn
          onPress={() => Alert.alert('핸드폰 인증')}>
          <BtnText>인증</BtnText>
        </CertifyBtn>
      </CertifyView>

      {/* 아이디 찾기 버튼 */}
      <FindIdBtn
        onPress={() => Alert.alert('아이디는 무엇입니다')}>
        <BtnText>아이디 찾기</BtnText>
        </FindIdBtn>

    </Container>
  )
}

const Container = styled.KeyboardAvoidingView `
  flex: 1;
  margin-top: 20px;
  /* ${({ theme }) => theme.common.flexCenterColumn}; */
`

const TitleText = styled.Text`
  color: white;
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  margin: 10px 0;
`

const SubTitleText = styled.Text`
    color: white;
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  margin: 10px 0;
`

const CertifyBtn = styled.TouchableOpacity`
  align-items: center;
  padding: 15px 0;
  margin: 5px 0;
  background-color: #DDDDDD;
  border-radius: 10px;
`
const BtnText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body};
`

const FindIdBtn = styled(CertifyBtn)`
`

const CertifyView = styled.View`
  flex-direction: row;
`
const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  // paddingTop: Constants.statusBarHeight,
  /* padding: 8; */
`

const LoginTxt = styled.Text`
  color: white;
  /* margin: 20; */
  margin-left: 0;
` 

const LoginTxtInput = styled.TextInput`
  background-color: white;
  border-color: none;
  /* height: 40; */
  /* padding: 10; */
  border-radius: 10px;
  padding: 15px 0;
  margin: 5px 0;
`