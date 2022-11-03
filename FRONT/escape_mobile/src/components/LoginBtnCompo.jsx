import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';


export default function LoginBtnCompo({ props }) {

  return (
    <>
      <LoginBtn onPress={() => Alert.alert('클릭되었어용')}>
        <LoginBtnText>{props}</LoginBtnText>
      </LoginBtn>
    </>  
  )
}

const LoginBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  margin: 5px 0;
  /* margin-left: 10px; */
  background-color: #DDDDDD;
  border-radius: 10px;
`
const LoginBtnText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body};

`