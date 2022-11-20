import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, useWindowDimensions } from "react-native";

import MainScreen from "../screens/MainScreen";
import SearchScreen from "../screens/SearchScreen";
import Mypage from '../screens/User/MypageScreen';
import Assignment from '../screens/Assignment';
import BookMain from "../screens/Book/BookMain";


const Tab = createMaterialTopTabNavigator();

const MainTabView = () => {
  const layout = useWindowDimensions();

  return (
    <Tab.Navigator
      initialRouteName="MainScreen"
      initialLayout={{ width: layout.width }}
      screenOptions={{ 
          tabBarShowLabel: false,
          tabBarStyle: { height: 0},
       }}
    >
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="Assignment" component={Assignment} />
      <Tab.Screen name="BookMain" component={BookMain} />
      <Tab.Screen name="Mypage" component={Mypage} />
    </Tab.Navigator>
  )
}

export default MainTabView