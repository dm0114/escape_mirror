import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import theme from './theme';

import LoadingScreen from './src/components/LoadingScreen';
import MainScreen from './src/screens/MainScreen';
import SearchScreen from './src/screens/SearchScreen';
import CommunityScreen from './src/screens/CommunityScreen';

import Login from './src/screens/Login/FindIdScreen'

const RootContainer = styled.View`
  flex: 1;
  padding: 20px 20px 0px 20px;
  background-color: #212121;
`

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls, DB접근 등
        await Font.loadAsync({
          "SUIT-Bold": require("./src/assets/fonts/SUIT-Bold.otf"),
          "SUIT-ExtraBold": require("./src/assets/fonts/SUIT-ExtraBold.otf"),
          "SUIT-ExtraLight": require("./src/assets/fonts/SUIT-ExtraLight.otf"),
          "SUIT-Light": require("./src/assets/fonts/SUIT-Light.otf"),
          "SUIT-Medium": require("./src/assets/fonts/SUIT-Medium.otf"),
          "SUIT-Regular": require("./src/assets/fonts/SUIT-Regular.otf"),
          "SUIT-SemiBold": require("./src/assets/fonts/SUIT-SemiBold.otf"),
        });

      } catch (e) {
        console.warn(e);

      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Login />
      </RootContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}