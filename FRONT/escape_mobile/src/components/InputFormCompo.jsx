import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';

export default function InputFormCompo({props}) {

  return (
    <>
      <InputForm />
    </>
  )
}

const InputForm = styled.TextInput`
  align-items: center;
  padding: 8px 0;
  background-color: #ffffff;
  border-radius: 10px;
  /* text-align: center; */
  font-size: ${({ theme }) => theme.fontSizes.title2};
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`