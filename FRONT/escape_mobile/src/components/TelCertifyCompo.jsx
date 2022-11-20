import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert,TouchableOpacity } from 'react-native';


export default function TelCertifyCompo() {
  
  return (
    <View>
      <CertifyView>
      {/* 핸드폰 번호 입력 폼 */}
        <TelTextInput flex={3} />
        {/* 인증하기 버튼 */}
        <CertifyBtn
          flex={1}
          onPress={() => Alert.alert('핸드폰 인증')}>
          <BtnText>인증</BtnText>
        </CertifyBtn>
      </CertifyView>
      <TelCertifyView>
        <TelTextInput />
      </TelCertifyView>
    </View>
  )
}

const CertifyView = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`

const TelCertifyView = styled.View`
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`

const TelTextInput = styled.TextInput`
  align-items: center;
  padding: 8px 0;
  margin: 5px 0;
  background-color: #ffffff;
  border-radius: 10px;
  /* text-align: center; */
`
const CertifyBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: 5px 0;
  margin-left: 10px;
  background-color: #DDDDDD;
  border-radius: 10px;
`
const BtnText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body};

`