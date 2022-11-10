import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import theme from "../../theme"
import { useWindowDimensions, Text, ImageBackground } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Carousel from "react-native-reanimated-carousel";
import Toggle from "react-native-toggle-element";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

import Ionicons from '@expo/vector-icons/Ionicons';

const testUri = 'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/main_search.gif'
import SearchCafeList from "../components/SearchCafeList";
import SearchThemeList from "../components/SearchThemeList";
import LoadingScreen from "./LoadingScreen";
import ThemeComponent from "../components/ThemeComponent";



export default function SearchScreen() {
  /**
   * 레이아웃
   */
  const layout = useWindowDimensions();
  const Width = layout.width;
  const Height = layout.height;

  /**
   * API
   */
  const [query, setQuery] = useState("");
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["searchCafeAndTheme", query], //토큰 추가
    searchApi.getSearch,
    { enabled: false }
  );

  /**
   * 토글
   */
  const [toggleValue, setToggleValue] = useState(false);
  useEffect(() => {
  }, [toggleValue])
  /**
   * 검색
   */
  const onChangeText = (text) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    refetch();
  };

  /**
   * 검색 결과
   */
  const SearchResult = () => {
    if (!isLoading && !isFetching) {
      if ( data.error || !data || (!data.storeList?.length && !data.themeList?.length) ) {
        return ( <ErrorText>검색된 정보가 없어요 😥</ErrorText>)
      }
      if (toggleValue) {
        return (
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
        )
      } else {
        return (
          <Carousel
            loop={false}
            width={Width}
            height={Height}
            autoPlay={false}
            data={data.themelist}
            mode={'parallax'}
            modeConfig={
              {
                parallaxScrollingOffset: 150,
                parallaxScrollingScale: 1,
                parallaxAdjacentItemScale: 0.9,
              }
            }
            vertical={false}
            scrollAnimationDuration={1000}
            renderItem={({item}) => (
                <ThemeComponent
                  themeId={item.themeId}
                  themeName={item.themeName}
                  storeName={item.storeName}
                  themeImg={item.themeImg}
                  likeCount={item.likeCount}
                  star={item.star}
                />
            )}
          />
        )
      }
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
    <ImageBackground source={{uri:testUri}} style={{flex:1}}>
      <TextContainer>
        <RowContainer>
          <MainText>
            초대 받지 않은 곳을 {"\n"}
            가는 것도 큰 재미이죠.{"\n"}
            새로운 곳에 가보시겠어요?
          </MainText>
          <Toggle
            trackBarStyle={{
              backgroundColor: theme.colors.point,
              
            }}
            thumbButton={{
              activeBackgroundColor: '#fff',
              inActiveBackgroundColor: '#fff'
            }}
            trackBar={{
              borderWidth: 4,
              width: 80,
              borderActiveColor: theme.colors.point,
              borderInActiveColor: theme.colors.point,
            }}
            value={toggleValue}
            onPress={(newState) => setToggleValue(newState)}
          />
        </RowContainer>
      </TextContainer>
      <SearchTextInput
        placeholder={toggleValue ? "카페를 입력하세요." : "테마를 입력하세요."}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        autoComplete ='off'
        caretHidden={true}
      />
      <SerachResultView>
        <SearchResult />
      </SerachResultView>
    </ImageBackground>
  );
}


/**
 * 뷰
 */
const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const TextContainer = styled.View`
  padding-left: ${({ theme }) => theme.screenMargin.padding};
  padding-right: ${({ theme }) => theme.screenMargin.padding};
  padding-top: ${({ theme }) => theme.screenMargin.paddingTop};
  margin-left: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-right: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`;

const ThemeListScroll = styled.FlatList``;

const CafeListScroll = styled.FlatList``;

const SearchView = styled.View`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
`;

const SerachResultView = styled.View`
  /* background-color: #212121; */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 100%;
`


/**
 * 요소
 */
const SearchTextInput = styled.TextInput`
  background-color: #fff;
  padding: 8px 16px;
  margin: 0px 20px 20px 20px;
  border-color: #fff;
  border-radius: 20px;

  text-align: center;
`;


/**
 * 텍스트
 */
const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
  line-height: ${({ theme }) => theme.fontHeight.title2};
  letter-spacing: -1px;
`;

const SubText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.title3};
  color: #fff;
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