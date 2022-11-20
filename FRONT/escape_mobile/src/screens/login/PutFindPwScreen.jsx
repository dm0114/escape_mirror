import React, { useState,useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Button,Text, View, TextInput, Dimensions,KeyboardAvoidingView, ScrollView,Platform,TouchableOpacity,Alert } from 'react-native';
import InputFormCompo from '../../components/InputFormCompo';
import LoginBtnCompo from '../../components/LoginBtnCompo';
//비밀번호 찾기 - 본인 인증 경로를 통해 들어와 [비밀번호 변경]을 위한 페이지입니다!
export default function PutFindPwScreen() {
  
  return (
    <Container>
      {/* 비밀번호 - 유효성검사로 ****** / 비밀번호 확인 ( 위의 값과 일치하면 ) => 변경 가능 */}
      <TitleText>비밀번호 변경</TitleText>
      {/* 비밀번호 */}
      <InputFormCompo />
      {/* 비밀번호 확인 */}
      <InputFormCompo />
      {/* 비밀번호 확인 버튼 */}
      <LoginBtnCompo props={'비밀번호 변경'} />
    </Container>
  )
}

const Container = styled.KeyboardAvoidingView `
  flex: 1;
  padding: 80px 20px 0px 20px;
  /* width:SCREEN_WIDTH, */
`
const TitleText = styled.Text`
  color: white;
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  margin: ${({ theme }) => theme.screenMargin.titleLeftMargin};
`

