import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Button,
} from "react-native";
import Plotly from "react-native-plotly";

import { Shadow } from "react-native-shadow-2";
import styled from "styled-components/native";
const cardImage = require("../assets/mocks/image.png");
// import Svg,{ Circle } from 'react-native-svg';

import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryClient } from '@tanstack/react-query'
import { searchApi } from "../apis/api";
import LoadingScreen from "./LoadingScreen";
import ReservationBotttomModal from "../components/Reservation/ReservationBotttomModal";

// {
//   "themeName": "셜록홈즈: 살인누명",
//   "genre": "추리",
//   "capacity": "2인~6인",
//   "price": "/44000/60000/76000/90000",
//   "difficulty": 0,
//   "leadTime": 60,
//   "description": "\"왓슨군, 보는 것과 관찰하는 것은 다른 것이라네.“\\n\\n다급한 홈즈의 전화를 받고 단숨에 달려왔다.\\n그런데 사무실에는 아무도 없다.\\n무언가 수상하다.\\n\\n이건 뭐지? 홈즈의 메시지인가?\\n이럴 수가… 홈즈가 위기에 빠진 게 분명하다.?\\n당황하고 있을 시간이 없다.\"",
//   "themeImg": "p3207.jpg",
//   "star": 0,
//   "feelDifficulty": 0,
//   "feelStory": 0,
//   "feelInterior": 0,
//   "feelActivity": 0,
//   "feelHorror": 0,
//   "lock": 0,
//   "reviews": [],
//   "noHintRanking": [],
//   "hintRanking": []
// }

function ThemeDetailScreen({ navigation, route }) {
  /**
   * API
   */
  const { themeId } = route.params;
  const { isLoading, data, status } = useQuery(
    ["ThemeDetail", themeId],
    searchApi.getThemeDetail
  );


  /**
   * 애니메이션
   */
  const dimensions = useWindowDimensions();
  const Width = (dimensions.width - 256) / 2;
  const Height = dimensions.height / 2;
  const [showMenu, setShowMenu] = useState(true);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: 150,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  /**
   * 차트
   */
  const ChartData = [
    // 차트에 들어갈 data를 먼저 지정해주고!
    {
      type: "scatterpolar", // chart type
      r: [5, 4, 8, 7, 2, 5], // data
      theta: ["난이도", "스토리", "인테리어", "활동성", "공포", "난이도"], // data category
      fill: "toself", // fill option
      name: "Group A", // data group name
    },
  ];

  const ChartLayout = {
    height: 200, // 원하는 크기로 height를 지정해주었다!
    paper_bgcolor: "#f6f6f6",
    margin: {
      // chart에는 기본값으로 margin이 적용되어 있는데, 우리가 흔히 아는 top, bottom, left와는 좀 다르다. 0으로 모두 초기화 해주었다.
      l: 0,
      r: 0,
      t: 40,
      b: 20,
    },
    pad: {
      b: 0,
      r: 0,
      t: 0,
      l: 0,
    },
    polar: {
      radialaxis: {
        // 방사축 꾸미기 시작!
        visible: false,
        range: [0, 10],
        color: "#ddd", // 방사축의 선 색깔
        showticklabels: true, // @1-1
        showline: false, // @1-2
        ticklen: 2, // @1-3
      },
      angularaxis: {
        // 각축 꾸미기 시작!
        rotation: 90, // 차트 회전율! (KDA가 제일 위로 올 수 있도록 돌려주었당)
        color: "#eee", // 각축의 선 색깔
        ticklen: 0, // @2-1
        tickfont: {
          // @2-2
          color: "#888",
          size: 13,
        },
      },
      gridshape: "linear", // @3
    },
    showlegend: false, // @4
  };

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
      {
        reviewId: 6,
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
      {
        userNickname: "방탈출랭커2",
        cleartime: "72:13",
      },
      {
        userNickname: "방탈출랭커3",
        cleartime: "72:14",
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

  const PriceData = [0, ...ThemeDatas?.price.split("/")];




  return status === "success" || !isLoading ? (
    <SafeAreaView style={styles.container}>
      <MainContainer>
        {/* <Shadow
          distance={100}
          startColor={"#00000050"}
          endColor={"#00000000"}
          offset={[0, -50]}
          containerStyle={{
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 40,
          }}
          radius={30}
        >
          <Image
            source={cardImage}
            style={{
              width: 100,
              height: 160,
              borderRadius: 20,
            }}
          ></Image>
          <RatingView>
            <RatingText>{data.star}</RatingText>
          </RatingView>
        </Shadow> */}
        
        <View style={{marginTop: Height*2/4}}>
          <MainTitle>{data.themeName}</MainTitle>
          <InfoTextWrapper>
            <RowContainer>
              <SubTitle>{data.leadTime}분 • </SubTitle>
              <SubTitle>{data.capacity} • </SubTitle>
              <SubTitle>난이도 {data.difficulty}</SubTitle>
            </RowContainer>
          </InfoTextWrapper>
          <InfoTextWrapper>
            <Body>{data.description.replace(/\\n/g, " ")}</Body>
          </InfoTextWrapper>

          <RankingWrapper>
            <SubTitle>랭킹</SubTitle>
            {!!data.noHintRanking ? data.noHintRanking.map((item, idx) => {
              return (
                <RowContainer key={idx}>
                  <Body>{idx + 1}등 |</Body>
                  <Body>{item.userNickname} |</Body>
                  <Body>{item.cleartime}</Body>
                </RowContainer>
              );
            }) : <SubTitle>데이터가 없습니다</SubTitle>}
          </RankingWrapper>
        </View>
        
      </MainContainer>

      {/* 
      바텀 시트 모달 
      */}
      <ReservationBotttomModal themeId={themeId} PriceData={PriceData} />


      {/* <Animated.View
        style={{
          flexGrow: 1,
          flexDirection: "row",
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          // paddingHorizontal: 20,
          // paddingVertical: 20,
          borderRadius: showMenu ? 75 : 0,
          transform: [{ scale: scaleValue }, { translateY: offsetValue }],
        }}
      >
        <ImageBackground
          source={cardImage}
          resizeMode="contain"
          // blurRadius={5}
          style={styles.container}
          imageStyle={{ borderRadius: showMenu ? 75 : 0 }}
        >
          <FloatContainer>
            <FloatLeftContainer>
              <TitleTextContainer>
                <Title>{ThemeDatas.themeName}</Title>
              </TitleTextContainer>
              <ChartContainer>
                <Plotly
                  data={ChartData}
                  layout={ChartLayout}
                  enableFullPlotly
                />
              </ChartContainer>
              <ReviewTitle>리뷰 ({ThemeDatas.reviews.length})</ReviewTitle>
              <FlatList
                data={ThemeDatas.reviews}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  marginLeft: 40,
                }}
                renderItem={({ item }) => (
                  <ReviewWrapper>
                    <RowContainer>
                      <ReviewProfileImg />
                      <ReviewTextWrapper>
                        <ReviewSubTitle>⭐ {item.star}</ReviewSubTitle>
                        <RowContainer>
                          <ReviewSubTitle>{`${item.User}  `}</ReviewSubTitle>
                          <ReviewInfo>{` 💡 ${item.usedHint}    ⏰ ${item.clearTime}''`}</ReviewInfo>
                        </RowContainer>
                      </ReviewTextWrapper>
                    </RowContainer>
                    <ReviewTextContainer>
                      <ReviewContent>{item.content}</ReviewContent>
                    </ReviewTextContainer>
                  </ReviewWrapper>
                )}
              />
            </FloatLeftContainer>
            <FloatRightContainer>
              <TouchableOpacity
                onPress={() => {
                  // Do Actions Here....
                  // Scaling the view...
                  Animated.timing(scaleValue, {
                    toValue: showMenu ? 1 : 0.88,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(offsetValue, {
                    // YOur Random Value...
                    toValue: showMenu ? 0 : 500,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(closeButtonOffset, {
                    // YOur Random Value...
                    toValue: !showMenu ? -30 : 0,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();

                  setShowMenu(!showMenu);
                }}
              >
                <SubTitle style={{ marginLeft: "auto" }}>리뷰 더보기</SubTitle>
              </TouchableOpacity>
            </FloatRightContainer>
          </FloatContainer>
        </ImageBackground>
      </Animated.View> */}

      {/* 포스터 애니메이션 */}
      <Animated.View
        style={{
          position: "relative",
          top: -dimensions.height,
          left: 0,
          right: 0,
          borderRadius: 50,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#00000020',
          elevation: 50,
          zIndex: 999,
          transform: [{ scale: scaleValue }, { translateY: offsetValue }],
        }}
      >
        <Image
          source={cardImage}
          style={{
            width: dimensions.width - 40,
            height: Height / 2,
            resizeMode: "cover",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginLeft: 20,
            
          }}
          blurRadius={0}
        />
      </Animated.View>
    </SafeAreaView>
  ) : (
    <LoadingScreen />
  );
}

// 뷰
const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const MainContainer = styled.ScrollView`
  flex: 1;
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 40px;
`;

const FloatContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;
const FloatLeftContainer = styled.View`
  flex: 5;
`;
const FloatRightContainer = styled.View`
  flex: 1;
  padding-top: 80px;
  /* padding-right: 20px; */
  padding-bottom: 20px;
`;
const ChartContainer = styled.View`
  height: 200px;
  border-width: 1px;
  border-color: rgba(228, 228, 228, 10);
`;
const TitleTextContainer = styled.View`
  margin-top: 80px;
  margin-left: 40px;
`;

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
const RankingWrapper = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const InfoTextWrapper = styled.View`
  margin-bottom: 10px;
`;
const RatingView = styled.View`
  position: absolute;
  margin-top: auto;
  margin-left: auto;
  top: -30px;
  right: -30px;
  width: 60px;
  height: 60px;

  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  align-items: center;
  justify-content: center;

  z-index: 9;
  background-color: #fff;
`;

// 요소
const ReviewWrapper = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ReviewProfileImg = styled.View`
  width: 50px;
  height: 50px;
  background-color: tomato;
  border-radius: 50px;
`;
const ReviewTextWrapper = styled.View`
  margin-left: 10px;
  justify-content: space-between;
`;
const ReviewTextContainer = styled.View`
  margin-top: 20px;
  margin-left: 60px;
`;

// 텍스트
const MainTitle = styled.Text`
  font-family: "SUIT-ExtraBold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  letter-spacing: -1px;
  margin-bottom: 10px;
  text-align: center;
`;
const Title = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  margin-bottom: 10px;
  color: #000;
`;

const SubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: 36px;
  letter-spacing: -0.5px;
  text-align: center;
`;

const ReviewTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  line-height: ${({ theme }) => theme.fontHeight.title2};
  margin-left: 40px;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const ReviewSubTitle = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.body2};
`;

const ReviewInfo = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption0};
`;
const ReviewContent = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: ${({ theme }) => theme.fontHeight.body2};
`;

const Body = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  line-height: ${({ theme }) => theme.fontHeight.caption1};
  letter-spacing: 0.5px;
  color: #9b989b;
  text-align: center;
`;
const RatingText = styled.Text`
  font-family: "SUIT-ExtraBold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  letter-spacing: -1px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 15,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});

export default ThemeDetailScreen;
