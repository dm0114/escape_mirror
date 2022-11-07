import React, { useState,useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { LoginTextInput } from '../../components/LoginInputForm'
import { Image, Button, Text, View, Dimensions, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity,StyleSheet, Alert } from 'react-native';
import { useForm, Controller, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
// import Constants from 'expo-constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <Container>
      {/* 로고이미지 */}
      <LogoView flex={4}>
        <LoginText>로고이미지</LoginText>
      </LogoView>


      {/* 카카오 로그인 */}
      <LoginView flex={1}>
        <TouchableOpacity onPress={() => { navigation.navigate('KakaoLogin') }}>
          <Image
            source={require('../../assets/images/KakaoLogin.png')}
            style={{width:'100%', resizeMode:'contain'}}
            />
        </TouchableOpacity>
      </LoginView>
    </Container>
  )
}
const LoginText = styled.Text`
  color: white;
`
/* const Container = styled.View ` */
const Container = styled.View `
  flex: 1;
  padding: 80px 20px 0px 20px;
  /* width:SCREEN_WIDTH, */
`
const LoginView = styled.View`
  flex: ${props=> props.flex};
  background-color: ${props => props.backgroundColor};
`

const LogoView = styled(LoginView)`
  ${({ theme }) => theme.common.flexCenterColumn};
`

// const LogoView = styled.View`
//   flex: ${props=> props.flex};
//   background-color: ${props => props.backgroundColor};
//   justify-content: center;
//   align-items: center;
// `

// const LoginTextInput = styled.TextInput`
//   flex:${props => props.flex};
//   border-radius: 10px;
//   background-color: white;
//   color: black;
//   margin: 10px 0;
// `
// const LoginBtn = styled.TouchableOpacity`
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

// // const LoginBtn = styled.Button`
// //   flex:${props => props.flex};
// //   background-color: ${props => props.backgroundColor};
// // `
// const LoginFindView = styled.View`
//   flex-direction: row;
//   justify-content: center;
//   margin: 10px 0;
// `
// const FindIdText = styled.Text`
//   color:white;
// `
// const FindText = styled.Text`
//   color:white;
// `
// const FindPwText = styled.Text`
//   color:white;
// `

// const LoginContainer = styled.View`
//   flex: 1;
//   justify-content: center;
//   // paddingTop: Constants.statusBarHeight,
//   /* padding: 8; */
// `

// const LoginTxt = styled.Text`
//   color: white;
//   /* margin: 20; */
//   margin-left: 0;
// ` 

// const LoginTxtInput = styled.TextInput`
//   background-color: white;
//   border-color: none;
//   /* height: 40; */
//   /* padding: 10; */
//   border-radius: 10px;
//   padding: 8px 0;
//   margin: 5px 0;
// `


// const styles = StyleSheet.create({
//   label: {
//     color: 'white',
//     margin: 20,
//     marginLeft: 0,
//   },
//   button: {
//     marginTop: 40,
//     color: 'white',
//     height: 40,
//     backgroundColor: '#ec5990',
//     borderRadius: 4,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     // paddingTop: Constants.statusBarHeight,
//     padding: 8,
//     backgroundColor: '#0e101c',
//   },
//   input: {
//     backgroundColor: 'white',
//     borderColor: 'none',
//     height: 40,
//     padding: 10,
//     borderRadius: 4,
//   },
// });


      {/* { formError ? <View><Text style={{color: 'red'}}>There was a problem with loading the form. Please try again later.</Text></View> :
       <>
        <FormProvider {...methods}>
        <LoginTextInput
          name="email"
          label="Email"
          placeholder="jon.doe@email.com"
          keyboardType="email-address"
          rules={{
            required: 'Email is required!',
            pattern: {
              value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
              message: 'Must be formatted: john.doe@email.com',
            },
          }}
          setFormError={setError}
         />
        <LoginTextInput
          name="password"
          label="Password"
          secureTextEntry
          placeholder="**********"
          rules={{ required: 'Password is required!' }}
          setFormError={setError}
        />
      </FormProvider>
      </>
      }
      <Button
          title="Login"
          color="#ec5990"
          onPress={methods.handleSubmit(SubmitHandler, SubmitErrorHandler)}
        /> */}



      //   {/* 이메일 Component */}
      // <LoginContainer >
      //   <LoginTxt>이메일</LoginTxt>
      //   <Controller
      //     control={control}
      //     render={({field: { onChange, onBlur, value }}) => (
      //       <LoginTxtInput
      //         // style={styles.input}
      //         placeholder="이메일을 입력해주세요"
      //         onBlur={onBlur}
      //         onChangeText={value => onChange(value)}
      //         value={value}

      //     //     rules={{
      //     //     required: '이메일을 입력해주세요!',
      //     //       pattern: {
      //     //       value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
      //     //       message: 'Must be formatted: john.doe@email.com',
      //     //   },
      //     // }}
      //       />
      //     )}
      //     name="email"
      //     rules={{ required: true }}
      //       />
      //             {/* 비밀번호 Component */}
      //   <LoginTxt>비밀번호</LoginTxt>
      //   <Controller
      //     control={control}
      //     render={({field: { onChange, onBlur, value }}) => (
      //       <LoginTxtInput
      //         // style={styles.input}
      //         placeholder="············"
      //         onBlur={onBlur}
      //         onChangeText={value => onChange(value)}
      //         value={value}
      //         secureTextEntry
      //         autoComplete={'email'}
      //       />
      //     )}
      //     name="password"
      //     rules={{ required: true }}
      //       />
      //     {/* 확인버튼 */}
      //     <LoginBtn onPress={handleSubmit(onSubmit)}>
      //       <BtnText>로그인</BtnText>
      //     </LoginBtn>
      //   {/* <View style={styles.button}>
      //     <Button
      //       style={styles.buttonInner}
      //       color
      //       title="로그인"
      //       onPress={handleSubmit(onSubmit)}
      //     />
      //   </View> */}
      // <LoginBtn onPress={() => Alert.alert('회원가입임')}>
      //   <BtnText >회원가입</BtnText>
      //     </LoginBtn>
              
      // {/* 아이디 찾기 및 비밀번호 찾기 */}
      // <LoginFindView flex={0.5}>
      //   <FindIdText>아이디 찾기</FindIdText>
      //   <FindText> | </FindText>
      //   <FindPwText>비밀번호 찾기</FindPwText>
      // </LoginFindView>
     
      //   </LoginContainer>


        // const [idInput, setIdInput] = useState('');
  // console.log(idInput)
  // const [pwInput, setPwInput] = useState('');
  // console.log(pwInput)
  // const onChangeID = (id) => setIdInput(id);
  // const onChangePW = (password) => setPwInput(password);
  // const { control, handleSubmit } = useForm();

  // useForm hook and set default behavior/values
  // const {...methods} = useForm({mode: 'onChange'});
  // const SubmitHandler = (data) => console.log({data});
  // const [formError, setError] = useState(false)
  // const SubmitErrorHandler = (errors, e) => {
  //   return console.log({errors})
  // }


  // const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
  //   defaultValues: {
  //     email: '',
  //     password: ''
  //   }
  // });
  // const onSubmit = data => {
  //   console.log(data);
  // };

  // const onChange = arg => {
  //   return {
  //     value: arg.nativeEvent.text,
  //   };
  // };
  // console.log('errors', errors);