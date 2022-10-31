import React, { useState, useRef } from 'react';
import { Button,Text, View, TextInput, Dimensions,KeyboardAvoidingView, ScrollView,Platform,TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
export function AddPersonForm({ onSubmit }) { 
    const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    });
    const onChangeText = (prop) => (value) => {
    setForm({
      ...form,
      [prop]: value,
    });
  };
  const { control, handleSubmit } = useForm();
  
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="name"
        defaultValue={""}
        render={({ field: { onChange, value } }) => (
      <LoginTxtIn
        style={{backgroundColor:'white'}}
        placeholder="name"
        onChangeText={onChange}
        value={value}
      />
        )}
      />
      <LoginTxtIn
        style={{backgroundColor:'white'}}
        placeholder="age"
        onChangeText={onChangeText("age")}
        value={form.age}
      />
      <LoginTxtIn
        style={{backgroundColor:'white'}}
        placeholder="gender"
        onChangeText={onChangeText("gender")}
        value={form.gender}
      />
      <SubmitBtn onPress={handleSubmit((data) => onSubmit(data))}>
        <Text>
          hihi
        </Text>
      </SubmitBtn>
    </View>
  )
}

const LoginTxtIn = styled.TextInput`
  border-radius: 10px;
`

const SubmitBtn = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px 0;
  margin: 10px 0;
  background-color: white;
`