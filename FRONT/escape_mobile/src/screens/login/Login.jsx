import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios'
import { SecureState } from '../../store/SecureStore';
import { AsyncState } from '../../store/AsyncStore';


const REST_API_KEY = '6cb2dd1e35672b64fb0dac71ee59315f'
const REDIRECT_URI = 'http://localhost:8082'
const APIURI = 'http://k7c104.p.ssafy.io:8080/api/user/kakao'

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const qs = require('qs');

const requestToken = async (code ) => {
  const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';

  const options = qs.stringify({
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
    client_secret: 'nPbxKBveS9LdVJv8rHjV7dXXztkbK1tj'
  });

  try {
    const tokenResponse = await axios.post(requestTokenUrl, options);
    const ACCESS_TOKEN = tokenResponse.data.access_token;
    console.log(ACCESS_TOKEN);
    // 3. 토큰 받으면 화면 로그인 상태로 변경
    
    const body = {
      accessToken: ACCESS_TOKEN,
    };


    const response = await axios.post(APIURI, body);
    const value = response.data;    
    await SecureState.setData('accessToken', `Bearer ${value.accessToken}`);
    

    // await AsyncState.setData(ACCESS_TOKEN);
    // await AsyncState.getData();

  // const result = await storeUser(value);
  //   if (result === 'stored') {
  //     const user = await getData('user');
  //     dispatch(read_S(user));
  //     await navigation.navigate('Main');
  //   }
  } catch (e) {
    console.log(e);
  }
};

const getCode = (target) => {
  const exp = '?code='
  const condition = target.indexOf(exp);
  if (condition !== -1) {
    const requestCode = target.substring(condition + exp.length);
    requestToken(requestCode);
  }
};


export default function LoginScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}
