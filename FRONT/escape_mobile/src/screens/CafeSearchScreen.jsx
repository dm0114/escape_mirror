import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import theme from "../../theme"

import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

import Carousel from "react-native-reanimated-carousel";


import SearchCafeList from "../components/SearchCafeList";
import LoadingScreen from "./LoadingScreen";
import { View } from "native-base";
import { FocusedButtonLeft, FocusedButtonRight, ToggleButtonLeft, ToggleButtonRight, ToggleContainer } from "./SearchScreen";
import ThemeComponent from "../components/ThemeComponent";
import { LayoutData } from "../store/Atom";
import { useRecoilValue } from "recoil";



export default function CafeSearchScreen({ route }) {
  /**
   * 토글
   */
  console.log('파람', route.params);
  const [toggleValue, setToggleValue] = useState(route.params.toggleState);
  
  /**
  * 레이아웃
  */
  const layoutDatas = useRecoilValue(LayoutData)
  const {Width, Height} = layoutDatas
     
  /**
   * API
   */
  const [query, setQuery] = useState(route.params.queryParam);
  console.log('현재 쿼리', query);
  const { isLoading, isFetching, data, refetch } = useQuery(
    ["searchCafeAndTheme", query], //토큰 추가
    searchApi.getSearch, {
      enabled: false
    }
  );

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

  useEffect(() => {refetch()}, [])
  useEffect(() => {}, [data])
  useEffect(() => {}, [toggleValue])


  /**
   * 검색 결과
   */
  const SearchResult = () => {
    try {
      if (data.storeList === null || data.themelist === null ) {
        return (<ErrorText>검색된 정보가 없어요 😥</ErrorText>)
      }
      if (toggleValue) {
        return (
          <CafeListScroll
            data={data.storeList}
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 40,
              marginLeft: 20,
              marginRight: 20,
              paddingBottom: 480
            }}
            renderItem={({ item }) => (
              <SearchCafeList
                storeId={item.storeId}
                storeName={item.storeName}
                storeImg={item.storeImg}
                storeAddress={item.storeAddress}
                storeTel={item.tel}
                storeHompage={item.homepage}
                likeCount={item.likeCount}
                mostReviewedTheme={item.mostReviewedTheme}
              />
            )}
          />
        )
      }
      else {
        console.log(data);
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
              parallaxScrollingOffset: 140,
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
              genre={item.genre}
              likeCount={item.likeCount}
              star={item.star}
            />
        )}
      />)
      }
    }

    catch(error) {
      return <LoadingScreen />;
    }
  };

  return (
    <View style={{backgroundColor: '#212121'}}>
      <TextContainer>
        <ToggleContainer>
          {toggleValue 
          ? <ToggleButtonLeft onPress={() => {setToggleValue(false)}}>
              <ToggleSubText>테마 검색</ToggleSubText>
            </ToggleButtonLeft>
          : <FocusedButtonLeft>
              <ToggleSubText>테마 검색</ToggleSubText>
            </FocusedButtonLeft>
           }
            
            {toggleValue 
            ? <FocusedButtonRight>
                <ToggleSubText>카페 검색</ToggleSubText>
              </FocusedButtonRight>
            : <ToggleButtonRight onPress={() => {setToggleValue(true)}}>
                <ToggleSubText>카페 검색</ToggleSubText>
              </ToggleButtonRight>
            }
        </ToggleContainer>
      </TextContainer>
      
      <SearchTextInput
        placeholder={"카페를 입력하세요."}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        autoComplete ='off'
        caretHidden={true}
      />
      <SerachResultView>
        <SearchResult />
      </SerachResultView>
    </View>
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
`


/**
 * 요소
 */
const SearchTextInput = styled.TextInput`
  background-color: #fff;
  padding: 8px 16px;
  margin: 0px 20px 30px 20px;
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

const ToggleSubText = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  /* color: #ff5f3f; */
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