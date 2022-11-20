import React, { useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";

import { View, SafeAreaView, ImageBackground, TouchableOpacity } from "react-native";

const Plotly = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 1500)).then(
    () => import("react-native-plotly")
  );
});

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

import { useQuery, useMutation } from "@tanstack/react-query";
import { likeApi, searchApi } from "../apis/api";
import LoadingScreen from "./LoadingScreen";
import ReservationBotttomModal from "../components/Reservation/ReservationBotttomModal";
import HeaderPosterImage from "../components/HeaderPosterImage";
import {
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

import { useRecoilValue } from "recoil";
import { LayoutData, LikeThemeAtom } from "../store/Atom";

function ThemeDetailScreen({ route }) {
  const { themeId } = route.params;

  /**
   * 좋아요
   */
  const likeData = useRecoilValue(LikeThemeAtom)
  const [likeState, setLikeState]  = useState(false)
  useEffect(() => {
    likeData.map((item) => {if (item.themeId === themeId) {return setLikeState(true)}})
  } ,[])
  
  /**
   * API
   */
  
  const { isLoading, data, status } = useQuery(
    ["ThemeDetail", themeId],
    searchApi.getThemeDetail
  );
  useEffect(() => {
    if (data != undefined) {setChartArray([data.difficulty, data.feelStory, data.feelInterior, data.feelActivity, data.feelHorror, data.difficulty])}
  }, [data]);

  const {mutate:postLike} = useMutation(likeApi.postLike, {
    onSuccess: () => {
      setLikeState(true)
    },
  });
  const {mutate: deleteLike} = useMutation(likeApi.deleteLike, {
      onSuccess: () => {
        setLikeState(false)
      },
    });


  /**
   * 애니메이션
   */
  const layoutDatas = useRecoilValue(LayoutData);
  const { Width, Height } = layoutDatas;

  /**
   * 차트
   */
  const [chartArray, setChartArray] = useState([0, 0, 0, 0, 0, 0])
  const ChartData = [
    // 차트에 들어갈 data를 먼저 지정해주고!
    {
      type: "scatterpolar", // chart type
      r: chartArray, // data
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
  try {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderPosterImage themeImg={data.themeImg} />

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
            {
              likeState
              ?
                <Ionicons
                  name="heart"
                  size={19}
                  color="tomato"
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    bottom: Height / 4,
                    right: 20,
                    zIndex: 99999
                    }}
                    onPress={() => {deleteLike(themeId)}}
                  />
              :
                  <Ionicons
                    name="heart-outline"
                    size={19}
                    color="tomato"
                    onPress={() => {postLike(themeId)}}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    bottom: Height / 4,
                    right: 20,
                    zIndex: 99999
                  }}
                />
                 
            }

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
              <Body>{data.description?.replace(/\\n/g, " ")}</Body>
            </InfoTextWrapper>
          </View>

          <ImageBackground
            source={require("../assets/images/firework2.gif")}
            resizeMode="cover"
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: Height / 6,
              marginTop: 4,
              marginHorizontal: 20,
              overflow: "hidden",
              borderRadius: 8,
              // backgroundColor: '#fff'
            }}
            imageStyle={{ borderRadius: 8 }}
          >
            {!!data.hintRanking.length ? (
              <RankingContainer>
                <RankingInfoContainer>
                  <Ionicons name="trophy-sharp" 
                    size={36}
                    color="#c0c0c0"
                  />
                  <RankingName>
                    {data.hintRanking[1]
                      ? data.hintRanking[1].userNickname
                      : "-"}
                  </RankingName>
                  <RankingBody>
                    {data.hintRanking[1] ? data.hintRanking[1].clearTime : "-"}
                  </RankingBody>
                </RankingInfoContainer>

                <RankingInfoContainer>
                  <Ionicons name="trophy-sharp" 
                    size={48}
                    color="#ffd700"
                  />
                  <RankingName>
                    {data.hintRanking[0]
                      ? data.hintRanking[0].userNickname
                      : "-"}
                  </RankingName>
                  <RankingBody>
                    {data.hintRanking[0] ? data.hintRanking[0].clearTime : "-"}
                  </RankingBody>
                </RankingInfoContainer>
                <RankingInfoContainer>
                  <Ionicons name="trophy-sharp" 
                    size={36}
                    color="#b08d57"
                  />
                  <RankingName>
                    {data.hintRanking[2]
                      ? data.hintRanking[2].userNickname
                      : "-"}
                  </RankingName>
                  <RankingBody>
                    {data.hintRanking[2] ? data.hintRanking[2].clearTime : "-"}
                  </RankingBody>
                </RankingInfoContainer>
              </RankingContainer>
            ) : (
              <SubTitle>랭킹 데이터가 없습니다!</SubTitle>
            )}
          </ImageBackground>

          <RankingWrapper>
            <ReviewTitle>후기 ({data.reviews.length})</ReviewTitle>
            <ChartContainer>
              <Plotly data={ChartData} layout={ChartLayout} enableFullPlotly />
            </ChartContainer>

            {data.reviews?.map((item, idx) => {
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
        </MainContainer>

        {/* 
        바텀 시트 모달 
      */}
        <ReservationBotttomModal
          themeId={themeId}
          Price={data.price}
          Width={Width}
        />
      </SafeAreaView>
    );
  } catch (error) {
    console.log(error);
    return <LoadingScreen />;
  }
}

export default ThemeDetailScreen;
