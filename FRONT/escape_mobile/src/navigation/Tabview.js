import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CommunityScreen from "../screens/CommunityScreen";
import MainScreen from "../screens/MainScreen";
import SearchScreen from "../screens/SearchScreen";
import Login from '../screens/Login/PutFindPwScreen';
import SignupScreen from '../screens/Login/SignupScreen';
import FindIdScreen from '../screens/Login/FindIdScreen';
import FindPwScreen from '../screens/Login/FindPwScreen';
import Mypage from '../screens/User/MypageScreen';

const FirstRoute = () => (
  // 토큰 없으면 로그인페이지
  // <MainScreen />
  <MainScreen/>
);

const SecondRoute = () => (
  <SignupScreen />
);

const ThirdRoute = () => (
  <FindIdScreen />
);

const FourthRoute = () => (
  <FindPwScreen/>
);

const FifthRoute = () => (
  <Mypage />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
  fifth: FifthRoute
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", icon: ":"},
    { key: "second"},
    { key: "third"},
    { key: "fourth"},
    { key: "fifth"}
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