import * as React from 'react';
import {
  Animated,
  View, Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const ThemeDatas = {
  themeId: 3,
  themeName: "비밀의 가족",
  genre: "공포/스릴러",
  capacity: "2인 이상",
  price: "/44000/66000/88000/110000",
  difficulty: 8,
  leadtime: 60,
  description: "string(상세설명)",
  themeImg: "url",
  star: 8,
  feeldifficulty: 8,
  feelstrory: 8,
  feelinterior: 8,
  feelactivity: 6,
  feelhorror: 8,
  lock: 60,
  reviews: [
    {
      reviewId: 4,
      User: "리뷰 작성자",
      content: "리뷰 내용",
      star: 8,
      reviewImg: "리뷰이미지 링크",
      created_at: "2022-08-08",
      clearDate: "2022-08-01",
      usedHint: 3,
      clearTime: "76:52",
    },
    {
      reviewId: 5,
      User: "리뷰 작성자",
      content: "리뷰 내용",
      star: 8,
      reviewImg: "리뷰이미지 링크",
      created_at: "2022-08-08",
      clearDate: "2022-08-01",
      usedHint: 3,
      clearTime: "76:52",
    },
  ],
  noHintRanking: [
    {
      userNickname: "방탈출랭커",
      cleartime: "72:12",
    },
  ],
  hintRanking: [
    {
      userNickname: "방탈출고수",
      cleartime: "72:12",
      usedHint: 4,
    },
  ],
};

const FirstRoute = () => (
  <View style={{height: "100%"}}>
      {ThemeDatas.reviews.map((item) => {
        <View key={item.reviewId}>
          <Text>{item.User}</Text>
          <Text>{item.content}</Text>
          <Text>{item.star}</Text>
          <Text>{item.reviewImg}</Text>
          <Text>{item.created_at}</Text>
          <Text>{item.clearDate}</Text>
          <Text>{item.usedHint}</Text>
          <Text>{item.clearTime}</Text>
        </View>
      })}
  </View>
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);
const ThirdRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);

export default class TabViewEx extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: '리뷰' },
      { key: 'second', title: '노힌트 랭킹' },
      { key: 'third', title: '힌트 랭킹' },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
