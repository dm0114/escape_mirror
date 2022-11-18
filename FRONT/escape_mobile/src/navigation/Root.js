import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import Drawers from './Drawer'

import Stack from './Stack';
import SearchScreen from '../screens/SearchScreen';
import ThemeDetailScreen from '../screens/ThemeDetailScreen';
import CafeDetailScreen from '../screens/CafeDetailScreen';
import ThemeSearchScreen from '../screens/ThemeSearchScreen';
import CafeSearchScreen from '../screens/CafeSearchScreen';

import ReservationScreen from '../screens/ReservationScreen';
import ReservationDetailScreen from '../screens/ReservationDetailScreen';
import ReservationTransfer from '../screens/ReservationTransfer';
import PostReservationScreen from '../screens/PostReservationScreen';
import RegionBook from '../screens/Book/RegionBook';
import Book from '../screens/Book/Book';
import CafeBook from '../screens/Book/CafeBook';
import BookMain from '../screens/Book/BookMain';

import Assignment from '../screens/Assignment';

import CommunityScreen from '../screens/CommunityScreen';
import CommunityDetailScreen from '../screens/CommunityDetailScreen';
import TabViewExample from './Tabview';

import MypageMoreScreen from '../screens/User/MypageMoreScreen';
import KakaoLogin from '../screens/login/Login';
import ReviewCreateScreen from '../screens/Review/ReviewCreateScreen';

const Nav = createStackNavigator()


const Root = () => 
  // <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
  <Nav.Navigator
    initialRouteName="KakaoLogin"
    screenOptions={{
      cardStyle: { backgroundColor: '#212121' },
      headerShown: false,
    }}
  >
      {/* <Nav.Screen name="Drawer" component={Drawer}/> */}
      
      <Nav.Screen name="TabViewExample" component={TabViewExample} />
      <Nav.Screen name="SearchScreen" component={SearchScreen} />

      <Nav.Screen name="ReservationScreen" component={ReservationScreen} />
      <Nav.Screen name="PostReservationScreen" component={PostReservationScreen} />
      <Nav.Screen name="ReservationDetailScreen" component={ReservationDetailScreen} />
      <Nav.Screen name="ReservationTransfer" component={ReservationTransfer} />
      
      <Nav.Screen name="ThemeSearchScreen" component={ThemeSearchScreen} />
      <Nav.Screen name="CafeSearchScreen" component={CafeSearchScreen} />
      <Nav.Screen name="ThemeDetailScreen" component={ThemeDetailScreen} />
      <Nav.Screen name="CafeDetailScreen" component={CafeDetailScreen} />
      <Nav.Screen name="RegionBook" component={RegionBook} />
      <Nav.Screen name="CafeBook" component={CafeBook} />
      <Nav.Screen name="Book" component={Book} />
      <Nav.Screen name="BookMain" component={BookMain} />
      <Nav.Screen name="CommunityScreen" component={CommunityScreen} />
      <Nav.Screen name="CommunityDetailScreen" component={CommunityDetailScreen} />
      <Nav.Screen name="Stack" component={Stack} />
      <Nav.Screen name="MypageMoreScreen" component={MypageMoreScreen} />
      <Nav.Screen name="KakaoLogin" component={KakaoLogin} />
      <Nav.Screen name="ReviewCreateScreen" component={ReviewCreateScreen} />
      <Nav.Screen name="Assignment" component={Assignment} />
  </Nav.Navigator>

  export default Root