import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Linking, TabView, SceneMap, TabBar } from "react-native-tab-view";
import Carousel from "react-native-reanimated-carousel";

import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BestBadge,
  Container,
  IconContainer,
  MainContentWrapper,
  MainSubTitle,
  MainTextContainer,
  MainTitle,
  RepThemeContainer,
  StoreImgContainer,
  SubContentWrapper,
  styles,
} from "../styles/Search/CafeList";
import { Fontisto } from "@expo/vector-icons";
const cardImage = require("../assets/mocks/image.png");
const storeImage = require("../assets/mocks/storeImg.png");

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

import LoadingScreen from "./LoadingScreen";
import SearchThemeList from "../components/SearchThemeList";
import { SerachResultView, ThemeListTitle, ThemeListView } from "../styles/Search/CafeDetail";
import ThemeComponent from "../components/ThemeComponent";

function CafeDetailScreen({ navigation: { navigate }, route }) {
  /**
   * API
   */
  const { storeId } = route.params;
  const { isLoading, status, data } = useQuery(
    ["CafeDetail", storeId],
    searchApi.getCafeDetail
  );

  /**
   * 애니메이션 추가
   */
  const dimensions = useWindowDimensions();
  const Width = (dimensions.width - 256) / 2;
  const Height = parseInt(dimensions.height / 2);
  const CarouselWidth = dimensions.width;
  const CarouselHeight = dimensions.height;
  const offsetValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: -(Height / 2),
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  return status === "success" ? (
    <>
      <Animated.View
        style={{
          position: 'relative',
          top: Height / 2,
          left: 0,
          right: 0,
          borderRadius: 8,
          zIndex: 999,
          transform: [{ translateY: offsetValue }],
        }}
      >
        <Container mb="4px">
          <MainContentWrapper>
            <StoreImgContainer>
              <View style={styles.storeImgContainer} />
              <Image
                source={storeImage}
                style={styles.storeImg}
                blurRadius={3}
              />
            </StoreImgContainer>
          </MainContentWrapper>

          <SubContentWrapper>
            <MainTextContainer>
              <MainTitle>{data.storeName}</MainTitle>
              <MainSubTitle>{data.storeAddress}</MainSubTitle>
              <IconContainer>
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons
                    name="md-call"
                    size={19}
                    color="black"
                    style={{ marginRight: 4 }}
                  />
                </TouchableOpacity>
                <Ionicons
                  name="md-logo-instagram"
                  size={20}
                  color="black"
                  style={{ marginHorizontal: 8 }}
                />
                <Ionicons
                  name="md-location-sharp"
                  size={20}
                  color="black"
                  style={{ marginLeft: 4 }}
                />
              </IconContainer>
            </MainTextContainer>
            {/* <RepThemeContainer>
              <SubTitle>진행율</SubTitle>
              <SubTitle>{data.clearCnt} / {data.totalTheme}</SubTitle>
            </RepThemeContainer> */}
          </SubContentWrapper>
        </Container>
      </Animated.View>

      <ThemeListTitle>테마 종류</ThemeListTitle>     

      <SerachResultView>
        <Carousel
            loop={false}
            width={CarouselWidth}
            height={CarouselHeight}
            autoPlay={false}
            data={data.themeList}
            mode={'parallax'}
            modeConfig={
              {
                parallaxScrollingOffset: 120,
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
      </SerachResultView>

        {/* <FlatList
          data={data?.themeList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            borderColor: '#00000010',
            borderStyle: 'solid',
            borderTopWidth: 1,
            marginHorizontal: 20,
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
        /> */}
    </>
  ) : (
    <LoadingScreen />
  );
}

/**
 * 재사용 할 수도 있는 코드
 */
// useEffect(()=> {
//   console.log(`tel:${data.tel.replace(/-/gi, '')}`);
//   Linking.openURL(`tel:+${data.tel.replace(/-/gi, '')}`)
// }, [data])

// <SubTitle>{data.mapX}</SubTitle>
//         <SubTitle>{data.mapY}</SubTitle>
//         <SubTitle>{data.tel} </SubTitle>
//         <SubTitle>{data.homepage} </SubTitle>
//         <SubTitle> {data.storeImg} </SubTitle>

//         <SubTitle>{data.region}</SubTitle>
//         <SubTitle>{data.clearCnt} / {data.totalTheme}</SubTitle>
export default CafeDetailScreen;
