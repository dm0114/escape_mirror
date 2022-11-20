import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BookMain from "../screens/Book/BookMain";
// import CommunityScreen from "../screens/CommunityScreen";
import LoginScreen from "../screens/login/Login";
// import CommunityScreen from "../screens/CommunityScreen";
// import LoginScreen from "../screens/Login/LoginScreen";
import MainScreen from "../screens/MainScreen";
import SearchScreen from "../screens/SearchScreen";
import Mypage from '../screens/User/MypageScreen';
import Assignment from '../screens/Assignment';


const FirstRoute = () => (<MainScreen />)
const SecondRoute = () => (<SearchScreen />)
const ThirdRoute = () => (<BookMain />)
const FourthRoute = () => (<Assignment />)
const FifthRoute = () => (<Mypage />)


const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
  fifth: FifthRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first" },
    { key: "second" },
    { key: "third" },
    { key: "fourth" },
    { key: "fifth" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={() => null}
      // renderTabBar={props => <TabBar {...props} />}
    />
  );
}
