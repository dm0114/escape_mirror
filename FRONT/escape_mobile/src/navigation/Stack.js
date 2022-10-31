import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ThemeDetailScreen from "../screens/ThemeDetailScreen";

const StackNav = createStackNavigator();

const Stack = () => {
  <StackNav.Navigator>
    <StackNav.Screen name="ThemeDetailScreen" component={ThemeDetailScreen} />
  </StackNav.Navigator>;
};

export default Stack;
