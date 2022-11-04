import React, { useState } from "react";
import { FlatList, Text, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

function CafeDetailScreen({ navigation: { navigate }, route }) {
  const {storeId} = route.params;
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["CafeDetail", storeId], //토큰 추가
    searchApi.getCafeDetail);
    return (
      isLoading ? <LoadingScreen/> : 
      <MainContainer>
        <Container>
          {/* themeImg 넣기 */}
          <CafeImage />
          <TextContainer>
            <Title>{data.store.storeName}</Title>
            <SubTitle>{data.store.Address}</SubTitle>
            <SubTitle>{data.store.mapX}</SubTitle>
            <SubTitle>{data.store.mapY}</SubTitle>
            
              <SubTitle>{data.store.tel}분 | </SubTitle>
              <SubTitle>난이도 {data.store.storeImg} | </SubTitle>
              <SubTitle>{data.store.homepage} </SubTitle>
            
            <SubTitle>{data.store.region}</SubTitle>
            <SubTitle>{data.store.isClear ? <Text>Clear</Text> : <Text>Fail</Text> }</SubTitle>
          </TextContainer>
        </Container>
        <Title>테마 종류</Title>
        <View>
          {data.store.themeList.map((item) => {
            return (
              <TmpContainer key={item.themeId}>
                <Text>{item.themeName}</Text>
                <Text>{item.themeImg}</Text>
                <Text>{item.likeCount}</Text>
                <Text>{item.star}</Text>
              </TmpContainer>
            )})}
        </View>
        {/* store LikeButton 추가 */}
        <ButtonContainer />
      </MainContainer>
    );

    const SecondRoute = () => (
      <View style={{ flex: 1, backgroundColor: "#673ab7" }}>
        <Ionicons name="call" size={24} color="black" />
        <Text>전화 하기</Text>
        <Ionicons name="logo-instagram" size={24} color="black" />
        <Text>방문 하기</Text>
        <Text>지도 띄우기</Text>
      </View>
    );

    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: "first", title: "테마 종류" },
      { key: "second", title: "상세 정보" },
    ]);

    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar {...props} style={{ backgroundColor: null }} />
        )}
      />
    );
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <Container>
        {/* themeImg 넣기 */}
        <CafeImage />
        <TextContainer>
          <Title>{data.store.storeName}</Title>
          <SubTitle>{data.store.Address}</SubTitle>
          <SubTitle>{data.store.mapX}</SubTitle>
          <SubTitle>{data.store.mapY}</SubTitle>

          <SubTitle>{data.store.tel}분 | </SubTitle>
          <SubTitle>난이도 {data.store.storeImg} | </SubTitle>
          <SubTitle>{data.store.homepage} </SubTitle>

          <SubTitle>{data.store.region}</SubTitle>
          <SubTitle>
            {data.store.isClear ? <Text>Clear</Text> : <Text>Fail</Text>}
          </SubTitle>
        </TextContainer>
      </Container>
      <HeaderTabView />
    </>
  );

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: 16px;
`;

// 추후 이미지 태그로 대체
const CafeImage = styled.View`
  width: 100px;
  height: 160px;
  background-color: gray;
`;
const Title = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: #fff;
  margin-bottom: 8px;
`;
const SubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  color: #fff;
`;

const TmpContainer = styled.View`
  background-color: #fff;
`;

export default CafeDetailScreen;
