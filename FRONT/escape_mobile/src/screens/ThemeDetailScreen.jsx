import * as React from "react";
import { useState } from "react";

import styled from "styled-components/native";

import { View, Text, useWindowDimensions, FlatList, StyleSheet,StatusBar } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from '@react-navigation/native';

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";
import TabViewEx from "../navigation/TmpTabView";

function ThemeDetailScreen({navigation, route}) {
  const {themeId} = route.params;
  const { isLoading, data } = useQuery(
    ["ThemeDetail", themeId],
    searchApi.getThemeDetail
  );
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
  const ReviewRoute = () => {
    <FlatList
      data={ThemeDatas.reviews}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 40,
        height: '200px'
      }}
      renderItem={({ item }) => (
        <>
          <Text>{item.User}</Text>
          <Text>{item.content}</Text>
          <Text>{item.star}</Text>
          <Text>{item.reviewImg}</Text>
          <Text>{item.created_at}</Text>
          <Text>{item.clearDate}</Text>
          <Text>{item.usedHint}</Text>
          <Text>{item.clearTime}</Text>
        </>
      )}
    />;
  };

  const NohintRoute = () => {
    
    <FlatList
      data={ThemeDatas.noHintRanking}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 40,
      }}
      renderItem={({ item }) => (
        <>
          <Text>{item.userNickname}</Text>
          <Text>{item.cleartime}</Text>
        </>
      )}
    />;
  };
  const HintRoute = () => {
    <FlatList
      data={ThemeDatas.hintRanking}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 40,
      }}
      renderItem={({ item }) => (
        <>
          <Text>{item.userNickname}</Text>
          <Text>{item.cleartime}</Text>
          <Text>{item.usedHint}</Text>
        </>
      )}
    />;
  };

  const ThemeTabView = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: "Review", title: "리뷰" },
      { key: "Nohint", title: "노힌트 랭킹" },
      { key: "Hint", title: "힌트 랭킹" },
    ]);

    return (
        <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            Review: ReviewRoute,
            Nohint: NohintRoute,
            Hint: HintRoute,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar {...props} style={{ textColor: "#000" }} />
          )}
        />
    );
  };

  return (
    <>
      <MainContainer></MainContainer>
      <SubContainer>
        {/* themeImg 넣기 */}
        <CafeImage />
        <Title>{ThemeDatas.themeName}</Title>
        <SubTitle>{ThemeDatas.star}점</SubTitle>
        <RowContainer>
          <SubTitle>{ThemeDatas.leadtime}분 | </SubTitle>
          <SubTitle>난이도 {ThemeDatas.difficulty} | </SubTitle>
          <SubTitle>{ThemeDatas.capacity} </SubTitle>
        </RowContainer>
        <SubTitle>{ThemeDatas.price}</SubTitle>
        <RowContainer>
          <Title>별점 | </Title>
          <Title>스탯</Title>
        </RowContainer>
        <SubTitle>{ThemeDatas.description}</SubTitle>
        <ThemeTabView />

        {/* store LikeButton 추가 */}
        <ButtonContainer
          onPress={() => {navigation.navigate('PostReservationScreen', {
            themeName: ThemeDatas.themeName,
            leadtime: ThemeDatas.leadtime,
            price: ThemeDatas.price,
            themeImg: ThemeDatas.themeImg,
          })}}
        >
          <Text>예약하기</Text>
        </ButtonContainer>
      </SubContainer>
    </>
  );
}

export default ThemeDetailScreen;

const MainContainer = styled.View`
  flex: 1;
`;
const SubContainer = styled.View`
  flex: 5;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;

// 추후 이미지 태그로 대체
const CafeImage = styled.View`
  position: relative;
  top: -80px;
  width: 100px;
  height: 160px;
  margin-bottom: -60px;
  margin-left: auto;
  margin-right: auto;
  background-color: gray;
  border-radius: 10px;
`;
const Title = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: #000;
  text-align: center;
`;
const SubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  color: #000;
  text-align: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 256px;
  height: 64px;
  border-radius: 40px;
  background-color: #f9dc87;
`;

const TmpContainer = styled.View`
  background-color: #000;
`;


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
