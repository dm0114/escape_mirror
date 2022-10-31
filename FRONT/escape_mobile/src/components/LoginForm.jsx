import React, { useState, useRef } from 'react';
import { Button,Text, View, TextInput, Dimensions,KeyboardAvoidingView, ScrollView,Platform,TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';

export default function LoginForm(LoginSubmit) {
    const [form, setForm] = useState({
    id: "",
    password: "",
    });
    const onChangeText = (prop) => (value) => {
    setForm({
      ...form,
      [prop]: value,
    });
  };
  const { control, handleSubmit } = useForm();

  return (
    <Container>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="아이디"
        defaultValue={""}
        render={({ field: { onChange, value } }) => (
      <LoginTxtIn
        style={{backgroundColor:'white'}}
        placeholder="아이디"
        onChangeText={onChange}
        value={value} />    
        )}
      />
      {/* <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="비밀번호"
        defaultValue={""}
        render={({ field: { onPwChage, value } }) => (
      <LoginTxtIn
        style={{backgroundColor:'white'}}
        placeholder="비밀번호"
        onChangeText={onPwChage}
        value={value} />    
        )}
      /> */}

      <SubmitBtn onPress={handleSubmit((data) => LoginSubmit(data))}>
        <Text>
          hihi
        </Text>
      </SubmitBtn>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`