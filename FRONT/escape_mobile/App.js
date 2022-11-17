import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
// import * as SplashScreen from "expo-splash-screen";

import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from "styled-components";
import styled from "styled-components/native";
import theme from "./theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/navigation/Root";
import SearchScreen from "./src/screens/SearchScreen";

import { NativeBaseProvider } from "native-base";
import { RecoilRoot } from "recoil";

/**
 * 전역 관리
 */
const queryClient = new QueryClient();
const RootContainer = styled.View`
  flex: 1;
  background-color: #212121;
`;

export default function App() {
  useEffect(()=>{
    try{
      setTimeout(()=>{
        SplashScreen.hide();
      }, 500);
    } catch (e) {
      console.log(e.message);
    }
  });
  /**
   * 레이아웃 컨텍스트
   */

  const dimensions = useWindowDimensions();
  const LayoutValue = { Width: dimensions.width, Height: dimensions.height };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RootContainer>
              <NavigationContainer>
                <NativeBaseProvider>
                  <Root />
                </NativeBaseProvider>
                {/* <MainScreen /> */}
              </NavigationContainer>
            </RootContainer>
          </RecoilRoot>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
