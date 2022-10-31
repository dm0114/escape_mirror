import React, { useState,useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Button,Text, View, TextInput, Dimensions,KeyboardAvoidingView, ScrollView,Platform,TouchableOpacity,Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// import { useForm, Controller } from "react-hook-form";
// import { Form,FormItem } from 'react-native-form-component';
import LoginInput from '../../components/LoginInput'

export default function LoginScreen({ onSubmit }) {
  const [idInput, setIdInput] = useState('');
  console.log(idInput)
  const [pwInput, setPwInput] = useState('');
  console.log(pwInput)
  const onChangeID = (id) => setIdInput(id);
  const onChangePW = (password) => setPwInput(password);
  // const { control, handleSubmit } = useForm();

  return (
    <Container
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      {/* 로고이미지 */}
      <LoginView flex={0.5}>
        <LoginText>로고이미지</LoginText>
      </LoginView>
      {/* 로그인 - 이메일 입력 및 비밀번호 & 로그인하기 */}
      <LoginView flex={1}>
        <LoginInput />
        <LoginBtn onPress={() => Alert.alert('회원가입임')}>
          <BtnText >회원가입</BtnText>
        </LoginBtn>
      {/* 아이디 찾기 및 비밀번호 찾기 */}
      <LoginFindView flex={0.5}>
        <FindIdText>아이디 찾기</FindIdText>
        <FindText> | </FindText>
        <FindPwText>비밀번호 찾기</FindPwText>
      </LoginFindView>
      </LoginView>
    </Container>
  )
}
const LoginText = styled.Text`
  color: white;
`
/* const Container = styled.View ` */
const Container = styled.KeyboardAvoidingView `
  flex: 1;
  /* width:SCREEN_WIDTH, */
`
// const LogoView = styled.View`
//   flex: ${props=> props.flex};
//   background-color: ${props => props.backgroundColor};
//   justify-content: center;
//   align-items: center;
// `
const LoginView = styled.View`
  flex: ${props=> props.flex};
  background-color: ${props => props.backgroundColor};
`

const LoginTextInput = styled.TextInput`
  flex:${props => props.flex};
  border-radius: 10px;
  background-color: white;
  color: black;
  margin: 10px 0;
`
const LoginBtn = styled.TouchableOpacity`
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

// const LoginBtn = styled.Button`
//   flex:${props => props.flex};
//   background-color: ${props => props.backgroundColor};
// `
const LoginFindView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 10px 0;
`
const FindIdText = styled.Text`
  color:white;
`
const FindText = styled(FindIdText)`
`
const FindPwText = styled(FindIdText)`
`


        {/* <LoginText>이메일</LoginText>
        <LoginTextInput
          flex={1.5}
          placeholder={"이메일을 입력해주세요"}
          autoComplete='email'
          placeholderTextColor='#C5C8CE'
          value={idInput}
          onChangeText={onChangeID}
          keyboardType='email-address' />
        <LoginText>비밀번호</LoginText>
        <LoginTextInput
          flex={1.5}
          // onSubmitEditing={}
          placeholder={"비밀번호를 입력해주세요"}
          autoComplete='password'
          placeholderTextColor='#C5C8CE'
          value={pwInput}
          onChangeText={onChangePW}
          //비밀번호 '***'표시
          secureTextEntry={true} /> */}
        {/* <LoginBtn>
          <BtnText onPress={() => Alert.alert('로그인임')}>로그인 하기</BtnText>
        </LoginBtn> */}