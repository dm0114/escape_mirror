import React, { useEffect } from "react";
import { ImageBackground } from "react-native";

import styled from "styled-components/native";
import "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingScreen from "./LoadingScreen";
import { getPreloading } from "../apis/api";
import { LayoutData, LikeThemeAtom } from "../store/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useIsFocused } from "@react-navigation/native";
import { getLikeTheme } from "../apis/MyPage";


const ReservationComponent = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 1 * 1000)).then(
    () => import("../components/Reservation/ReservationComponent")
  );
});


export default function MainScreen() {
  const setLikeData = useSetRecoilState(LikeThemeAtom)
  const layoutDatas = useRecoilValue(LayoutData)
  const {Width, Height} = layoutDatas

  // 프리로딩 API 연결
  const { data, refetch } = useQuery(
    ["PreloadingData"],
    getPreloading, {
      enabled: false
    }
  );
  const { data: likeTheme, refetch: likeRefetch } = useQuery(
    ["LikeThemeData"],
    getLikeTheme, {
      enabled: false
    }
  );

  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['myInfo']);
  
  useEffect(() => {}, [data, userInfo])

  const isFocused = useIsFocused();
    useEffect(() => {
        refetch()
        likeRefetch().then(setLikeData(likeTheme))
    }, [isFocused])

  
    try {
      return (
        <ImageBackground source={require('../assets/images/main.gif')} style={{flex:1}}>
          <MainContainer>
            <MainText>
              안녕하세요, {userInfo.nickname}님.{"\n"}
              오랜만에 저택으로 돌아오셨네요.{"\n"}
              받으신 초대장 목록을 보여드릴게요.
            </MainText>
            <Carousel
              loop={false}
              width={Width - 40}
              height={Width / 3.5}
              autoPlay={false}
              data={data.reservationList}
              mode={'parallax'}
              modeConfig={
                {
                  parallaxScrollingScale: 1,
                  parallaxAdjacentItemScale: 0.9
                }
              }
              vertical={true}
              scrollAnimationDuration={2000}
              renderItem={({item}) => (
                <ReservationComponent
                  key={item.reservationId}
                  reservationId={item.reservationId}
                  themeName={item.themeName}
                  storeName={item.storeName}
                  date={item.reservationDate}
                  reserveTime={item.reservationTime}
                />
              )}
            />
            
          </MainContainer>
        </ImageBackground>
      );
    }
    catch {
      return <LoadingScreen />
    }
  
}

const MainContainer = styled.View`
  flex: 1;
  padding-left: ${({ theme }) => theme.screenMargin.padding};
  padding-right: ${({ theme }) => theme.screenMargin.padding};
  padding-top: ${({ theme }) => theme.screenMargin.paddingTop};
`;
const MainText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
  color: #fff;
  line-height: ${({ theme }) => theme.fontHeight.title2};
  margin-left: ${({ theme }) => theme.screenMargin.titleLeftMargin};
  margin-bottom: ${({ theme }) => theme.screenMargin.marginBottom};
`;
