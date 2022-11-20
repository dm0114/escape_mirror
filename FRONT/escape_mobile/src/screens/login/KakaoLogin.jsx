// // import React, { useState,useRef } from 'react';
// // import styled from 'styled-components/native';
// // import { useWindowDimensions,ImageBackground,Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
// // import { WebView } from 'react-native-webview'; 

// // // const now_url = mWvBrowser.getUrl();
// // // // console.log(now_url)
// // // const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
// // export default function KakaoLogoin() {
  
// //   return (
// //     <View style={{flex: 1}}>
// //       <Text>로그인 화면</Text>

// //       {/* <WebView source={{uri: 'https://reactnative.dev/'}}></WebView> */}
// //       <WebView
// //         originWhitelist={['*']}
// //         scalesPageToFit={false}
// //         style={{marginTop: 30}}
// //         source={{
// //           uri : 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=0c63b5d77d9ab6952f145147cd352307&redirect_uri=http://localhost:8082'
// //           // uri: 'https://kauth.kakao.com/oauth/authorize?client_id=&redirect_uri=http://localhost:8081&response_type=code',
// //           //client_id에는 본인 앱 등록후 발급받은 REST API KEY
// //           //redirect_url도 본인 uri
// //         }}
// //         // injectedJavaScript={runFirst}
// //         // javaScriptEnabled={true}
// //         // onMessage={event => {
// //         //   parseAuthCode(event.nativeEvent['url']);
// //         // }}

// //         // onMessage ... :: webview에서 온 데이터를 event handler로 감지하여 parseAuthCood로 전달
// //       />
// //     </View>
// //   )
// // }

// // kakaoLogin.js

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React from 'react';
// import {View, LogBox, Text} from 'react-native';
// import {WebView} from 'react-native-webview';

// LogBox.ignoreLogs(['Remote debugger']);

// const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

// const KakaoLogin = ({navigation: {navigate}}) => {
//   const parseAuthCode = async url => {
//     const exp = 'code='; //url에 붙어 날라오는 인가코드는 code=뒤부터 parse하여 get
//     const startIndex = url.indexOf(exp); //url에서 "code="으로 시작하는 index를 찾지 못하면 -1반환
//     if (startIndex !== -1) {
//       const authCode = url.substring(startIndex + exp.length);
//       console.log('access code :: ' + authCode);

//       await axios
//         .post('http://localhost:8080/api/user/kakao', {
//           params: {
//             code: authCode,
//           },
//         })
//         .then(res =>
//           AsyncStorage.setItem(
//             'userNumber',
//             JSON.stringify(res['data']['userId']),
//           ),
//         );

//       navigate('TabViewExample', {screen: 'TabViewExample'});
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Text>로그인 화면</Text>
//       <WebView
//         originWhitelist={['*']}
//         scalesPageToFit={false}
//         style={{marginTop: 30}}
//         source={{
//           uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=0c63b5d77d9ab6952f145147cd352307&redirect_uri=http://localhost:8080/api/user/kakao'
//           // uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=0c63b5d77d9ab6952f145147cd352307&redirect_uri=http://localhost:8082',
//         }}
//         injectedJavaScript={runFirst}
//         javaScriptEnabled={true}
//         onMessage={event => {
//           parseAuthCode(event.nativeEvent['url']);
//         }}

//         // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
//       />
//     </View>
//   );
// };

// export default KakaoLogin;