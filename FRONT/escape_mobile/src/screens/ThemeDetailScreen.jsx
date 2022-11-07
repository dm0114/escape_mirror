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
  ImageBackground
} from "react-native";
import Plotly from "react-native-plotly";

import { Neomorph } from 'react-native-neomorph-shadows';
import { Shadow } from "react-native-shadow-2";
import styled from "styled-components/native";
const cardImage = require("../assets/mocks/image.png");

import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/api";

function ThemeDetailScreen({ navigation, route }) {
  // 카운터
  const [number, setNumber] = useState(1);
  const onIncrease = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };
  const onDecrease = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  // 애니메이션
  const dimensions = useWindowDimensions();
  const Width = (dimensions.width - 256) / 2;
  const [showMenu, setShowMenu] = useState(true);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  // 차트
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
    paper_bgcolor: '#f6f6f6',
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

  const { themeId } = route.params;
  // const { isLoading, data } = useQuery(
  //   ["ThemeDetail", themeId],
  //   searchApi.getThemeDetail
  // );
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
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MainContainer>
        {/* <Neomorph
          swapShadows // <- change zIndex of each shadow color
          style={{
            shadowRadius: 10,
            borderRadius: 25,
            backgroundColor: "#DDDDDD",
            width: 150,
            height: 150,
          }}
        >
          <Image
            source={cardImage}
            style={{
              width: 200,
              height: 320,
              borderRadius: 20,
            }}
          ></Image>
        </Neomorph> */}
        {/* <Shadow
              distance={50}
              startColor={"#00000020"}
              childColor={"#fff"}
              endColor={"#00000000"}
              
              offset={[0, 10]}
              containerStyle={{

                marginLeft: 'auto',
                marginRight: 'auto'
              }}
              radius={30}
            >

            </Shadow> */}

        <SubTitle>{ThemeDatas.star}점</SubTitle>
        <MainTitle>{ThemeDatas.themeName}</MainTitle>

        <InfoTextWrapper>
          <RowContainer>
            <SubTitle>{ThemeDatas.leadtime}분 • </SubTitle>
            <SubTitle>{ThemeDatas.capacity} • </SubTitle>
            <SubTitle>난이도 {ThemeDatas.difficulty}</SubTitle>
          </RowContainer>
        </InfoTextWrapper>

        <InfoTextWrapper>
          <SubTitle>{ThemeDatas.description}</SubTitle>
          <Body>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </Body>
        </InfoTextWrapper>

        <InfoTextWrapper>
          <SubTitle>가격</SubTitle>
          <Body>{PriceData[number]}</Body>
          <RowContainer>
            <TouchableOpacity onPress={number <= 4 ? onIncrease : null}>
              <Text>+</Text>
            </TouchableOpacity>
            <Body>{number}</Body>
            <TouchableOpacity onPress={number >= 2 ? onDecrease : null}>
              <Text>-</Text>
            </TouchableOpacity>
          </RowContainer>
        </InfoTextWrapper>

        <RankingWrapper>
          <SubTitle>랭킹</SubTitle>
          {ThemeDatas.noHintRanking.map((item, idx) => {
            return (
              <RowContainer key={idx}>
                <Body>{idx + 1}등 |</Body>
                <Body>{item.userNickname} |</Body>
                <Body>{item.cleartime}</Body>
              </RowContainer>
            );
          })}
        </RankingWrapper>
      </MainContainer>

      <ButtonContainer
        left={Width}
        onPress={() => {
          navigation.navigate("PostReservationScreen", {
            themeName: ThemeDatas.themeName,
            leadtime: ThemeDatas.leadtime,
            price: ThemeDatas.price,
            themeImg: ThemeDatas.themeImg,
          });
        }}
      >
        <SubTitle>예약하기</SubTitle>
      </ButtonContainer>

      <Animated.View
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
          borderRadius: showMenu ? 15 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <ImageBackground
          source={cardImage}
          resizeMode="cover"
          blurRadius={5}
          style={styles.container}
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
                    toValue: showMenu ? 0 : -300,
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
      </Animated.View>
    </SafeAreaView>
  );
}

// 뷰
const RowContainer = styled.View`
  flex-direction: row;
`;

const MainContainer = styled.View`
  flex: 1;
  padding-top: 80px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
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
  border-color: rgba(228,228,228,10);
`
const TitleTextContainer = styled.View`
  margin-top: 80px;
  margin-left: 40px;
`

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

// 요소
const ButtonContainer = styled.TouchableOpacity`
  position: absolute;

  bottom: 20px;
  left: ${(props) => props.left}px;
  right: 0;

  margin: auto;
  /* margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px; */

  width: 256px;
  padding: 10px;
  border-radius: 40px;
  background-color: #f6f5e9;

  z-index: 999;
  justify-content: center;
  align-items: center;
`;
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
`


// 텍스트
const MainTitle = styled.Text`
  font-family: "SUIT-ExtraBold";
  font-size: ${({ theme }) => theme.fontSizes.title1};
  line-height: ${({ theme }) => theme.fontHeight.title1};
  letter-spacing: -1px;
  margin-bottom: 10px;
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
  color: #000;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
