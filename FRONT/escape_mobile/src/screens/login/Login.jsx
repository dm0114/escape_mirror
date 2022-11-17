import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { SecureState } from '../../store/SecureStore';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { LayoutData } from '../../store/Atom';


const REST_API_KEY = '6cb2dd1e35672b64fb0dac71ee59315f'
const REDIRECT_URI = 'http://localhost:8082'
const APIURI = 'http://k7c104.p.ssafy.io:8080/api/user/kakao'
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const qs = require('qs');


const requestToken = async (code, navigation) => {
  console.log('003');

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
    const body = {
      accessToken: ACCESS_TOKEN,
    };

    const response = await axios.post(APIURI, body);
    const value = response.data;
    await SecureStore.setItemAsync('accessToken', `Bearer ${value.accessToken}`);
    await SecureStore.getItemAsync('accessToken')
    
    navigation.navigate('Loading');
    

    // await AsyncState.setData(ACCESS_TOKEN);
    // await AsyncState.getData();

    // const result = await storeUser(value);
    // if (result === 'stored') {
    //   const user = await getData('user');
    //   dispatch(read_S(user));
    //   await navigation.navigate('Main');
    // }

  } catch (e) {
    console.log(e);
  }
};

const getCode = (target, navigation) => {
  const exp = '?code='
  const condition = target.indexOf(exp);
  if (condition !== -1) {
    console.log('002');
    const requestCode = target.substring(condition + exp.length);
    requestToken(requestCode, navigation);
  }
};


export default function LoginScreen() {
  const dimensions = useWindowDimensions();
  const setLayoutDatas = useSetRecoilState(LayoutData)
  useEffect(()=> {
    const LayoutValue = { Width: dimensions.width, Height: dimensions.height };
    setLayoutDatas(LayoutValue)
  }, [])

  const navigation = useNavigation();
  const [token, setToken] = useState();
  const getToken = async () => {
    setToken(await SecureStore.getItemAsync('accessToken'))
    // console.log(token);
  }
  
  useEffect(() => {    
    getToken()
    if (token) {
      navigation.navigate('TabViewExample')
    }
  }, [])

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
          // console.log('001');
          const data = event.nativeEvent.url;
          getCode(data, navigation);
        }}
      />
  </View>
  )
}
