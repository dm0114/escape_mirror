import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import Drawers from './Drawer'

import Stack from './Stack'
import SearchScreen from '../screens/SearchScreen';
import ThemeDetailScreen from '../screens/ThemeDetailScreen';
import ReservationScreen from '../screens/ReservationScreen';


const Nav = createStackNavigator()


const Root = () => 
  // <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
  <Nav.Navigator
    initialRouteName="ReservationScreen"
    screenOptions={{
      cardStyle: { backgroundColor: '#212121' },
      headerShown: false
    }}
  >
      {/* <Nav.Screen name="Drawer" component={Drawer}/> */}
      <Nav.Screen name="SearchScreen" component={SearchScreen} />
      <Nav.Screen name="ReservationScreen" component={ReservationScreen} />
      <Nav.Screen name="ThemeDetailScreen" component={ThemeDetailScreen} />
      <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>

  export default Root