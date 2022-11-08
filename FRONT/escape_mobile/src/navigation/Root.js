import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import Drawers from './Drawer'

import Stack from './Stack'
import SearchScreen from '../screens/SearchScreen';
import ThemeDetailScreen from '../screens/ThemeDetailScreen';
import CafeDetailScreen from '../screens/CafeDetailScreen';

import ReservationScreen from '../screens/ReservationScreen';
import ReservationDetailScreen from '../screens/ReservationDetailScreen';
import ReservationTransfer from '../screens/ReservationTransfer';
import PostReservationScreen from '../screens/PostReservationScreen';
import RegionBook from '../screens/Book/RegionBook';
import Book from '../screens/Book/Book';

import CommunityScreen from '../screens/CommunityScreen';
import CommunityDetailScreen from '../screens/CommunityDetailScreen';
import TabViewExample from './Tabview';

import MypageMoreScreen from '../screens/User/MypageMoreScreen'
import KakaoLogin from '../screens/Login/KakaoLogin'


const Nav = createStackNavigator()


const Root = () => 
  // <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
  <Nav.Navigator
    initialRouteName="TabViewExample"
    screenOptions={{
      cardStyle: { backgroundColor: '#212121' },
      headerShown: false
    }}
  >
      {/* <Nav.Screen name="Drawer" component={Drawer}/> */}
      
      <Nav.Screen name="TabViewExample" component={TabViewExample} />
      <Nav.Screen name="SearchScreen" component={SearchScreen} />

      <Nav.Screen name="ReservationScreen" component={ReservationScreen} />
      <Nav.Screen name="PostReservationScreen" component={PostReservationScreen} />
      <Nav.Screen name="ReservationDetailScreen" component={ReservationDetailScreen} />
      <Nav.Screen name="ReservationTransfer" component={ReservationTransfer} />
      <Nav.Screen name="ThemeDetailScreen" component={ThemeDetailScreen} />
      <Nav.Screen name="CafeDetailScreen" component={CafeDetailScreen} />
      <Nav.Screen name="RegionBook" component={RegionBook} />
      <Nav.Screen name="Book" component={Book} />
      <Nav.Screen name="CommunityScreen" component={CommunityScreen} />
      <Nav.Screen name="CommunityDetailScreen" component={CommunityDetailScreen} />
      <Nav.Screen name="Stack" component={Stack} />
      <Nav.Screen name="MypageMoreScreen" component={MypageMoreScreen} />
      <Nav.Screen name="KakaoLogin" component={KakaoLogin} />
  </Nav.Navigator>

  export default Root