import React, { useContext, useEffect, useRef, useState } from "react";
import StarRating from "react-native-star-rating-widget";

import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Button,
} from "react-native";
import Plotly from "react-native-plotly";

import {
  Body,
  InfoTextWrapper,
  MainContainer,
  MainTitle,
  RankingWrapper,
  RatingContainer,
  ReviewTitle,
  RowContainer,
  SubTitle,
  styles,
  GenreTitle,
  ChartContainer,
  ReviewWrapper,
  ReviewInfo,
  ReviewContent,
  ReviewUser,
  ReviewRowContainer,
  ReivewRowInfo,
  RankingMain,
  RankingSub,
  RankingContainer,
  RankingBody,
  RankingInfoContainer,
  RankingName,
} from "../styles/Theme/Info";
import { Shadow } from "react-native-shadow-2";
const cardImage = require("../assets/mocks/image.png");
// import Svg,{ Circle } from 'react-native-svg';

import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { searchApi } from "../apis/api";
import LoadingScreen from "./LoadingScreen";
import ReservationBotttomModal from "../components/Reservation/ReservationBotttomModal";
import HeaderPosterImage from "../components/HeaderPosterImage";
import { LayoutContext } from "../../App";
import { FontAwesome5 } from "@expo/vector-icons";

function ThemeDetailScreen({ navigation, route }) {
  const [rating, setRating] = useState(0);
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
  const { Width, Height } = useContext(LayoutContext);
  // const Width = (dimensions.width - 256) / 2;
  // const Height = dimensions.height / 2;
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue2 = useRef(new Animated.Value(2)).current;
  const scaleValue2 = useRef(new Animated.Value(3)).current;
  const closeButtonOffset = useRef(new Animated.Value(2)).current;

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
      <HeaderPosterImage />

      <MainContainer>
        <View
          style={{
            marginTop: 40,
            paddingTop: Height / 4,
            backgroundColor: "#fff",
            borderRadius: 8,
            width: Width - 40,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <GenreTitle>{data.genre}</GenreTitle>
          <MainTitle>{data.themeName}</MainTitle>

          <InfoTextWrapper>
            <RowContainer>
              <SubTitle>{data.leadTime}분 • </SubTitle>
              <SubTitle>{data.capacity} • </SubTitle>
              <SubTitle>난이도 {data.difficulty}</SubTitle>
            </RowContainer>
          </InfoTextWrapper>

          <RatingContainer>
            <StarRating
              starSize={24}
              rating={data.star}
              onChange={() => {}}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </RatingContainer>

          <InfoTextWrapper>
            <Body>{data.description.replace(/\\n/g, " ")}</Body>
          </InfoTextWrapper>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: Height / 6,
            backgroundColor: "#fff",
            borderRadius: 8,
            marginTop: 4,
            marginHorizontal: 20,
          }}
        >
          {ThemeDatas.noHintRanking ? (
            <RankingContainer>
              <RankingInfoContainer>
                <RankingSub>
                  <RankingBody>{ThemeDatas.noHintRanking[1].cleartime}</RankingBody>
                </RankingSub>
                <RankingName>{ThemeDatas.noHintRanking[1].userNickname}</RankingName>
              </RankingInfoContainer>
              <RankingInfoContainer>
                <RankingMain>
                  <RankingBody>{ThemeDatas.noHintRanking[0].cleartime}</RankingBody>
                </RankingMain>
                <RankingName>{ThemeDatas.noHintRanking[0].userNickname}</RankingName>
              </RankingInfoContainer>
              <RankingInfoContainer>
                <RankingSub>
                  <RankingBody>{ThemeDatas.noHintRanking[2].cleartime}</RankingBody>
                </RankingSub>
                <RankingName>{ThemeDatas.noHintRanking[2].userNickname}</RankingName>
              </RankingInfoContainer>
            </RankingContainer>
          ) : (
            <SubTitle>데이터가 없습니다</SubTitle>
          )}
        </View>

        <RankingWrapper>
          <ReviewTitle>후기 ({ThemeDatas.reviews.length})</ReviewTitle>
          <ChartContainer>
            <Plotly data={ChartData} layout={ChartLayout} enableFullPlotly />
          </ChartContainer>

          {ThemeDatas.reviews.map((item, idx) => {
            return (
              <ReviewWrapper key={idx}>
                <StarRating
                  starSize={14}
                  starStyle={{
                    marginLeft: 0,
                    marginRight: 4,
                    marginBottom: 10,
                  }}
                  rating={item.star}
                  onChange={() => {}}
                />
                <ReviewUser>{`${item.User}  `}</ReviewUser>
                <ReviewContent>{item.content}</ReviewContent>
                <ReviewRowContainer>
                  <ReivewRowInfo>
                    <FontAwesome5
                      name="question-circle"
                      size={12}
                      color="black"
                      style={{ marginRight: 6 }}
                    />
                    <ReviewInfo>{item.usedHint}</ReviewInfo>
                  </ReivewRowInfo>
                  <ReivewRowInfo>
                    <FontAwesome5
                      name="clock"
                      size={12}
                      color="black"
                      style={{ marginRight: 6 }}
                    />
                    <ReviewInfo>{item.clearTime}</ReviewInfo>
                  </ReivewRowInfo>
                </ReviewRowContainer>
              </ReviewWrapper>
            );
          })}
        </RankingWrapper>

        {/* 
        리뷰 페이지
      */}

        {/* <FloatContainer>
            <FloatLeftContainer>
              
              
            </FloatLeftContainer>
          </FloatContainer> */}
      </MainContainer>

      {/* 
        바텀 시트 모달 
      */}
      <ReservationBotttomModal themeId={themeId} PriceData={PriceData} />
    </SafeAreaView>
  ) : (
    <LoadingScreen />
  );
}

export default ThemeDetailScreen;

/**
 * 재사용
 */

{
  /* <Shadow
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
        </Shadow> */
}
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
