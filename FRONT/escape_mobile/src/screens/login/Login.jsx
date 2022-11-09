import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios'


const REST_API_KEY = '0c63b5d77d9ab6952f145147cd352307'
const REDIRECT_URI = 'http://localhost:8082'

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const qs = require('qs');

const requestToken = async (code ) => {
  const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';

  const options = qs.stringify({
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
    client_secret: 'W9u87VSNGdCApszypnbb0lQiD28eXEAF'
  });

  try {
    const tokenResponse = await axios.post(requestTokenUrl, options);
    const ACCESS_TOKEN = tokenResponse.data.access_token;
    console.log(ACCESS_TOKEN); 
    // 1. api만들어지면 api주소로 post로 던지기 -> 찬기님이랑 얘기
    // 2. 응답으로 받은 토큰을 보안 저장소에 저장 (https://docs.expo.dev/versions/latest/sdk/securestore/)
    // 3. 토큰 받으면 화면 로그인 상태로 변경
    // 4. 화이팅하기ㅎㅎ
    
    const body = {
      ACCESS_TOKEN,
    };
    const response = await axios.post(REDIRECT_URI, body);
    const value = response.data;
    const result = await storeUser(value);
    if (result === 'stored') {
      const user = await getData('user');
      dispatch(read_S(user));
      await navigation.navigate('Main');
    }
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
