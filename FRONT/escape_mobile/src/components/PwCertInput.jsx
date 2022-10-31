import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
import { Button,Text, View, TextInput, Dimensions,KeyboardAvoidingView, ScrollView,Platform,TouchableOpacity, Alert } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';

export default function PwCertInput() {
  const [password1, setPassword1] = useState('');
  const pwInput1 = useRef();
  const [password2, setPassword2] = useState('');
  const pwInput2 = useRef();
  return (
    <Form
      buttonStyle={{ backgroundColor: '#DDDDDD' }}
      buttonText={'비밀번호 변경'}
      buttonTextStyle={{color:'black'}}
      onButtonPress={() => Alert.alert('비밀번호 변경 버튼')}
    >
      <SubText>비밀번호</SubText>
      <FormItem
        
        isRequired
        value={password1}
        onChangeText={(password1) => setPassword1(password1)}
        asterik={true}
        ref={pwInput1}
        labelStyle={{ color: 'white' }}
        underneathText={'비밀번호를 입력해주세요'}
      />
      <SubText>비밀번호 확인</SubText>
      <FormItem
        isRequired
        value={password2}
        onChangeText={(password2) => setPassword2(password2)}
        asterik
        ref={pwInput2}
        labelStyle={{ color: 'white' }}
        underneathText={'비밀번호를 한번 더 입력해주세요'}
      />
    </Form>
  )
}

const SubText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: white;
  margin: 10px 0;
`