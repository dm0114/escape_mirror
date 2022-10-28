import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import theme from './theme';

import LoadingScreen from './src/components/LoadingScreen';
import MainScreen from './src/screens/MainScreen';

const RootContainer = styled.View`
  flex: 1;
  padding: 20px 20px 0px 20px;
  background-color: #212121;
`

export default function App() {
  const [loading, SetLoading] = useState(false)

  useEffect(() => {
    // api 함수 호출
  }, [])

  return loading ? <LoadingScreen /> : (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <MainScreen />
      </RootContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}