import React, { useState } from "react";
import styled from "styled-components/native";

import { useQuery } from "@tanstack/react-query";
import { communityApi } from "../apis/api";
import { Text, TouchableOpacity, View } from "react-native";
import LoadingScreen from '../screens/LoadingScreen'
import { useNavigation } from "@react-navigation/native";

export default function CommunityScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const { isLoading, data } = useQuery(
    ["CommunityList", query],
    communityApi.getCommunityList
  );

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
    isLoading ? <LoadingScreen /> :
    <View>
      <MainText>동료들과 이야기를 나눠보세요</MainText>
      <Text>토글1</Text>
      <Text>토글2</Text>
      <Text>토글3</Text>
      {/* 커뮤니티는 토글로 필터링 */}
      {data.articles.map((item) => {
        return (
          <ArticleComponent
            key={item.articleId}
            // onPress={() => {navigation.navigate('CommunityDetailScreen', 
            // {articleId: item.articleId })}}
            onPress={() => {navigation.navigate('CommunityDetailScreen', {articleId:item.articleId})}}
            style={{ backgroundColor: "#FBFBFB"}}
          >
            <ArticleTitle>{item.Title}</ArticleTitle>
            <ArticleWriter>{item.writerName}</ArticleWriter>
          </ArticleComponent>
        )
      })}
    </View>
  );
}
// 뷰

// 요소
const ArticleComponent = styled.TouchableOpacity`
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
`

// 텍스트
const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  color: #fff;
  line-height: ${({ theme }) => theme.fontHeight.title3};
  margin-left: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`;

const ArticleTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
`
const ArticleWriter = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  color: #999;
`