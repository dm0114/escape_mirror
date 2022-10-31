import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
import { Button,Text, View, TextInput, Dimensions,KeyboardAvoidingView, ScrollView,Platform,TouchableOpacity, Alert } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';

export default function LoginInput() {
  const emailInput = useRef();
  const [email, setEmail] = useState('');
  const passWordInput = useRef();
  const [password, setPassword] = useState('');
  return (
    <Form
      buttonStyle={{ backgroundColor: '#DDDDDD' }}
      buttonText={'로그인'}
      buttonTextStyle={{color:'black'}}
      onButtonPress={() => Alert.alert('로그인 되었습니다')}
      // style={{marginHorizontal:0}} 
    >
      <FormItem
        label="이메일"
        isRequired
        value={email}
        onChangeText={(email) => setEmail(email)}
        asterik
        ref={emailInput}
        labelStyle={{color:'white'}}
        // customValidation={() => { status: true }}
      />
      <FormItem
        label="비밀번호"
        isRequired
        value={password}
        onChangeText={(password) => setPassword(password)}
        asterik
        ref={passWordInput}
        labelStyle={{color:'white'}}
        // customValidation={() => { status: true }}
      />
      
    </Form>
  )
}


