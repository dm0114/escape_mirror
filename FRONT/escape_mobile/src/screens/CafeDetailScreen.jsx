import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Animated,
  Linking,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Carousel from "react-native-reanimated-carousel";
import { ProgressBar } from "react-native-ui-lib";

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
import {
  SerachResultView,
  ThemeListTitle,
  ThemeListView,
} from "../styles/Search/CafeDetail";
import ThemeComponent from "../components/ThemeComponent";
import { RowContainer } from "../styles/Theme/Info";

function CafeDetailScreen({ navigation: { navigate }, route }) {
  const [progressRate, setProgressRate] = useState(0);

  /**
   * API
   */
  const { storeId } = route.params;
  const { isLoading, status, data } = useQuery(
    ["CafeDetail", storeId],
    searchApi.getCafeDetail
  );
  useEffect(() => {
    if (data) {setProgressRate((data.clearCnt / data.themeList.length) * 100)}    
  }, [data]);

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
      toValue: Height / 4,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <Animated.View
        style={{
          position: "relative",
          top: -(Height / 4),
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
                source={
                  data.storeImg
                    ? {
                        uri: `https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${data.storeImg}`,
                      }
                    : {
                        uri: "https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/NoImage.png",
                      }
                }
                style={styles.storeImg}
                blurRadius={3}
              />
            </StoreImgContainer>
          </MainContentWrapper>

          <SubContentWrapper>
            <MainTextContainer>
              <View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <MainTitle>{data.storeName}</MainTitle>
                  <View style={{flexDirection: 'row', marginTop: 4}}>
                    <TouchableOpacity onPress={() => {}}>
                      <Ionicons
                        name="md-call"
                        size={19}
                        color="black"
                        style={{ marginRight: 4 }}
                        onPress={() => {
                          Linking.openURL(`tel:+${data.tel}`);
                        }}
                      />
                    </TouchableOpacity>
                    <Ionicons
                      name="md-logo-instagram"
                      size={20}
                      color="black"
                      style={{ marginHorizontal: 8 }}
                      onPress={() => {
                        Linking.openURL(`${data.homepage}`);
                      }}
                    />
                    <Ionicons
                      name="md-location-sharp"
                      size={20}
                      color="black"
                      style={{ marginLeft: 4 }}
                      onPress={() => {
                        Linking.openURL(
                          `http://map.naver.com/?query=${data.storeAddress}`
                        );
                      }}
                    />
                  </View>
                </View>

                <MainSubTitle>{data.storeAddress}</MainSubTitle>
              </View>

              <ProgressBar
                progress={progressRate}
                progressColor={"red"}
                style={{ height: 20 }}
              />
            </MainTextContainer>
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
          mode={"parallax"}
          modeConfig={{
            parallaxScrollingOffset: 140,
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.9,
          }}
          vertical={false}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
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
  );
}

export default CafeDetailScreen;
