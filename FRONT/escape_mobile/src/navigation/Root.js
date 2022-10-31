import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import Drawers from './Drawer'

import Stack from './Stack'
import SearchScreen from '../screens/SearchScreen';


const Nav = createStackNavigator()


const Root = () => 
  // <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
  <Nav.Navigator
    initialRouteName="SearchScreen"
    screenOptions={{
      cardOverlayEnabled: false,
      cardStyle: { backgroundColor: '#212121' },
      headerShown: false
    }}
  >
      {/* <Nav.Screen name="Drawer" component={Drawer}/> */}
      <Nav.Screen name="SearchScreen" component={SearchScreen} />
      <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>

  export default Root