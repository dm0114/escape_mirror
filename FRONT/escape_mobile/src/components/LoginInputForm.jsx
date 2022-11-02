import React from 'react';
import styled from 'styled-components/native';
import { View, TextInput as RNTextInput, TextInputProps, Text, StyleSheet } from 'react-native';
import { useController, useFormContext  } from 'react-hook-form';
// import Constants from 'expo-constants';

/* useController
재사용을 목적으로 사용 useForm을 적용시킨 컴포넌트로 뺄 때 유용
useForm안의 기능을 사용할 수 있음!
*/

/*useFormContext
컨텍스트를 prop처럼 통과시키는 것이 불편해지는, 
깊이 중첩된 구조에서 사용하는 것을 목적으로 하는 커스텀 훅
React.useContext의 Provider처럼 useFormContext는 FormProvider으로 관리할 컴포넌트를 감싸줘야함
*/

const ControlledInput = (props) => {
  const formContext = useFormContext();
  const { formState } = formContext;

  const {
  name,
  label,
  rules,
  defaultValue,
  ...inputProps
} = props;

  const { field } = useController({ name, rules, defaultValue });
  const hasError = Boolean(formState?.errors[name]);
  return (
  <Container>
    {label && (<LabelText>{label}</LabelText>)}
    <View>
      <RNTextInput
        autoCapitalize="none"
        textAlign="left"
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
          {...inputProps}
        style={{
          
        }}
      />
      <ErrorContainer>
        {hasError && (<ErrorTxt>{formState.errors[name].message}</ErrorTxt>)}
      </ErrorContainer>
    </View>
  </Container>

  );
}

export default function TextInput(props) {
const {
  name,
  rules,
  label,
  defaultValue,
  setFormError,
  ...inputProps
} = props;
const formContext = useFormContext();
// Placeholder until input name is initialized
if (!formContext || !name) {
  const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
	console.error(msg)
  setFormError(true)
  return null
}
return <ControlledInput {...props} />;
};



const LabelText = styled.Text`
  color:white;
  margin:20;
  margin-left: 0;
`
const Container = styled.View`
  flex: -1;
  justify-content: center; 
  padding: 8;
  background-color: #0e101c;
  border-color: white;
  border-width: 1;
`

const ErrorContainer = styled.View`
  flex:-1;
  height:25;
`

// const RNTextInput= styled.TextInput`
//   background-color: white;
//   border-color: none;
//   height: 40;
//   padding:10;
//   border-radius: 4;
// `

const ErrorTxt = styled.Text`
  color: red;
`
