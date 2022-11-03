import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert,TouchableOpacity } from 'react-native';
import TelCertifyCompo from '../../components/TelCertifyCompo';
import LoginBtnCompo from '../../components/LoginBtnCompo';


// 비밀번호를 찾기(변경)을 위해 본인 인증을 하는 페이지입니다.
export default function FindPwScreen() {

  return (
    <Container
      behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <TitleText>비밀번호 찾기</TitleText>
      {/* 이메일 - 유효성 검사*/}
      <SubTitleText>이메일</SubTitleText>
      <EmailTextInput/>
      {/* 핸드폰 인증 - 핸드폰 번호 + 인증 버튼 + 인증 번호 창 */}
      <SubTitleText>핸드폰</SubTitleText>
      <TelCertifyCompo/>
      {/* 비밀번호 변경 버튼 -- 이메일과 인증 번호를 보내 일치 할 경우에 변경 후 main페이지로 로그인 페이지로 */}
      <LoginBtnCompo props={'비밀번호 찾기'}/>
    </Container>
  )
}

const Container = styled.KeyboardAvoidingView `
  flex: 1;
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

const EmailTextInput = styled.TextInput`
  align-items: center;
  padding: 15px 0;
  margin: 5px 0;
  background-color: #ffffff;
  border-radius: 10px;
  /* text-align: center; */
  font-size: ${({ theme }) => theme.fontSizes.title2};
`
// const Area = styled.View`
//   flex: ${props => props.flex};
//   margin: 30px 0;
// `

// const TitleText = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.title1};
//   color: white;
//   margin: 10px 0;
// `
// const SubText = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.body};
//   color: white;
//   margin: 10px 0;
// `
// const FindView = styled.View`
//   flex: ${props=> props.flex};
// `
// const CertifyBtn = styled.TouchableOpacity`
//   align-items: center;
//   padding: 15px 0;
//   margin: 5px 0;
//   background-color: #DDDDDD;
//   border-radius: 10px;
// `
// const BtnText = styled.Text`
//   font-family: "SUIT-Bold";
//   font-size: ${({ theme }) => theme.fontSizes.body};
// `
// const NewPwTextInput=styled.TextInput`
//   border-radius: 10px;
//   background-color: white;
//   color: black;
//   margin: 10px 0;
//   padding: 10px 0;
// `
// const CertPwTextInput=styled(NewPwTextInput)`
// `
// const FindBtn = styled(CertifyBtn)`
// `

// const TestText = styled.Text`
//   color:white;
//   margin: 4px 0;
//   font-size: ${({ theme }) => theme.fontSizes.caption1};
// `


      // <Area flex={2.5}>
      //   <FindView flex={1}>
      //     <TitleText>비밀번호 변경하기</TitleText>
      //     {/* react-native의 button은 styling이 제한적 
      //     따라서 TouchableOpacity를 샤용합니다.*/}
      //     <CertifyBtn
      //       onPress={() => Alert.alert('휴대전화 인증')}>
      //     <BtnText>휴대전화 인증</BtnText>
      //     </CertifyBtn>
      //   </FindView>

      //   {/* <FindView flex={1}>
      //     <SubText>새로운 비밀번호</SubText>
      //     <NewPwTextInput
      //       placeholder={"비밀번호를 입력해주세요"}
      //       //비밀번호 '***'표시
      //      secureTextEntry={true}
      //     />
      //     <TestText>유효성 검사</TestText>
      //   </FindView>
      //   <FindView flex={1}>
      //     <SubText>비밀번호 확인</SubText>
      //     <CertPwTextInput
      //       placeholder={"비밀번호를 한번 더 입력해주세요"}
      //       //비밀번호 '***'표시
      //       secureTextEntry={true}  />
      //     <TestText>유효성 검사</TestText>
      //   </FindView>
      //   <FindView>
      //     <FindBtn
      //       onPress={() => Alert.alert('비밀번호 변경완료')}>
      //     <BtnText>비밀번호 변경하기</BtnText>
      //     </FindBtn>
      //   </FindView> */}
        
      // </Area>
      // <View flex={1} />