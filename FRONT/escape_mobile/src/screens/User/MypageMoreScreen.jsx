import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { useWindowDimensions,ImageBackground,Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { Input, Stack, Center, NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ReserveTab from '../ReservationScreen'
import ReviewTab from '../User/ReviewTab'
import ThemeTab from '../User/ThemeTab'

//찜한 테마
const ThemeRoute = () => (
  <View flex={1} style={{backgroundColor:'black'}}>
    <ThemeTab />
  </View>
);


//나의 리뷰
const ReviewRoute = () => (
  <ReviewTab/>
);

//나의 예약
const ReserveRoute = () => (
    <ReserveTab />
);

const renderScene = SceneMap({
  first: ThemeRoute,
  second: ReviewRoute,
  third : ReserveRoute
});
export default function MypageMoreScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "찜한 테마" },
    { key: "second", title: "나의 리뷰" },
    { key: "third", title: "나의 예약" },
  ]);

  return (
    <>
      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{
            backgroundColor: "rgba(223, 236, 103, 0.908)",
            border: "none"
          }}
          style={{
            backgroundColor: "black",
            fontFamily:"SUIT-Bold",
            // fontWeight: "bold",
            shadowOffset: { height: 0, width: 0 },
            shadowColor: "transparent"
          }}
          pressColor={"transparent"}
        />
      )}
        
    />
    </>
  )
}