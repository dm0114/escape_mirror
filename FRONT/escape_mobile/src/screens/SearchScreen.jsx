import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import { useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Carousel from "react-native-reanimated-carousel";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

import Ionicons from '@expo/vector-icons/Ionicons';

import SearchCafeList from "../components/SearchCafeList";
import SearchThemeList from "../components/SearchThemeList";
import LoadingScreen from "./LoadingScreen";



export default function SearchScreen() {
  /**
   * 레이아웃
   */
  const layout = useWindowDimensions();
  const Width = layout.width;
  const Height = layout.height;


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
      if ( data.error || !data || (!data.storeList?.length && !data.themeList?.length) ) {
        return ( <ErrorText>검색된 정보가 없어요 😥</ErrorText>)
      }
      const CafeRoute = () => (
        <CafeListScroll
          data={data.storeList}
          contentContainerStyle={{
            paddingTop: 40,
            marginLeft: 20,
            marginRight: 20,
          }}
          renderItem={({ item }) => (
            <SearchCafeList
              storeId={item.storeId}
              storeName={item.storeName}
              storeImg={item.storeImg}
              storeAddress={item.storeAddress}
              likeCount={item.likeCount}
              mostReviewedTheme={item.mostReviewedTheme}
            />
          )}
        />
      );

      const ThemeRoute = () => (
        // <Carousel
        //   loop={false}
        //   width={Width}
        //   height={Height / 2}
        //   autoPlay={false}
        //   data={data.themelist}
        //   mode={'parallax'}
        //   modeConfig={
        //     {
        //       parallaxScrollingScale: 1,
        //       parallaxAdjacentItemScale: 0.9
        //     }
        //   }
        //   vertical={true}
        //   scrollAnimationDuration={1000}
        //   renderItem={({item}) => (
        //       <SearchThemeList
        //         themeId={item.themeId}
        //         themeName={item.themeName}
        //         storeName={item.storeName}
        //         themeImg={item.themeImg}
        //         likeCount={item.likeCount}
        //         star={item.star}
        //       />
        //   )}
        // />

        <ThemeListScroll
          data={data.themelist}
          contentContainerStyle={{
            paddingTop: 40,
          }}
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


      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
        { key: "Theme", title: "테마 검색 결과" },
        { key: "Cafe", title: "카페 검색 결과" },
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
    // else {
    //   return (
    //     <>
    //       <SearchView flex={1}>
    //         <SubText>지금 주변에서 인기 있는 곳</SubText>
    //         {/* 이미지 및 슬라이더 추가 */}
    //       </SearchView>
    //     </>
    //   );
    // }
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
        autoComplete ='off'
        caretHidden={true}
      />
      <SearchResult />
    </>
  );
}

const MainContainer = styled.View`

`;

const TextContainer = styled.View`
  justify-content: center;
  padding-left: ${({ theme }) => theme.screenMargin.padding};
  padding-right: ${({ theme }) => theme.screenMargin.padding};
  padding-top: ${({ theme }) => theme.screenMargin.paddingTop};
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
  letter-spacing: -1px;
`;

const SubText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  color: #fff;
`;

const SearchTextInput = styled.TextInput`
  background-color: #fff;
  padding: 8px 16px;
  margin: 0px 20px 20px 20px;
  border-color: #fff;
  border-radius: 20px;

  text-align: center;
`;

const ErrorText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  line-height: ${({ theme }) => theme.fontHeight.title3};
  letter-spacing: -0.5px;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`