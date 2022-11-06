import React, { useState } from "react";

import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

import SearchCafeList from "../components/SearchCafeList";
import SearchThemeList from "../components/SearchThemeList";
import LoadingScreen from "./LoadingScreen";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["searchCafeAndTheme", query], //토큰 추가
    searchApi.getSearch,
    { enabled: false }
  );

  const onChangeText = (text) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    refetch();
  };

  const SearchResult = () => {
    if (!isLoading && !isFetching) {
      const CafeRoute = () => (
        <CafeListScroll
          data={data.storeList}
          contentContainerStyle={{ paddingTop: 40 }}
          renderItem={({ item }) => (
            <SearchCafeList
              storeId={item.storeId}
              storeName={item.storeName}
              storeImg={item.storeImg}
              storeAddress={item.storeAddress}
              likeCount={item.likeCount}
            />
          )}
        />
      );

      const ThemeRoute = () => (
        <ThemeListScroll
          data={data.themeList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          numColumns={2}
          renderItem={({ item }) => (
            <SearchThemeList
              themeId={item.themeId}
              themeName={item.themeName}
              storeName={item.storeName}
              themeImg={item.themeImg}
              likeCount={item.likeCount}
              star={item.star}
            />
          )}
        />
      );

      const layout = useWindowDimensions();

      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
        { key: "Cafe", title: "카페 검색 결과" },
        { key: "Theme", title: "테마 검색 결과" },
      ]);

      return (
        <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            Cafe: CafeRoute,
            Theme: ThemeRoute,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar {...props} style={{ backgroundColor: null }} />
          )}
        />
      );
    } else if (isLoading && isFetching) return <LoadingScreen />;
    else {
      return (
        <>
          <SearchView flex={1}>
            <SubText>지금 주변에서 인기 있는 곳</SubText>
            {/* 이미지 및 슬라이더 추가 */}
          </SearchView>
        </>
      );
    }
  };

  return (
    <>
      <TextContainer>
        <MainText>
          초대 받지 않은 곳을 {"\n"}
          가는 것도 큰 재미이죠.{"\n"}
          새로운 곳에 가보시겠어요?
        </MainText>
      </TextContainer>
      <SearchTextInput
        placeholder="카페 또는 테마를 입력하세요."
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      <SearchResult />
    </>
  );
}

const Container = styled.View`
  background-color: red;
`;

const TextContainer = styled.View`
  justify-content: center;
`;

const ThemeListScroll = styled.FlatList``;

const CafeListScroll = styled.FlatList``;

const SearchView = styled.View`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
`;

const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
  line-height: ${({ theme }) => theme.fontHeight.title2};
  margin-left: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`;

const SubText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  color: #fff;
`;

const SearchTextInput = styled.TextInput`
  background-color: #fff;
  padding: 8px 16px;
  margin: 16px;
  border-color: #fff;
  border-radius: 20px;

  text-align: center;
`;
